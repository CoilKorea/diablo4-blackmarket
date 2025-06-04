
window.addEventListener('DOMContentLoaded', () => {
  const includes = [
    ['include-header', 'sections/header.html'],
    ['include-nav', 'sections/nav.html'],
    ['include-notice', 'sections/notice.html'],
    ['include-price', 'sections/price.html'],
    ['include-items', 'sections/items.html'],
    ['include-fullbuild', 'sections/fullbuild.html'],
    ['include-season8', 'sections/season8.html']
  ];

  includes.forEach(([id, url]) => {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        document.getElementById(id).innerHTML = data;
      });
  });
});
