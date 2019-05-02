export default function regExpressionName(name) {
  const re = /s$/;
  if (re.test(name)) {
    return `${name}'`;
  } else {
    return `${name}'s`;
  }
}
