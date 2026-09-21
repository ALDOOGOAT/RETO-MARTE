/* Traducción local: sin servicios externos. Cifras e identificadores se conservan. */
(function(){
  const q=new URLSearchParams(location.search);let saved;
  try{saved=localStorage.getItem('milpa-language');}catch{}
  let lang=q.get('lang')==='en'?'en':q.get('lang')==='es'?'es':saved==='en'?'en':'es';
  const dict=Object.create(null),sources=new WeakMap(),rendered=new WeakMap();
  const patterns=[];
  function t(s){if(lang!=='en'||typeof s!=='string')return s;const raw=s.trim(),clean=raw.replace(/\s+/g," ");
    if(dict[clean]!==undefined)return s.replace(raw,dict[clean]);
    for(const [re,fn] of patterns){if(re.test(clean))return clean.replace(re,fn);}
    return s;
  }
  function node(n){if(n.nodeType!==3||!n.parentElement||n.parentElement.closest('script,style,code,[translate="no"]'))return;
    if(!sources.has(n)||n.data!==rendered.get(n))sources.set(n,n.data);
    const out=t(sources.get(n));if(n.data!==out)n.data=out;rendered.set(n,out);
  }
  function walk(root){if(root.nodeType===3)return node(root);if(root.nodeType!==1)return;
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);while(w.nextNode())node(w.currentNode);
    for(const el of [root,...root.querySelectorAll('[aria-label],[title],[placeholder]')])for(const a of ['aria-label','title','placeholder']){
      if(!el.hasAttribute(a))continue;const key='i18n'+a.replace(/-/g,'');
      if(!el.dataset[key])el.dataset[key]=el.getAttribute(a);el.setAttribute(a,t(el.dataset[key]));
    }
  }
  const observer=new MutationObserver(changes=>{observer.disconnect();for(const m of changes){if(m.type==='characterData')node(m.target);else m.addedNodes.forEach(walk);}observe();});
  function observe(){if(document.body)observer.observe(document.body,{subtree:true,childList:true,characterData:true});}
  function apply(){observer.disconnect();document.documentElement.lang=lang;walk(document.body);observe();
    document.querySelectorAll('[data-language]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.language===lang)));
    document.querySelectorAll('a[data-preserve-language]').forEach(a=>{const u=new URL(a.href);u.searchParams.set('lang',lang);a.href=u.href;});
  }
  function set(value){lang=value==='en'?'en':'es';try{localStorage.setItem('milpa-language',lang);}catch{}
    const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);
    apply();dispatchEvent(new Event('milpa-language'));apply();
  }
  window.MILPA_I18N={get lang(){return lang;},t,set,apply,add:values=>Object.assign(dict,values),patterns,
    pick:(es,en)=>lang==='en'?en:es};
  addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>set(b.dataset.language));apply();});
})();
