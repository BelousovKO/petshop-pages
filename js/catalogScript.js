const inCatalog = document.querySelector('.catalogOpen');
const outCatalog = document.querySelector('.catalogClose');
const catalogButton = document.querySelector('.container-catalog-button');
const dogsInCatalog = document.querySelector('.dogsInCatalog');
const breadcrumb = document.querySelector('.breadcrumb');
const breadcrumbCatalogOpen = document.querySelector('.breadcrumbCatalogOpen');
const breadcrumbCatalogClose = document.querySelector('.breadcrumbCatalogClose');
const filterButton = document.querySelector('.p-filter');
const modalFilter = document.querySelector('.filter');
const items = document.querySelector('.container-items-in-catalog');
const showMore = document.querySelector('.div-show-more');
const closeFilter = document.querySelector('.filter-img');
const buttonMobileMenu = document.querySelector('.inCatalog-mobile');
const mobileMenu = document.querySelector('.mobile-menu');
const exitMobileMenu = document.querySelector('.out-mobile-menu');
const buttonMobileBox = document.querySelector('.button-in-box');
const sectionBox = document.querySelector('.section-box');
const shadowBox = document.querySelector('.shadow-box');

const catalogIn = () => {
  inCatalog.style.display = "none";
  outCatalog.style.display = "block";
  catalogButton.style.display = "grid";
  dogsInCatalog.style.display = "none";
  breadcrumbCatalogOpen.style.display = 'block';
  breadcrumbCatalogClose.style.display = 'none';
};

const catalogOut = () => {
  inCatalog.style.display = "block";
  outCatalog.style.display = "none";
  catalogButton.style.display = "none";
  dogsInCatalog.style.display = "block";
  breadcrumbCatalogOpen.style.display = 'none';
  breadcrumbCatalogClose.style.display = 'block';
}

inCatalog.addEventListener('click', () => {
  catalogIn();
});

breadcrumbCatalogClose.addEventListener('click', () => {
  catalogIn();
});

outCatalog.addEventListener('click', () => {
  catalogOut();
});

breadcrumbCatalogOpen.addEventListener('click', () => {
  catalogOut();
});

filterButton.addEventListener('click', () => {
  modalFilter.style.display = 'block';
  items.style.display = 'none';
  filterButton.style.display = 'none';
});

closeFilter.addEventListener('click', () => {
  modalFilter.style.display = 'none';
  items.style.display = 'block';
  filterButton.style.display = 'block';
});

buttonMobileMenu.addEventListener('click', () => {
  mobileMenu.style.display = 'block';
  buttonMobileMenu.style.display = 'none';
  exitMobileMenu.style.display = 'block';
});

exitMobileMenu.addEventListener('click', () => {
  exitMobileMenu.style.display = 'none';
  buttonMobileMenu.style.display = 'block';
  mobileMenu.style.display = 'none';
});

buttonMobileBox.addEventListener('click', () => {
  exitMobileMenu.style.display = 'none';
  buttonMobileMenu.style.display = 'block';
  mobileMenu.style.display = 'none';
  sectionBox.style.display = "block";
  shadowBox.style.display = "block";
})