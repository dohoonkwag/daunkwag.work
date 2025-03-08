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
  createMusicNotes();
  initMusicScoreLines();
});

// Create music notes in the hero section
function createMusicNotes() {
  const musicContainer = document.createElement('div');
  musicContainer.className = 'music-notes-container';
  
  const hero = document.querySelector('.hero');
  hero.appendChild(musicContainer);
  
  const notes = ['♩', '♪', '♫', '♬', '𝄞']; // Music symbols
  const positions = [
    {top: '15%', left: '10%'},
    {top: '25%', left: '85%'},
    {top: '40%', left: '20%'},
    {top: '65%', left: '75%'},
    {top: '75%', left: '15%'},
    {top: '30%', left: '40%'},
    {top: '50%', left: '60%'},
    {top: '70%', left: '30%'}
  ];
  
  positions.forEach((pos, index) => {
    const note = document.createElement('span');
    note.className = 'music-note';
    note.textContent = notes[index % notes.length];
    note.style.top = pos.top;
    note.style.left = pos.left;
    note.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    musicContainer.appendChild(note);
  });
  
  // Add interactive hover effect
  hero.addEventListener('mousemove', (e) => {
    const notes = document.querySelectorAll('.music-note');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    notes.forEach(note => {
      const rect = note.getBoundingClientRect();
      const noteX = rect.left + rect.width / 2;
      const noteY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(mouseX - noteX, 2) + 
        Math.pow(mouseY - noteY, 2)
      );
      
      if (distance < 150) {
        const opacity = 1 - (distance / 150) * 0.5;
        note.style.opacity = opacity;
        note.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(1.2)`;
        note.style.color = '#ffd700'; // Brighter gold when hovered
      } else {
        note.style.opacity = '0.5';
        note.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(1)`;
        note.style.color = '#d4af37'; // Default gold
      }
    });
  });
}

// Initialize music score lines
function initMusicScoreLines() {
  const scoreLines = document.querySelectorAll('.gold-score-line');
  
  scoreLines.forEach(scoreLine => {
    const notesContainer = scoreLine.querySelector('.score-notes');
    const lines = scoreLine.querySelectorAll('.score-line');
    const highlights = scoreLine.querySelectorAll('.score-line-highlight');
    
    // Add random notes to the staff
    const notePositions = [20, 35, 50, 65, 80];
    for (let i = 0; i < 8; i++) {
      const note = document.createElement('span');
      note.className = 'score-note';
      note.textContent = '♪';
      note.style.left = `${notePositions[i % 5] + Math.random() * 10}%`;
      note.style.top = `${Math.floor(Math.random() * 5) * 7}px`;
      notesContainer.appendChild(note);
    }
    
    // Add hover interaction
    scoreLine.addEventListener('mousemove', (e) => {
      const rect = scoreLine.getBoundingClientRect();
      const position = (e.clientX - rect.left) / rect.width;
      
      highlights.forEach(highlight => {
        highlight.style.width = `${position * 100}%`;
      });
      
      const notes = notesContainer.querySelectorAll('.score-note');
      notes.forEach(note => {
        const noteLeft = parseFloat(note.style.left) / 100;
        if (noteLeft <= position) {
          note.style.color = '#ffd700';
          note.style.transform = 'scale(1.2)';
        } else {
          note.style.color = 'rgba(212, 175, 55, 0.6)';
          note.style.transform = 'scale(1)';
        }
      });
    });
    
    scoreLine.addEventListener('mouseleave', () => {
      highlights.forEach(highlight => {
        highlight.style.width = '0';
      });
      
      const notes = notesContainer.querySelectorAll('.score-note');
      notes.forEach(note => {
        note.style.color = 'rgba(212, 175, 55, 0.6)';
        note.style.transform = 'scale(1)';
      });
    });
  });
}