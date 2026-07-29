// Bootstrap navbar state + mobile close
(() => {
  const header = document.querySelector('.qavah-header');
  const collapseEl = document.getElementById('qavahNav');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  setHeader(); window.addEventListener('scroll', setHeader, {passive:true});
  document.querySelectorAll('#qavahNav .nav-link').forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth < 992 && collapseEl?.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
  }));
})();

// Footer copyright year
document.getElementById("year").textContent = new Date().getFullYear();