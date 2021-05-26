import galleryImages from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxCloseButtonEl = document.querySelector('[data-action="close-lightbox"]');
const lightboxImageEl = document.querySelector('.lightbox__image');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');

galleryEl.insertAdjacentHTML("afterbegin", makeGalleryMarkup(galleryImages));

galleryEl.addEventListener('click', onGalleryImageClick);
lightboxCloseButtonEl.addEventListener('click', onCloseButtonClick);
lightboxOverlayEl.addEventListener('click', onOverlayClick);

function onGalleryImageClick(event) {
    event.preventDefault();

    if(event.target.nodeName !== "IMG")
        return;
 
    lightboxEl.classList.toggle('is-open');
    window.addEventListener('keydown', onLightboxKeyPress);

    const galleryImageEl = event.target;
    const currentImage = galleryImages.find(el => el.preview === galleryImageEl.src);
    
    setSrcOfImageTag(currentImage);
}

function onCloseButtonClick() {
    lightboxEl.classList.toggle('is-open');
    
    removeSrcOfImageTag();   
    
    window.removeEventListener('keydown', onLightboxKeyPress);
}

function onOverlayClick(event) {
    if(event.target.classList.contains('.lightbox__overlay'))
        event.stopPropagation();
    
    onCloseButtonClick();
}

function onLightboxKeyPress(event) {
    const currentImageIndex = galleryImages.findIndex(el => el.original === lightboxImageEl.src);

    if(event.key === 'ArrowRight') {
        onArrowRightKeyPress(currentImageIndex);
    }   
    if(event.key === 'ArrowLeft') {
        onArrowLeftKeyPress(currentImageIndex);
    }
    if(event.key === 'Escape') {
        onCloseButtonClick();
    }
}

function onArrowLeftKeyPress(currentIndex) {
    currentIndex -= 1;

    if(currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }

    setSrcOfImageTag(galleryImages[currentIndex]);
}

function onArrowRightKeyPress(currentIndex) {
    currentIndex += 1;

    if(currentIndex > galleryImages.length - 1) {
        currentIndex = 0;
    }

    setSrcOfImageTag(galleryImages[currentIndex]);
}

function setSrcOfImageTag(image) {
    if(image) {
        lightboxImageEl.src = image.original;
        lightboxImageEl.alt = image.description;
    }
}

function removeSrcOfImageTag() {
    if(lightboxImageEl.src !== '') {
        lightboxImageEl.src = '';
        lightboxImageEl.alt = '';
    }
}

function makeGalleryMarkup(galleryArr) {
   return galleryArr
    .map(el => makeImageMarkup(el))
    .join('');
}

function makeImageMarkup(imageObj) {
    return `
        <li class="gallery__item">
            <a class="gallery__link"
                href="${imageObj.original}">
                <img class="gallery__image"
                    src="${imageObj.preview}"
                    data-source="${imageObj.original}"
                    alt="${imageObj.description}"
                >
            </a>    
        </li>
    `;
}
