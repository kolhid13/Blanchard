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
    const menuBody = document.querySelector('.menu__header');
    if (iconMenu){
        iconMenu.addEventListener('click', function(e){
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }
    
    // раскрытие формы поиска
    const iconSearch = document.querySelector('.header-search__icon');
    const searchWrapper = document.querySelector('.header-search__form');
    const btnSearch = document.querySelector('.btn-search');
    const searchWrapperClose = document.querySelector('.header-search-form__close');
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
    document.querySelectorAll(".hero--menu-btn").forEach(item => {
        item.addEventListener("click", function() {
        let btn = this;
        let dropdown = this.parentElement.querySelector(".sub-menu-wraper");
        let arrow = this.parentElement.querySelector(".hero-menu__arrow");
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
    if (!target.closest(".hero-menu__list")) {
        document.querySelectorAll(".sub-menu-wraper").forEach(el => {
            el.classList.remove("active-list--item");
        })
        document.querySelectorAll(".list--item__btn").forEach(el => {
            el.classList.remove("active--btn");
        });
        document.querySelectorAll(".hero-menu__arrow").forEach(el => {
            el.classList.remove("_active");
        });
    }
    })

    // симплбар
    document.querySelectorAll('.sub-menu__list').forEach(el =>{
        new SimpleBar(el, {
            autoHide: false,
            scrollbarMaxSize: 28
        })
    });

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
            grid: {
            rows: 2,
            },
            pagination: {
                el: ".swiper-gallery__pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-gallery-button__next",
                prevEl: ".swiper-gallery-button__prev",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3,
                    slidesPerGroup: 12,
                    spaceBetween: 50,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 6,
                    spaceBetween: 34,
                },
                425: {
                    slidesPerView: 1,
                    slidesPerGroup: 2,
                    grid: {
                        rows: 1,
                        },
                    },
                },
        });
        // модальные окна
        const modalBtns =  document.querySelectorAll('.gallery-slider__image');
        modalBtns.forEach((el) =>{
            el.addEventListener('click', (e) => {
                let path = e.currentTarget.getAttribute('data-path');
                document.querySelector(`[data-target="${path}"]`).classList.add('modals--visible');
                document.querySelectorAll('.modal__shadow').forEach(function(modalsShadow){
                    modalsShadow.classList.add('modal__shadow-visible');
                })
            })
        });
        document.querySelectorAll('.modal__close').forEach(function(modalsClose){
            modalsClose.addEventListener('click', function(event){
            document.querySelectorAll('.modals').forEach(function(modalContent){                           
                modalContent.classList.remove('modals--visible');                            
                })
            });
        });

        // чекбокс на 320px
        function checkboxToggle() {
            let btn = document.querySelector(".checkbox__title");
            let labels = document.querySelectorAll(".checkbox__label");
            let listLabels = document.querySelector(".checkbox__list");
            btn.addEventListener("click", toggleSpoiler);
            btn.addEventListener("keyup", function(e) {
            console.log(e.key);
                if (e.code === "Enter") {
                    toggleSpoiler();
                }
            });
            
            
        function toggleSpoiler() {
            if (!listLabels.classList.contains("checklist-active")) {
            listLabels.classList.add("checklist-active");
            labels.forEach(item => {
            // item.classList.add("checkbox--label-active");
                animationItem(item, "checkbox__label-active", "animation-test", "add");
            })
            } else {
            listLabels.classList.remove("checklist-active");
            labels.forEach(item => {
                if (item.querySelector(".real__checkbox").checked) {
                animationItem(item, "checkbox__label-active", "animation-test", "add");
                } else {
                animationItem(item, "checkbox__label-active", "animation-test", "remove");
                }
                });
            }
            labels.forEach(item => {
            item.addEventListener("click", function() {
                    if (!listLabels.classList.contains("checklist-active")) {
                    animationItem(this, "checkbox__label-active", "animation-test", "remove");
                    }
                });
            })
        }
        function animationItem(item, class1, class2, f) {
        if (f === "add") {
            item.classList.add(class1);
            setTimeout(function() {
            item.classList.add(class2)
            }, 100);    
        } else {
            item.classList.remove(class2);
            setTimeout(function() {
            item.classList.remove(class1)
            }, 300);
            }    
        }    
        }
        checkboxToggle();


    // табы в каталоге
    var tabs = document.getElementsByClassName("catalog-tab");
    var actives = document.getElementsByClassName("tab-active");
    for (i = 0; tabs.length > i; i++){
        tabs[i].onclick = function(){
            var currentActive = actives[0];
            if (currentActive)
            currentActive.classList.remove("tab-active");

            if (currentActive !==this)
            this.classList.add("tab-active");
        };
    }

    document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn){
        tabsBtn.addEventListener('click', function(event){
            const path = event.currentTarget.dataset.path
            document.querySelectorAll('.tab__content').forEach(function(tabContent){
            tabContent.classList.remove('tab-content-active')
            })
        document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
        })
    });

    document.querySelectorAll('.tabs-btn__artist').forEach(function(tabsBtnArt){
        tabsBtnArt.addEventListener('click', function(event){
            const path = event.currentTarget.dataset.path

            document.querySelectorAll('.tab-artist').forEach(function(tabContentArt){
                tabContentArt.classList.remove('tab-artist-active')
            })
            document.querySelector(`[data-target="${path}"]`).classList.add('tab-artist-active')
        })
    });



// акардионы
    $('#accordion-france').accordion({
        collapsible: true,
        heightStyle: "content",
    });

    $('#accordion-germany').accordion({
        collapsible: true,
        heightStyle: "content",
    });
    $('#accordion-italy').accordion({
        collapsible: true,
        heightStyle: "content",
    });
    $('#accordion-russia').accordion({
        collapsible: true,
        heightStyle: "content",
    });
    $('#accordion-belgium').accordion({
        collapsible: true,
        heightStyle: "content",
    });
    
    // раскрыте евентов
    document.querySelectorAll('.event__btn').forEach(function(tabsBtn){
        tabsBtn.addEventListener('click', function(event){
            const eventContDop = document.querySelector('.event__content')
            document.querySelectorAll('.event__btn').forEach(function(eventBtn){
                eventBtn.classList.add('event-btn__active')
            })            
            eventContDop.classList.add('show-all')
        })
    });
    // евент слайдер
    if (window.matchMedia('(max-width: 425px)').matches){
        new Swiper('.event__slider', {
                
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 27,
                    grid: {
                        rows: 1,
                        },
                    },    
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
        // слайдер публикаций
        if (window.matchMedia('(min-width: 767px)').matches){
            new Swiper('.publications__slider', {   
                slidesPerView: 3,
                slidesPerGroup: 2,
                spaceBetween: 50,
                breakpoints: {
                    1200: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 50,
                        },
                    767: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 17,
                        },
                },
                pagination: {
                    el: ".swiper-publications__pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".swiper-publications-button__next",
                    prevEl: ".swiper-publications-button__prev",
                },
            });    
        }
        // слайдер проектов   
    new Swiper('.projects__slider', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        breakpoints: {
        1200: {
            slidesPerView: 2,
            slidesPerGroup: 2,
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
            nextEl: ".swiper-projects-button__next",
            prevEl: ".swiper-projects-button__prev",
            },
    });

   



    document.querySelectorAll('.checkbox__title').forEach(function(eventBtn){
        eventBtn.addEventListener('click', function(event){
                eventBtn.classList.toggle('is-open')
            })
        })

        // тултипы

        document.querySelectorAll('.tooltip').forEach(function(eventBtn){
            eventBtn.addEventListener('click', function(event){
                    eventBtn.classList.toggle('_active')
                })
    
            })
            document.querySelectorAll('.tooltip-md').forEach(function(eventBtn){
                eventBtn.addEventListener('click', function(event){
                        eventBtn.classList.toggle('_active')
                    })
    
                })
            document.querySelectorAll('.tooltip-xs').forEach(function(eventBtn){
                eventBtn.addEventListener('click', function(event){
                        eventBtn.classList.toggle('_active')
                })
    
            })
    
        tippy('.tooltip', {
            content: 'Global content',
            trigger: 'click',
            theme: 'tooltip',
            offset: [0, 12],
            maxWidth: 264,
            });
            tippy('.tooltip-md', {
            content: 'Global content',
            arrow: false,
            trigger: 'click',
            theme: 'tooltip',
            offset: [0, 12],
            maxWidth: 264,
            });
    
            tippy('.tooltip-xs', {
            content: 'Global content',
            arrow: false,
            trigger: 'click',
            theme: 'tooltip-xs',
            offset: [0, 12],
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
        
        validateForms('.form', {name: {required: true, minLength: 3, maxLength: 15}, tel: {required: true,}}, {name: {minLength:'Имя должно быть длинее 3 символов', maxLength:'Имя должно быть короче 15 символов',}, tel: 'неверный формат',},'.thanks_popup', 'send goal');
        
        
        

// карта
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.762242, 37.617078],
            zoom: 14
        });
        var myMap1 = new ymaps.Map("map-1", {
            center: [55.761695, 37.596965],
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

    var myPlacemark1 = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout:  'default#image',
    iconImageHref: 'point__map.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [-3, -42]
    });
    
    myMap.geoObjects.add(myPlacemark); 
    myMap1.geoObjects.add(myPlacemark1); 
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
        const catlogLinks = document.querySelectorAll('.artist-name__item[data-goto');
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