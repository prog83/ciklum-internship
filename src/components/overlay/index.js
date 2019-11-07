import './style.scss';

const overlay = document.querySelector('#overlay');

export function closeOverlay() {
  overlay.classList.remove('active');
  overlay.classList.remove('backdrop');
}

export function openOverlay(variant) {
  if (variant === 'backdrop') overlay.classList.add('backdrop');
  overlay.classList.add('active');
}

export function addClickListenerOverlay(cb) {
  if (typeof cb === 'function') {
    overlay.addEventListener(
      'click',
      (event) => {
        cb(event);
        closeOverlay();
      },
      { once: true },
    );
  }
}

export function dispatchClickOverlay(detail) {
  const eventClick = new CustomEvent('click', { detail });
  overlay.dispatchEvent(eventClick);
}
