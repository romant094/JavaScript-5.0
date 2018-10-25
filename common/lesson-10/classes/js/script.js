class Options {
    constructor(height, width, bg, fontSize, textAlign) {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    createDiv(id, cl, text) {
        let div = document.createElement('div'),
            a = document.querySelector(`#${id}`);

        div.style.width = `${this.width}px`;
        div.style.height = `${this.height}px`;
        div.style.backgroundColor = this.bg;
        div.style.fontSize = `${this.fontSize}px`;
        div.style.textAlign = this.textAlign;
        div.classList.add(cl);
        div.textContent = text;
        a.appendChild(div);
    }
}

const block = new Options(200, 200, 'red', 20, 'right').createDiv('wrapper', 'new-class-one', 'Lorem ipsum');

let classOne = document.querySelector('.new-class-one');

console.log(classOne);