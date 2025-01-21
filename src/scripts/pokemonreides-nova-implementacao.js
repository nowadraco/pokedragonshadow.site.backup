async function carregarPokemons() {
    try {
        const response = await fetch('../../../src/json_files/pok_reides_teste.json');
        const shinyResponse = await fetch('../../../src/json_files/pok_selvagens_shiny.json');
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
        case 'planta': return '#32CD32';
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
        case 'substitute': return '#000';
        default: return '#FFFFFF';
    }
}

function getWeatherIcon(tipo) {
    switch (tipo.toLowerCase()) {
        case 'planta':
        case 'fogo':
        case 'terra':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/ensolarado.png';
        case 'água':
        case 'elétrico':
        case 'inseto':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/chovendo.png';
        case 'normal':
        case 'pedra':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/parcialmente_nublado.png';
        case 'fada':
        case 'lutador':
        case 'venenoso':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/nublado.png';
        case 'voador':
        case 'dragão':
        case 'psíquico':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/ventando.png';
        case 'gelo':
        case 'aço':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/nevando.png';
        case 'sombrio':
        case 'fantasma':
            return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/c0997c494b393703889910d2a287f5533131d707/src/imagens/clima/neblina.png';
        default:
            return '';
    }
}

function getTypeIcon(tipo) {
    switch (tipo.toLowerCase()) {
        case 'aço': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/aco.png';
        case 'água': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/agua.png';
        case 'dragão': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/dragao.png';
        case 'elétrico': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/eletrico.png';
        case 'fada': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/fada.png';
        case 'fantasma': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/fantasma.png';
        case 'fogo': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/fogo.png';
        case 'gelo': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/gelo.png';
        case 'inseto': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/inseto.png';
        case 'lutador': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/lutador.png';
        case 'normal': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/normal.png';
        case 'pedra': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/pedra.png';
        case 'planta': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/planta.png';
        case 'psíquico': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/psiquico.png';
        case 'sombrio': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/sombrio.png';
        case 'terrestre': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/terrestre.png';
        case 'venenoso': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/venenoso.png';
        case 'voador': return 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/imagens/tipos/voador.png';
        default: return '';
    }
}

function criarElementoPokemon(pokemon, shinyPokemon) {
    const li = document.createElement('li');
    let classList = `Selvagem ${pokemon.tipo1.toLowerCase()}`;
    if (pokemon.tipo2) {
        classList += ` ${pokemon.tipo2.toLowerCase()}`;
    }
    li.className = classList;

    if (pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null') {
        li.style.background = `linear-gradient(to right, ${getTypeColor(pokemon.tipo1)}, ${getTypeColor(pokemon.tipo2)})`;
    } else {
        li.style.backgroundColor = getTypeColor(pokemon.tipo1);
    }

    const img = document.createElement('img');
    img.classList.add('imgSelvagem');
    img.src = pokemon.img;
    img.alt = pokemon.nome;
    
    const tipoIcons = document.createElement('div');
    tipoIcons.className = 'tipo-icons';
    
    const tipo1Icon = document.createElement('img');
    tipo1Icon.src = getTypeIcon(pokemon.tipo1);
    tipo1Icon.alt = pokemon.tipo1;
    tipoIcons.appendChild(tipo1Icon);

    if (pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null') {
        const tipo2Icon = document.createElement('img');
        tipo2Icon.src = getTypeIcon(pokemon.tipo2);
        tipo2Icon.alt = pokemon.tipo2;
        tipoIcons.appendChild(tipo2Icon);
    }

    const pcInfo = document.createElement('div');
    pcInfo.className = 'pc-info';
    pcInfo.textContent = `PC: ${pokemon.pc} `;

    const weatherIcons = document.createElement('div');
    weatherIcons.className = 'boost';

    const icon1 = document.createElement('img');
    icon1.className = 'clima-boost';
    icon1.src = getWeatherIcon(pokemon.tipo1);
    weatherIcons.appendChild(icon1);

    if (pokemon.tipo2 && pokemon.tipo2.toLowerCase() !== 'null') {
        const icon2 = document.createElement('img');
        icon2.className = 'clima-boost'
        icon2.src = getWeatherIcon(pokemon.tipo2);;
        weatherIcons.appendChild(icon2);
    }

    weatherIcons.insertAdjacentHTML('beforeend', `<div class="pc-boost"> ${pokemon.pc2}</div>`);

    li.appendChild(img);
    li.appendChild(document.createTextNode(` ${pokemon.nome}`));
    li.appendChild(tipoIcons);
    li.appendChild(pcInfo);
    li.appendChild(weatherIcons);

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
    const listas = document.querySelectorAll('.pokemon-list li');

    listas.forEach(item => {
        const nome = item.textContent.trim();
        const img = item.querySelector('img');
        const pokemon = buscarPokemon(pokemons, nome);
        const shinyPokemon = buscarShinyPokemon(shinyPokemons, nome);

        if (img && pokemon && shinyPokemon && nome.includes('*')) {
            let showShiny = false;
            setInterval(() => {
                img.style.transition = 'opacity 0.5s';
                img.style.opacity = 0;
                setTimeout(() => {
                    img.src = showShiny ? shinyPokemon.img : pokemon.img;
                    img.style.opacity = 1;
                    showShiny = !showShiny;
                }, 500);
            }, 2500);
        }
    });
}

async function preencherLista() {
    const { pokemons, shinyPokemons } = await carregarPokemons();
    const substitute = buscarPokemon(pokemons, 'substitute') || {
        nome: 'Substitute',
        tipo1: 'normal',
        img: './path/to/substitute-image.png',
        pc: 'N/A',
        pc2: 'N/A'
    };

    const listas = document.querySelectorAll('.pokemon-list');

    listas.forEach(lista => {
        const itens = lista.querySelectorAll('li');

        itens.forEach(item => {
            const nome = item.textContent.trim();
            let pokemon = buscarPokemon(pokemons, nome);
            let shinyPokemon = buscarShinyPokemon(shinyPokemons, nome);

            if (!pokemon) {
                pokemon = substitute;
            }

            const novoItem = criarElementoPokemon(pokemon, shinyPokemon);
            if (nome.includes('*')) {
                novoItem.lastChild.nodeValue = ` ${nome}`;
            }
            item.replaceWith(novoItem);
        });

        alternarImagens(pokemons, shinyPokemons);
    });
}

window.onload = preencherLista;
