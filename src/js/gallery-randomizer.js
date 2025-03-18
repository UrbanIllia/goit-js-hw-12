function randomizeGalleryItems() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const sizes = ['size-small', 'size-wide', 'size-tall'];

  galleryItems.forEach(item => {
    item.classList.forEach(className => {
      if (className.startsWith('size-')) {
        item.classList.remove(className);
      }
    });

    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    item.classList.add(randomSize);
  });
}

export { randomizeGalleryItems };
