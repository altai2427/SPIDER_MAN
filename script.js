let spiderData = {};

async function loadData() {
    try {
        const response = await fetch('data.json');
        spiderData = await response.json();
        switchUniverse('tobey'); 
    } catch (error) {
        alert("ОШИБКА ДАННЫХ! ЗАПУСТИТЕ ПРОЭКТ ЧЕРЕЗ LIVE SERVER");
    }
}
function switchUniverse(universeKey) {
    const data = spiderData[universeKey];
    if (!data) return;

    document.documentElement.style.setProperty('--theme-color', data.color);

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.getAttribute('onclick').includes(universeKey));
    if (activeBtn) activeBtn.classList.add('active');

    document.getElementById('uni-title').innerText = data.title;
    document.getElementById('uni-actor').innerText = data.actor;
    document.getElementById('uni-desc').innerText = data.description;

    const powersBox = document.getElementById('powers-container');
    powersBox.innerHTML = ""; 
    for (let i = 0; i < data.powers.length; i++) {
        let p = data.powers[i];
        powersBox.innerHTML += `<div class="card"><h3>${p.name}</h3><p>${p.desc}</p></div>`;
    }

    const villainsBox = document.getElementById('villains-container');
    villainsBox.innerHTML = ""; 
    for (let i = 0; i < data.villains.length; i++) {
        let v = data.villains[i];
        villainsBox.innerHTML += `<div class="card"><h3>${v.name}</h3><p>${v.desc}</p></div>`;
    }

    const featuresBox = document.getElementById('features-container');
    featuresBox.innerHTML = ""; 
    for (let i = 0; i < data.features.length; i++) {
        let f = data.features[i];
        featuresBox.innerHTML += `<li>${f}</li>`;
    }
}

window.addEventListener('DOMContentLoaded', loadData);
let score = 0;
let gameInterval;
let isPlaying = false;
function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    document.getElementById('game-score').innerText = score;
    document.getElementById('start-game-btn').innerText = "Игра идет...";
    
    gameInterval = setInterval(createWebDrop, 500);

    setTimeout(() => {
        clearInterval(gameInterval);
        isPlaying = false;
        document.getElementById('start-game-btn').innerText = "Начать заново";
        alert(`Время вышло! Твой счет: ${score}`);
        document.getElementById('game-zone').innerHTML = "";
    }, 15000);
}
function createWebDrop() {
    const zone = document.getElementById('game-zone');
    const drop = document.createElement('div');
    drop.classList.add('web-drop');
    drop.innerText = "🕸️";

    const randomX = Math.floor(Math.random() * (zone.clientWidth - 30));
    drop.style.left = randomX + 'px';

    drop.addEventListener('click', () => {
        score++;
        document.getElementById('game-score').innerText = score;
        drop.remove();
    });

    zone.appendChild(drop);

    setTimeout(() => {
        if (drop.parentNode) {
            drop.remove();
        }
    }, 2500);
}

window.addEventListener('DOMContentLoaded', () => {
    switchUniverse('tobey');
});
// простенько но со вкусом