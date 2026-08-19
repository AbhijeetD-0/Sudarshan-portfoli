/**
 * Welcome Gate & Spider Drop Intro Module
 * Standalone, isolated overlay for visitor registration & portfolio reveal.
 */

const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzOp55ze1pAyEJgqLFKm9xiFb3ysPJ2bQO1dwM3WjIqnc3eV8rH01KehX2lvOcQ8Y-9/exec";
const STORAGE_KEY = "hasVisited";

export function initWelcomeGate() {
  // Check if user has already visited in this session
  if (sessionStorage.getItem(STORAGE_KEY) === "true") {
    // Already visited: ensure body is unlocked and exit immediately
    document.body.classList.remove("gate-active");
    const existing = document.getElementById("welcome-gate-overlay");
    if (existing) existing.remove();
    return;
  }

  // Lock background
  document.body.classList.add("gate-active");

  // Create gate DOM
  const gateOverlay = document.createElement("div");
  gateOverlay.id = "welcome-gate-overlay";
  gateOverlay.className = "welcome-gate-overlay";
  gateOverlay.setAttribute("role", "dialog");
  gateOverlay.setAttribute("aria-modal", "true");
  gateOverlay.setAttribute("aria-label", "Welcome to Sudarsan's Portfolio");

  gateOverlay.innerHTML = `
    <!-- Ambient Background Spiderwebs & Glows -->
    <div class="gate-web-bg" aria-hidden="true">
      <div class="web-ambient-orb web-orb-1"></div>
      
      <!-- Top Left Spiderweb SVG -->
      <svg class="web-corner web-corner-top-left" viewBox="0 0 100 100" fill="none">
        <path d="M0,0 L100,0 M0,0 L85,45 M0,0 L55,75 M0,0 L0,100" stroke-width="0.75" />
        <path d="M25,0 Q23,12 0,25" stroke-width="0.75" />
        <path d="M50,0 Q45,25 0,50" stroke-width="0.75" />
        <path d="M75,0 Q68,38 0,75" stroke-width="0.75" />
        <path d="M100,0 Q90,50 0,100" stroke-width="0.75" />
      </svg>

      <!-- Top Right Spiderweb SVG -->
      <svg class="web-corner web-corner-top-right" viewBox="0 0 100 100" fill="none">
        <path d="M0,0 L100,0 M0,0 L85,45 M0,0 L55,75 M0,0 L0,100" stroke-width="0.75" />
        <path d="M25,0 Q23,12 0,25" stroke-width="0.75" />
        <path d="M50,0 Q45,25 0,50" stroke-width="0.75" />
        <path d="M75,0 Q68,38 0,75" stroke-width="0.75" />
        <path d="M100,0 Q90,50 0,100" stroke-width="0.75" />
      </svg>
    </div>

    <!-- Spider Drop Rig -->
    <div class="spider-rig-container" id="spider-rig" aria-hidden="true">
      <div class="spider-silk" id="spider-silk"></div>
      
      <div class="spider-avatar" id="spider-avatar">
        <svg class="spider-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="spiderGlowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="60%" stop-color="#2563eb" />
              <stop offset="100%" stop-color="#0f172a" />
            </radialGradient>
            <linearGradient id="spiderLegGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#818cf8" />
            </linearGradient>
          </defs>

          <!-- Left Legs -->
          <path class="spider-leg" d="M40 45 Q20 25 10 32 Q2 38 5 50" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M38 50 Q16 40 8 52 Q2 62 8 72" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M40 55 Q20 58 12 70 Q8 80 18 90" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M42 60 Q26 72 20 84 Q16 94 28 98" stroke="url(#spiderLegGradient)" />

          <!-- Right Legs -->
          <path class="spider-leg" d="M60 45 Q80 25 90 32 Q98 38 95 50" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M62 50 Q84 40 92 52 Q98 62 92 72" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M60 55 Q80 58 88 70 Q92 80 82 90" stroke="url(#spiderLegGradient)" />
          <path class="spider-leg" d="M58 60 Q74 72 80 84 Q84 94 72 98" stroke="url(#spiderLegGradient)" />

          <!-- Spinneret Connection -->
          <circle cx="50" cy="30" r="3" fill="#38bdf8" />
          <line x1="50" y1="0" x2="50" y2="30" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="2,2" />

          <!-- Abdomen (Lower Body) -->
          <ellipse class="spider-body" cx="50" cy="65" rx="14" ry="19" />
          <path d="M46 55 L50 63 L54 55 M50 63 L50 78 M46 72 L50 78 L54 72" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" />

          <!-- Cephalothorax (Upper Body) -->
          <ellipse class="spider-core" cx="50" cy="45" rx="10" ry="11" />
          
          <!-- Eyes -->
          <circle class="spider-eyes" cx="46" cy="40" r="1.5" />
          <circle class="spider-eyes" cx="54" cy="40" r="1.5" />
          <circle class="spider-eyes" cx="44" cy="43" r="1" />
          <circle class="spider-eyes" cx="56" cy="43" r="1" />
        </svg>
      </div>
    </div>

    <!-- Interactive Gate Content -->
    <div class="gate-content-wrap">
      <div class="gate-header">
        <div class="gate-badge">
          <span class="gate-badge-dot"></span>
          <span>Official Visitor Access</span>
        </div>
        <h1 class="gate-title">
          Welcome to <span class="gate-title-gradient">Sudarsan's Portfolio</span>
        </h1>
        <p class="gate-subtitle">
          Please share your contact details to connect and enter the portfolio experience.
        </p>
      </div>

      <!-- Card Container -->
      <div class="gate-card">
        <!-- Background subtle corner web -->
        <svg class="gate-card-web-accent" viewBox="0 0 100 100" fill="none">
          <path d="M100,100 L0,100 M100,100 L20,60 M100,100 L60,20 M100,100 L100,0" stroke-width="0.75" />
          <path d="M100,75 Q85,73 75,100" stroke-width="0.75" />
          <path d="M100,50 Q70,45 50,100" stroke-width="0.75" />
          <path d="M100,25 Q55,18 25,100" stroke-width="0.75" />
        </svg>

        <form class="gate-form" id="gate-form" novalidate>
          <!-- Field 1: Full Name -->
          <div class="gate-input-group" id="group-name">
            <label class="gate-label" for="gate-name">
              <span>Full Name</span>
              <span class="gate-label-req">* Required</span>
            </label>
            <div class="gate-input-wrapper">
              <span class="gate-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              <input 
                type="text" 
                id="gate-name" 
                name="name" 
                class="gate-input" 
                placeholder="e.g. Rahul Sharma" 
                autocomplete="name"
                required
              />
              <span class="gate-input-status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
            <span class="gate-error-hint">Please enter your full name (minimum 2 characters).</span>
          </div>

          <!-- Field 2: Email Address -->
          <div class="gate-input-group" id="group-email">
            <label class="gate-label" for="gate-email">
              <span>Email Address</span>
              <span class="gate-label-req">* Required</span>
            </label>
            <div class="gate-input-wrapper">
              <span class="gate-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>
              <input 
                type="email" 
                id="gate-email" 
                name="email" 
                class="gate-input" 
                placeholder="name@company.com" 
                autocomplete="email"
                required
              />
              <span class="gate-input-status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
            <span class="gate-error-hint">Please enter a valid email address.</span>
          </div>

          <!-- Field 3: Mobile Number -->
          <div class="gate-input-group" id="group-phone">
            <label class="gate-label" for="gate-phone">
              <span>Mobile Number</span>
              <span class="gate-label-req">* 10 Digits</span>
            </label>
            <div class="gate-input-wrapper">
              <span class="gate-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              <input 
                type="tel" 
                id="gate-phone" 
                name="phone" 
                class="gate-input" 
                placeholder="10-digit mobile number" 
                maxlength="10" 
                inputmode="numeric"
                autocomplete="tel"
                required
              />
              <span class="gate-input-status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
            <span class="gate-error-hint">Please enter a valid 10-digit mobile number.</span>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="gate-submit-btn" id="gate-submit-btn" disabled>
            <span class="gate-btn-text">Continue to Portfolio</span>
            <span class="gate-btn-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span class="gate-btn-spinner" aria-hidden="true"></span>
          </button>
        </form>

        <!-- Footer / Skip Option -->
        <div class="gate-footer-links">
          <button type="button" class="gate-skip-btn" id="gate-skip-btn">
            <span>Skip for now &rarr;</span>
          </button>
          <p class="gate-privacy-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Your contact details are kept private &amp; secure.</span>
          </p>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(gateOverlay);

  // Trigger drop animation after brief render cycle
  requestAnimationFrame(() => {
    setTimeout(() => {
      gateOverlay.classList.add("anim-started");
    }, 100);
  });

  // Setup form logic
  setupGateInteractions(gateOverlay);
}

function setupGateInteractions(overlay) {
  const form = document.getElementById("gate-form");
  const nameInput = document.getElementById("gate-name");
  const emailInput = document.getElementById("gate-email");
  const phoneInput = document.getElementById("gate-phone");
  const submitBtn = document.getElementById("gate-submit-btn");
  const skipBtn = document.getElementById("gate-skip-btn");

  const groupName = document.getElementById("group-name");
  const groupEmail = document.getElementById("group-email");
  const groupPhone = document.getElementById("group-phone");

  if (!form || !nameInput || !emailInput || !phoneInput || !submitBtn) return;

  // Validation rules
  function isValidName(val) {
    return val.trim().length >= 2;
  }

  function isValidEmail(val) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(val.trim());
  }

  function isValidPhone(val) {
    const digitsOnly = val.replace(/\D/g, "");
    return digitsOnly.length === 10;
  }

  // Format phone to digits only as user types
  phoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
    validateAll(false);
  });

  nameInput.addEventListener("input", () => validateAll(false));
  emailInput.addEventListener("input", () => validateAll(false));

  nameInput.addEventListener("blur", () => validateField(nameInput, groupName, isValidName(nameInput.value)));
  emailInput.addEventListener("blur", () => validateField(emailInput, groupEmail, isValidEmail(emailInput.value)));
  phoneInput.addEventListener("blur", () => validateField(phoneInput, groupPhone, isValidPhone(phoneInput.value)));

  function validateField(input, group, isValid) {
    if (input.value.trim() === "") {
      group.classList.remove("is-valid", "is-invalid");
      return;
    }
    if (isValid) {
      group.classList.remove("is-invalid");
      group.classList.add("is-valid");
    } else {
      group.classList.remove("is-valid");
      group.classList.add("is-invalid");
    }
  }

  function validateAll(showErrors = false) {
    const nameValid = isValidName(nameInput.value);
    const emailValid = isValidEmail(emailInput.value);
    const phoneValid = isValidPhone(phoneInput.value);

    if (showErrors) {
      validateField(nameInput, groupName, nameValid);
      validateField(emailInput, groupEmail, emailValid);
      validateField(phoneInput, groupPhone, phoneValid);
    } else {
      if (nameValid) groupName.classList.add("is-valid");
      if (emailValid) groupEmail.classList.add("is-valid");
      if (phoneValid) groupPhone.classList.add("is-valid");
    }

    const allValid = nameValid && emailValid && phoneValid;
    submitBtn.disabled = !allValid;
    return allValid;
  }

  // Form Submit Handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateAll(true)) return;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    const payload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      timestamp: new Date().toISOString(),
      source: "Portfolio Welcome Gate"
    };

    // Send payload to Google Sheets Webhook endpoint
    try {
      // mode: 'no-cors' allows Google Apps Script Webhooks to accept data cleanly without preflight CORS blocks
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn("Webhook submission note:", err);
    }

    // Dismiss gate and unlock portfolio
    dismissGate(overlay);
  });

  // Skip button click handler
  if (skipBtn) {
    skipBtn.addEventListener("click", () => {
      dismissGate(overlay);
    });
  }
}

function dismissGate(overlay) {
  // Store session flag so returning users don't see it again in this session
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch (e) {
    console.warn("sessionStorage unavailable", e);
  }

  // Spider climbs back up smoothly
  overlay.classList.add("spider-climbing");

  setTimeout(() => {
    // Fade out overlay & unlock main background
    overlay.classList.add("gate-dismissed");
    document.body.classList.remove("gate-active");

    setTimeout(() => {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 800);
  }, 350);
}

// Auto-run if loaded via script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWelcomeGate);
} else {
  initWelcomeGate();
}
