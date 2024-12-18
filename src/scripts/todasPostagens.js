document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        const response = await fetch('/src/noticias/');
        if (!response.ok) {
            throw new Error('Erro ao carregar o diretório de notícias.');
        }
        const text = await response.text();
        const sortedLinks = parseAndSortLinks(text);

        let currentPage = 0;
        const postsPerPage = 6;

        function displayCurrentPage() {
            const start = currentPage * postsPerPage;
            const end = start + postsPerPage;
            const postsToDisplay = sortedLinks.slice(start, end);

            const mainContainer = document.querySelector('main');
            if (!mainContainer) {
                console.error('Elemento não encontrado: main');
                return;
            }

            mainContainer.innerHTML = ''; // Limpar postagens anteriores

            postsToDisplay.forEach(async (postLink) => {
                await displayPost(postLink, mainContainer);
            });

            // Adicionar botões de navegação dentro do mainContainer
            addNavigationButtons(mainContainer);
        }
        // Inicializar a primeira página
        displayCurrentPage();
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

async function displayPost(postLink, container) {
    try {
        const postResponse = await fetch(postLink);
        if (!postResponse.ok) {
            throw new Error('Erro ao carregar o arquivo de post.');
        }
        const postText = await postResponse.text();
        const postDoc = new DOMParser().parseFromString(postText, 'text/html');

        const titleElement = postDoc.querySelector('.titulo-post');
        const imageElements = postDoc.querySelectorAll('img');
        const paragraphElements = postDoc.querySelectorAll('p');
        const tagElements = postDoc.querySelectorAll('.tag');

        if (!titleElement || imageElements.length < 2 || paragraphElements.length < 3 || tagElements.length < 1) {
            throw new Error('Elemento esperado não encontrado no post.');
        }

        const title = titleElement.innerText;
        const tag = tagElements[0].innerText;
        const secondImage = imageElements[1].src;
        const secondParagraph = paragraphElements[1].innerText;
        const thirdParagraph = paragraphElements[2].innerText;

        const mainPageElement = document.createElement('div');
        mainPageElement.className = 'post';
        mainPageElement.innerHTML = `
            <a href="${postLink}">
                <div class="tags">
                    <span class="tag-ref">${tag}</span>
                </div>
                <div class="post-content">
                    <img src="${secondImage}" alt="Post Image">
                    <div class="text-content">
                        <h2>${title}</h2>
                        <p>${secondParagraph}</p>
                        <p>${thirdParagraph}</p>
                    </div>
                </div>
            </a>
        `;

        if (container instanceof HTMLElement) {
            container.appendChild(mainPageElement);
        } else {
            console.error('Elemento não encontrado: ', container);
        }
    } catch (error) {
        console.error('Erro ao buscar o post:', error);
    }
}

function addNavigationButtons(container) {
    // Verificar se já existe um conjunto de botões de navegação e removê-los
    const existingNavigation = container.querySelector('.navigation');
    if (existingNavigation) {
        container.removeChild(existingNavigation);
    }

    // Criar novo conjunto de botões de navegação
    const navigation = document.createElement('div');
    navigation.className = 'navigation';
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Anterior';
    prevButton.onclick = () => {
        if (currentPage > 0) {
            currentPage--;
            displayCurrentPage();
        }
    };
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próximo';
    nextButton.onclick = () => {
        if ((currentPage + 1) * postsPerPage < sortedLinks.length) {
            currentPage++;
            displayCurrentPage();
        }
    };
    navigation.appendChild(prevButton);
    navigation.appendChild(nextButton);
    container.appendChild(navigation);
}
