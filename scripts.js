function togglePage(pageId) {
  const pages = ['shoppingMall', 'forestFire', 'tourism', 'waterElectricity'];

  pages.forEach(id => {
    document.getElementById(id).style.display =
      (id === pageId) ? 'block' : 'none';
  });

  window.scrollTo({ top: 0, behavior: 'instant' });
}
