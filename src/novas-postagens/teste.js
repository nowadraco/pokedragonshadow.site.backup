async function carregarPokemons() {
    try {
        const response = await fetch('/src/json_files/pok_selvagens.json');
        const shinyResponse = await fetch('/src/json_files/pok_selvagens_shiny.json');
        const pokemons = await response.json();
        const shinyPokemons = await shinyResponse.json();
        return { pokemons, shinyPokemons };
    } catch (error) {
        console.error('Erro ao carregar o arquivo JSON:', error);
        return { pokemons: [], shinyPokemons: [] };
    }
}

function criarElementoPokemon(pokemon, shinyPokemon) {
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
    const nomeNormalizado = nome.replace('*', '').toLowerCase();
    return pokemons.find(pokemon => pokemon.nome.toLowerCase() === nomeNormalizado);
}

function buscarShinyPokemon(shinyPokemons, nome) {
    const nomeNormalizado = nome.replace('*', '').toLowerCase();
    return shinyPokemons.find(shiny => shiny.nome.toLowerCase() === nomeNormalizado);
}

function alternarImagens(pokemons, shinyPokemons) {
    const itens = document.querySelectorAll('#pokemon-list li');

    itens.forEach(item => {
        const nome = item.textContent.trim();
        const img = item.querySelector('img');
        const pokemon = buscarPokemon(pokemons, nome);
        const shinyPokemon = buscarShinyPokemon(shinyPokemons, nome);

        if (pokemon && shinyPokemon && nome.includes('*')) {
            let showShiny = false;
            setInterval(() => {
                img.src = showShiny ? shinyPokemon.img : pokemon.img;
                showShiny = !showShiny;
            }, 2000);
        }
    });
}

async function preencherLista() {
    const { pokemons, shinyPokemons } = await carregarPokemons();
    const lista = document.getElementById('pokemon-list');
    const itens = lista.querySelectorAll('li');

    itens.forEach(item => {
        const nome = item.textContent.trim();
        const pokemon = buscarPokemon(pokemons, nome);
        const shinyPokemon = buscarShinyPokemon(shinyPokemons, nome);

        if (pokemon) {
            const novoItem = criarElementoPokemon(pokemon, shinyPokemon);
            if (nome.includes('*')) {
                novoItem.lastChild.nodeValue = ` ${nome}`; // Mantém o nome com *
            }
            item.replaceWith(novoItem);
        } else {
            console.log(`Pokémon ${nome} não encontrado`);
        }
    });

    // Chamar a função para alternar imagens após preencher a lista
    alternarImagens(pokemons, shinyPokemons);
}

// Preencher a lista ao carregar a página
window.onload = preencherLista;
