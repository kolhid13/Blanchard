$(document).ready(function(){
    // слайдер в хедере
    new Swiper('.hero-slider', {
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 10,
        speed: 6000,
        autoplay: {
            delay: 6000
        },
            effect: "fade",
            allowTouchMove: false,
    });

    // раскрытие бургера
    const iconMenu = document.querySelector('.header__burger');
    const menuBody = document.querySelector('.menu-header');
    if (iconMenu){
        iconMenu.addEventListener('click', function(e){
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }
    
    // раскрытие формы поиска
    const iconSearch = document.querySelector('.header-search-icon');
    const searchWrapper = document.querySelector('.header-search-form');
    const btnSearch = document.querySelector('.btn-search');
    const searchWrapperClose = document.querySelector('.header-search-form-close');
    const toggleMenu = function(){
        searchWrapper.classList.toggle('_active');
    }

    btnSearch.addEventListener('click', function(e){
        e.stopPropagation();
        toggleMenu();
    });

    iconSearch.addEventListener('click', function(e){
        e.stopPropagation();
        toggleMenu();
    });


    document.addEventListener('click', function(e){
        const target = e.target;
        const its_searchWrapper = target == searchWrapper || searchWrapper.contains(target);
        const its_btnSearch = target == btnSearch;
        const searchWrapper_is_active = searchWrapper.classList.contains('_active');
        if (!its_searchWrapper && !its_btnSearch && searchWrapper_is_active){
            toggleMenu();
        }

    });

    searchWrapperClose.addEventListener('click', function(e){
        searchWrapper.classList.toggle('_active');
    });

    // раскрытие выпадающего списка
    document.querySelectorAll(".hero-menu-btn").forEach(item => {
        item.addEventListener("click", function() {
        let btn = this;
        let dropdown = this.parentElement.querySelector(".sub-menu-wraper");
        let arrow = this.parentElement.querySelector(".hero-menu-arrow");
        document.querySelectorAll(".list--item__btn").forEach(el => {
        if (el != btn) {
            el.classList.remove("active--btn");
        }
        });
        
        document.querySelectorAll(".sub-menu-wraper").forEach(el => {
        if (el != dropdown) {
            el.classList.remove("active-list--item");
        }
        })
        dropdown.classList.toggle("active-list--item");
        btn.classList.toggle("active--btn");
        arrow.classList.toggle("_active");
    })
    })
    
    document.addEventListener("click", function(e) {
    let target = e.target;
    if (!target.closest(".hero-menu-list")) {
        document.querySelectorAll(".sub-menu-wraper").forEach(el => {
            el.classList.remove("active-list--item");
        })
        document.querySelectorAll(".list--item__btn").forEach(el => {
            el.classList.remove("active--btn");
        });
        document.querySelectorAll(".hero-menu-arrow").forEach(el => {
            el.classList.remove("_active");
        });
    }
    })

    // симплбар
    document.querySelectorAll('.sub-menu-list').forEach(el =>{
        new SimpleBar(el, {
            autoHide: false,
            scrollbarMaxSize: 28
        })
    });
    if (window.matchMedia('(max-width: 425px)').matches){
    document.querySelectorAll('.header-nav').forEach(el =>{
        new SimpleBar(el, {
            autoHide: false,
            scrollbarMaxSize: 28
        })
    });
    }

// селект в галлерее
    var element = document.querySelector('#SelectPainting');
    var choices = new Choices(element, {
        silent: false,
        searchEnabled: false,
        itemSelectText: '',
        duplicateItemsAllowed: true,
        maxItemCount: 6,
        shouldSort: false,

        }
        
    );

    // прокрутка для ссылок в хедере
    const menuLinks = document.querySelectorAll('.header__link[data-goto');
    if(menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', onMenuLinkClick);
        });
    
        function onMenuLinkClick(e) {
            const menuLink = e.target;
            if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
                
                if(iconMenu.classList.contains('_active')){
                    document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }
    
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }
    
        // прокрутка для кнопки в херо
        const btnLinks = document.querySelector('.hero__btn[data-goto');
        btnLinks.addEventListener('click', onBtnLinkClick);
    
        function onBtnLinkClick(e) {
            const btnLink = e.target;
            if(btnLink.dataset.goto && document.querySelector(btnLink.dataset.goto)){
                const gotoMap = document.querySelector(btnLink.dataset.goto);
                const gotoMapValue = gotoMap.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
    
                if(iconMenu.classList.contains('_active')){
                    document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }
    
                window.scrollTo({
                    top: gotoMapValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }

        // слайдер в галлерее
        new Swiper('.gallery__slider', {
            infinite: false,
            dots: false,
            autoplay: false,
            pagination: {
                el: ".swiper-gallery-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-gallery-button-next",
                prevEl: ".swiper-gallery-button-prev",
            },
            breakpoints: {
                1920: {
                    slidesPerView: 3,
                    slidesPerGroup: 6,
                    spaceBetween: 50,
                },
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 6,
                    spaceBetween: 35,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 6,
                    spaceBetween: 34,
                },
                425: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    },
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    },
                },
        });
        // модальные окна
        const modalBtns =  document.querySelectorAll('.gallery-slider-slide');
        modalBtns.forEach((el) =>{
            el.addEventListener('click', (e) => {
                let path = e.currentTarget.getAttribute('data-path');
                document.querySelector(`[data-target="${path}"]`).classList.add('modals--visible');
                document.querySelectorAll('.modal-shadow').forEach(function(modalsShadow){
                    modalsShadow.classList.add('modal-shadow-visible');
                })
                document.body.classList.add('disable-scroll');
            })
        });
        document.querySelectorAll('.modal-close').forEach(function(modalsClose){
            modalsClose.addEventListener('click', function(event){
            document.querySelectorAll('.modals').forEach(function(modalContent){                           
                modalContent.classList.remove('modals--visible');                            
                })
                document.body.classList.remove('disable-scroll');
            });
                
        });



// акардионы

    $('#accordion-italy').accordion({
        collapsible: true,
        heightStyle: "content",
    });

    // табы в каталоге

    document.querySelectorAll('.artist-name-focus').forEach(function(tabsBtnArt){
        tabsBtnArt.addEventListener('click', function(event){
            const path = event.currentTarget.dataset.path

            document.querySelectorAll('.tab-artist').forEach(function(tabContentArt){
                tabContentArt.classList.remove('tab-artist-active')
            })
            document.querySelector(`[data-target="${path}"]`).classList.add('tab-artist-active')
        })
    });
        //  активный писатель
        const items = document.querySelectorAll('.artist-name-focus');

            for (let i = 0; i < items.length; i++) {
            const item = items[i];

            item.addEventListener("click", () => {
                for (let i = 0; i < items.length; i++) {
                const item = items[i];
                item.classList.remove("artist-name-active");
                }

                item.classList.add("artist-name-active");
            });
            }
        

    // евент слайдер

        new Swiper('.event__slider', {
            
            breakpoints: {
                1920: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 50,
                    
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 27,
                    
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                },
                425: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 15,
                    },
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 15,
                    },
                },   
                pagination: {
                    el: ".event-slider-pagination",
                    clickable: true,
                    
                },
                navigation: {
                    nextEl: ".swiper-event-button-next",
                    prevEl: ".swiper-event-button-prev",
                },
        });
    

        // слайдер проектов   
    new Swiper('.projects__slider', {
        breakpoints: {
        1920:{
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 50,
            },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 50,
            },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 36,
            },
        425: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            },
        },
        navigation: {
            nextEl: ".swiper-projects-button-next",
            prevEl: ".swiper-projects-button-prev",
            },
    });

    document.querySelectorAll('.checkbox__title').forEach(function(eventBtn){
        eventBtn.addEventListener('click', function(event){
                eventBtn.classList.toggle('is-open')
            })
        })

            tippy('.tooltip', {
                content: 'Global content',
                trigger: 'click',
                theme: 'tooltip',
                offset: [0, 12],
                arrow: false,
                maxWidth: 264,
                });
        

// валидация формы
        let selector = document.querySelectorAll('input[type="tel"');
        let im = new Inputmask('+7 (999) 999-99-99');
        
        im.mask(selector);
        
        let validateForms = function(selector, rules, messages, succesmodal, yaGoal){
            new window.JustValidate(selector, {
                rules: rules, 
                messages: messages,
                
                submitHandler: function(form){
                    let formData  = new FormData(form);
                    console.log(formData);
                    let xhr = new XMLHttpRequest();
        
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState === 4){
                            if (xhr.status === 200){
                                console.log('отправлено');
                            }
                        }
                    }
        
                    xhr.open('POST', 'sendmail.php', true);
                    xhr.send(formData);
        
                    form.reset();
                }
            });
        }
        
        validateForms('.form', 
        {name: 
            {
                required: true, 
                minLength: 3, 
                maxLength: 15, 
                strength: 
                    {custom: '/^[a-zA-Zа-яА-Я]/'}
                }, 
        tel: 
            {
                required: true,
            }
        }, 
        {name: 
            {
                required:'Недопустимый формат',
                minLength:'Имя должно быть длинее 3 символов', 
                maxLength:'Имя должно быть короче 15 символов', 
                strength: 'Недопустимый формат',
            },
             tel: 'Недопустимый формат',
            },'.thanks_popup', 'send goal');
        
        
        

// карта
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.758468, 37.601088],
            zoom: 14
        });
        var myGeoObject1 = new ymaps.GeoObject({
        geometry: {
        type: "Point", // тип геометрии - точка
        coordinates: [55.758468, 37.601088] // координаты точки
        
    }
    });
    var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
        iconLayout:  'default#image',
        iconImageHref: 'point__map.svg',
        iconImageSize: [20, 20],
        iconImageOffset: [-3, -42]
        });


    myMap.geoObjects.add(myPlacemark); 
    }



                


// прокрутки на сайте
    const galleryLinks = document.querySelectorAll('.empty__link[data-goto');
    if(galleryLinks.length > 0) {
        galleryLinks.forEach(galleryLink => {
            galleryLink.addEventListener('click', galleryLinksClick);
        });

        function galleryLinksClick(e) {
            const galleryLink = e.target;
            if(galleryLink.dataset.goto && document.querySelector(galleryLink.dataset.goto)){
                const gotoGallery = document.querySelector(galleryLink.dataset.goto);
                const gotoGalleryValue = gotoGallery.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                window.scrollTo({
                    top: gotoGalleryValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
    }                

    if (window.matchMedia('(max-width: 425px)').matches){
        const catlogLinks = document.querySelectorAll('.artist-name-focus[data-goto');
        if(catlogLinks.length > 0) {
            catlogLinks.forEach(catlogLink => {
                catlogLink.addEventListener('click', catlogLinksClick);
            });

            function catlogLinksClick(e) {
                const catlogLink = e.target;
                if(catlogLink.dataset.goto && document.querySelector(catlogLink.dataset.goto)){
                    const gotoArtist = document.querySelector(catlogLink.dataset.goto);
                    const gotoArtistValue = gotoArtist.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                    window.scrollTo({
                        top: gotoArtistValue,
                        behavior: "smooth"
                    });
                    e.preventDefault();
                }
            }
        }
    }

   



});