/**
 * ATD PERU - Main JavaScript File
 * Modern ES6+ JavaScript with Bootstrap 5, Swiper, and AOS
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initLoader();
  initNavigation();
  initHeroSwiper();
  initPartnersSwiper();
  initCounters();
  initAOS();
  initBackToTop();
  initSmoothScrolling();
  initPeruMap();

  // Add scroll event listeners
  window.addEventListener("scroll", handleScroll);

  // Add resize event listener
  window.addEventListener("resize", handleResize);
});

/**
 * Loading Spinner Management
 */
function initLoader() {
  const loader = document.getElementById("loader");

  if (loader) {
    // Hide loader after page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.classList.add("hidden");
        setTimeout(() => {
          loader.style.display = "none";
        }, 500);
      }, 1000);
    });
  }
}

/**
 * Navigation Management
 */
function initNavigation() {
  const navbar = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  if (navbar) {
    // Handle navbar scroll effect
    function handleNavbarScroll() {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // Add scroll event for navbar
    window.addEventListener("scroll", handleNavbarScroll);

    // Handle mobile menu close on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      });
    });

    // Handle active navigation links
    function updateActiveNavLink() {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", updateActiveNavLink);
  }
}

/**
 * Hero Section Swiper
 */
function initHeroSwiper() {
  const heroSwiper = document.querySelector(".hero-swiper");

  if (heroSwiper) {
    new Swiper(".hero-swiper", {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      speed: 1000,
      grabCursor: true,
    });
  }
}

/**
 * Partners Carousel Swiper
 */
function initPartnersSwiper() {
  const partnersSwiper = document.querySelector(".partners-swiper");

  if (partnersSwiper) {
    new Swiper(".partners-swiper", {
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      slidesPerView: 2,
      spaceBetween: 30,
      breakpoints: {
        576: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 60,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 70,
        },
      },
      speed: 800,
      grabCursor: true,
    });
  }
}

/**
 * Animated Counters
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter-number");

  if (counters.length > 0) {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }
}

/**
 * AOS (Animate On Scroll) Initialization
 */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
      delay: 100,
    });
  }
}

/**
 * Back to Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    function toggleBackToTop() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }

    // Add scroll event
    window.addEventListener("scroll", toggleBackToTop);

    // Smooth scroll to top on click
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href === "#") return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Peru Map with Work Locations
 */
function initPeruMap() {
  const mapContainer = document.getElementById("peru-map");

  if (mapContainer && typeof L !== "undefined") {
    // Initialize map centered on Peru
    const map = L.map("peru-map").setView([-9.19, -75.0152], 6);

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    // Define work locations with coordinates and project info
    const workLocations = [
      {
        name: "Cusco",
        lat: -13.5319,
        lng: -71.9675,
        projects: [
          "Data Center Movistar",
          "Hotel Belmond Monasterio",
          "Hotel Belmond Nazarenas",
        ],
        icon: "🏗️",
      },
      {
        name: "Lima",
        lat: -12.0464,
        lng: -77.0428,
        projects: ["Oficinas Claro", "Data Center Tecnocom"],
        icon: "🏢",
      },
      {
        name: "Piura",
        lat: -5.1945,
        lng: -80.6328,
        projects: ["Caja Piura", "Caja Sullana"],
        icon: "🏦",
      },
      {
        name: "Arequipa",
        lat: -16.409,
        lng: -71.5375,
        projects: ["SEDAPAR", "Obras Civiles"],
        icon: "🏭",
      },
      {
        name: "Trujillo",
        lat: -8.1116,
        lng: -79.0288,
        projects: ["Coopac Santo Domingo", "Coopac Dile"],
        icon: "🏛️",
      },
      {
        name: "Machu Picchu",
        lat: -13.1631,
        lng: -72.545,
        projects: ["Hotel Belmond Machu Picchu", "Hotel Belmond Rio Sagrado"],
        icon: "🏔️",
      },
    ];

    // Add markers for each work location
    workLocations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng]).addTo(map)
        .bindPopup(`
          <div class="map-popup">
            <h6 class="fw-bold mb-2">${location.icon} ${location.name}</h6>
            <p class="mb-1"><strong>Proyectos:</strong></p>
            <ul class="list-unstyled mb-0">
              ${location.projects
                .map((project) => `<li>• ${project}</li>`)
                .join("")}
            </ul>
          </div>
        `);

      // Add custom icon
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        ">${location.icon}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
      });

      marker.setIcon(customIcon);
    });

    // Fit map to show all markers
    const group = new L.featureGroup(
      workLocations.map((loc) => L.marker([loc.lat, loc.lng]))
    );
    map.fitBounds(group.getBounds().pad(0.1));
  }
}

/**
 * Scroll Event Handler
 */
function handleScroll() {
  // This function can be used for additional scroll-based functionality
  // Currently handled by individual component functions
}

/**
 * Resize Event Handler
 */
function handleResize() {
  // Handle responsive adjustments
  const navbar = document.getElementById("mainNav");

  if (navbar) {
    if (window.innerWidth > 991) {
      navbar.classList.remove("scrolled");
    }
  }
}

/**
 * Form Validation and Submission
 */
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const message = formData.get("message");

      if (!name || !email || !phone || !message) {
        showNotification("Por favor, complete todos los campos.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor, ingrese un email válido.", "error");
        return;
      }

      // Simulate form submission (replace with actual form handling)
      showNotification(
        "Mensaje enviado correctamente. Nos pondremos en contacto pronto.",
        "success"
      );
      this.reset();
    });
  }
}

/**
 * Email Validation Helper
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Notification System
 */
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `alert alert-${
    type === "error" ? "danger" : type
  } alert-dismissible fade show position-fixed`;
  notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

  notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
}

/**
 * Mobile Menu Enhancement
 */
function initMobileMenu() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggler && navbarCollapse) {
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navbarToggler.contains(e.target) &&
        !navbarCollapse.contains(e.target)
      ) {
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  }
}

/**
 * Performance Optimization
 */
function initPerformanceOptimizations() {
  // Preload critical resources
  const criticalResources = [
    "images/hero-1.jpg",
    "images/hero-2.jpg",
    "images/hero-3.jpg",
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = resource;
    document.head.appendChild(link);
  });

  // Initialize lazy loading
  initLazyLoading();
}

/**
 * Accessibility Enhancements
 */
function initAccessibility() {
  // Add skip to content link
  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.textContent = "Saltar al contenido principal";
  skipLink.className = "sr-only sr-only-focusable position-absolute";
  skipLink.style.cssText =
    "top: -40px; left: 6px; z-index: 1001; padding: 8px 16px; background: #000; color: #fff; text-decoration: none;";

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main content landmark
  const mainContent =
    document.querySelector("main") || document.querySelector("#page");
  if (mainContent) {
    mainContent.id = "main-content";
    mainContent.setAttribute("role", "main");
  }

  // Enhance keyboard navigation
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((element) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && element.tagName === "A") {
        e.preventDefault();
        element.click();
      }
    });
  });
}

/**
 * Error Handling
 */
function initErrorHandling() {
  // Global error handler
  window.addEventListener("error", (e) => {
    console.error("Global error:", e.error);
    // You can add error reporting logic here
  });

  // Unhandled promise rejection handler
  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
    // You can add error reporting logic here
  });
}

/**
 * Analytics and Tracking (if needed)
 */
function initAnalytics() {
  // Google Analytics or other tracking code can be added here
  // Example:
  // if (typeof gtag !== 'undefined') {
  //     gtag('config', 'GA_MEASUREMENT_ID');
  // }
}

/**
 * Service Worker Registration (for PWA features)
 */
function initServiceWorker() {
  // Desactivado temporalmente hasta contar con /sw.js real
  return;
}

// Initialize additional features when needed
document.addEventListener("DOMContentLoaded", function () {
  // Initialize these features if the corresponding elements exist
  if (document.getElementById("contactForm")) {
    initContactForm();
  }

  // Always initialize these features
  initMobileMenu();
  initPerformanceOptimizations();
  initAccessibility();
  initErrorHandling();
  initAnalytics();
  initServiceWorker();
});

// Export functions for use in other modules (if using modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    initLoader,
    initNavigation,
    initHeroSwiper,
    initPartnersSwiper,
    initCounters,
    initAOS,
    initBackToTop,
    initSmoothScrolling,
    showNotification,
    isValidEmail,
  };
}
