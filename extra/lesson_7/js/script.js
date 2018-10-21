let btn = document.querySelector('.btn'),
    elem = document.querySelector('.circle');

function myAnimation() {
    requestAnimationFrame(frame, elem);
    let pos = 0;

    let id = setInterval(frame, 10);

    function frame() {
        if (pos == 94) {
            clearInterval(id);
        } else {
            pos += 1;
            elem.style.left = pos + '%';
        }
    }
}

btn.addEventListener('click', () => {
    myAnimation();
});