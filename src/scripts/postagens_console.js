document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    const response = await fetch('./src/noticias/');
    console.log('Buscando notícias em:', response.url);
    if (!response.ok) {
      throw new Error('Erro ao carregar o diretório de notícias.');
    }
    const text = await response.text();
    console.log('Conteúdo do diretório de notícias:', text);
    const sortedLinks = parseAndSortLinks(text);
    console.log('Links ordenados:', sortedLinks);

    // Postagens fixas
    await displayPost('./' + sortedLinks[0], '#ultimaPostagem');
    await displayPost('./' + sortedLinks[1], '#penultimaPostagem');
    await displayPost('./' + sortedLinks[2], '#terceiraUltimaPostagem');
    await displayPost('./' + sortedLinks[3], '#quartaUltimaPostagem');
    await displayPost('./' + sortedLinks[4], '#quintaUltimaPostagem');
    await displayPost('./' + sortedLinks[5], '#sextaUltimaPostagem');
    await displayPost('./' + sortedLinks[6], '#setimaUltimaPostagem');
    await displayPost('./' + sortedLinks[7], '#oitavaUltimaPostagem');
    await displayPost('./' + sortedLinks[8], '#nonaUltimaPostagem');

    // Postagens aleatórias
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * sortedLinks.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    console.log('Índices aleatórios selecionados:', randomIndices);

    await displayPost('./' + sortedLinks[randomIndices[0]], '#decimaUltimaPostagem');
    await displayPost('./' + sortedLinks[randomIndices[1]], '#decimaPrimeiraUltimaPostagem');
    const decimaSegundaPostagemIndex = randomIndices[2];
    const decimaSegundaPostagem = sortedLinks[decimaSegundaPostagemIndex] || sortedLinks[0];
    await displayPost('./' + decimaSegundaPostagem, '#decimaSegundaUltimaPostagem');

    // Adicionar uma postagem aleatória adicional
    const randomIndex = Math.floor(Math.random() * sortedLinks.length);
    console.log('Índice aleatório adicional:', randomIndex);
    await displayPost('./' + sortedLinks[randomIndex], '#postagemAleatoria');
  } catch (error) {
    console.error('Erro ao buscar os posts:', error);
  }
});

function parseAndSortLinks(text) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const links = [...doc.querySelectorAll('a')];
  console.log('Links extraídos:', links);

  return links
    .map(link => link.getAttribute('href'))
    .filter(href => href.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/))
    .sort((a, b) => {
      const aParts = a.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
      const bParts = b.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
      const aDate = new Date(aParts[0], aParts[2] - 1, aParts[1], aParts[3], aParts[4]);
      const bDate = new Date(bParts[0], bParts[2] - 1, bParts[1], bParts[3], bParts[4]);
      console.log('Comparando datas:', aDate, bDate);
      return bDate - aDate;
    });
}

async function displayPost(postLink, containerSelector) {
  try {
    const postResponse = await fetch(postLink);
    console.log('Buscando post em:', postResponse.url);
    if (!postResponse.ok) {
      throw new Error('Erro ao carregar o arquivo de post.');
    }
    const postText = await postResponse.text();
    console.log('Conteúdo do post:', postText);
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

    console.log('Post title:', title);
    console.log('Post tag:', tag);
    console.log('Second image:', secondImage);
    console.log('Second paragraph:', secondParagraph);
    console.log('Third paragraph:', thirdParagraph);

    const mainPageElement = document.createElement('div');
    mainPageElement.innerHTML = `
            <a href="${postLink}">
                <div class="tags">
                    <span class="tag-ref">${tag}</span>
                </div>
                <h2>${title}</h2>
                <img src="${secondImage}" alt="Post Image">
                <p>${secondParagraph}</p>
                <p>${thirdParagraph}</p>
            </a>
        `;

    const container = document.querySelector(containerSelector);
    if (container) {
      container.appendChild(mainPageElement);
      console.log('Container atualizado:', container);
    } else {
      console.error(`Elemento não encontrado: ${containerSelector}`);
    }
  } catch (error) {
    console.error('Erro ao buscar o post:', error);
  }
}
