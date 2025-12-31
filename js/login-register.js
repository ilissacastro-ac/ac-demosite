document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('loginModal');
  const openBtn = document.getElementById('openLogin');
  const closeBtn = document.getElementById('closeLogin');
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('passwordInput');

  if (!modal || !openBtn) return;

  openBtn.onclick = (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
  };

  closeBtn.onclick = () => modal.style.display = 'none';

  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.style.display = 'none';
  });

  togglePassword.onclick = () => {
    passwordInput.type =
      passwordInput.type === 'password' ? 'text' : 'password';
  };
});
