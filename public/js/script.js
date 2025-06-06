function showTab(id) {
  // 모든 탭 숨기기
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

  // 선택한 탭만 보이기
  document.getElementById('include-' + id).classList.add('active');

  // 모든 버튼에서 active 제거
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove('active'));

  // 선택한 버튼에만 active 부여
  const activeBtn = document.getElementById('btn-' + id);
  if (activeBtn) activeBtn.classList.add('active');

  // 개별장비 탭일 경우 iframe 강제 새로고침
  if (id === 'items') {
    reloadGearSheetIframe();
  }
}

function reloadGearSheetIframe() {
  const iframe = document.getElementById('gear-sheet');
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = ''; // 먼저 비워 언로드 유도
    setTimeout(() => {
      iframe.src = currentSrc; // 다시 로드
    }, 50); // 살짝 딜레이 줘야 완전히 초기화됨
  }
}

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

// 스크롤 시 오버레이 어둡게
window.addEventListener('scroll', function () {
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');

  if (!nav || !header) return;

  const scrollY = window.scrollY || window.pageYOffset;

  // ✅ 최초에만 nav가 header 아래에 있어야 함
  // ✅ 스크롤 한 번이라도 내리면 고정 유지
  if (scrollY > 100) {
    nav.classList.add('fixed');
  }
});
