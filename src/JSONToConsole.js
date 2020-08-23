const fs = require('fs');

async function printGrade(path) {
  const JSONData = await fs.promises.readFile('./json/ec.json');
  const data = await JSON.parse(JSONData);
  const { codigos, semestres } = data;

  for(let i in codigos) {
    const semestre = codigos[i];
    
    for(let codigoDisciplina of semestre) {
      const materia = semestres[codigoDisciplina];
      console.log(`${i} ${materia.nome} ${materia.creditos.totalCreditos}`);
    }
    console.log();
  }
}