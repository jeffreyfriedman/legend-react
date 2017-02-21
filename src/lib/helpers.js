export const wait = (ms) => {
  let d = new Date();
  let d2 = null;
  do { d2 = new Date(); }
  while(d2 - d < ms);
}
