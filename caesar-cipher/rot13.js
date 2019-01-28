/**
 * For more chaos: https://github.com/SEBPort0/fcc-projects
 * 
 * @SEBPort0
 */

function rot13(str) {
  /**
   * 1.We shall not touch the character if the character is some special symbol.
   */
  let decodedStr = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for(let char of str) {
    if(/[A-Z]/.test(char)) {
      let rot = alphabet.indexOf(char) + 13;
      let index = rot < 26 ? rot : rot - 26;
      decodedStr += alphabet[index];
    }
    else 
      decodedStr += char;
  }
  return decodedStr;
}