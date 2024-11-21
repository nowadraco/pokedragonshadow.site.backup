async function carregarPokemons() {
    try {
        const response = await fetch('/src/json_files/pok_selvagens.json');
        const pokemons = await response.json();
        return pokemons;
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return [];
    }
}

function criarElementoPokemon(pokemon) {
    const li = document.createElement('li');

    // Adiciona o tipo1 e, se existir, o tipo2
    let classList = `Selvagem ${pokemon.tipo1.toLowerCase()}`;
    if (pokemon.tipo2) {
        classList += ` ${pokemon.tipo2.toLowerCase()}`;
    }
    li.className = classList;

    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = pokemon.nome;

    li.appendChild(img);
    li.appendChild(document.createTextNode(` ${pokemon.nome}`));

    return li;
}

function buscarPokemon(pokemons, nome) {
    return pokemons.find(pokemon => pokemon.nome.toLowerCase() === nome.toLowerCase());
}

async function preencherLista() {
    const pokemons = await carregarPokemons();
    const lista = document.getElementById('pokemon-list');
    const itens = lista.querySelectorAll('li');

    itens.forEach(item => {
        const nome = item.textContent.trim();
        const pokemon = buscarPokemon(pokemons, nome);
        if (pokemon) {
            const novoItem = criarElementoPokemon(pokemon);
            lista.replaceChild(novoItem, item);
        } else {
            console.log(`Pokémon ${nome} não encontrado`);
        }
    });
}

// Preencher a lista ao carregar a página
window.onload = preencherLista;
