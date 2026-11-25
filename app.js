(function(){
  var d=document;
  var rok=d.getElementById('rok'); if(rok) rok.textContent=new Date().getFullYear();
  // menu mobilne
  var b=d.getElementById('burger'), m=d.getElementById('menu');
  function zamknij(){m.classList.remove('otwarte');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Otwórz menu');}
  b.addEventListener('click',function(){var o=m.classList.toggle('otwarte');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij);});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij();});
  // dolny pasek na telefonie po przewinięciu za przyciski pierwszego ekranu
  var mob=d.getElementById('mob'), prog=d.querySelector('[data-mob]');
  if(mob&&prog&&'IntersectionObserver' in window){
    new IntersectionObserver(function(en){var w=!en[0].isIntersecting&&en[0].boundingClientRect.top<0;mob.classList.toggle('widac',w);mob.setAttribute('aria-hidden',w?'false':'true');}).observe(prog);
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
  // formularz (na podglądzie bez wysyłki)
  var f=d.getElementById('zapytanie'), info=d.getElementById('form-info');
  if(f) f.addEventListener('submit',function(e){e.preventDefault();
    if(!f.imie.value.trim()||!f.kontakt.value.trim()||!f.zgoda.checked){info.textContent='Proszę uzupełnić imię, kontakt i zaznaczyć zgodę.';return;}
    info.textContent='Dziękujemy. To podgląd strony - po uruchomieniu zapytanie trafi na skrzynkę biura.';f.reset();});
})();
