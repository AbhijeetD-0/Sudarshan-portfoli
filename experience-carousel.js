/**
 * 3D Rotating Carousel Experience Showcase
 * Standalone Modular JavaScript Component
 * 60fps GPU Hardware-Accelerated Animation Engine
 */

export function initExperienceCarousel() {
  const container = document.getElementById("experience-carousel");
  if (!container) return;

  const cards = Array.from(container.querySelectorAll(".exp-card-3d"));
  const tabs = Array.from(document.querySelectorAll(".exp-tab-btn"));
  const dots = Array.from(document.querySelectorAll(".exp-dot"));
  const prevBtn = document.getElementById("exp-prev-btn");
  const nextBtn = document.getElementById("exp-next-btn");
  const viewport = container.querySelector(".carousel-viewport");

  if (!cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;
  let isAnimating = false;
  let rafId = null;

  function updateCarousel(newIndex) {
    currentIndex = (newIndex + totalCards) % totalCards;

    if (rafId) {
      cancelAnimationFrame(rafId);
    }

    rafId = requestAnimationFrame(() => {
      // Update 3D card classes (strictly transform & opacity)
      cards.forEach((card, idx) => {
        card.classList.remove("is-active", "is-left", "is-right", "is-hidden");
        card.setAttribute("aria-hidden", "true");

        if (idx === currentIndex) {
          card.classList.add("is-active");
          card.setAttribute("aria-hidden", "false");
        } else if (idx === (currentIndex - 1 + totalCards) % totalCards) {
          card.classList.add("is-left");
        } else if (idx === (currentIndex + 1) % totalCards) {
          card.classList.add("is-right");
        } else {
          card.classList.add("is-hidden");
        }
      });

      // Update Quick Tabs
      tabs.forEach((tab, idx) => {
        const isActive = idx === currentIndex;
        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      // Update Pagination Dots
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      // Unlock after animation completes
      setTimeout(() => {
        isAnimating = false;
      }, 500);
    });
  }

  function next() {
    if (isAnimating) return;
    isAnimating = true;
    updateCarousel(currentIndex + 1);
  }

  function prev() {
    if (isAnimating) return;
    isAnimating = true;
    updateCarousel(currentIndex - 1);
  }

  function goTo(index) {
    if (isAnimating || index === currentIndex) return;
    if (index >= 0 && index < totalCards) {
      isAnimating = true;
      updateCarousel(index);
    }
  }

  // Navigation button listeners
  if (prevBtn) {
    prevBtn.addEventListener("click", prev, { passive: true });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", next, { passive: true });
  }

  // Quick tab button listeners
  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => goTo(idx), { passive: true });
  });

  // Dots listeners
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => goTo(idx), { passive: true });
  });

  // Card click interaction
  cards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      if (idx === (currentIndex + 1) % totalCards) {
        next();
      } else if (idx === (currentIndex - 1 + totalCards) % totalCards) {
        prev();
      }
    }, { passive: true });
  });

  // Touch and Drag Gesture Handling optimized with requestAnimationFrame & passive listeners
  let startX = 0;
  let isDragging = false;
  let moveX = 0;
  let dragRaf = null;

  if (viewport) {
    // Touch events (passive)
    viewport.addEventListener("touchstart", (e) => {
      if (!e.touches || !e.touches[0]) return;
      startX = e.touches[0].clientX;
      isDragging = true;
      moveX = 0;
    }, { passive: true });

    viewport.addEventListener("touchmove", (e) => {
      if (!isDragging || !e.touches || !e.touches[0]) return;
      if (dragRaf) return;
      
      dragRaf = requestAnimationFrame(() => {
        moveX = e.touches[0].clientX - startX;
        dragRaf = null;
      });
    }, { passive: true });

    viewport.addEventListener("touchend", () => {
      if (!isDragging) return;
      isDragging = false;
      if (dragRaf) {
        cancelAnimationFrame(dragRaf);
        dragRaf = null;
      }
      const threshold = 40;
      if (moveX < -threshold) {
        next();
      } else if (moveX > threshold) {
        prev();
      }
      moveX = 0;
    }, { passive: true });

    viewport.addEventListener("touchcancel", () => {
      isDragging = false;
      moveX = 0;
      if (dragRaf) {
        cancelAnimationFrame(dragRaf);
        dragRaf = null;
      }
    }, { passive: true });

    // Mouse drag events
    viewport.addEventListener("mousedown", (e) => {
      startX = e.clientX;
      isDragging = true;
      moveX = 0;
      viewport.style.cursor = "grabbing";
    }, { passive: true });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      if (dragRaf) return;

      dragRaf = requestAnimationFrame(() => {
        moveX = e.clientX - startX;
        dragRaf = null;
      });
    }, { passive: true });

    window.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      viewport.style.cursor = "default";
      if (dragRaf) {
        cancelAnimationFrame(dragRaf);
        dragRaf = null;
      }
      const threshold = 50;
      if (moveX < -threshold) {
        next();
      } else if (moveX > threshold) {
        prev();
      }
      moveX = 0;
    }, { passive: true });

    // Keyboard Arrow navigation
    window.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    });
  }

  // Initial render with requestAnimationFrame
  updateCarousel(0);
}

// Auto initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initExperienceCarousel);
} else {
  initExperienceCarousel();
}
