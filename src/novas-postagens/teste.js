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
        default: return '#FFFFFF';
    }
}

function criarElementoPokemon(pokemon, shinyPokemon) {
    const li = document.createElement('li');
    let classList = `Selvagem ${pokemon.tipo1.toLowerCase()}`;
    if (pokemon.tipo2) {
        classList += ` ${pokemon.tipo2.toLowerCase()}`;
    }
    li.className = classList;

    // Define a cor de fundo baseada nos tipos
    if (pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null') {
        li.style.background = `linear-gradient(to right, ${getTypeColor(pokemon.tipo1)}, ${getTypeColor(pokemon.tipo2)})`;
    } else {
        li.style.backgroundColor = getTypeColor(pokemon.tipo1);
    }

    const img = document.createElement('img');
    img.src = pokemon.img;
    img.alt = pokemon.nome;
    img.classList.add('imgSelvagem');

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
                // Adiciona transição de opacidade ao alternar as imagens
                img.style.transition = 'opacity 0.5s';
                img.style.opacity = 0; // Torna a imagem transparente
                setTimeout(() => {
                    img.src = showShiny ? shinyPokemon.img : pokemon.img;
                    img.style.opacity = 1; // Torna a imagem visível novamente
                    showShiny = !showShiny;
                }, 500); // Espera meio segundo para a transição de opacidade
            }, 2500); // Alterna a imagem a cada 2.5 segundos
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
