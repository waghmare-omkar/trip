
(function(){
  function init(){
    const online = navigator.onLine;
    document.querySelectorAll('[data-embed-src]').forEach(el=>{
      if(online){
        const iframe = document.createElement('iframe');
        iframe.setAttribute('referrerpolicy','no-referrer-when-downgrade');
        iframe.setAttribute('loading','lazy');
        iframe.width = '100%';
        iframe.height = '360';
        iframe.style.border = '0';
        iframe.src = el.dataset.embedSrc;
        el.replaceWith(iframe);
      } else {
        const msg = document.createElement('div');
        msg.className = 'notice';
        msg.textContent = 'Map will load when you are online.';
        el.replaceWith(msg);
      }
    });

    const prev = document.querySelector('a[data-prev]');
    const next = document.querySelector('a[data-next]');

    function goPrev(){ if(prev) window.location.href = prev.href; }
    function goNext(){ if(next) window.location.href = next.href; }

    // Keyboard navigation: attach on window to avoid focus issues
    window.addEventListener('keydown', (e)=>{
      if (['INPUT','TEXTAREA'].includes((e.target.tagName||'').toUpperCase())) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    }, {capture:true});

    // On-screen arrow buttons (desktop)
    if(prev){
      const L = document.createElement('button');
      L.className = 'arrow-btn arrow-left';
      L.textContent = '←';
      L.addEventListener('click', goPrev);
      document.body.appendChild(L);
    }
    if(next){
      const R = document.createElement('button');
      R.className = 'arrow-btn arrow-right';
      R.textContent = '→';
      R.addEventListener('click', goNext);
      document.body.appendChild(R);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
