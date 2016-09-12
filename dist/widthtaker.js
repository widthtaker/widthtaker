'use strict';

/*!
 * widthtaker.js
 * Version: 0.1.0
 * Copyright 2016 Bogdan Pestritu
 * MIT license
 *
 * Usage:
 *  Include the script in the html, or bower install.
 *
 *  __HTML Classes__
 *  Add `widthtaker` class to the text container whose text you want spaced.
 *  The container should have the target width that you want the text to take.
 *  If you need more control over the target width, use JS.
 *
 *
 *
 *  __JS__
 *  If you need more control of the width, you can call the `widthtaker` function
 *  with one or multiple arrays with the element you want spaced on the first
 *  position and the target width element on the second:
 *
 *  ```
 *  widthtaker([elem, widthEl]);
 *  // or
 *  widthtaker([elem1, widthEl1], [elem2, widthEl2],...);
 *  ```
 *
 */
(function (window, document, globalName) {
  'use strict';

  // TODO: resize if font-family changed, first load
  // TODO: resize if screen resize
  // TODO: bower install
  // TODO: check if jquery or vanilla elements passed
  // TODO: don't add negative letter-spacing
  // TODO: add padding option

  var elems = [];
  init();

  function init() {
    getDOMElements();
    addEventListeners();
  }

  function getDOMElements() {
    var els = document.getElementsByClassName('widthtaker');
    console.log('saving DOM elements');

    if (els.length > 0) {
      for (var i = 0; i < els.length; i++) {
        elems.push([els[i], els[i]]);
      }
    }
    console.log('DOM elems: ', elems);
  }

  function addEventListeners() {
    window.addEventListener("load", function () {
      console.log('Assets finished loading, resizing text...');
      resizeText(elems);
    });

    window.addEventListener("resize", debounce(function () {
      console.log('Window resized, resizing text...');
      resizeText(elems);
    }, 500));
  }

  function resizeText(elems) {
    for (var i = 0; i < elems.length; i++) {
      var contW = elems[i][1].offsetWidth;
      adjustSpacing(elems[i][0], contW);
    }
  }

  function adjustSpacing(elem, targetWidth) {
    var childrenEls = elem.children;

    for (var i = 0; i < childrenEls.length; i++) {
      var oldProperties = reset(childrenEls[i]),
          elWidth = childrenEls[i].offsetWidth,
          charNo = childrenEls[i].innerHTML.length,
          charWidth = elWidth / charNo,
          remainingSpace = targetWidth - elWidth,
          ltrSpacing = remainingSpace / (charNo - 1);

      // let spanStyles = window.getComputedStyle(spanEls[i]);

      console.log('elWidth: ', elWidth);
      console.log('charNo: ', charNo);
      console.log('charWidth: ', charWidth);
      console.log('remainingSpace: ', remainingSpace);
      console.log('ltrSpacing: ', ltrSpacing);

      childrenEls[i].style.color = 'red';
      childrenEls[i].style.letterSpacing = ltrSpacing + 'px';
      //spanEls[i].style.textIndent = ltrSpacing + 'px';
      childrenEls[i].style.display = 'inline';

      console.log('++++++++++++++++++++++++++++++++++');
    }
  }

  function reset(el) {
    var elStyles = window.getComputedStyle(el),
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
  }

  function debounce(func, wait) {
    var timeout;

    return function () {
      var context = this,
          args = arguments;
      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  window[globalName] = function () {
    for (var i = 0; i < arguments.length; i++) {
      elems.push(arguments[i]);
    }

    console.log('user elems: ', elems);
  };
})(window, document, 'widthtaker');