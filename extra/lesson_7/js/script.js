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

// One more animation

let globalID,
	animationWrap = document.querySelector('#animationWrap'),
    div = document.createElement('div'),
    start = document.querySelector('#start'),
    stop = document.querySelector('#stop'),
    clear = document.querySelector('#clear');

function animateIt() {
	animationWrap.innerHTML += '<div></div>';
	globalID = requestAnimationFrame(animateIt);
}

start.addEventListener('click', ()=>{
	globalID = requestAnimationFrame(animateIt);
});

stop.addEventListener('click', ()=>{
	cancelAnimationFrame(globalID);
});

clear.addEventListener('click', ()=>{
	animationWrap.innerHTML = '';
});