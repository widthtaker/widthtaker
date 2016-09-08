/*!
 * widthtaker.js
 * Version: 0.1.0
 * Copyright 2016 Bogdan Pestritu
 * MIT license
 *
 * Usage:
 *  Include the script in the html, or bower install
 *
 *  Add widthtaker class to the text container you want spaced
 *
 * *Optional* Add widthtaker-size to space based on this element's size
 */
((window, document) => {
  'use strict';

  // TODO: get class for target width
  //       if no class specified, take the width of the container
  // TODO: get class for target elements to be spaced
  //       should contain spans for each row (best way?)
  // TODO: resize if font-family changed, first load
  // TODO: resize if screen resize

  function  Widthtaker() {
    console.log('widthtaker init');
    this.resizeText();

    setTimeout(() => {
      this.resizeText();
    }, 1000);
  }

  Widthtaker.prototype.resizeText = function() {
    let pEls = document.getElementsByClassName('widthtaker')[0].children,
        targetWidth = document.getElementsByClassName('widthtaker-size')[0].offsetWidth;

    for (var i = 0; i < pEls.length; i++) {
      let spanEls = pEls[i].getElementsByTagName('span')[0];
      this.reset(spanEls);

      let elWidth = spanEls.offsetWidth,
          charNo = spanEls.innerHTML.length,
          charWidth = elWidth / charNo,
          remainingSpace = targetWidth - elWidth,
          ltrSpacing = remainingSpace / (charNo - 1);

      // let spanStyles = window.getComputedStyle(spanEls[i]);

      console.log('elWidth: ', elWidth);
      console.log('charNo: ', charNo);
      console.log('charWidth: ', charWidth);
      console.log('remainingSpace: ', remainingSpace);
      console.log('ltrSpacing: ', ltrSpacing);

      spanEls.style.color = 'red';
      spanEls.style.letterSpacing = ltrSpacing + 'px';
      //spanEls[i].style.textIndent = ltrSpacing + 'px';
      spanEls.style.display = 'inline';
    }
    console.log('++++++++++++++++++++++++++++++++++');
  };

  Widthtaker.prototype.reset = function(el) {
    let elStyles = window.getComputedStyle(el),
        elDisplay = elStyles.getPropertyValue('display'),
        elLtrSpacing = elStyles.getPropertyValue('letter-spacing'),
        elTxtIndent = elStyles.getPropertyValue('text-indent');

    el.style.display = 'inline';
    el.style.letterSpacing = '0';
    el.style.textIndent = '0';

    return {
      'display': elDisplay,
      'letter-spacing': elLtrSpacing,
      'text-indent': elTxtIndent
    };
  };

  Widthtaker.prototype.createResizeEvent = function() {
    let ev = document.createEvent('Event');

    ev.initEvent('fontload', true, true);

    return event;
  };

  var widthtaker = new Widthtaker();

})(window, document);
