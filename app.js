(function(){
  const TOUR='https://360viewtour.npac-weiwuying.org/home/matterport?language=.chinese&place=.menu_sl_4';
  const TICKET='https://zh-tw.shenyun.com/kaohsiung/city/kaohsiung?_tuid=caee55e3-a050-41f0-a21d-dd3dc3456a68';
  const ua=navigator.userAgent||'';
  const isLine=/Line\//i.test(ua);
  if(isLine) document.documentElement.classList.add('is-line');

  function externalize(url){
    const u=new URL(url,location.href);
    u.searchParams.set('openExternalBrowser','1');
    return u.toString();
  }

  document.querySelectorAll('[data-tour],#tourBtn').forEach(a=>{
    a.href=isLine?externalize(TOUR):TOUR;
    if(isLine) a.removeAttribute('target');
  });
  document.querySelectorAll('[data-ticket],.ticket .cta,.sticky a').forEach(a=>{
    a.href=isLine?externalize(TICKET):TICKET;
    if(isLine) a.removeAttribute('target');
  });

  const box=document.getElementById('lineBox');
  if(box&&isLine) box.style.display='block';

  const copy=document.getElementById('copyBtn');
  const msg=document.getElementById('copyMsg');
  if(copy){
    copy.addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(TOUR)}
      catch(e){const t=document.createElement('textarea');t.value=TOUR;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove()}
      if(msg) msg.textContent=document.documentElement.lang==='vi'?'Đã sao chép. Hãy dán vào Chrome hoặc Safari.':document.documentElement.lang==='en'?'Copied. Paste it into Chrome or Safari.':'已複製，請貼到 Chrome／Safari 開啟。';
    });
  }

  const PHOTO_FIXES={
    'https://learning.npac-weiwuying.org/files/d69d6511b8cae4625ad2c8e8b8d40ab81338dfbc.jpg':'https://upload.wikimedia.org/wikipedia/commons/4/47/%E6%A6%95%E6%A8%B9%E5%BB%A3%E5%A0%B4_Banyan_Plaza_%2846087020144%29.jpg',
    'https://takao.kcg.gov.tw/public/article/a0/707/atl_707_20220105094145_356.jpg':'https://upload.wikimedia.org/wikipedia/commons/4/48/Wei-Wu-Ying_Center_for_the_Arts_01_%28cropped%29.jpg',
    'https://learning.npac-weiwuying.org/files/034afee17c0328cdb19c0bf7c65766a9a644033b.jpg':'https://upload.wikimedia.org/wikipedia/commons/5/50/National_Kaohsiung_Center_for_the_Arts.JPG'
  };
  document.querySelectorAll('img').forEach(img=>{
    const original=img.getAttribute('src');
    if(PHOTO_FIXES[original]) img.src=PHOTO_FIXES[original];
  });

  const routeButtons=[...document.querySelectorAll('[data-route-target]')];
  const routePanels=[...document.querySelectorAll('[data-route-panel]')];
  routeButtons.forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.routeTarget;
    routeButtons.forEach(b=>b.classList.toggle('active',b===btn));
    routePanels.forEach(p=>p.classList.toggle('active',p.dataset.routePanel===id));
  }));

  const revealEls=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const revealIO=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');revealIO.unobserve(e.target)}})
    },{threshold:.12});
    revealEls.forEach(el=>revealIO.observe(el));
  }else revealEls.forEach(el=>el.classList.add('seen'));

  const sticky=document.getElementById('sticky');
  const shenyun=document.getElementById('shenyun');
  if(sticky&&shenyun){
    let revealed=false;
    const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting&&!revealed){revealed=true;sticky.classList.add('show')}})},{threshold:.18});
    io.observe(shenyun);
  }

  const footer=document.querySelector('.footer');
  if(footer){
    const credit=document.createElement('div');
    credit.style.cssText='margin-top:10px;font-size:10px;line-height:1.6;opacity:.8';
    credit.innerHTML='Photo credits: Banyan Plaza — yunlin2003 / CC BY-SA 2.0; aerial view — Kaohsiung Travel / Government Website Open Information Announcement; north plaza — Jimmy3357569 / CC BY-SA 4.0. Images via Wikimedia Commons.';
    footer.appendChild(credit);
  }
})();