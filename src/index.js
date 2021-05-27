const leftButton = document.getElementById('leftButtonContainer');
const rightButton = document.getElementById('rightButtonContainer');

const initContainers = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img');
        img.setAttribute('src', 'resources/landscape' + i + '.jpg');
        img.setAttribute('class', 'sliderImg');
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg');
        }
        imageContainers[i].appendChild(img);
    }
}

const initPositionDisplay = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        const dot = document.createElement('div');
        dot.setAttribute('id', 'position' + i);
        if (i === 2) {
            dot.classList.toggle('currentPosition');
        } else {
            dot.classList.toggle('navDot');
        }
        dotNavContainer.appendChild(dot);
    }
}

const updatePosition = () => {
    console.log(position);
    //const previous = document.getElementsByClassName('currentPosition');
    //previous[0].classList.toggle('currentPosition');

}

const removePreviousImgs = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].removeChild(imageContainers[i].lastChild);
    }
}

const handleLeft = () => {
    position++;
    removePreviousImgs();
    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img');
        img.classList.add('sliderImg');
        img.classList.add('slideLeft');
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg');
        }
        if ((i + position <= imageContainers.length - 1)) {
            img.setAttribute('src', 'resources/landscape' + (i + position) + '.jpg');
        } else if ((i + position) > (imageContainers.length - 1)) {
            img.setAttribute('src', 'resources/landscape' + ((i + position) - imageContainers.length) + '.jpg');
        }
        imageContainers[i].appendChild(img);
    } 

    updatePosition();

    if (position == (imageContainers.length - 1)) {
        position = 0;
    }
}

const handleRight = () => {
    position--;
    removePreviousImgs();
    if (position < 0) {
        position = (imageContainers.length - 1);
    }
    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img');
        img.classList.add('sliderImg');
        img.classList.add('slideRight');
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg');
        }
        if ((i + position <= imageContainers.length - 1) && (i + position >= 0)) {
            img.setAttribute('src', 'resources/landscape' + (i + position) + '.jpg');
        } else if ((i + position) > (imageContainers.length - 1)) {
            img.setAttribute('src', 'resources/landscape' + ((i + position) - imageContainers.length) + '.jpg');
        } else if (i + position < 0) {
            img.setAttribute('src', 'resources/landscape' + ((i + position) + imageContainers.length) + '.jpg');
        }
        imageContainers[i].appendChild(img);
    }

    updatePosition();
}

let position = 0;

const dotNavContainer = document.getElementById('dotNavContainer');
let imageContainers = document.getElementsByClassName('sliderContainer');

initContainers();
initPositionDisplay();

leftButton.addEventListener('click', handleLeft);
rightButton.addEventListener('click', handleRight);

window.addEventListener('keydown', (e) => {
    let keyCode = e.key;

    console.log(keyCode);

    switch (keyCode) {
        case 'ArrowLeft':
            handleLeft();
            break;
        case 'ArrowRight':
            handleRight();
            break;
    }
});