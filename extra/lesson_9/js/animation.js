let btn = document.querySelectorAll('.btn'),
    modal = document.querySelector('.modal'),
    modalContent = document.querySelector('.modal__content');

btn[0].addEventListener('click', () => {
    modal.classList.remove('display-none');
    modal.classList.add('display-flex');
    setTimeout(
        () => {
            modalContent.classList.remove('display-none');
            modalContent.classList.add('display-block');
        }, 100);
});