window.addEventListener('DOMContentLoaded', function () {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');

        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    /* Таймер */
    let deadline = '2021-01-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            hours.textContent = t.hours;
            if (t.minutes > 9) {
                minutes.textContent = t.minutes;
            } else {
                minutes.textContent = '0' + t.minutes;
            }

            if (t.seconds > 9) {
                seconds.textContent = t.seconds;
            } else {
                seconds.textContent = '0' + t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                let timeAction = document.querySelector('.timer-action');
                timeAction.textContent = 'Акция подошла к концу!';
            }
        }

    }

    setClock('timer', deadline);


    /* модальное окно */

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        knowleage = document.getElementsByClassName('.description-btn');



    function openForm() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    function closeForm() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    more.addEventListener('click', openForm);
    close.addEventListener('click', closeForm);

    /* Отправка Формы на сервер без перезагрузки */
    let message = {
        loading: 'Загрука...',
        success: 'Спасибо! Мы скоро с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let formData = new FormData(form);

        function postData(data) {
            return new Promise(function (resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                let obj = {};
                formData.forEach(function (value, key) {
                    obj[key] = value;
                });
                let json = JSON.stringify(obj);

                request.send(json);

                request.addEventListener('readystatechange', function () {
                    if (request.readyState < 4) {
                        resolve();
                    } else if (request.readyState == 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
        } // end PostData

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        }

        postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() => statusMessage.innerHTML = message.success)
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput);
    });


    /* Отправка контактной формы на сервер без перезагрузки */
    let formSecond = document.querySelector('#form');

    formSecond.addEventListener('submit', function (event) {
        event.preventDefault();
        formSecond.appendChild(statusMessage);

        let request = new XMLHttpRequest();

        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(formSecond);
        console.log(formSecond);

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let rep = JSON.stringify(obj);

        request.send(rep);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState == 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }

    });

    /* Slider */

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');

    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    /* calc */
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('input', function () {
        personsSum = +this.value;

        if (personsSum == '') {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum) * 4000;

            if (restDays.value === '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        }
    });

    restDays.addEventListener('input', function () {
        daysSum = +this.value;

        if (daysSum == '') {
            totalValue.innerHTML = 0;
        } else {
            total = (daysSum + personsSum) * 4000;

            if (persons.value === '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        }

    });

    place.addEventListener('input', function () {
        if (restDays.value === '' && persons.value === '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});