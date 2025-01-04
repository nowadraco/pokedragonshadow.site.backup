document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    console.log('DOM fully loaded and parsed');
    const response = await fetch('./src/json_files/noticias.json');
    console.log('Buscando notícias em:', response.url);
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo de notícias.');
    }
    const jsonData = await response.json();
    console.log('Dados JSON recebidos:', jsonData);
    
    // Extrair os links e colocar em uma lista
    const links = jsonData.map(item => item.link);
    console.log('Links extraídos:', links);

    // Chamar a função para processar e exibir os links
    const sortedLinks = parseAndSortLinks(links);
    console.log('Links ordenados:', sortedLinks);

    if (sortedLinks.length > 0) {
      console.log('Iniciando exibição das postagens fixas');
      await displayPosts(sortedLinks);
    } else {
      throw new Error('Nenhum link de notícia encontrado no JSON.');
    }
  } catch (error) {
    console.error('Erro ao buscar os posts:', error);
  }
});

function parseAndSortLinks(links) {
  console.log('Iniciando filtro e ordenação dos links');
  const fixedPart = 'https://nowadraco.github.io/pokedragonshadow.site/src/noticias/';
  const validLinks = links.filter(link => {
    const isValid = link.startsWith(fixedPart) && link.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/);
    console.log('Validando link:', link, '->', isValid);
    return isValid;
  });

  console.log('Links válidos após filtragem:', validLinks);

  const linksWithDateParts = validLinks.map(link => {
    const datePart = link.replace(fixedPart, '');
    console.log('Removendo parte fixa do link:', link, '->', datePart);
    return { link, datePart };
  });

  console.log('Links com partes de data:', linksWithDateParts);

  const sortedLinks = linksWithDateParts.sort((a, b) => {
    const aParts = a.datePart.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
    const bParts = b.datePart.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/).slice(1);
    const aDate = new Date(aParts[0], aParts[1] - 1, aParts[2], aParts[3], aParts[4]);
    const bDate = new Date(bParts[0], bParts[1] - 1, bParts[2], bParts[3], bParts[4]);
    console.log('Comparando datas:', aDate, bDate);
    return bDate - aDate;
  });

  console.log('Links ordenados por data:', sortedLinks);

  return sortedLinks.map(item => item.link);
}

async function displayPosts(sortedLinks) {
  console.log('Exibindo postagens fixas e aleatórias');
  // Postagens fixas
  await displayPost(sortedLinks[0], '#ultimaPostagem');
  await displayPost(sortedLinks[1], '#penultimaPostagem');
  await displayPost(sortedLinks[2], '#terceiraUltimaPostagem');
  await displayPost(sortedLinks[3], '#quartaUltimaPostagem');
  await displayPost(sortedLinks[4], '#quintaUltimaPostagem');
  await displayPost(sortedLinks[5], '#sextaUltimaPostagem');
  await displayPost(sortedLinks[6], '#setimaUltimaPostagem');
  await displayPost(sortedLinks[7], '#oitavaUltimaPostagem');
  await displayPost(sortedLinks[8], '#nonaUltimaPostagem');

  // Postagens aleatórias
  const randomIndices = [];
  while (randomIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * sortedLinks.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  await displayPost(sortedLinks[randomIndices[0]], '#decimaUltimaPostagem');
  await displayPost(sortedLinks[randomIndices[1]], '#decimaPrimeiraUltimaPostagem');
  const decimaSegundaPostagemIndex = randomIndices[2];
  const decimaSegundaPostagem = sortedLinks[decimaSegundaPostagemIndex] || sortedLinks[0];
  await displayPost(decimaSegundaPostagem, '#decimaSegundaUltimaPostagem');

  // Adicionar uma postagem aleatória adicional
  const randomIndex = Math.floor(Math.random() * sortedLinks.length);
  await displayPost(sortedLinks[randomIndex], '#postagemAleatoria');
}

async function displayPost(postLink, containerSelector) {
  try {
    console.log('Buscando post em:', postLink);
    const postResponse = await fetch(postLink);
    console.log('Resposta do fetch para:', postResponse.url);
    if (!postResponse.ok) {
      throw new Error('Erro ao carregar o arquivo de post.');
    }
    const postText = await postResponse.text();
    const postDoc = new DOMParser().parseFromString(postText, 'text/html');
    console.log('Post carregado e parseado:', postLink);

    const titleElement = postDoc.querySelector('.titulo-post');
    const imageElements = postDoc.querySelectorAll('img');
    const paragraphElements = postDoc.querySelectorAll('p');
    const tagElements = postDoc.querySelectorAll('.tag');

    console.log('Elementos do post:', {
      titleElement,
      imageElements: imageElements.length,
      paragraphElements: paragraphElements.length,
      tagElements: tagElements.length
    });

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
                <img src="${secondImage}" alt="Post Image">
                <p>${secondParagraph}</p>
                <p>${thirdParagraph}</p>
            </a>
        `;

    const container = document.querySelector(containerSelector);
    if (container) {
      container.appendChild(mainPageElement);
      console.log(`Post adicionado a ${containerSelector}`);
    } else {
      console.error(`Elemento não encontrado: ${containerSelector}`);
    }
  } catch (error) {
    console.error('Erro ao buscar o post:', error);
  }
}
