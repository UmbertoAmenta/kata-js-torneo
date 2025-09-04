import { fighters, weapons } from "./database.js";

console.warn("Che inizi il torneo!");

// Iscrizioni al torneo
console.log("Combattenti iscritti", fighters);
const currentFighters = [...fighters];

// Armi a disposizione dei combattenti
console.log("Armi disponibili", weapons);
const availableWeapons = [...weapons];
