/** Command-line tool to generate Markov text. */
const fs = require("fs");
const markov = require("./markov");
const process = require("process");
const axios = require('axios');
const { MarkovMachine } = require("./markov");

function makeMarkov(text) {
    const mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function file(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        makeMarkov(data);
    })
}

async function url(path) {
    try {
        const resp = await axios.get(path);
        makeMarkov(resp.data);
    } catch (error) {
        console.log(error);
    }
}

const [source, path] = process.argv.slice(2);

if (source === "file") {
    file(path);
  }

  else if (source === "url") {
    url(path);
  }

  else {
    console.error(`Unknown source: ${source}`);
    process.exit(1);
  }