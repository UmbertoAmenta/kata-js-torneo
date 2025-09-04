# kata-js-torneo

Benvenuti al torneo più atteso di tutti i tempi,
il Torneo Boolkaichi!

Ai partecipanti (**fighters**) saranno assegnate casualmente delle armi (**weapons**) e verrà dato loro del tempo per allenarsi in vista delle qualificazioni. Solo chi supererà certe condizioni potrà accedere alla vera sfida. Infine, soltanto i migliori saliranno sul podio!

---

## Programma

### Fase 1 - 🔥 Scelta dell'Arma:

ogni combattente sceglierà casualmente un'arma dalla relativa lista. Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.

### Fase 2 - 💪 Allenamento:

ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, moltiplicandola per un numero casuale tra 1 e 100.

### Fase 3 - 🎯 Qualificazione:

sarà escluso dal torneo chi, dopo l'allenamento, non è riuscito a raggiungere una potenza di almeno 2000.

### Fase 4 - ⚔️ Combattimento:

i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta.
In ogni scontro vincerà il combattente con la potenza più alta. In caso di parità vincerà chi "gioca in casa", ossia chi viene prima nell'elenco.
Se il numero di combattenti sarà dispari, allora parteciperà un combattente "Robot" con potenza "4000".

### Fase 5 - 🏆 Premiazione:

tra tutti i vincitori degli scontri, saliranno sul podio i 3 combattenti con la potenza più alta, in ordine decrescente.

---

## Esecuzione

### Fase 0 - Preparazione del torneo

Dati di partenza:

- **fighters**: gli iscritti al torneo [{name, power}...]
- **weapons**: armi disponibili [{name, power}...]

Per non modificare i dati originali lavorerò su delle copie degli array forniti

- **registeredFighters**
- **availableWeapons**

Ragionando sulla struttura dati di _fighters_, che dovrà subire delle modifiche, ho pensato alle seguenti alternative:

1. {
   id: 1;
   name: "Vegeta";
   basePower: 10000;
   weaponName: "none";
   weaponPower: 0;
   trainingMultiplier: null;
   }
   <!-- totalPower: "(basePower + weaponPower) \* trainingMultiplier"; -->

Su un unico livello, facile da gestire e chiara, fin tanto che la lista di proprietà non cresce troppo

2. {
   fighter: {
   name: "Vegeta";
   power: 10000;
   }
   weapon: {
   name: "none";
   power: 0;
   }
   training: {
   multiplier: 99;
   }
   }
   <!-- totalPower: "(fighter.power + weapon.power) \* training.multiplier"; -->

Facile da leggere, anche se dovesse crescere ulteriormente. PIù scomoda da gestire a causa degli annidamenti

3. {
   name: "Vegeta";
   weapon: "none";
   growth: {
   fighterPow: 100;
   weaponPow: 15;
   trainingMultiplier: 1.2;
   }
   }
   <!-- totalPower: "(growth.fighterPow + growth.weaponPow) \* training.Mod"; -->

Struttura più compatta ma forse meno intuitiva in quanto nome e relativa potenze di combattente e arma si trovano su livelli differenti

Opterò per la n°2, la cui manipolazione sarà più verbosa ma che dovrebbe essere più "comoda" a lungo termine.

### Fase 1 - 🔥 Scelta dell'Arma:

Verrà modificata la loro struttura dati del singolo combattente in:
{ fighter: { name: "Vegeta", power: 10000 } }
-> **currentFighters**

Per garantire ad ogni combattente le stesse probabilità di ricevere le armi migliori, verranno riordinati casualmente.
-> **shuffledFighters**

Qualora fossero presenti meno armi rispetto ai combattenti verrà aggiunta l'arma
{ name: "bare hands", power: 0 }
fino ad eguagliare la lunghezza dei due array.

Ad ogni combattente sarà assegnata casualmente una delle armi (ogni arma può essere assegnata ad un solo combattente) per ottenere:
{
fighter: { name: "Vegeta", power: 10000 },
weapon: { name: "bare hand", power: 0 }
}
-> **armedFighters**
