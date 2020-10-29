/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }


  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let obj = {};
    for(let word of this.words) {
      obj[word] = []
    }
    for(let word in obj) {
      for(let i = 0; i < this.words.length; i++) {
        if(this.words[i] === word && !obj[word].includes(this.words[i+1])) {
          obj[word].push(this.words[i+1]);
        }
      }
    }
    console.log(obj);
  }


  // /** return random text from chains */

  // makeText(numWords = 100) {
  //   // TODO
  // }
}

module.exports = {MarkovMachine}; //make sure to always wrap this in {{{{{brackets}}}}}