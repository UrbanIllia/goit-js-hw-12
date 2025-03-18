import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './js/render-functions';
import { getPictures } from './js/pixabay-api';
import { randomizeGalleryItems } from './js/gallery-randomizer';

const formSearch = document.querySelector('.form');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn2');

let page = 1;
let query = '';
const perPage = 15;
let isScrolling = false;

loader.style.display = 'none';
btnLoadMore.classList.add('is-hidden');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function updateGradient(hasImages) {
  const timestamp = Date.now(); // Уникальная метка времени
  const gradient = hasImages
    ? `linear-gradient(rgba(46, 47, 66, 0.8), rgba(46, 47, 66, 0.8))`
    : `linear-gradient(rgba(46, 47, 66, 0.3), rgba(46, 47, 66, 0.3))`;
  document.body.style.background = `${gradient}, url("/goit-js-hw-12/img/1.webp?t=${timestamp}") fixed no-repeat`;
  document.body.style.backgroundSize = 'cover';
}

function scrollByTwoRows() {
  const firstItem = document.querySelector('.gallery-item');
  if (firstItem && !isScrolling) {
    const itemHeight = firstItem.getBoundingClientRect().height;
    isScrolling = true;
    window.scrollBy({
      top: 2 * itemHeight,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }
}

async function onSearch(event) {
  event.preventDefault();
  listImages.innerHTML = '';
  showLoader();
  btnLoadMore.classList.add('is-hidden');

  query = event.target.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Input cannot be empty!',
      color: '#ff0000',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getPictures(query, page);
    hideLoader();

    if (!data.hits.length) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      updateGradient(false);
      return;
    }

    listImages.innerHTML = createMarkup(data.hits);
    randomizeGalleryItems();
    updateGradient(true);

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    if (data.totalHits > page * perPage) {
      btnLoadMore.classList.remove('is-hidden');
    }

    formSearch.reset();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
    updateGradient(false);
  }
}

async function onLoadMore(event) {
  showLoader();
  page++;

  try {
    const data = await getPictures(query, page);
    hideLoader();

    if (!data.hits.length || data.hits.length < perPage) {
      btnLoadMore.classList.add('is-hidden');
      btnLoadMore.removeEventListener('click', onLoadMore);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    listImages.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    randomizeGalleryItems();
    updateGradient(true);

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
    updateGradient(false);
  }
}

window.addEventListener('wheel', event => {
  if (event.deltaY > 0) {
    scrollByTwoRows();
  }
});

formSearch.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);
