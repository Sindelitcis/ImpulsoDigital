// Controle do menu mobile (abrir/fechar gaveta)
function toggleDrawer() {
  document.getElementById('navDrawer').classList.toggle('open');
}

// Observer para disparar as animações de entrada ao scroll (fade up)
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { 
      e.target.classList.add('up'); 
      revObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.r').forEach(el => revObs.observe(el));

// Lógica de suavização para os contadores numéricos
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function countUp(el, target, suffix, dur) {
  dur = dur || 1600;
  var start = null;
  function tick(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.floor(easeOut(p) * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Inicia a contagem dos stats quando o elemento aparece na tela
var cntObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      countUp(e.target, +e.target.dataset.target, e.target.dataset.suffix);
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(function(el) { cntObs.observe(el); });

// Envio do formulário via AJAX para evitar refresh da página
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Trava o comportamento padrão de recarregar

    const btn = this.querySelector('.btn-send');
    const originalText = btn.innerHTML;
    
    // Feedback visual de carregamento
    btn.innerHTML = "Enviando...";
    btn.disabled = true;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // Post via fetch para o endpoint do FormSubmit
    fetch("https://formsubmit.co/ajax/sindelitcis@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" viewBox="0 0 256 256" style="margin-right:8px; display:inline-block; vertical-align:middle;">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"></path>
        </svg>
        Mensagem Enviada!
      `;
      btn.style.background = "#28a745"; 
      this.reset();
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
      }, 5000);
    })
    .catch(error => {
      console.error('Submission error:', error);
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" viewBox="0 0 256 256" style="margin-right:8px; display:inline-block; vertical-align:middle;">
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v72a8,8,0,0,1-16,0Zm8,112a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"></path>
        </svg>
        Erro ao enviar
      `;
      btn.style.background = "#dc3545";
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = "";
      }, 3000);
    });
  });
}

// Lógica para Autoscroll do Carrossel RCS
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.rcs-track');
  
  if (track) {
    const cards = track.querySelectorAll('.rcs-img-card');
    
    if (cards.length > 1) {
      let currentIndex = 0;
      
      setInterval(() => {
        currentIndex++;
        
        if (currentIndex >= cards.length) {
          currentIndex = 0;
        }
        
        const cardWidth = cards[0].offsetWidth + 12;
        
        track.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
        
      }, 3000); 
    }
  }
});