export function htmlToElement(html) {
  const span = document.createElement('span');
  span.innerHTML = html;
  return span.querySelector('li');
}