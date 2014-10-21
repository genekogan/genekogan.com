/**
 * @module Image
 * @submodule Image
 * @requires core
 * @requires constants
 * @requires filters
 */
define(function (require) {

  /**
   * This module defines the p5.Image class and P5 methods for
   * drawing images to the main display canvas.
   */

  'use strict';

  var p5 = require('core');
  var Filters = require('filters');

  /*
   * Class methods
   */

  /**
   * Creates a new p5.Image. A p5.Image is a canvas backed representation of an
   * image. p5 can display .gif, .jpg and .png images. Images may be displayed
   * in 2D and 3D space. Before an image is used, it must be loaded with the
   * loadImage() function. The p5.Image class contains fields for the width and
   * height of the image, as well as an array called pixels[] that contains the
   * values for every pixel in the image. The methods described below allow
   * easy access to the image's pixels and alpha channel and simplify the
   * process of compositing.
   *
   * Before using the pixels[] array, be sure to use the loadPixels() method on
   * the image to make sure that the pixel data is properly loaded.
   * 
   * @class p5.Image
   * @constructor
   * @param {Number} width 
   * @param {Number} height 
   * @param {Object} pInst An instance of a p5 sketch.
   */
  p5.Image = function(width, height){
    /**
     * Image width.
     * @property width
     */
    this.width = width;
    /**
     * Image height.
     * @property height
     */
    this.height = height;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    /**
     * Array containing the color of every pixel in the image.
     * @property pixels[]
     */
    this.pixels = [];
  };

  /**
   * Helper fxn for sharing pixel methods
   *
   */
  p5.Image.prototype._setProperty = function (prop, value) {
    this[prop] = value;
  };

  /**
   * Loads the pixels data for this image into the [pixels] attribute.
   * 
   * @method loadPixels
   */
  p5.Image.prototype.loadPixels = function(){
    p5.prototype.loadPixels.call(this);
  };

  /**
   * Updates the backing canvas for this image with the contents of
   * the [pixels] array.
   *
   * @method updatePixels
   * @param {Integer|undefined} x x-offset of the target update area for the
   *                              underlying canvas
   * @param {Integer|undefined} y y-offset of the target update area for the
   *                              underlying canvas
   * @param {Integer|undefined} w height of the target update area for the
   *                              underlying canvas
   * @param {Integer|undefined} h height of the target update area for the
   *                              underlying canvas
   */
  p5.Image.prototype.updatePixels = function(x, y, w, h){
    p5.prototype.updatePixels.call(this, x, y, w, h);
  };

  /**
   * Get a region of pixels from an image.
   *
   * If no params are passed, those whole image is returned,
   * if x and y are the only params passed a single pixel is extracted
   * if all params are passed a rectangle region is extracted and a p5.Image
   * is returned.
   *
   * Returns undefined if the region is outside the bounds of the image
   *
   * @method get
   * @param  {Number}               [x] x-coordinate of the pixel
   * @param  {Number}               [y] y-coordinate of the pixel
   * @param  {Number}               [w] width
   * @param  {Number}               [h] height
   * @return {Array/Color | p5.Image}     color of pixel at x,y in array format
   *                                    [R, G, B, A] or p5.Image
   */
  p5.Image.prototype.get = function(x, y, w, h){
    return p5.prototype.get.call(this, x, y, w, h);
  };

  /**
   * Set the color of a single pixel or write an image into
   * this p5.Image.
   *
   * Note that for a large number of pixels this will
   * be slower than directly manipulating the pixels array
   * and then calling updatePixels()
   *
   * TODO: Should me make the update operation toggleable?
   *
   * @method set
   * @param {Number}              x x-coordinate of the pixel
   * @param {Number}              y y-coordinate of the pixel
   * @param {Number|Array|Object}   insert a grayscale value |
   *                                a color array | image to copy
   */
  p5.Image.prototype.set = function(x, y, imgOrCol){
    p5.prototype.set.call(this, x, y, imgOrCol);
  };


  /**
   * Resize the image to a new width and height. To make the image scale
   * proportionally, use 0 as the value for the wide or high parameter.
   * For instance, to make the width of an image 150 pixels, and change
   * the height using the same proportion, use resize(150, 0).
   *
   * @method resize
   * @param {Number} width the resized image width
   * @param {Number} height the resized image height
   */
  p5.Image.prototype.resize = function(width, height){

    // Copy contents to a temporary canvas, resize the original
    // and then copy back.
    //
    // There is a faster approach that involves just one copy and swapping the
    // this.canvas reference. We could switch to that approach if (as i think
    // is the case) there an expectation that the user would not hold a 
    // reference to the backing canvas of a p5.Image. But since we do not
    // enforece that at the moment, I am leaving in the slower, but safer
    // implementation.

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvas.getContext('2d').drawImage(this.canvas,
      0, 0, this.canvas.width, this.canvas.height,
      0, 0, tempCanvas.width, tempCanvas.width
    );


    // Resize the original canvas, which will clear its contents
    this.canvas.width = this.width = width;
    this.canvas.height = this.height = height;

    //Copy the image back

    this.canvas.getContext('2d').drawImage(tempCanvas,
      0, 0, width, height,
      0, 0, width, height
    );

    if(this.pixels.length > 0){
      this.loadPixels();
    }
  };

  /**
   * Copies a region of pixels from one image to another. If no
   * srcImage is specified this is used as the source. If the source
   * and destination regions aren't the same size, it will
   * automatically resize source pixels to fit the specified
   * target region.
   *
   * @method copy
   * @param  {p5.Image|undefined} srcImage source image
   * @param  {Integer} sx X coordinate of the source's upper left corner
   * @param  {Integer} sy Y coordinate of the source's upper left corner
   * @param  {Integer} sw source image width
   * @param  {Integer} sh source image height
   * @param  {Integer} dx X coordinate of the destination's upper left corner
   * @param  {Integer} dy Y coordinate of the destination's upper left corner
   * @param  {Integer} dw destination image width
   * @param  {Integer} dh destination image height
   */
  p5.Image.prototype.copy = function() {
    p5.prototype.copy.apply(this, arguments);
  };

  /**
   * Masks part of an image from displaying by loading another
   * image and using it's alpha channel as an alpha channel for
   * this image.
   * 
   * @method mask
   * @param {p5.Image|undefined} srcImage source image
   *
   * TODO: - Accept an array of alpha values.
   *       - Use other channels of an image. p5 uses the
   *       blue channel (which feels kind of arbitrary). Note: at the
   *       moment this method does not match native processings original
   *       functionality exactly.
   * 
   * http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
   * 
   */
  p5.Image.prototype.mask = function(p5Image) {
    if(p5Image === undefined){
      p5Image = this;
    }
    var currBlend = this.canvas.getContext('2d').globalCompositeOperation;

    var copyArgs = [
      p5Image,
      0,
      0,
      p5Image.width,
      p5Image.height,
      0,
      0,
      this.width,
      this.height
    ];

    this.canvas.getContext('2d').globalCompositeOperation = 'destination-out';
    this.copy.apply(this, copyArgs);
    this.canvas.getContext('2d').globalCompositeOperation = currBlend;
  };

  /**
   * Applies an image filter to a p5.Image
   * 
   * @method filter
   * @param {String} operation one of threshold, gray, invert, posterize and 
   *                           opaque see Filters.js for docs on each available
   *                           filter
   * @param {Number|undefined} value
   */
  p5.Image.prototype.filter = function(operation, value) {
    Filters.apply(this.canvas, Filters[operation.toLowerCase()], value);
  };

  /**
   * Copies a region of pixels from one image to another, using a specified
   * blend mode to do the operation.
   * 
   * @method blend
   * @param  {p5.Image|undefined} srcImage source image
   * @param  {Integer} sx X coordinate of the source's upper left corner
   * @param  {Integer} sy Y coordinate of the source's upper left corner
   * @param  {Integer} sw source image width
   * @param  {Integer} sh source image height
   * @param  {Integer} dx X coordinate of the destination's upper left corner
   * @param  {Integer} dy Y coordinate of the destination's upper left corner
   * @param  {Integer} dw destination image width
   * @param  {Integer} dh destination image height
   * @param  {Integer} blendMode the blend mode
   *
   * Available blend modes are: normal | multiply | screen | overlay | 
   *            darken | lighten | color-dodge | color-burn | hard-light | 
   *            soft-light | difference | exclusion | hue | saturation | 
   *            color | luminosity
   *
   * 
   * http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
   * 
   */
  p5.Image.prototype.blend = function() {
    p5.prototype.blend.apply(this, arguments);
  };

  /**
   * Saves the image to a file and forces the browser to download it.
   * Supports png and jpg.
   * 
   * @method save
   * @param  {[type]} extension
   *
   * TODO: There doesn't seem to be a way to give the force the
   * browser to download a file *and* give it a name. Which is why 
   * this function currently only take an extension parameter.
   * 
   */
  p5.Image.prototype.save = function(extension) {
    // var components = name.split('.');
    // var extension = components[components.length - 1];
    var mimeType;
    
    // en.wikipedia.org/wiki/Comparison_of_web_browsers#Image_format_support
    switch(extension.toLowerCase()){
    case 'png':
      mimeType = 'image/png';
      break;
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'jpg':
      mimeType = 'image/jpeg';
      break;
    default:
      mimeType = 'image/png';
      break;
    }

    if(mimeType !== undefined){
      var downloadMime = 'image/octet-stream';
      var imageData = this.canvas.toDataURL(mimeType);
      imageData = imageData.replace(mimeType, downloadMime);
      
      //Make the browser download the file
      window.location.href = imageData;
    }
  };
  return p5.Image;
});
