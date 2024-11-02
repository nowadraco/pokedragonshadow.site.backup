document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const response = await fetch('src/noticias/');
        if (!response.ok) {
            throw new Error('Erro ao carregar o diretório de notícias.');
        }
        const text = await response.text();
        const sortedLinks = parseAndSortLinks(text);

        await displayPost(sortedLinks[0], '#ultimaPostagem');
        await displayPost(sortedLinks[1], '#penultimaPostagem');
        await displayPost(sortedLinks[2], '#terceiraUltimaPostagem');
        await displayPost(sortedLinks[3], '#quartaUltimaPostagem');
        await displayPost(sortedLinks[4], '#quintaUltimaPostagem');
        await displayPost(sortedLinks[5], '#sextaUltimaPostagem');
        await displayPost(sortedLinks[6], '#setimaUltimaPostagem');
        await displayPost(sortedLinks[7], '#oitavaUltimaPostagem');
        await displayPost(sortedLinks[8], '#nonaUltimaPostagem');
        await displayPost(sortedLinks[9], '#decimaUltimaPostagem');
        await displayPost(sortedLinks[10], '#decimaPrimeiraUltimaPostagem');
        const decimaSegundaPostagem = sortedLinks[11] || sortedLinks[0];
        await displayPost(decimaSegundaPostagem, '#decimaSegundaUltimaPostagem');

        const randomIndex = Math.floor(Math.random() * sortedLinks.length);
        await displayPost(sortedLinks[randomIndex], '#postagemAleatoria');
    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
    }
});

function parseAndSortLinks(text) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = [...doc.querySelectorAll('a')];

    return links
        .map(link => link.getAttribute('href'))
        .filter(href => href.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/))
        .sort((a, b) => {
            const aParts = a.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
            const bParts = b.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
            const aDate = new Date(aParts[0], aParts[2] - 1, aParts[1], aParts[3], aParts[4]);
            const bDate = new Date(bParts[0], bParts[2] - 1, bParts[1], bParts[3], bParts[4]);
            return bDate - aDate;
        });
}

async function displayPost(postLink, containerSelector) {
    try {
        const postResponse = await fetch(postLink);
        if (!postResponse.ok) {
            throw new Error('Erro ao carregar o arquivo de post.');
        }
        const postText = await postResponse.text();
        const postDoc = new DOMParser().parseFromString(postText, 'text/html');

        const titleElement = postDoc.querySelector('.titulo-post');
        const imageElement = postDoc.querySelector('img');
        const paragraphElements = postDoc.querySelectorAll('p');

        if (!titleElement || !imageElement || paragraphElements.length < 2) {
            throw new Error('Elemento esperado não encontrado no post.');
        }

        const title = titleElement.innerText;
        const firstImage = imageElement.src;
        const firstParagraph = paragraphElements[0].innerText;
        const secondParagraph = paragraphElements[1].innerText;

        const mainPageElement = document.createElement('div');
        mainPageElement.innerHTML = `
            <a href="${postLink}">
                <h2>${title}</h2>
                <img src="${firstImage}" alt="Post Image">
                <p>${firstParagraph}</p>
                <p>${secondParagraph}</p>
            </a>
        `;

        document.querySelector(containerSelector).appendChild(mainPageElement);
    } catch (error) {
        console.error('Erro ao buscar o post:', error);
    }
}
