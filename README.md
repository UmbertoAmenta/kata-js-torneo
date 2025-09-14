# kata-js-torneo

stack in uso: HTML, CSS, JavaScript Vanilla

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

## Esecuzione per console

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

### Fase 1 - 🔥 Scelta dell'Arma

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

### Fase 2 - 💪 Allenamento

Ogni combattente si allena per aumentare la propria potenza.
Per ognuno verrà generato un numero casuale tra 1 e 100 che rappresenta il moltiplicatore dato dall'allenamento.
-> **trainedFighters**

### Fase 3 - 🎯 Qualificazione

In fase di qualificazioni saranno esclusi dagli incontri tutti i combattenti la cui potenza è inferiore ai 2000 punti.
-> **qualifiedFighters**

### Fase 4 - ⚔️ Combattimento:

In questa fase se il numero di combattenti è dispari serve aggiungere un robot così che ognuno abbia un avversario.
Per rendere l'assegnazione del suo avversario casuale ho deciso di scegliere casualmente una posizione occupata dai combattenti e di posizionarvi il robot, facendo in modo che la posizione nell'array degli altri combattenti "slitti" di 1

A questo punto è necessario creare il tabellone stabilendo le coppie di avversari (in base al loro indice).
Infine, lo scontro vero e proprio con un confronto del potere raggiunto dai combattenti.

Per la creazione del tabellone ho scelto di creare un nuovo array contenente i dati relativi al singolo scontro, così da avere accesso diretto ad essi nel caso in cui dovessi implementare animazioni o statistiche. L'alternativa è quella di ottenere direttamente i vincitori degli scontri confrontando il **totalPower** dei combattenti con indice index e index+1 ogni index+2 elementi.
-> **matches**

### Fase 5 - 🏆 Premiazione:

Raccolta dei vincitori
-> **winners**
Selezione dei 3 combattenti più potenti, in ordine decrescente
-> **podium**

## Implementazione interfaccia grafica

### Decisione struttura

Ogni fase del torneo, a partire dalla preparazione (fase 0) avrà a disposizione l'intera viewport. Sarà possibile spostarsi da una fase all'altra tramite scroll

<!-- e bottoni. Un pulsante personalizzato in base alla fase in cui ci si trova permetterà la visualizzazione di dati secondari o avvierà animazioni, andando a modificare la schermata relativa alla fase in corso. -->

Implementazione delle immagini relative ai combattenti nella struttura dati **currentFighters**
-> **_getImageForFighter_**
e delle immagini relative alle armi in **availableWeapons**
-> **_getImageForWeapon_**
funzioni gestite su _image.js_

I combattenti saranno raffigurati come cards, le quali conterranno il nome e la potenza raggiunta dal singolo combattente e la sua immagine, all'hover sulla card appariranno sempre più dettagli (aggiornati) all'avanzare del torneo:

- potenza base del combattente
- nome, immagine e potenza arma
- qualità dell'allenamento (con relativa barra)
