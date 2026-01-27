/**
 * ══════════════════════════════════════════════════════════════
 * MEY TRANÇAS - Script Principal
 * Funcionalidades: Menu ativo, filtro de portfólio, lightbox,
 * formulário WhatsApp, acessibilidade
 * ══════════════════════════════════════════════════════════════
 */

// IIFE para evitar poluição do escopo global
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  // CONFIGURAÇÃO
  // ─────────────────────────────────────────────────────────────
  const CONFIG = {
    whatsappNumber: '559181045584',
    whatsappApi: 'https://wa.me/',
    navLinkSelector: '.nav-link',
    sectionSelector: 'main section',
    filterBtnSelector: '.filter-btn',
    portfolioItemSelector: '.portfolio-item',
    portfolioGridSelector: '#portfolio-grid',
    lightboxSelector: '#lightbox-modal',
    lightboxImageSelector: '#lightbox-image',
    lightboxTitleSelector: '#lightbox-title',
    formSelector: '#form-contato',
    feedbackSelector: '#mensagem-feedback',
    yearSelector: '#ano-atual',
  };

  // ─────────────────────────────────────────────────────────────
  // 1. NAVEGAÇÃO ATIVA COM INTERSECTION OBSERVER
  // ─────────────────────────────────────────────────────────────
  function initNavigation() {
    const navLinks = document.querySelectorAll(CONFIG.navLinkSelector);
    const sections = document.querySelectorAll(CONFIG.sectionSelector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetId = entry.target.getAttribute('id');
            const activeLink = document.querySelector(
              `${CONFIG.navLinkSelector}[href="#${targetId}"]`
            );

            if (activeLink) {
              // Remove classe ativa de todos os links
              navLinks.forEach((link) => link.classList.remove('active'));
              // Adiciona classe ativa ao link correspondente
              activeLink.classList.add('active');
              // Atualiza aria-pressed
              navLinks.forEach((link) => {
                link.setAttribute(
                  'aria-pressed',
                  link === activeLink ? 'true' : 'false'
                );
              });
            }
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((section) => observer.observe(section));

    // Scroll suave ao clicar nos links
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // ─────────────────────────────────────────────────────────────
  // 2. LIGHTBOX MODAL
  // ─────────────────────────────────────────────────────────────
  function initLightbox() {
    const lightboxModal = document.querySelector(CONFIG.lightboxSelector);
    const lightboxImage = document.querySelector(CONFIG.lightboxImageSelector);
    const lightboxTitle = document.querySelector(CONFIG.lightboxTitleSelector);
    const portfolioItems = Array.from(
      document.querySelectorAll(CONFIG.portfolioItemSelector)
    );
    const closeBtn = lightboxModal.querySelector('.lightbox-close');
    const prevBtn = lightboxModal.querySelector('.lightbox-prev');
    const nextBtn = lightboxModal.querySelector('.lightbox-next');

    let currentIndex = 0;
    const visibleItems = [];

    // Dados das imagens (título e descrição)
    const portfolioData = {
      0: { title: 'Nagô — Tiara' },
      1: { title: 'Tranças — Boxbraids' },
      2: { title: 'Nagô — Lateral' },
      3: { title: 'Masculina — Design' },
      4: { title: 'Tranças — Goddessbraids' },
      5: { title: 'Nagô — Boxeadora' },
      6: { title: 'Tranças — Bohobraids' },
      7: { title: 'Masculina — Nagô Profissional' },
    };

    function openLightbox(index) {
      const item = visibleItems[index];
      const imgElement = item.querySelector('img');
      const itemIndex = portfolioItems.indexOf(item);

      lightboxImage.src = imgElement.src;
      lightboxImage.alt = imgElement.alt;
      lightboxTitle.textContent = portfolioData[itemIndex]?.title || 'Portfólio';

      currentIndex = index;
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus trapping
      closeBtn.focus();
    }

    function closeLightbox() {
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Abrir lightbox ao clicar em portfolio items
    portfolioItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        updateVisibleItems();
        const visibleIndex = visibleItems.indexOf(item);
        if (visibleIndex !== -1) {
          openLightbox(visibleIndex);
        }
      });

      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          updateVisibleItems();
          const visibleIndex = visibleItems.indexOf(item);
          if (visibleIndex !== -1) {
            openLightbox(visibleIndex);
          }
        }
      });
    });

    function updateVisibleItems() {
      visibleItems.length = 0;
      portfolioItems.forEach((item) => {
        if (!item.classList.contains('hidden')) {
          visibleItems.push(item);
        }
      });
    }

    // Botões de navegação
    closeBtn.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
      openLightbox(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % visibleItems.length;
      openLightbox(currentIndex);
    });

    // ESC para fechar
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    });

    // Setas do teclado para navegar
    document.addEventListener('keydown', (e) => {
      if (lightboxModal.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'ArrowLeft') {
          prevBtn.click();
        } else if (e.key === 'ArrowRight') {
          nextBtn.click();
        }
      }
    });

    // Fechar ao clicar no backdrop
    const backdrop = lightboxModal.querySelector('.lightbox-backdrop');
    backdrop.addEventListener('click', closeLightbox);
  }

  // ─────────────────────────────────────────────────────────────
  // 4. FORMULÁRIO CONTATO → WHATSAPP
  // ─────────────────────────────────────────────────────────────
  function initContactForm() {
    const form = document.querySelector(CONFIG.formSelector);
    const feedback = document.querySelector(CONFIG.feedbackSelector);

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obter valores
      const nomeInput = form.querySelector('#nome');
      const telefoneInput = form.querySelector('#telefone');
      const mensagemInput = form.querySelector('#mensagem');

      const nome = nomeInput?.value.trim();
      const telefone = telefoneInput?.value.trim();
      const mensagem = mensagemInput?.value.trim();

      // Validação
      if (!validarFormulario(nome, telefone, mensagem, feedback)) {
        return;
      }

      // Montar mensagem para WhatsApp
      const textoWhatsApp = `*Contato via Mey Tranças*\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Mensagem:* ${mensagem}`;
      const linkWhatsApp = `${CONFIG.whatsappApi}${CONFIG.whatsappNumber}?text=${encodeURIComponent(textoWhatsApp)}`;

      // Abrir WhatsApp
      window.open(linkWhatsApp, '_blank', 'noopener,noreferrer');

      // Feedback positivo
      mostrarFeedback(feedback, 'Abrindo WhatsApp... Mensagem pronta! 🎉', 'success');

      // Limpar formulário e feedback
      setTimeout(() => {
        form.reset();
        feedback.textContent = '';
        feedback.className = '';
      }, 3000);
    });
  }

  function validarFormulario(nome, telefone, mensagem, feedbackElement) {
    // Validar preenchimento
    if (!nome || !telefone || !mensagem) {
      mostrarFeedback(feedbackElement, 'Preencha todos os campos obrigatórios.', 'error');
      return false;
    }

    // Validar nome (mínimo 3 caracteres)
    if (nome.length < 3) {
      mostrarFeedback(feedbackElement, 'Nome deve ter pelo menos 3 caracteres.', 'error');
      return false;
    }

    // Validar telefone (apenas números, 10 ou 11 dígitos)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (!/^\d{10,11}$/.test(telefoneLimpo)) {
      mostrarFeedback(feedbackElement, 'Telefone inválido. Use formato: (XX) 9XXXX-XXXX', 'error');
      return false;
    }

    // Validar mensagem (mínimo 5 caracteres)
    if (mensagem.length < 5) {
      mostrarFeedback(feedbackElement, 'Mensagem deve ter pelo menos 5 caracteres.', 'error');
      return false;
    }

    return true;
  }

  function mostrarFeedback(element, mensagem, tipo) {
    if (!element) return;
    element.textContent = mensagem;
    element.className = tipo === 'error' ? 'form-feedback error' : 'form-feedback success';
  }

  // ─────────────────────────────────────────────────────────────
  // 5. ANO ATUAL NO RODAPÉ
  // ─────────────────────────────────────────────────────────────
  function setYearFooter() {
    const yearElement = document.querySelector(CONFIG.yearSelector);
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 6. INICIALIZAÇÃO
  // ─────────────────────────────────────────────────────────────
  function init() {
    setYearFooter();
    initNavigation();
    initPortfolioFilter();
    initLightbox();
    initContactForm();

    // Log de inicialização (opcional, remover em produção)
    console.log('✨ Mey Tranças - Site carregado com sucesso!');
  }

  // Aguardar DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

