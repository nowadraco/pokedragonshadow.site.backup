// Função para buscar os links das postagens
const fetchPosts = async () => {
    const response = await fetch('/src/noticias');
    const postsHTML = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(postsHTML, 'text/html');
    const links = Array.from(htmlDoc.querySelectorAll('a')).map(a => a.href);

    return links.filter(link => link.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}.html$/));
};

// Função para ordenar os posts da mais nova para a mais antiga
const sortPosts = (posts) => {
    return posts.sort((a, b) => new Date(b.split('-').slice(0, 3).join('-')) - new Date(a.split('-').slice(0, 3).join('-')));
};

// Função para processar cada post individualmente
const processPost = (post, index, ids) => {
    fetch(post)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const title = htmlDoc.querySelector('.titulo-post').innerText;
            const img = htmlDoc.querySelector('.imagem-post').src;
            const paragraphs = htmlDoc.querySelectorAll('.conteudo-post p');
            const firstParagraph = paragraphs[0].innerText;
            const secondParagraph = paragraphs[1].innerText;

            const container = document.getElementById(ids[index]);
            
            if (container) {
                container.innerHTML = `
                    <a href="${post}">
                        <h2>${title}</h2>
                        <img src="${img}" alt="Post Image">
                        <p>${firstParagraph}</p>
                        <p>${secondParagraph}</p>
                    </a>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
};

// Função para processar uma postagem aleatória
const processRandomPost = (posts) => {
    const randomIndex = Math.floor(Math.random() * posts.length);
    const post = posts[randomIndex];

    fetch(post)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const title = htmlDoc.querySelector('.titulo-post').innerText;
            const img = htmlDoc.querySelector('.imagem-post').src;
            const paragraphs = htmlDoc.querySelectorAll('.conteudo-post p');
            const firstParagraph = paragraphs[0].innerText;
            const secondParagraph = paragraphs[1].innerText;

            const container = document.getElementById('postagemAleatoria');
            
            if (container) {
                container.innerHTML = `
                    <a href="${post}">
                        <h2>${title}</h2>
                        <img src="${img}" alt="Post Image">
                        <p>${firstParagraph}</p>
                        <p>${secondParagraph}</p>
                    </a>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
};

// Função principal para buscar e processar os posts
const processPosts = async () => {
    const posts = await fetchPosts();
    const sortedPosts = sortPosts(posts);
    const ids = ['ultimaPostagem', 'penultimaPostagem', 'antepenultimaPostagem'];

    sortedPosts.forEach((post, index) => {
        if (index >= ids.length) return;
        processPost(post, index, ids);
    });

    processRandomPost(posts);
};

processPosts();
