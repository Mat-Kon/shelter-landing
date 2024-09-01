window.onload = () => {
    openedClosedMenu();
    changePageNumber();
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
    console.log(card)
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
    const petsInfo = '../src/data.json';
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

//Pagination

const firstPage = document.querySelector('.navigation__two-prev'),
    prevPage = document.querySelector('.navigation__prev'),
    nextPage = document.querySelector('.navigation__next'),
    lastPage = document.querySelector('.navigation__two-next'),
    numberPage = document.querySelector('.page-number');
    let page = 1;
    numberPage.textContent = page;

    window.onresize = () => {
        page = 1;
        numberPage.textContent = page;
        buttonChangState();
    }

const changeCards = () => {
    const pageContent = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');

    for (let i = 0; i < cards.length; i++) {
        pageContent.insertBefore(cards[i],cards[Math.floor(Math.random() * 8)])
    }
}

function changePageNumber () {
    firstPage.addEventListener('click', (event) => {
        page = 1
        numberPage.textContent = page;
        buttonChangState();
        changeCards();
    });
    nextPage.addEventListener('click', (event) => {
        page++
        if (page >= getMaxPagNumber()) {
            page = getMaxPagNumber();
            }
        numberPage.textContent = page;
        buttonChangState();
        changeCards();
    });
    lastPage.addEventListener('click', (event) => {
        page = getMaxPagNumber()
        numberPage.textContent = page;
        buttonChangState();
        changeCards();
    })
    prevPage.addEventListener('click', (event) => {
        page--
        if (page <= 1) {
            page = 1;
        }
        numberPage.textContent = page;
        buttonChangState();
        changeCards();
    })
}

const buttonChangState = () => {
    if (page > 1) {
        firstPage.classList.add('active');
        prevPage.classList.add('active');
    } else if (page === 1) {
        firstPage.classList.remove('active');
        prevPage.classList.remove('active');
    }
    if (page === getMaxPagNumber()) {
        lastPage.classList.remove('active');
        nextPage.classList.remove('active');
    } else {
        lastPage.classList.add('active');
        nextPage.classList.add('active');
    }
}

function getMaxPagNumber () {
    let widthScreen = document.documentElement.clientWidth;

    if (widthScreen > 768) {
        return 6;
    } else if (widthScreen <= 768 && widthScreen > 500) {
        return 8;
    } else if (widthScreen <= 500) {
        return 16
    }
}