const armaduras = [
    { id: "Mark I", desc: "Resistência bruta. Escapada da caverna." },
    { id: "Mark III", desc: "Estabilização de voo e liga de ouro e titânio." },
    { id: "Mark V", desc: "Sistema portátil de ativação em maleta." },
    { id: "Mark XLIII", desc: "Controle préensil autônomo. Módulo base." },
    { id: "Mark XLIV", desc: "Verônica / Hulkbuster. Impacto sísmico." },
    { id: "Mark L", desc: "Nanotecnologia fluida. Manifestação de armas." },
    { id: "Mark LXXXV", desc: "Manipulação quântica. Resposta de energia infinita." }
];

const hall = document.getElementById('hall');
const repulsorSound = document.getElementById('repulsor-sound');

armaduras.forEach(armor => {
    const card = document.createElement('div');
    card.className = 'armor-card';
    
    card.innerHTML = `
        <div class="repulsor-blast"></div>
        <div class="arc-reactor"></div>
        <div class="armor-name">${armor.id}</div>
        <p class="armor-desc">${armor.desc}</p>
    `;

    // Efeito Parallax 3D Mapeado ao Mouse
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -20; 
        const rotateY = ((x - centerX) / centerX) * 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Resetar posição quando o mouse sai do card
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) transition`;
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500); // Remove a transição suave para não bugar o mousemove
    });

    // Engatilhar Efeitos ao passar o mouse
    card.addEventListener('mouseenter', () => {
        // Tenta tocar o áudio se ele existir
        if(repulsorSound) {
            repulsorSound.currentTime = 0;
            repulsorSound.play().catch(() => {
                console.log("Áudio bloqueado pelo navegador até o primeiro clique ou arquivo ausente.");
            });
        }
    });

    hall.appendChild(card);
});