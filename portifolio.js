/* ========== EFEITO DE DIGITAÇÃO (Typed.js) ========== */
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.habilidades', {
        strings: ['Desenvolvedora Front-End', 'Desenvolvedora UI/UX'],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 300,
        loop: true
    });
} else {
    console.warn('Typed.js não carregou: confira o <script> da biblioteca no index.html e a internet.');
}

/* ========== ANIMAÇÕES AO ROLAR (ScrollReveal) ========== */
if (typeof ScrollReveal !== 'undefined') {
    const scrollReveal = new ScrollReveal({
        distance: '80px',
        duration: 1000,
        delay: 150,
        reset: false,
        cleanup: true // remove os estilos inline depois da animação, para o hover dos cards continuar funcionando
    });

    // Vêm de cima: saudação do hero e títulos das seções
    scrollReveal.reveal('.saudacao, .servicos .titulo-secao, .superior-portfolio', {
        origin: 'top'
    });

    // Vêm da esquerda (a foto do Sobre também cresce um pouco)
    scrollReveal.reveal('.esquerda-home', { origin: 'left' });
    scrollReveal.reveal('.esquerda-sobre', { origin: 'left', scale: 0.85 });

    // Vêm da direita (a foto do Hero também cresce um pouco)
    scrollReveal.reveal('.direita-sobre', { origin: 'right' });
    scrollReveal.reveal('.direita-home', { origin: 'right', scale: 0.85 });

    // Vêm de baixo: cards de serviços, cards de projetos e rodapé
    scrollReveal.reveal('.caixa-servico, .projeto-card, footer', {
        origin: 'bottom'
    });
} else {
    console.warn('ScrollReveal não carregou: confira o <script> da biblioteca no index.html e a internet.');
}

/* ========== ANIMAÇÕES DA FOTO ========== */
/* Os efeitos ficam na <img>, e o ScrollReveal na <div> que a envolve.
   Assim os dois não brigam pelo mesmo "transform". */
const fotos = document.querySelectorAll('.foto-moldura img');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Respeita quem desativou animações no sistema
if (!reduzirMovimento) {
    fotos.forEach((foto) => {
        const moldura = foto.parentElement;

        // O flutuar agora é feito no CSS (@keyframes flutuar).
        // Aqui fica só a inclinação 3D acompanhando o mouse.
        foto.style.transition = 'transform 0.2s ease-out';
        foto.style.willChange = 'transform';

        moldura.addEventListener('mousemove', (evento) => {
            const area = moldura.getBoundingClientRect();
            // posição do mouse de -0.5 (borda esquerda/topo) a 0.5 (borda direita/base)
            const x = (evento.clientX - area.left) / area.width - 0.5;
            const y = (evento.clientY - area.top) / area.height - 0.5;

            foto.style.transform =
                `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.03)`;
        });

        // Ao tirar o mouse, volta suavemente à posição normal
        moldura.addEventListener('mouseleave', () => {
            foto.style.transform = '';
        });
    });
}