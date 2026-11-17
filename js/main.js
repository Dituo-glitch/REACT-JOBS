document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu dropdown
  const mobileMenuButton = document.querySelector('#mobile-dropdown-button');
  const mobileMenu = document.querySelector('#mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () =>
      mobileMenu.classList.toggle('hidden')
    );
  }

  // Profile dropdown
  const profileButton = document.querySelector('#user-menu-button');
  const profileDropdown = document.querySelector('#user-menu');

  if (profileButton && profileDropdown) {
    profileButton.addEventListener('click', () =>
      profileDropdown.classList.toggle('hidden')
    );
  }
});
