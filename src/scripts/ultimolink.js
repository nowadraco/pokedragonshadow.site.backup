document.addEventListener('DOMContentLoaded', async (event) => {
    await updateLink('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/pagesGoRocket.json', 'a#ultimoPostGorocket');
    await updateLink('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/pagesReide.json', 'a#ultimoPostReide');
    await updateLink('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/pagesPesquisaDeCampo.json', 'a#ultimoPostpesquisas');
    await updateLink('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/pagesPvp.json', 'a#ultimoPostPvp');
});

async function updateLink(jsonFile, selector) {
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo ${jsonFile}`);
        }
        const jsonData = await response.json();
        const latestPost = jsonData[0].link; // Assume-se que há uma lista de objetos no JSON

        const linkElement = document.querySelector(selector);

        if (linkElement) {
            linkElement.setAttribute('href', latestPost);
        }
    } catch (error) {
        console.error(`Erro ao buscar os posts no arquivo ${jsonFile}:`, error);
    }
}
