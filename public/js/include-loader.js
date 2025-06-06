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
        document.getElementById(id).innerHTML = data;
        loadCount++;

        // 모든 include가 끝났을 때 실행
        if (loadCount === totalIncludes) {
          onIncludesLoaded(); // ✅ 후처리 콜백 실행
        }
      });
  });
});

function onIncludesLoaded() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      nav.style.position = "fixed";
      nav.style.top = "0";
      nav.style.width = "100%";
      nav.style.zIndex = "999";
    } else {
      nav.style.position = "relative";
    }

    lastScrollY = currentScrollY;
  });
}
