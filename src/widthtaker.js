/**
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
 *  Given that the input could be an italicized font it can overflow the container,
 *  in that case you can add a manual right padding using JS to get it to fit.
 *
 *  __JS__
 *  If you need more control of the width and padding, you can call the `widthtaker`
 *  function with one or multiple arrays with the element you want spaced on the first
 *  position, the target width element on the second, the padding on both sides (px), and the
 *  right padding for manual fixes (px):
 *
 *  ```
 *  widthtaker([elem, widthEl, 20, 5]);
 *  // or
 *  widthtaker([elem1, widthEl1, 10], [elem2, widthEl2, 0, 5],...);
 *  ```
 *  The elements passed can be either vanilla JS or jQuery.
 */
((window, document, globalName) => {
  'use strict';

  // TODO: bower install

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

    window.addEventListener("resize", debounce(function() {
      console.log('Window resized, resizing text...');
      resizeText(elems);
    }, 500));
  }

  function resizeText(elems) {
    elems.map(function(el) {
      let contW = el[1].offsetWidth,
          minWidth = getMinWidth(el[0]),
          padding = el[2] && isNumber(el[2]) ? el[2] : null,
          paddingRight = el[3] && isNumber(el[3]) ? el[3] : null;

      console.log('minWidth: ', minWidth);
      adjustSpacing(el[0], contW, minWidth, padding, paddingRight);
    });
  }

  function getMinWidth(container) {
    let minWidth = 0,
        spanEls = container.children;

    for(let i = 0; i < spanEls.length; i++) {
      let oldprop = reset(spanEls[i]);

      if(minWidth < spanEls[i].offsetWidth) minWidth = spanEls[i].offsetWidth;

      spanEls[i].style.display = oldprop['display'];
      spanEls[i].style.letterSpacing = oldprop['letter-spacing'];
      spanEls[i].style.textIndent = oldprop['text-indent'];
    }
    return minWidth;
  }

  function adjustSpacing(elem, targetWidth, minWidth, padding, paddingRight) {
    let childrenEls = elem.children;

    console.log('padding: ', padding);

    //262 - 60 - 151 = 111 - 60 = 51
    //262 - 60 - 219 = 262 - 249 = -47
    //dimensiunea finala - padding de ambele parti - dimensiunea textului fara spacing = spatiu disponibil de impartit intre caractere

    for (var i = 0; i < childrenEls.length; i++) {
      let oldProperties = reset(childrenEls[i]),
          elWidth = childrenEls[i].offsetWidth,
          charNo = childrenEls[i].innerHTML.length,
          charWidth = elWidth / charNo,
          remainingSpace = targetWidth - minWidth, // use minWidth for calculations
          ltrSpacing = 0,
          txtIndent;

      console.log('remainingSpace first: ', remainingSpace);

      // check for padding on both sides
      if(padding) {
        remainingSpace = remainingSpace >= 2*padding ? remainingSpace - 2*padding : 0;
        txtIndent = padding;
      }

      console.log('remainingSpace after padding: ', remainingSpace);
      // check for right padding
      if(paddingRight)
        remainingSpace = remainingSpace >= paddingRight ? remainingSpace - paddingRight : 0;

      // check for negative letter spacing
      if(remainingSpace < 0) remainingSpace = 0;

      console.log('remainingSpace after right padding: ', remainingSpace);

      // add the minWidth difference if any
      if(elWidth < minWidth) {
        remainingSpace += minWidth - elWidth;
      }

      console.log('minWidth - elWidth: ', minWidth - elWidth);

      ltrSpacing = remainingSpace / (charNo - 1);

      console.log('el: ', childrenEls[i]);
      console.log('targetWidth: ', targetWidth);
      console.log('minWidth: ', minWidth);
      console.log('elWidth: ', elWidth);
      console.log('charNo: ', charNo);
      console.log('charWidth: ', charWidth);
      console.log('remainingSpace after minWidth: ', remainingSpace);
      console.log('ltrSpacing: ', ltrSpacing);

      childrenEls[i].style.color = 'aliceblue';
      //childrenEls[i].style.color = 'rebeccapurple';
      childrenEls[i].style.letterSpacing = ltrSpacing + 'px';
      if(txtIndent) childrenEls[i].style.textIndent = txtIndent + 'px';
      childrenEls[i].style.display = oldProperties.display;

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

  function debounce(func, wait) {
		var timeout;

		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				func.apply(context, args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
    };
	}

  function convertToJS($elem) {
    // stackoverflow.com/questions/1853223/check-if-object-is-a-jquery-object
    if(typeof jQuery === 'function' && ($elem instanceof jQuery || 'jquery' in Object($elem))) {
      $elem = $elem.get(0);
    }

    return $elem;
  }

  function isNumber(n) {
    return !isNaN(n);
  }

  window[globalName] = function() {
    for (let i = 0; i < arguments.length; i++) {
      arguments[i][0] = convertToJS(arguments[i][0]);
      arguments[i][1] = convertToJS(arguments[i][1]);
      elems.push(arguments[i]);
    }

    console.log('user elems: ', elems);
  };

})(window, document, 'widthtaker');
