// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
// Navigation toggle
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navigation.classList.toggle('open');
  
  // Toggle body scrolling and add/remove menu-open class
  if (navigation.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open'); // Add menu-open class to body
  } else {
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open'); // Remove menu-open class from body
  }
});

// Close menu when clicking on a menu item
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open'); // Also remove menu-open class here
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

  // Add this to your script.js after the existing text reveal animations
  const heroContent = document.querySelector('.hero-content');
  const typewriterText = document.createElement('h2');
  typewriterText.classList.add('typewriter-text');
  heroContent.insertBefore(typewriterText, document.querySelector('.scroll-indicator'));

  // Array of descriptors that represent you
  const descriptors = [
    "Something I do",
    "Another one",
    "One more thing",
    "Something four"
  ];

  let descriptorIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    const currentDescriptor = descriptors[descriptorIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentDescriptor.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typewriterText.textContent = currentDescriptor.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentDescriptor.length) {
      isDeleting = true;
      typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      descriptorIndex = (descriptorIndex + 1) % descriptors.length;
      typingDelay = 500; // Pause before typing next word
    }
    
    setTimeout(typeEffect, typingDelay);
  }

  setTimeout(typeEffect, 2000); // Start after initial animation

  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 40,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#d4af37" // Gold color to match your accent
        },
        "shape": {
          "type": "circle",
        },
        "opacity": {
          "value": 0.3,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#d4af37",
          "opacity": 0.2,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 0.5
            }
          },
          "push": {
            "particles_nb": 3
          }
        }
      },
      "retina_detect": true
    });
  }
});