document.addEventListener('DOMContentLoaded', async (event) => {
    await updateLink('src/paginas/gorocket/', 'a#ultimoPostGorocket');
    await updateLink('src/paginas/reides/', 'a#ultimoPostReide');
    await updateLink('src/paginas/pesquisa-de-campo/', 'a#ultimoPostpesquisas');
    await updateLink('src/paginas/pvp/', 'a#ultimoPostPvp');
});

async function updateLink(directory, selector) {
    try {
        const response = await fetch(directory);
        if (!response.ok) {
            throw new Error(`Erro ao carregar o diretório de ${directory}`);
        }
        const text = await response.text();
        const sortedLinks = parseAndSortLinks(text);

        const latestPost = sortedLinks[0];
        const linkElement = document.querySelector(selector);

        if (linkElement) {
            linkElement.setAttribute('href', `${latestPost}`);
        }
    } catch (error) {
        console.error(`Erro ao buscar os posts em ${directory}:`, error);
    }
}

function parseAndSortLinks(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = [...doc.querySelectorAll('a')];

    return links
    .map(link => `./${link.getAttribute('href')}`)
    .filter(href => href.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/))
    .sort((a, b) => {
        const aParts = a.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
        const bParts = b.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
        const aDate = new Date(aParts[0], aParts[2] - 1, aParts[1], aParts[3], aParts[4]);
        const bDate = new Date(bParts[0], bParts[2] - 1, bParts[1], bParts[3], bParts[4]);
        return bDate - aDate;
    });
}
