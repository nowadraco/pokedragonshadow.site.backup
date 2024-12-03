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

        // Adiciona cores de background baseadas nos tipos
        if (pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null') {
            // Combina duas cores para dois tipos
            pokemonElement.style.setProperty('--tipo1-color', getTypeColor(pokemon.tipo1));
            pokemonElement.style.setProperty('--tipo2-color', getTypeColor(pokemon.tipo2));
            pokemonElement.classList.add('combinacao');
        } else {
            // Usa uma única cor para um tipo
            pokemonElement.style.backgroundColor = getTypeColor(pokemon.tipo1);
        }

        pokemonElement.innerHTML = `
            <img src="${pokemon.img}" alt="${pokemon.nome}">
            <h2>${pokemon.nome}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Tipo 1: ${pokemon.tipo1}</p>
            ${pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null' ? `<p>Tipo 2: ${pokemon.tipo2}</p>` : ''}
        `;

        container.appendChild(pokemonElement);
    });

    prevButton.disabled = page === 0;
    nextButton.disabled = end >= pokemonData.length;
}

// Função para obter a cor do tipo
function getTypeColor(tipo) {
    switch (tipo.toLowerCase()) {
        case 'normal': return '#A8A77A';
        case 'fogo': return '#FF4500';
        case 'água': return '#1E90FF';
        case 'elétrico': return '#F7D02C';
        case 'grama': return '#32CD32';
        case 'gelo': return '#96D9D6';
        case 'lutador': return '#C22E28';
        case 'venenoso': return '#A33EA1';
        case 'terrestre': return '#E2BF65';
        case 'voador': return '#A98FF3';
        case 'psíquico': return '#F95587';
        case 'inseto': return '#A6B91A';
        case 'pedra': return '#B6A136';
        case 'fantasma': return '#735797';
        case 'dragão': return '#6F35FC';
        case 'sombrio': return '#705746';
        case 'aço': return '#B7B7CE';
        case 'fada': return '#D685AD';
        default: return '#FFFFFF'; // Cor padrão
    }
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
