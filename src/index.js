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

    if (position == (imageContainers.length - 1)) {
        position = 0;
    }
}

const handleRight = () => {
    position--;
    removePreviousImgs();
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

    if (position < 0) {
        position = (imageContainers.length - 1);
    }
}

let position = 0;

let imageContainers = document.getElementsByClassName('sliderContainer');

initContainers();

leftButton.addEventListener('click', handleLeft);
rightButton.addEventListener('click', handleRight);