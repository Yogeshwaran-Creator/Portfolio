const nav = document.querySelector(".nav-links");
const menu = document.querySelector(".menu-toggle");
const theme = document.querySelector(".theme-toggle");
const topBtn = document.querySelector("#topBtn");
const cursor = document.querySelector(".cursor-glow");

menu.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

theme.addEventListener("click", () => {
  document.body.classList.toggle("light");
  theme.textContent = document.body.classList.contains("light") ? "☾" : "☼";
});

window.addEventListener("mousemove", e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  topBtn.classList.toggle("show", scrollY > 500);
});

topBtn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "smooth"}));

document.querySelector("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg = document.querySelector(".form-message");
  msg.textContent = "Message ready! Connect this form to Formspree, EmailJS, or your backend to receive submissions.";
  e.target.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();

// Rotating role titles under the hero heading (typewriter effect)
const roleText = document.querySelector("#role-text");
const roles = ["Python Full Stack Developer.", "Full Stack Developer.", "Software Developer.", "Python Developer."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPE_SPEED = 90;
const DELETE_SPEED = 45;
const HOLD_TIME = 2000;
const GAP_TIME = 400;

function typeLoop() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    charIndex++;
    roleText.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, HOLD_TIME);
      return;
    }
    setTimeout(typeLoop, TYPE_SPEED);
  } else {
    charIndex--;
    roleText.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, GAP_TIME);
      return;
    }
    setTimeout(typeLoop, DELETE_SPEED);
  }
}

if (roleText) {
  typeLoop();
}

// Small floating particle field
const particleBox = document.querySelector(".particles");
for (let i = 0; i < 35; i++) {
  const dot = document.createElement("i");
  dot.style.position = "absolute";
  dot.style.left = `${Math.random()*100}%`;
  dot.style.top = `${Math.random()*100}%`;
  dot.style.width = dot.style.height = `${Math.random()*2+1}px`;
  dot.style.borderRadius = "50%";
  dot.style.background = "rgba(65,180,255,.65)";
  dot.style.boxShadow = "0 0 8px rgba(65,180,255,.7)";
  particleBox.appendChild(dot);
}
