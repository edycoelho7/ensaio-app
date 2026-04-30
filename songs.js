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
  { id: "6", title: "Tudo e Pra Tua Glória (ao vivo)", artist: "Dunamis", bpm: 142, timeSignature: "4/4", offset: 1.90, tom: "A", bpmMap:[
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
  { id: "9", title: "Galileu", artist: "Sued Silva", bpm: 126, timeSignature: "4/4", offset: 6.40, tom: "F#", ocultarMetronomo: true
  },
  { id: "10", title: "O Seu Amor por Mim + Me Ama", artist: "Áquila Amorim", bpm: 136, timeSignature: "3/4", offset: 0.00, tom: "G",
  bpmMap:[
    { time: 0, bpm: 136 },
    { time: 135.500, bpm: 136 },
    { time: 452.000, bpm:1 }
  ]
},
  { id: "11", title: "Tudo é Perda + Eu so quero Tua presença", artist: "Felipe Rodrigues", bpm: 130, timeSignature: "4/4", offset: 18.590, tom: "C#" },
  { id: "12", title: "Meia Noite", artist: "Fhop Music", bpm: 196, timeSignature: "4/4", offset: 0.63, tom: "D" },
  { id: "13", title: "Se eu nao te ouvir", artist: "Sarah Farias", bpm: 140, timeSignature: "4/4", offset: 3.350, tom: "C" },
  { id: "14", title: "Sobre as Aguas", artist: "Rapha Gonçalves", bpm: 166, timeSignature: "3/4", offset: 1.40, tom: "E"
  },
  { id: "15", title: "O Seu Amor por mim", artist: "Weslei Santos", bpm: 140, timeSignature: "6/8", offset: 81.10, tom: "F#" },
  { id: "16", title: "Tu es + Aguas Purificadoras", artist: "Fhop Music", bpm: 142, timeSignature: "4/4", offset: 0.40, tom: "D" },
  { id: "17", title: "Jeová Jireh", artist: "Aline Barros", bpm: 134, timeSignature: "4/4", offset: 0.316, tom: "G" ,
    bpmMap:[
    { time: 0.316, bpm: 134 },
    { time: 395.500, bpm: 1 }
    ]
  },
  { id: "18", title: "Escape", artist: "Renascer Praise", bpm: 128, timeSignature: "4/4", offset: 32.00, tom: "D" ,
    bpmMap:[
    { time: 32.00, bpm: 128 },
    { time: 211.95, bpm: 132 },
    { time: 380.95, bpm: 1 }
    ]
  },
  { id: "19", title: "Jesus e o Caminho (Ao Vivo)", artist: "Heloisa Rosa", bpm: 138, timeSignature: "4/4", offset: 2.40, tom: "E" },
  { id: "20", title: "Com Cristo e Vencer ", artist: "Cassiane", bpm: 142, timeSignature: "4/4", offset: 0.42, tom: "B" , ocultarMetronomo: true },
  { id: "21", title: "Em Tua Presença (Ao Vivo)", artist: "Nivea Soares", bpm: 156, timeSignature: "4/4", offset: 0.42, tom: "G" },
  { id: "22", title: "Canção que não envelhece", artist: "Julliany Souza - Lukas Agustinho", bpm: 135, timeSignature: "4/4", offset: 0.92, tom: "G#" },
  { id: "23", title: "Sou Grato Por Seu Amor", artist: "Get Worship", bpm: 144, timeSignature: "4/4", offset: 1.50, tom: "D" },
  { id: "24", title: "Mil Graus", artist: "Renascer Praise", bpm: 153, timeSignature: "4/4", offset: 1.70, tom: "C" },
  { id: "25", title: "Salmos 126", artist: "Ministerio Zoe", bpm: 62, timeSignature: "4/4", offset: 1.90, tom: "A#" , ocultarMetronomo: true },
  { id: "26", title: "Tudo é diferente", artist: "Aline Barros", bpm: 120, timeSignature: "4/4", offset: 0.58, tom: "D" },
  { id: "27", title: "Tudo é Perda + Tua Presença", artist: "Damaris Andrade", bpm: 126, timeSignature: "4/4", offset: 3.20, tom: "C#" },
  { id: "28", title: "Em nome de Jesus", artist: "Aline Silva", bpm: 105, timeSignature: "4/4", offset: 0.450, tom: "C" },
  { id: "29", title: "Deserto", artist: "LC 21", bpm: 150, timeSignature: "4/4", offset: 0.00, tom: "G" },
  { id: "30", title: "Digno é o Senhor + Senhor e Rei", artist: "Vini Flores", bpm: 138, timeSignature: "4/4", offset: 1.05, tom: "E" ,
    bpmMap:[
    { time: 1.05, bpm: 138 },
    { time: 322.80, bpm: 0.1 }
    ]
  },
  { id: "31", title: "Quero Subir", artist: "Diante do Trono", bpm: 113, timeSignature: "4/4", offset: 3.80, tom: "C", 
     bpmMap:[
    { time: 3.80, bpm: 113 },
    { time: 61.10, bpm: 113 },
    { time: 133.30, bpm: 113 },
    { time: 180.00, bpm: 113.1 },
    { time: 226.70, bpm: 113.1 }
    ]
  },
  { id: "32", title: "Santidade", artist: "Aline Barros", bpm: 132.1, timeSignature: "4/4", offset: 2.00, tom: "F#" ,
     bpmMap:[
    { time: 2.00, bpm: 132.1 },
    { time: 34.70, bpm: 132},
     ]
  },
  { id: "33", title: "Ser Reconhecido", artist: "Renascer Praise", bpm: 140, timeSignature: "3/4", offset: 4.35, tom: "A" },
  { id: "34", title: "Gratidão (Gratitude)", artist: "Bruna Olly", bpm: 156, timeSignature: "6/8", offset: 0.88, tom: "E" },
  { id: "35", title: "Toda Sorte de Bençãos", artist: "Davi Sacer", bpm: 140, timeSignature: "4/4", offset: 40.90, tom: "A" ,ocultarMetronomo: true},
  { id: "36", title: "Jesus Meu Primeiro Amor", artist: "Fernanda Brum", bpm: 138, timeSignature: "4/4", offset: 0.50, tom: "B" },
  { id: "37", title: "Majestoso Deus + Nada Vai Roubar Tua Glória", artist: "Davi Fernandes", bpm: 128, timeSignature: "4/4", offset: 0.70, tom: "A" , ocultarMetronomo: true
       },

];
