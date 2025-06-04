
const buttons = document.querySelectorAll("nav button");

function showTab(id) {
  // 탭 본문 처리
  document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
  document.getElementById('include-' + id).classList.add('active');

  // 버튼 강조 처리
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

// 초기 강조 (첫 번째 탭)
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const btn = document.getElementById('order-button');
    const title = document.getElementById('korean-title');
    if (btn) btn.style.opacity = 1;
    if (title) title.style.opacity = 1;
  }, 1000);
  showTab("notice");
});

// 스크롤 오버레이 효과
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const opacity = Math.min(scrollY / 300, 0.6);
    overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
  }
});


setTimeout(() => {
  const container = document.getElementById('iframe-container');
  if (container) {
    const refreshed = document.createElement('iframe');
    refreshed.id = 'gear-sheet';
    refreshed.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTCGqWo90YzIsKiu7DE_Gr2xbYTrAcXxYLRVgZl4caDBnJlmirBr4z0QNTEta1fCcROEVOV-0dsQh-h/pubhtml?widget=true&headers=false';
    refreshed.width = '100%';
    refreshed.height = '800';
    refreshed.frameBorder = '0';
    refreshed.style.border = 'none';
    refreshed.style.backgroundColor = 'black';
    container.innerHTML = '';
    container.appendChild(refreshed);
  }
}, 800);

function reloadGearSheetIframe() {
  const iframe = document.getElementById('gear-sheet');
  if (iframe) {
    const currentSrc = iframe.src;
    iframe.src = ''; // 먼저 비움 → 완전한 언로드
    setTimeout(() => {
      iframe.src = currentSrc; // 원래 주소로 다시 설정
    }, 50); // 약간의 지연이 필요
  }
}
