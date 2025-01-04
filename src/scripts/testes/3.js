async function displayPosts(sortedLinks) {
    console.log('Exibindo postagens fixas e aleatórias');
    // Postagens fixas
    await displayPost(sortedLinks[0].link, '#ultimaPostagem');
    await displayPost(sortedLinks[1].link, '#penultimaPostagem');
    await displayPost(sortedLinks[2].link, '#terceiraUltimaPostagem');
    await displayPost(sortedLinks[3].link, '#quartaUltimaPostagem');
    await displayPost(sortedLinks[4].link, '#quintaUltimaPostagem');
    await displayPost(sortedLinks[5].link, '#sextaUltimaPostagem');
    await displayPost(sortedLinks[6].link, '#setimaUltimaPostagem');
    await displayPost(sortedLinks[7].link, '#oitavaUltimaPostagem');
    await displayPost(sortedLinks[8].link, '#nonaUltimaPostagem');
  
    // Postagens aleatórias
    const randomIndices = [];
    while (randomIndices.length < 3) {
      const randomIndex = Math.floor(Math.random() * sortedLinks.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
  
    await displayPost(sortedLinks[randomIndices[0]].link, '#decimaUltimaPostagem');
    await displayPost(sortedLinks[randomIndices[1]].link, '#decimaPrimeiraUltimaPostagem');
    const decimaSegundaPostagemIndex = randomIndices[2];
    const decimaSegundaPostagem = sortedLinks[decimaSegundaPostagemIndex] || sortedLinks[0];
    await displayPost(decimaSegundaPostagem.link, '#decimaSegundaUltimaPostagem');
  
    // Adicionar uma postagem aleatória adicional
    const randomIndex = Math.floor(Math.random() * sortedLinks.length);
    await displayPost(sortedLinks[randomIndex].link, '#postagemAleatoria');
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
  