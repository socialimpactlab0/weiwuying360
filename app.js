(function(){
  const TOUR='https://360viewtour.npac-weiwuying.org/home/matterport?language=.chinese&place=.menu_sl_4';
  const TICKET='https://zh-tw.shenyun.com/kaohsiung/city/kaohsiung?_tuid=caee55e3-a050-41f0-a21d-dd3dc3456a68';
  const ua=navigator.userAgent||'';
  const isLine=/Line\//i.test(ua);

  function externalize(url){
    const u=new URL(url,location.href);
    u.searchParams.set('openExternalBrowser','1');
    return u.toString();
  }

  document.querySelectorAll('[data-tour]').forEach(a=>{
    a.href=isLine?externalize(TOUR):TOUR;
    if(isLine) a.removeAttribute('target');
  });
  document.querySelectorAll('[data-ticket]').forEach(a=>{
    a.href=isLine?externalize(TICKET):TICKET;
    if(isLine) a.removeAttribute('target');
  });

  const box=document.getElementById('lineBox');
  if(box && isLine) box.style.display='block';

  const copy=document.getElementById('copyBtn');
  const msg=document.getElementById('copyMsg');
  if(copy){
    copy.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(TOUR)}
      catch(e){const t=document.createElement('textarea');t.value=TOUR;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
      if(msg) msg.textContent=document.documentElement.lang==='vi'?'Đã sao chép. Hãy dán vào Chrome hoặc Safari.':document.documentElement.lang==='en'?'Copied. Paste it into Chrome or Safari.':'已複製，請貼到 Chrome／Safari 開啟。';
    });
  }

  const sticky=document.getElementById('sticky');
  const shenyun=document.getElementById('shenyun');
  if(sticky&&shenyun){
    let revealed=false;
    const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!revealed){revealed=true;sticky.classList.add('show')}})},{threshold:.2});
    io.observe(shenyun);
  }

  // If the landing page itself was opened inside LINE, immediately try to hand it off
  // to the phone's external browser. If LINE ignores programmatic navigation, the
  // 360° and ticket buttons above still contain openExternalBrowser=1 as a fallback.
  if(isLine){
    const current=new URL(location.href);
    if(current.searchParams.get('openExternalBrowser')!=='1'){
      current.searchParams.set('openExternalBrowser','1');
      setTimeout(()=>location.replace(current.toString()),80);
    }
  }
})();