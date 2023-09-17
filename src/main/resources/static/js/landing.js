let focusedElementBeforeModal;
const modal = document.getElementById('modal');
const modalOverlay = document.querySelector('.modal-overlay');
const reviewButtons = document.querySelectorAll('.review-add-btn');

function openModal() {
  // Save current focus
  focusedElementBeforeModal = document.activeElement;

  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);

  // Listen for indicators to close the modal
  modalOverlay.addEventListener('click', closeModal);

  // Close btn
  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeModal);

  // submit form
  const form = document.getElementById('review-form');
  form.addEventListener('submit', submitAddReview, false);

  // Find all focusable children
  var focusableElementsString =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  var focusableElements = modal.querySelectorAll(focusableElementsString);
  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  // Show the modal and overlay
  modal.classList.add('show');
  modalOverlay.classList.add('show');

  // Focus first child
  const reviewName = document.getElementById('reviewName');
  reviewName.focus();
}

function submitAddReview(e) {
  // console.log(e);
  console.log('Form submitted!');
  e.preventDefault();
  closeModal();
}

function closeModal() {
  // Hide the modal and overlay
  modal.classList.remove('show');
  modalOverlay.classList.remove('show');

  const form = document.getElementById('review-form');
  form.reset();
  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}

function setFocus(evt) {
  const rateRadios = document.getElementsByName('rate');
  const rateRadiosArr = Array.from(rateRadios);
  const anyChecked = rateRadiosArr.some((radio) => {
    return radio.checked === true;
  });
  // console.log('anyChecked', anyChecked);
  if (!anyChecked) {
    const star1 = document.getElementById('star1');
    star1.focus();
    // star1.checked = true;
  }
}

function navRadioGroup(evt) {
  // console.log('key', evt.key, 'code', evt.code, 'which', evt.which);
  // console.log(evt);

  const star1 = document.getElementById('star1');
  const star2 = document.getElementById('star2');
  const star3 = document.getElementById('star3');
  const star4 = document.getElementById('star4');
  const star5 = document.getElementById('star5');

  if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp'].includes(evt.key)) {
    evt.preventDefault();
    // console.log('attempting return');
    if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
      switch (evt.target.id) {
        case 'star1':
          star2.focus();
          star2.checked = true;
          break;
        case 'star2':
          star3.focus();
          star3.checked = true;
          break;
        case 'star3':
          star4.focus();
          star4.checked = true;
          break;
        case 'star4':
          star5.focus();
          star5.checked = true;
          break;
        case 'star5':
          star1.focus();
          star1.checked = true;
          break;
      }
    } else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
      switch (evt.target.id) {
        case 'star1':
          star5.focus();
          star5.checked = true;
          break;
        case 'star2':
          star1.focus();
          star1.checked = true;
          break;
        case 'star3':
          star2.focus();
          star2.checked = true;
          break;
        case 'star4':
          star3.focus();
          star3.checked = true;
          break;
        case 'star5':
          star4.focus();
          star4.checked = true;
          break;
      }
    }
  }
}

// Asigna los manejadores de eventos a los botones de revisión
reviewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openModal();
  });
});