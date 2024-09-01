window.onload = () => {
    openedClosedMenu();
}
//Hamburger menu
const openedClosedMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.header__menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('open-burger');
    });
    menu.addEventListener('click', function(){
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('open-burger');
    })

}

//Popups animal card
const getNameAnimal = (card) => {
    return card.currentTarget.children[1].textContent.toLowerCase();
}

const openPopup = () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', (event) => {
            document.querySelector('.modal').classList.add('active');
            getPetsInfo(getNameAnimal(event));
            document.body.classList.toggle('open-popup');
        });
    });
}
openPopup();

const closePopup = () => {
    const closeBtn = document.querySelector('.modal__close-btn');
    const modal = document.querySelector('.modal');

    closeBtn.addEventListener('click', (event) => {
        modal.classList.remove('active');
        document.body.classList.toggle('open-popup');
    })
    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal active') {
            modal.classList.remove('active');
            document.body.classList.toggle('open-popup');
        }
    })
}
closePopup();

async function getPetsInfo(name) {
    const petsInfo = '../../src/data.json';
    const res = await fetch(petsInfo);
    const data = await res.json();

    const animalImg = document.querySelector('.animal__imag'),
      animalName = document.querySelector('.animal__name'),
      animalType = document.querySelector('.animal__type'),
      animalDescription = document.querySelector('.animal__description'),
      animalAge = document.querySelector('.age'),
      animalInoculations = document.querySelector('.inoculations'),
      animalDiseases = document.querySelector('.diseases'),
      animalParasites = document.querySelector('.parasites');

    for (let key of data) {
        if(key.name.toLowerCase() === name) {
            animalImg.innerHTML = `<img src="${key.img}" alt="animal-photo" width=100% height=100% style="border-radius: 9px 0 0 9px;">`;
            animalName.textContent = key.name;
            animalType.textContent = `${key.type} - ${key.breed}`;
            animalDescription.textContent = key.description;
            animalAge.textContent = key.age;
            animalInoculations.textContent = key.inoculations;
            animalDiseases.textContent = key.diseases;
            animalParasites.textContent = key.parasites;
        }
    }
}
getPetsInfo();

//Slider
const sliderCards = document.querySelector('.friends-slider__cards');
sliderCards.style.transform = 'translate3d(0px, 0px, 0px)';
let index = 0;

document.querySelector('.friends-slider__buttons').addEventListener('click', (event) => {

    if (event.target.classList.contains('friends-slider__next')) {
        nextSlide()
        getStepSlide(index, getCardWidth());
    }
    if (event.target.classList.contains('friends-slider__prev')) {
        prevSlide()
        getStepSlide(index, getCardWidth());
    }
});

function getStepSlide (step, Width) {
    sliderCards.style.transform = `translate3d(-${step * Width}px, 0px, 0px)`;
}

function getCardWidth () {
    let cardWidth = document.querySelector('.card').offsetWidth;
    let widthScreen = document.documentElement.clientWidth;

    if (widthScreen > 768) {
        cardWidth = cardWidth + 90;
    } else if (widthScreen <= 768 && widthScreen > 500) {
        cardWidth = cardWidth + 45;
    }
    return cardWidth
}

const nextSlide = () => {
    let widthScreen = document.documentElement.clientWidth;
    const cards = document.querySelectorAll('.card');

    if (widthScreen > 768) {
        index = index + 3;
    } else if (widthScreen <= 768 && widthScreen > 500) {
        index = index + 2;
    } else if (widthScreen <= 500) {
        index++;
    }
    if (index > cards.length-1)  {
        index = 0;
    }
}

function prevSlide () {
    let widthScreen = document.documentElement.clientWidth;
    const cards = document.querySelectorAll('.card');

    if (widthScreen > 768) {
        index = index - 3;
    } else if (widthScreen <= 768 && widthScreen > 500) {
        index = index - 2;
    } else if (widthScreen <= 500) {
        index--;
    }
    if (index < 0)  {
        index = cards.length-2;
    }
}
