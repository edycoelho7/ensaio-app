// app/audio-engine.js
let audioCtx;
let masterGain, vozGain, playbackGain, metroGain;
let pitchShift; 
let currentTom = 0; 

let isPlaying = false;
let schedulerTimerId = null;
let currentNoteTime = 0;
let currentBeatInBar = 0;

let songDuration = 0;
let startTime = 0;

let vozSource = null;
let playbackSource = null;

let currentSongId = null;
let cachedVozBuf = null;
let cachedPlaybackBuf = null;
let clickAgudoBuf = null;
let clickGraveBuf = null;

const scheduleAheadTime = 0.15;
const lookahead = 25;

function initAudioGraph() {
  if (audioCtx) return;

  audioCtx = Tone.context.rawContext;

  masterGain = audioCtx.createGain();
  masterGain.gain.value = 1.0;
  masterGain.connect(audioCtx.destination);

 // Configuração avançada do PitchShift para evitar a "voz duplicada" (eco)
  pitchShift = new Tone.PitchShift({ 
      pitch: currentTom,
      windowSize: 0.06, 
      wet: 1
  });
  Tone.connect(pitchShift, masterGain);

  vozGain = audioCtx.createGain();
  playbackGain = audioCtx.createGain();
  metroGain = audioCtx.createGain();

  Tone.connect(vozGain, pitchShift);
  Tone.connect(playbackGain, pitchShift);
  
  metroGain.connect(masterGain);
}

async function loadBufferFromUrl(url) {
  const resp = await fetch(url, { mode: 'cors' });
  const buf = await resp.arrayBuffer();
  return await audioCtx.decodeAudioData(buf);
}

function connectAndStartBuffer(buffer, when, gainNode, offset = 0) {
  const src = audioCtx.createBufferSource();
  src.buffer = buffer;
  src.connect(gainNode);
  src.start(when, offset);
  return src;
}

function secondsPerBeat(bpm) { return 60.0 / (Number(bpm) || 120); }

function scheduleClick(time, isAccent) {
  if (!clickAgudoBuf || !clickGraveBuf) return;
  const src = audioCtx.createBufferSource();
  src.buffer = isAccent ? clickAgudoBuf : clickGraveBuf;
  src.connect(metroGain);
  src.start(time);
}

function getSegmentAtTime(song, timeInSong) {
  let activeSegment = { time: 0, bpm: Number(song.bpm) || 120 };
  let nextSegment = null;

  if (song.bpmMap && song.bpmMap.length > 0) {
    for (let i = 0; i < song.bpmMap.length; i++) {
      if (timeInSong + 0.01 >= song.bpmMap[i].time) {
        activeSegment = song.bpmMap[i];
        nextSegment = song.bpmMap[i + 1] || null;
      } else {
        break;
      }
    }
  }
  return { activeSegment, nextSegment };
}

function scheduler(song, beatsPerBar) {
  let loopSafety = 0; 

  while (currentNoteTime < audioCtx.currentTime + scheduleAheadTime) {
    if (loopSafety++ > 50) break; 

    const isAccent = (currentBeatInBar % beatsPerBar === 0);
    scheduleClick(currentNoteTime, isAccent);

    const songOffset = Number(song.offset) || 0;
    const timeInSong = currentNoteTime - startTime - songOffset;

    const { activeSegment, nextSegment } = getSegmentAtTime(song, timeInSong);
    const secPerBeat = secondsPerBeat(activeSegment.bpm);

    let nextNoteTimeCandidate = currentNoteTime + secPerBeat;
    let nextTimeInSongCandidate = nextNoteTimeCandidate - startTime - songOffset;

    if (nextSegment && nextTimeInSongCandidate >= nextSegment.time) {
      currentNoteTime = startTime + songOffset + nextSegment.time;
      currentBeatInBar = 0; 
    } else {
      currentNoteTime = nextNoteTimeCandidate;
      currentBeatInBar = (currentBeatInBar + 1) % beatsPerBar;
    }
  }
}

export async function startAll(song) {
  if (isPlaying) return;
  
  await Tone.start();
  initAudioGraph();

  if (currentSongId !== song.id) {
    const baseUrl = "https://res.cloudinary.com/dahzww1gv/video/upload/v1/";
    const urlVoz = `${baseUrl}${song.id}-voz.mp3`;
    const urlPlayback = `${baseUrl}${song.id}-playback.mp3`;

    const [vozBuf, playbackBuf, agudoBuf, graveBuf] = await Promise.all([
      loadBufferFromUrl(urlVoz),
      loadBufferFromUrl(urlPlayback),
      loadBufferFromUrl('click-agudo.mp3'), 
      loadBufferFromUrl('click-grave.mp3')  
    ]);
    
    cachedVozBuf = vozBuf;
    cachedPlaybackBuf = playbackBuf;
    clickAgudoBuf = agudoBuf;
    clickGraveBuf = graveBuf;
    currentSongId = song.id;
  }

  songDuration = cachedPlaybackBuf.duration;

  const startAt = audioCtx.currentTime + 0.25;
  startTime = startAt;

  const beatsPerBar = parseInt(String(song.timeSignature).split('/')[0], 10) || 4;
  const offset = Number(song.offset) || 0;

  vozSource = connectAndStartBuffer(cachedVozBuf, startAt, vozGain);
  playbackSource = connectAndStartBuffer(cachedPlaybackBuf, startAt, playbackGain);

  currentBeatInBar = 0;
  currentNoteTime = startAt + offset;

  schedulerTimerId = setInterval(() => scheduler(song, beatsPerBar), lookahead);
  isPlaying = true;
}

export function seekTo(percent, song) {
  if (!isPlaying || !audioCtx) return;

  const offsetTime = (percent / 100) * songDuration;

  if (schedulerTimerId) { clearInterval(schedulerTimerId); schedulerTimerId = null; }
  try { vozSource && vozSource.stop(); } catch(e) {}
  try { playbackSource && playbackSource.stop(); } catch(e) {}

  startTime = audioCtx.currentTime - offsetTime;

  vozSource = connectAndStartBuffer(cachedVozBuf, audioCtx.currentTime, vozGain, offsetTime);
  playbackSource = connectAndStartBuffer(cachedPlaybackBuf, audioCtx.currentTime, playbackGain, offsetTime);

  const beatsPerBar = parseInt(String(song.timeSignature).split('/')[0], 10) || 4;
  const songOffset = Number(song.offset) || 0;
  const timeInSong = offsetTime - songOffset;

  if (timeInSong >= 0) {
    const { activeSegment } = getSegmentAtTime(song, timeInSong);
    const secPerBeat = secondsPerBeat(activeSegment.bpm);

    const timeIntoSegment = timeInSong - activeSegment.time;

    const beatsPassed = Math.floor(timeIntoSegment / secPerBeat);
    currentBeatInBar = (beatsPassed + 1) % beatsPerBar;
    const timeSinceLastBeat = timeIntoSegment % secPerBeat;
    currentNoteTime = audioCtx.currentTime + (secPerBeat - timeSinceLastBeat);
  } else {
    currentBeatInBar = 0;
    currentNoteTime = audioCtx.currentTime + Math.abs(timeInSong);
  }

  schedulerTimerId = setInterval(() => scheduler(song, beatsPerBar), lookahead);
}

export async function togglePause() {
  if (!audioCtx) return "stopped";
  
  if (audioCtx.state === 'running') {
    await audioCtx.suspend(); 
    return "paused";
  } else if (audioCtx.state === 'suspended') {
    await audioCtx.resume(); 
    return "playing";
  }
}

export function stopAll() {
  if (!audioCtx) return;
  if (schedulerTimerId) { clearInterval(schedulerTimerId); schedulerTimerId = null; }
  try { vozSource && vozSource.stop(); } catch(e) {}
  try { playbackSource && playbackSource.stop(); } catch(e) {}
  vozSource = null; playbackSource = null;
  isPlaying = false;
}

export function setVozVolume(v){ if (vozGain) vozGain.gain.value = v; }
export function setPlaybackVolume(v){ if (playbackGain) playbackGain.gain.value = v; }
export function setMetroVolume(v){ if (metroGain) metroGain.gain.value = v; }

export function setTom(semitons) {
  currentTom = semitons;
  if (pitchShift) {
    pitchShift.pitch = semitons;
  }
}

export function getDuration() { return songDuration; }
export function getCurrentTime() {
  if (!isPlaying || !audioCtx) return 0;
  const now = audioCtx.currentTime - startTime;
  return Math.max(0, Math.min(now, songDuration));
}

// ==========================================
// A PONTE PARA O IPHONE: Desbloqueio de Áudio
// ==========================================
export function unlockAudio() {
  // 1. Força a inicialização do Tone.js instantaneamente no clique
  if (typeof Tone !== 'undefined') {
      Tone.start();
  }
  
  // 2. Garante que o contexto nativo também acorde, caso já tenha sido criado
  if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
  }
}