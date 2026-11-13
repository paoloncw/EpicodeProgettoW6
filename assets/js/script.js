// Atelier — Week Project Settimana VI
//
// Aggiungi qui il codice JavaScript se serve.
// Per la Versione Base spesso non serve niente: tutto si fa in HTML+SCSS.
// Per le versioni Intermedia e Avanzata: filtri lavori, toggle tema, validazione form.

const lavori = [
  { id: 1, titolo: "Casa sul lago", anno: 2022, categoria: "residenziale", descrizione: "Una casa luminosa con grandi vetrate affacciate sull'acqua, pensata per vivere a stretto contatto con la natura." },
  { id: 2, titolo: "Villa Aurora", anno: 2021, categoria: "residenziale", descrizione: "Una villa su due piani con giardino interno, dove materiali naturali e luce calda creano ambienti accoglienti." },
  { id: 3, titolo: "Sede Nova", anno: 2023, categoria: "uffici", descrizione: "Uffici open space flessibili con zone per la concentrazione e aree comuni dedicate al lavoro di squadra." },
  { id: 4, titolo: "Studio Legale Rossi", anno: 2020, categoria: "uffici", descrizione: "Uno studio sobrio ed elegante, progettato per garantire riservatezza e un'atmosfera professionale." },
  { id: 5, titolo: "Boutique Lume", anno: 2023, categoria: "negozi", descrizione: "Un negozio di moda con un percorso espositivo guidato dalla luce, che mette in risalto ogni capo." },
  { id: 6, titolo: "Caffè Centrale", anno: 2022, categoria: "negozi", descrizione: "Un caffè storico rinnovato con arredi caldi e un bancone ampio, ideale per fermarsi a chiacchierare." },
];

const griglia = document.getElementById("griglia-lavori");
const filtri = document.getElementById("filtri");

function renderLavori(lista) {
  griglia.innerHTML = lista
    .map(
      (lavoro) => `
        <div class="col-12 col-sm-6 col-lg-4">
          <div class="lavoro-card" data-id="${lavoro.id}">
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

griglia.addEventListener("click", (event) => {
  const card = event.target.closest(".lavoro-card");
  if (!card) return;
  const lavoro = lavori.find((l) => l.id === Number(card.dataset.id));
  document.getElementById("modal-titolo").textContent = lavoro.titolo;
  document.getElementById("modal-meta").textContent = `${lavoro.anno} · ${lavoro.categoria}`;
  document.getElementById("modal-descrizione").textContent = lavoro.descrizione;
  bootstrap.Modal.getOrCreateInstance(document.getElementById("modal-lavoro")).show();
});

const formContatti = document.getElementById("form-contatti");
const esito = document.getElementById("esito-form");

function mostraEsito(tipo, testo) {
  esito.innerHTML = `
    <div class="alert alert-${tipo} mt-3" role="alert">${testo}</div>
  `;
}

formContatti.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const messaggio = document.getElementById("messaggio").value.trim();
  if (!email.includes("@")) {
    mostraEsito("danger", "Inserisci un'email valida (deve contenere @).");
    return;
  }
  if (messaggio.length < 20) {
    mostraEsito("danger", "Il messaggio deve avere almeno 20 caratteri.");
    return;
  }
  mostraEsito("success", "Grazie! Il tuo messaggio è stato inviato.");
  formContatti.reset();
});
