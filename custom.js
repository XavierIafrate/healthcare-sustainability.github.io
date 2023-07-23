let processScroll = () => {
    let docElem = document.documentElement,
        docBody = document.body,
        scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
        scrollPercent = scrollTop / scrollBottom * 100 + '%';

    document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent);

    revealHighlights();
    revealNumbers()
    setMiniMenu();
}

async function setMiniMenu() {
    var contents = document.getElementById("mainMenu");
    var author = document.getElementById("about");

    var miniMenu = document.getElementById('slideOut');
        if(!miniMenu){
            alert('menu is empty')
        }

    if(contents.getBoundingClientRect().bottom < 0 && author.getBoundingClientRect().top> window.innerHeight) {
        miniMenu.classList.add("showSlideOut")
        miniMenu.classList.remove("hideSlideOut")
    }
    else {
        
        miniMenu.classList.remove("showSlideOut")
        miniMenu.classList.add("hideSlideOut")
    }

}

async function revealHighlights() {
    var highlights = document.querySelectorAll('mark');
    var height = window.innerHeight;

    for (let i = 0; i < highlights.length; i++) {
        var pos = highlights[i].getBoundingClientRect().bottom;

        if (pos < height - 150 && !highlights[i].classList.contains('animation')) {
            await sleep(500)
            highlights[i].classList.add('animation')
        }
    }

}

async function revealNumbers() {
    var height = window.innerHeight;
    let valueDisplays = document.querySelectorAll(".num");
    valueDisplays.forEach((valueDisplay) => {
        var pos = valueDisplay.getBoundingClientRect().bottom;

        if (pos > height - 150) return;

        if (valueDisplay.classList.contains('registered')) return;
        valueDisplay.classList.add('registered')


        let interval = 10
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val"));
        let suffix = valueDisplay.getAttribute("data-suffix");
        let duration = Math.floor(interval / endValue);
        let increment = endValue / 345.6;

        let counter = setInterval(function () {
            startValue += increment;
            valueDisplay.textContent = startValue.toLocaleString('en-US', { maximumFractionDigits: 0 }) + suffix;
            if (startValue >= endValue) {
                clearInterval(counter);
                valueDisplay.textContent = endValue.toLocaleString('en-US', { maximumFractionDigits: 0 }) + suffix;

            }
        }, duration);
    });
}

const navigateDocument = e => {
    var tag = e.target.getAttribute('tag');
    if(!tag) return;
    var destinationElement = document.getElementById(tag);

    if(!destinationElement) {
        alert('document location not found');
        return;
    }
    
    var headerOffset = 45;

    if(tag === "about") {
        headerOffset = 0;
    }
    var elementPosition = destinationElement.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
    window.scrollTo({
         top: offsetPosition,
         behavior: "smooth"
    });

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('scroll', processScroll);

var menuButtons = document.querySelectorAll('.contents-item');
menuButtons.forEach(x => document.addEventListener('click', navigateDocument))