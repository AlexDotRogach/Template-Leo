//tabs

document.addEventListener('DOMContentLoaded', () => {

    const next = document.querySelector('.next'),
          back = document.querySelector('.back'),
          intr = document.querySelectorAll('.intorduc span');

    function nextTab(but) {

        but.addEventListener('click', () => {

            for (let i = 0; i < intr.length; i++) {

                if (!intr[i].nextElementSibling) {
                    intr[i].classList = '';
                    anim(intr[0]);
                    intr[0].classList = 'span__active';
                }


                if (intr[i].classList == 'span__active') {

                    anim(intr[i].nextElementSibling);
                    intr[i].nextElementSibling.classList.add('span__active');
                    intr[i].classList = '';
                    return;
                }
            }
        });
    }

    function backTab(but) {
        
        but.addEventListener('click', () => {

            for (let i = 0; i < intr.length; i++) {

                if (intr[i].classList == 'span__active' && i == 0) {
                    anim(intr[intr.length - 1]);
                    intr[intr.length - 1].classList = 'span__active';
                    intr[i].classList = '';
                    break;
                }

                if (intr[i].classList == 'span__active') {
                    anim(intr[i].previousElementSibling);
                    intr[i].previousElementSibling.classList = 'span__active';
                    intr[i].classList = '';
                    break;
                }
            }
        });
    }

    function anim(elem) {
        let i = 1;

        insideAnim();

        function insideAnim() {

            if (i >= 10) {
                elem.style.opacity = 1;
                return;
            } else {
                elem.style.opacity = `0.${i}`;
                i += 0.4;
                requestAnimationFrame(insideAnim);
            }
        }
    }
    
    nextTab(next);
    backTab(back);
});
