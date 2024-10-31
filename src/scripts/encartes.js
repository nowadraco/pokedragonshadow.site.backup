document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        // Função para buscar o último arquivo criado na pasta src/noticias
        const response = await fetch('src/noticias/');
        if (!response.ok) {
            throw new Error('Erro ao carregar o diretório de notícias.');
        }
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = [...doc.querySelectorAll('a')];
        
        const sortedLinks = links
            .map(link => link.getAttribute('href'))
            .filter(href => href.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/))
            .sort((a, b) => new Date(b.replace(/-/g, ':').replace('.html', '')) - new Date(a.replace(/-/g, ':').replace('.html', '')));
        
        const latestPost = sortedLinks[0];
        console.log('Último post:', latestPost);

        const postResponse = await fetch(`./src/noticias/${latestPost}`);
        if (!postResponse.ok) {
            throw new Error('Erro ao carregar o arquivo de post.');
        }
        const postText = await postResponse.text();
        const postDoc = parser.parseFromString(postText, 'text/html');

        // Extrair o título, imagem e primeiro parágrafo
        const titleElement = postDoc.querySelector('h2');
        const imageElement = postDoc.querySelector('img');
        const paragraphElement = postDoc.querySelector('p');

        if (!titleElement || !imageElement || !paragraphElement) {
            throw new Error('Elemento esperado não encontrado no post.');
        }

        const title = titleElement.innerText;
        const firstImage = imageElement.src;
        const firstParagraph = paragraphElement.innerText;
        const postLink = `src/noticias/${latestPost}`;

        console.log('Processando post:', { title, firstImage, firstParagraph, postLink });

        // Criar o conteúdo para a página principal
        const mainPageElement = document.createElement('div');
        mainPageElement.innerHTML = `
            <div>
                <h2>${title}</h2>
                <img src="${firstImage}" alt="Post Image">
                <p>${firstParagraph}</p>
                <a href="${postLink}">Ler mais</a>
            </div>
        `;

        // Adicionar o conteúdo na página principal
        document.querySelector('#mainPage').appendChild(mainPageElement);
        console.log("Último post adicionado à página principal.");
    } catch (error) {
        console.error('Erro ao buscar o último post:', error);
    }
});
