document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    const response = await fetch('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/noticias.json'); // URL do arquivo JSON
    console.log('Buscando notícias em:', response.url);
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo de notícias.');
    }
    const jsonArray = await response.json();
    console.log('JSON carregado:', jsonArray);

    const links = jsonArray.map(item => item.link);
    console.log('Links extraídos:', links);

    if (!links || links.length === 0) {
      throw new Error('Nenhum link encontrado.');
    }

    // Postagens fixas
    await displayPost(links[0], '#ultimaPostagem');
    await displayPost(links[1], '#penultimaPostagem');
    await displayPost(links[2], '#terceiraUltimaPostagem');
    await displayPost(links[3], '#quartaUltimaPostagem');
    await displayPost(links[4], '#quintaUltimaPostagem');
    await displayPost(links[5], '#sextaUltimaPostagem');
    await displayPost(links[6], '#setimaUltimaPostagem');
    await displayPost(links[7], '#oitavaUltimaPostagem');
    await displayPost(links[8], '#nonaUltimaPostagem');

    // Postagens aleatórias
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * links.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    await displayPost(links[randomIndices[0]], '#decimaUltimaPostagem');
    await displayPost(links[randomIndices[1]], '#decimaPrimeiraUltimaPostagem');
    const decimaSegundaPostagemIndex = randomIndices[2];
    const decimaSegundaPostagem = links[decimaSegundaPostagemIndex] || links[0];
    await displayPost(decimaSegundaPostagem, '#decimaSegundaUltimaPostagem');

    // Adicionar uma postagem aleatória adicional
    const randomIndex = Math.floor(Math.random() * links.length);
    await displayPost(links[randomIndex], '#postagemAleatoria');
  } catch (error) {
    console.error('Erro ao buscar os posts:', error);
  }
});

async function displayPost(postLink, containerSelector) {
  try {
    console.log('Exibindo post:', postLink);

    const postResponse = await fetch(postLink);
    console.log('Buscando post em:', postResponse.url);
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
    const tag = tagElements[0].innerText; // Pega a primeira tag
    const secondImage = imageElements[1].src;
    const secondParagraph = paragraphElements[1].innerText;
    const thirdParagraph = paragraphElements[2].innerText;

    const mainPageElement = document.createElement('div');
    mainPageElement.innerHTML = `
      <a href="${postLink}">
        <div class="tags">
          <span class="tag-ref">${tag}</span>
        </div>
        <h2>${title}</h2>
        <img src="${secondImage}" alt="Post Image" class="post-image">
        <p>${secondParagraph}</p>
        <p>${thirdParagraph}</p>
      </a>
    `;

    const container = document.querySelector(containerSelector);
    if (container) {
      container.appendChild(mainPageElement);
    } else {
      console.error(`Elemento não encontrado: ${containerSelector}`);
    }
  } catch (error) {
    console.error('Erro ao buscar o post:', error);
  }
}
