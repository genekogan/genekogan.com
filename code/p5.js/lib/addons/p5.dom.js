
/**
 * This is the p5.dom library.
 *
 * @module p5.dom
 * @submodule p5.dom
 * @for p5.dom
 * @main
 */

var p5DOM = (function(){

// =============================================================================
//                         p5 additions
// =============================================================================


  p5.prototype._elements = [];

  /**
   * Searches the page for an element with given ID and returns it as
   * a p5.Element. The DOM node itself can be accessed with .elt.
   * Returns null if none found.
   * 
   * @method getElement
   * @param  {String} id id of element to search for
   * @return {Object/p5.Element|Null} p5.Element containing node found
   */
  p5.prototype.getElement = function (e) {
    var res = document.getElementById(e);
    if (res) {
      return new p5.Element(res);
    } else {
      return null;
    }
  };

  /**
   * Searches the page for elements with given class and returns an
   * array of p5.Elements. The DOM nodes themselves can be accessed
   * with .elt. Returns an empty array if none found.
   * 
   * @method getElements
   * @param  {String} class class name of elements to search for
   * @return {Array} array of p5.Element wrapped nodes found
   */
  p5.prototype.getElements = function (e) {
    var arr = [];
    var res = document.getElementsByClassName(e);
    if (res) {
      for (var j = 0; j < res.length; j++) {
        var obj = new p5.Element(res[j]);
        arr.push(obj);
      }
    }
    return arr;
  };

  /**
   * Removes all elements created by p5, except the original canvas.
   * Event handlers are removed, and element is removed from the DOM.
   *
   * @method removeElements
   */
  p5.prototype.removeElements = function (e) {
    for (var i=0; i<this._elements.length; i++) {
      this._elements[i].remove();
    }
  };

  /**
   * Helpers for create methods.
   */  
  function addElement(elt, media) {
    var node = this._userNode ? this._userNode : document.body;
    node.appendChild(elt);
    var c = media ? new p5.MediaElement(elt) : new p5.Element(elt);
    this._elements.push(c);
    return c;
  }

  /**
   * Creates a &lt;div&gt;&lt;/div&gt; element in the DOM with given inner HTML.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createDiv
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */

  /**
   * Creates a &lt;p&gt;&lt;/p&gt; element in the DOM with given inner HTML. Used
   * for paragraph length text.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createP
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */

  /**
   * Creates a &lt;span&gt;&lt;/span&gt; element in the DOM with given inner HTML.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createSpan
   * @param  {String} html inner HTML for element created
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  var tags = ['div', 'p', 'span'];
  tags.forEach(function(tag) {
    var method = 'create' + tag.charAt(0).toUpperCase() + tag.slice(1);
    p5.prototype[method] = function(html) {
      var elt = document.createElement(tag);
      elt.innerHTML = html;
      return addElement(elt);
    }
  });

  /**
   * Creates an &lt;img /&gt; element in the DOM with given src and
   * alternate text. 
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createImg
   * @param  {String} src src path or url for image
   * @param  {String} alt alternate text to be used if image does not
   *                  load
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createImg = function(src, alt) {
    var elt = document.createElement('img');
    elt.src = src;
    if (typeof alt !== 'undefined') {
      elt.alt = alt;
    }
    return addElement(elt);
  };


  /**
   * Creates an &lt;a&gt;&lt;/a&gt; element in the DOM for including a hyperlink.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createA
   * @param  {String} href       url of page to link to
   * @param  {String} html       inner html of link element to display
   * @param  {String} [target]   target where new link should open,
   *                             could be _blank, _self, _parent, _top.
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createA = function(href, html, target) {
    var elt = document.createElement('a');
    elt.href = href;
    elt.innerHTML = html;
    if (target) elt.target = target;
    return addElement(elt);
  };

  /** INPUT **/


  /**
   * Creates a slider &lt;input&gt;&lt;/input&gt; element in the DOM.
   * Use .size() to set the display length of the slider.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createSlider
   * @param  {Number} min minimum value of the slider
   * @param  {Number} max maximum value of the slider
   * @param  {Number} [value] default value of the slider
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createSlider = function(min, max, value) {
    var elt = document.createElement('input');
    elt.type = 'range';
    elt.min = min;
    elt.max = max;
    if (value) elt.value = value;
    return addElement(elt);
  };

  /**
   * Creates a &lt;button&gt;&lt;/button&gt; element in the DOM.
   * Use .size() to set the display size of the button.
   * Use .mousePressed() to specify behavior on press.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createButton
   * @param  {String} label label displayed on the button
   * @param  {String} [value] value of the button
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createButton = function(label, value) {
    var elt = document.createElement('button');
    elt.innerHTML = label;
    elt.value = value;
    if (value) elt.value = value;
    return addElement(elt);
  };

  /**
   * Creates an &lt;input&gt;&lt;/input&gt; element in the DOM for text input.
   * Use .size() to set the display length of the box.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createInput
   * @param  {Number} [value] default value of the input box
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createInput = function(value) {
    var elt = document.createElement('input');
    elt.type = 'text';
    if (value) elt.value = value;
    return addElement(elt);
  };

  /** VIDEO STUFF **/

  /**
   * Creates an HTML5 &lt;video&gt; element in the DOM for simple playback
   * of audio/video. Shown by default, can be hidden with .hide()
   * and drawn into canvas using video(). Appends to the container
   * node if one is specified, otherwise appends to body.
   * 
   * @method createVideo
   * @param  {String} src        path to a video file
   * @param  {String} [src]      path to another format of same file 
   *                             (optional, to ensure compatability)
   * @return {Object/p5.Element} pointer to video p5.Element
   */

  p5.prototype.createVideo = function(src1, src2) {
    var elt = document.createElement('video');
    var source= document.createElement('source');
    source.src= src1;
    elt.appendChild(source);
    if (src2) {
      var source2 = document.createElement('source');
      source2.src = src2;
      elt.appendChild(source2);
    }
    var c = addElement(elt, true);
    
    return c;  
  };

  p5.prototype.video = function(v, x, y, w, h) {
    var frame = v.canvas ? v.canvas : v.elt;
    this._curElement.context.drawImage(frame, x, y, w, h);
  };


  /** AUDIO STUFF **/

  /**
   * Creates a hidden HTML5 &lt;audio&gt; element in the DOM for simple audio 
   * playback. Appends to the container node if one is specified, 
   * otherwise appends to body.
   * 
   * @method createAudio
   * @param  {String} src        path to an audio file
   * @param  {String} [src]      path to another format of same file 
   *                             (optional, to ensure compatability)
   * @return {Object/p5.Element} pointer to audio p5.Element
   */

  p5.prototype.createAudio = function(src1, src2) {
    var elt = document.createElement('audio');
    var source= document.createElement('source');
    source.src= src1;
    elt.appendChild(source);
    if (src2) {
      var source2 = document.createElement('source');
      source2.src = src2;
      elt.appendChild(source2);
    }
    var c = addElement(elt, true);
    return c;  
  };


  /** CAMERA STUFF **/
  
  p5.prototype.VIDEO = 'video';
  p5.prototype.AUDIO = 'audio';

  navigator.getUserMedia  = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;

  /**
   * Creates a new &lt;video&gt; element that contains the audio/video feed
   * from a webcam. This can be drawn onto the canvas using video().
   *
   * @method createCapture
   * @param  {String/Constant}   type type of capture, either VIDEO or 
   *                             AUDIO if none specified, default both
   * @return {Object/p5.Element} capture video p5.Element
   */
  p5.prototype.createCapture = function(type) {
    console.log(type)
    var useVideo, useAudio;
    if (!type) {
      useVideo = true;
      useAudio = true;
    } else if (type === p5.prototype.VIDEO) {
      useVideo = true;
    } else if (type === p5.prototype.AUDIO) {
      useAudio = true;
    }

    if (navigator.getUserMedia) {
      var elt = document.createElement('video');
      navigator.getUserMedia({video: useVideo, audio: useAudio}, function(stream) {
        elt.src = window.URL.createObjectURL(stream);
        elt.play();
      }, function(e) { console.log(e); });
    } else {
      throw 'getUserMedia not supported in this browser';
    }
    return addElement(elt);
  };

  /**
   * Creates element with given tag in the DOM with given content.
   * Appends to the container node if one is specified, otherwise 
   * appends to body.
   * 
   * @method createElement
   * @param  {String} tag tag for the new element
   * @param  {String} [content] html content to be inserted into the element 
   * @return {Object/p5.Element} pointer to p5.Element holding created
   *                           node
   */
  p5.prototype.createElement = function(tag, content) {
    var elt = document.createElement(tag);
    if (typeof content !== 'undefined') {
      elt.innerHTML = content;
    }
    return addElement(elt);
  };


// =============================================================================
//                         p5.Element additions
// =============================================================================

  // p5.Element.prototype.removeClass = function(c) {
  //   var regex = new RegExp('(?:^|\\s)'+c+'(?!\\S)');
  //   this.elt.className = this.elt.className.replace(regex, '');
  //   this.elt.className = this.elt.className.replace(/^\s+|\s+$/g, ""); //prettify
  //   console.log(this.elt.className);
  // }

  /**
   *
   * Attaches the element to the parent specified. A way of setting
   * the container for the element. Accepts either a string ID or
   * DOM node.
   *
   * @method child
   * @param  {String|Object} child the ID or node to add to the current element
   */
  p5.Element.prototype.child = function(c) {
    if (typeof c === 'string') {
      c = document.getElementById(c);
    }
    this.elt.appendChild(c);
  };


  /**
   *
   * Sets the inner HTML of the element. Replaces any existing html.
   *
   * @for p5.Element
   * @method html
   * @param  {String} html the HTML to be placed inside the element
   */
  p5.Element.prototype.html = function(html) {
    this.elt.innerHTML = html;
  };

  /**
   *
   * Sets the position of the element relative to (0, 0) of the
   * window. Essentially, sets position:absolute and left and top
   * properties of style.
   *
   * @method position
   * @param  {Number} x x-position relative to upper left of window
   * @param  {Number} y y-position relative to upper left of window
   */
  p5.Element.prototype.position = function(x, y) {
    this.elt.style.position = 'absolute';
    this.elt.style.left = x+'px';
    this.elt.style.top = y+'px';
  };

  /**
   *
   * Sets the given style (css) property of the element with the given value.
   * If no value is specified, returns the value of the given property, 
   * or undefined if the property is not.
   *
   * @method style
   * @param  {String} property property to be set
   * @param  {String} value    value to assign to property
   * @return {String} value of property, if no value is specified
   */
  p5.Element.prototype.style = function(prop, val) {
    if (typeof val === 'undefined') {
      return this.elt.style[prop];
    } else {
      this.elt.style[prop] = val;
    }
  };


  /**
   *
   * Adds a new attribute or changes the value of an existing attribute 
   * on the specified element. If no value is specified, returns the
   * value of the given attribute, or null if attribute is not set.
   *
   * @method attribute
   * @param  {String} attr  attribute to set
   * @param  {String} [value] value to assign to attribute
   * @return {String} value of attribute, if no value is specified
   */
  p5.Element.prototype.attribute = function(attr, value) {
    if (typeof value === 'undefined') {
      return this.elt.getAttribute(attr);
    } else {
      this.elt.setAttribute(attr, value);
    }
  };


  /**
   * Either returns the value of the element if no arguments
   * given, or sets the value of the element.
   * 
   * @method value
   * @param  {String|Number} [value]
   * @return {String|Number}
   */
  p5.Element.prototype.value = function() { 
    console.log("v")
    if (arguments.length > 0) {
      this.elt.value = arguments[0];
    } else {
      if (this.elt.type === 'range') {
        return parseFloat(this.elt.value);
      }
      else return this.elt.value;
    }
  };

  /**
   * 
   * Shows the current element. Essentially, setting display:block for the style.
   * 
   * @method show
   */
  p5.Element.prototype.show = function() {
    this.elt.style.display = 'block';
  };

  /**
   * Hides the current element. Essentially, setting display:none for the style.
   * 
   * @method hide
   */
  p5.Element.prototype.hide = function() {
    this.elt.style.display = 'none';
  };

  /**
   * 
   * Sets the width and height of the element. AUTO can be used to
   * only adjust one dimension.
   * 
   * @method size
   * @param  {Number} w width of the element
   * @param  {Number} h height of the element
   */
  p5.Element.prototype.size = function(w, h) {
    var aW = w;
    var aH = h;
    var AUTO = p5.prototype.AUTO;

    if (aW !== AUTO || aH !== AUTO) {
      if (aW === AUTO) {
        aW = h * this.elt.width / this.elt.height;
      } else if (aH === AUTO) {
        aH = w * this.elt.height / this.elt.width;
      }
      // set diff for cnv vs normal div
      if (this.elt instanceof HTMLCanvasElement) {
        this.elt.setAttribute('width', aW * this._pInst._pixelDensity);
        this.elt.setAttribute('height', aH * this._pInst._pixelDensity);
        this.elt.setAttribute('style', 'width:' + aW + 'px !important; height:' + aH + 'px !important;');
      } else {
        this.elt.style.width = aW;
        this.elt.style.height = aH;
      }
      this.width = this.elt.offsetWidth;
      this.height = this.elt.offsetHeight;
      if (this._pInst) { // main canvas associated with p5 instance
        if (this._pInst._curElement.elt === this.elt) {
          this._pInst._setProperty('width', this.elt.offsetWidth);
          this._pInst._setProperty('height', this.elt.offsetHeight);
        }
      }
    }
  };

  /**
   * Removes the element and deregisters all listeners.
   * 
   * @method remove
   */
  p5.Element.prototype.remove = function() {
    // deregister events
    for (var ev in this._events) {
      this.elt.removeEventListener(ev, this._events[ev]);
    }
    this.elt.parentNode.removeChild(this.elt);
    delete(this);
  };



// =============================================================================
//                         p5.MediaElement additions
// =============================================================================


  /**
   * A class to describe...
   *
   * @class p5.MediaElement
   * @constructor
   * @param {String} elt DOM node that is wrapped
   * @param {Object} [pInst] pointer to p5 instance
   */
  p5.MediaElement = function(elt, pInst) {
    p5.Element.call(this, elt, pInst);
  };
  p5.MediaElement.prototype = Object.create(p5.Element.prototype);




  /**
   * Play an HTML5 media element.
   * 
   * @method play
   */
  p5.MediaElement.prototype.play = function() {
    if (this.elt.currentTime === this.elt.duration) {
      this.elt.currentTime = 0;
    }
    this.elt.play();
  };  

  /**
   * Stops an HTML5 media element (sets current time to zero).
   * 
   * @method stop
   */
  p5.MediaElement.prototype.stop = function() {
    this.elt.pause();
    this.elt.currentTime = 0;
  };  

  /**
   * Pauses an HTML5 media element.
   * 
   * @method pause
   */
  p5.MediaElement.prototype.pause = function() {
    this.elt.pause();
  };  

  /**
   * Set 'loop' to true for an HTML5 media element, and starts playing.
   * 
   * @method loop
   */
  p5.MediaElement.prototype.loop = function() {
    this.elt.setAttribute('loop', true);
    this.play();
  };
  /**
   * Set 'loop' to false for an HTML5 media element. Element will stop
   * when it reaches the end.
   * 
   * @method noLoop
   */
  p5.MediaElement.prototype.noLoop = function() {
    this.elt.setAttribute('loop', false);
  };


  /**
   * Set HTML5 media element to autoplay or not.
   * 
   * @method autoplay
   * @param {Boolean} autoplay whether the element should autoplay
   */
  p5.MediaElement.prototype.autoplay = function(val) {
    this.elt.setAttribute('autoplay', val);
  };

  /**
   * Sets volume for this HTML5 media element. If no argument is given,
   * returns the current volume;
   * 
   * @param {Number} [val] volume between 0.0 and 1.0
   * @return {Number} current volume
   * @method volume
   */
  p5.MediaElement.prototype.volume = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.volume;
    } else {
      this.elt.volume = val;
    }
  };

  /**
   * If no arguments are given, returns the current time of the elmeent.
   * If an argument is given the current time of the element is set to it.
   * 
   * @method time
   * @param {Number} [time] time to jump to (in seconds)
   * @return {Number} current time (in seconds)
   */
  p5.MediaElement.prototype.time = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.currentTime;
    } else {
      this.elt.currentTime = val;
    }
  };

  /**
   * Returns the duration of the HTML5 media element.
   * 
   * @method duration
   * @return {Number} duration
   */
  p5.MediaElement.prototype.duration = function() {
    return this.elt.duration;
  };
  p5.MediaElement.prototype.stop = function() {
    this.elt.pause();
    this.elt.currentTime = 0;
  };
  p5.MediaElement.prototype.pixels = [];
  p5.MediaElement.prototype.loadPixels = function() {
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.getContext('2d').drawImage(this.elt, 0, 0);
      p5.prototype.loadPixels.call(this);
    } else {
      c.canvas.getContext('2d').drawImage(this.elt, 0, 0);
      p5.prototype.loadPixels.call(this);
    }
  }
  p5.MediaElement.prototype.updatePixels =  function(x, y, w, h){
    p5.prototype.updatePixels.call(this, x, y, w, h);
  }
  p5.MediaElement.prototype.get = function(x, y, w, h){
    return p5.prototype.get.call(this, x, y, w, h);
  };
  p5.MediaElement.prototype.set = function(x, y, imgOrCol){
    p5.prototype.set.call(this, x, y, imgOrCol);
  };

})();
