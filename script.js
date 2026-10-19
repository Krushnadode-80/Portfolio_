// Hamburger Menu Toggle
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Close mobile menu on link click
document.querySelectorAll('.menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
      icon.classList.remove("open");
    }
  });
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: stop observing once revealed
      // observer.unobserve(entry.target); 
    }
  });
};

const revealOptions = {
  root: null,
  threshold: 0.15, // Trigger when 15% is visible
  rootMargin: "0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Typing Effect for Hero Section
const typingText = document.getElementById("typing-text");
if (typingText) {
  const roles = ["Web Developer", "Python Developer", "Full-Stack Developer", "Backend Developer"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50; // delete faster
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120; // type normal speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000; // pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // pause before typing new word
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing effect after a short delay
  setTimeout(type, 1000);
}

// Navbar Blur Effect on Scroll
window.addEventListener('scroll', () => {
  const desktopNav = document.getElementById('desktop-nav');
  const hamburgerNav = document.getElementById('hamburger-nav');
  
  if (window.scrollY > 50) {
    desktopNav.style.background = 'rgba(15, 17, 21, 0.9)';
    desktopNav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    
    hamburgerNav.style.background = 'rgba(15, 17, 21, 0.9)';
    hamburgerNav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    desktopNav.style.background = 'rgba(15, 17, 21, 0.7)';
    desktopNav.style.boxShadow = 'none';
    
  }
});

// Contact Form AJAX Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission redirect

    const submitBtn = this.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(this);

    fetch(this.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // Tell FormSubmit we want a JSON response instead of a redirect HTML page
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success message without an OK button
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Successfully submitted! Thank you for getting in touch.';
        successMsg.style.color = '#4ade80'; // soft green
        successMsg.style.marginTop = '15px';
        successMsg.style.fontWeight = '500';
        successMsg.id = 'form-success-message';
        
        // Remove existing message if any
        const existingMsg = contactForm.querySelector('#form-success-message');
        if (existingMsg) existingMsg.remove();
        
        contactForm.appendChild(successMsg);
        
        this.reset(); // Clear the form fields
        
        // Auto-hide the message after 5 seconds
        setTimeout(() => {
          if (successMsg && successMsg.parentNode) {
            successMsg.remove();
          }
        }, 5000);
      } else {
        alert('Oops! There was a problem submitting your form.');
      }
    })
    .catch(error => {
      alert('Oops! There was a problem submitting your form.');
    })
    .finally(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    });
  });
}
