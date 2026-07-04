# Mey Tranças — Site Profissional

## 📁 Estrutura do Projeto

```
mey-tran-a/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/
    │   ├── hero.jpg
    │   ├── portfolio-1.jpg
    │   ├── portfolio-2.jpg
    │   ├── portfolio-3.jpg
    │   ├── portfolio-4.jpg
    │   ├── portfolio-5.jpg
    │   ├── portfolio-6.jpg
    │   ├── portfolio-7.jpg
    │   └── portfolio-8.jpg
    └── icons/
        ├── whatsapp.svg
        ├── instagram.svg
        ├── phone.svg
        └── location.svg
```

## 🎨 Características Implementadas

### ✅ HTML5 Semântico & Acessível
- Estrutura semântica com `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA labels, roles e states para acessibilidade
- Meta tags OpenGraph para compartilhamento
- SEO otimizado com title e description

### ✅ CSS Moderno (Mobile-First)
- Design tokens em `:root` com variáveis reutilizáveis
- Palette feminina elegante com cores primárias
- Sombras premium multi-camadas
- Backdrop filter no header (com fallback)
- Transições suaves e microinterações
- `prefers-reduced-motion` respeitado
- Responsive: mobile, tablet, desktop
- Raios de borda consistentes

### ✅ JavaScript Puro (Sem Frameworks)
- **IntersectionObserver** para menu ativo com scroll
- **Filtro de Portfólio** dinâmico (Todos | Nagô | Tranças | Masculina)
- **Lightbox/Modal** com:
  - Navegação anterior/próxima
  - Suporte a teclado (Esc, setas)
  - Focus trapping
  - ARIA states
- **Formulário WhatsApp**:
  - Validação robusta (nome, telefone, mensagem)
  - Montagem dinâmica de mensagem
  - Feedback em tempo real
  - `encodeURIComponent` para caracteres especiais
- **Ano dinâmico** no rodapé

### ✅ 100% Offline
- Sem Google Fonts, CDN ou bibliotecas externas
- Imagens em SVG (placeholders elegantes)
- Ícones em SVG nativos
- Fontes do sistema

### ✅ Seções Obrigatórias (com IDs)
1. **#inicio** — Hero com background, overlay, botões CTA
2. **#servicos** — 3 cards (Nagô com badge especialidade, Tranças, Masculina)
3. **#portfolio** — 8 fotos com filtro por categoria + lightbox modal
4. **#precos** — Tabelas profissionais (Nagô, Tranças, Masculina)
5. **#depoimentos** — 3 cards com estrelas (★★★★★) e autor
6. **#contato** — Informações + formulário (envia para WhatsApp)

## 📱 Responsividade

- **Mobile (padrão)**: 1 coluna, layout stacked
- **Tablet (720px+)**: 2-3 colunas, grades ajustadas
- **Desktop (1024px+)**: Layout pleno, grids otimizadas

## 🎯 Marca (Implementado Exatamente)

- **Especialidade**: Nagô (destacado com badge)
- **Região**: Baixo-Moju e região
- **Mensagem**: "Elevando sua auto-estima" (hero + rodapé)
- **CTA Principal**: "Agende seu momento aqui"
- **WhatsApp**: `https://wa.me/559181045584`
- **Instagram**: `@mey.trancas`
- **Telefone**: (91) 98104-5584

## 🔗 Links de Ação

### WhatsApp
- Hero: `https://wa.me/559181045584?text=Ol%C3%A1%21%20Quero%20agendar%20meu%20momento...`
- Contato: Botão + Formulário (monta mensagem dinamicamente)

### Navegação
- Menu fixo com blur backdrop
- Scroll suave para seções
- Link ativo destacado conforme scroll

## 🎭 Destaques de Design

- **Header Fixo Premium**: Blur + sombra + border subtle
- **Hero Impactante**: Background image + overlay gradiente
- **Botões Interativos**: 
  - Primário: cor sólida + sombra + hover animation
  - Secundário: contorno + fundo transparente
- **Cards Elegantes**: Sombra mínima → máxima ao hover
- **Filtro de Portfólio**: Transições suaves, toggle ativo
- **Lightbox Modal**: Fade-in, slide-up, teclado integrado
- **Depoimentos**: Estrelas CSS + autor verificado
- **Preços**: Tabelas limpas com separadores
- **Formulário**: Labels visíveis, validação clara, feedback colorido

## ♿ Acessibilidade

- Foco visível em todos elementos interativos
- Ordem tabindex lógica
- ARIA labels descritivos
- Aria-live para feedback dinâmico
- Aria-pressed para botões toggle
- Aria-hidden para elementos decorativos
- Contraste de cores adequado (WCAG AA)
- Texto suficientemente grande

## 🚀 Performance

- SVGs para ícones (zero HTTP requests extras)
- Lazy loading em imagens de portfólio (`loading="lazy"`)
- CSS otimizado (tokens reutilizáveis)
- JS otimizado (1 único arquivo)
- Sem bloqueadores de parse
- Transições respeitam `prefers-reduced-motion`

## 🔧 Como Usar

1. **Abrir**: Duplo-clique em `index.html`
2. **Editar**: Mantenha estrutura HTML, customize CSS em `:root`
3. **Imagens Reais**: Substitua SVGs em `assets/images/` (mantenha nomes)
4. **Contato**: Telefone/Instagram já linkados

## 📝 Notas

- Código limpo, comentado, e fácil de manter
- Nenhuma dependência externa
- Compatibilidade com navegadores modernos (ES6+)
- Print-friendly (background gradientes ficam opcionais)

---

**Desenvolvido**: Thiago Gonçalves 
