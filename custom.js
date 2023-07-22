let processScroll = () => {
    let docElem = document.documentElement, 
      docBody = document.body,
      scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
      scrollPercent = scrollTop / scrollBottom * 100 + '%';
    
      document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent); 

      revealHighlights();
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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
  document.addEventListener('scroll', processScroll);