const { write } = require('node:fs'); 
const fs = require('node:fs/promises');

const readFile = async(filename) => {
  try {
    const fileContent = await fs.readFile(filename, { encoding: 'utf8' });
    const data = JSON.parse(fileContent);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const writeFile = async(filename, data) => {
  try {
    data = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, data, { encoding: 'utf8' });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { readFile, writeFile }; 