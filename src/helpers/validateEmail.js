export default function validateEmail(email) {
  const exp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return exp.test(email) ? true : false;
}
