(function(){
  var d=document;
  var rok=d.getElementById('rok'); if(rok) rok.textContent=new Date().getFullYear();
  // menu mobilne
  var b=d.getElementById('burger'), m=d.getElementById('menu');
  function zamknij(){m.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=m.classList.toggle('otwarte');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij);});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});
  // aktywna pozycja menu
  var linki=[].slice.call(m.querySelectorAll('a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){linki.forEach(function(a){a.classList.toggle('akt',a.getAttribute('href')==='#'+x.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    ['home','o-biurze','oferta','dla-kogo','kontakt'].forEach(function(id){var s=d.getElementById(id);if(s)io.observe(s);});
    // dolny pasek po przewinięciu za przycisk w hero
    var mob=d.getElementById('mob'), cta=d.querySelector('.hero-cta');
    new IntersectionObserver(function(en){var w=!en[0].isIntersecting&&en[0].boundingClientRect.top<0;mob.classList.toggle('widac',w);mob.setAttribute('aria-hidden',w?'false':'true');}).observe(cta);
  }
  // karty: przeciąganie myszą + strzałki
  var k=d.getElementById('karty');
  if(k){
    var dn=false,sx=0,sl=0,ruch=false;
    k.addEventListener('mousedown',function(e){if(k.scrollWidth<=k.clientWidth)return;dn=true;ruch=false;sx=e.pageX;sl=k.scrollLeft;k.style.scrollSnapType='none';k.style.cursor='grabbing';e.preventDefault();});
    window.addEventListener('mousemove',function(e){if(!dn)return;var dx=e.pageX-sx;if(Math.abs(dx)>4)ruch=true;k.scrollLeft=sl-dx;});
    window.addEventListener('mouseup',function(){if(!dn)return;dn=false;k.style.scrollSnapType='';k.style.cursor='';});
    k.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();}},true);
    d.querySelectorAll('.kn').forEach(function(btn){btn.addEventListener('click',function(){var c=k.querySelector('.karta');k.scrollBy({left:(c.offsetWidth+16)*(+btn.dataset.k),behavior:'smooth'});});});
  }
  // formularz pokazowy
  var f=d.getElementById('formularz'), info=d.getElementById('form-info');
  f.addEventListener('submit',function(e){e.preventDefault();
    if(!f.imie.value.trim()||!f.kontakt.value.trim()||!f.zgoda.checked){info.textContent='Proszę uzupełnić imię, kontakt i zaznaczyć zgodę.';return;}
    info.textContent='Dziękujemy. To podgląd strony - po wdrożeniu zapytanie trafi na skrzynkę biura.';f.reset();});
  // cookies
  var KL='buk_cookies', ck=d.getElementById('cookies'), op=d.getElementById('ck-opcje'), zew=d.getElementById('ck-zew');
  function czytaj(){try{var v=JSON.parse(localStorage.getItem(KL));if(v&&v.t>Date.now()-31536e6)return v;}catch(e){}return null;}
  function zapisz(z){try{localStorage.setItem(KL,JSON.stringify({zew:z,t:Date.now()}));}catch(e){}ck.hidden=true;mapa(z);}
  function mapa(z){var w=d.querySelector('.k-mapa'),fr=w.querySelector('iframe'),zs=w.querySelector('.mapa-zastep');
    if(z===false&&fr){w.dataset.src=fr.src;fr.remove();zs=d.createElement('div');zs.className='mapa-zastep';zs.innerHTML='<b>ul. Centralna 2, 24-100 Puławy</b><span>Mapa Google jest wyłączona w ustawieniach cookies.</span><button class="btn btn-maly" type="button">Pokaż mapę</button>';w.insertBefore(zs,w.firstChild);zs.querySelector('button').onclick=function(){zapisz(true);};}
    if(z===true&&!fr&&w.dataset.src){if(zs)zs.remove();fr=d.createElement('iframe');fr.title='Mapa dojazdu: ul. Centralna 2, Puławy';fr.src=w.dataset.src;fr.loading='lazy';w.insertBefore(fr,w.firstChild);}
  }
  var s=czytaj(); if(!s){ck.hidden=false;} else mapa(s.zew);
  ck.addEventListener('click',function(e){var a=e.target.getAttribute('data-ck');if(!a)return;
    if(a==='wszystkie')zapisz(true);
    else if(a==='niezbedne')zapisz(false);
    else if(a==='ustawienia'){if(op.hidden){op.hidden=false;e.target.textContent='Zapisz wybór';}else zapisz(zew.checked);}
  });
  d.querySelectorAll('[data-cookies]').forEach(function(x){x.addEventListener('click',function(){var v=czytaj();zew.checked=v?v.zew:true;ck.hidden=false;});});
})();
