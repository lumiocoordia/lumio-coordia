"""Create flat analysis copies, including inline JavaScript in HTML. MIT license."""
import hashlib,json
from html.parser import HTMLParser
from pathlib import Path

class Scripts(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.active=False
        self.parts=[]
        self.blocks=[]
        self.line=0
    def handle_starttag(self,tag,attrs):
        if tag.lower()!='script':return
        values=dict(attrs)
        kind=values.get('type','').lower()
        self.active='src' not in values and kind in ['','module','text/javascript','application/javascript']
        self.parts=[]
        self.line=self.getpos()[0]
    def handle_data(self,data):
        if self.active:self.parts.append(data)
    def handle_endtag(self,tag):
        if tag.lower()=='script' and self.active:
            self.blocks.append((self.line,''.join(self.parts)))
            self.active=False

def prepare(target,destination):
    target,destination=Path(target).resolve(),Path(destination).resolve()
    destination.mkdir(parents=True,exist_ok=False)
    mapping={}
    skips={'node_modules','venv','.git','data','__pycache__','.pnpm-store'}
    for source in target.rglob('*'):
        if source.is_symlink() or not source.is_file():continue
        rel=source.relative_to(target)
        if any(p in skips or p.startswith('.venv') for p in rel.parts):continue
        if source.suffix not in ['.js','.mjs','.cjs','.jsx','.ts','.tsx','.py','.html','.htm']:continue
        content=source.read_bytes()
        digest=hashlib.sha256(str(rel).encode()).hexdigest()[:20]
        if source.suffix in ['.html','.htm']:
            parser=Scripts()
            parser.feed(content.decode('utf-8',errors='strict'))
            blocks=parser.blocks
            for index,(line,code) in enumerate(blocks):
                if not code.strip():continue
                path=destination/f'{digest}-{index}.mjs'
                path.write_text(code)
                mapping[str(path)]={'source':str(source),'source_start_line':line,'kind':'inline-javascript'}
        else:
            path=destination/f'{digest}{source.suffix}'
            path.write_bytes(content)
            mapping[str(path)]={'source':str(source),'source_start_line':1,'kind':'source'}
    (destination.parent/'source-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
    return mapping
