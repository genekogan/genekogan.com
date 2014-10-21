/**
 * @module Transform
 * @submodule Transform
 * @for p5
 * @requires core
 * @requires constants
 */

define(function (require) {

  'use strict';

  var p5 = require('core');
  var constants = require('constants');

  require('output.text_area');

  p5.prototype._matrices = [[1,0,0,1,0,0]];

  /**
   * Multiplies the current matrix by the one specified through the parameters.
   * This is very slow because it will try to calculate the inverse of the
   * transform, so avoid it whenever possible.
   *
   * @method applyMatrix
   * @param  {Number} n00 numbers which define the 3x2 matrix to be multiplied
   * @param  {Number} n01 numbers which define the 3x2 matrix to be multiplied
   * @param  {Number} n02 numbers which define the 3x2 matrix to be multiplied
   * @param  {Number} n10 numbers which define the 3x2 matrix to be multiplied
   * @param  {Number} n11 numbers which define the 3x2 matrix to be multiplied
   * @param  {Number} n12 numbers which define the 3x2 matrix to be multiplied
   * @return {p5}         the p5 object
   */
  p5.prototype.applyMatrix = function(n00, n01, n02, n10, n11, n12) {
    this._curElement.context.transform(n00, n01, n02, n10, n11, n12);
    var m = this._matrices[this._matrices.length-1];
    m = multiplyMatrix(m, [n00, n01, n02, n10, n11, n12]);

    return this;
  };

  /**
   * Pops the current transformation matrix off the matrix stack. Understanding
   * pushing and popping requires understanding the concept of a matrix stack.
   * The pushMatrix() function saves the current coordinate system to the stack
   * and popMatrix() restores the prior coordinate system. pushMatrix() and
   * popMatrix() are used in conjuction with the other transformation functions
   * and may be embedded to control the scope of the transformations.
   *
   * @method popMatrix
   * @return {p5} the p5 object
   */
  p5.prototype.popMatrix = function() {
    this._curElement.context.restore();
    this._matrices.pop();

    return this;
  };

  /**
   * Prints the current matrix to the Console.
   * 
   * @method printMatrix
   * @return {p5} the p5 object
   */
  p5.prototype.printMatrix = function() {
    //console.log(this._matrices[this._matrices.length-1]);
    return this;
  };

  /**
   * Pushes the current transformation matrix onto the matrix stack.
   * Understanding pushMatrix() and popMatrix() requires understanding the
   * concept of a matrix stack. The pushMatrix() function saves the current
   * coordinate system to the stack and popMatrix() restores the prior
   * coordinate system. pushMatrix() and popMatrix() are used in conjuction
   * with the other transformation functions and may be embedded to control
   * the scope of the transformations.
   *
   * @method pushMatrix
   * @return {p5} the p5 object
   */
  p5.prototype.pushMatrix = function() {
    this._curElement.context.save();
    this._matrices.push([1,0,0,1,0,0]);

    return this;
  };

  /**
   * Replaces the current matrix with the identity matrix.
   *
   * @method resetMatrix
   * @return {p5} the p5 object
   */
  p5.prototype.resetMatrix = function() {
    this._curElement.context.setTransform();
    this._matrices[this._matrices.length-1] = [1,0,0,1,0,0];

    return this;
  };

  /**
   * Rotates a shape the amount specified by the angle parameter. This
   * function accounts for angleMode, so angles can be entered in either
   * RADIANS or DEGREES.
   *
   * Objects are always rotated around their relative position to the
   * origin and positive numbers rotate objects in a clockwise direction.
   * Transformations apply to everything that happens after and subsequent
   * calls to the function accumulates the effect. For example, calling
   * rotate(HALF_PI) and then rotate(HALF_PI) is the same as rotate(PI).
   * All tranformations are reset when draw() begins again.
   *
   * Technically, rotate() multiplies the current transformation matrix
   * by a rotation matrix. This function can be further controlled by
   * the pushMatrix() and popMatrix().
   *
   * @method rotate
   * @param  {Number} angle the angle of rotation, specified in radians
   *                        or degrees, depending on current angleMode
   * @return {p5}           the p5 object
   */
  p5.prototype.rotate = function(r) {
    if (this._angleMode === constants.DEGREES) {
      r = this.radians(r);
    }
    this._curElement.context.rotate(r);
    var m = this._matrices[this._matrices.length-1];
    var c = Math.cos(r);
    var s = Math.sin(r);
    var m11 = m[0] * c + m[2] * s;
    var m12 = m[1] * c + m[3] * s;
    var m21 = m[0] * -s + m[2] * c;
    var m22 = m[1] * -s + m[3] * c;
    m[0] = m11;
    m[1] = m12;
    m[2] = m21;
    m[3] = m22;

    return this;
  };

  p5.prototype.rotateX = function() {
    throw 'not yet implemented';
    // return this
  };

  p5.prototype.rotateY = function() {
    throw 'not yet implemented';
    // return this;
  };

  /**
   * Increases or decreases the size of a shape by expanding and contracting
   * vertices. Objects always scale from their relative origin to the
   * coordinate system. Scale values are specified as decimal percentages.
   * For example, the function call scale(2.0) increases the dimension of a
   * shape by 200%.
   *
   * Transformations apply to everything that happens after and subsequent
   * calls to the function multiply the effect. For example, calling scale(2.0)
   * and then scale(1.5) is the same as scale(3.0). If scale() is called
   * within draw(), the transformation is reset when the loop begins again.
   *
   * Using this fuction with the z parameter requires using P3D as a
   * parameter for size(), as shown in the third example above. This function
   * can be further controlled with pushMatrix() and popMatrix().
   *
   * @method scale
   * @param  {Number} s   percentage to scale the object, or percentage to
   *                      scale the object in the x-axis if multiple arguments
   *                      are given
   * @param  {Number} [y] percentage to scale the object in the y-axis
   * @return {p5}         the p5 object
   */
  p5.prototype.scale = function() {
    var x = 1.0, y = 1.0;
    if (arguments.length === 1) {
      x = y = arguments[0];
    } else {
      x = arguments[0];
      y = arguments[1];
    }
    this._curElement.context.scale(x, y);
    var m = this._matrices[this._matrices.length-1];
    m[0] *= x;
    m[1] *= x;
    m[2] *= y;
    m[3] *= y;

    return this;
  };

  /**
   * Shears a shape around the x-axis the amount specified by the angle
   * parameter. Angles should be specified in the current angleMode.
   * Objects are always sheared around their relative position to the origin
   * and positive numbers shear objects in a clockwise direction.
   *
   * Transformations apply to everything that happens after and subsequent
   * calls to the function accumulates the effect. For example, calling
   * shearX(PI/2) and then shearX(PI/2) is the same as shearX(PI).
   * If shearX() is called within the draw(), the transformation is reset when
   * the loop begins again. 
   *
   * Technically, shearX() multiplies the current transformation matrix by a
   * rotation matrix. This function can be further controlled by the
   * pushMatrix() and popMatrix() functions.
   *
   * @method shearX
   * @param  {Number} angle angle of shear specified in radians or degrees,
   *                        depending on current angleMode
   * @return {p5}           the p5 object
   */
  p5.prototype.shearX = function(angle) {
    if (this._angleMode === constants.DEGREES) {
      angle = this.radians(angle);
    }
    this._curElement.context.transform(1, 0, this.tan(angle), 1, 0, 0);
    var m = this._matrices[this._matrices.length-1];
    m = multiplyMatrix(m, [1, 0, this.tan(angle), 1, 0, 0]);

    return this;
  };

  /**
   * Shears a shape around the y-axis the amount specified by the angle
   * parameter. Angles should be specified in the current angleMode. Objects
   * are always sheared around their relative position to the origin and
   * positive numbers shear objects in a clockwise direction.
   *
   * Transformations apply to everything that happens after and subsequent
   * calls to the function accumulates the effect. For example, calling
   * shearY(PI/2) and then shearY(PI/2) is the same as shearY(PI). If
   * shearY() is called within the draw(), the transformation is reset when
   * the loop begins again.  
   *
   * Technically, shearY() multiplies the current transformation matrix by a
   * rotation matrix. This function can be further controlled by the
   * pushMatrix() and popMatrix() functions.
   *
   * @method shearY
   * @param  {Number} angle angle of shear specified in radians or degrees,
   *                        depending on current angleMode
   * @return {p5}           the p5 object
   */
  p5.prototype.shearY = function(angle) {
    if (this._angleMode === constants.DEGREES) {
      angle = this.radians(angle);
    }
    this._curElement.context.transform(1, this.tan(angle), 0, 1, 0, 0);
    var m = this._matrices[this._matrices.length-1];
    m = multiplyMatrix(m, [1, this.tan(angle), 0, 1, 0, 0]);

    return this;
  };

  /**
   * Specifies an amount to displace objects within the display window.
   * The x parameter specifies left/right translation, the y parameter
   * specifies up/down translation.
   *
   * Transformations are cumulative and apply to everything that happens after
   * and subsequent calls to the function accumulates the effect. For example,
   * calling translate(50, 0) and then translate(20, 0) is the same as
   * translate(70, 0). If translate() is called within draw(), the
   * transformation is reset when the loop begins again. This function can be
   * further controlled by using pushMatrix() and popMatrix().
   *
   * @method translate
   * @param  {Number} x left/right translation
   * @param  {Number} y up/down translation
   * @return {p5}       the p5 object
   */
  p5.prototype.translate = function(x, y) {
    this._curElement.context.translate(x, y);
    var m = this._matrices[this._matrices.length-1];
    m[4] += m[0] * x + m[2] * y;
    m[5] += m[1] * x + m[3] * y;

    return this;
  };

  // TODO: Replace with an optimized matrix-multiplication algorithm
  function multiplyMatrix(m1, m2) {
    var result = [];
    var m1Length = m1.length;
    var m2Length = m2.length;
    var m10Length = m1[0].length;

    for(var j = 0; j < m2Length; j++) {
      result[j] = [];
      for(var k = 0; k < m10Length; k++) {
        var sum = 0;
        for(var i = 0; i < m1Length; i++) {
          sum += m1[i][k] * m2[j][i];
        }
        result[j].push(sum);
      }
    }
    return result;
  }

  return p5;

});