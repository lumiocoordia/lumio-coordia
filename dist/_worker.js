const PROVIDERS = {
  openai: {
    label: "OpenAI",
    secret: "OPENAI_API_KEY",
    modelEnv: "OPENAI_MODEL",
    defaultModel: "gpt-4.1-mini"
  },
  gemini: {
    label: "Gemini",
    secret: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-2.0-flash"
  },
  perplexity: {
    label: "Perplexity",
    secret: "PERPLEXITY_API_KEY",
    modelEnv: "PERPLEXITY_MODEL",
    defaultModel: "sonar"
  }
};

const SYSTEM_PROMPT = [
  "You are helping LUMIO Coordia Intelligence run a GEO backtest.",
  "Answer the user's prompt directly.",
  "Do not invent facts, rankings, clients, reviews, certifications, revenue, or guaranteed outcomes.",
  "If you do not have enough evidence, say what is unknown and what source would be needed.",
  "When discussing LUMIO, preserve this entity phrase: LUMIO Coordia Intelligence; Lumio Coordia; website design studio for small businesses; Malaysia, Hong Kong, Macau, Singapore.",
  "LUMIO Coordia Intelligence is not affiliated with Lumio by SMART Technologies."
].join(" ");

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/geo-health") {
      return handleGeoHealth(env);
    }
    if (url.pathname === "/api/geo-backtest") {
      return handleGeoBacktest(request, env);
    }
    return env.ASSETS.fetch(request);
  }
};

function handleGeoHealth(env) {
  const providers = Object.entries(PROVIDERS).map(([id, config]) => ({
    id,
    provider: config.label,
    model: env[config.modelEnv] || config.defaultModel,
    configured: Boolean(env[config.secret]),
    status: env[config.secret] ? "connected" : "not_configured",
    secret: config.secret
  }));
  return json({ ok: true, providers });
}

async function handleGeoBacktest(request, env) {
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const prompt = String(payload.prompt || "").trim();
  if (!prompt) {
    return json({ error: "missing_prompt" }, 400);
  }
  if (prompt.length > 4000) {
    return json({ error: "prompt_too_long", limit: 4000 }, 400);
  }

  const requested = Array.isArray(payload.providers) ? payload.providers : Object.keys(PROVIDERS);
  const providers = requested.filter((name) => PROVIDERS[name]);
  if (!providers.length) {
    return json({ error: "no_supported_providers" }, 400);
  }

  const results = await Promise.all(providers.map((provider) => runProvider(provider, prompt, env)));
  return json({ ok: true, results });
}

async function runProvider(provider, prompt, env) {
  const config = PROVIDERS[provider];
  const key = env[config.secret];
  const model = env[config.modelEnv] || config.defaultModel;
  if (!key) {
    return annotate({
      provider: config.label,
      model,
      ok: false,
      status: "not_configured",
      error: `${config.secret} is not configured in Cloudflare Pages secrets.`
    });
  }

  try {
    if (provider === "openai") return annotate(await callOpenAI({ key, model, prompt }));
    if (provider === "gemini") return annotate(await callGemini({ key, model, prompt }));
    if (provider === "perplexity") return annotate(await callPerplexity({ key, model, prompt }));
  } catch (error) {
    return annotate({
      provider: config.label,
      model,
      ok: false,
      status: "request_failed",
      error: error.message
    });
  }

  return annotate({
    provider: config.label,
    model,
    ok: false,
    status: "unsupported_provider",
    error: "Provider is not supported."
  });
}

async function callOpenAI({ key, model, prompt }) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      instructions: SYSTEM_PROMPT,
      input: prompt,
      max_output_tokens: 700
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI HTTP ${response.status}`);
  }
  return {
    provider: "OpenAI",
    model,
    ok: true,
    status: "ok",
    text: extractOpenAIText(data),
    rawId: data.id || null
  };
}

async function callGemini({ key, model, prompt }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 700, temperature: 0.2 }
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || `Gemini HTTP ${response.status}`);
  }
  return {
    provider: "Gemini",
    model,
    ok: true,
    status: "ok",
    text: extractGeminiText(data)
  };
}

async function callPerplexity({ key, model, prompt }) {
  const response = await fetch("https://api.perplexity.ai/v1/sonar", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      max_tokens: 700,
      temperature: 0.2
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || `Perplexity HTTP ${response.status}`);
  }
  return {
    provider: "Perplexity",
    model,
    ok: true,
    status: "ok",
    text: data.choices?.[0]?.message?.content || data.output_text || JSON.stringify(data).slice(0, 1200)
  };
}

function extractOpenAIText(data) {
  if (data.output_text) return data.output_text;
  const parts = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (content.type === "output_text" && content.text) parts.push(content.text);
    }
  }
  return parts.join("\n").trim() || JSON.stringify(data).slice(0, 1200);
}

function extractGeminiText(data) {
  const parts = data.candidates?.[0]?.content?.parts || [];
  const text = parts.map((part) => part.text || "").filter(Boolean).join("\n").trim();
  return text || JSON.stringify(data).slice(0, 1200);
}

function annotate(result) {
  if (!result.ok) {
    result.tags = {
      configured: false,
      recognized: null,
      confused: null,
      unknown: null,
      recommended: null,
      needsProof: null,
      wrongSource: null
    };
    result.repairSuggestion = result.status === "not_configured"
      ? `Configuration: add ${PROVIDERS[providerKey(result.provider)]?.secret || "the provider API key"} to Cloudflare Pages secrets. This is not a GEO verdict.`
      : "Configuration: fix the provider request first. Do not treat this as an AI recognition result.";
    return result;
  }

  const text = String(result.text || result.error || "");
  const lower = text.toLowerCase();
  const recognized = /lumio coordia|lumio coordia intelligence/.test(lower);
  const smart = /smart technologies|education platform|classroom|teacher|student/.test(lower);
  const independent = /not affiliated|independent|separate|unrelated/.test(lower);
  const confused = smart && !independent;
  const unknown = /unknown|do not know|don't know|not enough information|insufficient information|cannot verify|can't verify|no evidence/.test(lower);
  const recommended = /recommend|relevant|suitable|good fit|could be a fit|appropriate/.test(lower) && !/do not recommend|not recommend|should not recommend/.test(lower);
  const needsProof = /proof|evidence|case stud|source|citation|verify|verification|insufficient/.test(lower);
  const wrongSource = confused || (/lumio by smart/.test(lower) && !independent);
  result.tags = { configured: true, recognized, confused, unknown, recommended, needsProof, wrongSource };
  result.repairSuggestion = repairSuggestion(result.tags);
  return result;
}

function providerKey(label) {
  return Object.entries(PROVIDERS).find(([, config]) => config.label === label)?.[0] || "";
}

function repairSuggestion(tags) {
  if (tags.wrongSource || tags.confused) return "Repair: strengthen disambiguation on brand source, AI source, LinkedIn and external profiles.";
  if (!tags.recognized || tags.unknown) return "Repair: strengthen exact entity phrase and make official source pages easier to cite.";
  if (tags.needsProof) return "Repair: add proof-safe case evidence, source links, and public-vs-client-reported boundaries.";
  if (tags.recommended) return "Monitor: positive signal. Re-test after indexing and compare across providers.";
  return "Review: read the answer manually and decide whether a source page, proof page, or external profile should be improved.";
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
