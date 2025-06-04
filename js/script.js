window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const opacity = Math.min(scrollY / 300, 0.6);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const btn = document.getElementById('order-button');
    const title = document.getElementById('korean-title');
    if (btn) btn.style.opacity = 1;
    if (title) title.style.opacity = 1;
  }, 1000);
});
