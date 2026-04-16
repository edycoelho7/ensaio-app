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
  { id: "3", title: "Toda Terra (Ao Vivo)", artist: "Gabriela Rocha", bpm: 66, timeSignature: "4/4", offset: 0.00, tom: "E", 
    ocultarMetronomo: true // <-- Adicionado aqui para desativar o metrônomo
  },
  { id: "4", title: "You Are Good", artist: "Israel Houghton", bpm: 130, timeSignature: "4/4", offset: 1.41, tom: "E" }, // <-- Adicionado
  { id: "5", title: "Um novo dia", artist: "Get Worship", bpm: 151, timeSignature: "3/4", offset: 2.50, tom: "F#" },
  { id: "6", title: "Tudo é Pra Tua Glória (ao vivo)", artist: "Dunamis", bpm: 142, timeSignature: "4/4", offset: 1.90, tom: "A", bpmMap:[
    { time: 0, bpm: 142 },         // Início da música (considerando o offset de 1.95)
    { time: 273.500, bpm: 138 },    // Ponto onde o metrônomo zera e recomeça aos 41.951s
    { time: 286.500, bpm: 138 },
    { time: 292.500, bpm: 1 }   
  ]
},
  { id: "7", title: "Digno de Tudo + Te Exaltamos", artist: "Felipe Rodrigues", bpm: 136, timeSignature: "4/4", offset: 1.42, tom: "C" },
  { id: "8", title: "Jesus Filho de Deus + Nada Além do Sangue (Ao-Vivo)", artist: "Pedro Bertoldo", bpm: 132, timeSignature: "4/4", offset: 22.00, tom: "E", 
    ocultarMetronomo: true // <-- Adicionado aqui para desativar o metrônomo 
    },
  { id: "9", title: "Galileu", artist: "Sued Silva", bpm: 126, timeSignature: "4/4", offset: 0.00, tom: "F#" }, // <-- Adicionado
  { id: "10", title: "O Seu Amor por Mim + Me Ama", artist: "Áquila Amorim", bpm: 136, timeSignature: "3/4", offset: 0.00, tom: "G",
  bpmMap:[
    { time: 0, bpm: 136 },
    { time: 135.000, bpm: 272 }
  ]
},
];
