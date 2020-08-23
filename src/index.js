const args = process.argv.slice(2);
const inputPath = args[0];
const outputPath = './json/ec.json';
const { parseGradeToJSON } = require("./parseGradeToJSON");

parseGradeToJSON(inputPath, outputPath);