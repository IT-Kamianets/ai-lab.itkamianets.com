document.addEventListener('DOMContentLoaded',()=>{
  const form = document.querySelector('#booking');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    // In a real site, send via fetch to backend or Zapier/CRM
    showToast('Дякуємо! Ми зв' + "'" + 'яжемося з вами для підтвердження запису.');
    form.reset();
  });

  // simple toast helper
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'),4000);
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })

  // Simple gallery lightbox
  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.addEventListener('click', ()=>{
      const overlay = document.createElement('div');
      overlay.style.position='fixed';overlay.style.inset=0;overlay.style.background='rgba(0,0,0,0.8)';overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';overlay.style.zIndex=9999;
      const popup = document.createElement('img'); popup.src=img.src; popup.style.maxWidth='95%'; popup.style.maxHeight='95%'; popup.style.borderRadius='8px';
      overlay.appendChild(popup);
      overlay.addEventListener('click', ()=>document.body.removeChild(overlay));
      document.body.appendChild(overlay);
    })
  })
});
