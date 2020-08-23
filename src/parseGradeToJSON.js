const fs = require('fs');
const { getCourseInformation } = require('./scraper');

async function parseGradeToJSON(inputPath, outputPath) {
  try {
    const html = await fs.promises.readFile(inputPath);
    const grade = getCourseInformation(html);
    await fs.promises.writeFile(outputPath, JSON.stringify(grade));
  } catch(e) {
    console.error(e);
  }
}

module.exports = { parseGradeToJSON };