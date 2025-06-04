function showTab(id) {
  // 탭 본문 처리
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  const tab = document.getElementById('include-' + id);
  if (tab) tab.classList.add('active');

  // 버튼 강조 동기화
  const buttons = document.querySelectorAll("nav button");
  buttons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById('btn-' + id);
  if (activeBtn) activeBtn.classList.add('active');
}

// 초기 바인딩 및 강조
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("nav button");

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.id.replace('btn-', '');
      showTab(tabId);
    });
  });

  // 첫 탭 자동 활성화
  showTab("notice");

  // 초기 등장 애니메이션
  setTimeout(() => {
    const btn = document.getElementById('order-button');
    const title = document.getElementById('korean-title');
    if (btn) btn.style.opacity = 1;
    if (title) title.style.opacity = 1;
  }, 1000);
});

// 스크롤 반투명 효과
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const opacity = Math.min(scrollY / 300, 0.6);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  }
});
