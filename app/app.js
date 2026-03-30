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
const btnEsqueciSenha = document.getElementById('btnEsqueciSenha'); // <--- ADICIONE ESTA LINHA

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
    e.preventDefault(); // Evita que a página recarregue ao clicar no link
    
    const email = emailInput.value;
    
    // Verifica se a pessoa digitou o e-mail antes de clicar
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
    // ESTÁ LOGADO
    if (loginBtn) loginBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    // Se logou com e-mail, pode não ter foto, então usamos uma genérica
    if (userPic) userPic.src = user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    
    if (telaLogin) telaLogin.style.display = 'none';
    if (telaPrincipal) telaPrincipal.style.display = 'block';
  } else {
    // NÃO ESTÁ LOGADO
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
// --- NOVO: Importando a função setTom do audio-engine ---
import { SONGS } from '../songs.js';
import { startAll, stopAll, togglePause, seekTo, setVozVolume, setPlaybackVolume, setMetroVolume, setTom, getDuration, getCurrentTime } from './audio-engine.js';

const songListEl   = document.getElementById('songList');
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

// --- NOVO: Elementos do Tom ---
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

// --- NOVO: LÓGICA DE ESCALA MUSICAL PARA O TOM ---
// Escala com sustenidos (usada quando sobe o tom)
const escalaSubindo = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// Escala com bemóis (usada quando desce o tom)
const escalaDescendo = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

function calcularNovaCifra(tomOriginal, semitonsAdicionados) {
  if (!tomOriginal || tomOriginal === '-') return '-';

  // Normaliza o tom original para encontrar na escala (trata C# igual a Db para facilitar)
  let index = escalaSubindo.indexOf(tomOriginal);
  if (index === -1) index = escalaDescendo.indexOf(tomOriginal);
  if (index === -1) return tomOriginal; // Se por acaso não achar, retorna o que estava

  // Calcula o novo índice rodando a lista (módulo 12)
  let novoIndex = (index + semitonsAdicionados) % 12;
  if (novoIndex < 0) novoIndex += 12; // Corrige índice negativo

  // Se estiver subindo (>0) ou no 0, usa sustenidos. Se estiver descendo (<0), usa bemóis
  return semitonsAdicionados >= 0 ? escalaSubindo[novoIndex] : escalaDescendo[novoIndex];
}

// Atualiza a interface do Tom
function updateTomUI() {
  const st = parseInt(tomSlider.value, 10);
  const sinal = st > 0 ? '+' : '';
  tomDisplay.textContent = `${sinal}${st} st`;

  // Atualiza a visualização do Slider (a "trilha" azulzinha)
  const pct = ((st + 5) / 11) * 100; // Matemática para um range de -5 a 6
  tomSlider.style.setProperty('--value', `${pct}%`);
  tomSlider.style.background = 'transparent';

  // Atualiza a cifra na tela se houver música selecionada e tom cadastrado
  if (selectedSong && selectedSong.tom) {
    tomCifra.textContent = calcularNovaCifra(selectedSong.tom, st);
  } else {
    tomCifra.textContent = '-';
  }
}

// Ouve as mudanças no Slider de Tom
tomSlider.addEventListener('input', (e) => {
  updateTomUI();
  // Chama a função que altera o tom de verdade no áudio
  setTom(parseInt(e.target.value, 10)); 
});
// ---------------------------------------------------

// --- LÓGICA DE HISTÓRICO (ÚLTIMAS TOCADAS) ---
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

function renderList(items) {
  items = items.filter(musica => musica.ativo !== false);

  songListEl.innerHTML = '';
  if (!items || !items.length) {
    songListEl.innerHTML = '<li class="muted">Nada encontrado…</li>';
    return;
  }
  
  const isSearchEmpty = songSearchEl.value.trim() === '';
  const itensParaMostrar = items.slice(0, 3);

  if (isSearchEmpty && getHistoryIds().length > 0) {
    const tituloHistorico = document.createElement('li');
    tituloHistorico.textContent = '🕒 Tocadas Recentemente';
    tituloHistorico.style.fontSize = '12px';
    tituloHistorico.style.opacity = '0.6';
    tituloHistorico.style.pointerEvents = 'none';
    tituloHistorico.style.paddingBottom = '4px';
    songListEl.appendChild(tituloHistorico);
  }

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
    
    songListEl.appendChild(li);
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

  // --- NOVO: Zera o tom quando troca de música ---
  tomSlider.value = 0;
  updateTomUI();
  setTom(0);
  // ----------------------------------------------

  const items = Array.from(songListEl.children);
  items.forEach(li => li.classList.remove('selected'));
  const found = items.find(li => li.textContent.includes(s.title));
  if (found) found.classList.add('selected');
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
    setTom(parseInt(tomSlider.value, 10)); // <-- NOVO: Aplica o tom ao dar play

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
  if (!selectedSong) { 
    const defaultList = getDefaultList();
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
    setTom(parseInt(tomSlider.value, 10)); // <-- NOVO: Aplica o tom ao dar play

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

// Inicializa a interface do Tom logo de cara
updateTomUI();
syncAll();

songSearchEl.addEventListener('input', () => {
  const filtered = filterSongs(songSearchEl.value);
  renderList(filtered);
});

(function bootstrap(){
  const listaInicial = getDefaultList();
  renderList(listaInicial);
  if (listaInicial.length) applySong(listaInicial[0].id);

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault(); songSearchEl.focus();
    }
  });
})();