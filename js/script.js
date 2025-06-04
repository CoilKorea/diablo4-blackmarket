
    const buttons = document.querySelectorAll("nav button");
    function showTab(id) {
      document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      buttons.forEach(btn => btn.classList.remove('active'));
      document.getElementById(`btn-${id}`).classList.add('active');
    }

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        document.getElementById('order-button').style.opacity = 1;
        document.getElementById('korean-title').style.opacity = 1;
      }, 1000);
    });

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const overlay = document.getElementById('overlay');
      const opacity = Math.min(scrollY / 300, 0.6);
      overlay.style.background = `rgba(0, 0, 0, ${opacity})`;
    });
  
