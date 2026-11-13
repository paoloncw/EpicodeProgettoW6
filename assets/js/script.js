// Atelier — Week Project Settimana VI
//
// Aggiungi qui il codice JavaScript se serve.
// Per la Versione Base spesso non serve niente: tutto si fa in HTML+SCSS.
// Per le versioni Intermedia e Avanzata: filtri lavori, toggle tema, validazione form.

const lavori = [
  { titolo: "Casa sul lago", anno: 2022, categoria: "residenziale" },
  { titolo: "Villa Aurora", anno: 2021, categoria: "residenziale" },
  { titolo: "Sede Nova", anno: 2023, categoria: "uffici" },
  { titolo: "Studio Legale Rossi", anno: 2020, categoria: "uffici" },
  { titolo: "Boutique Lume", anno: 2023, categoria: "negozi" },
  { titolo: "Caffè Centrale", anno: 2022, categoria: "negozi" },
];

const griglia = document.getElementById("griglia-lavori");
const filtri = document.getElementById("filtri");

function renderLavori(lista) {
  griglia.innerHTML = lista
    .map(
      (lavoro) => `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="lavoro-card">
            <div class="lavoro-img"></div>
            <div class="lavoro-info">
              <h3>${lavoro.titolo}</h3>
              <p>${lavoro.anno} · ${lavoro.categoria}</p>
            </div>
          </div>
        </div>
      `
    )
    .join("");
}

filtri.addEventListener("click", (event) => {
  const bottone = event.target.closest("button");
  if (!bottone) return;
  const categoria = bottone.dataset.categoria;
  filtri.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  bottone.classList.add("active");
  const filtrati =
    categoria === "tutti"
      ? lavori
      : lavori.filter((lavoro) => lavoro.categoria === categoria);
  renderLavori(filtrati);
});

document.getElementById("toggle-tema").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

renderLavori(lavori);
