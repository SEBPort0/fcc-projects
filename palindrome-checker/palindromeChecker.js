function palindrome(str) {
  /*****************************************************************************
    1. We get rid of all non-alphanumeric characters in str.
    2. Convert everything in the new alphanumeric only string to lower case.
    3. Check if the we have a palindrome or not.

    Note: doing i < n is not necessary, looking for half of the cases is enough.
          For example: racecar
                       |||||||
                       0|||||6
                        1|||5
                         2|4
                          3
          Comparations: 0 -> 6, 1 -> 5, 2 -> 4, 3 -> 3, enough. In fact, we
          should stop at 2 -> 4, x -> x is always true :).
  *****************************************************************************/
  let filteredStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  let n = filteredStr.length;

  for(let i = 0; i < Math.floor(n/2); i ++) {
    if(filteredStr[i] !== filteredStr[n - (i + 1)])
      return false;
  }
  return true;
}
