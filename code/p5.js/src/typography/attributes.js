/**
 * @module Typography
 * @submodule Attributes
 * @for p5
 * @requires core
 * @requires constants
 */
define(function (require) {

  'use strict';

  var p5 = require('core');
  var constants = require('constants');

  p5.prototype._textLeading = 15;
  p5.prototype._textFont = 'sans-serif';
  p5.prototype._textSize = 12;
  p5.prototype._textStyle = constants.NORMAL;

  /**
   * Sets the current alignment for drawing text. The parameters LEFT, CENTER,
   * and RIGHT set the display characteristics of the letters in relation to
   * the values for the x and y parameters of the text() function. 
   * 
   * @method textAlign
   * @param {Number/Constant} a horizontal alignment, either LEFT,
   *                            CENTER, or RIGHT
   */
  p5.prototype.textAlign = function(a) {
    if (a === constants.LEFT ||
      a === constants.RIGHT ||
      a === constants.CENTER) {
      this._curElement.context.textAlign = a;
    }
  };

  /**
   * Calculates and returns the height of any character or text string.
   *
   * @method textHeight
   * @param {String} s the String of characters to measure
   */
  p5.prototype.textHeight = function(s) {
    return this._curElement.context.measureText(s).height;
  };

  /**
   * Sets the spacing between lines of text in units of pixels. This
   * setting will be used in all subsequent calls to the text() function.
   *
   * @method textLeading
   * @param {Number} l the size in pixels for spacing between lines
   */
  p5.prototype.textLeading = function(l) {
    this._setProperty('_textLeading', l);
  };

  /**
   * Sets the current font size. This size will be used in all subsequent
   * calls to the text() function. Font size is measured in units of pixels.
   *
   * @method textSize
   * @param {Number} s the size of the letters in units of pixels
   */
  p5.prototype.textSize = function(s) {
    this._setProperty('_textSize', s);
  };

  /**
   * Sets the style of the text to NORMAL, ITALIC, or BOLD. Note this is
   * overriden by CSS styling.
   *
   * @method textStyle
   * @param {Number/Constant} s styling for text, either NORMAL,
   *                            ITALIC, or BOLD
   */
  p5.prototype.textStyle = function(s) {
    if (s === constants.NORMAL ||
      s === constants.ITALIC ||
      s === constants.BOLD) {
      this._setProperty('_textStyle', s);
    }
  };

  /**
   * Calculates and returns the width of any character or text string.
   *
   * @method textWidth
   * @param {String} s the String of characters to measure
   */
  p5.prototype.textWidth = function(s) {
    return this._curElement.context.measureText(s).width;
  };

  return p5;

});
