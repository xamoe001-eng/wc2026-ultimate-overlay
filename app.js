/**
 * =========================================================================
 * 🏆 CENTRAL PRODUCTION DATA-STORE (VERTICAL MATCH REFACTOR)
 * Semi Final 2: England (4-2-3-1) vs Argentina (4-1-3-2)
 * ဓာတ်ပုံပါ ကစားသမားနေရာများနှင့် ရလဒ်များအတိုင်း အတိအကျ နေရာချထားပေးပါသည်။
 * =========================================================================
 */
const TOURNAMENT_DATA_STATE = {
    // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ENGLAND (Top Half Area - 4-2-3-1 Formation)
    team1: {
        name: "ENGLAND 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        formationName: "4-2-3-1",
        history: { 
            r32: "ENG 2 - 1 DR Congo", 
            r16: "MEX 2 - 3 ENG", 
            qf: "NOR 1 - 2 ENG" 
        },
        formation: [
            { name: "Pickford", no: "1", x: 50, y: 7 },       // GK
            
            { name: "Konsa", no: "2", x: 15, y: 18 },         // RB
            { name: "Stones", no: "5", x: 38, y: 18 },        // RCB
            { name: "Guéhi", no: "6", x: 62, y: 18 },         // LCB
            { name: "O'Reilly", no: "3", x: 85, y: 18 },       // LB
            
            { name: "Rice", no: "4", x: 30, y: 28 },          // RDM
            { name: "Anderson", no: "8", x: 70, y: 28 },      // LDM
            
            { name: "Saka", no: "7", x: 15, y: 38 },          // RAM
            { name: "Bellingham", no: "10", x: 50, y: 38 },    // CAM
            { name: "Gordon", no: "18", x: 85, y: 38 },        // LAM
            
            { name: "Kane", no: "9", x: 50, y: 46 }           // ST
        ]
    },
    // 🇦🇷 ARGENTINA (Bottom Half Area - 4-1-3-2 Formation)
    team2: {
        name: "ARGENTINA 🇦🇷",
        formationName: "4-1-3-2",
        history: { 
            r32: "ARG 3 - 2 Cape Verde", 
            r16: "ARG 3 - 2 Egypt", 
            qf: "ARG 3 - 1 Swiss" 
        },
        formation: [
            { name: "Martinez", no: "23", x: 50, y: 93 },     // GK
            
            { name: "Tagliafico", no: "3", x: 15, y: 82 },     // LB
            { name: "Martínez", no: "6", x: 38, y: 82 },      // LCB
            { name: "Romero", no: "13", x: 62, y: 82 },       // RCB
            { name: "Molina", no: "26", x: 85, y: 82 },       // RB
            
            { name: "Paredes", no: "5", x: 50, y: 72 },       // DM
            
            { name: "Mac Allister", no: "20", x: 22, y: 62 },  // LM
            { name: "Fernández", no: "24", x: 50, y: 62 },     // CM
            { name: "De Paul", no: "7", x: 78, y: 62 },        // RM
            
            { name: "Álvarez", no: "9", x: 35, y: 54 },       // LST
            { name: "Messi", no: "10", x: 65, y: 54 }         // RST
        ]
    },
    prediction: {
        t1Win: 38,
        draw: 22,
        t2Win: 40,
        goalScore: "2 - 3",
        verdictText: "ARGENTINA WIN IN EXTRA TIME"
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

    // Header Meta update
    document.getElementById('formation-header-text').textContent = `📋 ${data.team1.name} (${data.team1.formationName}) vs ${data.team2.name} (${data.team2.formationName})`;

    // Inject Past History comparison data
    document.getElementById('res-t1-heading').textContent = data.team1.name;
    document.getElementById('t1-r32').textContent = data.team1.history.r32;
    document.getElementById('t1-r16').textContent = data.team1.history.r16;
    document.getElementById('t1-qf').textContent = data.team1.history.qf;

    document.getElementById('res-t2-heading').textContent = data.team2.name;
    document.getElementById('t2-r32').textContent = data.team2.history.r32;
    document.getElementById('t2-r16').textContent = data.team2.history.r16;
    document.getElementById('t2-qf').textContent = data.team2.history.qf;

    // Render Team 1 England (Top - Blue outline Nodes)
    data.team1.formation.forEach(p => {
        layer.appendChild(createPlayerNode(p, 'node-blue'));
    });

    // Render Team 2 Argentina (Bottom - Lightblue Nodes)
    data.team2.formation.forEach(p => {
        layer.appendChild(createPlayerNode(p, 'node-red'));
    });

    // Inject Goals and Predictions percentages
    document.getElementById('prob-t1-text').textContent = `ENG: ${data.prediction.t1Win}%`;
    document.getElementById('prob-t2-text').textContent = `ARG: ${data.prediction.t2Win}%`;
    
    document.getElementById('bar-t1-fill').style.width = `${data.prediction.t1Win}%`;
    document.getElementById('bar-draw-fill').style.width = `${data.prediction.draw}%`;
    document.getElementById('bar-t2-fill').style.width = `${data.prediction.t2Win}%`;

    document.getElementById('data-predicted-goals').textContent = data.prediction.goalScore;
    document.getElementById('data-verdict-text').textContent = data.prediction.verdictText;
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
            if(activeCard) {
                activeCard.classList.add('show-card');
            }
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
        if(isChroma) {
            btn.classList.add('active');
            btn.textContent = "🟢 CHROMA KEY (ON)";
        } else {
            btn.classList.remove('active');
            btn.textContent = "🟢 CHROMA MODE (OFF)";
        }
    });
}
