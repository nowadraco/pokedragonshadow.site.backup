const fetchPosts = async () => {
    const response = await fetch('/src/noticias');
    const postsHTML = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(postsHTML, 'text/html');
    const links = Array.from(htmlDoc.querySelectorAll('a')).map(a => a.href);

    return links.filter(link => link.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}.html$/))
                .sort((a, b) => {
                    const aParts = a.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
                    const bParts = b.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
                    const aDate = new Date(aParts[0], aParts[2] - 1, aParts[1], aParts[3], aParts[4]);
                    const bDate = new Date(bParts[0], bParts[2] - 1, bParts[1], bParts[3], bParts[4]);
                    return bDate - aDate;
                });
};

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

const processPosts = async () => {
    const posts = await fetchPosts();
    const ids = ['ultimaPostagem', 'penultimaPostagem', 'antepenultimaPostagem'];

    posts.forEach((post, index) => {
        if (index >= ids.length) return;
        processPost(post, index, ids);
    });

    processRandomPost(posts);
};

processPosts();
