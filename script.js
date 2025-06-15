var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
  for (tablink of tablinks) {
    tablink.classList.remove("active-link");
  }
  for (tabcontent of tabcontents) {
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
  sidemenu.style.right = "0";
}
function closemenu() {
  sidemenu.style.right = "-200px";
}

// Cache DOM elements
const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");
const sideMenu = document.getElementById("sidemenu");

// Tab Switching Functionality
function openTab(event, tabName) {
  // Remove active classes from all tabs and contents
  tabLinks.forEach(tabLink => tabLink.classList.remove("active-link"));
  tabContents.forEach(tabContent => tabContent.classList.remove("active-tab"));

  // Add active class to the clicked tab and corresponding content
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// Attach Event Listeners to Tab Links
document.querySelectorAll(".tab-links").forEach(tabLink => {
  tabLink.addEventListener("click", event => {
    const tabName = tabLink.getAttribute("onclick").match(/'(.*?)'/)[1]; // Extract tab name
    openTab(event, tabName);
  });
});

// Mobile Menu Toggle Functions
function openMenu() {
  sideMenu.style.right = "0";
  sideMenu.setAttribute("aria-expanded", "true"); // Accessibility
}

function closeMenu() {
  sideMenu.style.right = "-200px";
  sideMenu.setAttribute("aria-expanded", "false"); // Accessibility
}

// Attach Event Listeners to Menu Buttons
document.querySelector(".fa-bars").addEventListener("click", openMenu);
document.querySelector(".fa-times").addEventListener("click", closeMenu);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1); // Get the target ID
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.querySelector(".typing-effect");
  const textArray = ["a Mechanical Engineer.", "a Robotics Enthusiast.", "a Mech Undergrad who codes.", "I learn every day.", "I build the future."];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isLastWord = false;

  function typeEffect() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    textElement.textContent = currentText.substring(0, charIndex);

    let typingSpeed = isDeleting ? 50 : 60; // Faster deleting speed

    if (!isDeleting && charIndex === currentText.length) {
      if (textIndex === textArray.length - 1) {
        // If it's the last word, wait before deleting
        isLastWord = true;
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, 3000); // 2s pause before deleting last word
        return;
      }
      isDeleting = true;
      setTimeout(typeEffect, 1000); // Pause before deleting
      return;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % textArray.length; // Loop back
      setTimeout(typeEffect, 300); // Short pause before next word
      return;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();
});


const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let offsetTime = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const words = [
    "CAD",
    "|",
    "Robotics",
    "|",
    "Python",
    "|",
    "Design",
    "|",
    "Simulation",
    "|",
    "Fusion360",
    "|",
    "Creativity",
    "|",
    "Problem   ",
    "    Solver",
    "|"
  ];

  ctx.font = "bold 20px Arial";
  const spacingY = 80;
  const spacingX = 60;

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let y = 0; y < canvas.height; y += spacingY) {
    const rowDirection = (y / spacingY) % 2 === 0 ? 1 : -1;
    const offsetShift =
      (offsetTime * rowDirection * 0.5) % (spacingX * words.length);

    for (
      let x = -canvas.width;
      x < canvas.width * 2;
      x += spacingX * words.length
    ) {
      words.forEach((word, wordIndex) => {
        const wordX = x + offsetShift + wordIndex * spacingX;
        const dx = wordX - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const redIntensity = Math.max(0, 255 - dist / 1);

        ctx.fillStyle = `rgba(${redIntensity}, ${redIntensity}, ${redIntensity}, 0.4)`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgba(25, 189, 255, 0.7)`;

        ctx.fillText(word, wordX, y);

        ctx.shadowBlur = 0;
      });
    }
  }
  offsetTime++;
  requestAnimationFrame(draw);
}

draw();

// for experiencce section
// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      entry.target.querySelector('.timeline-dot').classList.add('active');

      // Add pulse effect to content
      setTimeout(() => {
        entry.target.querySelector('.timeline-content').classList.add('pulse');
      }, 300);

      setTimeout(() => {
        entry.target.querySelector('.timeline-content').classList.remove('pulse');
      }, 800);
    }
  });
}, observerOptions);

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  observer.observe(item);
});

// Progress bar animation
function updateProgressBar() {
    const timelineContainer = document.getElementById("timeline-container");
    const progressBar = document.getElementById("timeline-progress-bar");

    if (!timelineContainer || !progressBar) return;

    const rect = timelineContainer.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = rect.height;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const containerBottom = containerTop + containerHeight;

    // How much the user has scrolled into the container
    let scrollProgress = (scrollTop + windowHeight - 1.2*containerTop) / (containerHeight);

    scrollProgress = Math.max(0, Math.min(1, scrollProgress));
    progressBar.style.height = `${scrollProgress * 100}%`;
}

// Scroll event listener
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateProgressBar();
      ticking = false;
    });
    ticking = true;
  }
});

// Interactive dot clicks
document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const timelineItem = dot.closest('.timeline-item');
    timelineItem.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    // Highlight effect
    const content = timelineItem.querySelector('.timeline-content');
    content.style.transform = 'scale(1.02)';
    content.style.boxShadow = '0 25px 50px rgba(25, 189, 255, 0.3)';

    setTimeout(() => {
      content.style.transform = '';
      content.style.boxShadow = '';
    }, 500);
  });
});

// Calculate and display statistics
function calculateStats() {
  const items = document.querySelectorAll('.timeline-item');
  let totalMonths = 0;
  const allSkills = new Set();

  items.forEach(item => {
    const duration = parseInt(item.dataset.duration);
    totalMonths += duration;

    const skills = item.querySelectorAll('.skill-tag');
    skills.forEach(skill => allSkills.add(skill.textContent));
  });

  document.getElementById('total-months').textContent = `${totalMonths} months`;
  document.getElementById('skills-count').textContent = allSkills.size;
}

// Hover effects for timeline content
document.querySelectorAll('.timeline-content').forEach(content => {
  content.addEventListener('mouseenter', () => {
    const dot = content.closest('.timeline-item').querySelector('.timeline-dot');
    dot.style.transform = 'scale(1.3)';
    dot.style.boxShadow = '0 0 25px rgba(25, 189, 255, 0.8)';
  });

  content.addEventListener('mouseleave', () => {
    const dot = content.closest('.timeline-item').querySelector('.timeline-dot');
    dot.style.transform = '';
    dot.style.boxShadow = '';
  });
});

// Initialize
calculateStats();
updateProgressBar();

// Smooth reveal animation for title
setTimeout(() => {
  document.querySelector('.section-title').style.opacity = '1';
  document.querySelector('.section-title').style.transform = 'translateY(0)';
}, 100);