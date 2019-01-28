function telephoneCheck(str) {
  /******************************************************************
   * A big, fat, regular expression to match.
   * Let's remember: () will fail if we are looking for parenthesis,
   * this is the correct way to put it: \( \)  
   ******************************************************************/
  let regExp = /^1?(-|\s|)?(\(\d{3}\)|\d{3})(-|\s)?\d{3}(-|\s)?\d{4}$/;

  return regExp.test(str);
}
