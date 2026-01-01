// script.js

const ROLES = [
  "Data Scientist",
  "AI Engineer",
  "Machine Learning Engineer"
];

const PROJECTS = [
  {
    title: "XploRAG: Explainable RAG",
    description: "Explainable RAG with verified sources for fast, transparent technical search.",
    tech: ["RAG", "FAISS", "MPNet", "FLAN-T5"],
    github: "https://github.com/sunny-arch-82/xploRAG",
    image: "assets/icons/project-xplorag.png"
  },
  {
    title: "WeLearn: AI-Assisted Course Planning",
    description: "AI course planner that builds structured learning paths with curated resources.",
    tech: ["LangChain", "Search", "Retrieval", "React"],
    github: "https://github.com/sunny-arch-82/welearn-backend",
    image: "assets/icons/project-welearn.png"
  },
  {
    title: "JOHN: A Virtual Voice Assistant",
    description: "Voice assistant with intent classification and entity extraction for fast actions.",
    tech: ["NLP", "spaCy", "NLTK", "Speech"],
    github: "https://github.com/sunny-arch-82/johnX",
    image: "assets/icons/project-john.png"
  },
  {
    title: "ClimateRiskAI",
    description: "Automated climate risk scoring using Earth Engine analytics and BigQuery ML.",
    tech: ["Python", "GCP", "BigQuery", "GeoML"],
    github: "https://github.com/sunny-arch-82/ClimateRiskAI",
    image: "assets/icons/project-climateriskai.png"
  },
  {
    title: "SynapseOps (Local MVP)",
    description: "Agentic GenAI MVP with RAG over docs plus telemetry anomaly detection.",
    tech: ["Agents", "RAG", "Telemetry", "FastAPI"],
    github: "https://github.com/sunny-arch-82/synapseops",
    image: "assets/icons/project-synapseops.png"
  },
  {
    title: "AURA",
    description: "AI project sandbox for experiments, workflows, and rapid prototypes.",
    tech: ["AI", "Pipelines", "APIs", "Cloud"],
    github: "https://github.com/sunny-arch-82/AURA",
    image: "assets/icons/project-aura.png"
  }
];

// DOM
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");
const navLinks = document.querySelectorAll(".nav-link");
const roleText = document.getElementById("roleText");
const projectsGrid = document.getElementById("projectsGrid");
const contactForm = document.getElementById("contactForm");
const sections = document.querySelectorAll(".section");
const downArrow = document.getElementById("downArrow");
const backToTop = document.getElementById("backToTop");

const NAV_SHOW_SCROLL = 120;
const NAV_EVER_KEY = "navEverShown";

function setNavEverShown() {
  try { localStorage.setItem(NAV_EVER_KEY, "true"); } catch (e) {}
}

function getNavEverShown() {
  try { return localStorage.getItem(NAV_EVER_KEY) === "true"; } catch (e) { return false; }
}

function showNavPermanent() {
  nav.classList.add("visible");
  setNavEverShown();
}

function handleNavVisibility() {
  const ever = getNavEverShown();
  if (ever) {
    nav.classList.add("visible");
    return;
  }
  if (window.scrollY > NAV_SHOW_SCROLL) {
    nav.classList.add("visible");
    setNavEverShown();
  } else {
    nav.classList.remove("visible");
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      showNavPermanent();
      navMobile.classList.remove("open");

      const navHeight = nav.classList.contains("visible") ? nav.offsetHeight : 0;
      const targetTop = target.offsetTop - navHeight;

      window.scrollTo({ top: targetTop, behavior: "smooth" });
    });
  });
}

function initMobileMenu() {
  if (!navToggle) return;
  navToggle.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });
}

function initActiveSection() {
  const options = { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const sectionId = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) link.classList.add("active");
      });
    });
  }, options);

  sections.forEach((s) => observer.observe(s));
  const hero = document.getElementById("hero");
  if (hero) observer.observe(hero);
}

class TypeWriter {
  constructor(element, words, typeSpeed = 80, deleteSpeed = 40, pauseTime = 1800) {
    this.element = element;
    this.words = words;
    this.typeSpeed = typeSpeed;
    this.deleteSpeed = deleteSpeed;
    this.pauseTime = pauseTime;

    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.tick();
  }

  tick() {
    const word = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.element.textContent = word.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = word.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === word.length) {
      delay = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 400;
    }

    window.setTimeout(() => this.tick(), delay);
  }
}

function renderProjects() {
  if (!projectsGrid) return;

  const html = PROJECTS.map((p) => {
    const tech = p.tech.map((t) => `<span class="project-tech-chip">${t}</span>`).join("");

    const img = p.image
      ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
      : `<div class="project-image-placeholder" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
        </div>`;

    return `
      <article class="project-card reveal">
        <div class="project-image">${img}</div>
        <div class="project-content">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-description">${p.description}</p>
          <div class="project-tech">${tech}</div>
          <a class="project-link" href="${p.github}" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        </div>
      </article>
    `;
  }).join("");

  projectsGrid.innerHTML = html;
}

function initScrollReveal() {
  const nodes = document.querySelectorAll(".reveal");
  const options = { root: null, rootMargin: "0px 0px -110px 0px", threshold: 0.12 };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      io.unobserve(e.target);
    });
  }, options);

  nodes.forEach((n) => io.observe(n));
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    const recipient = "synnchinu@gmail.com";
    const subject = encodeURIComponent(`Portfolio Contact from ${name || "Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
}

function handleBackToTop() {
  if (!backToTop) return;
  const showAt = 500;
  if (window.scrollY > showAt) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
}

function initBackToTop() {
  if (!backToTop) return;
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initDownArrow() {
  if (!downArrow) return;
  downArrow.addEventListener("click", () => {
    showNavPermanent();
    const about = document.getElementById("about");
    if (!about) return;
    const navHeight = nav.classList.contains("visible") ? nav.offsetHeight : 0;
    const y = about.offsetTop - navHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  });
}

/* AI CANVAS: unchanged */
function initAICanvas() {
  const canvas = document.getElementById("aiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  const state = {
    t: 0,
    mouseX: 0,
    mouseY: 0,
    hasMouse: false
  };

  const particles = [];
  const particleCountBase = 72;

  function resize() {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles.length = 0;
    const count = Math.round(particleCountBase + (w * h) / 45000);
    for (let i = 0; i < count; i++) {
      particles.push(makeParticle());
    }
  }

  function makeParticle() {
    const speed = 0.20 + Math.random() * 0.55;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.0 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2
    };
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    state.mouseX = e.clientX - rect.left;
    state.mouseY = e.clientY - rect.top;
    state.hasMouse = true;
  }

  function onLeave() {
    state.hasMouse = false;
  }

  canvas.addEventListener("mousemove", onMove);
  canvas.addEventListener("mouseleave", onLeave);

  window.addEventListener("resize", resize);

  function draw() {
    state.t += 0.012;

    ctx.fillStyle = "rgba(10, 10, 15, 0.22)";
    ctx.fillRect(0, 0, w, h);

    const grd = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.75);
    grd.addColorStop(0, "rgba(0, 0, 0, 0)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0.65)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (state.hasMouse) {
        const dx = state.mouseX - p.x;
        const dy = state.mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = Math.max(0, 120 - dist) / 120;
        p.x += (dx / dist) * pull * 0.35;
        p.y += (dy / dist) * pull * 0.35;
      }

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;
    }

    const linkDist = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > linkDist) continue;

        const alpha = (1 - dist / linkDist) * 0.22;

        const mix = (Math.sin(state.t + (a.phase + b.phase) * 0.5) + 1) * 0.5;
        const r = Math.round(60 + mix * 120);
        const g = Math.round(140 + mix * 40);
        const bb = Math.round(210 + mix * 30);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${bb}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const p of particles) {
      const pulse = 0.6 + 0.4 * Math.sin(state.t + p.phase);
      ctx.fillStyle = `rgba(53, 211, 255, ${0.22 + 0.22 * pulse})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(155, 123, 255, 0.14)";
    for (let k = 0; k < 6; k++) {
      const x = (Math.sin(state.t * (0.6 + k * 0.12) + k * 2.2) + 1) * 0.5 * w;
      const y = (Math.cos(state.t * (0.55 + k * 0.10) + k * 1.7) + 1) * 0.5 * h;
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  requestAnimationFrame(draw);
}

function init() {
  renderProjects();

  if (roleText) new TypeWriter(roleText, ROLES);

  document.querySelectorAll(".section-title, .skill-category, .about-text, .about-side, .resume-content, .contact-content, .exp-card").forEach((el) => {
    el.classList.add("reveal");
  });

  initScrollReveal();
  initSmoothScroll();
  initMobileMenu();
  initActiveSection();
  initContactForm();
  initDownArrow();
  initBackToTop();
  initAICanvas();

  window.addEventListener("scroll", () => {
    handleNavVisibility();
    handleBackToTop();
  }, { passive: true });

  handleNavVisibility();
  handleBackToTop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
