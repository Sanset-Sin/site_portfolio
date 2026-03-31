const body = document.body;
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll("main section[id]");
const revealElements = document.querySelectorAll(".reveal");
const toTop = document.getElementById("toTop");
const year = document.getElementById("year");
const filterButtons = document.querySelectorAll(".chip");
const projectCards = document.querySelectorAll(".project");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.querySelector(".theme-toggle__label");

year.textContent = new Date().getFullYear();

// mobile nav
burger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  burger.classList.toggle("is-active", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    burger.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
  });
});

// reveal on scroll
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// active nav section
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-10% 0px -35% 0px",
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// back to top
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) {
    toTop.classList.add("is-visible");
  } else {
    toTop.classList.remove("is-visible");
  }
});

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// filter projects
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("chip--active"));
    button.classList.add("chip--active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

// theme toggle
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme) {
  if (savedTheme === "light") {
    body.setAttribute("data-theme", "light");
    themeLabel.textContent = "Dark";
  } else {
    body.removeAttribute("data-theme");
    themeLabel.textContent = "Light";
  }
}

themeToggle.addEventListener("click", () => {
  const isLight = body.getAttribute("data-theme") === "light";

  if (isLight) {
    body.removeAttribute("data-theme");
    localStorage.setItem("portfolio-theme", "dark");
    themeLabel.textContent = "Light";
  } else {
    body.setAttribute("data-theme", "light");
    localStorage.setItem("portfolio-theme", "light");
    themeLabel.textContent = "Dark";
  }
});