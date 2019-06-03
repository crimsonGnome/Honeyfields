export default function regExpressionName(name) {
  const re = /s$/;
  if (re.test(name)) {
    return `${name}'`;
  } else {
    return `${name}'s`;
  }
}

function sRules(filter) {
  let sliced1 = filter.slice(-2, -1);
  sliced1 = sliced1.codePointAt(0);
  let sliced2 = filter.slice(-1);
  sliced2 = sliced2.codePointAt(0);
  if (sliced1 === 99 || sliced1 === 115) {
    if (sliced2 === 104) {
      return `${filter}es`;
    } else {
      return `${filter}s`;
    }
  } else {
    if (sliced2 === 115 || sliced2 === 120 || sliced2 === 122) {
      return `${filter}es`;
    } else {
      return `${filter}s`;
    }
  }
}

export { sRules };
