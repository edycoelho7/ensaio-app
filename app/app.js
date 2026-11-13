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
import { SONGS } from '../songs.js?v=1.928';
import { startAll, stopAll, togglePause, seekTo, setVozVolume, setPlaybackVolume, setMetroVolume, setTom, getDuration, getCurrentTime, unlockAudio } from './audio-engine.js?v=2';

// 🔴 ÍCONES DO PLAYER (Mantém os botões redondos)
const ICON_PLAY = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#030814"><path d="M8 5v14l11-7z"></path></svg>`;
const ICON_PAUSE = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#030814"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;
const ICON_LOAD = `<svg width="18" height="18" viewBox="0 0 24 24" fill="#030814"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>`;
const ICON_STOP = `<svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M6 6h12v12H6z"></path></svg>`;

// ELEMENTOS DA INTERFACE DAS ABAS E BUSCA
const searchResultsEl = document.getElementById('searchResults');
const tabsContainerEl = document.querySelector('.tabs-container');
const contentRepertorio = document.getElementById('contentRepertorio');
const contentRecentes = document.getElementById('contentRecentes');
const tabBtnRepertorio = document.getElementById('tabBtnRepertorio');
const tabBtnRecentes = document.getElementById('tabBtnRecentes');
const repertorioListEl = document.getElementById('repertorioList');
const btnAvisarGrupo = document.getElementById('btnAvisarGrupo');

// ELEMENTOS DO PLAYER (Mini e Expandido)
const songListEl   = document.getElementById('songList');
const songSearchEl = document.getElementById('songSearch');

const miniPlayerInfo   = document.querySelector('.mini-player-info');
const playerExpandido  = document.getElementById('player-expandido');
const fecharExpandido  = document.getElementById('fecharExpandido');

const songTitleEl      = document.getElementById('songTitle');
const songArtistEl     = document.getElementById('songArtist');
const songTitleLarge   = document.getElementById('songTitleLarge');
const songArtistLarge  = document.getElementById('songArtistLarge');

const playerCover      = document.getElementById('player-cover');
const playerCoverLarge = document.getElementById('player-cover-large');

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
const progressBarLarge = document.getElementById('progressBarLarge');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const durationDisplay = document.getElementById('durationDisplay');

let selectedSong = null;
let animationFrameId = null;
let isPaused = false;
let isDragging = false; 

// ==========================================
// ABRIR / FECHAR PAINEL DO MIXER
// ==========================================
miniPlayerInfo.addEventListener('click', () => {
  playerExpandido.classList.add('aberto');
});

fecharExpandido.addEventListener('click', () => {
  playerExpandido.classList.remove('aberto');
});

// ==========================================
// LÓGICA DO REPERTÓRIO DO DIA
// ==========================================
const REPERTORIO_DO_DIA = [
  "Fé",
  "Meia Noite",
  "Ser Reconhecido",
  "Jesus Te Ama",
  "Cri"
];

function renderRepertorio() {
  if (!repertorioListEl) return;
  repertorioListEl.innerHTML = '';

  const repertorioItems = REPERTORIO_DO_DIA.map(titulo => SONGS.find(s => s.title === titulo)).filter(Boolean);

  if (repertorioItems.length === 0) {
     repertorioListEl.innerHTML = '<li class="muted" style="text-align:center; flex: 1;">Nenhuma música definida.</li>';
     return;
  }

  repertorioItems.forEach((s) => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    
    // Pega o nome do artista e transforma no nome do arquivo da imagem
    const artistImgName = s.artist ? s.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') : 'default';
    const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;

    // Cria a estrutura do card com imagem e texto
    li.innerHTML = `
      <img src="${imgPath}" onerror="this.src='https://via.placeholder.com/150/111e38/00b4d8?text=♪'" alt="Capa">
      <span class="list-title-text">${s.title}</span>
      <span class="list-artist-text">${s.artist || 'Desconhecido'}</span>
    `;
    
    li.addEventListener('click', () => { applySong(s.id); forcePlay(); });
    repertorioListEl.appendChild(li);
  });
}

// ==========================================
// LÓGICA DAS ABAS E WHATSAPP
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

  tabBtnRepertorio.click();
}

if (btnAvisarGrupo) {
  btnAvisarGrupo.addEventListener('click', () => {
    let texto = "*🗓️ Repertório do Culto - Domingo*\n\n";
    const repertorioItems = REPERTORIO_DO_DIA.map(titulo => SONGS.find(s => s.title === titulo)).filter(Boolean);
    
    repertorioItems.forEach((s, index) => {
        texto += `${index + 1}. *${s.title}* -\n${s.artist || 'Desconhecido'}\n`;
    });
    
    texto += "\n_Link do App: https://edycoelho7.github.io/ensaio-app/_"; 
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// ==========================================
// ESCALA MUSICAL PARA O TOM
// ==========================================
// Escalas apenas para a matemática (iguais ao que está no songs.js)
const escalaMatematicaSubindo = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const escalaMatematicaDescendo = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Escalas apenas para a tela (o formato híbrido)
const escalaVisualSubindo = ['Do(C)', 'Do(C)#', 'Re(D)', 'Re(D)#', 'Mi(E)', 'Fa(F)', 'Fa(F)#', 'Sol(G)', 'Sol(G)#', 'La(A)', 'La(A)#', 'Si(B)'];
const escalaVisualDescendo = ['Do(C)', 'Re(D)b', 'Re(D)', 'Mi(E)b', 'Mi(E)', 'Fa(F)', 'Sol(G)b', 'Sol(G)', 'La(A)b', 'La(A)', 'Si(B)b', 'Si(B)'];

function calcularNovaCifra(tomOriginal, semitonsAdicionados) {
  if (!tomOriginal || tomOriginal === '-') return '-';

  // Faz a busca usando a escala matemática original
  let index = escalaMatematicaSubindo.indexOf(tomOriginal);
  if (index === -1) index = escalaMatematicaDescendo.indexOf(tomOriginal);
  if (index === -1) return tomOriginal; 

  let novoIndex = (index + semitonsAdicionados) % 12;
  if (novoIndex < 0) novoIndex += 12; 

  // Retorna o resultado usando a escala visual (híbrida)
  return semitonsAdicionados >= 0 ? escalaVisualSubindo[novoIndex] : escalaVisualDescendo[novoIndex];
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

function renderList(items) {
  items = items.filter(musica => musica.ativo !== false);
  const isSearchEmpty = songSearchEl.value.trim() === '';
  const listaAlvo = isSearchEmpty ? songListEl : searchResultsEl;
  listaAlvo.innerHTML = '';function renderList(items) {
  items = items.filter(musica => musica.ativo !== false);
  const isSearchEmpty = songSearchEl.value.trim() === '';
  const listaAlvo = isSearchEmpty ? songListEl : searchResultsEl;

  // Mostra ou esconde os resultados dependendo se há texto digitado
  if (isSearchEmpty) {
    searchResultsEl.style.display = 'none';
  } else {
    searchResultsEl.style.display = 'flex';
  }

  listaAlvo.innerHTML = '';

  if (!items || !items.length) {
    listaAlvo.innerHTML = '<li class="muted" style="text-align:center;">Nada encontrado…</li>';
    return;
  }
  
  const itensParaMostrar = isSearchEmpty ? items.slice(0, 3) : items;

  itensParaMostrar.forEach(s => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    
    const artistImgName = s.artist ? s.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') : 'default';
    const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;

    li.innerHTML = `
      <img src="${imgPath}" onerror="this.src='https://via.placeholder.com/150/111e38/00b4d8?text=♪'" alt="Capa">
      <span class="list-title-text">${s.title}</span>
      <span class="list-artist-text">${s.artist || 'Desconhecido'}</span>
    `;
    
    li.addEventListener('click', () => { applySong(s.id); forcePlay(); });
    listaAlvo.appendChild(li);
  });
}

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
    li.tabIndex = 0;
    
    const artistImgName = s.artist ? s.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') : 'default';
    const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;

    li.innerHTML = `
      <img src="${imgPath}" onerror="this.src='https://via.placeholder.com/150/111e38/00b4d8?text=♪'" alt="Capa">
      <span class="list-title-text">${s.title}</span>
      <span class="list-artist-text">${s.artist || 'Desconhecido'}</span>
    `;
    
    li.addEventListener('click', () => { applySong(s.id); forcePlay(); });
    li.addEventListener('keydown', (e) => { 
      if (e.key === 'Enter') { applySong(s.id); forcePlay(); } 
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
  songTitleLarge.textContent = s.title || '—';
  songArtistLarge.textContent = s.artist || '—';

  // Automação da Capa do Artista
  // Ex: "Renascer Praise" vira "renascer-praise.jpg"
  const artistImgName = s.artist ? s.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') : 'default';
  
  // Podes alterar o './' para o link do teu Cloudinary mais tarde!
  const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;
  
  playerCover.src = imgPath;
  playerCoverLarge.src = imgPath;
  // Fallback se a imagem não existir
  playerCover.onerror = () => { playerCover.src = 'https://via.placeholder.com/48/111e38/00b4d8?text=♪' };
  playerCoverLarge.onerror = () => { playerCoverLarge.src = 'https://via.placeholder.com/250/111e38/00b4d8?text=♪' };

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
      
      // Sincroniza as duas barras
      progressBar.value = percentage;
      progressBar.style.setProperty('--value', `${percentage}%`);
      progressBarLarge.value = percentage;
      progressBarLarge.style.setProperty('--value', `${percentage}%`);
    }
  }
  animationFrameId = requestAnimationFrame(updateProgress);
}

function handleProgressInput(e) {
  isDragging = true;
  const percentage = e.target.value;
  
  progressBar.style.setProperty('--value', `${percentage}%`);
  progressBarLarge.style.setProperty('--value', `${percentage}%`);
  progressBar.value = percentage;
  progressBarLarge.value = percentage;
  
  const newTime = (percentage / 100) * getDuration();
  currentTimeDisplay.textContent = formatTime(newTime);
}

function handleProgressChange(e) {
  isDragging = false;
  if (selectedSong && getCurrentTime() > 0) {
    seekTo(e.target.value, selectedSong);
  }
}

progressBar.addEventListener('input', handleProgressInput);
progressBar.addEventListener('change', handleProgressChange);
progressBarLarge.addEventListener('input', handleProgressInput);
progressBarLarge.addEventListener('change', handleProgressChange);

async function forcePlay() {
  if (typeof unlockAudio === 'function') unlockAudio();
  stopAll(); 
  isPaused = false;
  
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  progressBar.value = 0; progressBarLarge.value = 0;
  progressBar.style.setProperty('--value', '0%');
  progressBarLarge.style.setProperty('--value', '0%');
  currentTimeDisplay.textContent = '0:00';

  playBtn.disabled = true; 
  playBtn.innerHTML = ICON_LOAD;

  try {
    await startAll(selectedSong);
    
    setVozVolume(parseFloat(vozVol.value));
    setPlaybackVolume(parseFloat(playbackVol.value));
    setMetroVolume(parseFloat(metroVol.value));
    setTom(parseInt(tomSlider.value, 10)); 

    updateProgress();
    playBtn.innerHTML = ICON_PAUSE;
  } catch (err) {
    console.error("Erro ao carregar áudio:", err);
    playBtn.innerHTML = ICON_PLAY;
  } finally {
    playBtn.disabled = false;
  }
}

playBtn.addEventListener('click', async () => {
  if (typeof unlockAudio === 'function') unlockAudio();

  if (!selectedSong) { 
    const repItems = REPERTORIO_DO_DIA.map(t => SONGS.find(s => s.title === t)).filter(Boolean);
    const defaultList = repItems.length > 0 ? repItems : getDefaultList();
    if (defaultList.length) applySong(defaultList[0].id); 
    else return; 
  }
  
  if (currentTimeDisplay.textContent !== '0:00') {
      const state = await togglePause();
      if (state === "paused") {
          isPaused = true;
          playBtn.innerHTML = ICON_PLAY;
      } else if (state === "playing") {
          isPaused = false;
          playBtn.innerHTML = ICON_PAUSE;
      }
      return;
  }

  playBtn.disabled = true; 
  playBtn.innerHTML = ICON_LOAD;

  try {
    await startAll(selectedSong);
    setVozVolume(parseFloat(vozVol.value));
    setPlaybackVolume(parseFloat(playbackVol.value));
    setMetroVolume(parseFloat(metroVol.value));
    setTom(parseInt(tomSlider.value, 10)); 

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    updateProgress();
    
    isPaused = false;
    playBtn.innerHTML = ICON_PAUSE;
  } catch (err) {
    console.error("Erro ao carregar áudio:", err);
    playBtn.innerHTML = ICON_PLAY;
  } finally {
    playBtn.disabled = false;
  }
});

stopBtn.addEventListener('click', () => { 
  stopAll(); 
  isPaused = false;
  playBtn.innerHTML = ICON_PLAY;
  stopBtn.innerHTML = ICON_STOP;
  
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  progressBar.value = 0; progressBarLarge.value = 0;
  progressBar.style.setProperty('--value', '0%');
  progressBarLarge.style.setProperty('--value', '0%');
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
const VERSAO_ATUAL_APP = "1.928"; 

const HISTORICO_NOVIDADES = {
  "1.928": ["Fé - Fhop Music"],
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

  const listaInicial = getDefaultList(); 
  renderList(listaInicial);
  
  if (listaInicial.length) {
    applySong(listaInicial[0].id);
  } else {
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
// ==========================================
// CONTROLE DOS BOTÕES DE TOM (+ e -)
// ==========================================
const btnTomMenos = document.getElementById('btnTomMenos');
const btnTomMais = document.getElementById('btnTomMais');

if (btnTomMenos && btnTomMais) {
  btnTomMenos.addEventListener('click', () => {
    let atual = parseInt(tomSlider.value, 10);
    if (atual > -5) { // O limite mínimo é -5
      tomSlider.value = atual - 1;
      updateTomUI();
      setTom(parseInt(tomSlider.value, 10));
    }
  });

  btnTomMais.addEventListener('click', () => {
    let atual = parseInt(tomSlider.value, 10);
    if (atual < 6) { // O limite máximo é +6
      tomSlider.value = atual + 1;
      updateTomUI();
      setTom(parseInt(tomSlider.value, 10));
    }
  });
}
// ==========================================
// SINCRONIZAR BOTÃO DE PLAY GRANDE COM O MINI
// ==========================================
const playBtnLarge = document.getElementById('playBtnLarge');

if (playBtnLarge) {
  // Quando clicar no botão grande, ele "finge" que clicou no pequeno
  playBtnLarge.addEventListener('click', () => {
    playBtn.click();
  });

  // Fica observando o botão pequeno. Se o ícone dele mudar (Play para Pause),
  // ele copia o ícone para o botão grande e aumenta o tamanho do desenho!
  const observer = new MutationObserver(() => {
    playBtnLarge.innerHTML = playBtn.innerHTML
      .replace(/width="18"/g, 'width="32"')
      .replace(/height="18"/g, 'height="32"');
  });
  
  observer.observe(playBtn, { childList: true });
}
// ==========================================
// SAUDAÇÃO DINÂMICA PELO HORÁRIO
// ==========================================
function atualizarSaudacao() {
  const saudacaoEl = document.getElementById('saudacaoTexto');
  if (!saudacaoEl) return;
  
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) {
    saudacaoEl.textContent = 'Bom dia';
  } else if (hora >= 12 && hora < 18) {
    saudacaoEl.textContent = 'Boa tarde';
  } else {
    saudacaoEl.textContent = 'Boa noite';
  }
}

// Roda a função assim que o app abre
atualizarSaudacao();

// ==========================================
// NAVEGAÇÃO DO MENU INFERIOR E BUSCA
// ==========================================
const navHome = document.getElementById('navHome');
const navBuscar = document.getElementById('navBuscar');
const navRepertorio = document.getElementById('navRepertorio');

const caixaRecentes = document.getElementById('contentRecentes');
const caixaRepertorio = document.getElementById('contentRepertorio');
const telaBusca = document.getElementById('telaBusca');
const inputBusca = document.getElementById('songSearch');

function limparMenuAtivo() {
  if (navHome) navHome.classList.remove('active');
  if (navBuscar) navBuscar.classList.remove('active');
  if (navRepertorio) navRepertorio.classList.remove('active');
}

if (navHome && navBuscar && navRepertorio) {
  
  navHome.addEventListener('click', () => {
    limparMenuAtivo();
    navHome.classList.add('active');
    
    if(caixaRecentes) caixaRecentes.classList.add('active');
    if(caixaRepertorio) caixaRepertorio.classList.remove('active');
    if(telaBusca) telaBusca.style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navBuscar.addEventListener('click', () => {
    limparMenuAtivo();
    navBuscar.classList.add('active');
    
    if(caixaRecentes) caixaRecentes.classList.remove('active');
    if(caixaRepertorio) caixaRepertorio.classList.remove('active');
    if(telaBusca) {
      telaBusca.style.display = 'block';
      if(inputBusca) inputBusca.focus();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  navRepertorio.addEventListener('click', () => {
    limparMenuAtivo();
    navRepertorio.classList.add('active');
    
    if(caixaRepertorio) caixaRepertorio.classList.add('active');
    if(caixaRecentes) caixaRecentes.classList.remove('active');
    if(telaBusca) telaBusca.style.display = 'none';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
// Forçar a atualização e a exibição da aba Home no arranque da aplicação
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const btnHome = document.getElementById('tabBtnRecentes');
    if (btnHome) {
      btnHome.click();
    }
  }, 100); // Um pequeno atraso de 0.1s para garantir que tudo já carregou
});

// Função auxiliar para desenhar listas no formato menor (Spotify Search)
function renderListCompacta(items, containerEl) {
  containerEl.innerHTML = '';

  if (!items || items.length === 0) {
    containerEl.innerHTML = '<li class="muted" style="text-align:center; display:block;">Nenhuma música ou artista encontrado.</li>';
    return;
  }

  items.forEach(item => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    
    // 1. SE O ITEM FOR UM ARTISTA (Abre a página do artista)
   // 1. SE O ITEM FOR UM ARTISTA (Abre a página do artista)
    if (item.type === 'artist') {
      const artistImgName = item.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
      const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;

      li.innerHTML = `
        <img src="${imgPath}" onerror="this.src='https://via.placeholder.com/50/111e38/00b4d8?text=A'" alt="Artista" style="border-radius: 50% !important;">
        <div class="list-compact-info">
          <span class="list-compact-title">${item.name}</span>
          <span class="list-compact-artist">Artista</span>
        </div>
      `;
      
      li.addEventListener('click', () => { 
        // 1. Limpa o campo de texto e esconde a lista de resultados
        if (songSearchEl) songSearchEl.value = '';
        if (searchResultsEl) searchResultsEl.style.display = 'none';
        
        // 2. Esconde o ecrã de busca inteiro
        if (document.getElementById('telaBusca')) {
          document.getElementById('telaBusca').style.display = 'none';
        }
        
        // 3. Chama a função que abre a página do artista
        window.filtrarPorArtista(item.name); 
      });
    }
    // 2. SE O ITEM FOR UMA MÚSICA (Toca a música)
    else {
      const s = item; 
      const artistImgName = s.artist ? s.artist.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-') : 'default';
      const imgPath = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;

      li.innerHTML = `
        <img src="${imgPath}" onerror="this.src='https://via.placeholder.com/50/111e38/00b4d8?text=♪'" alt="Capa">
        <div class="list-compact-info">
          <span class="list-compact-title">${s.title}</span>
          <span class="list-compact-artist">${s.artist || 'Desconhecido'}</span>
        </div>
      `;
      
      li.addEventListener('click', () => { applySong(s.id); forcePlay(); });
    }

    containerEl.appendChild(li);
  });
}

// Atualiza o evento de busca para misturar Artistas e Músicas
if (songSearchEl) {
  songSearchEl.addEventListener('input', () => {
    const query = songSearchEl.value.trim().toLowerCase();
    
    if (query === '') {
      searchResultsEl.style.display = 'none';
    } else {
      searchResultsEl.style.display = 'flex';
      
      // Busca as músicas correspondentes
      const filteredSongs = filterSongs(query);

      // Busca artistas únicos que combinam com a pesquisa
      const todosArtistas = [...new Set(SONGS.map(s => s.artist).filter(Boolean))];
      const artistasEncontrados = todosArtistas
        .filter(a => a.toLowerCase().includes(query))
        .map(a => ({ type: 'artist', name: a })); // Tag especial para identificar que é artista

      // Junta tudo (Artistas aparecem primeiro, músicas depois)
      const combinados = [...artistasEncontrados, ...filteredSongs];

      renderListCompacta(combinados, searchResultsEl);
    }
  });
}

// ----------------------------------------------------
// LÓGICA DA PÁGINA DO ARTISTA
// ----------------------------------------------------
const telaArtista = document.getElementById('telaArtista');
const btnVoltarArtista = document.getElementById('btnVoltarArtista');

window.filtrarPorArtista = function(nomeDoArtista) {
  // 1. Esconde a Home e a Busca
  if (document.getElementById('contentRecentes')) document.getElementById('contentRecentes').classList.remove('active');
  if (document.getElementById('contentRepertorio')) document.getElementById('contentRepertorio').classList.remove('active');
  if (document.getElementById('telaBusca')) document.getElementById('telaBusca').style.display = 'none'; // <--- ADICIONE SÓ ESTA LINHA AQUI
  
  // 2. Prepara a imagem e nome do artista
  const artistImgName = nomeDoArtista.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-');
  document.getElementById('fotoArtistaDetalhe').src = `https://res.cloudinary.com/dahzww1gv/image/upload/${artistImgName}.jpg`;
  document.getElementById('nomeArtistaDetalhe').textContent = nomeDoArtista;

  // 3. Filtra as músicas do artista e desenha na lista compacta
  const musicasDoArtista = SONGS.filter(musica => musica.artist === nomeDoArtista);
  renderListCompacta(musicasDoArtista, document.getElementById('listaArtistaMusicas'));

  // 4. Mostra a página do artista
  telaArtista.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Botão de voltar da página do artista para a Home
if (btnVoltarArtista) {
  btnVoltarArtista.addEventListener('click', () => {
    telaArtista.style.display = 'none';
    document.getElementById('navHome').click(); // Simula o clique na Home para resetar a tela
  });
}

// Garantir que a página do artista suma quando clicar nos menus inferiores
const menusNavegacao = [document.getElementById('navHome'), document.getElementById('navBuscar'), document.getElementById('navRepertorio')];
menusNavegacao.forEach(btn => {
  if(btn) {
    btn.addEventListener('click', () => {
      if(telaArtista) telaArtista.style.display = 'none';
    });
  }
});

// ==========================================
// CONTROLE DOS BOTÕES AVANÇAR E VOLTAR
// ==========================================
const prevBtnLarge = document.getElementById('prevBtnLarge');
const nextBtnLarge = document.getElementById('nextBtnLarge');

function tocarProximaOuAnterior(avancar) {
  if (!selectedSong) return;

  // 1. Pega APENAS as músicas válidas do Repertório
  const musicasDoRepertorio = REPERTORIO_DO_DIA
    .map(titulo => SONGS.find(s => s.title === titulo))
    .filter(Boolean);

  // Verifica se a atual é do repertório
  const indexNoRepertorio = musicasDoRepertorio.findIndex(s => s.id === selectedSong.id);
  
  // 2. LÓGICA DO REPERTÓRIO (Travado no culto)
  if (indexNoRepertorio !== -1) {
    let proximoIndex;
    if (avancar) {
      proximoIndex = (indexNoRepertorio + 1) % musicasDoRepertorio.length;
    } else {
      proximoIndex = (indexNoRepertorio - 1 + musicasDoRepertorio.length) % musicasDoRepertorio.length;
    }
    
    const proximaMusica = musicasDoRepertorio[proximoIndex];
    if (proximaMusica) {
      applySong(proximaMusica.id);
      forcePlay();
      return; 
    }
  }

  // 3. LÓGICA 100% ALEATÓRIA (Fora do repertório)
  const idsDoRepertorio = musicasDoRepertorio.map(m => m.id);
  
  // Pega todas as músicas do app, EXCETO a que está tocando agora e as do repertório
  const todasOutras = SONGS.filter(s => 
    s.id !== selectedSong.id && 
    !idsDoRepertorio.includes(s.id)
  );
  
  let musicaSorteada = null;
  
  if (todasOutras.length > 0) {
    // Sorteia 100% aleatório entre todas as músicas disponíveis
    const randomIndex = Math.floor(Math.random() * todasOutras.length);
    musicaSorteada = todasOutras[randomIndex];
  }

  if (musicaSorteada) {
    applySong(musicaSorteada.id);
    forcePlay();
  }
}

// Atrelando a função aos botões
if (prevBtnLarge) {
  prevBtnLarge.addEventListener('click', () => tocarProximaOuAnterior(false));
}

if (nextBtnLarge) {
  nextBtnLarge.addEventListener('click', () => tocarProximaOuAnterior(true));
}