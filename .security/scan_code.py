"""Scan code and extracted inline scripts without running target code. MIT license."""
import ast,json,os,shutil,subprocess,sys,tempfile
from pathlib import Path
from prepare_code import prepare

root=Path(__file__).resolve().parents[1]
semgrep=sys.argv[1]
env={k:v for k,v in os.environ.items() if k in ['PATH','HOME','LANG','SSL_CERT_FILE']}
env.update(SEMGREP_SEND_METRICS='off',SEMGREP_ENABLE_VERSION_CHECK='0',OTEL_SDK_DISABLED='true',DO_NOT_TRACK='1')
with tempfile.TemporaryDirectory(prefix='security-code-') as temporary:
    out=Path(temporary)
    (out/'home').mkdir()
    env['HOME']=str(out/'home')
    mapping=prepare(root,out/'sources')
    node=shutil.which('node')
    if not node:raise SystemExit('JavaScript syntax checker unavailable')
    for source in (out/'sources').iterdir():
        if source.suffix=='.py':ast.parse(source.read_bytes(),filename=str(source))
        elif source.suffix in ['.js','.mjs','.cjs']:
            result=subprocess.run([node,'--check',str(source)],env=env,capture_output=True,text=True,timeout=30)
            if result.returncode:raise SystemExit('JavaScript syntax error in '+mapping[str(source)]['source'])
    command=[semgrep,'scan','--config',str(root/'.security/code-rules.yml'),'--metrics','off','--disable-version-check',
             '--disable-nosem','--strict','--error','--jobs','2',str(out/'sources')]
    result=subprocess.run(command,env=env,timeout=600)
    print(json.dumps({'analysis_sources':len(mapping),'inline_scripts':sum(v['kind']=='inline-javascript' for v in mapping.values())}))
    raise SystemExit(result.returncode)
