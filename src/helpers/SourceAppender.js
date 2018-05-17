export function sourceAppender(d, s, id, src, cb) {
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  let js = d.createElement(s);
  js.id = id;
  js.src = src;
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs)
  } else {
    d.head.appendChild(js)
  }
  js.onload = cb
}