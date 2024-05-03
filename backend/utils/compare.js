function compareasc(a, b, name) {
  if (a[name] < b[name]) {
    return -1;
  }
  if (a[name] > b[name]) {
    return 1;
  }
  return 0;
}

function comparedesc(a, b, name) {
  if (a[name] > b[name]) {
    return -1;
  }
  if (a[name] < b[name]) {
    return 1;
  }
  return 0;
}

export { compareasc, comparedesc };
