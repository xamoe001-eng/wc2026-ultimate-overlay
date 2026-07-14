/**
 * =========================================================================
 * 🏆 CENTRAL PRODUCTION DATA-STORE (VERTICAL 4-2-3-1 REFACTOR)
 * ဆရာကြီး ပေးပို့ထားသော Lineup ပုံအတိုင်း ဒေါင်လိုက်ကွင်း (Vertical Pitch) အပေါ်
 * ကစားသမား ၁၁ ယောက်စီ၏ နေရာကို (X, Y %) ညွှန်းကိန်းများဖြင့် လုံးဝမထပ်စေဘဲ နေရာချထားသည်။
 * =========================================================================
 */
const TOURNAMENT_DATA_STATE = {
  // 🇫🇷 FRANCE (Top Half Area - Attacking Downwards)
  team1: {
    name: "FRANCE 🇫🇷",
    formation: [
      { name: "Maignan", no: "16", x: 50, y: 7 }, // GK (အပေါ်ဆုံး)
      
      { name: "Koundé", no: "5", x: 15, y: 18 }, // RB
      { name: "Upamecano", no: "4", x: 38, y: 18 }, // RCB
      { name: "Saliba", no: "17", x: 62, y: 18 }, // LCB
      { name: "Digne", no: "3", x: 85, y: 18 }, // LB
      
      { name: "Koné", no: "6", x: 30, y: 28 }, // RCM
      { name: "Rabiot", no: "14", x: 70, y: 28 }, // LCM
      
      { name: "Dembélé", no: "7", x: 15, y: 38 }, // RW
      { name: "Olise", no: "11", x: 50, y: 38 }, // AM (ဗဟိုလွတ်ကွက်)
      { name: "Doué", no: "20", x: 85, y: 38 }, // LW
      
      { name: "Mbappé", no: "10", x: 50, y: 46 } // ST (ကွင်းလယ်စည်းအပေါ်နား)
    ]
  },
  // 🇪🇸 SPAIN (Bottom Half Area - Attacking Upwards)
  team2: {
    name: "SPAIN 🇪🇸",
    formation: [
      { name: "Simón", no: "23", x: 50, y: 93 }, // GK (အောက်ဆုံး)
      
      { name: "Cucurella", no: "24", x: 15, y: 82 }, // LB
      { name: "Laporte", no: "14", x: 38, y: 82 }, // LCB
      { name: "Cubarsí", no: "22", x: 62, y: 82 }, // RCB
      { name: "Porro", no: "12", x: 85, y: 82 }, // RB
      
      { name: "Pedri", no: "20", x: 30, y: 72 }, // LCM
      { name: "Rodri", no: "16", x: 70, y: 72 }, // RCM
      
      { name: "Baena", no: "15", x: 15, y: 62 }, // LW
      { name: "Olmo", no: "10", x: 50, y: 62 }, // AM (ဗဟိုလွတ်ကွက်)
      { name: "Lamine Yamal", no: "19", x: 85, y: 62 }, // RW
      
      { name: "Oyarzabal", no: "21", x: 50, y: 54 } // ST (ကွင်းလယ်စည်းအောက်နား)
    ]
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
  
  // Render Team 1 France (Top - Blue Nodes)
  data.team1.formation.forEach(p => {
    layer.appendChild(createPlayerNode(p, 'node-blue'));
  });
  
  // Render Team 2 Spain (Bottom - Red Nodes)
  data.team2.formation.forEach(p => {
    layer.appendChild(createPlayerNode(p, 'node-red'));
  });
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
      if (activeCard) {
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
    if (isChroma) {
      btn.classList.add('active');
      btn.textContent = "🟢 CHROMA MODE (ON)";
    } else {
      btn.classList.remove('active');
      btn.textContent = "🟢 CHROMA MODE (OFF)";
    }
  });
}