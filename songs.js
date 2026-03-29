// songs.js — catálogo simples (somente leitura no app)
export const SONGS = [
  {
    id: "2026-03_valsa-do-amanha",
    title: "Valsa do Amanhã",
    artist: "Trio Y",
    bpm: 90,
    timeSignature: "3/4",
    offset: 0.00,
    tom: "C" // <-- Tom original adicionado aqui
  },
  {
    id: "1", title: "Meu Maior Amor", artist: "Nivea Soares", bpm: 148, timeSignature: "4/4", offset: -0.15, tom: "D#" // <-- Adicionado
  },
  { id: "2", title: "Algo Novo Vindo", artist: "Get Worship", bpm: 91, timeSignature: "4/4", offset: 2.80, tom: "D#" }, // <-- Adicionado
  { id: "3", title: "Toda Terra (Ao Vivo)", artist: "Gabriela Rocha", bpm: 66, timeSignature: "4/4", offset: 0.00, ativo: false, tom: "E" }, // <-- Adicionado
  { id: "4", title: "You Are Good", artist: "Israel Houghton", bpm: 130, timeSignature: "4/4", offset: 1.41, tom: "E" }, // <-- Adicionado
];