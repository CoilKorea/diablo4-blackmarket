// ✅ 탭 전환 및 버튼 스타일 처리
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

  // 스크롤 애니메이션
  const targetEl = document.getElementById('include-' + id);
  if (targetEl) {
    window.scrollTo({
      top: targetEl.offsetTop - 80,
      behavior: "smooth"
    });
  }
}

// ✅ 개별장비 탭에서 iframe 새로고침
function reloadGearSheetIframe() {
  const iframe = document.getElementById('gear-sheet');
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      iframe.src = currentSrc;
    }, 50);
  }
}

// ✅ DOM 로딩 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 탭 버튼 클릭 이벤트 등록
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

// ✅ 스크롤 시 배경 어둡게 처리
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const opacity = Math.min(scrollY / 300, 0.6);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  }


});
