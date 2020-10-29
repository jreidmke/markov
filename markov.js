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
    this.chain = obj;
  }

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }
  // /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    //Ok, this isn't too tough actually.
    let txt = [];
    // Just start with a key. Grab one from our object.
    let keys = Object.keys(this.chain);

    //Then push in a word from it's value array.
    txt.push(MarkovMachine.choice(keys));

    //Then use that VALUE WORD as a key and push in a new VALUE WORD from that key's array.
    while(txt.length < numWords && txt[txt.length - 1] !== undefined) {
      txt.push(MarkovMachine.choice(this.chain[txt[txt.length-1]]))
    }
    return txt.join(' ');

  }
}

module.exports = {MarkovMachine}; //make sure to always wrap this in {{{{{brackets}}}}}