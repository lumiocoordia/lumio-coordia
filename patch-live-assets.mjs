import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL(".", import.meta.url).pathname;
const dist = join(root, "dist");
const assets = join(dist, "assets");

const sourceJs = join(assets, "index-D_fAIj9K.js");
const sourceCss = join(assets, "index-Cxi4dHL5.css");
const nextJs = join(assets, "index-lumio-brand-v1.js");
const nextCss = join(assets, "index-lumio-brand-v1.css");
const htmlPath = join(dist, "index.html");
const macaoSkyline = "macao-casino-skyline.jpg";
const hongKongSkyline = "hong-kong-skyline.jpg";
const lumioLogo = "lumio-logo-lockup.png";

copyFileSync(sourceJs, nextJs);
copyFileSync(sourceCss, nextCss);
copyFileSync(join(root, "assets", macaoSkyline), join(assets, macaoSkyline));
copyFileSync(join(root, "assets", hongKongSkyline), join(assets, hongKongSkyline));
copyFileSync(join(root, "assets", lumioLogo), join(assets, lumioLogo));

let js = readFileSync(nextJs, "utf8");

const replacements = [
  [
    'hero:{badge:"For growing Australian businesses",title:"Build faster. Grow smarter.",subtext:"Websites. Automation. Business Systems.",cta:"View pricing"}',
    'hero:{badge:"Websites for growing Australian businesses",title:"Make your business easy to understand, trust, and contact.",subtext:"Clear, practical websites built around your offer, your proof, and your next enquiry.",cta:"View website plans"}',
  ],
  [
    'story:{kicker:"Story",title:"Turn attention into enquiry.",paragraphs:["Monday Web Studio helps growing businesses present the right offer clearly, so visitors understand what you do and why they should take the next step.","We keep the work practical: clear positioning, a simple page journey, transparent pricing, and launch-ready execution."]}',
    'story:{kicker:"Story",title:"Your website should make the next step obvious.",paragraphs:["Monday Web Studio builds clear websites for service businesses that need visitors to understand the offer, trust the business, and know how to enquire.","We shape the message, page journey, pricing path, proof, and contact flow before building, so the finished site feels useful rather than decorative."]}',
  ],
  [
    'intro:"Start with the outcome you want: a sharper first impression, more qualified enquiries, or a smoother way to handle work."',
    'intro:"Choose the starting point that matches the job your website must do: establish trust, bring in better enquiries, or support a more complete sales path."',
  ],
  [
    'hero:{badge:"面向成长中的澳洲企业",title:"更快上线，更清晰增长。",subtext:"网站、自动化、业务系统。",cta:"查看价格"}',
    'hero:{badge:"为成长中的澳洲企业制作网站",title:"让客户一眼看懂你，并愿意联系你。",subtext:"围绕你的服务、可信证明和咨询路径，制作清晰、实用、可上线的网站。",cta:"查看网站方案"}',
  ],
  [
    'story:{kicker:"故事",title:"让客户看懂你、信任你，并愿意行动。",paragraphs:["Monday Web Studio 帮助成长中的企业，把服务、价格和行动路径讲清楚，让访客更快明白你能帮他们解决什么问题。","我们的做法保持务实：先厘清定位、页面路径和客户下一步，再进入可上线的执行。"]}',
    'story:{kicker:"故事",title:"一个好网站，应该让客户知道下一步怎么做。",paragraphs:["Monday Web Studio 为服务型企业制作清晰的网站，让访客快速看懂你提供什么、为什么值得信任，以及如何联系你。","我们先整理信息、页面路径、价格表达、作品证明和联系流程，再进入制作，所以网站不只是好看，而是真的能被客户使用。"]}',
  ],
  [
    'intro:"先从你最想得到的结果开始：让客户第一眼更信任你、带来更多有效咨询，或让后续工作处理得更顺。"',
    'intro:"按照网站需要完成的任务选择起点：先建立信任、带来更有效的咨询，或承接更完整的销售路径。"',
  ],
  [
    'hero:{badge:"成長中のオーストラリア企業へ",title:"より速く公開し、より賢く成長する。",subtext:"ウェブサイト、自動化、ビジネスシステム。",cta:"料金を見る"}',
    'hero:{badge:"成長中のオーストラリア企業向けウェブサイト",title:"伝わり、信頼され、問い合わせにつながるサイトへ。",subtext:"サービス内容、信頼材料、問い合わせ導線を整理した実用的なウェブサイトを作ります。",cta:"サイトプランを見る"}',
  ],
  [
    'story:{kicker:"ストーリー",title:"伝わり、信頼され、問い合わせにつながるページへ。",paragraphs:["Monday Web Studio は、サービス内容、価格、次の行動を分かりやすく整理し、訪問者がすぐ判断できるページを作ります。","ポジショニング、ページ導線、次のアクションを先に整えたうえで、公開できる形まで実行します。"]}',
    'story:{kicker:"ストーリー",title:"良いウェブサイトは、次の行動を分かりやすくします。",paragraphs:["Monday Web Studio は、訪問者がサービス内容、信頼できる理由、問い合わせ方法をすぐ理解できるウェブサイトを作ります。","メッセージ、ページ導線、価格の見せ方、実績、問い合わせの流れを整えてから制作するため、見た目だけでなく実際に使えるサイトになります。"]}',
  ],
  [
    'intro:"まず欲しい結果から選べます。第一印象を良くする、質の高い問い合わせを増やす、またはその後の業務をスムーズにするためのプランです。"',
    'intro:"サイトが果たすべき役割に合わせて選べます。信頼感を作る、より良い問い合わせを増やす、または販売導線を整えるための出発点です。"',
  ],
  [
    'hero:{badge:"성장 중인 호주 비즈니스를 위해",title:"더 빠르게 만들고, 더 똑똑하게 성장하세요.",subtext:"웹사이트, 자동화, 비즈니스 시스템.",cta:"가격 보기"}',
    'hero:{badge:"성장 중인 호주 비즈니스를 위한 웹사이트",title:"고객이 이해하고, 신뢰하고, 문의하게 만듭니다.",subtext:"서비스, 신뢰 요소, 문의 흐름을 중심으로 실용적인 웹사이트를 만듭니다.",cta:"웹사이트 플랜 보기"}',
  ],
  [
    'story:{kicker:"스토리",title:"고객이 이해하고, 신뢰하고, 문의하게 만드는 페이지.",paragraphs:["Monday Web Studio는 서비스, 가격, 다음 행동을 명확하게 정리해 방문자가 빠르게 판단할 수 있는 웹사이트를 만듭니다.","포지셔닝, 페이지 흐름, 고객의 다음 행동을 먼저 정리한 뒤 출시 가능한 결과물로 실행합니다."]}',
    'story:{kicker:"스토리",title:"좋은 웹사이트는 다음 행동을 분명하게 만듭니다.",paragraphs:["Monday Web Studio는 방문자가 서비스, 신뢰할 이유, 문의 방법을 빠르게 이해할 수 있는 웹사이트를 만듭니다.","메시지, 페이지 흐름, 가격 표현, 작업 사례, 문의 경로를 먼저 정리한 뒤 제작하기 때문에 보기만 좋은 사이트가 아니라 실제로 쓰이는 사이트가 됩니다."]}',
  ],
  [
    'intro:"원하는 결과부터 선택하세요. 더 좋은 첫인상, 더 적합한 문의, 또는 이후 업무를 더 매끄럽게 처리하기 위한 시작점입니다."',
    'intro:"웹사이트가 해야 할 역할에 맞춰 선택하세요. 신뢰를 만들고, 더 적합한 문의를 늘리고, 더 완성된 판매 흐름을 지원하는 출발점입니다."',
  ],
  [
    '["Travel","Customer handling","A customer-facing page for smoother bookings."]',
    '["Malaysia Airbnb operations","Stayflow Homestay","A landing page for a Kuala Lumpur Airbnb management company focused on guest check-in and booking confidence.","https://stayflow-homestay-landing.pages.dev"]',
  ],
  [
    '["Macao accounting consultancy","LONG IENG","A website for a Macao advisory firm supporting clients with overseas expansion projects.","https://longiengma.com/"]',
    '["Hong Kong accounting consultancy","LONG IENG","A website for a Hong Kong advisory firm supporting clients with overseas expansion projects.","https://longiengma.com/"]',
  ],
  [
    '["Mortgage","Lead response","A clearer enquiry path for quicker follow-up."]',
    '["Macau travel agency","Macau World Travel Agency","A travel agency and transport page for Macau visitors, partners, and hotel enquiries.","https://macau-world-travel-agency.pages.dev/"]',
  ],
  [
    '["旅游","客户处理","让预订和客户沟通更顺畅的展示页面。"]',
    '["马来西亚 Airbnb 运营公司","Stayflow Homestay","为一间大型连锁 Airbnb 管理公司制作的页面，聚焦吉隆坡客人的入住与预订信任。","https://stayflow-homestay-landing.pages.dev"]',
  ],
  [
    '["澳门会计顾问公司","LONG IENG","为一间澳门会计师事务所顾问公司制作的网站，协助展示客户出海项目服务。","https://longiengma.com/"]',
    '["香港会计顾问公司","LONG IENG","为一间香港会计师事务所顾问公司制作的网站，协助展示客户出海项目服务。","https://longiengma.com/"]',
  ],
  [
    '["贷款","线索回应","让客户咨询路径更清晰，方便后续跟进。"]',
    '["澳门旅行社","Macau World Travel Agency","为澳门旅行社制作的交通与旅游服务页面，方便旅客、合作伙伴和酒店客户了解服务。","https://macau-world-travel-agency.pages.dev/"]',
  ],
  [
    '["旅行","顧客対応","予約と問い合わせをスムーズにするページ。"]',
    '["マレーシア Airbnb 運営会社","Stayflow Homestay","クアラルンプールのゲストチェックインを支える大型 Airbnb 管理会社向けページ。","https://stayflow-homestay-landing.pages.dev"]',
  ],
  [
    '["マカオ会計アドバイザリー","LONG IENG","海外展開を支援するマカオの会計・アドバイザリー会社向けウェブサイト。","https://longiengma.com/"]',
    '["香港会計アドバイザリー","LONG IENG","海外展開を支援する香港の会計・アドバイザリー会社向けウェブサイト。","https://longiengma.com/"]',
  ],
  [
    '["ローン","問い合わせ対応","より早いフォローにつなげる明確な問い合わせ導線。"]',
    '["マカオ旅行会社","Macau World Travel Agency","マカオの旅行会社向けに、交通・旅行サービスを分かりやすく見せるページ。","https://macau-world-travel-agency.pages.dev/"]',
  ],
  [
    '["여행","고객 처리","예약과 고객 응대를 더 매끄럽게 만드는 페이지."]',
    '["말레이시아 Airbnb 운영사","Stayflow Homestay","쿠알라룸푸르 투숙객 체크인을 지원하는 대형 Airbnb 관리 회사용 페이지입니다.","https://stayflow-homestay-landing.pages.dev"]',
  ],
  [
    '["마카오 회계 자문사","LONG IENG","해외 진출 프로젝트를 지원하는 마카오 회계 자문사를 위한 웹사이트입니다.","https://longiengma.com/"]',
    '["홍콩 회계 자문사","LONG IENG","해외 진출 프로젝트를 지원하는 홍콩 회계 자문사를 위한 웹사이트입니다.","https://longiengma.com/"]',
  ],
  [
    '["대출","문의 응답","더 빠른 후속 조치를 위한 명확한 문의 경로."]',
    '["마카오 여행사","Macau World Travel Agency","마카오 여행사의 교통 및 여행 서비스를 보여주는 페이지입니다.","https://macau-world-travel-agency.pages.dev/"]',
  ],
  [
    'H===0?T.jsx("div",{className:"portfolio-preview","aria-hidden":"true"',
    'rl?T.jsx("div",{className:H===0?"portfolio-preview":"portfolio-preview stayflow-preview","aria-hidden":"true"',
  ],
  [
    'children:T.jsxs("div",{className:"portfolio-preview-panel",children:[T.jsx("i",{}),T.jsx("i",{}),T.jsx("i",{})]})',
    'children:T.jsxs(T.Fragment,{children:[T.jsxs("span",{className:"preview-location",children:[T.jsx("strong",{children:H===0?"Macao":"Kuala Lumpur"}),T.jsx("small",{children:H===0?"China":"Malaysia"})]}),T.jsxs("div",{className:"portfolio-preview-panel",children:[T.jsx("i",{}),T.jsx("i",{}),T.jsx("i",{})]})]})',
  ],
  [
    'className:H===0?"portfolio-preview":"portfolio-preview stayflow-preview"',
    'className:H===0?"portfolio-preview hong-kong-preview":H===1?"portfolio-preview macau-preview":"portfolio-preview stayflow-preview"',
  ],
  [
    'children:H===0?"Macao":"Kuala Lumpur"',
    'children:H===0?"Hong Kong":H===1?"Macau":"Kuala Lumpur"',
  ],
  [
    'children:H===0?"China":"Malaysia"',
    'children:H===0||H===1?"China":"Malaysia"',
  ],
];

for (const [from, to] of replacements) {
  if (!js.includes(from)) {
    throw new Error(`Expected JS fragment not found: ${from}`);
  }
  js = js.replace(from, to);
}

js = js
  .replaceAll("Monday Web Studio", "LUMIO Coordia Intelligence")
  .replaceAll("/assets/monday-brand-icon.png", "/assets/lumio-logo-lockup.png")
  .replaceAll("aria-label:\"LUMIO Coordia Intelligence home\"", "aria-label:\"LUMIO home\"");

writeFileSync(nextJs, js);

let css = readFileSync(nextCss, "utf8").replace(
  "https://longiengma.com/wp-content/uploads/2026/05/long-ieng-macao-skyline.jpg",
  "/assets/macao-casino-skyline.jpg",
);
css += `
.portfolio-preview.hong-kong-preview{background-image:linear-gradient(105deg,rgba(5,12,17,.5),rgba(21,44,64,.16) 42%,rgba(88,132,172,.2)),url("/assets/hong-kong-skyline.jpg");background-size:118% auto;background-position:54% 54%;isolation:isolate;overflow:hidden;animation:hong-kong-skyline-drift 13s ease-in-out infinite}
.portfolio-preview.macau-preview{background-image:linear-gradient(105deg,rgba(5,12,17,.48),rgba(32,45,57,.12) 42%,rgba(189,138,87,.22)),url("/assets/macao-casino-skyline.jpg");background-size:120% auto;background-position:58% 48%;isolation:isolate;overflow:hidden;animation:macao-skyline-drift 13s ease-in-out infinite}
.portfolio-preview.hong-kong-preview:before,.portfolio-preview.macau-preview:before{content:"";background:linear-gradient(90deg,rgba(255,255,255,.02),rgba(255,255,255,.18),rgba(255,255,255,.02)),linear-gradient(180deg,rgba(255,255,255,.08),transparent 56%),repeating-linear-gradient(90deg,rgba(255,255,255,.095) 0 1px,transparent 1px 46px);animation:macao-photo-sweep 7.4s ease-in-out infinite;position:absolute;inset:0;opacity:.88}
.portfolio-preview.hong-kong-preview:after,.portfolio-preview.macau-preview:after{content:"";left:18px;right:20px;bottom:20px;width:auto;height:3px;border-radius:999px;background:linear-gradient(90deg,#ef4444,#f8fafc,#60a5fa);animation:macao-pill 4.4s ease-in-out infinite;z-index:2}
.preview-location{position:absolute;left:18px;bottom:16px;z-index:4;display:grid;gap:1px;width:max-content;max-width:168px;border:1px solid rgba(255,255,255,.46);border-radius:999px;background:rgba(255,255,255,.9);box-shadow:0 14px 30px rgba(6,18,17,.18);color:#173f3a;padding:7px 13px;line-height:1}
.preview-location strong{font-size:12px;font-weight:800;letter-spacing:0}
.preview-location small{font-size:9px;font-weight:700;letter-spacing:0;color:rgba(23,63,58,.72)}
.portfolio-preview.hong-kong-preview .portfolio-preview-panel,.portfolio-preview.macau-preview .portfolio-preview-panel{right:20px;top:22px;bottom:auto;width:35%;max-width:142px;gap:9px;z-index:2}
.portfolio-preview.hong-kong-preview .portfolio-preview-panel i,.portfolio-preview.macau-preview .portfolio-preview-panel i{height:15px;background:rgba(255,255,255,.88);box-shadow:0 10px 22px rgba(16,24,35,.18);animation:macao-room 4.8s ease-in-out infinite}
.portfolio-preview.hong-kong-preview .portfolio-preview-panel i:nth-child(2),.portfolio-preview.macau-preview .portfolio-preview-panel i:nth-child(2){width:76%;background:rgba(242,247,248,.9)}
.portfolio-preview.hong-kong-preview .portfolio-preview-panel i:nth-child(3),.portfolio-preview.macau-preview .portfolio-preview-panel i:nth-child(3){width:54%;background:#d9a34f}
.portfolio-preview.stayflow-preview{background:linear-gradient(105deg,rgba(6,18,17,.58),rgba(31,74,67,.22) 46%,rgba(238,181,113,.22)),url("/assets/kuala-lumpur-skyline.jpg") 50% 43%/cover;isolation:isolate;overflow:hidden}
.portfolio-preview.stayflow-preview:before{content:"";background:linear-gradient(90deg,rgba(255,255,255,.02),rgba(255,255,255,.25),rgba(255,255,255,.03)),repeating-linear-gradient(90deg,rgba(255,255,255,.12) 0 1px,transparent 1px 42px);animation:stayflow-photo-sweep 6s ease-in-out infinite;position:absolute;inset:0;opacity:.88}
.portfolio-preview.stayflow-preview:after{content:"";left:18px;right:20px;bottom:20px;width:auto;height:3px;border-radius:999px;background:linear-gradient(90deg,#ef4444,#f8fafc,#60a5fa);animation:stayflow-pill 3.8s ease-in-out infinite;z-index:2}
.stayflow-preview .portfolio-preview-panel{right:20px;top:24px;bottom:auto;width:34%;max-width:136px;gap:9px;z-index:2}
.stayflow-preview .portfolio-preview-panel i{height:15px;background:rgba(255,255,255,.88);box-shadow:0 10px 22px rgba(6,18,17,.2);animation:stayflow-room 4.2s ease-in-out infinite}
.stayflow-preview .portfolio-preview-panel i:nth-child(2){width:76%;background:rgba(239,248,245,.9)}
.stayflow-preview .portfolio-preview-panel i:nth-child(3){width:54%;background:#e0a04e}
@keyframes macao-skyline-drift{0%,to{background-position:63% 48%}50%{background-position:47% 48%}}
@keyframes hong-kong-skyline-drift{0%,to{background-position:60% 54%}50%{background-position:44% 54%}}
@keyframes macao-photo-sweep{0%,to{transform:translate3d(18%,0,0);opacity:.58}50%{transform:translate3d(-18%,0,0);opacity:.95}}
@keyframes macao-pill{0%,to{transform:translateY(0);opacity:.86}50%{transform:translateY(-4px);opacity:1}}
@keyframes macao-room{0%,to{transform:scaleX(.68);opacity:.58}50%{transform:scaleX(1);opacity:.95}}
@keyframes stayflow-photo-sweep{0%,to{transform:translate3d(-16%,0,0);opacity:.64}50%{transform:translate3d(16%,0,0);opacity:.98}}
@keyframes stayflow-pill{0%,to{transform:translateY(0);opacity:.86}50%{transform:translateY(-4px);opacity:1}}
@keyframes stayflow-room{0%,to{transform:scaleX(.68);opacity:.58}50%{transform:scaleX(1);opacity:.95}}
@media (prefers-reduced-motion:reduce){.portfolio-preview,.portfolio-preview:before,.portfolio-preview:after,.portfolio-preview .portfolio-preview-panel i{animation:none}}
.logo-pill{width:156px;height:58px;border-radius:18px;background:rgba(237,237,237,.92);padding:8px 12px}
.logo-pill img{object-fit:contain;width:100%;height:100%}
@media (min-width:640px){.logo-pill{width:230px;height:78px;padding:10px 18px;border-radius:22px}.hero-nav{align-items:center}}
@media (max-width:720px){.hero-nav{justify-content:flex-start;padding-right:88px}.logo-pill{width:142px;height:56px;padding:7px 10px}.nav-pill{max-width:calc(100vw - 252px);overflow-x:auto;scrollbar-width:none}.nav-pill::-webkit-scrollbar{display:none}}
`;
writeFileSync(nextCss, css);

let html = readFileSync(htmlPath, "utf8");
html = html
  .replace("/assets/index-D_fAIj9K.js", "/assets/index-stayflow-case.js")
  .replace("/assets/index-Cxi4dHL5.css", "/assets/index-stayflow-kl-photo.css")
  .replace("/assets/index-stayflow-case.css", "/assets/index-stayflow-kl-photo.css")
  .replace("/assets/index-stayflow-kl-bright.css", "/assets/index-stayflow-kl-photo.css")
  .replace("/assets/index-stayflow-kl-day.css", "/assets/index-stayflow-kl-photo.css")
  .replace("/assets/index-stayflow-case.js", "/assets/index-portfolio-cases-v2.js")
  .replace("/assets/index-stayflow-kl-photo.css", "/assets/index-portfolio-photo-v2.css")
  .replace("/assets/index-portfolio-cases-v2.css", "/assets/index-portfolio-photo-v2.css")
  .replace("/assets/index-portfolio-photo-v2.css", "/assets/index-portfolio-location-v4.css")
  .replace("/assets/index-portfolio-macao-v3.css", "/assets/index-portfolio-location-v4.css")
  .replace("/assets/index-portfolio-location-v4.css", "/assets/index-portfolio-copy-v5.css")
  .replace("/assets/index-portfolio-cases-v2.js", "/assets/index-lumio-brand-v1.js")
  .replace("/assets/index-portfolio-copy-v5.css", "/assets/index-lumio-brand-v1.css")
  .replace(
    'content="Website builds for growing Australian businesses."',
    'content="Clear websites and digital foundations by LUMIO Coordia Intelligence."',
  )
  .replace(
    'content="Clear websites for growing Australian businesses that need more trust, better enquiries, and a cleaner contact path."',
    'content="Clear websites and digital foundations by LUMIO Coordia Intelligence."',
  )
  .replace(
    "<title>Monday Web Studio | Websites, Automation, Business Systems</title>",
    "<title>LUMIO Coordia Intelligence | Websites for Growing Businesses</title>",
  )
  .replace(
    "<title>Monday Web Studio | Websites for Growing Businesses</title>",
    "<title>LUMIO Coordia Intelligence | Websites for Growing Businesses</title>",
  );
writeFileSync(htmlPath, html);

console.log("Patched LUMIO Coordia Intelligence brand assets.");
