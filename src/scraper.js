const cheerio = require('cheerio');

function getCourseInformation(html) {
  const $ = cheerio.load(html);
  const fullTable = $('#matrizCurricular-form\\:perfil-matriz-curricular-data-table\\:tb').html();
  const semestersHTML = $(fullTable).children();
  let semesters = [];
  let codes = {};

  $(semestersHTML).each((semesterIndex, semesterElement) => {
    const disciplines = $(semesterElement).find('tbody').first();
    let semesterDisciplines = {};
    let semesterCodes = [];
  
    $(disciplines).find('tr').each((_, disciplineElement) => {
      const codigo = parseInt($(disciplineElement).find('span').first().text());
      const nome = $(disciplineElement).find('input').first().attr('value').trim();
      const tipo = $(disciplineElement).find('input').last().attr('value').trim();
      let relacoes = {};

      const otherInfo = $(disciplineElement).find('div div div div span').text().trim();
      const otherInfoNames = ['requisitos', 'corequisitos', 'dispensa', 'equivalencia'];
      otherInfo.split(':').slice(9)
        .map((value) => value.trim().replace(/[A-zÀ-ú]+-?[A-zÀ-ú]+$/, ''))
        .forEach((value, index) => {
          relacoes[otherInfoNames[index]] = value;
        });

      const valueNames = [
        'creditosPratica', 'creditosTeoria', 'creditosDistancia', 'creditosEstudo',
        'creditosPesquisa', 'creditosEstagio', 'creditosPraticaCurricular', 'totalCreditos',
      ];
      const values = otherInfo.match(/(\d)/g).slice(0, 8);

      let creditos = {};

      values.forEach((value, i) => {
        creditos[valueNames[i]] = value;
      });

      semesterDisciplines[codigo] = { nome, tipo, creditos , relacoes };
      if(tipo !== 'OPTATIVAS') {
        semesterCodes.push(codigo);
      }
    });

    semesters = {...semesters, ...semesterDisciplines};
    codes[semesterIndex+1] = semesterCodes;
  });

  return {codigos:codes, semestres:semesters};
}

module.exports = { getCourseInformation };