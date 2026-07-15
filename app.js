/**
 * =========================================================================
 * 🏆 CENTRAL PRODUCTION DATA-STORE
 * ဒေတာအားလုံးကို ဒီနေရာကနေပဲ ထိန်းချုပ်ပြီး စာသားနဲ့ Visual ဘားတွေကို ကိုက်ညီအောင် လုပ်ပေးပါတယ်။
 * =========================================================================
 */
const TOURNAMENT_DATA_STATE = {
    team1: {
        name: "ENGLAND 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        formationName: "4-2-3-1",
        formation: [
            { name: "Pickford", no: "1", x: 50, y: 6 },
            { name: "Konsa", no: "2", x: 15, y: 16 },
            { name: "Stones", no: "5", x: 38, y: 16 },
            { name: "Guéhi", no: "6", x: 62, y: 16 },
            { name: "O'Reilly", no: "3", x: 85, y: 16 },
            { name: "Rice", no: "4", x: 30, y: 26 },
            { name: "Anderson", no: "8", x: 70, y: 26 },
            { name: "Saka", no: "7", x: 15, y: 36 },
            { name: "Bellingham", no: "10", x: 50, y: 36 },
            { name: "Gordon", no: "18", x: 85, y: 36 },
            { name: "Kane", no: "9", x: 50, y: 45 }
        ]
    },
    team2: {
        name: "ARGENTINA 🇦🇷",
        formationName: "4-1-3-2",
        formation: [
            { name: "Martinez", no: "23", x: 50, y: 94 },
            { name: "Tagliafico", no: "3", x: 15, y: 84 },
            { name: "Martínez", no: "6", x: 38, y: 84 },
            { name: "Romero", no: "13", x: 62, y: 84 },
            { name: "Molina", no: "26", x: 85, y: 84 },
            { name: "Paredes", no: "5", x: 50, y: 74 },
            { name: "Mac Allister", no: "20", x: 20, y: 64 },
            { name: "Fernández", no: "24", x: 50, y: 64 },
            { name: "De Paul", no: "7", x: 80, y: 64 },
            { name: "Álvarez", no: "9", x: 32, y: 54 },
            { name: "Messi", no: "10", x: 68, y: 54 }
        ]
    },
    // 🔮 ရာခိုင်နှုန်းဒေတာများကို ပုံသေညှိထားသည် (Total = 100%)
    prediction: {
        t1Win: 47,       // ENG %
        draw: 16,        // DRAW %
        t2Win: 37,       // ARG %
        goalScore: "2 - 1",
        verdictText: "England WIN"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderBroadcasterData();
    setupSwitchingEngine();
    setupChromaSystem();
});

function renderBroadcasterData() {
    const data = TOURNAMENT_DATA_STATE;
    const layer = document.getElementById('pitch-players-layer');
    layer.innerHTML = '';

    document.getElementById('formation-header-text').textContent = 
        `📋 ${data.team1.name} (${data.team1.formationName}) vs ${data.team2.name} (${data.team2.formationName})`;

    // Render Formation Positions
    data.team1.formation.forEach(p => layer.appendChild(createPlayerNode(p, 'node-blue')));
    data.team2.formation.forEach(p => layer.appendChild(createPlayerNode(p, 'node-red')));

    // =========================================================================
    // 🔮 SYNCHRONIZATION CORE ENGINE (စာသားနှင့် Visual ကိုက်ညီအောင် ချိတ်ဆက်ခြင်း)
    // =========================================================================
    const pred = data.prediction;
    
    // 1. Update text labels dynamically
    document.getElementById('prob-t1-text').textContent = `ENG: ${pred.t1Win}%`;
    document.getElementById('prob-draw-text').textContent = `DRAW: ${pred.draw}%`;
    document.getElementById('prob-t2-text').textContent = `ARG: ${pred.t2Win}%`;
    
    // 2. Update visual bar widths accurately matching the values
    document.getElementById('bar-t1-fill').style.width = `${pred.t1Win}%`;
    document.getElementById('bar-draw-fill').style.width = `${pred.draw}%`;
    document.getElementById('bar-t2-fill').style.width = `${pred.t2Win}%`;

    // 3. Goal announcement data sync
    document.getElementById('data-predicted-goals').textContent = pred.goalScore;
    document.getElementById('data-verdict-text').textContent = pred.verdictText;
}

function createPlayerNode(player, colorClass) {
    const el = document.createElement('div');
    el.className = `pitch-node ${colorClass}`;
    el.style.left = `${player.x}%`;
    el.style.top = `${player.y}%`;
    el.innerHTML = `${player.no} <div class="node-name">${player.name}</div>`;
    return el;
}

function setupSwitchingEngine() {
    const buttons = document.querySelectorAll('.control-btn:not(#clear-overlay-btn)');
    const cards = document.querySelectorAll('.overlay-card-wrapper');
    const clearBtn = document.getElementById('clear-overlay-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            cards.forEach(card => card.classList.remove('show-card'));
            const activeCard = document.getElementById(targetId);
            if(activeCard) activeCard.classList.add('show-card');
        });
    });

    clearBtn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        cards.forEach(card => card.classList.remove('show-card'));
    });
}

function setupChromaSystem() {
    const btn = document.getElementById('chroma-toggle-btn');
    const canvas = document.getElementById('broadcast-canvas');

    btn.addEventListener('click', () => {
        const isChroma = canvas.classList.toggle('chroma-active');
        btn.classList.toggle('active', isChroma);
        btn.textContent = isChroma ? "🟢 CHROMA KEY (ON)" : "🟢 CHROMA MODE (OFF)";
    });
}
