let processScroll = () => {
    let docElem = document.documentElement, 
      docBody = document.body,
      scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
      scrollPercent = scrollTop / scrollBottom * 100 + '%';
    
      document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent); 

      revealHighlights();
      revealNumbers()
  }

  async function revealHighlights() {
    var highlights = document.querySelectorAll('mark');
    var height = window.innerHeight;

    for(let i = 0; i < highlights.length; i++) {
        var pos =  highlights[i].getBoundingClientRect().bottom;

        if(pos < height - 150 && ! highlights[i].classList.contains('animation')) {
            await sleep(500)
            highlights[i].classList.add('animation')
        }
    }

  }

  async function revealNumbers() {
    var height = window.innerHeight;
    let valueDisplays = document.querySelectorAll(".num");
valueDisplays.forEach((valueDisplay) => {
    var pos =  valueDisplay.getBoundingClientRect().bottom;

    if(pos > height - 150) return;

    if(valueDisplay.classList.contains('registered')) return;
    valueDisplay.classList.add('registered')


    let interval = 10
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let suffix = valueDisplay.getAttribute("data-suffix");
  let duration = Math.floor(interval / endValue);
  let increment = endValue / 345.6;

  let counter = setInterval(function () {
    startValue += increment;
    valueDisplay.textContent = startValue.toLocaleString('en-US', {maximumFractionDigits:0}) + suffix;
    if (startValue >= endValue) {
      clearInterval(counter);
    valueDisplay.textContent = endValue.toLocaleString('en-US', {maximumFractionDigits:0}) + suffix;

    }
  }, duration);
});

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  



  document.addEventListener('scroll', processScroll);