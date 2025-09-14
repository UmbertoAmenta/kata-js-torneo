export function createFighterCard(fighter) {
  const card = document.createElement("div");
  card.classList.add("fighter-card");

  card.innerHTML = `
    <div class="stats-heading">
      <span>${fighter.fighter.name}</span>
      <span>${fighter.totalPower ?? fighter.fighter.power}</span>
    </div>

    <div class="card-front">
      <img src="${fighter.fighter.image}" alt="${fighter.fighter.name}" />
    </div>

    <div class="card-data hidden">
      <div>
        <span>Base Power</span>
        <span>${fighter.fighter.power}</span>
      </div>

      ${
        fighter.weapon
          ? `<div class="weapon-slot">
              <div>${fighter.weapon.name}</div>
              <img src=${fighter.weapon.image} alt=${fighter.weapon.name} />
              <span>Power: ${fighter.weapon.power}</span>
            </div>`
          : ""
      }
${
  fighter.training
    ? `
    <div class="training">
      <span>Training: ${fighter.training ?? "-"}</span>
      <div style="width:${fighter.training}%"></div>
    </div>`
    : ""
}
    </div>
  `;
  return card;
}

export function renderFighters(fighters, selector) {
  const container = document.querySelector(selector);
  container.innerHTML = "";
  fighters.forEach((f) => container.appendChild(createFighterCard(f)));
}
