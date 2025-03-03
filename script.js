// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('open');
    
    // Toggle body scrolling when menu is open
    if (navigation.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking on a menu item
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navigation.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Page navigation with transitions
  const transitionLinks = document.querySelectorAll('a[href]:not([target="_blank"])');
  const transitionOverlay = document.querySelector('.transition-overlay');
  
  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.includes('#') || href === '') return;
      
      e.preventDefault();
      
      gsap.to(transitionOverlay, {
        y: 0,
        duration: 0.5,
        onComplete: () => {
          window.location.href = href;
        }
      });
    });
  });

  // Initial page load animation
  gsap.from(transitionOverlay, {
    y: 0,
    duration: 0.5,
    delay: 0.2,
    onComplete: () => {
      gsap.set(transitionOverlay, { y: '100%' });
    }
  });

  // Fade-in animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  fadeElements.forEach(element => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => element.classList.add('active')
    });
  });

  // Section animations
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    gsap.from(section.querySelector('.section-title'), {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      }
    });
    
    gsap.from(section.querySelector('.section-text'), {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      }
    });
    
    if (section.querySelector('.btn')) {
      gsap.from(section.querySelector('.btn'), {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%'
        }
      });
    }
  });

  // Text reveal animations for headings with reveal-text class
  const textReveals = document.querySelectorAll('.reveal-text');
  textReveals.forEach(text => {
    text.innerHTML = `<span>${text.textContent}</span>`;
    const textSpan = text.querySelector('span');
    textSpan.style.display = 'block';
    
    let delay = 0;
    if (text.classList.contains('delay-1')) delay = 0.2;
    if (text.classList.contains('delay-2')) delay = 0.4;
    
    gsap.from(textSpan, {
      y: '100%',
      duration: 1.5,
      delay: delay,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        once: true
      }
    });
  });
});