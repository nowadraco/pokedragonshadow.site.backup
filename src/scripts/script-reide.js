// Funções de suporte já definidas anteriormente
const cpms = [0.0939999967813491, /* ... lista completa de CPMs ... */, 0.860300004482269, 0.862803624012168, 0.865299999713897];

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

function calculateCP(baseStats, ivs, level) {
    const cpm = cpms[level - 1];
    const cp = Math.floor(((baseStats.atk + ivs.atk) * 
                           Math.sqrt(baseStats.def + ivs.def) * 
                           Math.sqrt(baseStats.hp + ivs.hp) * 
                           cpm ** 2) / 10);
    return cp;
}

function generatePokemonListItem(pokemon) {
    // Definir gradiente de cores com base nos tipos
    const typeColors = pokemon.tipos.map(tipo => getTypeColor(tipo));
    const gradientBackground = `linear-gradient(to right, ${typeColors.join(', ')})`;

    // Cálculo de CP para diferentes IVs e níveis
    const baseStats = pokemon.statusBase;
    const cpInfo = {
        normal: calculateCP(baseStats, { atk: 10, def: 10, hp: 10 }, 20),
        perfect: calculateCP(baseStats, { atk: 15, def: 15, hp: 15 }, 20)
    };
    const cpBoost = {
        normal: calculateCP(baseStats, { atk: 10, def: 10, hp: 10 }, 25),
        perfect: calculateCP(baseStats, { atk: 15, def: 15, hp: 15 }, 25)
    };

    // Gerar ícones de tipos
    const typeIcons = pokemon.tipos.map(tipo => 
        `<img src="${getTypeIcon(tipo)}" alt="${tipo}">`
    ).join('');

    // Gerar ícones de clima
    const weatherIcons = pokemon.tipos.map(tipo => 
        `<img class="clima-boost" src="${getWeatherIcon(tipo)}">`
    ).join('');

    return `<li class="Selvagem ${pokemon.tipos.map(t => t.toLowerCase()).join(' ')}" 
               style="background: ${gradientBackground};">
        <img class="imgSelvagem" src="${pokemon.img}" alt="${pokemon.nome}"> 
        ${pokemon.nome}
        <div class="tipo-icons">${typeIcons}</div>
        <div class="pc-info">PC: ${cpInfo.normal} - ${cpInfo.perfect}</div>
        <div class="boost">
            ${weatherIcons}
            <div class="pc-boost"> ${cpBoost.normal} - ${cpBoost.perfect}</div>
        </div>
    </li>`;
}

// Função para buscar e processar o JSON
async function fetchAndGeneratePokemonList() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/json_files/output.json');
        const pokemonList = await response.json();

        // Gerar lista de Pokémon
        const pokemonListHTML = pokemonList.map(pokemon => generatePokemonListItem(pokemon)).join('');

        // Criar elemento de lista
        const listElement = document.createElement('ul');
        listElement.className = 'selvagens pokemon-list';
        listElement.innerHTML = pokemonListHTML;

        // Adicionar à página (ou substitua pelo seletor correto)
        document.body.appendChild(listElement);

        return listElement;
    } catch (error) {
        console.error('Erro ao buscar ou processar o JSON:', error);
    }
}

// Executar a busca e geração quando o script for carregado
fetchAndGeneratePokemonList();