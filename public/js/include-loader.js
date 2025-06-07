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

  let loadCount = 0;
  const totalIncludes = includes.length;

  includes.forEach(([id, url]) => {
    fetch(url)
      .then(res => res.text())
      .then(data => {
        const container = document.getElementById(id);
        if (container) {
          container.innerHTML = data;
        }
        loadCount++;

        // ✅ 후처리: 모든 include 완료 후 이벤트 디스패치만 수행
        if (loadCount === totalIncludes) {
          window.dispatchEvent(new Event('includes-loaded'));
        }
      })
      .catch(err => {
        console.error(`Failed to load ${url}`, err);
      });
  });
});
