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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll progress line
  function updateScrollProgress(){
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    doc.style.setProperty('--scroll-progress', `${Math.min(100, Math.max(0, progress))}%`);
  }
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Reveal on scroll
  const revealTargets = document.querySelectorAll(
    'section, .card, .price-item, .review, .gallery-grid img, .about-photo, .booking-form'
  );

  revealTargets.forEach((el, index)=>{
    el.classList.add('reveal');
    el.style.setProperty('--d', `${Math.min(index % 8, 7) * 70}ms`);
  });

  if (prefersReducedMotion) {
    revealTargets.forEach(el=>el.classList.add('in-view'));
  } else {
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.14, rootMargin:'0px 0px -8% 0px'});

    revealTargets.forEach(el=>observer.observe(el));
  }

  // Subtle hero parallax
  const hero = document.querySelector('.hero');
  function updateParallax(){
    if(!hero || prefersReducedMotion) return;
    const offset = Math.min(70, window.scrollY * 0.12);
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  }
  updateParallax();
  window.addEventListener('scroll', updateParallax, { passive: true });

  // Card tilt interaction
  if(!prefersReducedMotion){
    const tiltTargets = document.querySelectorAll('.card, .price-item, .review');
    tiltTargets.forEach(card=>{
      card.addEventListener('mousemove', (e)=>{
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 6;
        const rotateX = (0.5 - py) * 6;
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', ()=>{
        card.style.transform = '';
      });
    });
  }

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

  // Mobile bottom navigation smart hiding
  const mobileNav = document.getElementById('mobileNav');
  if(mobileNav && window.innerWidth <= 768){
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateMobileNav(){
      const currentScrollY = window.scrollY;
      
      // Show nav when scrolling up or at top
      if(currentScrollY < lastScrollY || currentScrollY < 100){
        mobileNav.classList.remove('hidden');
      } 
      // Hide nav when scrolling down (but not near top)
      else if(currentScrollY > lastScrollY && currentScrollY > 150){
        mobileNav.classList.add('hidden');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', ()=>{
      if(!ticking){
        window.requestAnimationFrame(updateMobileNav);
        ticking = true;
      }
    }, { passive: true });

    // Highlight active section
    const navItems = mobileNav.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveSection(){
      const scrollY = window.scrollY + 100;
      
      sections.forEach(section=>{
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
          navItems.forEach(item=>{
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${sectionId}`){
              item.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightActiveSection, { passive: true });
    highlightActiveSection();
  }
});
