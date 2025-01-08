document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    const response = await fetch('https://nowadraco.github.io/pokedragonshadow.site/src/json_files/noticias.json'); // URL do arquivo JSON
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo de notícias.');
    }
    const jsonArray = await response.json();

    let links = jsonArray.map(item => item.link);

    if (!links || links.length === 0) {
      throw new Error('Nenhum link encontrado.');
    }

    // Função para extrair e converter datas dos links
    const extractDateFromLink = (link) => {
      const match = link.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
      console.log(`Ano: ${match[1]}, Dia: ${match[2]}, Mês: ${match[3]}, Hora: ${match[4]}, Minuto: ${match[5]}`); // Verificação
      return new Date(match[1], match[3] - 1, match[2], match[4], match[5]); // Ajustando a ordem
    };

    // Ordenar os links do mais recente para o mais antigo
    links = links.sort((a, b) => extractDateFromLink(b) - extractDateFromLink(a));

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
    const tag = tagElements[0].innerText; // Pega a primeira tag
    const secondImage = imageElements[1].src.replace(/^\.\.\/\.\.\//, '/pokedragonshadow.site');
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
