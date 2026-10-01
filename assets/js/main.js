/* ==========================================================
   SAFIZ — site interactions
   ========================================================== */

// ---- Settings: change these to your real details ----
const SETTINGS = {
  whatsappNumber: "923151282583", // +92 315 1282583 (international format, no "+" or spaces)
  phone: "+92 315 1282583",
  whatsappMessage: "Hello SAFIZ, I'd like to discuss marketing for my real estate project.",
  email: "info@safiz.pk",
};

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const waUrl = (text = SETTINGS.whatsappMessage) =>
  `https://wa.me/${SETTINGS.whatsappNumber}?text=${encodeURIComponent(text)}`;

/* ---------- Content for detail modals ---------- */
const PROJECTS = {
  featured: {
    eyebrow: "FEATURED PROJECT",
    title: "Rahat Associates",
    img: "var(--img-featured)",
    body: `
      <p>Rahat Associates is a trusted name in real estate development and investment in Pakistan, delivering premium residential and commercial projects in Islamabad.</p>
      <div class="meta-grid">
        <div><b>3+</b>Active projects</div>
        <div><b>Islamabad</b>Location</div>
        <div><b>Mixed</b>Residential &amp; Commercial</div>
      </div>
      <p><strong>What SAFIZ delivers:</strong> brand positioning, launch campaigns, photography &amp; 3D, landing pages and a full lead-generation funnel.</p>`,
  },
  villas: {
    eyebrow: "RESIDENTIAL",
    title: "Luxury Villas",
    img: "var(--img-villas)",
    body: `
      <p>Contemporary family villas with landscaped gardens, premium finishes and secure gated living in Islamabad.</p>
      <div class="meta-grid">
        <div><b>5 – 7</b>Bedrooms</div>
        <div><b>1 Kanal</b>Plot sizes</div>
        <div><b>Gated</b>Community</div>
      </div>
      <p><strong>Campaign:</strong> luxury brand film, drone photography, targeted Meta &amp; Google ads to overseas Pakistanis.</p>`,
  },
  retail: {
    eyebrow: "COMMERCIAL",
    title: "Retail & Shops",
    img: "var(--img-retail)",
    body: `
      <p>High-footfall retail and office spaces designed for brands, investors and growing businesses.</p>
      <div class="meta-grid">
        <div><b>Ground +</b>Retail floors</div>
        <div><b>Offices</b>Upper floors</div>
        <div><b>Prime</b>Main boulevard</div>
      </div>
      <p><strong>Campaign:</strong> investor-focused ROI messaging, outdoor billboards, LinkedIn and WhatsApp broadcast funnels.</p>`,
  },
  apartments: {
    eyebrow: "RESIDENTIAL",
    title: "Apartment Living",
    img: "var(--img-apartments)",
    body: `
      <p>Modern apartments with smart layouts, community amenities and flexible installment plans.</p>
      <div class="meta-grid">
        <div><b>1 – 3</b>Bedrooms</div>
        <div><b>Easy</b>Installments</div>
        <div><b>Amenities</b>Gym, parking, security</div>
      </div>
      <p><strong>Campaign:</strong> 3D walkthroughs, social media reels and high-volume lead generation for first-time buyers.</p>`,
  },
};

const SERVICES = {
  branding: ["Branding & Identity", "Project names, logos, brand guidelines and sales collateral that make your development instantly recognizable and trusted."],
  digital: ["Digital Marketing", "Performance campaigns on Google, Meta and TikTok, optimized daily for cost-per-lead and booking conversions."],
  social: ["Social Media", "Content calendars, reels, construction updates and community management that keep buyers engaged from launch to handover."],
  leads: ["Lead Generation", "Targeted funnels, landing pages, WhatsApp automation and CRM integration that deliver qualified, sales-ready buyers."],
  photo: ["Property Photography & Video", "Professional photography, drone footage and cinematic brand films that show your project at its best."],
  "3d": ["3D Visualization", "Photoreal renders and interactive walkthroughs to sell off-plan with confidence before construction completes."],
  web: ["Website & Landing Pages", "Fast, mobile-first project websites and landing pages built to capture and convert leads."],
  print: ["Print & Outdoor Advertising", "Billboards, brochures, hoardings and site branding that dominate your location and drive walk-ins."],
};

const INSIGHTS = [
  {
    title: "5 Ways to Generate Qualified Property Leads in 2026",
    body: `<ol class="check-list">
      <li>Run Meta lead ads with instant forms and qualifying questions.</li>
      <li>Connect every lead to WhatsApp within 5 minutes.</li>
      <li>Retarget website visitors with project walkthrough videos.</li>
      <li>Target overseas Pakistanis in the GCC, UK and North America.</li>
      <li>Track cost-per-booking, not just cost-per-lead.</li></ol>`,
  },
  {
    title: "Why Every Housing Project Needs a Brand Story",
    body: `<p>Buyers don't just purchase square feet — they buy into a lifestyle and a developer they trust. A clear brand story aligns your name, visuals, messaging and sales team so every touchpoint builds confidence.</p>
      <p>Projects with a strong identity command better prices, sell faster and generate more referrals.</p>`,
  },
  {
    title: "Selling Off-Plan With 3D Walkthroughs",
    body: `<p>Off-plan buyers need to imagine the finished product. Photoreal 3D renders and virtual walkthroughs remove uncertainty, answer questions before they're asked and help sales teams close faster.</p>
      <p>Use them across your website, social ads and in-office sales screens for maximum impact.</p>`,
  },
];

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3800);
}

/* ---------- Modals ---------- */
let lastFocus = null;
function openModal(id) {
  $$(".modal.open").forEach((m) => closeModal(m, false));
  const modal = document.getElementById(id);
  if (!modal) return;
  lastFocus = document.activeElement;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    const first = $("input, button.modal-close", modal);
    first && first.focus();
  }, 50);
}
function closeModal(modal, restoreFocus = true) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (restoreFocus && lastFocus) lastFocus.focus();
}

function showInfo({ eyebrow, title, body, img }) {
  $("#infoEyebrow").textContent = eyebrow;
  $("#infoTitle").textContent = title;
  $("#infoBody").innerHTML = body;
  const imgEl = $("#infoImg");
  if (img) {
    imgEl.style.backgroundImage = `${img}, linear-gradient(135deg, #1d3049, #c9a14a)`;
    imgEl.classList.add("show");
  } else {
    imgEl.classList.remove("show");
  }
  openModal("infoModal");
}

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  if (opener) {
    e.preventDefault();
    openModal(opener.dataset.open);
    return;
  }

  const closer = e.target.closest("[data-close]");
  if (closer) {
    const modal = closer.closest(".modal");
    if (modal) closeModal(modal, !closer.matches("a"));
    if (!closer.matches("a")) e.preventDefault();
    return;
  }

  const project = e.target.closest("[data-project]");
  if (project) {
    showInfo(PROJECTS[project.dataset.project]);
    return;
  }

  const service = e.target.closest("[data-service]");
  if (service) {
    const [title, text] = SERVICES[service.dataset.service];
    showInfo({ eyebrow: "OUR SERVICES", title, body: `<p>${text}</p>` });
    return;
  }

  const insight = e.target.closest("[data-insight]");
  if (insight) {
    const item = INSIGHTS[insight.dataset.insight];
    showInfo({ eyebrow: "INSIGHTS", title: item.title, body: item.body });
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") $$(".modal.open").forEach((m) => closeModal(m));
});

/* ---------- WhatsApp links ---------- */
$$(".whatsapp-link").forEach((a) => (a.href = waUrl()));

/* ---------- Header: scroll state, mobile menu, active link ---------- */
const header = $("#siteHeader");
const nav = $("#mainNav");
const toggle = $("#menuToggle");

const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", open);
});
$$(".nav-link").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

const navLinks = $$(".nav-link");
const sections = navLinks.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
function setActive() {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0];
  sections.forEach((s) => {
    if (s.getBoundingClientRect().top + window.scrollY <= y) current = s;
  });
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections[sections.length - 1];
  navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + current.id));
}
window.addEventListener("scroll", setActive, { passive: true });
setActive();

/* ---------- Back to top ---------- */
$("#toTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Counters ---------- */
function animateCounter(el) {
  const target = +el.dataset.target;
  const start = performance.now();
  const dur = 1600;
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Reveal on scroll ---------- */
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("visible"));
}
$$(".counter").forEach(animateCounter);

/* ---------- Forms ---------- */
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function validate(form) {
  let ok = true;
  $$("input[required]", form).forEach((input) => {
    const v = input.value.trim();
    const bad = !v || (input.type === "email" && !emailOk(v)) || (input.type === "tel" && v.replace(/\D/g, "").length < 7);
    input.classList.toggle("invalid", bad);
    if (bad) ok = false;
  });
  return ok;
}

function handleForm(form, label, onDone) {
  form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(form)) {
      toast("Please fill in your name, a valid phone number and email.");
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const lines = [`New ${label} request — SAFIZ`, ""];
    Object.entries(data).forEach(([k, v]) => v && lines.push(`${k[0].toUpperCase() + k.slice(1)}: ${v}`));
    const text = lines.join("\n");

    // Keep a local copy of submissions in this browser (handy for testing).
    try {
      const saved = JSON.parse(localStorage.getItem("safiz-leads") || "[]");
      saved.push({ ...data, type: label, at: new Date().toISOString() });
      localStorage.setItem("safiz-leads", JSON.stringify(saved));
    } catch (_) {}

    // Send the enquiry via WhatsApp (opens in a new tab).
    window.open(waUrl(text), "_blank", "noopener");

    form.reset();
    onDone && onDone();
    toast(`Thank you, ${data.name.split(" ")[0]}! We'll contact you within 24 hours.`);
  });
}

handleForm($("#consultForm"), "Consultation", () => closeModal($("#consultModal")));
handleForm($("#contactForm"), "Contact");

/* ---------- Footer year ---------- */
$("#year").textContent = new Date().getFullYear();
