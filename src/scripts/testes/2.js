function parseAndSortLinks(jsonData) {
    console.log('Iniciando filtro e ordenação dos links');
    const fixedPart = 'https://nowadraco.github.io/pokedragonshadow.site/src/noticias/';
    const validLinks = jsonData.filter(item => {
      const isValid = item.link && item.link.startsWith(fixedPart) && item.link.match(/\d{4}-\d{2}-\d{2}-\d{2}-\d{2}\.html/);
      console.log('Validando link:', item.link, '->', isValid);
      return isValid;
    });
  
    console.log('Links válidos após filtragem:', validLinks);
  
    const linksWithDateParts = validLinks.map(item => {
      const datePart = item.link.replace(fixedPart, '');
      console.log('Removendo parte fixa do link:', item.link, '->', datePart);
      return { ...item, datePart };
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
  
    return sortedLinks.map(item => {
      const fullLink = fixedPart + item.datePart;
      console.log('Adicionando parte fixa novamente:', item.datePart, '->', fullLink);
      return { ...item, link: fullLink };
    });
  }
  