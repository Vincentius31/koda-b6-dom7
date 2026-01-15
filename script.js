const container = document.getElementById("characters");
const searchInput = document.getElementById("search");

let allCharacters = [];

async function loadAllCharacters() {
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await res.json();

    totalPages = data.info.pages;
    allCharacters = allCharacters.concat(data.results);

    page++;
  }

  renderCharacters(allCharacters);
}

function renderCharacters(data) {
  container.innerHTML = "";

  data.forEach(char => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = char.image;
    img.alt = char.name;

    const name = document.createElement("p");
    name.textContent = char.name;

    card.appendChild(img);
    card.appendChild(name);
    container.appendChild(card);
  });
}

loadAllCharacters();

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = allCharacters.filter(char =>
      char.name.toLowerCase().includes(keyword)
    );
    renderCharacters(filtered);
  });
}
