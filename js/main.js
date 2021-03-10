document.addEventListener('DOMContentLoaded', () => {

    class MenuToggler {

        constructor(settings) {
            this.btn = document.querySelector(settings.btnSelector);
            this.menu = document.querySelector(settings.menuSelector); /* menu to show */
            this.isChanging = false;

            this.init();
        }


        init() {
            this.btn.addEventListener("click", this.toggleMenuVisibility.bind(this));
            this.btn.addEventListener("touchstart", this.toggleMenuVisibility.bind(this));

            this.menu.addEventListener("transitionend", () => {
                this.isChanging = false;

            });

        }

        toggleMenuVisibility() {

            if (this.menu.classList.contains('menu_show')) {
                this.menu.style.transition = 'opacity .25s linear 0s, height 0s linear .25s';
            } else {

                this.menu.style.transition = 'opacity .25s linear .25s, height 0s linear 0s'
            }

            if (!this.isChanging) {
                this.menu.classList.toggle('menu_show');
                this.btn.classList.toggle('burger_close');
                this.isChanging = true;
            }

        }
    }
    
    const searchTogglerBtn = new MenuToggler({
        btnSelector: '.menu-toggler',
        menuSelector: '.menu'
    });

    const burger1 = new MenuToggler({
            btnSelector: '.nav .burger',
            menuSelector: '.nav .mobile-menu'
        }),
        burger2 = new MenuToggler({
            btnSelector: '.nav-footer .burger',
            menuSelector: '.nav-footer .mobile-menu'
        });

    const searchItems = document.querySelectorAll('.search__option '),
        searchInput = document.querySelector('.select');

    const changeSearchText = (element, isToggling) => {
        searchInput.value = element.textContent;

        if (isToggling) {
            searchTogglerBtn.toggleMenuVisibility();
        }

    }

    changeSearchText(document.querySelector('.frontend'));
    
    const questions = document.querySelectorAll('.hint-trigger');
    for (let i of questions){
        const imgClass = i.classList[3],
              hintClass = i.parentElement.querySelector('.hint').classList[1];
        
        
        const img = document.querySelector(`.${imgClass}`),
              hint = document.querySelector(`.${hintClass}`),
              rootParentOfHint = hint.parentElement.parentElement.parentElement;
        
        console.log(rootParentOfHint);
        img.addEventListener('mouseenter', () => {
            hint.classList.remove('height_0');
            hint.classList.add('hint_show');
        })
        
        rootParentOfHint.addEventListener('mouseleave', () => {
            hint.classList.remove('hint_show');
//            setTimeout(() => {hint.classList.remove('hint_show')}, 5000);
        });
        
        
    }

    for (let el of searchItems) {
        el.addEventListener('click', changeSearchText.bind(this, el, true));
        el.addEventListener('touchstart', changeSearchText.bind(this, el, true));
    }
});
