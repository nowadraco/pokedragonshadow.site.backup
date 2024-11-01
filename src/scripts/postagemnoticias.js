const fetchPosts = async () => {
    const response = await fetch('/src/noticias');
    const postsHTML = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(postsHTML, 'text/html');
    const links = Array.from(htmlDoc.querySelectorAll('a')).map(a => a.href);

    return links.filter(link => link.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}.html$/));
};

const processPosts = async () => {
    const posts = await fetchPosts();
    
    posts.sort((a, b) => new Date(b.split('-').slice(0, 3).join('-')) - new Date(a.split('-').slice(0, 3).join('-')));

    const ids = ['ultimaPostagem', 'penultimaPostagem', 'antepenultimaPostagem'];

    posts.forEach((post, index) => {
        if (index >= ids.length) return;

        fetch(post)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const img = htmlDoc.querySelector('.coluna2-post img').src;
                const paragraphs = htmlDoc.querySelectorAll('.coluna2-post p');
                const firstParagraph = paragraphs[0].innerText;
                const secondParagraph = paragraphs[1].innerText;

                const container = document.getElementById(ids[index]);
                container.innerHTML = `
                    <a href="${post}">
                        <h2>${htmlDoc.title}</h2>
                        <img src="${img}" alt="Post Image">
                        <p>${firstParagraph}</p>
                        <p>${secondParagraph}</p>
                    </a>
                `;
            })
            .catch(error => console.error('Error:', error));
    });
};

processPosts();
