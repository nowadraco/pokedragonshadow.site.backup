// Função para limpar o cache
const clearCache = () => {
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach(name => {
                caches.delete(name);
            });
        });
    }
};

// Função para definir o intervalo de tempo para limpar o cache
const setCacheClearingIntervals = () => {
    const hours = [11, 12, 13]; // Horários em que deseja limpar o cache

    hours.forEach(hour => {
        const now = new Date();
        const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, 0, 0, 0);
        const delay = targetTime.getTime() - now.getTime();

        if (delay >= 0) {
            setTimeout(() => {
                clearCache();
                console.log(`Cache limpo às ${hour}:00`);
            }, delay);
        }
    });
};

setCacheClearingIntervals();

const fetchPosts = async () => {
    const response = await fetch('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/noticias.json'); // URL do arquivo JSON
    if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo de notícias.');
    }
    const jsonArray = await response.json();
    const links = jsonArray.map(item => item.link);

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
