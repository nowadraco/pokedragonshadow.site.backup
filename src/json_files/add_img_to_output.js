const fs = require('fs');
const path = require('path');

// Caminhos absolutos dos arquivos JSON (ajuste para seu caminho de projeto)
const pokSelvagensPath = path.join(__dirname, 'pok_selvagens.json');
const outputPath = path.join(__dirname, 'output.json');

// Leitura dos arquivos JSON
const pokSelvagensData = JSON.parse(fs.readFileSync(pokSelvagensPath));
const outputData = JSON.parse(fs.readFileSync(outputPath));

// Criação de um dicionário para mapear os nomes dos Pokémon às suas imagens
const imgMap = pokSelvagensData.reduce((acc, pokemon) => {
  acc[pokemon.nome] = pokemon.img;
  return acc;
}, {});

// Adição do parâmetro `img` ao arquivo `output.json`
outputData.forEach(pokemon => {
  if (imgMap[pokemon.nome]) {
    pokemon.img = imgMap[pokemon.nome];
  }
});

fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));
console.log('Imagens adicionadas com sucesso ao arquivo output.json!');
