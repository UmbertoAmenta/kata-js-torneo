import { fighters, weapons } from "./database.js";

console.log("🐉 Che il torneo abbia inizio! 🐉");
console.log("");

// -------------------------------------------------
// FASE 0 - preparazione del torneo

// Iscrizioni al torneo
const registeredFighters = [...fighters];

// Armi a disposizione dei combattenti
const availableWeapons = [...weapons];

// Se le armi non bastano, aggiunge la possibilità di combattere a mani nude
while (availableWeapons.length < registeredFighters.length) {
  const noWeapon = { name: "bare hands", power: 0 };
  availableWeapons.push(noWeapon);
}

// DATI
// console.log("🤼 Combattenti iscritti", fighters);
// console.log("⚔️ Armi disponibili", weapons);

// ANNUNCI
const fightersNames = registeredFighters.map((f) => f.name);
const weaponsNames = availableWeapons.map((w) => w.name);

console.log(
  "Ecco a voi gli sfidanti..",
  fightersNames,
  "..e le armi a loro disposizione!",
  weaponsNames
);
console.log("");

// -------------------------------------------------
// FASE 1 - 🔥 Scelta dell'arma

console.log("🔥 Fase 1 - Scelta dell'arma");

// Modifica della struttura dati
const currentFighters = registeredFighters.map((f) => ({
  fighter: {
    name: f.name,
    power: f.power,
  },
}));

// Shuffle dei combattenti
function fisherYatesShuffle(array) {
  // Create a copy to avoid modifying the original
  const structuredArray = structuredClone(array);

  // Algoritmo di Fisher-Yates
  for (let i = structuredArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [structuredArray[i], structuredArray[j]] = [
      structuredArray[j],
      structuredArray[i],
    ];
  }

  return structuredArray;
}

const shuffledFighters = fisherYatesShuffle(currentFighters);

// Assegnazione casuale delle armi
const armedFighters = shuffledFighters.map((f) => {
  const randomWeaponId = Math.floor(Math.random() * availableWeapons.length);
  const selectedWeapon = availableWeapons[randomWeaponId];
  availableWeapons.splice(randomWeaponId, 1);

  return {
    ...f,
    weapon: selectedWeapon,
    totalPower: f.fighter.power + selectedWeapon.power,
  };
});

// DATI
// console.log("Combattenti armati", armedFighters);

// ANNUNCI
const armedFightersNames = armedFighters.map((f) => [
  f.fighter.name,
  f.weapon.name,
]);

console.log(
  "Curiosi di conoscere gli oggetti ottenuti dai combattenti?",
  armedFightersNames
);
console.log("");

// -------------------------------------------------
// FASE 2 - 💪 Allenamento

console.log("💪 Fase 2 - Allenamento");

// Generazione casuale del moltiplicatore dovuto all'allenamento
const trainedFighters = armedFighters.map((f) => {
  const powerMultiplier = Math.ceil(Math.random() * 100);

  return {
    ...f,
    totalPower: (f.fighter.power + f.weapon.power) * powerMultiplier,
    training: powerMultiplier,
  };
});

// DATI
// console.log("Allenamento completato", trainedFighters);

// ANNUNCI
console.log("Avranno usufruito tutti della stanza dello spirito e del tempo?");
console.log("");

// -------------------------------------------------
// FASE 3 - 🎯 Qualificazione:

console.log("🎯 FASE 3 - Qualificazione");

const qualifiedFighters = trainedFighters.filter((f) => f.totalPower >= 2000);

// DATI
// console.log(
//   "Ecco a voi i Guerrieri qualificati agli incontri!",
//   qualifiedFighters
// );

// ANNUNCI
const qualifiedFightersNames = qualifiedFighters.map((f) => f.fighter.name);

console.log("Chi avrà superato le qualificazioni?", qualifiedFightersNames);
console.log("");

// -------------------------------------------------
// FASE 4 - ⚔️ Combattimento

console.log("⚔️ Fase 4 - Combattimento");

const readyToFight = structuredClone(qualifiedFighters);

// Se numero di combattenti dispari viene aggiunto un robot per completare il tabellone finale
if (qualifiedFighters.length % 2 == 1) {
  const robotIndex = Math.floor(Math.random() * qualifiedFighters.length);
  const robot = {
    fighter: { name: "Red Ribbon Robot", power: 4000 },
    totalPower: 4000,
  };

  readyToFight.splice(robotIndex, 0, robot);

  // DATI
  // console.log(
  //   "Come da regolamento, un nuovo sfidante si aggiunge al tabellone affinchè tutti i partecipanti abbiano un avversario!!",
  //   readyToFight
  // );

  // ANNUNCI
  console.log(
    "Come da regolamento, un nuovo sfidante si aggiunge al tabellone affinchè tutti i partecipanti abbiano un avversario!!",
    "Diamo il benvenuto al Red Ribbon Robot e ringraziamo la Red Ribbon, sponsor ufficiale del torneo!!"
  );
}

// Tabellone finale scontri con coppie di combattenti e vincitore
const toClashes = structuredClone(readyToFight);
const matches = [];
let matchId = 1;

while (toClashes.length > 0) {
  const fighters = toClashes.splice(0, 2);
  const whoWon = (fighters) => {
    if (fighters[0].totalPower >= fighters[1].totalPower) {
      return fighters[0];
    } else {
      return fighters[1];
    }
  };
  const match = {
    idMatch: matchId++,
    fighters,
    winner: whoWon(fighters),
  };
  matches.push(match);
}

// DATI
// console.log(
//   "Ecco le coppie di sfidanti e i vincitori degli incontri!!",
//   matches
// );

// ANNUNCI
const matchesNames = matches.map((m) => {
  return `${m.fighters[0].fighter.name} VS ${m.fighters[1].fighter.name}`;
});
const matchesWinnersNames = matches.map((match) => match.winner.fighter.name);

console.log("Ecco a voi le coppie di sfidanti!!", matchesNames);
console.log(
  "Gli incontri sono stati vinti rispettivamente da:",
  matchesWinnersNames
);
console.log("");

// -------------------------------------------------
// FASE 5 - 🏆 Premiazione

console.log("🏆 Fase 5 - Premiazione");

const winners = matches.map((match) => match.winner);

const podium = winners
  .sort((a, b) => b.totalPower - a.totalPower)
  .filter((winner, index) => index <= 2);

// console.log(winners);

// DATI
console.log("Ecco a voi i vincitori!!", podium);

// ANNUNCI
console.log(
  `Al terzo posto ${podium[2].fighter.name} preceduto da ${podium[1].fighter.name}. In testa alla classifica, il torneo BoolKaichi viene vinto da... ${podium[0].fighter.name} con un livello di potenza pari a ${podium[0].totalPower}!!`
);
