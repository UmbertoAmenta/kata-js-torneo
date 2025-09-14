export const fasesConfig = [
  {
    title: "Iscrizioni al torneo",
    prevDisabled: true,
    progress: 0,
  },
  {
    title: "Scelta dell'arma",
    prevDisabled: false,
    progress: 20,
  },
  {
    title: "Allenamento",
    prevDisabled: false,
    progress: 40,
  },
  {
    title: "Qualificazione",
    prevDisabled: false,
    progress: 60,
  },
  {
    title: "Combattimento",
    prevDisabled: false,
    progress: 80,
  },
  {
    title: "Premiazione",
    prevDisabled: false,
    nextDisabled: true,
    progress: 100,
  },
];

export function initLayout(fasesConfig) {
  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    const config = fasesConfig[index] || {};

    // Creazione header
    const headerHTML = `<div class="section-header">${
      config.title || ""
    }</div>`;

    // Creazione .card-list
    const containerHTML = `<div class="card-list"></div>`;

    // Creazione nav
    const navHTML = `
      <nav>
        <div class="controls">
          <button type="button" ${config.prevDisabled ? "disabled" : ""}>
            ${config.prevText || "⬅️"}
          </button>
          <button type="button">
            ${config.customText || "Testo personalizzato"}
          </button>
          <button type="button" ${config.nextDisabled ? "disabled" : ""}>
            ${config.nextText || "➡️"}
          </button>
        </div>
        <div class="progress-bar"></div>
      </nav>
    `;

    // appendo tutto alla sezione
    section.innerHTML = headerHTML + containerHTML + navHTML;
  });
}
