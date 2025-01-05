async function fetchAndSortJSON(url) {
    try {
        const response = await fetch(url);
        const jsonArray = await response.json();

        // Função para extrair a data do link
        function extractDate(link) {
            const match = link.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
            return match ? new Date(`${match[1]}-${match[3]}-${match[2]}T${match[4]}:${match[5]}:00`) : null;
        }

        // Função de comparação para ordenar por data (mais recente primeiro)
        function compareByDate(a, b) {
            const dateA = extractDate(a.link);
            const dateB = extractDate(b.link);
            return dateB - dateA;
        }

        // Ordenar o array
        jsonArray.sort(compareByDate);

        console.log(jsonArray);
    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
    }
}

// Chamar a função com a URL do seu arquivo JSON
fetchAndSortJSON('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/noticias.json');
