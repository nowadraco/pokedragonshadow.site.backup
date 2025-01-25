// URL do arquivo JSON
const url = 'https://raw.githubusercontent.com/nowadraco/pokedragonshadow.site/refs/heads/main/src/json_files/output.json';

// Função para carregar a lista de Pokémon e preencher o dropdown
function loadPokemonList() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let selectElement = document.getElementById('pokemon-select');

            // Popula o menu suspenso com nomes de Pokémon
            data.forEach(pokemon => {
                let option = document.createElement('option');
                option.value = pokemon.nome; // Alterado para 'nome'
                option.text = pokemon.nome; // Alterado para 'nome'
                selectElement.appendChild(option);
            });

            // Adiciona um evento para alterar o Pokémon exibido quando uma nova opção é selecionada
            selectElement.addEventListener('change', (event) => {
                let selectedName = event.target.value;
                fetchPokemonDataByName(selectedName);
            });
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para buscar os dados do Pokémon pelo nome
function fetchPokemonDataByName(nome) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let selectedPokemon = data.find(pokemon => pokemon.nome === nome); // Alterado para 'nome'
            displayPokemon(selectedPokemon);
        })
        .catch(error => console.error('Erro ao buscar dados:', error));
}

// Função para exibir os dados do Pokémon selecionado
function displayPokemon(pokemon) {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = `
        <h2>${pokemon.nome} (#${pokemon.dex})</h2> <!-- Alterado para 'nome' -->
        ${pokemon.tipos && pokemon.tipos.length > 0 ? `<p>Tipos: ${pokemon.tipos.join(', ')}</p>` : ''} <!-- Alterado para 'tipos' -->
        ${pokemon.statusBase ? `<p>Status Base: ATK: ${pokemon.statusBase.atk}, DEF: ${pokemon.statusBase.def}, HP: ${pokemon.statusBase.hp}</p>` : ''} <!-- Alterado para 'statusBase' -->
        ${pokemon.fastMoves && pokemon.fastMoves.length > 0 ? `<p>Movimentos Rápidos: ${pokemon.fastMoves.join(', ')}</p>` : ''} <!-- Alterado para 'fastMoves' -->
        ${pokemon.chargedMoves && pokemon.chargedMoves.length > 0 ? `<p>Movimentos Carregados: ${pokemon.chargedMoves.join(', ')}</p>` : ''} <!-- Alterado para 'chargedMoves' -->
        ${pokemon.buddyDistancia ? `<p>Distância de Amigo: ${pokemon.buddyDistancia} km</p>` : ''} <!-- Alterado para 'buddyDistancia' -->
        ${pokemon.custoTerceiroMove ? `<p>Custo do Terceiro Movimento: ${pokemon.custoTerceiroMove} Stardust</p>` : ''} <!-- Alterado para 'custoTerceiroMove' -->
        ${pokemon.familia && pokemon.familia.evolucao && pokemon.familia.evolucao.length > 0 ? `<p>Evoluções da Família: ${pokemon.familia.evolucao.join(', ')}</p>` : ''} <!-- Alterado para 'familia.evolucao' -->
        ${pokemon.img ? `<img src="${pokemon.img}" alt="${pokemon.nome}">` : ''} <!-- Adicionada imagem -->
    `;
}

// Carrega a lista de Pokémon ao carregar a página
loadPokemonList();
