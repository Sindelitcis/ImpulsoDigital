function toggleDrawer() {
  document.getElementById("navDrawer").classList.toggle("open");
}

const revObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("up");
      revObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".r").forEach((el) => revObs.observe(el));

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function countUp(el, target, suffix, duration) {
  duration = duration || 1600;
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(easeOut(progress) * target) + (suffix || "");
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

const cntObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      countUp(entry.target, +entry.target.dataset.target, entry.target.dataset.suffix);
      cntObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll("[data-target]").forEach(function(el) {
  cntObs.observe(el);
});

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = this.querySelector(".btn-send");
    const originalText = btn.innerHTML;
    
    btn.innerHTML = "Enviando...";
    btn.disabled = true;
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    fetch("https://formsubmit.co/ajax/comercial@impulsodigitalmarketing.com.br", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" viewBox="0 0 256 256" style="margin-right:8px; display:inline-block; vertical-align:middle;"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path></svg>Mensagem Enviada!';
      btn.style.background = "#28a745";
      this.reset();
      
      const inputs = this.querySelectorAll("input:not([type='hidden']), select, textarea");
      inputs.forEach(input => sessionStorage.removeItem("impulso_form_" + input.name));

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
      }, 5000);
    })
    .catch(error => {
      console.error("Submission error:", error);
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" viewBox="0 0 256 256" style="margin-right:8px; display:inline-block; vertical-align:middle;"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Zm8,112a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"></path></svg>Erro ao enviar';
      btn.style.background = "#dc3545";
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
      }, 3000);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".rcs-track");
  if (track) {
    const cards = track.querySelectorAll(".rcs-img-card");
    if (cards.length > 1) {
      let currentIndex = 0;
      setInterval(() => {
        currentIndex++;
        if (currentIndex >= cards.length) {
          currentIndex = 0;
        }
        const cardWidth = cards[0].offsetWidth + 12;
        track.scrollTo({ left: currentIndex * cardWidth, behavior: "smooth" });
      }, 3000);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input:not([type='hidden']), select, textarea");

  inputs.forEach(input => {
    const savedValue = sessionStorage.getItem("impulso_form_" + input.name);
    if (savedValue !== null) {
      if (input.type === "checkbox") {
        input.checked = (savedValue === "true");
      } else {
        input.value = savedValue;
      }
    }
  });

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      if (input.type === "checkbox") {
        sessionStorage.setItem("impulso_form_" + input.name, input.checked);
      } else {
        sessionStorage.setItem("impulso_form_" + input.name, input.value);
      }
    });
  });
});