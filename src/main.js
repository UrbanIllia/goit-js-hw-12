import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './js/render-functions';
import { getPictures } from './js/pixabay-api';
import { randomizeGalleryItems } from './js/gallery-randomizer';

const formSearch = document.querySelector('.form');
const listImages = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn2');

// Глобальные переменные для пагинации и запроса
let page = 1;
let query = '';
const perPage = 20; // Соответствует параметру per_page в getPictures

loader.style.display = 'none';
btnLoadMore.classList.add('is-hidden'); // Скрываем кнопку изначально

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function updateGradient(hasImages) {
  document.body.style.backgroundImage = hasImages
    ? `linear-gradient(rgba(46, 47, 66, 0.8), rgba(46, 47, 66, 0.8)), url(../img/1.webp)`
    : `linear-gradient(rgba(46, 47, 66, 0.3), rgba(46, 47, 66, 0.3)), url(../img/1.webp)`;
}

async function onSearch(event) {
  event.preventDefault();
  listImages.innerHTML = '';
  showLoader();
  btnLoadMore.classList.add('is-hidden'); // Скрываем кнопку перед новым поиском

  query = event.target.elements['search-text'].value.trim();
  page = 1; // Сбрасываем страницу на первую

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
      updateGradient(false); // Возвращаем исходный градиент
      return;
    }

    listImages.innerHTML = createMarkup(data.hits);
    randomizeGalleryItems();
    updateGradient(true); // Устанавливаем плотный градиент

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();

    // Проверяем, есть ли ещё изображения для загрузки
    if (data.totalHits > page * perPage) {
      btnLoadMore.classList.remove('is-hidden');
    }

    formSearch.reset();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
    updateGradient(false); // Возвращаем исходный градиент при ошибке
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
    updateGradient(true); // Поддерживаем плотный градиент

    const lightbox = new SimpleLightbox('.gallery a', {
      captions: true,
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  } catch (error) {
    hideLoader();
    iziToast.error({ title: 'Error', message: error.message });
    updateGradient(false); // Возвращаем исходный градиент при ошибке
  }
}

formSearch.addEventListener('submit', onSearch);
btnLoadMore.addEventListener('click', onLoadMore);
