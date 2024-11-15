let pokemonData = [];

const container = document.getElementById('pokemon-container');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let currentPage = 0;
const itemsPerPage = 100;

async function loadPokemonData() {
    try {
        const response = await fetch('/src/json_files/pok_selvagens.json');
        pokemonData = await response.json();
        displayPage(currentPage);
    } catch (error) {
        console.error('Erro ao carregar os dados do JSON:', error);
    }
}

function displayPage(page) {
    container.innerHTML = '';
    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = pokemonData.slice(start, end);

    pageData.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon');

        pokemonElement.innerHTML = `
            <img src="${pokemon.img}" alt="${pokemon.nome}">
            <h2>${pokemon.nome}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Tipo 1: ${pokemon.tipo1}</p>
            <p>Tipo 2: ${pokemon.tipo2}</p>
        `;

        container.appendChild(pokemonElement);
    });

    prevButton.disabled = page === 0;
    nextButton.disabled = end >= pokemonData.length;
}

prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayPage(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    if ((currentPage + 1) * itemsPerPage < pokemonData.length) {
        currentPage++;
        displayPage(currentPage);
    }
});

// Carregar a primeira página ao carregar
loadPokemonData();
