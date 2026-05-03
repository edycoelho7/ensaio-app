// ==========================================
// 1. IMPORTAÇÃO DO FIREBASE (AUTH E ANALYTICS)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// ==========================================
// 2. SUAS CHAVES DO FIREBASE
// ==========================================
// Substitua as chaves abaixo pelo código gerado no Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBHU5yLgdM0UczPoR7PU_zzSQ_i6UdyFb4",
  authDomain: "ebenezeripe-58e27.firebaseapp.com",
  projectId: "ebenezeripe-58e27",
  storageBucket: "ebenezeripe-58e27.firebasestorage.app",
  messagingSenderId: "482641495246",
  appId: "1:482641495246:web:c2fb06bfcd9e3129c67c9f",
  measurementId: "G-42V85Z4V4L"
};

// ==========================================
// 3. INICIALIZANDO AS FERRAMENTAS
// ==========================================
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ==========================================
// 4. LÓGICA DE LOGIN E CONTROLE DE TELA
// ==========================================
// Elementos do header
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userProfile = document.getElementById('userProfile');
const userPic = document.getElementById('userPic');

// Elementos da tela de login
const telaLogin = document.getElementById('tela-login');
const telaPrincipal = document.getElementById('tela-principal');
const bigLoginBtn = document.getElementById('bigLoginBtn'); 
const emailInput = document.getElementById('emailInput');
const senhaInput = document.getElementById('senhaInput');
const btnEntrarEmail = document.getElementById('btnEntrarEmail');
const btnCriarConta = document.getElementById('btnCriarConta');
const btnEsqueciSenha = document.getElementById('btnEsqueciSenha');

// Login com Google
const loginGoogle = () => {
  signInWithPopup(auth, provider).catch(error => {
    console.error("Erro no login com Google:", error);
    alert("Erro ao fazer login com o Google.");
  });
};

if (loginBtn) loginBtn.addEventListener('click', loginGoogle);
if (bigLoginBtn) bigLoginBtn.addEventListener('click', loginGoogle);

// Entrar com E-mail e Senha
if (btnEntrarEmail) {
  btnEntrarEmail.addEventListener('click', () => {
    const email = emailInput.value;
    const senha = senhaInput.value;
    if (!email || !senha) return alert("Preencha e-mail e senha!");
    
    signInWithEmailAndPassword(auth, email, senha)
      .catch(error => alert("Erro ao entrar. Verifique seu e-mail e senha."));
  });
}

// Criar Conta com E-mail e Senha
if (btnCriarConta) {
  btnCriarConta.addEventListener('click', () => {
    const email = emailInput.value;
    const senha = senhaInput.value;
    if (!email || !senha) return alert("Preencha e-mail e senha para criar a conta!");
    if (senha.length < 6) return alert("A senha deve ter pelo menos 6 caracteres.");

    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => alert("Conta criada com sucesso!"))
      .catch(error => alert("Erro ao criar conta: " + error.message));
  });
}

// Esqueci a Senha (Recuperação)
if (btnEsqueciSenha) {
  btnEsqueciSenha.addEventListener('click', (e) => {
    e.preventDefault(); 
    
    const email = emailInput.value;
    
    if (!email) {
      return alert("Por favor, digite seu e-mail na caixinha acima e clique em 'Esqueci minha senha' novamente.");
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("E-mail de recuperação enviado! Verifique sua caixa de entrada (e o spam).");
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail:", error);
        alert("Erro ao enviar o e-mail. Verifique se o endereço está correto.");
      });
  });
}

// Função de Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    signOut(auth).catch(error => console.error("Erro ao sair:", error));
  });
}

// Observador de Estado (Controla as telas)
onAuthStateChanged(auth, (user) => {
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (userPic) userPic.src = user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    
    if (telaLogin) telaLogin.style.display = 'none';
    if (telaPrincipal) telaPrincipal.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';
    
    if (telaPrincipal) telaPrincipal.style.display = 'none';
    if (telaLogin) telaLogin.style.display = 'block';
  }
});
// ==========================================
// FIM DO BLOCO DO FIREBASE
// ==========================================

// --- SEU CÓDIGO ORIGINAL COMEÇA AQUI EMBAIXO ---

// app/app.js
import { SONGS } from '../songs.js?v=1.9';
import { startAll, stopAll, togglePause, seekTo, setVozVolume, setPlaybackVolume, setMetroVolume, setTom, getDuration, getCurrentTime, unlockAudio } from './audio-engine.js?v=1.9';

// 🔴 NOVO: ELEMENTOS DA INTERFACE DAS ABAS E BUSCA
const searchResultsEl = document.getElementById('searchResults');
const tabsContainerEl = document.querySelector('.tabs-container');
const contentRepertorio = document.getElementById('contentRepertorio');
const contentRecentes = document.getElementById('contentRecentes');
const tabBtnRepertorio = document.getElementById('tabBtnRepertorio');
const tabBtnRecentes = document.getElementById('tabBtnRecentes');
const repertorioListEl = document.getElementById('repertorioList');
const btnAvisarGrupo = document.getElementById('btnAvisarGrupo');

// ELEMENTOS ORIGINAIS DO PLAYER
const songListEl   = document.getElementById('songList'); // Agora usado para as recentes
const songSearchEl = document.getElementById('songSearch');
const songTitleEl  = document.getElementById('songTitle');
const songArtistEl = document.getElementById('songArtist');
const bpmDisplayEl = document.getElementById('bpmDisplay');
const tsDisplayEl  = document.getElementById('tsDisplay');
const bpmHiddenEl  = document.getElementById('bpm');
const tsHiddenEl   = document.getElementById('timeSig');
const offsetEl     = document.getElementById('offset');

const playBtn = document.getElementById('playBtn');
const stopBtn = document.getElementById('stopBtn');

const vozVol = document.getElementById('vozVol');
const playbackVol = document.getElementById('playbackVol');
const metroVol = document.getElementById('metroVol');
const vozPct = document.getElementById('vozPct');
const playbackPct = document.getElementById('playbackPct');
const metroPct = document.getElementById('metroPct');

const tomSlider = document.getElementById('tomSlider');
const tomDisplay = document.getElementById('tomDisplay');
const tomCifra = document.getElementById('tomCifra');

const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');

let selectedSong = null;
let animationFrameId = null;
let isPaused = false;
let isDragging = false; 

// ==========================================
// 🔴 NOVO: LÓGICA DO REPERTÓRIO DO DIA
// ==========================================
// Digite aqui o título exato das músicas (como estão no songs.js) para aparecerem na aba Repertório
const REPERTORIO_DO_DIA = [
  "Digno de Tudo + Te Exaltamos - F",
  "Alfa e O",
  "Em nome de Je",
  "Ousado A"
];

function renderRepertorio() {
  if (!repertorioListEl) return;
  repertorioListEl.innerHTML = '';

  const repertorioItems = REPERTORIO_DO_DIA.map(titulo => SONGS.find(s => s.title === titulo)).filter(Boolean);

  if (repertorioItems.length === 0) {
     repertorioListEl.innerHTML = '<li class="muted" style="text-align:center;">Nenhuma música definida.</li>';
     return;
  }

  repertorioItems.forEach((s) => {
    const li = document.createElement('li');
    // Agora o texto é gerado igual ao renderList: Título — Artista
    li.textContent = `${s.title} — ${s.artist || 'Desconhecido'}`;
    li.tabIndex = 0;
    
    li.addEventListener('click', () => { 
      applySong(s.id); 
      forcePlay(); 
    });
    
    repertorioListEl.appendChild(li);
  });
}

// ==========================================
// 🔴 NOVO: LÓGICA DAS ABAS E WHATSAPP
// ==========================================
if (tabBtnRepertorio && tabBtnRecentes) {
  tabBtnRepertorio.addEventListener('click', () => {
    tabBtnRepertorio.classList.add('active');
    contentRepertorio.classList.add('active');
    tabBtnRecentes.classList.remove('active');
    contentRecentes.classList.remove('active');
  });

  tabBtnRecentes.addEventListener('click', () => {
    tabBtnRecentes.classList.add('active');
    contentRecentes.classList.add('active');
    tabBtnRepertorio.classList.remove('active');
    contentRepertorio.classList.remove('active');
  });
}

if (btnAvisarGrupo) {
  btnAvisarGrupo.addEventListener('click', () => {
    let texto = "*🗓️ Repertório do Culto - Domingo*\n\n";
    const repertorioItems = REPERTORIO_DO_DIA.map(titulo => SONGS.find(s => s.title === titulo)).filter(Boolean);
    
    repertorioItems.forEach((s, index) => {
        texto += `${index + 1}. *${s.title}* (${s.artist || 'Desconhecido'})\n`;
    });
    
    texto += "\n_Link do App: https://edycoelho7.github.io/ensaio-app/"; // Você pode colocar o link do seu app no GitHub aqui
    
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  });
}

// LÓGICA DE ESCALA MUSICAL PARA O TOM
const escalaSubindo = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const escalaDescendo = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function calcularNovaCifra(tomOriginal, semitonsAdicionados) {
  if (!tomOriginal || tomOriginal === '-') return '-';

  let index = escalaSubindo.indexOf(tomOriginal);
  if (index === -1) index = escalaDescendo.indexOf(tomOriginal);
  if (index === -1) return tomOriginal; 

  let novoIndex = (index + semitonsAdicionados) % 12;
  if (novoIndex < 0) novoIndex += 12; 

  return semitonsAdicionados >= 0 ? escalaSubindo[novoIndex] : escalaDescendo[novoIndex];
}

function updateTomUI() {
  const st = parseInt(tomSlider.value, 10);
  const sinal = st > 0 ? '+' : '';
  tomDisplay.textContent = `${sinal}${st} st`;

  const pct = ((st + 5) / 11) * 100; 
  tomSlider.style.setProperty('--value', `${pct}%`);
  tomSlider.style.background = 'transparent';

  if (selectedSong && selectedSong.tom) {
    tomCifra.textContent = calcularNovaCifra(selectedSong.tom, st);
  } else {
    tomCifra.textContent = '-';
  }
}

tomSlider.addEventListener('input', (e) => {
  updateTomUI();
  setTom(parseInt(e.target.value, 10)); 
});

function getHistoryIds() {
  try {
    const hist = localStorage.getItem('ensaio_history');
    return hist ? JSON.parse(hist) : [];
  } catch(e) { return []; }
}

function saveToHistory(id) {
  let hist = getHistoryIds();
  hist = hist.filter(hId => hId !== id); 
  hist.unshift(id); 
  if (hist.length > 3) hist.pop(); 
  localStorage.setItem('ensaio_history', JSON.stringify(hist));
}

function getDefaultList() {
  const histIds = getHistoryIds();
  if (histIds.length > 0) {
    return histIds.map(id => SONGS.find(s => s.id === id)).filter(Boolean);
  }
  return SONGS.slice(0, 3);
}

// 🔴 NOVO: FUNÇÃO RENDER LIST ATUALIZADA (Integra Busca e Abas)
function renderList(items) {
  items = items.filter(musica => musica.ativo !== false);

  const isSearchEmpty = songSearchEl.value.trim() === '';
  
  // Define onde as músicas vão aparecer: Busca ou Histórico
  const listaAlvo = isSearchEmpty ? songListEl : searchResultsEl;
  listaAlvo.innerHTML = '';

  // Lógica de exibição da interface
  if (isSearchEmpty) {
    searchResultsEl.style.display = 'none';
    tabsContainerEl.style.display = 'flex';
    
    const activeTab = document.querySelector('.tab-btn.active').id;
    if (activeTab === 'tabBtnRepertorio') contentRepertorio.classList.add('active');
    if (activeTab === 'tabBtnRecentes') contentRecentes.classList.add('active');
  } else {
    searchResultsEl.style.display = 'block';
    tabsContainerEl.style.display = 'none';
    contentRepertorio.classList.remove('active');
    contentRecentes.classList.remove('active');
  }

  if (!items || !items.length) {
    listaAlvo.innerHTML = '<li class="muted" style="text-align:center;">Nada encontrado…</li>';
    return;
  }
  
  const itensParaMostrar = isSearchEmpty ? items.slice(0, 3) : items;

  itensParaMostrar.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.title} — ${s.artist || 'Desconhecido'}`;
    li.tabIndex = 0;
    
    li.addEventListener('click', () => { 
      applySong(s.id); 
      forcePlay(); 
    });
    li.addEventListener('keydown', (e) => { 
      if (e.key === 'Enter') { 
        applySong(s.id); 
        forcePlay(); 
      } 
    });
    
    listaAlvo.appendChild(li);
  });
}

function filterSongs(q) {
  if (!q) return getDefaultList();
  const n = q.trim().toLowerCase();
  return SONGS.filter(s => (s.title || '').toLowerCase().includes(n) || (s.artist || '').toLowerCase().includes(n));
}

function applySong(id) {
  const s = SONGS.find(x => x.id === id);
  if (!s) return;
  selectedSong = s;
  
  saveToHistory(id);

  songTitleEl.textContent = s.title || '—';
  songArtistEl.textContent = s.artist || '—';
  bpmDisplayEl.textContent = s.bpm ?? '—';
  tsDisplayEl.textContent  = s.timeSignature ?? '—';

  const beats = parseInt(String(s.timeSignature || '4/4').split('/')[0], 10) || 4;
  bpmHiddenEl.value = s.bpm || 120;
  tsHiddenEl.value  = beats;
  offsetEl.value    = s.offset || 0.00;

  tomSlider.value = 0;
  updateTomUI();
  setTom(0);

  if (s.ocultarMetronomo) { 
    metroVol.disabled = true;
    metroVol.value = 0;
    metroPct.textContent = "0%";
    metroVol.parentElement.style.opacity = "0.4"; 
    setMetroVolume(0); 
  } else {
    metroVol.disabled = false;
    metroVol.value = 0.5; 
    metroPct.textContent = "50%";
    metroVol.parentElement.style.opacity = "1"; 
    setMetroVolume(0.5); 
  }
  setFill(metroVol); 

  // 🔴 NOVO: Aplica a classe 'selected' em qualquer lista que a música estiver visível (Busca, Recentes, Repertório)
  const allItems = document.querySelectorAll('.list li');
  allItems.forEach(li => li.classList.remove('selected'));
  const founds = Array.from(allItems).filter(li => li.textContent.includes(s.title));
  founds.forEach(found => found.classList.add('selected'));
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateProgress() {
  const current = getCurrentTime();
  const duration = getDuration();

  if (duration > 0 && !isDragging) {
    if (current >= duration - 0.05) {
      seekTo(0, selectedSong); 
    } else {
      currentTimeDisplay.textContent = formatTime(current);
      durationDisplay.textContent = formatTime(duration);
      const percentage = (current / duration) * 100;
      progressBar.value = percentage;
      progressBar.style.setProperty('--value', `${percentage}%`);
    }
  }
  animationFrameId = requestAnimationFrame(updateProgress);
}

progressBar.addEventListener('input', (e) => {
  isDragging = true;
  const percentage = e.target.value;
  progressBar.style.setProperty('--value', `${percentage}%`);
  const newTime = (percentage / 100) * getDuration();
  currentTimeDisplay.textContent = formatTime(newTime);
});

progressBar.addEventListener('change', (e) => {
  isDragging = false;
  if (selectedSong && getCurrentTime() > 0) {
    seekTo(e.target.value, selectedSong);
  }
});

async function forcePlay() {
  if (typeof unlockAudio === 'function') unlockAudio();

  stopAll(); 
  isPaused = false;
  
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  progressBar.value = 0;
  progressBar.style.setProperty('--value', '0%');
  currentTimeDisplay.textContent = '0:00';

  playBtn.disabled = true; 
  playBtn.textContent = 'Carregando...';

  try {
    await startAll(selectedSong);
    
    setVozVolume(parseFloat(vozVol.value));
    setPlaybackVolume(parseFloat(playbackVol.value));
    setMetroVolume(parseFloat(metroVol.value));
    setTom(parseInt(tomSlider.value, 10)); 

    updateProgress();
    
    playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg> Pause`;
  } catch (err) {
    console.error("Erro ao carregar áudio:", err);
    playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M8 5v14l11-7z"></path></svg> Play`;
  } finally {
    playBtn.disabled = false;
  }
}

playBtn.addEventListener('click', async () => {
  if (typeof unlockAudio === 'function') unlockAudio();

  if (!selectedSong) { 
    // Se clicar em play sem música, pega a primeira do repertório do dia (se houver), se não, pega do histórico
    const repItems = REPERTORIO_DO_DIA.map(t => SONGS.find(s => s.title === t)).filter(Boolean);
    const defaultList = repItems.length > 0 ? repItems : getDefaultList();
    if (defaultList.length) applySong(defaultList[0].id); 
    else return; 
  }
  
  if (currentTimeDisplay.textContent !== '0:00' && currentTimeDisplay.textContent !== '0:00') {
      const state = await togglePause();
      if (state === "paused") {
          isPaused = true;
          playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M8 5v14l11-7z"></path></svg> Play`;
      } else if (state === "playing") {
          isPaused = false;
          playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg> Pause`;
      }
      return;
  }

  playBtn.disabled = true; 
  playBtn.textContent = 'Carregando...';

  try {
    await startAll(selectedSong);
    
    setVozVolume(parseFloat(vozVol.value));
    setPlaybackVolume(parseFloat(playbackVol.value));
    setMetroVolume(parseFloat(metroVol.value));
    setTom(parseInt(tomSlider.value, 10)); 

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    updateProgress();
    
    isPaused = false;
    playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg> Pause`;
  } catch (err) {
    console.error("Erro ao carregar áudio:", err);
  } finally {
    playBtn.disabled = false;
  }
});

stopBtn.addEventListener('click', () => { 
  stopAll(); 
  isPaused = false;
  playBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style="margin-right:8px"><path d="M8 5v14l11-7z"></path></svg> Play`;
  
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  progressBar.value = 0;
  progressBar.style.setProperty('--value', '0%');
  currentTimeDisplay.textContent = '0:00';
});

function pct(v){ return Math.round(v * 100) + '%'; }

function setFill(slider) { 
  slider.style.setProperty('--value', `${slider.value * 100}%`);
  slider.style.background = 'transparent'; 
}

function syncAll(){
  vozPct.textContent = pct(parseFloat(vozVol.value));
  playbackPct.textContent = pct(parseFloat(playbackVol.value));
  metroPct.textContent = pct(parseFloat(metroVol.value));
  [vozVol, playbackVol, metroVol].forEach(setFill);
}

vozVol.addEventListener('input', (e) => { setVozVolume(+e.target.value); syncAll(); });
playbackVol.addEventListener('input', (e) => { setPlaybackVolume(+e.target.value); syncAll(); });
metroVol.addEventListener('input', (e) => { setMetroVolume(+e.target.value); syncAll(); });

updateTomUI();
syncAll();

songSearchEl.addEventListener('input', () => {
  const filtered = filterSongs(songSearchEl.value);
  renderList(filtered);
});

// ==========================================
// LÓGICA DO POP-UP DE NOVIDADES
// ==========================================
const VERSAO_ATUAL_APP = "1.9"; 

const HISTORICO_NOVIDADES = {
  "1.8": ["Tudo É Perda + Tua Presença", "Em nome de Jesus", "Digno é o Senhor + Senhor e Rei", "Quero Subir", "Santidade", "Ser Reconhecido", "Gratidão (Gratitude)", "Toda Sorte de Bençãos", "Jesus Meu Primeiro Amor", "Majestoso Deus + Nada Vai Roubar Tua Glória"],
  "1.9": ["Digno de Tudo + Te Exaltamos — Nivea Soares", "Alfa e Omega — Julia Vitoria"] 
};

function verificarNovasMusicas() {
  const versaoVista = localStorage.getItem("ebnz_versao_vista") || "0.0";
  const popup = document.getElementById("popup-novidades");
  const listaHtml = document.getElementById("lista-novas-musicas");
  const btnFechar = document.getElementById("btn-fechar-popup");

  if (!popup) return;

  if (versaoVista !== VERSAO_ATUAL_APP && HISTORICO_NOVIDADES[VERSAO_ATUAL_APP]) {
    const novasMusicas = HISTORICO_NOVIDADES[VERSAO_ATUAL_APP];
    
    listaHtml.innerHTML = ""; 
    
    novasMusicas.forEach(musica => {
      const li = document.createElement("li");
      li.textContent = `🎤 ${musica}`;
      li.style.padding = "8px 0";
      li.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
      listaHtml.appendChild(li);
    });

    popup.classList.add("popup-visivel");

    btnFechar.onclick = () => {
      popup.classList.remove("popup-visivel");
      localStorage.setItem("ebnz_versao_vista", VERSAO_ATUAL_APP);
    };
  }
}

(function bootstrap(){
  renderRepertorio();

  const listaInicial = getDefaultList(); // Pega as Recentes
  renderList(listaInicial);
  
  // Prioriza as Recentes no carregamento inicial do player
  if (listaInicial.length) {
    applySong(listaInicial[0].id);
  } else {
    // Se não tiver recentes, tenta o repertório
    const repItems = REPERTORIO_DO_DIA.map(t => SONGS.find(s => s.title === t)).filter(Boolean);
    if (repItems.length > 0) applySong(repItems[0].id);
  }

    verificarNovasMusicas();

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); songSearchEl.focus();
    }
  });
})();