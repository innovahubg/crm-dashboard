export default function getParams(html) {
  const exp = /(?<=\{\{).*?(?=\}\})/g;
  const res = [...html.matchAll(exp)];
  const params = {};
  res.forEach((item) => {
    params[item] = "string";
  });
  return params;
}
