const leftButton = document.getElementById('leftButtonContainer')
const rightButton = document.getElementById('rightButtonContainer')

const initContainers = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img')
        img.setAttribute('src', 'resources/landscape' + i + '.jpg')
        img.setAttribute('class', 'sliderImg')
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg')
        }
        imageContainers[i].appendChild(img)
    }
}

const initPositionDisplay = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        const dot = document.createElement('div')
        dot.setAttribute('id', 'position' + i)
        if (i === 2) {
            dot.classList.toggle('currentPosition')
        } else {
            dot.classList.toggle('navDot')
        }
        dotNavContainer.appendChild(dot)
        dotNavs.push(dot)
    }
}

const updatePosition = (direction) => {
    let previous = document.getElementsByClassName('currentPosition')
    previous[0].classList.toggle('navDot')
    previous[0].classList.remove('currentPosition')

    if (direction === 'left') {
        currentPosition = --currentPosition
        if (currentPosition < 0) {
            currentPosition = imageContainers.length - 1
        }
    } else if (direction === 'right') {
        currentPosition = ++currentPosition
        if (currentPosition >= imageContainers.length) {
            currentPosition = 0
        }
    }

    let currentDot = document.getElementById('position' + currentPosition)
    currentDot.classList.toggle('navDot')
    currentDot.classList.add('currentPosition')
}

const removePreviousImgs = () => {
    for (let i = 0; i < imageContainers.length; i++) {
        imageContainers[i].removeChild(imageContainers[i].lastChild)
    }
}

const handleLeft = () => {
    removePreviousImgs()
    position--
    if (position < 0) {
        position = imageContainers.length - 1
    }

    updatePosition('left')

    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img')
        img.classList.add('sliderImg')
        img.classList.add('slideLeft')
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg')
        }
        if (i + position <= imageContainers.length - 1) {
            img.setAttribute(
                'src',
                'resources/landscape' + (i + position) + '.jpg'
            )
        } else if (i + position > imageContainers.length - 1) {
            img.setAttribute(
                'src',
                'resources/landscape' +
                    (i + position - imageContainers.length) +
                    '.jpg'
            )
        }
        imageContainers[i].appendChild(img)
    }
}

const handleRight = () => {
    removePreviousImgs()

    position++

    for (let i = 0; i < imageContainers.length; i++) {
        const img = document.createElement('img')
        img.classList.add('sliderImg')
        img.classList.add('slideRight')
        if (i === 2) {
            img.setAttribute('id', 'sliderMainImg')
        }
        if (i + position <= imageContainers.length - 1 && i + position >= 0) {
            img.setAttribute(
                'src',
                'resources/landscape' + (i + position) + '.jpg'
            )
        } else if (i + position > imageContainers.length - 1) {
            img.setAttribute(
                'src',
                'resources/landscape' +
                    (i + position - imageContainers.length) +
                    '.jpg'
            )
        } else if (i + position < 0) {
            img.setAttribute(
                'src',
                'resources/landscape' +
                    (i + position + imageContainers.length) +
                    '.jpg'
            )
        }
        imageContainers[i].appendChild(img)
    }

    if (position == imageContainers.length - 1) {
        position = -1
    }

    updatePosition('right')
}

const dotNavHandler = (dot) => {
    let dotNavPosition = dot
        .getAttribute('id')
        .charAt(dot.getAttribute('id').length - 1)
    if (dotNavPosition == currentPosition) {
        return
    } else if (dotNavPosition > currentPosition) {
        while (!(dotNavPosition == currentPosition)) {
            handleRight()
        }
    } else if (dotNavPosition < currentPosition) {
        while (!(dotNavPosition == currentPosition)) {
            handleLeft()
        }
    }
}

let position = 0
let currentPosition = 2

const dotNavContainer = document.getElementById('dotNavContainer')
let dotNavs = []
let imageContainers = document.getElementsByClassName('sliderContainer')

initContainers()
initPositionDisplay()

leftButton.addEventListener('click', handleLeft)
rightButton.addEventListener('click', handleRight)

dotNavs.forEach((dot) => {
    dot.addEventListener('click', () => {
        dotNavHandler(dot)
    })
})

window.addEventListener('keydown', (e) => {
    let keyCode = e.key

    switch (keyCode) {
        case 'ArrowLeft':
            handleLeft()
            break
        case 'ArrowRight':
            handleRight()
            break
    }
})
