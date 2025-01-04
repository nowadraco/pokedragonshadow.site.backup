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
      
      // Chamada para processar e exibir os links
      const sortedLinks = parseAndSortLinks(jsonData);
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
  