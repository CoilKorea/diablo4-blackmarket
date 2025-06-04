const buttons = document.querySelectorAll("nav button");

function showTab(id) {
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById('include-' + id).classList.add('active');

  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-' + id);
  if (activeBtn) activeBtn.classList.add('active');
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.id.replace('btn-', '');
    showTab(tabId);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const btn = document.getElementById('order-button');
    const title = document.getElementById('korean-title');
    if (btn) btn.style.opacity = 1;
    if (title) title.style.opacity = 1;
  }, 1000);
  showTab("notice"); // 기본 활성화 탭
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const opacity = Math.min(scrollY / 300, 0.6);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  }
});
