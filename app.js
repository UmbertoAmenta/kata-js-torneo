import { fighters, weapons } from "./database.js";

console.log("🐉 Che inizi il torneo! 🐉");
// -------------------------------------------------
// FASE 0 - preparazione del torneo

// Iscrizioni al torneo
console.log("🤼 Combattenti iscritti", fighters);
const registeredFighters = [...fighters];

// Armi a disposizione dei combattenti
const availableWeapons = [...weapons];

// -------------------------------------------------
// FASE 1 - 🔥 Scelta dell'arma

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

// Se le armi non bastano, aggiunge la possibilità di combattere a mani nude
while (availableWeapons.length < shuffledFighters.length) {
  const noWeapon = { name: "bare hands", power: 0 };
  availableWeapons.push(noWeapon);
}
console.log("⚔️ Armi disponibili", weapons);

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

// Combattenti armati
console.log("🔥 Fase 1 - Scelta dell'arma");
console.log("Combattenti armati:", armedFighters);

// -------------------------------------------------
// FASE 2 - 💪 Allenamento

const trainedFighters = armedFighters.map((f) => {
  const powerMultiplier = Math.ceil(Math.random() * 100);

  return {
    ...f,
    totalPower: (f.fighter.power + f.weapon.power) * powerMultiplier,
    training: powerMultiplier,
  };
});

console.log("💪 Fase 2 - Allenamento");
console.log("Allenamento completato:", trainedFighters);

// -------------------------------------------------
// FASE 3 - 🎯 Qualificazione:

const qualifiedFighters = trainedFighters.filter((f) => f.totalPower >= 2000);

console.log("🎯 FASE 3 - Qualificazione");

console.log(
  "Ecco a voi i Guerrieri qualificati agli incontri!:",
  qualifiedFighters
);
