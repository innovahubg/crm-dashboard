export function getParams(html) {
  const exp = /(?<=\{\{).*?(?=\}\})/g;
  const res = [...html.matchAll(exp)];
  const params = res.map((item) => item[0]);
  return params;
}
