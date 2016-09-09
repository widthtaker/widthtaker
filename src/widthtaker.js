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
 *  __JS__
 * If you need more control of the width, you can call the `widthtaker` function
 * with one or multiple arrays with the element you want spaced on the first
 * position and the target width element on the second:
 *
 * ```
 * widthtaker([elem, widthEl]);
 * // or
 * widthtaker([elem1, widthEl1], [elem2, widthEl2],...);
 * ```
 *
 */
((window, document, globalName) => {
  'use strict';

  // TODO: resize if font-family changed, first load
  // TODO: resize if screen resize
  // TODO: bower install
  // TODO: check if jquery or vanilla elements passed

  var elems = [];
  init();

  function init() {
    getDOMElements();
    addEventListeners();
  }

  function getDOMElements() {
    let els = document.getElementsByClassName('widthtaker');
    console.log('saving DOM elements');

    if(els.length > 0) {
      for (let i = 0; i < els.length; i++) {
        elems.push([els[i], els[i]]);
      }
    }
    console.log('DOM elems: ', elems);
  }

  function addEventListeners() {
    window.addEventListener("load", function() {
      console.log('Assets finished loading, resizing text...');
      resizeText(elems);
    });

    // TODO: add debouncer
    window.addEventListener("resize", function() {
      console.log('Window resized, resizing text...');
      resizeText(elems);
    });
  }

  function resizeText(elems) {
    for (let i = 0; i < elems.length; i++) {
      let contW = elems[i].parentNode.offsetWidth;
      adjustSpacing(elems[i], contW);
    }
  }

  function adjustSpacing(elem, elemW) {
    let childrenEls = elem.children,
        targetWidth = elemW.offsetWidth;

    for (var i = 0; i < childrenEls.length; i++) {
      let oldProperties = reset(childrenEls[i]),
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
  }

  function createCustomEvent(evName) {
    let ev = document.createEvent('Event');

    ev.initEvent(evName, true, true);

    return ev;
  }

  function addEvents(elems, event, eventName, cb) {
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener(eventName, () => {
        cb();
      }, false);

      elems[i].dispatchEvent(event);
    }
  }

  window[globalName] = function() {
    for (let i = 0; i < arguments.length; i++) {
      elems.push(arguments[i]);
    }

    console.log('user elems: ', elems);
  };

})(window, document, 'widthtaker');
