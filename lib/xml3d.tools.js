/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@version: DEVELOPMENT SNAPSHOT 0.2.0 (March 31 2015) 
*/
                    
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/** @namespace **/
XML3D.tools = XML3D.tools || {};

/** @define {string} */
XML3D.tools.version = 'DEVELOPMENT SNAPSHOT 0.2.0 (March 31 2015)';

(function() {

    /**
     * A MotionFactory.
     * @interface
     */
    var MotionFactory = function() {};
    var m = MotionFactory.prototype;

    /**
     * Creates a Transformable out of the given object
     * @param {Object} object base for the Transformable
     * @param {Constraint} constraint Constrain movement
     * @return {Transformable} created Transformable
     */
    m.createTransformable = function(object, constraint){};

    /**
     * Creates an Animatable out of the given object
     * @param {Object} object base for the Animatable
     * @param {Constraint} constraint Constrain movement
     * @return {Animatable} created Animatable
     */
    m.createAnimatable = function(object, constraint){};

    /**
     * Creates a KeyframeAnimation
     * @param {string} name name
     * @param {string} type "Position" or "Orientation"
     * @param {Object} element KeyframeAnimation, keyframes and corresponding positions or orientations
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}=} opt options
     * @return {Animation} created KeyFrameAnimation
     */
    m.createKeyframeAnimation = function(name, type, element, opt){};

    /**
     * Creates a ParameterAnimation
     * @param {string} name name
     * @param {Object} element ParameterAnimation, keys and corresponding parameters
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}=} opt options
     * @return {Animation} created ParameterAnimation
     */
    m.createParameterAnimation = function(name, element, opt){};


    /**
     * A Transformable.
     * @interface
     */
    var Transformable = function() {};
    var p = Transformable.prototype;

    /**
     * Sets the absolute position of the Transformable in local space.
     * @param {XML3DVec3} position position as 3d vector in local space
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.setPosition = function(position){};

    /**
     * Sets the absolute orientation of the Movebale in local space.
     * @param {XML3DRotation>} orientation orientation as quaternion in local space
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.setOrientation = function(orientation){};

    /**
     * Sets a new scale factor
     * @param {XML3DVec3} scale scale factor
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.setScale = function(scale){};

    /**
     * Gets the current position
     * @return {XML3DVec3} position
     */
    p.getPosition = function(){};

    /**
     * Gets the current orientation as quaternion
     * @return {XML3DRotation} orientation
     */
    p.getOrientation = function(){};

    /**
     * Gets the current scale factor
     * @return {XML3DVec3} scale factor
     */
    p.getScale = function(){};

    /**
     * Translate the Transformable by a given Vector.
     * @param {XML3DVec3} translation 3d Vector
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.translate = function(translation){};

    /**
     * Rotates the Transformable by a given Quaternion.
     * @param {XML3DRotation} rotation Quaternion
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.rotate = function(rotation){};

    /**
     * Scales the transformable by a given vector
     * @param {XML3DVec3} factor scale factor
     * @return {boolean} true if a setting was permitted by the constraint
     */
    p.scale = function(factor){};

    /**
     * Interpolated translation over time to position in local space.
     * The animation is put into a fifo-queue and will be eventually executed.
     * @param {XML3DVec3|undefined} position local space Vector
     * @param {XML3DRotation|undefined} orientation orientation Quaternion
     * @param {number} time when to reach the position, in milliseconds
     * @param {{delay: number, easing: Function, queueing: Boolean, callback: Function}=} opt options
     * @return {Transformable} the Transformable
     */
    p.moveTo = function(position, orientation, time, opt){};

    /**
     * Returns true if a movement is currently in progress
     * @return {Boolean}
     */
    p.movementInProgress = function(){};

    /**
     * Stops the current movement and cancels every queued movement.
     * @return {Transformable} the Transformable
     */
    p.stop = function(){};

    /**
     * Sets a constraint for the Transformable. The constraint is checked
     * @param {Constraint} constraint Set a constraint to the Transformable
     */
    p.setConstraint = function(constraint){};


    /**
     * An Animatable
     * @extends Transformable
     * @interface
     */
    var Animatable = function(){};
    var a = Animatable.prototype;

    /**
     * Add an Animation to the Animatable
     * @param {Animation} animation Animation
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}=} opt options
     * @return {Animatable} the Animatable
     */
    a.addAnimation = function(animation, opt){};

    /**
     * Starts an animation
     * @param {string} name animation, that will be started
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}=} opt options
     * @return {number} id id of the animation
     */
    a.startAnimation = function(name, opt){};

    /**
     * Stops an animation
     * @param {string} id Animation ID
     * @return {Animatable} the Animatable
     */
    a.stopAnimation = function(id){};


    /**
     * An Animation
     * @interface
     */
    var Animation = function(){};
    var k = Animation.prototype;

    /**
     * Sets the state of the animatable at time x of the animation
     * @param {Animatable} animatable
     * @param {number} currentTime
     * @param {number} startTime
     * @param {number} endTime
     * @param {Function=} easing
     */
    k.applyAnimation = function(animatable, currentTime, startTime, endTime, easing){};

	/**
	 * Set Options
	 * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}} opt options
	 */
	k.setOptions = function(opt){};

	/**
	 * Gets the value of an option, the option can be requested by its name
	 * @return {{duration: number, loop: number, delay: number, easing: Function, callback: Function}} opt options the requested option value
	 */
	k.getOptions = function(){};


	/**
     * A Constraint
     * @interface
     */
    var Constraint = function(){};
    var c = Constraint.prototype;

    /**
     * Checks if a rotation operation is valid. The first argument might be
     * further constrained inside the method.
     *
     * @param {XML3DRotation} newRotation Quaternion, the new rotation
     * @param {{transformable: Transformable}} [opts] options for the constraint-check
     * @return {boolean} returns true if the operation is valid, false otherwise
     */
    c.constrainRotation = function(newRotation, opts){};

    /**
     * Checks if a translation operation is valid. The first argument might be
     * further constrained inside the method.
     *
     * @param {XML3DVec3} newTranslation, the new translation
     * @param {{transformable: Transformable}} [opts] options for the constraint-check
     * @return {boolean} returns true if the operation is valid, false otherwise
     */
    c.constrainTranslation = function(newTranslation, opts){};

    /**
     * Checks if a scaling operation is valid. The first argument might be
     * further constrained inside the method.
     *
     * @param {XML3DVec3} newScale the new scaling
     * @param {{transformable: Transformable}} [opts] options for the constraint-check
     * @return {boolean} returns true if the operation is valid, false otherwise
     */
    c.constrainScaling = function(newScale, opts){};
}());
/**
 * @author sole / http://soledadpenades.com
 * @author mr.doob / http://mrdoob.com
 * @author Robert Eisele / http://www.xarg.org
 * @author Philippe / http://philippe.elsass.me
 * @author Robert Penner / http://www.robertpenner.com/easing_terms_of_use.html
 * @author Paul Lewis / http://www.aerotwist.com/
 * @author lechecacharro
 * @author Josh Faul / http://jocafa.com/
 * @author egraether / http://egraether.com/
 */

var TWEEN = TWEEN || ( function () {

	var _tweens = [];

	return {

		REVISION: '6',

		getAll: function () {

			return _tweens;

		},

		removeAll: function () {

			_tweens = [];

		},

		add: function ( tween ) {

			_tweens.push( tween );

		},

		remove: function ( tween ) {

			var i = _tweens.indexOf( tween );

			if ( i !== -1 ) {

				_tweens.splice( i, 1 );

			}

		},

		update: function ( time ) {

			var i = 0;
			var num_tweens = _tweens.length;
			var time = time !== undefined ? time : Date.now();

			while ( i < num_tweens ) {

				if ( _tweens[ i ].update( time ) ) {

					i ++;

				} else {

					_tweens.splice( i, 1 );
					num_tweens --;

				}

			}

		}

	};

} )();

TWEEN.Tween = function ( object ) {

	var _object = object;
	var _valuesStart = {};
	var _valuesEnd = {};
	var _duration = 1000;
	var _delayTime = 0;
	var _startTime = null;
	var _easingFunction = TWEEN.Easing.Linear.None;
	var _interpolationFunction = TWEEN.Interpolation.Linear;
	var _chainedTween = null;
	var _onUpdateCallback = null;
	var _onCompleteCallback = null;

	this.to = function ( properties, duration ) {

		if ( duration !== null ) {

			_duration = duration;

		}

		_valuesEnd = properties;

		return this;

	};

	this.start = function ( time ) {

		TWEEN.add( this );

		_startTime = time !== undefined ? time : Date.now();
		_startTime += _delayTime;

		for ( var property in _valuesEnd ) {

			// This prevents the engine from interpolating null values
			if ( _object[ property ] === null ) {

				continue;

			}

			// check if an Array was provided as property value
			if ( _valuesEnd[ property ] instanceof Array ) {

				if ( _valuesEnd[ property ].length === 0 ) {

					continue;

				}

				// create a local copy of the Array with the start value at the front
				_valuesEnd[ property ] = [ _object[ property ] ].concat( _valuesEnd[ property ] );

			}

			_valuesStart[ property ] = _object[ property ];

		}

		return this;

	};

	this.stop = function () {

		TWEEN.remove( this );
		return this;

	};

	this.delay = function ( amount ) {

		_delayTime = amount;
		return this;

	};

	this.easing = function ( easing ) {

		_easingFunction = easing;
		return this;

	};

	this.interpolation = function ( interpolation ) {

		_interpolationFunction = interpolation;
		return this;

	};

	this.chain = function ( chainedTween ) {

		_chainedTween = chainedTween;
		return this;

	};

	this.onUpdate = function ( onUpdateCallback ) {

		_onUpdateCallback = onUpdateCallback;
		return this;

	};

	this.onComplete = function ( onCompleteCallback ) {

		_onCompleteCallback = onCompleteCallback;
		return this;

	};

	this.update = function ( time ) {

		if ( time < _startTime ) {

			return true;

		}

		var elapsed = ( time - _startTime ) / _duration;
		elapsed = elapsed > 1 ? 1 : elapsed;

		var value = _easingFunction( elapsed );

		for ( var property in _valuesStart ) {

			var start = _valuesStart[ property ];
			var end = _valuesEnd[ property ];

			if ( end instanceof Array ) {

				_object[ property ] = _interpolationFunction( end, value );

			} else {

				_object[ property ] = start + ( end - start ) * value;

			}

		}

		if ( _onUpdateCallback !== null ) {

			_onUpdateCallback.call( _object, value );

		}

		if ( elapsed == 1 ) {

			if ( _onCompleteCallback !== null ) {

				_onCompleteCallback.call( _object );

			}

			if ( _chainedTween !== null ) {

				_chainedTween.start();

			}

			return false;

		}

		return true;

	};

};

TWEEN.Easing = {

	Linear: {

		None: function ( k ) {

			return k;

		}

	},

	Quadratic: {

		In: function ( k ) {

			return k * k;

		},

		Out: function ( k ) {

			return k * ( 2 - k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k;
			return - 0.5 * ( --k * ( k - 2 ) - 1 );

		}

	},

	Cubic: {

		In: function ( k ) {

			return k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k + 2 );

		}

	},

	Quartic: {

		In: function ( k ) {

			return k * k * k * k;

		},

		Out: function ( k ) {

			return 1 - --k * k * k * k;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return 0.5 * k * k * k * k;
			return - 0.5 * ( ( k -= 2 ) * k * k * k - 2 );

		}

	},

	Quintic: {

		In: function ( k ) {

			return k * k * k * k * k;

		},

		Out: function ( k ) {

			return --k * k * k * k * k + 1;

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1 ) return 0.5 * k * k * k * k * k;
			return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

		}

	},

	Sinusoidal: {

		In: function ( k ) {

			return 1 - Math.cos( k * Math.PI / 2 );

		},

		Out: function ( k ) {

			return Math.sin( k * Math.PI / 2 );

		},

		InOut: function ( k ) {

			return 0.5 * ( 1 - Math.cos( Math.PI * k ) );

		}

	},

	Exponential: {

		In: function ( k ) {

			return k === 0 ? 0 : Math.pow( 1024, k - 1 );

		},

		Out: function ( k ) {

			return k === 1 ? 1 : 1 - Math.pow( 2, - 10 * k );

		},

		InOut: function ( k ) {

			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( ( k *= 2 ) < 1 ) return 0.5 * Math.pow( 1024, k - 1 );
			return 0.5 * ( - Math.pow( 2, - 10 * ( k - 1 ) ) + 2 );

		}

	},

	Circular: {

		In: function ( k ) {

			return 1 - Math.sqrt( 1 - k * k );

		},

		Out: function ( k ) {

			return Math.sqrt( 1 - --k * k );

		},

		InOut: function ( k ) {

			if ( ( k *= 2 ) < 1) return - 0.5 * ( Math.sqrt( 1 - k * k) - 1);
			return 0.5 * ( Math.sqrt( 1 - ( k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return - ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );

		},

		Out: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

		},

		InOut: function ( k ) {

			var s, a = 0.1, p = 0.4;
			if ( k === 0 ) return 0;
			if ( k === 1 ) return 1;
			if ( !a || a < 1 ) { a = 1; s = p / 4; }
			else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
			if ( ( k *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) );
			return a * Math.pow( 2, -10 * ( k -= 1 ) ) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;

		}

	},

	Back: {

		In: function ( k ) {

			var s = 1.70158;
			return k * k * ( ( s + 1 ) * k - s );

		},

		Out: function ( k ) {

			var s = 1.70158;
			return --k * k * ( ( s + 1 ) * k + s ) + 1;

		},

		InOut: function ( k ) {

			var s = 1.70158 * 1.525;
			if ( ( k *= 2 ) < 1 ) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
			return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

		}

	},

	Bounce: {

		In: function ( k ) {

			return 1 - TWEEN.Easing.Bounce.Out( 1 - k );

		},

		Out: function ( k ) {

			if ( k < ( 1 / 2.75 ) ) {

				return 7.5625 * k * k;

			} else if ( k < ( 2 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

			} else if ( k < ( 2.5 / 2.75 ) ) {

				return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

			} else {

				return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

			}

		},

		InOut: function ( k ) {

			if ( k < 0.5 ) return TWEEN.Easing.Bounce.In( k * 2 ) * 0.5;
			return TWEEN.Easing.Bounce.Out( k * 2 - 1 ) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function ( v, k ) {

		var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.Linear;

		if ( k < 0 ) return fn( v[ 0 ], v[ 1 ], f );
		if ( k > 1 ) return fn( v[ m ], v[ m - 1 ], m - f );

		return fn( v[ i ], v[ i + 1 > m ? m : i + 1 ], f - i );

	},

	Bezier: function ( v, k ) {

		var b = 0, n = v.length - 1, pw = Math.pow, bn = TWEEN.Interpolation.Utils.Bernstein, i;

		for ( i = 0; i <= n; i++ ) {
			b += pw( 1 - k, n - i ) * pw( k, i ) * v[ i ] * bn( n, i );
		}

		return b;

	},

	CatmullRom: function ( v, k ) {

		var m = v.length - 1, f = m * k, i = Math.floor( f ), fn = TWEEN.Interpolation.Utils.CatmullRom;

		if ( v[ 0 ] === v[ m ] ) {

			if ( k < 0 ) i = Math.floor( f = m * ( 1 + k ) );

			return fn( v[ ( i - 1 + m ) % m ], v[ i ], v[ ( i + 1 ) % m ], v[ ( i + 2 ) % m ], f - i );

		} else {

			if ( k < 0 ) return v[ 0 ] - ( fn( v[ 0 ], v[ 0 ], v[ 1 ], v[ 1 ], -f ) - v[ 0 ] );
			if ( k > 1 ) return v[ m ] - ( fn( v[ m ], v[ m ], v[ m - 1 ], v[ m - 1 ], f - m ) - v[ m ] );

			return fn( v[ i ? i - 1 : 0 ], v[ i ], v[ m < i + 1 ? m : i + 1 ], v[ m < i + 2 ? m : i + 2 ], f - i );

		}

	},

	Utils: {

		Linear: function ( p0, p1, t ) {

			return ( p1 - p0 ) * t + p0;

		},

		Bernstein: function ( n , i ) {

			var fc = TWEEN.Interpolation.Utils.Factorial;
			return fc( n ) / fc( i ) / fc( n - i );

		},

		Factorial: ( function () {

			var a = [ 1 ];

			return function ( n ) {

				var s = 1, i;
				if ( a[ n ] ) return a[ n ];
				for ( i = n; i > 1; i-- ) s *= i;
				return a[ n ] = s;

			}

		} )(),

		CatmullRom: function ( p0, p1, p2, p3, t ) {

			var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
			return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( - 3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

		}

	}

};
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
/** This is the usual eyelight shader. But to prevent collisions with possible
 *  uses in pages, that include this library and the eyelight shader itself
 *  we give it a unique name.
 */
XML3D.shaders.register("tools-eyelight", {

    vertex : [
        "attribute vec3 position;",
        "attribute vec3 normal;",
        "attribute vec3 color;",
        "attribute vec2 texcoord;",

        "varying vec3 fragNormal;",
        "varying vec3 fragVertexPosition;",
        "varying vec2 fragTexCoord;",

        "uniform mat4 modelViewProjectionMatrix;",
        "uniform mat4 modelViewMatrix;",
        "uniform mat3 normalMatrix;",

        "void main(void) {",
        "    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);",
        "    fragNormal = normalize(normalMatrix * normal);",
        "    fragVertexPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;",
        "    fragTexCoord = texcoord;",
        "}"
    ].join("\n"),

    fragment : [
        "#ifdef GL_ES",
          "precision highp float;",
        "#endif",

        "uniform float ambientIntensity;",
        "uniform vec3 diffuseColor;",
        "uniform vec3 emissiveColor;",
        "uniform float shininess;",
        "uniform vec3 specularColor;",
        "uniform float transparency;",
        "uniform mat4 viewMatrix;",

        "#if HAS_DIFFUSETEXTURE",
        "  uniform sampler2D diffuseTexture;",
        "#endif",

        "varying vec3 fragNormal;",
        "varying vec3 fragVertexPosition;",
        "varying vec2 fragTexCoord;",

        "void main(void) {",
        "  vec3 objDiffuse = diffuseColor;",
        "  float alpha = max(0.0, 1.0 - transparency);",
        "  #if HAS_DIFFUSETEXTURE",
        "    vec4 texDiffuse = texture2D(diffuseTexture, fragTexCoord);",
        "    objDiffuse *= texDiffuse.rgb;",
        "    alpha *= texDiffuse.a;",
        "  #endif",

        "  if (alpha < 0.005) discard;",

        "  vec3 color = emissiveColor + (ambientIntensity * objDiffuse);\n",

        "  vec3 eyeVec = normalize(-fragVertexPosition);",
        "  vec3 lightVec = eyeVec;",
        "  float diffuse = max(0.0, dot(fragNormal, lightVec)) ;",
        "  float specular = pow(max(0.0, dot(fragNormal, eyeVec)), shininess*128.0);",

        "  color = color + diffuse*objDiffuse + specular*specularColor;",
        "  gl_FragColor = vec4(color, alpha);",
        "}"
    ].join("\n"),

    addDirectives: function(directives, lights, params) {
        directives.push("HAS_DIFFUSETEXTURE " + ('diffuseTexture' in params ? "1" : "0"));
    },

    uniforms: {
        diffuseColor    : [1.0, 1.0, 1.0],
        emissiveColor   : [0.0, 0.0, 0.0],
        specularColor   : [1.0, 1.0, 1.0],
        transparency    : 0.0,
        shininess       : 0.5,
        ambientIntensity: 0.0,
        useVertexColor : false
    },

    samplers: {
        diffuseTexture : null
    },
	    attributes: {
        normal : {
            required: true
        },
        texcoord: null
    }
});
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    /**
     * XML3D.tools.Class provides a framework for constructing classes.
     *
     * The basic handling is borrowed from JS.class (http://jsclass.jcoglan.com/).
     * The callSuper() idea is taken from Base (http://dean.edwards.name/weblog/2006/03/base/).
     *
     * @param {Object} [base] the base class to inherit from
     * @param {!Object} body the body of the class
     *
     * This class has following features:
     * o initialize(): define this function and it will be called during object construction
     * o callSuper(): invoke in child class to call the overriden super-class method
     * o callback(<methodname>): wraps the given function to be registered as a callback.
     *
     * Notes about callback():
     *     The method returned from callback() preserves the "this" variable inside the
     *     class method.
     *     Beware with overriden functions in subclasses. Only the first call to
     *     callback(myName) creates the callback for the method myName. All further calls
     *     to callback(myName) return the initally created object!
     *
     *  In english: if a base class uses a method onClick() as a callback, you
     *  in the inherited class should not use another method onClick() as a callback
     *  for yourself, since callback("onClick") will always return the callback of the
     *  base class. (Assuming the base class registers itself first).
     */
    XML3D.tools.Class = function(base, body)
    {
        if(!body)
        {
            body = base;
            base = null;
        }

        // constructor idea taken from JS.class (http://jsclass.jcoglan.com/)
        var constructor = function() {

            if(this.initialize)
                return this.initialize.apply(this, arguments) || this;

            return this;
        };

        if(base) // inheritance
        {
            constructor.prototype = makeBridge(base);

            // remember parent methods
            var methods = extractMethods(base.prototype);
            XML3D.tools.extend(constructor.prototype.__parentMethods, methods);
        }
        else // base class initialization
        {
            constructor.prototype.callSuper = function() {};
            constructor.prototype.__parentMethods = {};

            // method wrapper for callbacks
            constructor.prototype.callback = function(methodName){

                if(!this.__callbacks)
                    this.__callbacks = {};

                if(!this.__callbacks[methodName])
                {
                    var method = this[methodName]; // get the method
                    var self = this;

                    this.__callbacks[methodName] = function() {
                        return method.apply(self, arguments);
                    };
                }

                return this.__callbacks[methodName];
            };
        }

        // extend the class' prototype with the given body
        XML3D.tools.extend(constructor.prototype, body);

        // wrap functions
        for(var name in constructor.prototype)
        {
            // retrieve and validate target function
            var origFn = constructor.prototype[name];
            if(!origFn
            || origFn.constructor !== Function
            || !isClientMethod(name))
                continue;

            // skip methods that don't contain callSuper() calls
            var fnstr = "" + origFn;
            if(0 > fnstr.indexOf("this.callSuper"))
                continue;

            // wrap original call into function that sets the
            // callSuper property to the method of the base class
            (function(){
                var fn = origFn;
                var baseMethod = constructor.prototype.__parentMethods[name];
                if(!baseMethod)
                    baseMethod = function() {};

                constructor.prototype[name] = function() {
                    // This idea is taken from Base (http://dean.edwards.name/weblog/2006/03/base/)
                    var prev = this.callSuper;
                    this.callSuper = baseMethod;

                    var ret = fn.apply(this, arguments);

                    this.callSuper = prev;
                    return ret;
                };
            })();
        }

        return constructor;
    };

    /** XML3D.tools.Singleton is a small utility to create singleton classes.
     *  The idea is also taken from JS.class (http://jsclass.jcoglan.com/).
     *  Thus, see http://jsclass.jcoglan.com/singletons.html for more information.
     *
     *  The advantage is that we can still use all the features from the
     *  XML3D.tools.Class utility.
     */
    XML3D.tools.Singleton = function(base, body)
    {
        var cls = new XML3D.tools.Class(base, body);

        var inst = new cls();
        inst.klass = cls;

        return inst;
    };

    /**
     * This function is a copy from JS.class.
     *
     * @param {!Object} base the base class from which to construct the bridge
     */
    function makeBridge(base)
    {
        /** @constructor */
        var bridge = function() {};
        bridge.prototype = base.prototype;
        return new bridge();
    };

    /**
     * Checks if the given method name is a function that is not created
     * by XML3D.tools.Class, but by the class user.
     *
     * @param {string} name the name to check
     */
    function isClientMethod(name)
    {
        if(name === "callSuper"
        || name.indexOf("__") === 0
        || name === "callback")
            return false;

        return true;
    };

    /**
     * Extract all methods from the given object that are client methods.
     *
     * @param {!Object} obj the object to copy the methods from
     *
     * @return {Object} a new object containing only the methods from obj
     *
     * \sa XML3D.tools.Class.isClientMethod()
     */
    function extractMethods(obj)
    {
        var methodObj = {};

        for(var name in obj)
        {
            var member = obj[name];

            if(!member) // members initialized to null
                continue;

            if(member.constructor === Function
            && isClientMethod(name))
            {
                methodObj[name] = member;
            }
        }

        return methodObj;
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /**
     * global variable, used to check if an animation or movement is currently in progress
     */
    XML3D.tools.animating = false;

    /**
     * global variable, set a function, which is called within the animation loop
     */
    XML3D.tools.animationHook = undefined;

    /**
     * a cameracontroller register here and the update of the gamepad is called
     */
    XML3D.tools.registeredCameraController = undefined;

    /**
     * Updates all the Tweens until all animations are finished and calls the hook.
     */
    XML3D.tools.animate = function(){
        if(TWEEN.getAll().length || XML3D.tools.animationHook || XML3D.tools.registeredCameraController) {
            window.requestAnimFrame(XML3D.tools.animate, undefined);
            if(XML3D.tools.animationHook) XML3D.tools.animationHook();
            if(XML3D.tools.registeredCameraController) XML3D.tools.registeredCameraController.update();
            TWEEN.update();
        }
        else
            XML3D.tools.animating = false;
    };

    /**
     * Merges two optionsobjects
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}} high options with high priority
     * @param {{duration: number, loop: number, delay: number, easing: Function, callback: Function}} low options with low priority
     * @return {{duration: number, loop: number, delay: number, easing: Function, callback: Function}} merged options
     */
    XML3D.tools.mergeOptions = function(high, low){
        var ret = {};
        high = high || {};
        low = low || {};
        ret.duration 	= high.duration || low.duration;
        ret.loop 		= high.loop 	|| low.loop;
        ret.delay 		= high.delay 	|| low.delay;
        ret.easing 		= high.easing 	|| low.easing;
        ret.callback 	= high.callback || low.callback;
        return ret;
    };

    /**
     *  Creates a namespace and subnamespaces, that are contained in the path.
     *
     *  @param {string} fullName the full name of the namespace
     *
     *  Example:
     *
     *  namespace("XML3D.tools.interaction.behaviors"]) will create:
     *
     *  XML3D.tools.interaction.behaviors
     */
    XML3D.tools.namespace = function(fullName)
    {
        var curParentNS = window;

        var namespacePath = fullName.split(".");

        for(var i = 0; i < namespacePath.length; i++)
        {
            var ns = namespacePath[i];

            if(!curParentNS[ns])
                curParentNS[ns] = {};

            curParentNS = curParentNS[ns];
        }
    };

    /** Extend the target object with all attributes from the source object
     *
     *  @param tarobj the object to be extended
     *  @param srcobj the object from which to take the attributes
     *  @return {Object} the given, updated target object
     */
    XML3D.tools.extend = function(tarobj, srcobj)
    {
        for(var attr in srcobj)
            tarobj[attr] = srcobj[attr];

        return tarobj;
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * This file constructs the XML3D.tools.math namespace.
 */
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.math");

    var m = XML3D.tools.math;

    m.EPSILON = 1E-10;

    /**
     * Converts axis angle representation into an quaternion
     * @param {Array.<number>} axis
     * @param {number} angle
     * @return {Array.<number>} quaternion
     */
    m.axisAngleToQuaternion = function(axis, angle) {
        var normAxis = XML3D.tools.math.normalizeVector(axis);
        var quat = [];
        var s = Math.sin(angle/2);
        quat[0] = normAxis[0] *s;
        quat[1] = normAxis[1] *s;
        quat[2] = normAxis[2] *s;
        quat[3] = Math.cos(angle/2);
        return quat;
    };

    /**
     * Normalizes a 3D vector
     * @param {Array.<number>} vector
     * @return {Array.<number>} normalized vector
     */
    m.normalizeVector = function(vector) {
        var length = Math.sqrt( vector[0]*vector[0] + vector[1]*vector[1] + vector[2]*vector[2] );
        if(length == 0) return vector;
        return [vector[0]/length, vector[1]/length, vector[2]/length];
    };

    /**
     * Converts a quaternion into an axis angle representation
     * @param {Array.<number>} quat
     * @return {{axis: Array.<number>, angle:number}}
     */
    m.quaternionToAxisAngle = function(quat) {
        quat4.normalize(quat); //normalise to avoid erros that may happen if qw > 1
        var angle = 2*Math.acos(quat[3]);
        var s = Math.sqrt(1-quat[3]*quat[3]);
        if(s < 0.00001 ) s = 1; //avoid div by zero, direction not important for small s
        var x = quat[0]/s;
        var y = quat[1]/s;
        var z = quat[2]/s;
        return {axis:[x,y,z], angle:angle};
    };

    /**
     * Interpolate between two quaternions the shortest way
     * @param{XML3DRotation} from quaternion from
     * @param{XML3DRotation} to quaternion to
     * @param{number} t interpolation parameter
     */
    m.slerp = function(from, to, t) {
        var result = new XML3DRotation();
        // Calculate angle between them -> dotProduct
        var fromAsArray = from.getQuaternion();
        var toAsArray = to.getQuaternion();
        var dotProduct = fromAsArray[0] * toAsArray[0] + fromAsArray[1] * toAsArray[1] + fromAsArray[2] * toAsArray[2] + fromAsArray[3] * toAsArray[3];
        //invert, to make sure we interpolate the shortest way
        if( dotProduct < 0 )
        {
            dotProduct = -dotProduct;
            toAsArray[0] = -toAsArray[0];
            toAsArray[1] = -toAsArray[1];
            toAsArray[2] = -toAsArray[2];
            toAsArray[3] = -toAsArray[3];
        }

        var p = 0;
        var q = 0;
        if( (1-dotProduct) > 0.0001 ) {
            //default case
            var omega = Math.acos(dotProduct);
            var sinomega = Math.sin(omega);
            p = Math.sin((1-t)*omega) / sinomega;
            q = Math.sin(t*omega) / sinomega;
        }
        else {
            //linear interpolation
            p = 1.0-t;
            q = t;
        }

        var x = p * fromAsArray[0] + q * toAsArray[0];
        var y = p * fromAsArray[1] + q * toAsArray[1];
        var z = p * fromAsArray[2] + q * toAsArray[2];
        var w = p * fromAsArray[3] + q * toAsArray[3];
        result.setQuaternion( new XML3DVec3(x, y, z), w);
		return result;
    };

    /** Convert degrees to radians.
     *
     *  @param {number} deg angle in degrees.
     *  @return {number} given angle in radians.
     */
    m.degToRad = function(deg)
    {
        return (deg*(Math.PI/180));
    };

    /** Convert radians to degrees
     *
     *  @param {number} rad angle in radians
     *  @return {number} given angle in degrees.
     */
    m.radToDeg = function(rad)
    {
        return (rad*(180/Math.PI));
    };

    /** Interpret the given vector as a scaling property and convert it
     *  to the inverse scaling, which is defined by 1 divided by the vector's
     *  components.
     *
     *  @param {XML3DVec3} vec the scaling vector to convert
     *  @return {XML3DVec3} the inverse scaling vector
     */
    m.vecInverseScale = function(vec)
    {
        return new XML3DVec3(1/vec.x, 1/vec.y, 1/vec.z);
    };

    /** Intersect a given ray with a plane formed by plOrigin and plNormal.
     *  It will store the hit point in the last given argument and return
     *  a number, which describes the intersection.
     *
     *  @param {XML3DRay} ray
     *  @param {XML3DVec3} plOrigin
     *  @param {XML3DVec3} plNormal
     *  @param {XML3DVec3} hitPoint
     *  @return {number} -1 if ray inside plane, 0 if no intersection, 1 if intersection at single point
     */
    m.intersectRayPlane = function(ray, plOrigin, plNormal, hitPoint)
    {
        // Algorithm taken from http://en.wikipedia.org/wiki/Line-plane_intersection

        var d = plOrigin.dot(plNormal);

        // calculate distance t on ray
        var num = d - ray.origin.dot(plNormal);
        var denom = ray.direction.dot(plNormal);

        if(Math.abs(denom) < XML3D.EPSILON)
        {
            if(Math.abs(num) < XML3D.EPSILON)
                return -1;
            else
                return 0;
        }

        var t = num / denom;

        // calculate hit point
        if(hitPoint !== undefined)
        {
            var scalDir = ray.direction.scale(t);
            var hit = ray.origin.add(scalDir);

            hitPoint.x = hit.x;
            hitPoint.y = hit.y;
            hitPoint.z = hit.z;
        }

        return 1;
    };

    /** Computes the transformation matrix from the given source plane to
     * the destination plane.
     *
     * @param {XML3DVec3} srcOrig
     * @param {XML3DVec3} srcNorm
     * @param {XML3DVec3} [destOrig] if not given, (0,0,0) is taken
     * @param {XML3DVec3} [destNorm]  if not given, (0,0,1) is taken
     *
     * @return {XML3DMatrix} a matrix that represents the transformation from
     *                  source to destination.
     */
    m.getTransformPlaneToPlane = function(srcOrig, srcNorm, destOrig, destNorm)
    {
        // default params
        if(!destOrig)
            destOrig = new window.XML3DVec3(0,0,0);
        if(!destNorm)
            destNorm = new window.XML3DVec3(0,0,1);

        // generate translation & rotation
        var transl = destOrig.subtract(srcOrig);
        var rot = new window.XML3DRotation();
        rot.setRotation(srcNorm, destNorm);

        // make matrix
        var xfmMat = new window.XML3DMatrix();
        xfmMat = xfmMat.translate(transl.x, transl.y, transl.z);
        xfmMat = xfmMat.rotateAxisAngle(rot.axis.x, rot.axis.y, rot.axis.z, rot.angle);

        return xfmMat;
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /**
     * A Transformable implementation.
     * @constructor
     * @implements{Transformable}
     */
    XML3D.tools.Transformable = new XML3D.tools.Class({

        initialize: function(object, transform, constraint) {
            /**
             * Object which shall be transformable
             * @type {Object}
             */
            this.object = object;
            /**
             * Transform coords of the object and the Transformable
             * @protected
             * @type {Object}
             */
            this.transform = transform;

            /**
             * Constraint of the movement
             * @protected
             * @type {Constraint}
             */
            if(!constraint)
                constraint = new XML3D.tools.SimpleConstraint(true, true, true);
            this.constraint = constraint;

            /**
             * Queue of movements
             * @private
             * @type {Array.<{tween: tween, startPosition:Array.<number>, endPosition:Array.<number>, startOrientation:Array.<number>, endOrientation:Array.<number>}>}
             */
            this._motionQueue = [];
        },

        /** @inheritDoc */
        setPosition: function(position){
            if(this.constraint.constrainTranslation(position, {transformable: this})) {
                this.transform.translation.set(position);
                return true;
            }

            return false;
        },

        /** @inheritDoc */
        setOrientation: function(orientation){
            if(this.constraint.constrainRotation(orientation, {transformable: this})){
                this.transform.rotation.set(orientation);
                return true;
            }

            return false;
        },

        /** @inheritDoc */
        setScale: function(scale){
            if(this.constraint.constrainScaling(scale, {transformable: this})){
                this.transform.scale.set(scale);
                return true;
            }

            return false;
        },

        /** @inheritDoc */
        getPosition: function(){
            return new XML3DVec3(this.transform.translation);
        },

        /** @inheritDoc */
        getOrientation: function(){
            return new XML3DRotation(this.transform.rotation);
        },

        /** @inheritDoc */
        getScale: function(){
            return new XML3DVec3(this.transform.scale);
        },

        /** @inheritDoc */
        translate: function(translation){
            return this.setPosition( translation.add(this.getPosition()) );
        },

        /** @inheritDoc */
        rotate: function(orientation){
            var destination = new XML3DRotation(this.transform.rotation, undefined, undefined);
            destination = destination.multiply( orientation );

            if(this.constraint.constrainRotation(orientation, {transformable: this})) {
                this.transform.rotation.set(destination);
                return true;
            }

            return false;
        },

        /** @inheritDoc */
        scale: function(factor){
            var newScale = this.transform.scale.multiply(factor);
            if(this.constraint.constrainScaling(newScale, {transformable: this})) {
                this.transform.scale.set(newScale);
                return true;
            }

            return false;
        },

        /** @inheritDoc */
        moveTo: function(position, orientation, time, opt){
            opt = opt || {};
            //no movement needed
            var queueingAllowed = opt.queueing || true;
            if( (position == undefined && orientation == undefined) || //nowhere to moveto
                (!queueingAllowed && this.movementInProgress()) || //queuing forbiden, but something in progress
                (this._checkIfNoNeedToMove(position, orientation)) ){
                if(opt.callback) opt.callback();
                return this;
            }

            //create new queue entry of the new given data:
            var newEntry = {};
            var tween = new TWEEN.Tween({t:0}).to({t:time}, time);
            if(opt.delay != undefined) tween.delay(opt.delay);
            var that = this;
            var easing = opt.easing;
            //update callback
            tween.onUpdate( function() {
                //this is the data interpolated by the tween
                that._movement(this.t, 0, time, easing);
            } );
            //callback on complete
            tween.onComplete( function(){
                //this is the data interpolated by the tween

                //start next tween (beginning of the queue), if there is any in the queue
                if(that._motionQueue.length > 1){ //we did not remove the finished one yet
                    //set startpos / ori of the following moveTo, instead of setting at definition
                    var followingMovement = that._motionQueue[1];
                    var endedMovement = that._motionQueue[0];
                    followingMovement.startPosition = endedMovement.endPosition || that.getPosition();
                    followingMovement.startOrientation = endedMovement.endOrientation || that.getOrientation();
                    followingMovement.tween.start();
                }
                //remove finished tween from the beginning of the queue
                that._motionQueue.shift();
                //callback after the movement finished
                if(opt.callback && typeof(opt.callback) === "function")
                    opt.callback();
            });
            newEntry.tween = tween;
            newEntry.endPosition = position;
            newEntry.endOrientation = orientation;
            //default start values, are the current values
            //those are overwritten if a tween ends before us, see the onComplete callback
            newEntry.startPosition = new XML3DVec3( this.getPosition() );
            newEntry.startOrientation = new XML3DRotation( this.getOrientation() );

            //push tween to the end of the queue and start if queue was empty
            this._motionQueue.push(newEntry);
            if( this._motionQueue.length-1 == 0){
                newEntry.tween.start();
                if(!XML3D.tools.animating) {
                    XML3D.tools.animate();
                    XML3D.tools.animating = true;
                }
            }
            return this;
        },

        /** @inheritDoc */
        movementInProgress: function(){
            return this._motionQueue.length > 0;
        },

        /**@inheritDoc */
        stop: function(){
            var motion = this._motionQueue.shift();
            if(motion) motion.tween.stop();
            this._motionQueue = [];
            return this;
        },

        /** @inheritDoc */
        setConstraint: function(constraint){
            this.constraint = constraint;
        },

        /**
         * Checks if we need to move to a poi or if we are already there
         * @private
         * @param {Array.<number>} position
         * @param {Array.<number>} orientation
         * @return {boolean}
         */
        _checkIfNoNeedToMove: function(position, orientation){
            if(!position && !orientation) return true;
            if(!position && orientation) return this._checkPosition(orientation);
            if(position && !orientation) return this._checkPosition(position);
            return this._checkPosition(position) && this._checkPosition(orientation);
        },

        /**
         * check if current position equals moveTo position
         * @private
         * @param {Array.<number>} position
         * @return {boolean}
         */
        _checkPosition: function(position){
            var curPos = this.transform.translation;
            return (curPos.x == position.x && curPos.y == position.y && curPos.z == position.z);
        },

        /**
         * check if current orientation equals moveTo orientation
         * @private
         * @param {Array.<number>} orientation
         * @return {boolean}
         */
        _checkOrientation: function(orientation){
            var curOri = this.transform.orientation;
            return (curOri.x === orientation.x && curOri.y === orientation.y && curOri.z === orientation.z && curOri.w === orientation.w);
        },

        /**
         * Applies one movement step to the transformable
         * @private
         * @param {number}currentTime
         * @param {number} startTime
         * @param {number} endTime
         * @param {Function} easing
         */
        _movement: function(currentTime, startTime, endTime, easing){
            var t = (currentTime - startTime) / (endTime - startTime);
            if(easing && typeof(easing) === "function") t = easing(t); //otherwise its linear
            var pos = this._interpolatePosition(t);
            var ori = this._interpolateOrientation(t);
            this._setValue(pos, ori);
        },

        /**
         * Interpolates the position of the current movement
         * @private
         * @param {number} t interpolation parameter
         * @return {Array.<number>|undefined} position
         */
        _interpolatePosition: function(t){
            var end = this._motionQueue[0].endPosition;
            if(end == undefined) return undefined;
            var start = this._motionQueue[0].startPosition;
            var interpolatedX = start.x + ( end.x - start.x ) * t;
            var interpolatedY = start.y + ( end.y - start.y ) * t;
            var interpolatedZ = start.z + ( end.z - start.z ) * t;
            return new XML3DVec3( interpolatedX, interpolatedY, interpolatedZ );
        },

        /**
         * interpoaltes the orientation of the current movement
         * @private
         * @param {number} t interpolation paramater
         * @return {Array.<number>|undefined} orientation
         */
        _interpolateOrientation: function(t){
            var end = this._motionQueue[0].endOrientation;
            if(end == undefined) return undefined;
            var start = this._motionQueue[0].startOrientation;
            return XML3D.tools.math.slerp(start, end, t);
        },

        /**
         * Set position and orientation of the transformable. A setting of orientation
         * will be perfomed independent of the outcome of setPosition().
         * @private
         * @param {Array.<number>|undefined} position
         * @param {Array.<number>|undefined} orientation
         * @return {boolean} true if the setting was permitted by the constraint
         */
        _setValue: function(position, orientation){
            var settingSuccessful = true;

            if(position !== undefined)
                settingSuccessful = this.setPosition(position);
            if(orientation !== undefined) {
                var didSet = this.setOrientation(orientation);
                settingSuccessful = settingSuccessful && didSet;
            }

            return settingSuccessful;
        }
    });

}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /**
     * MotionFactory implementation
     * @constructor
     * @implements{MotionFactory}
     */
    XML3D.tools.MotionFactory = new XML3D.tools.Singleton({

        /** @this XML3D.tools.MotionFactory */
        initialize: function()
        {
            /** Counter to create unique IDs for the elements added to DOM.
             *  Is in closure: same for every instance so no ID clashes will
             *  occur across multiple instances of the factory.
             *
             *  @private
             */
            this.id = 0;
        },

        /** @inheritDoc
         *  @this XML3D.tools.MotionFactory
         */
        createTransformable: function(element, constraint)
        {
            if(!element)
                throw "No valid element, cannot create Transformable.";

            if(element instanceof window.Element)
            {
                // bare element
                return new XML3D.tools.Transformable(element, this.getTransform(element), constraint);
            }
            else if(element.object && element.transform && element.constraint)
            {
                // transformable
                var constraints = [constraint, element.constraint];
                var constraintCollection = new XML3D.tools.ConstraintCollection(constraints);

                return new XML3D.tools.Transformable(element.object, element.transform, constraintCollection);
            }
            else
                throw "No valid element, cannot create Transformable.";

        },

        /** @inheritDoc
         *  @this XML3D.tools.MotionFactory
         */
        createAnimatable: function(element, constraint)
        {
            if(!element) throw "No valid element, cannot create Animatable.";
            return new XML3D.tools.Animatable(element, this.getTransform(element), constraint);
        },

        /** @inheritDoc
         *  @this XML3D.tools.MotionFactory
         */
        createKeyframeAnimation: function(name, element, opt)
        {
            if(!element) throw "No valid element, cannot create Animatable.";
            var child = element.firstElementChild;
            var keys = undefined;
            var position = undefined;
            var orientation = undefined;
            var scale = undefined;
            while(child){
                //TODO: does child.name work for native?
                switch(child.name){
                    case "key" :         keys = this.getValueFromChild(child, undefined); break;
                    case "position" :    position = this.getValueFromChild(child, keys.length*3); break;
                    case "orientation" : orientation = this.getValueFromChild(child, keys.length*4); break;
                    case "scale" :       scale = this.getValueFromChild(child, keys.length*3); break;
                    default: break;
                }
                child = child.nextElementSibling;
            }
            if(!keys || (!position && !orientation && !scale)){
                throw "Element is not a valid keyframe animation";
            }
            else{
                return new XML3D.tools.KeyframeAnimation(name, keys, position, orientation, scale, opt);
            }
        },

        /**
         * get Values from child
         * @this XML3D.tools.MotionFactory
         *
         * @param {*} child
         * @param {number}
         * @return {Array.<number>}
         */
        getValueFromChild: function(child, number)
        {
            if(!XML3D._native)
            {
                var val = child.value;
                if(!val || (number && val.length != number )) return undefined;
                else return val;
            }
            else
            {
                throw "Animations are currently not supported in native Version.";
                //TODO: code for native version
            }
        },

        /**
         * creates a unique id
         * @this XML3D.tools.MotionFactory
         *
         * @return {string} unique id
         */
        createUniqueId: function()
        {
            return "createdByClientMotionFactory" + this.id++;
        },

        /**
         * Gets the transform of an element and creates a transform if necessary
         * @this XML3D.tools.MotionFactory
         *
         * @param {Object} obj element
         * @return {Object} transform
         */
        getTransform: function(obj)
        {
            return XML3D.tools.util.getOrCreateTransform(obj, this.createUniqueId());
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

	/**
	 * An implementation of Animatable
	 * @implements Animatable
	 * @extends Transformable
	 */
    XML3D.tools.Animatable = new XML3D.tools.Class(XML3D.tools.Transformable, {

        initialize: function(obj, transform, constraint){

            this.callSuper(obj, transform, constraint);

            /**
             * Map of KeyframeAnimations
             * The key of the map is  a string, which is the name of the animation
             * type:  Map.key: string, Map.data: {animation: Animation, opt: Object}
             * @private
             * @type {Object}
             */
            this._availableAnimations = {};
            /**
             * Map of active KeyframeAnimations
             * Note: This works since the IDs are only numbers.
             * Those numbers are turned into strings  and those are used as keys.
             * type: Map.key: number, Map.data: {animation: Animation, clockGenerator: TWEEN.Tween, opt: Object}
             * @private
             * @type {Object}
             */
            this._activeAnimations = {};
            /**
             * Counter of IDs for active animations
             * Attention: this might turn to infinity
             * @private
             * @type {number}
             */
            this._idCounter = 0;
        },

        /**
         * @param animation
         * @param opt
         * @returns {XML3D.tools.Animatable}
         *
         * options:
         *  o duration (seconds)
         *  o delay: start animation after this delay (seconds)
         *  o startTime: do not start the animation from the beginning, but from this time (absolute, seconds)
         *  o easing: function(normalizedTime): time, a function to be applied to the normalized time during an animation
         *  o callback: function to be invoked when the animation completed
         */
        addAnimation: function(animation, opt)
        {
            //do not change options of the animation, store options of the animation of this animatable
            //same animation might have different options on another animatable
            this._availableAnimations[animation.name] = {};
            var tmp = this._availableAnimations[animation.name];
            tmp.opt = XML3D.tools.mergeOptions(opt, animation.getOptions());
            tmp.animation = animation;
            return this;
        },

        /**
         * @param name
         * @param opt see XML3D.tools.Animatable.addAnimation() for a list of supported options
         * @returns {number}
         */
        startAnimation: function(name, opt)
        {
            var id = this._idCounter;
            this._idCounter++;

            var animation = this._availableAnimations[name];
            if(!animation)
                throw new Error("Add animation before starting animation: " + name);

            this._activeAnimations[id] = {
                animation: animation.animation,
                opt: XML3D.tools.mergeOptions(opt, animation.opt)
            };

            this._startClockGenerator(id);
            return id;
        },

        /** @inheritDoc */
        stopAnimation: function(id){
            var toStop = this._activeAnimations[id];
            if(toStop)
            {
                toStop.clockGenerator.stop();
                this._activeAnimations[id] = undefined;
            }
            return this;
        },

        /**
         * Starts a ClockGenerator which calls the Animation "from time to time", which then applies the current status of the animation to the animatable.
         * @private
         */
        _startClockGenerator: function(id)
        {
            var animation = this._activeAnimations[id];
            animation.clockGenerator = this._createClockGenerator(id, animation);
            animation.clockGenerator.start();
            this._startGlobalAnimation();
        },

        _createClockGenerator: function(id, animation)
        {
            //use a tween as a clock generator
            var opt = animation.opt;
            var time = opt.duration;
            var startTime = (opt.startTime !== undefined) ? opt.startTime : 0;

            var clockGenerator = new TWEEN.Tween({t:startTime}).to({t:time}, time).delay(opt.delay);

            //setup update and complete callbacks
            var that = this;
            clockGenerator.onUpdate(function(){
                //this is the interpolated object!
                animation.animation.applyAnimation(that, this.t, 0, time, opt.easing);
            });

            clockGenerator.onComplete( function(){
                //this is the interpolated object!
                //animation ended -> callback or loop
                var numberOfLoops = opt.loop;
                if(isFinite(numberOfLoops))
                {
                    if( numberOfLoops > 1 )
                    {
                        //we must loop again
                        opt.loop = numberOfLoops - 1;
                        that._startClockGenerator(id);
                    }
                    else
                    {
                        //no more loops, we are finished and now the callback
                        if(typeof(opt.callback) === "function") opt.callback();
                        animation = undefined; //clean up
                    }
                }
                else{
                    //infinite loops
                    that._startClockGenerator(id);
                }
            });

            return clockGenerator;
        },

        _startGlobalAnimation: function()
        {
            if(!XML3D.tools.animating)
            {
                XML3D.tools.animating = true;
                XML3D.tools.animate();
            }
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /**
     * KeyframeAnimation implementation
     * @implements{Animation}
     */
    XML3D.tools.KeyframeAnimation = new XML3D.tools.Class({

        /**
         * @param{string} name name of the animation
         * @param{Array.<number>} keys keys
         * @param{Array.<number>|undefined} positionValues
         * @param{Array.<number>|undefined} orientationValues
         * @param{Array.<number>|undefined} scaleValues
         * @param{Object} opt
         */
        initialize: function(name, keys, positionValues, orientationValues, scaleValues, opt)
        {
            /**
             * name of animation
             * @type {string}
             */
            this.name = name;

            /**
             * Array of the keys
             * @private
             * @type{Array.<number>}
             */
            this._keys = keys;
            /**
             * Array fo the position values
             * @private
             * @type{Array.<number>|undefined}
             */
            this._positionValues = positionValues;
            /**
             * Array of the orientation values
             * @private
             * @type{Array.<number>|undefined}
             */
            this._orientationValues = orientationValues;
            /**
             * Array of the scale values
             * @private
             * @type{Array.<number>|undefined}
             */
            this._scaleValues = scaleValues;

            //options - set defaults
            /**
             * loop
             * @private
             * @type {number}
             */
            this._loop = 1;
            /**
             * delay
             * @private
             * @type{number}
             */
            this._delay = 0;
            /**
             * Duration of the animation
             * @private
             * @type {number}
             */
            this._duration = 1000;
            /**
             * easing
             * @private
             * @type {Function}
             */
            this._easing = TWEEN.Easing.Linear.None;
            /**
             * Callback, executed as soon as the animation ended
             * @private
             * @type {Function}
             */
            this._callback = function(){};
            if(opt)
                this.setOptions(opt);
        },

        /** @inheritDoc */
        applyAnimation: function(animatable, currentTime, startTime, endTime, easing)
        {
            var t = (currentTime - startTime) / (endTime - startTime);
            if(easing && typeof(easing) === "function")
                t = easing(t); //otherwise its linear

            var indexOfLastKey = this._keys.length - 1;
            if (t <= this._keys[0])
                this._setValueByKeyIndex(animatable, 0);
            else if (t >= this._keys[indexOfLastKey])
                this._setValueByKeyIndex(animatable, indexOfLastKey);
            else
                this._interpolateKeyValue(animatable, t);
        },

        /** @inheritDoc */
        getOptions: function()
        {
            return {
                duration: this._duration,
                loop: this._loop,
                delay: this._delay,
                easing: this._easing,
                callback: this._callback
            };
        },

        /** @inheritDoc */
        setOptions: function(opt)
        {
            if(opt.loop)
                this._loop = opt.loop;
            if(opt.duration)
                this._duration = opt.duration;
            if(opt.easing && typeof(opt.easing) === "function")
                this._easing = opt.easing;
            if(opt.callback && typeof(opt.callback) === "function")
                this._callback = opt.callback;
        },

        _setValueByKeyIndex: function(animatable, keyIndex)
        {
            this._setValue(animatable, this._getPosition(keyIndex),
                this._getOrientation(keyIndex), this._getScale(keyIndex));
        },

        /**
         * Set position and animation of the animatable
         * @private
         * @param {Animatable} animatable
         * @param {XML3DVec3} position
         * @param {XML3DRotation} orientation
         * @param {XML3DVec3} scale
         */
        _setValue: function(animatable, position, orientation, scale)
        {
            if(this._positionValues !== undefined)
                animatable.setPosition(position);
            if(this._orientationValues != undefined)
                animatable.setOrientation(orientation);
            if(this._scaleValues != undefined)
                animatable.setScale(scale);
        },

        /**
         * Interpolates positionvalues between index i and index i+1 with parameter t
         * @private
         * @param {number} index
         * @param {number} t interpolationparameter
         * @return {XML3DVec3} Position
         */
        _getInterpolatedPosition: function(index, t)
        {
            return this._interpolateXML3DVec3(this._getPosition(index), this._getPosition(index+1), t);
        },

        /**
         * Interpolates scalevalues between index i and index i+1 with parameter t
         * @private
         * @param {number} index
         * @param {number} t interpolationparameter
         * @return {XML3DVec3} Position
         */
        _getInterpolatedScale: function(index, t)
        {
            return this._interpolateXML3DVec3(this._getScale(index), this._getScale(index+1), t);
        },

        /**
         * Interpolate the values of two arrays
         * @private
         * @param {XML3DVec3} vec1
         * @param {XML3DVec3} vec2
         * @param {number} t interpolationparameter
         * @return {XML3DVec3} interpolated array
         */
        _interpolateXML3DVec3: function(vec1, vec2, t)
        {
            var interpolatedX = vec1.x + ( vec2.x - vec1.x ) * t;
            var interpolatedY = vec1.y + ( vec2.y - vec1.y ) * t;
            var interpolatedZ = vec1.z + ( vec2.z - vec1.z ) * t;
            return new XML3DVec3( interpolatedX, interpolatedY, interpolatedZ );
        },

        /**
         * Interpolates keyvalues between index i and index i+1 with parameter t
         * @private
         * @param {number} index
         * @param {number} t interpolationparameter
         * @return {Array.<number>} Orientation
         */
        _getInterpolatedOrientation: function(index, t)
        {
            var start = this._getOrientation(index);
            var end = this._getOrientation(index+1);
            return XML3D.tools.math.slerp(start, end, t);
        },

        /**
         * Gets a position corresponding to a key
         * @private
         * @param {number} key
         * @return {XML3DVec3|undefined} Position
         */
        _getPosition: function(key)
        {
            if(this._positionValues === undefined)
                return new XML3DVec3();

            if(key > this._keys.length - 1)
                key = this._keys.length - 1;
            var index = key*3;
            return new XML3DVec3(this._positionValues[index],
                this._positionValues[index+1], this._positionValues[index+2]);
        },

        /**
         * Gets a sacle corresponding to a key
         * @private
         * @param {number} key
         * @return {XML3DVec3|undefined} Position
         */
        _getScale: function(key)
        {
            if(this._scaleValues === undefined)
                return new XML3DVec3(1,1,1);

            if(key > this._keys.length - 1)
                key = this._keys.length - 1;
            var index = key*3;
            return new XML3DVec3(this._scaleValues[index], this._scaleValues[index+1],
                this._scaleValues[index+2] );
        },

        /**
         * Gets an orientation corresponding to a key
         * @private
         * @param {number} key
         * @return {XML3DRotation} Orientation
         */
        _getOrientation: function(key)
        {
            if(this._orientationValues === undefined)
                return new XML3DRotation();

            if(key > this._keys.length - 1)
                key = this._keys.length - 1;
            var index = key*4;
            var ret = new XML3DRotation();
            ret.setQuaternion( new XML3DVec3(
                this._orientationValues[index], this._orientationValues[index+1],
                this._orientationValues[index+2]), this._orientationValues[index+3]);
            return ret;
        },

        _interpolateKeyValue: function(animatable, keyValue)
        {
            var keyIndex = this._getInterpolationKeyIndex(keyValue);
            var interpolatedValue = this._interpolateKeys(keyValue, keyIndex);
            this._setInterpolatedValueByKeyIndex(animatable, keyIndex, interpolatedValue);
        },

        _getInterpolationKeyIndex: function(keyValue)
        {
            var indexOfLastKey = this._keys.length - 1;
            for(var i = 0; i < indexOfLastKey; i++)
            {
                if(this._keys[i] <= keyValue && keyValue <= this._keys[i + 1])
                    return i;
            }

            return indexOfLastKey;
        },

        _interpolateKeys: function(keyValue, keyIndex)
        {
            return (keyValue - this._keys[keyIndex]) / (this._keys[keyIndex + 1] - this._keys[keyIndex]);
        },

        _setInterpolatedValueByKeyIndex: function(animatable, keyIndex, interpolatedValue)
        {
            var position = this._getInterpolatedPosition(keyIndex, interpolatedValue);
            var orientation = this._getInterpolatedOrientation(keyIndex, interpolatedValue);
            var scale = this._getInterpolatedScale(keyIndex, interpolatedValue);
            this._setValue(animatable, position, orientation, scale);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/** Contains useful extensions of XML3D's datatypes, i.e. XML3DBox, XML3DMatrix aso.
 *  Every data type will have a str() method for a pretty string representation. For other
 *  extensions see the code below.
 */

(function() {

    /**
     * @const
     */
    XML3D.EPSILON = 0.00001;

    /**
     * Compare two values for equality that differ at most by
     * XML3D.EPSILON.
     *
     * @param {number} a
     * @param {number} b
     * @param {number=} epsilon. Default: XML3D.EPSILON
     *
     * @return {boolean} true if a and b differ by at most XML3D.EPSILON
     */
    XML3D.epsilonEquals = function(a, b, epsilon) {

        if(epsilon === undefined)
            epsilon = XML3D.EPSILON;

        var diff = a - b;
        return (Math.abs(diff) <= XML3D.EPSILON);
    };
}());

// ========================================================================
// === XML3DBox ===
// ========================================================================
(function() {

    if(!window.XML3DBox)
        return;

    var p = window.XML3DBox.prototype;

    /**
     * @this {XML3DBox}
     * @return {number} the size of the bounding box
     */
    p.size = function() {

        return this.max.subtract(this.min);
    };

    /**
     * @this {XML3DBox}
     * @param {!XML3DBox} other the bounding box to test intersection with
     * @return {boolean} true if this and the other bbox intersect
     */
    p.intersects = function(other) {

        return (this.min.x < other.max.x) && (this.max.x > other.min.x)
        &&     (this.min.y < other.max.y) && (this.max.y > other.min.y)
        &&     (this.min.z < other.max.z) && (this.max.z > other.min.z);

    };

    /**
     * @this {XML3DBox}
     * @param {!XML3DVec3} point to test intersection with
     * @return {boolean} true if this and the other bbox intersect
     */
    p.contains = function(point) {
        if(this.min.x > point.x || this.min.y > point.y || this.min.z > point.z)
            return false;
        if(this.max.x < point.x || this.max.y < point.y || this.max.z < point.z)
            return false;

        return true;
    };

    /**
     * @this {XML3DBox}
     * @return {string} string representation of the bounding box
     */
    p.str = function() {
        return "[ min: " + this.min.str() + "; max: " + this.max.str() + "]";
    };

    /**
     * @this {XML3DBox}
     * @param {!XML3DBox} other the bounding box to test equality
     * @param {number=} epsilon. Default XML3D.EPSILON
     * @return {boolean} true if the two bounding boxes' components differ at most by XML3D.EPSILON
     */
    p.equals = function(other, epsilon)
    {
        return this.min.equals(other.min, epsilon)
            && this.max.equals(other.max, epsilon);
    };

    /**
     * Transforms the min and max of this box with the given matrix.
     * Afterwards validates it.
     *
     * @this {XML3DBox}
     * @param {!XML3DMatrix} mat the matrix to perform the transformation with.
     * @return {XML3DBox} this, the transformed bounding box
     */
    p.transform = function(mat)
    {
        var p1 = new window.XML3DVec3(this.min);
        var p2 = new window.XML3DVec3(this.min.x, this.min.y, this.max.z);
        var p3 = new window.XML3DVec3(this.min.x, this.max.y, this.min.z);
        var p4 = new window.XML3DVec3(this.max.x, this.min.y, this.min.z);
        var p5 = new window.XML3DVec3(this.min.x, this.max.y, this.max.z);
        var p6 = new window.XML3DVec3(this.max.x, this.max.y, this.min.z);
        var p7 = new window.XML3DVec3(this.max.x, this.min.y, this.max.z);
        var p8 = new window.XML3DVec3(this.max);

        this.makeEmpty();
        this.extend(mat.multiplyPt(p1));
        this.extend(mat.multiplyPt(p2));
        this.extend(mat.multiplyPt(p3));
        this.extend(mat.multiplyPt(p4));
        this.extend(mat.multiplyPt(p5));
        this.extend(mat.multiplyPt(p6));
        this.extend(mat.multiplyPt(p7));
        this.extend(mat.multiplyPt(p8));

        return this;
    };
}());

// ========================================================================
// === XML3DMatrix ===
// ========================================================================
(function() {

    if(!window.XML3DMatrix)
        return;

    var p = window.XML3DMatrix.prototype;

    /**
     * @this XML3DMatrix
     *
     * @param {!XML3DMatrix} other the other matrix to test equality with
     * @param {number=} epsilon. Default XML3D.EPSILON
     * @return {boolean} true if each of the matrices' components differ by at most XML3D.EPSILON
     */
    p.equals = function(other, epsilon) {

        var eq = XML3D.epsilonEquals;

        return eq(this.m11, other.m11, epsilon)
            && eq(this.m12, other.m12, epsilon)
            && eq(this.m13, other.m13, epsilon)
            && eq(this.m14, other.m14, epsilon)
            && eq(this.m21, other.m21, epsilon)
            && eq(this.m22, other.m22, epsilon)
            && eq(this.m23, other.m23, epsilon)
            && eq(this.m24, other.m24, epsilon)
            && eq(this.m31, other.m31, epsilon)
            && eq(this.m32, other.m32, epsilon)
            && eq(this.m33, other.m33, epsilon)
            && eq(this.m34, other.m34, epsilon)
            && eq(this.m41, other.m41, epsilon)
            && eq(this.m42, other.m42, epsilon)
            && eq(this.m43, other.m43, epsilon)
            && eq(this.m44, other.m44, epsilon);
    };

    /** Multiplies this matrix with the given vector
     *
     *  @this {XML3DMatrix}
     *  @param {!XML3DVec3} vec
     *  @return {XML3DVec3}
     */
    p.multiplyDir = function(vec) {

        return this.multiplyPt(vec, 0);
    };

    /** Multiplies this matrix with the given point, that
     *  is represented by a 3D vector and a scalar w for the 4th dimension.
     *
     *  @this {XML3DMatrix}
     *
     *  @param {!XML3DVec3} vec the first 3 components of the point stored in a vector
     *  @param {!number} w the 4th component of the point
     *
     *  @return {XML3DVec3} the result of multiplication. The 4th component w of the point is
     *      calculated into the first 3 components (they're normalized by w).
     */
    p.multiplyPt = function(vec, w) {

        if(w === undefined || w === null)
            w = 1;

        var _x = 0; var _y = 0; var _z = 0; var _w = w;

        // column-major multiplication: translation in last column
        _x = this.m11 * vec.x + this.m21 * vec.y + this.m31 * vec.z + this.m41 * w;
        _y = this.m12 * vec.x + this.m22 * vec.y + this.m32 * vec.z + this.m42 * w;
        _z = this.m13 * vec.x + this.m23 * vec.y + this.m33 * vec.z + this.m43 * w;
        _w = this.m14 * vec.x + this.m24 * vec.y + this.m34 * vec.z + this.m44 * w;

        if(_w != 0)
        {
            _x = _x/_w;
            _y = _y/_w;
            _z = _z/_w;
        }

        return new window.XML3DVec3(_x, _y, _z);
    };

    /**
     * Convert the matrix to a string, optionally using a HTML table. The returned string
     * is output row-major (although XML3DMatrix is column-major).
     *
     * @this {XML3DMatrix}
     * @param {boolean} pretty if true does a pretty output by wrapping the matrix in a table.
     * @return {string}
     */
    p.str = function(pretty) {

        var ret = ""; // return string
        var es = " "; // element separator
        var rs = ""; // row start
        var re = " | "; // row end

        if(pretty)
        {
            var td_style = "width:50px;";
            ret = "<table>";
            es = "</td><td style=\"" + td_style + "\">";
            rs = "<tr><td style=\"" + td_style + "\">";
            re = "</td></tr>";
        }

        ret += rs + this.m11.toFixed(3) + es + this.m21.toFixed(3) + es + this.m31.toFixed(3) + es + this.m41.toFixed(3) + re;
        ret += rs + this.m12.toFixed(3) + es + this.m22.toFixed(3) + es + this.m32.toFixed(3) + es + this.m42.toFixed(3) + re;
        ret += rs + this.m13.toFixed(3) + es + this.m23.toFixed(3) + es + this.m33.toFixed(3) + es + this.m43.toFixed(3) + re;
        ret += rs + this.m14.toFixed(3) + es + this.m24.toFixed(3) + es + this.m34.toFixed(3) + es + this.m44.toFixed(3) + re;

        if(pretty)
            ret += "</table>";

        return ret;
    };

    if(!p.transpose)
    {
        /**
         * Transposes the matrix.
         *
         * @this {XML3DMatrix}
         * @return {XML3DMatrix} the transposed matrix
         */
        p.transpose = function() {
            return new window.XML3DMatrix(
                this.m11, this.m21, this.m31, this.m41,
                this.m12, this.m22, this.m32, this.m42,
                this.m13, this.m23, this.m33, this.m43,
                this.m14, this.m24, this.m34, this.m44
            );
        };
    }

    /**
     * Return the translation of this matrix as XML3DVec3.
     *
     * @this {XML3DMatrix}
     *
     * @return {XML3DVec3} the translation component of the matrix
     */
    p.translation = function()
    {
        return new window.XML3DVec3(this.m41, this.m42, this.m43);
    };

    /**
     * Return the scaling factor of this matrix as XML3DVec3.
     *
     * @this {XML3DMatrix}
     *
     * @return {XML3DVec3} the scale component of the matrix
     */
    p.scaling = function()
    {
        var v = new window.XML3DVec3();

        // scale factor are the magnitudes of the first three basis vectors
        // cf. http://www.gamedev.net/topic/491578-get-scale-factor-from-a-matrix/
        v.x = this.m11; v.y = this.m12; v.z = this.m13;
        var sx = v.length();

        v.x = this.m21; v.y = this.m22; v.z = this.m23;
        var sy = v.length();

        v.x = this.m31; v.y = this.m32; v.z = this.m33;
        var sz = v.length();

        return new window.XML3DVec3(sx, sy, sz);
    };

    /**
     * Return the rotation of this matrix as XML3DRotation.
     *
     * @this {XML3DMatrix}
     *
     * @return {XML3DRotation} the rotation component of the matrix
     */
    p.rotation = function()
    {
        return window.XML3DRotation.fromMatrix(this);
    };
}());

// ========================================================================
// === XML3DRay ===
// ========================================================================
(function() {

    if(!window.XML3DRay)
        return;

    var p = window.XML3DRay.prototype;

    /**
     * Returns a string representation of the ray.
     *
     * @this {XML3DRay}
     * @return {string}
     */
    p.str = function() {
        return "[ pos: " + this.origin.str() + "; dir: " + this.direction.str() + "]";
    };

    /**
     * @this {XML3DRay}
     *
     * @param {!XML3DRay} other the other ray to test equality with
     * @param {number=} epsilon. Default XML3D.EPSILON
     * @return {boolean} true if each component of the rays differ by at most XML3D.EPSILON
     */
    p.equals = function(other, epsilon) {

        return this.origin.equals(other.origin, epsilon)
            && this.direction.equals(other.direction, epsilon);
    };

    /**
     * Transforms the origin and direction of this ray by the given matrix.
     * This ray is not modified
     *
     * @this {XML3DRay}
     * @param {!XML3DMatrix} mat the matrix to perform the transformation with.
     * @return {XML3DRay} this, the transformed ray
     */
    p.transform = function(mat)
    {
        var to = mat.multiplyPt(this.origin);
        var td = mat.multiplyDir(this.direction);

        return new window.XML3DRay(to, td);
    };
}());

// ========================================================================
// === XML3DRotation ===
// ========================================================================
(function() {

    if(!window.XML3DRotation)
        return;

    var p = window.XML3DRotation.prototype;

    /**
     * Returns a string representation of XML3DRotation. It can be used
     * to set attributes such as the <transform>'s rotation attribute.
     *
     * @this {XML3DRotation}
     * @return {string}
     */
    p.str = function() {
        return this.axis.str() + " " + this.angle.toFixed(3);
    };

    /**
     * @this {XML3DRotation}
     * @param {!XML3DRotation} other the other rotation to test equality with
     * @param {number=} epsilon. Default XML3D.EPSILON
     * @return {boolean} true if axis and angle of both rotations differ by at most XML3D.EPSILON
     */
    p.equals = function(other, epsilon) {

        return this.axis.equals(other.axis, epsilon)
            && XML3D.epsilonEquals(this.angle, other.angle, epsilon);
    };

    if(!window.XML3DRotation.fromMatrix)
    {
        /**
         * Constructs an instance of XML3DRotation from the given matrix.
         *
         * @param {!XML3DMatrix} mat
         * @return {XML3DRotation}
         */
        window.XML3DRotation.fromMatrix = function(mat) {

            var m = mat;
            var scal = mat.scaling();
            if(!scal.equals(new window.XML3DVec3(1,1,1)))
            {
                m = mat.scale(1/scal.x,1/scal.y,1/scal.z);
            }

            var q = new window.XML3DRotation();
            var trace = m.m11 + m.m22 + m.m33;
            if (trace > 0) {
                var s = 2.0 * Math.sqrt(trace + 1.0);
                q.w = 0.25 * s;
                q.x = (m.m23 - m.m32) / s;
                q.y = (m.m31 - m.m13) / s;
                q.z = (m.m12 - m.m21) / s;
            } else {
                if (m.m11 > m.m22 && m.m11 > m.m33) {
                    var s = 2.0 * Math.sqrt(1.0 + m.m11 - m.m22 - m.m33);
                    q.w = (m.m23 - m.m32) / s;
                    q.x = 0.25 * s;
                    q.y = (m.m21 + m.m12) / s;
                    q.z = (m.m31 + m.m13) / s;
                } else if (m.m22 > m.m33) {
                    var s = 2.0 * Math.sqrt(1.0 + m.m22 - m.m11 - m.m33);
                    q.w = (m.m31 - m.m13) / s;
                    q.x = (m.m21 + m.m12) / s;
                    q.y = 0.25 * s;
                    q.z = (m.m32 + m.m23) / s;
                } else {
                    var s = 2.0 * Math.sqrt(1.0 + m.m33 - m.m11 - m.m22);
                    q.w = (m.m12 - m.m21) / s;
                    q.x = (m.m31 + m.m13) / s;
                    q.y = (m.m32 + m.m23) / s;
                    q.z = 0.25 * s;
                }
            }
            var img = new window.XML3DVec3(q.x, q.y, q.z);
            if(img.equals(new window.XML3DVec3(0,0,0)))
            {
                q = new window.XML3DRotation();
            }
            else
                q.setQuaternion(img, q.w);

            return q;
        };
    }

    if(!p.inverse)
    {
        /**
         *  @this {window.XML3DRotation}
         *  @return {window.XML3DRotation}
         */
        p.inverse = function()
        {
            var invQuat = XML3D.math.quat.invert(XML3D.math.quat.create(), this._data);
            return new window.XML3DRotation(invQuat);
        }
    }

    if(!p.toEulerAngles)
    {

        /** Convert a given XML3DRotation to euler angles.
         *
         *  @this {window.XML3DRotation}
         *  @return {window.XML3DVec3}
         */
        p.toEulerAngles = function()
        {
            var q = this._data;

            var qxy = q[0]*q[1];
            var qxz = q[0]*q[2];
            var qyz = q[1]*q[2];
            var qwx = q[3]*q[0];
            var qwy = q[3]*q[1];
            var qwz = q[3]*q[2];

            var qxx = q[0]*q[0];
            var qyy = q[1]*q[1];
            var qzz = q[2]*q[2];
            var qww = q[3]*q[3];

            var xAngle = Math.atan2(2 * (qyz + qwx), qww - qxx - qyy + qzz);
            var yAngle = Math.asin(-2 * (qxz - qwy));
            var zAngle = Math.atan2(2 * (qxy + qwz), qww + qxx - qyy - qzz);

            return new window.XML3DVec3(xAngle, yAngle, zAngle);
        }
    }
}());

// ========================================================================
// === XML3DVec3 ===
// ========================================================================
(function() {

    if(!window.XML3DVec3)
        return;

    var p = window.XML3DVec3.prototype;

    /**
     * Returns a string representation of the vector. It can be used e.g. to set
     * the <transform>'s translation attribute.
     *
     * @this {XML3DVec3}
     * @return {string}
     */
    p.str = function()
    {
        return this.x.toFixed(3) + " " + this.y.toFixed(3) + " " + this.z.toFixed(3);
    };

    /**
     * Convert the vector to an array.
     *
     * @this {XML3DVec3}
     * @return {Array.<number>}
     */
    p.toArray = function()
    {
        return new Array(this.x, this.y, this.z);
    };

    /**
     * Compares the vector with the given one and returns true if all
     * components differ by at most XML3D.EPSILON.
     *
     * @this {XML3DVec3}
     * @param {XML3DVec3} other
     * @param {number=} epsilon. Default XML3D.EPSILON
     * @return {boolean}
     */
    p.equals = function(other, epsilon)
    {
        if(!other)
            return false;

        return XML3D.epsilonEquals(this.x, other.x, epsilon)
            && XML3D.epsilonEquals(this.y, other.y, epsilon)
            && XML3D.epsilonEquals(this.z, other.z, epsilon);
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * This file constructs the XML3D.tools.util namespace and adds miscellaneous utilities.
 */
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    var u = XML3D.tools.util;

    /**
     * Returns whether the object is actually given as argument. If it is it has
     * to be not undefined and not null.
     *
     * @param {Object=} obj
     * @return {boolean} true if the object is actually defined
     */
    u.isDefined = function(obj)
    {
        return (obj !== undefined && obj !== null);
    };

    /**
     * Can be used to wrap the given method into a closure that preserves the
     * this pointer inside the given function. Internally an object
     * __callbacks will be attached to the given object. This way several calls
     * to this function with the same function will return the same wrapper.
     * This is needed to successfully unregister callbacks again.
     *
     * @param {!Object} obj the object on which to call the method f
     * @param {!function()} fn the method to be wrapped
     *
     * @return {function()} the wrapped function
     */
    u.wrapCallback = function(obj, fn)
    {

        if(!obj.__callbacks)
            obj.__callbacks = {};

        if(!obj.__callbacks[fn])
        {
            var method = fn;
            var self = obj;

            obj.__callbacks[fn] = function() {
                return method.apply(self, arguments);
            };
        }

        return obj.__callbacks[fn];
    };

    u.getLocalBBox = function(node)
    {
        if(!node.getBoundingBox)
            return new window.XML3DBox();
        var bbox = node.getBoundingBox();

        if(node.parentNode.getWorldMatrix)
        {
            var parentGlobMat = node.parentNode.getWorldMatrix();
            var invParentGlobMat = parentGlobMat.inverse();
            bbox.transform(invParentGlobMat);
        }

        return bbox;
    };

    /**
     * Retrieve the world bounding box of a given node
     *
     * @param {!Object} node
     * @return {XML3DBox}
     */
    u.getWorldBBox = function(node)
    {
        if(!node.getBoundingBox)
            return new window.XML3DBox();

        return node.getBoundingBox();
    };

    /**
     * Returns the given node's parent world matrix. If no parent is present
     * or doesn't have a getWorldMatrix() method the identity matrix is returned.
     *
     * @param {Object} node
     * @return {window.XML3DMatrix}
     */
    u.getParentWorldMatrix = function(node)
    {
        if(!XML3D.tools.util.isDefined(node.parentNode)
        || !XML3D.tools.util.isDefined(node.parentNode.getWorldMatrix))
            return new window.XML3DMatrix();

        return node.parentNode.getWorldMatrix();
    };

    /**
     * Retrieve the bounding box of the children of a given node.
     *
     * @param {!Object} node
     * @return {XML3DBox}
     */
    u.getChildrenBBox = function(node)
    {
        var bbox = new window.XML3DBox();

        var curChild = node.firstChild;
        while(curChild)
        {
            if(curChild.getBoundingBox)
                bbox.extend(curChild.getBoundingBox());

            curChild = curChild.nextSibling;
        }

        return bbox;
    };

    /**
     *  Clamps the given value to lie within [min,max].
     *
     *  @param {number} value
     *  @param {number} min
     *  @param {number} max
     *  @return {number}
     */
    u.clamp = function(value, min, max)
    {
        return Math.min(max, Math.max(min, value));
    };

    /**
     * A shader is actually a node with a number of children, each of which defines
     * an attribute 'name' and has a TextNode child. This method searches for the child
     * of the given element, that has the 'name' attribute with the given name, replaces the
     * TextNode content with the given value and returns the old value.
     *
     * @param shaderElement
     * @param attributeName
     * @param attributeValue
     * @return {string} the old value of the shader attribute
     */
    u.setShaderAttribute = function(shaderElement, attributeName, attributeValue)
    {
        for(var i = 0; i < shaderElement.childNodes.length; i++)
        {
            var node = shaderElement.childNodes[i];
            if(node.name === attributeName)
            {
                var oldValue = node.childNodes[0].nodeValue;
                node.childNodes[0].nodeValue = attributeValue;
                return oldValue;
            }
        }

        throw new Error("Given attribute is not defined: " + attributeName);
    };
}());


/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    var fireMeshesLoadedCallbacks = [];

    /** Calls the given callback as soon as all mesh nodes of the given node are
     *  loaded. Internally, it will wait until the bounding boxes of all child mesh nodes
     *  are not empty anymore. If the node has no mesh children, it will first wait until
     *  there are such children.
     *
     *   @param {Element} node
     *   @param {function()} callback
     *   @return {number} a unique ID to cancel the waiting process using cancelFireWhenMeshesLoaded()
     */
    XML3D.tools.util.fireWhenMeshesLoaded = function(node, callback)
    {
        var cb = callback;
        var xml3d = XML3D.tools.util.getXml3dRoot(node);
        var emptyMeshNodes = null;

        function onFrameDrawn()
        {
            // the node might be completely empty, so we wait until there's
            // some content. When there is content, we grab the mesh nodes
            // and wait until all of them are not empty.
            if(node.getBoundingBox().isEmpty()) {
                return;
            }

            if(emptyMeshNodes === null) {
                emptyMeshNodes = XML3D.tools.util.getMeshNodes(node);
            }

            var curMesh = 0;
            while(curMesh < emptyMeshNodes.length)
            {
                if(!emptyMeshNodes[curMesh].getBoundingBox().isEmpty())
                {
                    emptyMeshNodes.splice(curMesh, 1);
                }
                else
                    curMesh++;
            }

            if(emptyMeshNodes.length > 0) {
                return;
            }

            xml3d.removeEventListener("framedrawn", onFrameDrawn, false);
            cb();
        }

        fireMeshesLoadedCallbacks.push(onFrameDrawn);

        xml3d.addEventListener("framedrawn", onFrameDrawn, false);
        onFrameDrawn();

        return fireMeshesLoadedCallbacks.length - 1;
    };

    /** Cancels the method XML3D.tools.util.fireWhenMeshesLoaded() above. That is
     *  it removes the listener for the "framedrawn" event.
     *
     *   @param {Element} node
     *   @param {number} id
     */
    XML3D.tools.util.cancelFireWhenMeshesLoaded = function(node, id)
    {
        if(id >= fireMeshesLoadedCallbacks.length) {
            return;
        }

        var onFrameDrawn = fireMeshesLoadedCallbacks[id];
        if(!onFrameDrawn) {
            return;
        }

        var xml3d = XML3D.tools.util.getXml3dRoot(node);

        fireMeshesLoadedCallbacks[id] = undefined;

        xml3d.removeEventListener("framedrawn", onFrameDrawn, false);
    };

}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    var u = XML3D.tools.util;

    /** Returns the xml3d element in which the given element is contained.
     * If none is found, null is returned.
     *
     * @param {!Object} el
     * @return {Object}
     */
    u.getXml3dRoot = function(el)
    {
        if(!el) {
            throw new Error("XML3D.tools.util.getXml3dRoot(): given element is not defined.");
        }
        if(!el.parentNode) {
            throw new Error("XML3D.tools.util.getXml3dRoot(): given element has no parent node.");
        }

        if(el.tagName.toLowerCase() === "xml3d")
            return el;

        if(el.parentNode)
            return u.getXml3dRoot(el.parentNode);

        return null;
    };

    /** Internal helper method. Gets and/or sets a reference pointed to by attrName
     *  of the element el. For more information see XML3D.tools.util.transform()
     *  or XML3D.tools.util.shader().
     *
     *  @param {!Object} el
     *  @param {!string} attrName
     *  @param {Object} newRefNode
     *
     *  @return {Object}
     */
    function getOrSetRefNode(el, attrName, newRefNode)
    {
        var oldRefNode = null;

        var oldRef = el.getAttribute(attrName);
        if(oldRef && oldRef.length > 0)
            oldRefNode = XML3D.URIResolver.resolveLocal(oldRef);

        if(newRefNode)
        {
            var newRef = newRefNode.getAttribute("id");
            if(newRef && newRef.length > 0)
            {
                newRef = "#" + newRef;
                el.setAttribute(attrName, newRef);
            }
        }

        return oldRefNode;
    };

    /**
     * Retrieve or set the transform node of a given group node.
     *
     * @param {!Object} grp the desired group node
     * @param {Object} xfm (optional) the transform element to which grp's
     *  transform attribute should be set. The transform has to have an
     *  id attribute.
     *
     * @return {Object} if one argument is given, it returns the current transform
     *  element of el. If two arguments are given, it returns the transform element set
     *  before it was overridden by xfm.
     */
    u.transform = function(grp, xfm)
    {
        if(grp.tagName.toLowerCase() !== "group")
            throw "XML3D.tools.util.transform(): given element is not a group.";

        return getOrSetRefNode(grp, "transform", xfm);
    };

    /** Retrieve or set the shader of the given group node.
     *
     * @param {!Object} grp the group of which to retrieve the shader.
     * @param {Object} sh (optional) the shader element to which el's shader
     *  attribute should be set. The shader has to have an id attribute.
     *
     * @return {Object} if one argument is given, it returns the current shader of el. If
     *  two arguments are given, it returns the shader set before it was overridden by sh.
     */
    u.shader = function(grp, sh)
    {
        if(grp.tagName.toLowerCase() !== "group")
            throw "XML3D.tools.util.shader(): given element is not a group.";

        return getOrSetRefNode(grp, "shader", sh);
    };

    /**
     * Returns the first defs element of the given xml3d element. If none exists,
     * a corresponding element is created, appended to xml3d and returned.
     *
     * @param {!Object} xml3d the xml3d element of which to return the defs element
     *
     * @return {Object} the first defs element of the given xml3d element
     */
    u.getOrCreateDefs = function(xml3d)
    {
        var defs = XML3D.util.evaluateXPathExpr(
            xml3d, './/xml3d:defs[1]').singleNodeValue;

        if(!defs)
        {
            defs = XML3D.tools.creation.element("defs");
            xml3d.appendChild(defs);
        }

        return defs;
    };

    /**
     * Returns the transform element corresponding to the given
     * group. If it doesn't exist, one will be created with the
     * id newId, appended to the defs section and targetGrp's
     * transform reference will be set to the newly created
     * element.
     *
     * @param {!Object} targetGrp the group to retrieve the transform from
     * @param {string} newId the id attribute of the transform to be created
     *
     * @return {Object} the transform corresponding to targetGrp
     */
    u.getOrCreateTransform = function(targetGrp, newId)
    {
        var t = XML3D.tools.util.transform(targetGrp);

        if(t) // found it, just return
            return t;

        var xml3d = u.getXml3dRoot(targetGrp);
        var defs = u.getOrCreateDefs(xml3d);

        // create transform
        t = XML3D.tools.creation.element("transform", {id: newId});
        defs.appendChild(t);
        targetGrp.setAttribute("transform", "#" + newId);

        return t;
    };


    /** Return the first child element of tarNode, whose "name" attribute
     * is equal to the given one. Useful for retrieving shader attributes.
     *
     * @param {!Object} tarNode
     * @param {string} name
     * @return {Object} the found node
     */
    u.getNamedChild = function(tarNode, name)
    {
        var nodes = document.getElementsByName(name);

        for(var i = 0; i < nodes.length; i++)
        {
            if(nodes[i].parentNode === tarNode)
                return nodes[i];
        }

        return null;
    };

    /** Get the children of the given node that reside in the XML3D namespace
     *
     *  @param {!Object} node
     *  @return {Array.<Object>}
     */
    u.getXML3DChildren = function(node)
    {
        var children = [];

        var n = node.firstChild;
        while(n)
        {
            if(n.namespaceURI === XML3D.xml3dNS)
                children.push(n);

            n = n.nextSibling;
        }

        return children;
    };

    /** Traverses the Subgraph of the given node and returns all mesh nodes
     * 	within it.
     *
     * 	@param {Object} node
     *	@return {Array.<Object>} array of mesh nodes contained in the subgraph of node.
     */
    u.getMeshNodes = function(node)
    {
        var meshNodes = [];
        var traverseFn = function(currentNode) {

            if(currentNode.tagName !== undefined
            && currentNode.tagName.toLowerCase() === "mesh")
                meshNodes.push(currentNode);

            return true;
        };

        XML3D.tools.util.traverseGraph(node, traverseFn);
        return meshNodes;
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    var u = XML3D.tools.util;

    function isFunction(object)
    {
        return object !== undefined && typeof object === "function";
    };

    /** Returns whether the given object is a Transformable
     *
     * 	@param {Object} object
     * 	@returns {boolean} true if the given object represents a Transformable
     */
    u.isTransformable = function(object)
    {
        if(!object)
            return false;

        return isFunction(object.setPosition) && isFunction(object.setOrientation) &&
            isFunction(object.setScale) && isFunction(object.getPosition) &&
            isFunction(object.getOrientation) && isFunction(object.getScale);
    };

    /** Returns the given object itself, if it is a Transformable, else
     *  constructs a default Transformable.
     *
     * 	@param {Element|Transformable} object
     * 	@returns {Transformable}
     */
    u.getOrCreateTransformable = function(object)
    {
        if(u.isTransformable(object))
            return object;

        return XML3D.tools.MotionFactory.createTransformable(object);
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    var u = XML3D.tools.util;

    /** Iterates over the subgraph of the given node, calling the given
     *	function on each discovered node, including the node itself.
     *
     *	@param {Object} node
     *	@param {function(node:Object):boolean} fn returns false if traversal of children should be skipped
     */
    u.traverseGraph = function(node, fn)
    {
        if(false !== fn(node))
        {
            for(var i = 0; i < node.childNodes.length; i++)
            {
                XML3D.tools.util.traverseGraph(node.childNodes[i], fn);
            }
        }
    };

    /** Traverses from the given node along the path to the root node and calls
     * 	the given function for each node.
     *
     *	@param {Object} node
     *	@param {function(node:Object):boolean} fn returns false if traversal should stop
     */
    u.traverseToRoot = function(node, fn)
    {
        if(!node)
            return;

        if(false === fn(node))
            return;

        XML3D.tools.util.traverseToRoot(node.parentNode, fn);
    };
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    /** Base class for attaching/detach behavior.
     *  Users of derived classes just invoke the attach()/detach() methods.
     *  Users of this class derive from it and overwrite the onAttach()/onDetach()
     *  methods.
     */
    XML3D.tools.util.Attachable = new XML3D.tools.Class({

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         */
        initialize: function()
        {
            this._isAttached = false;
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         */
        attach: function()
        {
            if(!this._isAttached)
            {
                this._isAttached = true;
                this.onAttach();
            }
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         */
        detach: function()
        {
            if(this._isAttached)
            {
                this._isAttached = false;
                this.onDetach();
            }
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         */
        setAttached: function(isAttached)
        {
            this._isAttached = isAttached;
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         */
        isAttached: function()
        {
            return this._isAttached;
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         *  @protected
         */
        onAttach: function() {},

        /**
         *  @this {XML3D.tools.interaction.behaviors.Attachable}
         *  @protected
         */
        onDetach: function() {}
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * This file constructs the XML3D.tools.creation namespace. It provides a number of small utilities
 * for creating various objects. Following objects reside here:
 *
 *  o phongShader() shortcut to create a phong <shader> element
 *  o lightshaderPoint() shortcut to create a point <lightshader> element
 *  o data() shortcut to create a <data> element holding various data (position, normals, ...)
 *  o dataSrc() shortcut to create elements like <float>, <float3>
 *  o sphere(), rectangle(), box(): create mesh elements with the named geometry
 */

(function(){

    if (!XML3D.tools.creation)
        XML3D.tools.creation = {};

    var ns = XML3D.tools.creation;

    /** A wrapper for document.createElementNS() with the xml3d namespace.
     *
     *  @param {string} tagName the name of the tag to create
     *  @param {!Object} [opts] a list of attributes to the element. Only the
     *                          attributes with string values will be set.
     *
     *  A special attribute of opts is "children". It may contain child nodes, that should
     *  be added to the created element through appendChild(). This special treatment only
     *  occurs if "children" is an Array. If it contains a usual string, then it is
     *  treated as usual attribute.
     *
     *  Example:
     *
     *  var mesh = XML3D.tools.creation.element("mesh", {src: "#mymeshsrc_data"});
     *
     *  XML3D.tools.creation.element("group", {
     *      id: "mygroup",
     *      children: [mesh]
     *  });
     *
     *  That yields to:
     *
     *  <group id="mygroup">
     *    <mesh src="#mymeshsrc_data" />
     *  </group>
     */
    ns.element = function(tagName, opts) {
        if(typeof tagName !== "string")
            throw "XML3D.tools.creation.element(): invalid argument";

        var el = XML3D.createElement(tagName);

        if(!opts)
            return el;

        for(var attrName in opts)
        {
            var attr = opts[attrName];

            if(attr && typeof attr == "string")
                el.setAttribute(attrName, attr);
        }

        if(opts.children && opts.children instanceof Array)
        {
            for(var i = 0; i < opts.children.length; i++)
                el.appendChild(opts.children[i]);
        }

        return el;
    };

    //----------------------------------------------------------------------------
    //--- Shaders ---
    //----------------------------------------------------------------------------

    /** Creates a phong shader with the given attributes
     *
     *  @param {Object} [opts] creation options
     *
     * The given options related to the phong shader are the content (TextNodes)
     * of the corresponding data elements, e.g. <float3> for the specularColor
     * shader argument.
     *
     * Supported options:
     *  o id
     *  o shaderType: default "urn:xml3d:shader:phong"
     *  o diffuseColor: diffuseColor, default "0.8 0.8 0.8"
     *  o transparency: transparency, default "0.0"
     *  o ambientIntensity: ambientIntensity, default "0.3"
     *  o specularColor: specularColor, default "0.55 0.55 0.55"
     *  o shininess: shininess, default "0.5"
     *  o emissiveColor: emissiveColor, default not set
     *
     *  @return {Object} a shader element
     */
    ns.phongShader = function(opts)
    {
        if(!opts)
            opts = {};

        if(!opts.shaderType)
            opts.shaderType = "urn:xml3d:shader:phong";
        if(!opts.diffuseColor)
            opts.diffuseColor = "0.8 0.8 0.8";
        if(!opts.transparency)
            opts.transparency = "0.0";
        if(!opts.ambientIntensity)
            opts.ambientIntensity = "0.3";
        if(!opts.specularColor)
            opts.specularColor = "0.55 0.55 0.55";
        if(!opts.shininess)
            opts.shininess = "0.5";

        // create all elements
        var ds = XML3D.tools.creation.dataSrc;

        var sh = XML3D.tools.creation.element("shader", {script:opts.shaderType});

        if(opts.id)
            sh.setAttribute("id", opts.id);

        sh.appendChild(ds("float3", {name:"diffuseColor", val:opts.diffuseColor}));
        sh.appendChild(ds("float", {name:"ambientIntensity", val:opts.ambientIntensity}));
        sh.appendChild(ds("float", {name:"transparency", val:opts.transparency}));
        sh.appendChild(ds("float3", {name:"specularColor", val:opts.specularColor}));
        sh.appendChild(ds("float", {name:"shininess", val:opts.shininess}));
        if(opts.emissiveColor)
            sh.appendChild(ds("float3", {name:"emissiveColor", val:opts.emissiveColor}));

        return sh;
    };

    /** Creates a point light lightshader element with the given attributes.
     *
     *  @param {Object} [opts] creation options
     *
     *  valid options:
     *      o id: id attribute
     *      o inten: the string of the textnode child of the intensity data source. Default: "1 1 1"
     *      o atten: the string of the textnode child of the attenuation data source. Default "1.0 0.01 0"
     *
     *  @return {Object} a lightshader element
     */
    ns.lightshaderPoint = function(opts)
    {
        if(!opts)
            opts = {};

        var ds = XML3D.tools.creation.dataSrc;

        var l = XML3D.tools.creation.element("lightshader", {script: "urn:xml3d:lightshader:point"});

        if(!opts.inten)
            opts.inten = "0.8 0.8 0.8";
        if(!opts.atten)
            opts.atten = "1.0 0.01 0";

        if(opts.id)
            l.setAttribute("id", opts.id);

        l.appendChild(ds("float3", {name:"intensity", val:opts.inten}));
        l.appendChild(ds("float3", {name:"attenuation", val:opts.atten}));

        return l;
    };

    /** Creates a directional lightshader element with the given attributes.
     *
     *  @param {Object} [opts] creation options
     *
     *  valid options:
     *      o id: id attribute
     *      o inten: the string of the textnode child of the intensity data source. Default: "1 1 1"
     *
     *  @return {Object} a lightshader element
     */
    ns.lightshaderDirectional = function(opts)
    {
        if(!opts)
            opts = {};

        var ds = XML3D.tools.creation.dataSrc;

        var l = XML3D.tools.creation.element("lightshader", {script: "urn:xml3d:lightshader:directional"});

        if(!opts.inten)
            opts.inten = "1 1 1";

        if(opts.id)
            l.setAttribute("id", opts.id);

        l.appendChild(ds("float3", {name:"intensity", val:opts.inten}));

        return l;
    };

    /** Creates a directional lightshader element with the given attributes.
     *
     *  @param {Object} [opts] creation options
     *
     *  valid options:
     *      o id: id attribute
     *      o inten: the string of the textnode child of the intensity data source. Default: "1 1 1"
     *      o atten: the string of the textnode child of the attenuation data source. Default "1.0 0.01 0"
     *      o falloff: the string of the textnode child of the falloffAngle data source. Default "0.6"
     *      o soft: the string of the textnode child of the softness data source. Default "1"
     *
     *  @return {Object} a lightshader element
     */
    ns.lightshaderSpot = function(opts)
    {
        if(!opts)
            opts = {};

        var ds = XML3D.tools.creation.dataSrc;

        var l = XML3D.tools.creation.element("lightshader", {script: "urn:xml3d:lightshader:spot"});

        if(!opts.inten)
            opts.inten = "1 1 1";
        if(!opts.atten)
            opts.atten = "1.0 0.01 0.0";
        if(!opts.falloff)
            opts.falloff = "0.6";
        if(!opts.soft)
            opts.soft = "1";

        if(opts.id)
            l.setAttribute("id", opts.id);

        l.appendChild(ds("float3", {name:"intensity", val:opts.inten}));
        l.appendChild(ds("float3", {name:"attenuation", val:opts.atten}));
        l.appendChild(ds("float", {name:"falloffAngle", val:opts.falloff}));
        l.appendChild(ds("float", {name:"softness", val:opts.soft}));

        return l;
    };

    //----------------------------------------------------------------------------
    // --- Element Helpers ---
    //----------------------------------------------------------------------------
    /** Create a data element with the given data.
     *
     *  @param {Object} [opts] creation options
     *
     *  valid options:
     *      o id: id attribute
     *      o idx: the string of the textnode child of the index data source
     *      o pos: the string of the textnode child of the position data source
     *      o norm: the string of the textnode child of the normal data source
     *      o texcoord: the string of the textnode child of the texcoord data source
     *
     *  @return {Object} a data element
     */
    ns.data = function(opts)
    {
        if(!opts)
            opts = {};

        var ds = XML3D.tools.creation.dataSrc;

        var d = XML3D.tools.creation.element("data");

        if(opts.id)
            d.setAttribute("id", opts.id);
        if(opts.idx)
            d.appendChild(ds("int", {name:"index", val:opts.idx}));
        if(opts.pos)
            d.appendChild(ds("float3", {name:"position", val:opts.pos}));
        if(opts.norm)
            d.appendChild(ds("float3", {name:"normal", val:opts.norm}));
        if(opts.texcoord)
            d.appendChild(ds("float2", {name:"texcoord", val:opts.texcoord}));

        return d;
    };

    /** Creates a data source element (float, bool, float3, ...).
     *
     *  @param tagName the tag name of the data source
     *  @param [opts] creation options
     *
     *  valid options:
     *      o name: the name attribute of the element
     *      o val: the TextNode child of the element
     *
     *  @return {Object} a data source element
     */
    ns.dataSrc = function(tagName, opts)
    {
        if(!opts)
            opts = {};

        var dataSrc = XML3D.tools.creation.element(tagName);

        if(opts.name)
            dataSrc.setAttribute("name", opts.name);
        if(opts.val)
            dataSrc.appendChild(document.createTextNode(opts.val));

        return dataSrc;
    };

}());

/* Put the geo creation stuff in an own closure so it won't spill
 * the rest of the namespace.
 */
(function(){

    var ns = XML3D.tools.creation;

    /** This creates a mesh element containing a sphere without an id.
     *
     *  @param {Object} xml3d
     *  @param {string} [id] the id-attribute of the mesh element
     *
     *  @return {Object} a mesh element
     */
    ns.sphere = function(xml3d, id)
    {
        return sphereObj.createMesh(xml3d, id);
    };

    /** Create a rectangle mesh element w/o an id and return it.
     *
     *  This rectangle is a 2x2 square with a normal of (0,0,1) in
     *  the world origin.
     *
     *  @param {Object} xml3d
     *  @param {string} [id] the id-attribute of the mesh element
     *
     *  @return {Object} a mesh element
     */
    ns.rectangle = function(xml3d, id)
    {
        return rectObj.createMesh(xml3d, id);
    };

    /** Creates a 2x2x2 box in the origin.
     *
     *  @param {Object} xml3d
     *  @param {string} [id] the id-attribute of the mesh element
     *
     *  @return {Object} mesh element
     */
    ns.box = function(xml3d, id)
    {
        return boxObj.createMesh(xml3d, id);
    };

    /** Creates an arrow in the origin oriented down the positive z-axis.
     *
     *  @param {Object} xml3d
     *  @param {string} [id] the id-attribute of the mesh element
     *
     *  @return {Object} mesh element
     */
    ns.arrow = function(xml3d, id)
    {
        return arrowObj.createMesh(xml3d, id);
    };

    /** Creates an open cylinder in the origin. The open sides are along the z-axis.
     *
     *  @param {Object} xml3d
     *  @param {string} [id] the id-attribute of the mesh element
     *
     *  @return {Object} mesh element
     */
    ns.cylinder = function(xml3d, id)
    {
        return cylinderObj.createMesh(xml3d, id);
    };

    /** Small object that holds data concerning a geometry object.
     *  You give it the the actual data,
     *  that is a structure that has fields id, index, position, normal
     *  and texcoord strings.
     *
     *  @constructor
     */
    var DataObject = new XML3D.tools.Class({

        /**
         * @param {!Object} data
         */
        initialize: function(id, data)
        {
            this.ID = id;
            this.dataElements = {};

            this.data = data;

            /** @private */
            this._totalNumInstances = 0; // used to create unique mesh IDs
        },

        /** Returns a mesh element that sources the Object's data element.
         *
         *  @param {Object} xml3d the xml3d root, where the data object is to be instantiated.
         *  @param {string} [id] the id attribute of the created mesh.
         *  @return {Object} the mesh element
         */
        createMesh: function(xml3d, id)
        {
            if(!xml3d)
                throw "XML3D.tools.creation call: xml3d not given!";

            if(!xml3d.__creationNumInstances)
                xml3d.__creationNumInstances = {};

            if(!xml3d.__creationNumInstances[this.ID] || xml3d.__creationNumInstances[this.ID] < 1)
            {
                xml3d.__creationNumInstances[this.ID] = 0; // initialize to zero, incremented below

                var newEl = XML3D.tools.creation.data({
                    id: this.data.id + "_" + this._totalNumInstances,
                    idx: this.data.index,
                    pos: this.data.position,
                    norm: this.data.normal,
                    texcoord: this.data.texcoord
                });

                var defs = XML3D.tools.util.getOrCreateDefs(xml3d);
                defs.appendChild(newEl);

                this.dataElements[xml3d] = newEl;
            }

            this._totalNumInstances++;
            xml3d.__creationNumInstances[this.ID]++;

            var mesh = XML3D.tools.creation.element("mesh", {
                type: "triangles",
                src: "#" + this.dataElements[xml3d].id
            });

            if(id)
                mesh.setAttribute("id", id);

            return mesh;
        }
    });

    //----------------------------------------------------------------------------
    // --- Geometry Data ---
    //----------------------------------------------------------------------------
    var _rect = {};
    _rect.id = "XML3D.tools.creation._rect";
    _rect.index = "0 1 2 1 3 2";
    _rect.position = "-1.0 -1.0 0.0 1.0 -1.0 0.0 -1.0 1.0 0.0 1.0 1.0 0.0";
    _rect.normal = "0.0 0.0 1.0 0.0 0.0 1.0 0.0 0.0 1.0 0.0 0.0 1.0";
    _rect.texcoord = "0.0 0.0 1.0 0.0 0.0 1.0 1.0 1.0";

    var _sphere = {};
    _sphere.id = "XML3D.tools.creation._sphere";
    _sphere.index = "124 0 993 963 30 404 30 31 404 61 0 124 124 62 61 31 92 404 92 93 404 124 123 62 124 125 123 93 155 404 155 156 404 124 186 125 124 187 186 156 217 404 217 218 404 124 248 187 124 249 248 218 279 404 279 280 404 124 310 249 124 311 310 280 341 404 341 342 404 124 372 311 124 373 372 342 403 404 403 405 404 124 435 373 124 436 435 405 466 404 466 467 404 124 497 436 124 498 497 467 528 404 528 529 404 124 559 498 124 560 559 529 590 404 590 591 404 124 621 560 124 622 621 591 652 404 652 653 404 124 683 622 124 684 683 653 714 404 714 715 404 124 745 684 124 746 745 715 776 404 776 777 404 124 807 746 124 808 807 777 838 404 838 839 404 124 869 808 124 870 869 839 900 404 900 901 404 124 931 870 124 932 931 901 962 404 962 963 404 124 993 932 932 993 992 932 992 933 933 992 991 933 991 934 934 991 990 934 990 935 935 990 989 935 989 936 936 989 988 936 988 937 937 988 987 937 987 938 938 987 986 938 986 939 939 986 985 939 985 940 940 985 984 940 984 941 941 984 983 941 983 942 942 983 982 942 982 943 943 982 981 943 981 944 944 981 945 981 980 945 945 980 979 945 979 946 946 979 947 979 978 947 947 978 977 947 977 948 948 977 976 948 976 949 949 976 975 949 975 950 950 975 951 975 974 951 951 974 973 951 973 952 952 973 972 952 972 953 953 972 954 972 971 954 954 971 970 954 970 955 955 970 956 970 969 956 956 969 968 956 968 957 957 968 967 957 967 958 958 967 966 958 966 959 959 966 965 959 965 960 960 965 964 960 964 961 961 964 963 961 963 962 902 961 962 902 962 901 903 960 961 903 961 902 904 959 960 904 960 903 905 958 959 905 959 904 906 957 958 906 958 905 907 956 957 907 957 906 908 955 956 908 956 907 909 954 955 909 955 908 910 953 909 953 954 909 911 952 953 911 953 910 912 951 952 912 952 911 913 950 912 950 951 912 914 949 950 914 950 913 915 948 949 915 949 914 916 947 948 916 948 915 917 946 916 946 947 916 918 945 946 918 946 917 919 944 918 944 945 918 920 943 944 920 944 919 921 942 943 921 943 920 922 941 942 922 942 921 923 940 941 923 941 922 924 939 940 924 940 923 925 938 939 925 939 924 926 937 938 926 938 925 927 936 937 927 937 926 928 935 936 928 936 927 929 934 935 929 935 928 930 933 934 930 934 929 931 932 933 931 933 930 870 931 930 870 930 871 871 930 929 871 929 872 872 929 928 872 928 873 873 928 927 873 927 874 874 927 926 874 926 875 875 926 925 875 925 876 876 925 924 876 924 877 877 924 923 877 923 878 878 923 922 878 922 879 879 922 921 879 921 880 880 921 920 880 920 881 881 920 919 881 919 882 882 919 883 919 918 883 883 918 917 883 917 884 884 917 885 917 916 885 885 916 915 885 915 886 886 915 914 886 914 887 887 914 913 887 913 888 888 913 889 913 912 889 889 912 911 889 911 890 890 911 910 890 910 891 891 910 892 910 909 892 892 909 908 892 908 893 893 908 907 893 907 894 894 907 906 894 906 895 895 906 905 895 905 896 896 905 904 896 904 897 897 904 903 897 903 898 898 903 902 898 902 899 899 902 901 899 901 900 840 899 900 840 900 839 841 898 899 841 899 840 842 897 898 842 898 841 843 896 897 843 897 842 844 895 896 844 896 843 845 894 895 845 895 844 846 893 845 893 894 845 847 892 893 847 893 846 848 891 847 891 892 847 849 890 891 849 891 848 850 889 890 850 890 849 851 888 889 851 889 850 852 887 888 852 888 851 853 886 887 853 887 852 854 885 886 854 886 853 855 884 854 884 885 854 856 883 884 856 884 855 857 882 856 882 883 856 858 881 882 858 882 857 859 880 881 859 881 858 860 879 880 860 880 859 861 878 879 861 879 860 862 877 878 862 878 861 863 876 877 863 877 862 864 875 876 864 876 863 865 874 875 865 875 864 866 873 874 866 874 865 867 872 873 867 873 866 868 871 872 868 872 867 869 870 871 869 871 868 808 869 868 808 868 809 809 868 867 809 867 810 810 867 866 810 866 811 811 866 865 811 865 812 812 865 864 812 864 813 813 864 863 813 863 814 814 863 862 814 862 815 815 862 861 815 861 816 816 861 860 816 860 817 817 860 859 817 859 818 818 859 858 818 858 819 819 858 857 819 857 820 820 857 821 857 856 821 821 856 855 821 855 822 822 855 823 855 854 823 823 854 853 823 853 824 824 853 852 824 852 825 825 852 851 825 851 826 826 851 850 826 850 827 827 850 849 827 849 828 828 849 848 828 848 829 829 848 830 848 847 830 830 847 846 830 846 831 831 846 832 846 845 832 832 845 844 832 844 833 833 844 843 833 843 834 834 843 842 834 842 835 835 842 841 835 841 836 836 841 840 836 840 837 837 840 839 837 839 838 778 837 838 778 838 777 779 836 837 779 837 778 780 835 836 780 836 779 781 834 835 781 835 780 782 833 834 782 834 781 783 832 833 783 833 782 784 831 783 831 832 783 785 830 831 785 831 784 786 829 785 829 830 785 787 828 829 787 829 786 788 827 828 788 828 787 789 826 788 826 827 788 790 825 826 790 826 789 791 824 825 791 825 790 792 823 824 792 824 791 793 822 823 793 823 792 794 821 822 794 822 793 795 820 794 820 821 794 796 819 820 796 820 795 797 818 819 797 819 796 798 817 818 798 818 797 799 816 817 799 817 798 800 815 816 800 816 799 801 814 815 801 815 800 802 813 814 802 814 801 803 812 813 803 813 802 804 811 812 804 812 803 805 810 811 805 811 804 806 809 810 806 810 805 807 808 809 807 809 806 746 807 806 746 806 747 747 806 805 747 805 748 748 805 804 748 804 749 749 804 803 749 803 750 750 803 802 750 802 751 751 802 801 751 801 752 752 801 800 752 800 753 753 800 799 753 799 754 754 799 798 754 798 755 755 798 797 755 797 756 756 797 796 756 796 757 757 796 795 757 795 758 758 795 759 795 794 759 759 794 793 759 793 760 760 793 792 760 792 761 761 792 791 761 791 762 762 791 790 762 790 763 763 790 789 763 789 764 764 789 765 789 788 765 765 788 787 765 787 766 766 787 786 766 786 767 767 786 768 786 785 768 768 785 784 768 784 769 769 784 770 784 783 770 770 783 782 770 782 771 771 782 781 771 781 772 772 781 780 772 780 773 773 780 779 773 779 774 774 779 778 774 778 775 775 778 777 775 777 776 716 775 776 716 776 715 717 774 775 717 775 716 718 773 774 718 774 717 719 772 773 719 773 718 720 771 772 720 772 719 721 770 771 721 771 720 722 769 721 769 770 721 723 768 769 723 769 722 724 767 723 767 768 723 725 766 767 725 767 724 726 765 766 726 766 725 727 764 726 764 765 726 728 763 764 728 764 727 729 762 763 729 763 728 730 761 762 730 762 729 731 760 730 760 761 730 732 759 760 732 760 731 733 758 732 758 759 732 734 757 758 734 758 733 735 756 757 735 757 734 736 755 756 736 756 735 737 754 755 737 755 736 738 753 737 753 754 737 739 752 753 739 753 738 740 751 752 740 752 739 741 750 751 741 751 740 742 749 750 742 750 741 743 748 749 743 749 742 744 747 748 744 748 743 745 746 747 745 747 744 684 745 744 684 744 685 685 744 743 685 743 686 686 743 742 686 742 687 687 742 741 687 741 688 688 741 740 688 740 689 689 740 739 689 739 690 690 739 738 690 738 691 691 738 692 738 737 692 692 737 736 692 736 693 693 736 735 693 735 694 694 735 734 694 734 695 695 734 733 695 733 696 696 733 697 733 732 697 697 732 731 697 731 698 698 731 699 731 730 699 699 730 729 699 729 700 700 729 728 700 728 701 701 728 727 701 727 702 702 727 703 727 726 703 703 726 725 703 725 704 704 725 724 704 724 705 705 724 706 724 723 706 706 723 722 706 722 707 707 722 708 722 721 708 708 721 720 708 720 709 709 720 719 709 719 710 710 719 718 710 718 711 711 718 717 711 717 712 712 717 716 712 716 713 713 716 715 713 715 714 654 713 714 654 714 653 655 712 713 655 713 654 656 711 712 656 712 655 657 710 711 657 711 656 658 709 710 658 710 657 659 708 709 659 709 658 660 707 659 707 708 659 661 706 707 661 707 660 662 705 661 705 706 661 663 704 705 663 705 662 664 703 704 664 704 663 665 702 703 665 703 664 666 701 702 666 702 665 667 700 701 667 701 666 668 699 700 668 700 667 669 698 668 698 699 668 670 697 698 670 698 669 671 696 670 696 697 670 672 695 696 672 696 671 673 694 695 673 695 672 674 693 694 674 694 673 675 692 693 675 693 674 676 691 675 691 692 675 677 690 691 677 691 676 678 689 690 678 690 677 679 688 689 679 689 678 680 687 688 680 688 679 681 686 687 681 687 680 682 685 686 682 686 681 683 684 685 683 685 682 622 683 682 622 682 623 623 682 681 623 681 624 624 681 680 624 680 625 625 680 679 625 679 626 626 679 678 626 678 627 627 678 677 627 677 628 628 677 676 628 676 629 629 676 630 676 675 630 630 675 674 630 674 631 631 674 673 631 673 632 632 673 672 632 672 633 633 672 671 633 671 634 634 671 635 671 670 635 635 670 669 635 669 636 636 669 637 669 668 637 637 668 667 637 667 638 638 667 666 638 666 639 639 666 665 639 665 640 640 665 641 665 664 641 641 664 663 641 663 642 642 663 662 642 662 643 643 662 644 662 661 644 644 661 660 644 660 645 645 660 646 660 659 646 646 659 658 646 658 647 647 658 657 647 657 648 648 657 656 648 656 649 649 656 655 649 655 650 650 655 654 650 654 651 651 654 653 651 653 652 592 651 652 592 652 591 593 650 651 593 651 592 594 649 650 594 650 593 595 648 649 595 649 594 596 647 648 596 648 595 597 646 647 597 647 596 598 645 597 645 646 597 599 644 645 599 645 598 600 643 599 643 644 599 601 642 643 601 643 600 602 641 642 602 642 601 603 640 641 603 641 602 604 639 640 604 640 603 605 638 639 605 639 604 606 637 638 606 638 605 607 636 637 607 637 606 608 635 636 608 636 607 609 634 608 634 635 608 610 633 634 610 634 609 611 632 633 611 633 610 612 631 632 612 632 611 613 630 631 613 631 612 614 629 613 629 630 613 615 628 629 615 629 614 616 627 628 616 628 615 617 626 627 617 627 616 618 625 626 618 626 617 619 624 625 619 625 618 620 623 624 620 624 619 621 622 623 621 623 620 560 621 620 560 620 561 561 620 619 561 619 562 562 619 618 562 618 563 563 618 617 563 617 564 564 617 616 564 616 565 565 616 615 565 615 566 566 615 614 566 614 567 567 614 613 567 613 568 568 613 612 568 612 569 569 612 611 569 611 570 570 611 610 570 610 571 571 610 609 571 609 572 572 609 573 609 608 573 573 608 607 573 607 574 574 607 606 574 606 575 575 606 605 575 605 576 576 605 604 576 604 577 577 604 578 604 603 578 578 603 602 578 602 579 579 602 601 579 601 580 580 601 600 580 600 581 581 600 582 600 599 582 582 599 598 582 598 583 583 598 584 598 597 584 584 597 596 584 596 585 585 596 595 585 595 586 586 595 594 586 594 587 587 594 593 587 593 588 588 593 592 588 592 589 589 592 591 589 591 590 530 589 590 530 590 529 531 588 589 531 589 530 532 587 588 532 588 531 533 586 587 533 587 532 534 585 586 534 586 533 535 584 585 535 585 534 536 583 535 583 584 535 537 582 583 537 583 536 538 581 537 581 582 537 539 580 581 539 581 538 540 579 580 540 580 539 541 578 579 541 579 540 542 577 541 577 578 541 543 576 577 543 577 542 544 575 576 544 576 543 545 574 575 545 575 544 546 573 574 546 574 545 547 572 546 572 573 546 548 571 572 548 572 547 549 570 571 549 571 548 550 569 570 550 570 549 551 568 569 551 569 550 552 567 551 567 568 551 553 566 567 553 567 552 554 565 566 554 566 553 555 564 565 555 565 554 556 563 564 556 564 555 557 562 563 557 563 556 558 561 562 558 562 557 559 560 561 559 561 558 498 559 558 498 558 499 499 558 557 499 557 500 500 557 556 500 556 501 501 556 555 501 555 502 502 555 554 502 554 503 503 554 553 503 553 504 504 553 552 504 552 505 505 552 506 552 551 506 506 551 550 506 550 507 507 550 549 507 549 508 508 549 548 508 548 509 509 548 547 509 547 510 510 547 511 547 546 511 511 546 545 511 545 512 512 545 544 512 544 513 513 544 543 513 543 514 514 543 542 514 542 515 515 542 516 542 541 516 516 541 540 516 540 517 517 540 539 517 539 518 518 539 538 518 538 519 519 538 520 538 537 520 520 537 536 520 536 521 521 536 535 521 535 522 522 535 534 522 534 523 523 534 533 523 533 524 524 533 532 524 532 525 525 532 531 525 531 526 526 531 530 526 530 527 527 530 529 527 529 528 468 527 528 468 528 467 469 526 527 469 527 468 470 525 526 470 526 469 471 524 525 471 525 470 472 523 524 472 524 471 473 522 523 473 523 472 474 521 522 474 522 473 475 520 521 475 521 474 476 519 475 519 520 475 477 518 519 477 519 476 478 517 518 478 518 477 479 516 517 479 517 478 480 515 479 515 516 479 481 514 515 481 515 480 482 513 514 482 514 481 483 512 513 483 513 482 484 511 512 484 512 483 485 510 484 510 511 484 486 509 510 486 510 485 487 508 509 487 509 486 488 507 508 488 508 487 489 506 507 489 507 488 490 505 489 505 506 489 491 504 505 491 505 490 492 503 504 492 504 491 493 502 503 493 503 492 494 501 502 494 502 493 495 500 501 495 501 494 496 499 500 496 500 495 497 498 499 497 499 496 436 497 496 436 496 437 437 496 495 437 495 438 438 495 494 438 494 439 439 494 493 439 493 440 440 493 492 440 492 441 441 492 491 441 491 442 442 491 490 442 490 443 443 490 444 490 489 444 444 489 488 444 488 445 445 488 487 445 487 446 446 487 486 446 486 447 447 486 485 447 485 448 448 485 449 485 484 449 449 484 483 449 483 450 450 483 482 450 482 451 451 482 481 451 481 452 452 481 480 452 480 453 453 480 454 480 479 454 454 479 478 454 478 455 455 478 477 455 477 456 456 477 476 456 476 457 457 476 458 476 475 458 458 475 474 458 474 459 459 474 473 459 473 460 460 473 472 460 472 461 461 472 471 461 471 462 462 471 470 462 470 463 463 470 469 463 469 464 464 469 468 464 468 465 465 468 467 465 467 466 406 465 466 406 466 405 407 464 465 407 465 406 408 463 464 408 464 407 409 462 463 409 463 408 410 461 462 410 462 409 411 460 461 411 461 410 412 459 460 412 460 411 413 458 459 413 459 412 414 457 413 457 458 413 415 456 457 415 457 414 416 455 456 416 456 415 417 454 455 417 455 416 418 453 417 453 454 417 419 452 453 419 453 418 420 451 452 420 452 419 421 450 451 421 451 420 422 449 450 422 450 421 423 448 422 448 449 422 424 447 448 424 448 423 425 446 447 425 447 424 426 445 446 426 446 425 427 444 445 427 445 426 428 443 427 443 444 427 429 442 443 429 443 428 430 441 442 430 442 429 431 440 441 431 441 430 432 439 440 432 440 431 433 438 439 433 439 432 434 437 438 434 438 433 435 436 437 435 437 434 373 435 434 373 434 374 374 434 433 374 433 375 375 433 432 375 432 376 376 432 431 376 431 377 377 431 430 377 430 378 378 430 429 378 429 379 379 429 428 379 428 380 380 428 381 428 427 381 381 427 426 381 426 382 382 426 425 382 425 383 383 425 424 383 424 384 384 424 423 384 423 385 385 423 386 423 422 386 386 422 421 386 421 387 387 421 420 387 420 388 388 420 419 388 419 389 389 419 418 389 418 390 390 418 391 418 417 391 391 417 416 391 416 392 392 416 415 392 415 393 393 415 414 393 414 394 394 414 395 414 413 395 395 413 412 395 412 396 396 412 411 396 411 397 397 411 410 397 410 398 398 410 409 398 409 399 399 409 408 399 408 400 400 408 407 400 407 401 401 407 406 401 406 402 402 406 405 402 405 403 343 402 403 343 403 342 344 401 402 344 402 343 345 400 401 345 401 344 346 399 400 346 400 345 347 398 399 347 399 346 348 397 398 348 398 347 349 396 397 349 397 348 350 395 396 350 396 349 351 394 350 394 395 350 352 393 394 352 394 351 353 392 393 353 393 352 354 391 392 354 392 353 355 390 354 390 391 354 356 389 390 356 390 355 357 388 389 357 389 356 358 387 388 358 388 357 359 386 387 359 387 358 360 385 359 385 386 359 361 384 385 361 385 360 362 383 384 362 384 361 363 382 383 363 383 362 364 381 382 364 382 363 365 380 364 380 381 364 366 379 380 366 380 365 367 378 379 367 379 366 368 377 378 368 378 367 369 376 377 369 377 368 370 375 376 370 376 369 371 374 375 371 375 370 372 373 374 372 374 371 311 372 371 311 371 312 312 371 370 312 370 313 313 370 369 313 369 314 314 369 368 314 368 315 315 368 367 315 367 316 316 367 366 316 366 317 317 366 365 317 365 318 318 365 364 318 364 319 319 364 363 319 363 320 320 363 362 320 362 321 321 362 361 321 361 322 322 361 360 322 360 323 323 360 324 360 359 324 324 359 358 324 358 325 325 358 357 325 357 326 326 357 356 326 356 327 327 356 355 327 355 328 328 355 329 355 354 329 329 354 353 329 353 330 330 353 352 330 352 331 331 352 351 331 351 332 332 351 333 351 350 333 333 350 349 333 349 334 334 349 348 334 348 335 335 348 347 335 347 336 336 347 346 336 346 337 337 346 345 337 345 338 338 345 344 338 344 339 339 344 343 339 343 340 340 343 342 340 342 341 281 340 341 281 341 280 282 339 340 282 340 281 283 338 339 283 339 282 284 337 338 284 338 283 285 336 337 285 337 284 286 335 336 286 336 285 287 334 335 287 335 286 288 333 334 288 334 287 289 332 288 332 333 288 290 331 332 290 332 289 291 330 331 291 331 290 292 329 330 292 330 291 293 328 329 293 329 292 294 327 328 294 328 293 295 326 327 295 327 294 296 325 326 296 326 295 297 324 325 297 325 296 298 323 297 323 324 297 299 322 323 299 323 298 300 321 322 300 322 299 301 320 321 301 321 300 302 319 320 302 320 301 303 318 319 303 319 302 304 317 318 304 318 303 305 316 317 305 317 304 306 315 316 306 316 305 307 314 315 307 315 306 308 313 314 308 314 307 309 312 313 309 313 308 310 311 312 310 312 309 249 310 309 249 309 250 250 309 308 250 308 251 251 308 307 251 307 252 252 307 306 252 306 253 253 306 305 253 305 254 254 305 304 254 304 255 255 304 303 255 303 256 256 303 302 256 302 257 257 302 301 257 301 258 258 301 300 258 300 259 259 300 299 259 299 260 260 299 298 260 298 261 261 298 297 261 297 262 262 297 296 262 296 263 263 296 295 263 295 264 264 295 294 264 294 265 265 294 293 265 293 266 266 293 292 266 292 267 267 292 291 267 291 268 268 291 290 268 290 269 269 290 289 269 289 270 270 289 271 289 288 271 271 288 287 271 287 272 272 287 286 272 286 273 273 286 285 273 285 274 274 285 284 274 284 275 275 284 283 275 283 276 276 283 282 276 282 277 277 282 281 277 281 278 278 281 280 278 280 279 219 278 279 219 279 218 220 277 278 220 278 219 221 276 277 221 277 220 222 275 276 222 276 221 223 274 275 223 275 222 224 273 274 224 274 223 225 272 273 225 273 224 226 271 272 226 272 225 227 270 226 270 271 226 228 269 270 228 270 227 229 268 269 229 269 228 230 267 268 230 268 229 231 266 267 231 267 230 232 265 266 232 266 231 233 264 265 233 265 232 234 263 264 234 264 233 235 262 263 235 263 234 236 261 262 236 262 235 237 260 261 237 261 236 238 259 260 238 260 237 239 258 259 239 259 238 240 257 258 240 258 239 241 256 257 241 257 240 242 255 256 242 256 241 243 254 255 243 255 242 244 253 254 244 254 243 245 252 253 245 253 244 246 251 252 246 252 245 247 250 251 247 251 246 248 249 250 248 250 247 187 248 247 187 247 188 188 247 246 188 246 189 189 246 245 189 245 190 190 245 244 190 244 191 191 244 243 191 243 192 192 243 242 192 242 193 193 242 241 193 241 194 194 241 240 194 240 195 195 240 239 195 239 196 196 239 238 196 238 197 197 238 237 197 237 198 198 237 236 198 236 199 199 236 235 199 235 200 200 235 234 200 234 201 201 234 233 201 233 202 202 233 232 202 232 203 203 232 231 203 231 204 204 231 230 204 230 205 205 230 229 205 229 206 206 229 228 206 228 207 207 228 227 207 227 208 208 227 209 227 226 209 209 226 225 209 225 210 210 225 224 210 224 211 211 224 223 211 223 212 212 223 222 212 222 213 213 222 221 213 221 214 214 221 220 214 220 215 215 220 219 215 219 216 216 219 218 216 218 217 157 216 217 157 217 156 158 215 216 158 216 157 159 214 215 159 215 158 160 213 214 160 214 159 161 212 213 161 213 160 162 211 212 162 212 161 163 210 211 163 211 162 164 209 210 164 210 163 165 208 164 208 209 164 166 207 208 166 208 165 167 206 207 167 207 166 168 205 206 168 206 167 169 204 205 169 205 168 170 203 204 170 204 169 171 202 203 171 203 170 172 201 202 172 202 171 173 200 201 173 201 172 174 199 200 174 200 173 175 198 199 175 199 174 176 197 198 176 198 175 177 196 197 177 197 176 178 195 196 178 196 177 179 194 195 179 195 178 180 193 194 180 194 179 181 192 193 181 193 180 182 191 192 182 192 181 183 190 191 183 191 182 184 189 190 184 190 183 185 188 189 185 189 184 186 187 188 186 188 185 125 186 185 125 185 126 126 185 184 126 184 127 127 184 183 127 183 128 128 183 182 128 182 129 129 182 181 129 181 130 130 181 180 130 180 131 131 180 179 131 179 132 132 179 178 132 178 133 133 178 177 133 177 134 134 177 176 134 176 135 135 176 175 135 175 136 136 175 174 136 174 137 137 174 173 137 173 138 138 173 172 138 172 139 139 172 171 139 171 140 140 171 170 140 170 141 141 170 169 141 169 142 142 169 168 142 168 143 143 168 167 143 167 144 144 167 166 144 166 145 145 166 165 145 165 146 146 165 147 165 164 147 147 164 163 147 163 148 148 163 162 148 162 149 149 162 161 149 161 150 150 161 160 150 160 151 151 160 159 151 159 152 152 159 158 152 158 153 153 158 157 153 157 154 154 157 156 154 156 155 94 154 155 94 155 93 95 153 154 95 154 94 96 152 153 96 153 95 97 151 152 97 152 96 98 150 151 98 151 97 99 149 150 99 150 98 100 148 149 100 149 99 101 147 148 101 148 100 102 146 147 102 147 101 103 145 146 103 146 102 104 144 145 104 145 103 105 143 144 105 144 104 106 142 105 142 143 105 107 141 142 107 142 106 108 140 141 108 141 107 109 139 140 109 140 108 110 138 139 110 139 109 111 137 138 111 138 110 112 136 137 112 137 111 113 135 136 113 136 112 114 134 135 114 135 113 115 133 134 115 134 114 116 132 133 116 133 115 117 131 132 117 132 116 118 130 131 118 131 117 119 129 130 119 130 118 120 128 129 120 129 119 121 127 128 121 128 120 122 126 127 122 127 121 123 125 126 123 126 122 62 123 122 62 122 63 63 122 121 63 121 64 64 121 120 64 120 65 65 120 119 65 119 66 66 119 118 66 118 67 67 118 117 67 117 68 68 117 116 68 116 69 69 116 115 69 115 70 70 115 114 70 114 71 71 114 113 71 113 72 72 113 112 72 112 73 73 112 111 73 111 74 74 111 110 74 110 75 75 110 109 75 109 76 76 109 108 76 108 77 77 108 107 77 107 78 78 107 106 78 106 79 79 106 80 106 105 80 80 105 104 80 104 81 81 104 103 81 103 82 82 103 102 82 102 83 83 102 101 83 101 84 84 101 100 84 100 85 85 100 99 85 99 86 86 99 98 86 98 87 87 98 97 87 97 88 88 97 96 88 96 89 89 96 95 89 95 90 90 95 94 90 94 91 91 94 93 91 93 92 32 91 92 32 92 31 33 90 91 33 91 32 34 89 90 34 90 33 35 88 89 35 89 34 36 87 88 36 88 35 37 86 87 37 87 36 38 85 86 38 86 37 39 84 85 39 85 38 40 83 84 40 84 39 41 82 83 41 83 40 42 81 82 42 82 41 43 80 81 43 81 42 44 79 80 44 80 43 45 78 79 45 79 44 46 77 78 46 78 45 47 76 77 47 77 46 48 75 76 48 76 47 49 74 75 49 75 48 50 73 74 50 74 49 51 72 73 51 73 50 52 71 72 52 72 51 53 70 71 53 71 52 54 69 70 54 70 53 55 68 69 55 69 54 56 67 68 56 68 55 57 66 67 57 67 56 58 65 66 58 66 57 59 64 65 59 65 58 60 63 64 60 64 59 61 62 63 61 63 60 0 61 60 0 60 1 1 60 59 1 59 2 2 59 58 2 58 3 3 58 57 3 57 4 4 57 56 4 56 5 5 56 55 5 55 6 6 55 54 6 54 7 7 54 53 7 53 8 8 53 52 8 52 9 9 52 51 9 51 10 10 51 50 10 50 11 11 50 49 11 49 12 12 49 48 12 48 13 13 48 47 13 47 14 14 47 46 14 46 15 15 46 45 15 45 16 16 45 44 16 44 17 17 44 43 17 43 18 18 43 42 18 42 19 19 42 41 19 41 20 20 41 40 20 40 21 21 40 39 21 39 22 22 39 38 22 38 23 23 38 37 23 37 24 24 37 36 24 36 25 25 36 35 25 35 26 26 35 34 26 34 27 27 34 33 27 33 28 28 33 32 28 32 29 29 32 31 29 31 30 964 29 30 964 30 963 965 28 29 965 29 964 966 27 28 966 28 965 967 26 27 967 27 966 968 25 26 968 26 967 969 24 25 969 25 968 970 23 24 970 24 969 971 22 23 971 23 970 972 21 22 972 22 971 973 20 21 973 21 972 974 19 20 974 20 973 975 18 19 975 19 974 976 17 18 976 18 975 977 16 17 977 17 976 978 15 16 978 16 977 979 14 978 14 15 978 980 13 14 980 14 979 981 12 980 12 13 980 982 11 981 11 12 981 983 10 982 10 11 982 984 9 983 9 10 983 985 8 984 8 9 984 986 7 985 7 8 985 987 6 986 6 7 986 988 5 987 5 6 987 989 4 988 4 5 988 990 3 989 3 4 989 991 2 990 2 3 990 992 1 991 1 2 991 993 0 992 0 1 992";
    _sphere.position = "0.0961330235004 0.0191220473498 -0.995184779167 0.191341012716 0.0380600951612 -0.980785369873 0.284706294537 0.0566316060722 -0.956940531731 0.37532967329 0.074657715857 -0.923879861832 0.462338447571 0.091964840889 -0.88192152977 0.544894635677 0.108386285603 -0.831470012665 0.622203171253 0.123763911426 -0.773010730743 0.693519532681 0.137949615717 -0.707107067108 0.758157014847 0.150806814432 -0.634393692017 0.815492928028 0.162211641669 -0.555570602417 0.864975214005 0.17205427587 -0.471397042274 0.906127274036 0.180239930749 -0.382683753967 0.938552856445 0.186689779162 -0.290284991264 0.961939692497 0.191341713071 -0.195090532303 0.976062476635 0.194150909781 -0.098017334938 0.980785250664 0.195090323687 -1.19209289551e-07 0.976062476635 0.194150909781 0.0980170369148 0.961939752102 0.191341727972 0.19509023428 0.938552975655 0.186689808965 0.290284633636 0.906127393246 0.18023994565 0.382683396339 0.864975333214 0.172054305673 0.471396803856 0.815493106842 0.162211671472 0.555570304394 0.758157253265 0.150806859136 0.634393334389 0.693519890308 0.137949690223 0.70710682869 0.622203588486 0.123763985932 0.773010492325 0.544895112514 0.108386382461 0.831469595432 0.462338984013 0.0919649451971 0.881921231747 0.375330299139 0.0746578425169 0.923879504204 0.284706920385 0.0566317290068 0.956940352917 0.191341713071 0.0380602329969 0.980785250664 0.0961337685585 0.0191221963614 0.995184719563 0.0905560255051 0.037509534508 0.995184719563 0.18023994565 0.0746578350663 0.980785250664 0.26818805933 0.11108712852 0.956940352917 0.353553384542 0.146446615458 0.923879504204 0.435513794422 0.180395722389 0.881921231747 0.513279974461 0.21260753274 0.831469595432 0.586102962494 0.242771789432 0.773010492325 0.653281450272 0.270598053932 0.70710682869 0.714168488979 0.295818299055 0.634393334389 0.768177688122 0.318189620972 0.555570304394 0.814788937569 0.337496638298 0.471396803856 0.853553295135 0.35355335474 0.382683396339 0.884097516537 0.366205215454 0.290284633636 0.906127393246 0.375330269337 0.19509023428 0.919430732727 0.380840688944 0.0980170369148 0.923879444599 0.382683426142 -1.19209289551e-07 0.919430732727 0.380840688944 -0.098017334938 0.906127333641 0.375330269337 -0.195090532303 0.884097456932 0.366205155849 -0.290284991264 0.853553175926 0.353553324938 -0.382683753967 0.814788818359 0.337496578693 -0.471397042274 0.768177509308 0.318189561367 -0.555570602417 0.714168250561 0.295818209648 -0.634393692017 0.653281092644 0.270597904921 -0.707107067108 0.586102545261 0.24277164042 -0.773010730743 0.513279497623 0.212607339025 -0.831470012665 0.435513287783 0.180395513773 -0.88192152977 0.353552818298 0.146446377039 -0.923879861832 0.268187463284 0.111086890101 -0.956940531731 0.180239289999 0.0746575593948 -0.980785369873 0.0905553251505 0.0375092439353 -0.995184779167 0.0814976394176 0.0544549822807 -0.995184779167 0.162211075425 0.108385972679 -0.980785369873 0.241362333298 0.161273166537 -0.956940531731 0.318189114332 0.212607175112 -0.923879861832 0.391951590776 0.261893689632 -0.88192152977 0.461939334869 0.308658003807 -0.831470012665 0.527478337288 0.352449774742 -0.773010730743 0.587937414646 0.392847239971 -0.707107067108 0.642734408379 0.429461449385 -0.634393692017 0.691341459751 0.461939632893 -0.555570602417 0.733290553093 0.489969074726 -0.471397042274 0.768177509308 0.513279855251 -0.382683753967 0.795666635036 0.531647503376 -0.290284991264 0.815493047237 0.54489505291 -0.195090532303 0.827465772629 0.552894949913 -0.098017334938 0.831469476223 0.555570185184 -1.19209289551e-07 0.827465772629 0.552894949913 0.0980170369148 0.815493106842 0.54489505291 0.19509023428 0.795666694641 0.531647562981 0.290284633636 0.768177628517 0.513279914856 0.382683396339 0.733290672302 0.489969164133 0.471396803856 0.691341638565 0.4619397223 0.555570304394 0.642734646797 0.429461598396 0.634393334389 0.587937772274 0.39284747839 0.70710682869 0.527478694916 0.352450013161 0.773010492325 0.461939752102 0.30865830183 0.831469595432 0.391952037811 0.261893987656 0.881921231747 0.318189620972 0.212607517838 0.923879504204 0.24136286974 0.161273509264 0.956940352917 0.16221165657 0.10838637501 0.980785250664 0.0814982652664 0.0544554032385 0.995184719563 0.0693085715175 0.069308578968 0.995184719563 0.13794966042 0.137949675322 0.980785250664 0.205262243748 0.205262243748 0.956940352917 0.27059802413 0.27059802413 0.923879504204 0.333327800035 0.333327800035 0.881921231747 0.392847448587 0.39284747839 0.831469595432 0.448583722115 0.448583751917 0.773010492325 0.499999940395 0.499999970198 0.70710682869 0.546600878239 0.546600937843 0.634393334389 0.587937712669 0.587937712669 0.555570304394 0.62361240387 0.623612463474 0.471396803856 0.653281331062 0.653281390667 0.382683396339 0.67665886879 0.676658987999 0.290284633636 0.693519830704 0.693519830704 0.19509023428 0.703701794147 0.703701794147 0.0980170369148 0.707106649876 0.70710670948 -1.19209289551e-07 0.703701794147 0.703701794147 -0.098017334938 0.693519771099 0.693519830704 -0.195090532303 0.676658809185 0.67665886879 -0.290284991264 0.653281211853 0.653281331062 -0.382683753967 0.623612344265 0.623612344265 -0.471397042274 0.587937533855 0.58793759346 -0.555570602417 0.54660063982 0.546600699425 -0.634393692017 0.499999642372 0.499999672174 -0.707107067108 0.448583424091 0.448583453894 -0.773010730743 0.39284709096 0.392847120762 -0.831470012665 0.333327412605 0.333327442408 -0.88192152977 0.270597577095 0.270597606897 -0.923879861832 0.205261781812 0.205261796713 -0.956940531731 0.137949168682 0.137949168682 -0.980785369873 0.0693080425262 0.0693080425262 -0.995184779167 -5.67579320432e-07 -5.67579377275e-07 -1.0 0.0544549785554 0.0814976319671 -0.995184779167 0.108385965228 0.162211060524 -0.980785369873 0.161273136735 0.241362333298 -0.956940531731 0.212607130408 0.318189114332 -0.923879861832 0.26189365983 0.391951590776 -0.88192152977 0.308657974005 0.461939334869 -0.831470012665 0.352449715137 0.527478337288 -0.773010730743 0.392847180367 0.587937414646 -0.707107067108 0.429461330175 0.642734408379 -0.634393692017 0.461939513683 0.691341459751 -0.555570602417 0.489969044924 0.733290553093 -0.471397042274 0.513279736042 0.768177509308 -0.382683753967 0.531647384167 0.795666635036 -0.290284991264 0.544894933701 0.815493047237 -0.195090532303 0.552894949913 0.827465772629 -0.098017334938 0.55557012558 0.831469476223 -1.19209289551e-07 0.552894949913 0.827465772629 0.0980170369148 0.544894993305 0.815493047237 0.19509023428 0.531647443771 0.795666754246 0.290284633636 0.513279795647 0.768177628517 0.382683396339 0.489969104528 0.733290672302 0.471396803856 0.461939692497 0.69134157896 0.555570304394 0.429461538792 0.642734706402 0.634393334389 0.392847418785 0.587937772274 0.70710682869 0.352449953556 0.527478694916 0.773010492325 0.308658242226 0.461939752102 0.831469595432 0.261893957853 0.391952008009 0.881921231747 0.212607488036 0.318189620972 0.923879504204 0.161273509264 0.241362854838 0.956940352917 0.108386345208 0.16221165657 0.980785250664 0.0544553920627 0.0814982652664 0.995184719563 0.0375095233321 0.0905560180545 0.995184719563 0.074657805264 0.180239930749 0.980785250664 0.111087121069 0.268188029528 0.956940352917 0.146446570754 0.35355335474 0.923879504204 0.180395692587 0.435513734818 0.881921231747 0.212607473135 0.513279914856 0.831469595432 0.242771729827 0.586102902889 0.773010492325 0.270597994328 0.653281450272 0.70710682869 0.295818209648 0.714168488979 0.634393334389 0.318189591169 0.768177568913 0.555570304394 0.337496548891 0.814788877964 0.471396803856 0.353553235531 0.853553235531 0.382683396339 0.366205096245 0.884097516537 0.290284633636 0.37533017993 0.906127274036 0.19509023428 0.380840659142 0.919430673122 0.0980170369148 0.382683336735 0.92387932539 -1.19209289551e-07 0.380840659142 0.919430673122 -0.098017334938 0.375330120325 0.906127274036 -0.195090532303 0.366205066442 0.884097337723 -0.290284991264 0.353553205729 0.853553056717 -0.382683753967 0.337496519089 0.814788758755 -0.471397042274 0.318189442158 0.768177449703 -0.555570602417 0.295818060637 0.714168190956 -0.634393692017 0.270597815514 0.653281033039 -0.707107067108 0.242771565914 0.586102485657 -0.773010730743 0.212607294321 0.513279497623 -0.831470012665 0.180395469069 0.43551325798 -0.88192152977 0.146446317434 0.353552788496 -0.923879861832 0.111086860299 0.268187433481 -0.956940531731 0.0746575444937 0.180239275098 -0.980785369873 0.0375092402101 0.0905553176999 -0.995184779167 0.0191220436245 0.0961330085993 -0.995184779167 0.03806008026 0.191340982914 -0.980785369873 0.0566315799952 0.284706264734 -0.956940531731 0.074657663703 0.375329613686 -0.923879861832 0.0919647961855 0.462338387966 -0.88192152977 0.108386233449 0.544894576073 -0.831470012665 0.123763844371 0.622203052044 -0.773010730743 0.137949541211 0.693519413471 -0.707107067108 0.150806680322 0.758156895638 -0.634393692017 0.16221152246 0.815492808819 -0.555570602417 0.172054201365 0.864975094795 -0.471397042274 0.180239826441 0.906127035618 -0.382683753967 0.186689689755 0.938552677631 -0.290284991264 0.19134157896 0.961939513683 -0.195090532303 0.194150879979 0.976062357426 -0.098017334938 0.195090249181 0.980785012245 -1.19209289551e-07 0.194150879979 0.976062357426 0.0980170369148 0.191341638565 0.961939573288 0.19509023428 0.186689689755 0.938552856445 0.290284633636 0.180239826441 0.906127214432 0.382683396339 0.172054216266 0.864975214005 0.471396803856 0.162211641669 0.815492928028 0.555570304394 0.150806769729 0.758157193661 0.634393334389 0.137949630618 0.693519890308 0.70710682869 0.123763926327 0.622203469276 0.773010492325 0.108386330307 0.54489505291 0.831469595432 0.0919649153948 0.462338894606 0.881921231747 0.0746577978134 0.375330209732 0.923879504204 0.0566317215562 0.284706890583 0.956940352917 0.0380602069199 0.191341683269 0.980785250664 0.0191221851856 0.0961337536573 0.995184719563 -7.92776866376e-09 0.0980171188712 0.995184719563 -2.13393427373e-08 0.195090278983 0.980785250664 -2.21764562269e-09 0.290284633636 0.956940352917 -2.51635512427e-08 0.382683336735 0.923879504204 -1.2003774863e-08 0.471396625042 0.881921231747 -3.81091957991e-08 0.55557012558 0.831469595432 -4.2714081161e-08 0.634393155575 0.773010492325 -5.68386155919e-08 0.70710670948 0.70710682869 -7.68664847328e-08 0.773010313511 0.634393334389 6.34204155858e-09 0.831469357014 0.555570304394 -5.68531390854e-08 0.881921052933 0.471396803856 -8.82093900145e-08 0.923879265785 0.382683396339 -8.63977689392e-08 0.956940174103 0.290284633636 -4.57772486584e-08 0.98078507185 0.19509023428 -1.76155978693e-09 0.995184540749 0.0980170369148 -2.65610378136e-08 0.999999701977 -1.19209289551e-07 -1.76155978693e-09 0.995184540749 -0.098017334938 -9.26083174591e-08 0.980784952641 -0.195090532303 -5.15129023881e-08 0.956939995289 -0.290284991264 -5.33245199108e-08 0.923879086971 -0.382683753967 -4.82113975409e-08 0.881920933723 -0.471397042274 -8.73200889373e-08 0.831469237804 -0.555570602417 -1.06414070444e-07 0.773010015488 -0.634393692017 -5.15013347524e-08 0.707106232643 -0.707107067108 -4.16976710937e-08 0.634392678738 -0.773010730743 -4.00793354061e-08 0.555569648743 -0.831470012665 -3.00820275356e-08 0.471396118402 -0.88192152977 -4.0414207092e-08 0.382682740688 -0.923879861832 -1.89615789736e-08 0.290283977985 -0.956940531731 -8.93307472438e-09 0.195089563727 -0.980785369873 -1.41512201957e-09 0.098016358912 -0.995184779167 -0.0191220454872 0.0961330011487 -0.995184779167 -0.0380600951612 0.191340968013 -0.980785369873 -0.0566316135228 0.284706234932 -0.956940531731 -0.0746577382088 0.375329583883 -0.923879861832 -0.0919648483396 0.462338358164 -0.88192152977 -0.108386300504 0.544894516468 -0.831470012665 -0.123763911426 0.622202992439 -0.773010730743 -0.137949630618 0.693519353867 -0.707107067108 -0.150806874037 0.758156776428 -0.634393692017 -0.162211686373 0.815492749214 -0.555570602417 -0.172054290771 0.864975035191 -0.471397042274 -0.180239915848 0.906126976013 -0.382683753967 -0.186689779162 0.938552618027 -0.290284991264 -0.191341742873 0.961939394474 -0.195090532303 -0.194150879979 0.976062297821 -0.098017334938 -0.195090293884 0.980784952641 -1.19209289551e-07 -0.194150879979 0.976062297821 0.0980170369148 -0.191341727972 0.961939513683 0.19509023428 -0.186689853668 0.938552796841 0.290284633636 -0.180239990354 0.906127154827 0.382683396339 -0.172054320574 0.8649751544 0.471396803856 -0.162211626768 0.815492868423 0.555570304394 -0.150806903839 0.758157074451 0.634393334389 -0.137949734926 0.693519830704 0.70710682869 -0.123764008284 0.622203469276 0.773010492325 -0.108386389911 0.544894993305 0.831469595432 -0.0919649302959 0.462338864803 0.881921231747 -0.0746578425169 0.37533017993 0.923879504204 -0.0566317252815 0.284706890583 0.956940352917 -0.0380602478981 0.191341668367 0.980785250664 -0.0191222000867 0.0961337462068 0.995184719563 -0.037509534508 0.0905560031533 0.995184719563 -0.0746578350663 0.180239900947 0.980785250664 -0.111087121069 0.268188029528 0.956940352917 -0.146446600556 0.353553295135 0.923879504204 -0.180395692587 0.435513675213 0.881921231747 -0.212607517838 0.513279855251 0.831469595432 -0.242771789432 0.586102843285 0.773010492325 -0.270598083735 0.653281390667 0.70710682869 -0.295818299055 0.714168310165 0.634393334389 -0.318189531565 0.768177449703 0.555570304394 -0.337496608496 0.814788758755 0.471396803856 -0.35355335474 0.853553056717 0.382683396339 -0.366205215454 0.884097337723 0.290284633636 -0.375330239534 0.906127154827 0.19509023428 -0.380840629339 0.919430553913 0.0980170369148 -0.382683336735 0.923879206181 -1.19209289551e-07 -0.380840629339 0.919430553913 -0.098017334938 -0.375330239534 0.906127035618 -0.195090532303 -0.366205126047 0.884097218513 -0.290284991264 -0.353553265333 0.853552937508 -0.382683753967 -0.337496578693 0.814788639545 -0.471397042274 -0.318189561367 0.768177330494 -0.555570602417 -0.295818209648 0.714168012142 -0.634393692017 -0.270597875118 0.65328091383 -0.707107067108 -0.242771595716 0.586102366447 -0.773010730743 -0.212607339025 0.513279378414 -0.831470012665 -0.180395513773 0.435513198376 -0.88192152977 -0.146446377039 0.353552728891 -0.923879861832 -0.111086882651 0.268187403679 -0.956940531731 -0.0746575519443 0.180239245296 -0.980785369873 -0.0375092402101 0.0905553027987 -0.995184779167 -0.0544549711049 0.0814976170659 -0.995184779167 -0.108385957778 0.162211030722 -0.980785369873 -0.161273136735 0.241362273693 -0.956940531731 -0.212607160211 0.318189024925 -0.923879861832 -0.26189365983 0.391951501369 -0.88192152977 -0.308657974005 0.46193921566 -0.831470012665 -0.352449715137 0.527478158474 -0.773010730743 -0.392847180367 0.587937235832 -0.707107067108 -0.429461419582 0.64273416996 -0.634393692017 -0.46193960309 0.691341280937 -0.555570602417 -0.489969044924 0.733290374279 -0.471397042274 -0.513279736042 0.768177330494 -0.382683753967 -0.531647384167 0.795666456223 -0.290284991264 -0.544894993305 0.815492749214 -0.195090532303 -0.552894890308 0.827465593815 -0.098017334938 -0.555570065975 0.831469297409 -1.19209289551e-07 -0.552894890308 0.827465593815 0.0980170369148 -0.544894993305 0.815492868423 0.19509023428 -0.531647503376 0.795666515827 0.290284633636 -0.513279855251 0.768177390099 0.382683396339 -0.489969104528 0.733290493488 0.471396803856 -0.461939573288 0.691341400146 0.555570304394 -0.429461538792 0.642734467983 0.634393334389 -0.39284747839 0.587937712669 0.70710682869 -0.352449983358 0.527478575706 0.773010492325 -0.308658242226 0.461939632893 0.831469595432 -0.261893928051 0.391951948404 0.881921231747 -0.212607488036 0.318189531565 0.923879504204 -0.161273494363 0.241362839937 0.956940352917 -0.108386367559 0.162211611867 0.980785250664 -0.0544553995132 0.0814982429147 0.995184719563 -0.0693085715175 0.0693085566163 0.995184719563 -0.13794966042 0.137949630618 0.980785250664 -0.205262213945 0.205262213945 0.956940352917 -0.270597994328 0.270597934723 0.923879504204 -0.333327740431 0.333327710629 0.881921231747 -0.392847418785 0.392847329378 0.831469595432 -0.448583722115 0.448583632708 0.773010492325 -0.499999970198 0.499999880791 0.70710682869 -0.546600818634 0.546600699425 0.634393334389 -0.587937533855 0.587937533855 0.555570304394 -0.623612344265 0.62361228466 0.471396803856 -0.653281271458 0.653281092644 0.382683396339 -0.67665886879 0.676658689976 0.290284633636 -0.693519711494 0.69351965189 0.19509023428 -0.703701674938 0.703701615334 0.0980170369148 -0.707106530666 0.707106471062 -1.19209289551e-07 -0.703701674938 0.703701615334 -0.098017334938 -0.693519711494 0.693519532681 -0.195090532303 -0.67665874958 0.676658689976 -0.290284991264 -0.653281152248 0.653281092644 -0.382683753967 -0.62361228466 0.623612165451 -0.471397042274 -0.587937533855 0.587937355042 -0.555570602417 -0.54660063982 0.546600401402 -0.634393692017 -0.499999582767 0.499999493361 -0.707107067108 -0.448583364487 0.44858327508 -0.773010730743 -0.392847061157 0.39284697175 -0.831470012665 -0.333327382803 0.333327323198 -0.88192152977 -0.270597577095 0.27059751749 -0.923879861832 -0.205261752009 0.205261722207 -0.956940531731 -0.137949153781 0.13794913888 -0.980785369873 -0.0693080276251 0.0693080201745 -0.995184779167 -0.0814976170659 0.054454959929 -0.995184779167 -0.162211030722 0.108385935426 -0.980785369873 -0.241362273693 0.161273092031 -0.956940531731 -0.31818908453 0.212607085705 -0.923879861832 -0.391951501369 0.261893570423 -0.88192152977 -0.461939245462 0.308657854795 -0.831470012665 -0.527478218079 0.352449595928 -0.773010730743 -0.587937295437 0.392847061157 -0.707107067108 -0.642734289169 0.429461121559 -0.634393692017 -0.691341340542 0.461939364672 -0.555570602417 -0.733290433884 0.489968895912 -0.471397042274 -0.768177330494 0.513279616833 -0.382683753967 -0.795666456223 0.531647264957 -0.290284991264 -0.815492868423 0.544894754887 -0.195090532303 -0.827465593815 0.552894771099 -0.098017334938 -0.831469297409 0.555569946766 -1.19209289551e-07 -0.827465593815 0.552894771099 0.0980170369148 -0.815492868423 0.544894874096 0.19509023428 -0.795666575432 0.531647264957 0.290284633636 -0.768177449703 0.513279616833 0.382683396339 -0.733290493488 0.489968985319 0.471396803856 -0.691341400146 0.461939543486 0.555570304394 -0.642734527588 0.429461359978 0.634393334389 -0.587937712669 0.39284735918 0.70710682869 -0.527478635311 0.352449864149 0.773010492325 -0.461939662695 0.308658123016 0.831469595432 -0.391951948404 0.261893898249 0.881921231747 -0.318189561367 0.21260741353 0.923879504204 -0.241362825036 0.161273479462 0.956940352917 -0.162211626768 0.108386322856 0.980785250664 -0.0814982503653 0.0544553771615 0.995184719563 0.0 0.0 1.0 -0.0905559957027 0.0375095121562 0.995184719563 -0.180239900947 0.0746577903628 0.980785250664 -0.268187999725 0.111087098718 0.956940352917 -0.353553265333 0.146446511149 0.923879504204 -0.435513645411 0.180395632982 0.881921231747 -0.513279795647 0.212607368827 0.831469595432 -0.586102843285 0.242771655321 0.773010492325 -0.653281331062 0.270597934723 0.70710682869 -0.714168310165 0.295818090439 0.634393334389 -0.768177390099 0.31818947196 0.555570304394 -0.81478869915 0.337496459484 0.471396803856 -0.853552997112 0.353553086519 0.382683396339 -0.884097278118 0.366204947233 0.290284633636 -0.906127095222 0.375330090523 0.19509023428 -0.919430494308 0.38084051013 0.0980170369148 -0.923879146576 0.382683187723 -1.19209289551e-07 -0.919430494308 0.38084051013 -0.098017334938 -0.906127095222 0.375329971313 -0.195090532303 -0.884097158909 0.366204977036 -0.290284991264 -0.853552877903 0.353553116322 -0.382683753967 -0.814788639545 0.337496399879 -0.471397042274 -0.768177270889 0.318189322948 -0.555570602417 -0.714168012142 0.295817881823 -0.634393692017 -0.65328091383 0.270597726107 -0.707107067108 -0.586102366447 0.242771461606 -0.773010730743 -0.513279378414 0.212607190013 -0.831470012665 -0.435513138771 0.180395409465 -0.88192152977 -0.353552758694 0.146446287632 -0.923879861832 -0.268187373877 0.111086823046 -0.956940531731 -0.180239230394 0.0746575221419 -0.980785369873 -0.0905552953482 0.0375092253089 -0.995184779167 -0.0961329862475 0.0191220324486 -0.995184779167 -0.19134093821 0.0380600653589 -0.980785369873 -0.284706175327 0.0566315576434 -0.956940531731 -0.375329583883 0.0746576339006 -0.923879861832 -0.462338268757 0.0919647589326 -0.88192152977 -0.544894456863 0.108386158943 -0.831470012665 -0.622202932835 0.123763769865 -0.773010730743 -0.693519294262 0.137949466705 -0.707107067108 -0.758156657219 0.150806546211 -0.634393692017 -0.8154925704 0.162211447954 -0.555570602417 -0.864974975586 0.172054111958 -0.471397042274 -0.906126856804 0.180239781737 -0.382683753967 -0.938552498817 0.186689645052 -0.290284991264 -0.961939334869 0.191341474652 -0.195090532303 -0.976062178612 0.19415076077 -0.098017334938 -0.980784833431 0.195090144873 -1.19209289551e-07 -0.976062178612 0.19415076077 0.0980170369148 -0.961939334869 0.191341593862 0.19509023428 -0.938552618027 0.186689585447 0.290284633636 -0.906126976013 0.180239722133 0.382683396339 -0.864975035191 0.172054156661 0.471396803856 -0.815492749214 0.162211567163 0.555570304394 -0.758157014847 0.150806695223 0.634393334389 -0.693519711494 0.137949600816 0.70710682869 -0.622203409672 0.123763866723 0.773010492325 -0.544894874096 0.10838624835 0.831469595432 -0.462338805199 0.0919648781419 0.881921231747 -0.375330120325 0.0746577605605 0.923879504204 -0.284706860781 0.0566317029297 0.956940352917 -0.191341653466 0.0380601994693 0.980785250664 -0.0961337313056 0.019122177735 0.995184719563 -0.0980170965195 -1.08745794591e-08 0.995184719563 -0.195090249181 -2.28326175744e-08 0.980785250664 -0.290284574032 -1.46720502414e-08 0.956940352917 -0.382683247328 -4.42582148708e-08 0.923879504204 -0.471396535635 -3.10984376029e-08 0.881921231747 -0.555569946766 -8.36059399489e-08 0.831469595432 -0.634393036366 -8.95451464089e-08 0.773010492325 -0.707106530666 -5.11834272743e-08 0.70710682869 -0.773010134697 -1.15055811989e-07 0.634393334389 -0.8314691782 -3.18472856975e-08 0.555570304394 -0.881920874119 -8.04276254485e-08 0.471396803856 -0.923879027367 -1.4400009718e-07 0.382683396339 -0.95693987608 -1.4218848321e-07 0.290284633636 -0.980784833431 -4.31086064623e-08 0.19509023428 -0.99518430233 -8.37954061694e-08 0.0980170369148 -0.999999523163 -9.39800415267e-08 -1.19209289551e-07 -0.99518430233 -8.37954061694e-08 -0.098017334938 -0.980784773827 -1.60027326501e-07 -0.195090532303 -0.956939816475 -6.04725514108e-08 -0.290284991264 -0.923878908157 -6.22841653808e-08 -0.382683753967 -0.881920814514 -1.12643853356e-07 -0.471397042274 -0.831468939781 -1.13881128527e-07 -0.555570602417 -0.773009777069 -1.91434466501e-07 -0.634393692017 -0.707106113434 -1.01318953227e-07 -0.707107067108 -0.634392559528 -9.15152895686e-08 -0.773010730743 -0.555569529533 -8.98969503282e-08 -0.831470012665 -0.471395999193 -4.33625473306e-08 -0.88192152977 -0.382682710886 -6.3829745045e-08 -0.923879861832 -0.290283888578 -2.34414017086e-08 -0.956940531731 -0.195089519024 -1.48266963151e-08 -0.980785369873 -0.0980163365602 -8.01564326025e-09 -0.995184779167 -0.096132978797 -0.0191220473498 -0.995184779167 -0.191340923309 -0.0380600914359 -0.980785369873 -0.284706145525 -0.0566316023469 -0.956940531731 -0.375329554081 -0.0746577531099 -0.923879861832 -0.462338238955 -0.091964840889 -0.88192152977 -0.544894397259 -0.108386330307 -0.831470012665 -0.62220287323 -0.123763941228 -0.773010730743 -0.693519234657 -0.13794966042 -0.707107067108 -0.75815653801 -0.15080691874 -0.634393692017 -0.815492451191 -0.16221165657 -0.555570602417 -0.864974915981 -0.172054320574 -0.471397042274 -0.906126797199 -0.180239900947 -0.382683753967 -0.938552439213 -0.186689764261 -0.290284991264 -0.96193921566 -0.191341772676 -0.195090532303 -0.976062059402 -0.194150909781 -0.098017334938 -0.980784773827 -0.195090323687 -1.19209289551e-07 -0.976062059402 -0.194150909781 0.0980170369148 -0.961939275265 -0.191341668367 0.19509023428 -0.938552498817 -0.186689853668 0.290284633636 -0.906126916409 -0.180240005255 0.382683396339 -0.864974975586 -0.172054305673 0.471396803856 -0.81549268961 -0.162211626768 0.555570304394 -0.758156895638 -0.150806903839 0.634393334389 -0.69351965189 -0.137949690223 0.70710682869 -0.622203290462 -0.123764030635 0.773010492325 -0.544894814491 -0.108386404812 0.831469595432 -0.462338775396 -0.0919649302959 0.881921231747 -0.375330090523 -0.0746578425169 0.923879504204 -0.284706830978 -0.0566317252815 0.956940352917 -0.191341638565 -0.0380602404475 0.980785250664 -0.096133723855 -0.0191221982241 0.995184719563 -0.0905559808016 -0.0375095307827 0.995184719563 -0.180239871144 -0.0746578276157 0.980785250664 -0.268187969923 -0.111087106168 0.956940352917 -0.353553205729 -0.146446585655 0.923879504204 -0.435513585806 -0.180395662785 0.881921231747 -0.513279676437 -0.212607488036 0.831469595432 -0.586102664471 -0.24277177453 0.773010492325 -0.653281211853 -0.270597994328 0.70710682869 -0.714168131351 -0.295818269253 0.634393334389 -0.768177270889 -0.318189501762 0.555570304394 -0.814788579941 -0.337496578693 0.471396803856 -0.853552818298 -0.353553324938 0.382683396339 -0.8840970397 -0.366205155849 0.290284633636 -0.906126916409 -0.375330120325 0.19509023428 -0.919430315495 -0.380840599537 0.0980170369148 -0.923879027367 -0.382683336735 -1.19209289551e-07 -0.919430315495 -0.380840599537 -0.098017334938 -0.906126856804 -0.375330209732 -0.195090532303 -0.8840970397 -0.366205066442 -0.290284991264 -0.853552758694 -0.353553205729 -0.382683753967 -0.814788520336 -0.337496578693 -0.471397042274 -0.768177032471 -0.31818947196 -0.555570602417 -0.714167773724 -0.295818209648 -0.634393692017 -0.653280794621 -0.270597875118 -0.707107067108 -0.586102247238 -0.242771610618 -0.773010730743 -0.513279259205 -0.212607339025 -0.831470012665 -0.435513079166 -0.180395469069 -0.88192152977 -0.353552699089 -0.14644639194 -0.923879861832 -0.268187314272 -0.111086852849 -0.956940531731 -0.180239200592 -0.0746575370431 -0.980785369873 -0.090555280447 -0.0375092364848 -0.995184779167 -0.0814975947142 -0.0544549636543 -0.995184779167 -0.162210986018 -0.108385935426 -0.980785369873 -0.241362199187 -0.161273092031 -0.956940531731 -0.318188995123 -0.212607175112 -0.923879861832 -0.39195138216 -0.261893600225 -0.88192152977 -0.461939096451 -0.308657974005 -0.831470012665 -0.527478039265 -0.352449685335 -0.773010730743 -0.587937116623 -0.392847180367 -0.707107067108 -0.642733931541 -0.429461359978 -0.634393692017 -0.691341042519 -0.461939454079 -0.555570602417 -0.73329025507 -0.489969015121 -0.471397042274 -0.76817715168 -0.513279676437 -0.382683753967 -0.795666277409 -0.531647324562 -0.290284991264 -0.8154925704 -0.544894933701 -0.195090532303 -0.827465355396 -0.552894771099 -0.098017334938 -0.831469118595 -0.555570006371 -1.19209289551e-07 -0.827465355396 -0.552894771099 0.0980170369148 -0.815492630005 -0.544894814491 0.19509023428 -0.795666277409 -0.531647384167 0.290284633636 -0.768177211285 -0.513279795647 0.382683396339 -0.733290314674 -0.489969044924 0.471396803856 -0.691341221333 -0.461939513683 0.555570304394 -0.642734289169 -0.429461479187 0.634393334389 -0.587937533855 -0.39284735918 0.70710682869 -0.527478396893 -0.352449923754 0.773010492325 -0.461939483881 -0.308658182621 0.831469595432 -0.391951858997 -0.261893898249 0.881921231747 -0.31818947196 -0.212607458234 0.923879504204 -0.241362780333 -0.161273479462 0.956940352917 -0.162211582065 -0.108386352658 0.980785250664 -0.0814982205629 -0.0544553883374 0.995184719563 -0.0693085342646 -0.0693085566163 0.995184719563 -0.137949600816 -0.137949645519 0.980785250664 -0.205262154341 -0.205262199044 0.956940352917 -0.270597875118 -0.270597934723 0.923879504204 -0.333327651024 -0.333327680826 0.881921231747 -0.392847210169 -0.392847329378 0.831469595432 -0.448583453894 -0.448583632708 0.773010492325 -0.499999731779 -0.499999821186 0.70710682869 -0.546600520611 -0.546600699425 0.634393334389 -0.587937355042 -0.587937414646 0.555570304394 -0.623612105846 -0.62361228466 0.471396803856 -0.653280973434 -0.653281211853 0.382683396339 -0.676658511162 -0.676658689976 0.290284633636 -0.693519413471 -0.693519532681 0.19509023428 -0.703701376915 -0.703701496124 0.0980170369148 -0.707106292248 -0.707106471062 -1.19209289551e-07 -0.703701376915 -0.703701496124 -0.098017334938 -0.693519353867 -0.69351965189 -0.195090532303 -0.676658511162 -0.676658630371 -0.290284991264 -0.65328091383 -0.653281092644 -0.382683753967 -0.623612046242 -0.623612225056 -0.471397042274 -0.587937176228 -0.587937355042 -0.555570602417 -0.546600222588 -0.546600520611 -0.634393692017 -0.499999374151 -0.499999552965 -0.707107067108 -0.44858315587 -0.448583304882 -0.773010730743 -0.392846882343 -0.392847031355 -0.831470012665 -0.333327233791 -0.333327293396 -0.88192152977 -0.270597457886 -0.270597577095 -0.923879861832 -0.205261662602 -0.205261692405 -0.956940531731 -0.137949094176 -0.137949123979 -0.980785369873 -0.0693080052733 -0.0693080201745 -0.995184779167 -0.0544549450278 -0.0814976021647 -0.995184779167 -0.108385898173 -0.162211000919 -0.980785369873 -0.161273047328 -0.241362199187 -0.956940531731 -0.2126070261 -0.318189054728 -0.923879861832 -0.261893510818 -0.391951411963 -0.88192152977 -0.308657765388 -0.461939185858 -0.831470012665 -0.352449476719 -0.527478098869 -0.773010730743 -0.392846941948 -0.587937235832 -0.707107067108 -0.429460972548 -0.64273416996 -0.634393692017 -0.46193921566 -0.691341161728 -0.555570602417 -0.489968776703 -0.733290374279 -0.471397042274 -0.513279438019 -0.768177270889 -0.382683753967 -0.531647145748 -0.795666337013 -0.290284991264 -0.544894576073 -0.815492749214 -0.195090532303 -0.552894592285 -0.827465355396 -0.098017334938 -0.555569767952 -0.8314691782 -1.19209289551e-07 -0.552894592285 -0.827465355396 0.0980170369148 -0.544894635677 -0.815492630005 0.19509023428 -0.531647145748 -0.795666396618 0.290284633636 -0.513279497623 -0.768177390099 0.382683396339 -0.489968836308 -0.733290433884 0.471396803856 -0.461939394474 -0.691341221333 0.555570304394 -0.429461210966 -0.642734348774 0.634393334389 -0.392847239971 -0.587937533855 0.70710682869 -0.352449715137 -0.527478516102 0.773010492325 -0.308658033609 -0.461939543486 0.831469595432 -0.261893838644 -0.391951858997 0.881921231747 -0.212607368827 -0.318189501762 0.923879504204 -0.161273419857 -0.241362795234 0.956940352917 -0.108386293054 -0.162211611867 0.980785250664 -0.0544553585351 -0.0814982354641 0.995184719563 -0.0375094935298 -0.0905559808016 0.995184719563 -0.0746577605605 -0.180239871144 0.980785250664 -0.111087046564 -0.268187940121 0.956940352917 -0.146446481347 -0.353553205729 0.923879504204 -0.18039560318 -0.435513556004 0.881921231747 -0.212607309222 -0.513279676437 0.831469595432 -0.242771521211 -0.586102664471 0.773010492325 -0.270597845316 -0.653281152248 0.70710682869 -0.29581797123 -0.714168071747 0.634393334389 -0.318189352751 -0.76817715168 0.555570304394 -0.337496340275 -0.814788639545 0.471396803856 -0.353552997112 -0.853552937508 0.382683396339 -0.366204857826 -0.884097099304 0.290284633636 -0.375329911709 -0.906126797199 0.19509023428 -0.380840390921 -0.919430196285 0.0980170369148 -0.382683038712 -0.923878967762 -1.19209289551e-07 -0.380840390921 -0.919430196285 -0.098017334938 -0.375329822302 -0.906126916409 -0.195090532303 -0.366204887629 -0.8840970397 -0.290284991264 -0.353552937508 -0.853552818298 -0.382683753967 -0.33749628067 -0.814788579941 -0.471397042274 -0.318189203739 -0.768177092075 -0.555570602417 -0.295817762613 -0.714167892933 -0.634393692017 -0.270597606897 -0.653280794621 -0.707107067108 -0.242771372199 -0.586102247238 -0.773010730743 -0.212607115507 -0.513279259205 -0.831470012665 -0.180395364761 -0.435513049364 -0.88192152977 -0.146446228027 -0.353552699089 -0.923879861832 -0.111086793244 -0.26818728447 -0.956940531731 -0.0746574923396 -0.180239200592 -0.980785369873 -0.037509214133 -0.090555280447 -0.995184779167 -0.0191220249981 -0.0961329713464 -0.995184779167 -0.0380600430071 -0.191340908408 -0.980785369873 -0.0566315427423 -0.28470608592 -0.956940531731 -0.0746575891972 -0.375329524279 -0.923879861832 -0.0919647291303 -0.46233817935 -0.88192152977 -0.108386106789 -0.544894337654 -0.831470012665 -0.12376370281 -0.622202813625 -0.773010730743 -0.137949377298 -0.693519115448 -0.707107067108 -0.150806456804 -0.75815653801 -0.634393692017 -0.162211358547 -0.815492391586 -0.555570602417 -0.172054007649 -0.864974856377 -0.471397042274 -0.180239617825 -0.906126797199 -0.382683753967 -0.186689570546 -0.938552379608 -0.290284991264 -0.191341355443 -0.961939156055 -0.195090532303 -0.194150701165 -0.976061820984 -0.098017334938 -0.195090040565 -0.980784595013 -1.19209289551e-07 -0.194150701165 -0.976061820984 0.0980170369148 -0.191341474652 -0.961939036846 0.19509023428 -0.186689540744 -0.938552439213 0.290284633636 -0.180239647627 -0.906126916409 0.382683396339 -0.172054052353 -0.864974975586 0.471396803856 -0.162211492658 -0.815492510796 0.555570304394 -0.150806620717 -0.758156716824 0.634393334389 -0.137949541211 -0.693519532681 0.70710682869 -0.123763769865 -0.622203230858 0.773010492325 -0.108386218548 -0.544894754887 0.831469595432 -0.0919648632407 -0.462338715792 0.881921231747 -0.0746577382088 -0.37533006072 0.923879504204 -0.0566316656768 -0.284706771374 0.956940352917 -0.0380601771176 -0.191341608763 0.980785250664 -0.0191221628338 -0.0961337089539 0.995184719563 2.1128810701e-08 -0.0980170741677 0.995184719563 3.60336578353e-08 -0.195090204477 0.980785250664 3.37667138695e-08 -0.290284484625 0.956940352917 5.45521849915e-08 -0.382683187723 0.923879504204 2.8270843444e-08 -0.471396446228 0.881921231747 8.95790392974e-08 -0.555569827557 0.831469595432 1.49656727899e-07 -0.634392857552 0.773010492325 7.47579136373e-08 -0.707106351852 0.70710682869 1.29988563913e-07 -0.773009836674 0.634393334389 5.84083252875e-08 -0.831468939781 0.555570304394 1.71103209823e-07 -0.88192075491 0.471396803856 2.05446013979e-07 -0.923878908157 0.382683396339 1.5114812868e-07 -0.956939697266 0.290284633636 1.0188587396e-07 -0.980784475803 0.19509023428 7.24850224287e-08 -0.995183944702 0.0980170369148 1.49770755797e-07 -0.99999922514 -1.19209289551e-07 7.24850224287e-08 -0.995183944702 -0.098017334938 2.42061162226e-07 -0.980784595013 -0.195090532303 1.10290166333e-07 -0.956939637661 -0.290284991264 2.11419106222e-07 -0.923878788948 -0.382683753967 1.91691142959e-07 -0.8819206357 -0.471397042274 1.66685296676e-07 -0.831468760967 -0.555570602417 2.55866922316e-07 -0.77300965786 -0.634393692017 1.54123114271e-07 -0.70710593462 -0.707107067108 1.34025484044e-07 -0.634392440319 -0.773010730743 1.17792311016e-07 -0.555569410324 -0.831470012665 5.51497905121e-08 -0.471395909786 -0.88192152977 9.60459729527e-08 -0.382682621479 -0.923879861832 2.06138075498e-08 -0.290283799171 -0.956940531731 3.09348102689e-08 -0.195089489222 -0.980785369873 1.24159900139e-08 -0.0980163216591 -0.995184779167 0.0191220473498 -0.0961329638958 -0.995184779167 0.0380601026118 -0.191340893507 -0.980785369873 0.0566315799952 -0.284706056118 -0.956940531731 0.0746577680111 -0.375329464674 -0.923879861832 0.0919648334384 -0.462338149548 -0.88192152977 0.108386330307 -0.544894278049 -0.831470012665 0.12376395613 -0.622202694416 -0.773010730743 0.137949675322 -0.693519055843 -0.707107067108 0.150806948543 -0.7581564188 -0.634393692017 0.162211671472 -0.815492272377 -0.555570602417 0.172054365277 -0.864974737167 -0.471397042274 0.180240020156 -0.90612667799 -0.382683753967 0.186689779162 -0.938552260399 -0.290284991264 0.191341817379 -0.961939036846 -0.195090532303 0.194150835276 -0.976061701775 -0.098017334938 0.195090323687 -0.980784475803 -1.19209289551e-07 0.194150835276 -0.976061701775 0.0980170369148 0.191341653466 -0.961938917637 0.19509023428 0.186689823866 -0.938552320004 0.290284633636 0.180240035057 -0.906126737595 0.382683396339 0.172054380178 -0.864974856377 0.471396803856 0.162211596966 -0.815492451191 0.555570304394 0.150806874037 -0.758156597614 0.634393334389 0.137949675322 -0.693519473076 0.70710682869 0.123764052987 -0.622203111649 0.773010492325 0.108386382461 -0.544894695282 0.831469595432 0.0919649153948 -0.462338685989 0.881921231747 0.0746578425169 -0.375330001116 0.923879504204 0.0566317290068 -0.284706741571 0.956940352917 0.0380602478981 -0.191341593862 0.980785250664 0.019122203812 -0.0961336940527 0.995184719563 0.0375095307827 -0.0905559509993 0.995184719563 0.0746578201652 -0.180239826441 0.980785250664 0.111087091267 -0.268187880516 0.956940352917 0.146446555853 -0.353553116322 0.923879504204 0.180395632982 -0.435513496399 0.881921231747 0.212607443333 -0.513279557228 0.831469595432 0.242771759629 -0.586102485657 0.773010492325 0.270597934723 -0.653281033039 0.70710682869 0.295818179846 -0.714167833328 0.634393334389 0.318189442158 -0.768177032471 0.555570304394 0.337496608496 -0.814788460732 0.471396803856 0.353553324938 -0.853552639484 0.382683396339 0.366205096245 -0.88409692049 0.290284633636 0.37533006072 -0.906126618385 0.19509023428 0.380840480328 -0.919429957867 0.0980170369148 0.38268327713 -0.923878729343 -1.19209289551e-07 0.380840480328 -0.919429957867 -0.098017334938 0.375330239534 -0.90612667799 -0.195090532303 0.36620503664 -0.884096860886 -0.290284991264 0.353553295135 -0.85355257988 -0.382683753967 0.337496578693 -0.814788341522 -0.471397042274 0.31818947196 -0.768176853657 -0.555570602417 0.295818209648 -0.714167654514 -0.634393692017 0.270597875118 -0.653280615807 -0.707107067108 0.242771580815 -0.586102068424 -0.773010730743 0.212607309222 -0.513279139996 -0.831470012665 0.180395454168 -0.435512989759 -0.88192152977 0.146446377039 -0.353552609682 -0.923879861832 0.111086815596 -0.268187224865 -0.956940531731 0.0746575444937 -0.18023917079 -0.980785369873 0.0375092327595 -0.0905552655458 -0.995184779167 0.054454959929 -0.081497579813 -0.995184779167 0.108385935426 -0.162210956216 -0.980785369873 0.161273047328 -0.24136210978 -0.956940531731 0.212607145309 -0.318188905716 -0.923879861832 0.261893570423 -0.391951322556 -0.88192152977 0.3086579144 -0.461938977242 -0.831470012665 0.352449625731 -0.527477860451 -0.773010730743 0.392847120762 -0.587936937809 -0.707107067108 0.429461330175 -0.642733812332 -0.634393692017 0.461939424276 -0.691340863705 -0.555570602417 0.489968985319 -0.733290076256 -0.471397042274 0.513279736042 -0.768176972866 -0.382683753967 0.531647264957 -0.795666098595 -0.290284991264 0.544894933701 -0.815492391586 -0.195090532303 0.552894592285 -0.827465057373 -0.098017334938 0.555569887161 -0.831468820572 -1.19209289551e-07 0.552894592285 -0.827465057373 0.0980170369148 0.544894695282 -0.815492331982 0.19509023428 0.531647324562 -0.795666158199 0.290284633636 0.513279736042 -0.768177032471 0.382683396339 0.489969044924 -0.733290195465 0.471396803856 0.461939424276 -0.691341042519 0.555570304394 0.429461330175 -0.642733991146 0.634393334389 0.392847269773 -0.587937355042 0.70710682869 0.352449893951 -0.527478277683 0.773010492325 0.308658123016 -0.461939364672 0.831469595432 0.261893838644 -0.39195176959 0.881921231747 0.21260741353 -0.318189382553 0.923879504204 0.161273434758 -0.241362705827 0.956940352917 0.108386337757 -0.162211552262 0.980785250664 0.0544553846121 -0.0814981982112 0.995184719563 0.0693085491657 -0.0693085119128 0.995184719563 0.137949630618 -0.137949571013 0.980785250664 0.20526213944 -0.205262094736 0.956940352917 0.270597875118 -0.270597815514 0.923879504204 0.333327621222 -0.333327561617 0.881921231747 0.392847239971 -0.39284709096 0.831469595432 0.448583573103 -0.448583364487 0.773010492325 0.499999701977 -0.499999582767 0.70710682869 0.546600520611 -0.546600282192 0.634393334389 0.587937295437 -0.587937176228 0.555570304394 0.623612225056 -0.623611986637 0.471396803856 0.653281092644 -0.653280794621 0.382683396339 0.676658630371 -0.676658391953 0.290284633636 0.693519353867 -0.693519175053 0.19509023428 0.703701257706 -0.703701138496 0.0980170369148 0.707106292248 -0.707106053829 -1.19209289551e-07 0.703701257706 -0.703701138496 -0.098017334938 0.693519592285 -0.693519175053 -0.195090532303 0.676658570766 -0.676658332348 -0.290284991264 0.653281092644 -0.653280735016 -0.382683753967 0.623612165451 -0.623611867428 -0.471397042274 0.587937295437 -0.587936997414 -0.555570602417 0.546600461006 -0.546600103378 -0.634393692017 0.499999463558 -0.499999195337 -0.707107067108 0.448583215475 -0.448583006859 -0.773010730743 0.392846941948 -0.392846763134 -0.831470012665 0.333327263594 -0.333327174187 -0.88192152977 0.27059751749 -0.270597398281 -0.923879861832 0.2052616328 -0.205261588097 -0.956940531731 0.137949109077 -0.137949064374 -0.980785369873 0.0693080127239 -0.0693079903722 -0.995184779167 0.0814975947142 -0.054454933852 -0.995184779167 0.162210986018 -0.108385868371 -0.980785369873 0.241362124681 -0.161272972822 -0.956940531731 0.318188995123 -0.212606981397 -0.923879861832 0.39195138216 -0.261893451214 -0.88192152977 0.461939096451 -0.308657675982 -0.831470012665 0.52747797966 -0.35244935751 -0.773010730743 0.587937116623 -0.392846792936 -0.707107067108 0.642734050751 -0.429460853338 -0.634393692017 0.691341042519 -0.461939066648 -0.555570602417 0.73329025507 -0.489968627691 -0.471397042274 0.768177211285 -0.51327931881 -0.382683753967 0.795666217804 -0.531646966934 -0.290284991264 0.81549268961 -0.544894397259 -0.195090532303 0.827465116978 -0.552894413471 -0.098017334938 0.831468999386 -0.555569589138 -1.19209289551e-07 0.827465116978 -0.552894413471 0.0980170369148 0.815492451191 -0.544894456863 0.19509023428 0.795666337013 -0.531647026539 0.290284633636 0.768177211285 -0.51327931881 0.382683396339 0.733290314674 -0.489968717098 0.471396803856 0.691341102123 -0.461939245462 0.555570304394 0.64273416996 -0.429461032152 0.634393334389 0.587937414646 -0.392847120762 0.70710682869 0.527478396893 -0.352449625731 0.773010492325 0.461939454079 -0.308657944202 0.831469595432 0.391951799393 -0.261893749237 0.881921231747 0.318189412355 -0.212607324123 0.923879504204 0.241362720728 -0.161273375154 0.956940352917 0.162211582065 -0.108386263251 0.980785250664 0.0814982205629 -0.0544553399086 0.995184719563 0.0905559659004 -0.0375094786286 0.995184719563 0.180239841342 -0.0746577382088 0.980785250664 0.268187880516 -0.111087016761 0.956940352917 0.353553116322 -0.146446451545 0.923879504204 0.435513466597 -0.180395528674 0.881921231747 0.513279557228 -0.212607234716 0.831469595432 0.586102545261 -0.242771461606 0.773010492325 0.653281033039 -0.270597755909 0.70710682869 0.714167892933 -0.295817822218 0.634393334389 0.768177032471 -0.318189233541 0.555570304394 0.814788460732 -0.337496250868 0.471396803856 0.853552699089 -0.353552848101 0.382683396339 0.884096980095 -0.366204768419 0.290284633636 0.906126618385 -0.375329762697 0.19509023428 0.919429957867 -0.380840241909 0.0980170369148 0.923878788948 -0.3826828897 -1.19209289551e-07 0.919429957867 -0.380840241909 -0.098017334938 0.906126797199 -0.375329643488 -0.195090532303 0.884096860886 -0.366204738617 -0.290284991264 0.853552699089 -0.353552848101 -0.382683753967 0.814788401127 -0.337496161461 -0.471397042274 0.768176913261 -0.31818908453 -0.555570602417 0.714167714119 -0.295817673206 -0.634393692017 0.653280675411 -0.270597487688 -0.707107067108 0.586102068424 -0.242771282792 -0.773010730743 0.5132791996 -0.212607041001 -0.831470012665 0.435513019562 -0.180395305157 -0.88192152977 0.353552639484 -0.146446198225 -0.923879861832 0.268187195063 -0.11108674109 -0.956940531731 0.18023917079 -0.0746574699879 -0.980785369873 0.0905552729964 -0.0375092029572 -0.995184779167 0.0961329564452 -0.0191220156848 -0.995184779167 0.191340863705 -0.038060028106 -0.980785369873 0.284705996513 -0.0566315092146 -0.956940531731 0.375329464674 -0.074657574296 -0.923879861832 0.462338119745 -0.0919646769762 -0.88192152977 0.544894218445 -0.108386047184 -0.831470012665 0.622202575207 -0.123763650656 -0.773010730743 0.693518996239 -0.137949287891 -0.707107067108 0.758156299591 -0.1508063972 -0.634393692017 0.815492212772 -0.162211284041 -0.555570602417 0.864974677563 -0.172053918242 -0.471397042274 0.906126618385 -0.180239543319 -0.382683753967 0.93855214119 -0.186689466238 -0.290284991264 0.961938977242 -0.191341206431 -0.195090532303 0.976061582565 -0.194150596857 -0.098017334938 0.980784416199 -0.195089921355 -1.19209289551e-07 0.976061582565 -0.194150596857 0.0980170369148 0.961938798428 -0.191341355443 0.19509023428 0.938552260399 -0.186689466238 0.290284633636 0.906126618385 -0.180239543319 0.382683396339 0.864974737167 -0.172054007649 0.471396803856 0.815492331982 -0.162211403251 0.555570304394 0.75815653801 -0.150806516409 0.634393334389 0.693519413471 -0.137949481606 0.70710682869 0.622203111649 -0.123763732612 0.773010492325 0.544894635677 -0.108386166394 0.831469595432 0.462338596582 -0.0919648110867 0.881921231747 0.375329971313 -0.0746577307582 0.923879504204 0.284706711769 -0.0566316470504 0.956940352917 0.19134157896 -0.0380601584911 0.980785250664 0.0961336940527 -0.0191221497953 0.995184719563 0.0980170592666 3.10097227896e-08 0.995184719563 0.195090159774 4.84880615659e-08 0.980785250664 0.29028442502 4.04069737669e-08 0.956940352917 0.382683098316 4.44171703862e-08 0.923879504204 0.471396327019 5.61662005794e-08 0.881921231747 0.555569708347 1.17474399985e-07 0.831469595432 0.634392738342 1.629372548e-07 0.773010492325 0.707106232643 1.09960694772e-07 0.70710682869 0.77300965786 1.97407558744e-07 0.634393334389 0.831468701363 1.11212486331e-07 0.555570304394 0.881920516491 1.68434567627e-07 0.471396803856 0.923878610134 2.49608433478e-07 0.382683396339 0.956939518452 1.89337470147e-07 0.290284633636 0.980784237385 1.72291436229e-07 0.19509023428 0.995183706284 1.28275743805e-07 0.0980170369148 0.999999046326 2.31804605733e-07 -1.19209289551e-07 0.995183706284 1.28275743805e-07 -0.098017334938 0.980784356594 3.53324679736e-07 -0.195090532303 0.956939399242 1.66080880604e-07 -0.290284991264 0.923878610134 2.49608433478e-07 -0.382683753967 0.881920456886 2.44495311108e-07 -0.471397042274 0.831468582153 2.04874623932e-07 -0.555570602417 0.773009359837 2.67813106802e-07 -0.634393692017 0.707105755806 2.18555570086e-07 -0.707107067108 0.6343922019 1.38664262295e-07 -0.773010730743 0.555569291115 1.52995085045e-07 -0.831470012665 0.471395820379 9.46734388663e-08 -0.88192152977 0.382682561874 9.90325190742e-08 -0.923879861832 0.290283709764 3.60547609546e-08 -0.956940531731 0.195089444518 3.68284318597e-08 -0.980785369873 0.0980163067579 1.86431918792e-08 -0.995184779167";
    _sphere.normal = "0.11209448427 0.0222785118967 -0.993438541889 0.207037568092 0.0411694683135 -0.97744679451 0.30002745986 0.0596636869013 -0.95205539465 0.39008757472 0.0775780528784 -0.917477965355 0.476424455643 0.0947599709034 -0.874080657959 0.558153033257 0.110995821655 -0.822260200977 0.634510338306 0.126194030046 -0.762504935265 0.704763948917 0.140171512961 -0.695425271988 0.768211901188 0.152806177735 -0.621631503105 0.824274420738 0.163945436478 -0.541886627674 0.872402131557 0.173528239131 -0.456892609596 0.912137210369 0.181432545185 -0.367503881454 0.943082988262 0.187566757202 -0.274575024843 0.959776580334 0.210791349411 -0.185399949551 0.97930842638 0.180578023195 -0.0910061970353 0.976683855057 0.214331492782 0.00979644153267 0.976073503494 0.193975642323 0.0979949310422 0.961973965168 0.191015347838 0.195074319839 0.938627302647 0.186223939061 0.290261536837 0.906216621399 0.179631948471 0.38267159462 0.865108191967 0.171300396323 0.47138890624 0.81563770771 0.161320835352 0.555558919907 0.758323907852 0.149784848094 0.634388267994 0.693716228008 0.13681447506 0.707113862038 0.622425019741 0.122531816363 0.773003339767 0.545121610165 0.107058934867 0.831446290016 0.46259957552 0.0905484184623 0.881923913956 0.375591307878 0.0731833875179 0.923856317997 0.284981846809 0.055116429925 0.956938385963 0.191625714302 0.0365001372993 0.980773329735 0.106265448034 0.0181890316308 0.994140446186 0.100680559874 0.0385448783636 0.994140446186 0.18082216382 0.0731833875179 0.980773329735 0.268745988607 0.109653003514 0.956938385963 0.354106277227 0.145054474473 0.923856317997 0.436048477888 0.179052099586 0.881923913956 0.513779103756 0.211340680718 0.831446290016 0.586565732956 0.24161504209 0.773003339767 0.653706490993 0.269539475441 0.707113862038 0.714529871941 0.294869840145 0.634388267994 0.768486559391 0.317361980677 0.555558919907 0.815057814121 0.336771756411 0.47138890624 0.853755295277 0.352977067232 0.38267159462 0.884243309498 0.365764349699 0.290261536837 0.906216621399 0.37504196167 0.195074319839 0.919461667538 0.380687892437 0.0979949310422 0.923856317997 0.38267159462 0.0 0.919370114803 0.38096255064 -0.0979949310422 0.906002998352 0.375591307878 -0.195074319839 0.883907616138 0.366618841887 -0.290261536837 0.853297531605 0.354106277227 -0.38267159462 0.814477980137 0.338175594807 -0.47138890624 0.767815172672 0.318979471922 -0.555558919907 0.713766872883 0.296731472015 -0.634388267994 0.652821421623 0.271614730358 -0.707113862038 0.585589170456 0.243903934956 -0.773003339767 0.5127415061 0.213812679052 -0.831446290016 0.434949785471 0.18167668581 -0.881923913956 0.352946549654 0.147801145911 -0.923856317997 0.267586290836 0.112491227686 -0.956938385963 0.179601430893 0.0761131644249 -0.980773329735 0.0984527096152 0.0439161360264 -0.994140446186 0.0879848599434 0.0622882768512 -0.994140446186 0.161320835352 0.109683521092 -0.980773329735 0.240485861897 0.16254158318 -0.956938385963 0.317331463099 0.213812679052 -0.923856317997 0.391125231981 0.263039022684 -0.881923913956 0.461165189743 0.309762865305 -0.831446290016 0.52678000927 0.353465378284 -0.773003339767 0.587298214436 0.393780320883 -0.707113862038 0.642139971256 0.430280476809 -0.634388267994 0.690816998482 0.462660610676 -0.555558919907 0.732840955257 0.490585029125 -0.47138890624 0.767815172672 0.513779103756 -0.38267159462 0.795403897762 0.532029151917 -0.290261536837 0.815301954746 0.545152127743 -0.195074319839 0.827356815338 0.552995383739 -0.0979949310422 0.831446290016 0.555558919907 0.0 0.827539920807 0.552751243114 0.0979949310422 0.827723026276 0.529587686062 0.185399949551 0.789880037308 0.543717741966 0.283516943455 0.768486559391 0.5127415061 0.38267159462 0.73369550705 0.48933377862 0.47138890624 0.69182407856 0.461195707321 0.555558919907 0.643269121647 0.428601950407 0.634388267994 0.588549435139 0.391888171434 0.707113862038 0.528153300285 0.351390123367 0.773003339767 0.462660610676 0.307535022497 0.831446290016 0.392712175846 0.260689109564 0.881923913956 0.318979471922 0.211340680718 0.923856317997 0.242194890976 0.159978032112 0.956938385963 0.16306039691 0.107058934867 0.980773329735 0.0912198275328 0.0574663542211 0.994140446186 0.0782494619489 0.0741599798203 0.994140446186 0.139042332768 0.13681447506 0.980773329735 0.206335648894 0.204138308764 0.956938385963 0.271614730358 0.269539475441 0.923856317997 0.334299743176 0.332316040993 0.881923913956 0.393780320883 0.391888171434 0.831446290016 0.449446082115 0.447676002979 0.773003339767 0.500778198242 0.499191254377 0.707113862038 0.547288417816 0.54585403204 0.634388267994 0.588549435139 0.587298214436 0.555558919907 0.624134063721 0.623065888882 0.47138890624 0.653706490993 0.652821421623 0.38267159462 0.654103219509 0.698507666588 0.290139466524 0.715903222561 0.670400083065 0.194982752204 0.703787326813 0.703573703766 0.0979949310422 0.70708334446 0.70708334446 0.0 0.703573703766 0.703787326813 -0.0979949310422 0.693288981915 0.693716228008 -0.195074319839 0.676320672035 0.67696160078 -0.290261536837 0.652821421623 0.653706490993 -0.38267159462 0.623065888882 0.624134063721 -0.47138890624 0.587298214436 0.588549435139 -0.555558919907 0.54585403204 0.547288417816 -0.634388267994 0.499160736799 0.500778198242 -0.707113862038 0.447676002979 0.449446082115 -0.773003339767 0.391888171434 0.393780320883 -0.831446290016 0.332316040993 0.334299743176 -0.881923913956 0.269539475441 0.271614730358 -0.923856317997 0.204138308764 0.206335648894 -0.956938385963 0.13681447506 0.139042332768 -0.980773329735 0.0741599798203 0.0782494619489 -0.994140446186 0.0 0.0 -1.0 0.0574663542211 0.0912198275328 -0.994140446186 0.107058934867 0.16306039691 -0.980773329735 0.159978032112 0.242194890976 -0.956938385963 0.211340680718 0.318979471922 -0.923856317997 0.260689109564 0.392712175846 -0.881923913956 0.307535022497 0.462660610676 -0.831446290016 0.351390123367 0.528153300285 -0.773003339767 0.391888171434 0.588549435139 -0.707113862038 0.428601950407 0.643269121647 -0.634388267994 0.461195707321 0.69182407856 -0.555558919907 0.48933377862 0.73369550705 -0.47138890624 0.5127415061 0.768486559391 -0.38267159462 0.531235694885 0.795922756195 -0.290261536837 0.544633328915 0.81563770771 -0.195074319839 0.552751243114 0.827539920807 -0.0979949310422 0.555558919907 0.831446290016 0.0 0.552995383739 0.827356815338 0.0979949310422 0.555650472641 0.806512653828 0.201940983534 0.514481008053 0.803430259228 0.299600213766 0.513779103756 0.767815172672 0.38267159462 0.490585029125 0.732840955257 0.47138890624 0.478926956654 0.686330735683 0.547288417816 0.423200160265 0.652150034904 0.628925442696 0.393780320883 0.587298214436 0.707113862038 0.353465378284 0.52678000927 0.773003339767 0.309762865305 0.461165189743 0.831446290016 0.263039022684 0.391155749559 0.881923913956 0.213812679052 0.317331463099 0.923856317997 0.16254158318 0.240485861897 0.956938385963 0.109683521092 0.161320835352 0.980773329735 0.0622882768512 0.0879848599434 0.994140446186 0.0439161360264 0.0984527096152 0.994140446186 0.0761131644249 0.179601430893 0.980773329735 0.112491227686 0.267586290836 0.956938385963 0.147801145911 0.352946549654 0.923856317997 0.18167668581 0.434949785471 0.881923913956 0.213812679052 0.5127415061 0.831446290016 0.243903934956 0.585589170456 0.773003339767 0.271614730358 0.652821421623 0.707113862038 0.272255629301 0.72362434864 0.634174644947 0.343272209167 0.757438898087 0.55534529686 0.338175594807 0.814477980137 0.47138890624 0.354106277227 0.853297531605 0.38267159462 0.366618841887 0.883907616138 0.290261536837 0.375591307878 0.906002998352 0.195074319839 0.38096255064 0.919370114803 0.0979949310422 0.38267159462 0.923856317997 0.0 0.380687892437 0.919461667538 -0.0979949310422 0.375011444092 0.906216621399 -0.195074319839 0.365764349699 0.884243309498 -0.290261536837 0.352977067232 0.853755295277 -0.38267159462 0.336771756411 0.815057814121 -0.47138890624 0.317361980677 0.768486559391 -0.555558919907 0.294869840145 0.714529871941 -0.634388267994 0.269539475441 0.653706490993 -0.707113862038 0.24161504209 0.586565732956 -0.773003339767 0.211340680718 0.513779103756 -0.831446290016 0.179052099586 0.436017930508 -0.881923913956 0.145054474473 0.354106277227 -0.923856317997 0.109653003514 0.268745988607 -0.956938385963 0.0731833875179 0.18082216382 -0.980773329735 0.0385448783636 0.100680559874 -0.994140446186 0.0181890316308 0.106265448034 -0.994140446186 0.0365001372993 0.191625714302 -0.980773329735 0.055116429925 0.284981846809 -0.956938385963 0.0731833875179 0.375591307878 -0.923856317997 0.0905484184623 0.46259957552 -0.881923913956 0.107058934867 0.545121610165 -0.831446290016 0.122531816363 0.622425019741 -0.773003339767 0.13681447506 0.693716228008 -0.707113862038 0.149784848094 0.758323907852 -0.634388267994 0.161320835352 0.81563770771 -0.555558919907 0.171300396323 0.865108191967 -0.47138890624 0.179631948471 0.906216621399 -0.38267159462 0.186223939061 0.938627302647 -0.290261536837 0.191015347838 0.961973965168 -0.195074319839 0.193975642323 0.976073503494 -0.0979949310422 0.195074319839 0.980773329735 0.0 0.194280833006 0.976012468338 0.0979949310422 0.191625714302 0.961851835251 0.195074319839 0.187139496207 0.938444137573 0.290261536837 0.18082216382 0.906002998352 0.38267159462 0.172765284777 0.864803016186 0.47138890624 0.188909575343 0.809839189053 0.55534529686 0.125858336687 0.762840688229 0.634174644947 0.139042332768 0.693288981915 0.707113862038 0.124973297119 0.621936678886 0.773003339767 0.109683521092 0.544602811337 0.831446290016 0.093325600028 0.462050229311 0.881923913956 0.0761131644249 0.375011444092 0.923856317997 0.0581377595663 0.284371465445 0.956938385963 0.0395825058222 0.191015347838 0.980773329735 0.023865474388 0.105136267841 0.994140446186 0.00286873988807 0.107760854065 0.994140446186 0.00155644398183 0.195074319839 0.980773329735 0.00152592547238 0.290261536837 0.956938385963 0.00146488845348 0.38267159462 0.923856317997 0.00140385143459 0.471358388662 0.881923913956 0.00131229590625 0.555558919907 0.831446290016 0.0012207403779 0.634357750416 0.773003339767 0.00112918484956 0.70708334446 0.707113862038 -0.0253608822823 0.772728681564 0.634174644947 0.0272835474461 0.831141114235 0.55534529686 0.000732444226742 0.881893396378 0.47138890624 0.000610370188951 0.923856317997 0.38267159462 0.000457777641714 0.956907868385 0.290261536837 0.000305185094476 0.980773329735 0.195074319839 0.000152592547238 0.995178103447 0.0979949310422 0.0 1.0 0.0 -0.000152592547238 0.995178103447 -0.0979949310422 -0.000305185094476 0.980773329735 -0.195074319839 -0.000457777641714 0.956907868385 -0.290261536837 -0.000610370188951 0.923856317997 -0.38267159462 -0.000732444226742 0.881893396378 -0.47138890624 -0.00088503677398 0.831446290016 -0.555558919907 -0.00100711081177 0.772972822189 -0.634388267994 -0.00112918484956 0.70708334446 -0.707113862038 -0.0012207403779 0.634357750416 -0.773003339767 -0.00131229590625 0.555558919907 -0.831446290016 -0.00140385143459 0.471358388662 -0.881923913956 -0.00146488845348 0.38267159462 -0.923856317997 -0.00152592547238 0.290261536837 -0.956938385963 -0.00155644398183 0.195074319839 -0.980773329735 -0.00286873988807 0.107760854065 -0.994140446186 -0.023865474388 0.105136267841 -0.994140446186 -0.0395825058222 0.191015347838 -0.980773329735 -0.0581377595663 0.284371465445 -0.956938385963 -0.0761131644249 0.375011444092 -0.923856317997 -0.093325600028 0.462050229311 -0.881923913956 -0.109683521092 0.544602811337 -0.831446290016 -0.124973297119 0.621936678886 -0.773003339767 -0.139042332768 0.693288981915 -0.707113862038 -0.151799067855 0.757927179337 -0.634388267994 -0.16306039691 0.815301954746 -0.555558919907 -0.172765284777 0.864803016186 -0.47138890624 -0.18082216382 0.906002998352 -0.38267159462 -0.187139496207 0.938444137573 -0.290261536837 -0.191625714302 0.961851835251 -0.195074319839 -0.194280833006 0.976012468338 -0.0979949310422 -0.195074319839 0.980773329735 0.0 -0.193975642323 0.976073503494 0.0979949310422 -0.191015347838 0.961973965168 0.195074319839 -0.186223939061 0.938627302647 0.290261536837 -0.179631948471 0.906216621399 0.38267159462 -0.171300396323 0.865108191967 0.47138890624 -0.135380104184 0.820490121841 0.55534529686 -0.175634026527 0.752952694893 0.634174644947 -0.13681447506 0.693716228008 0.707113862038 -0.122531816363 0.622425019741 0.773003339767 -0.107058934867 0.545121610165 0.831446290016 -0.0905484184623 0.46259957552 0.881923913956 -0.0731833875179 0.375591307878 0.923856317997 -0.055116429925 0.284981846809 0.956938385963 -0.0365001372993 0.191625714302 0.980773329735 -0.0181890316308 0.106265448034 0.994140446186 -0.0385448783636 0.100680559874 0.994140446186 -0.0731833875179 0.18082216382 0.980773329735 -0.109653003514 0.268745988607 0.956938385963 -0.145054474473 0.354106277227 0.923856317997 -0.179052099586 0.436048477888 0.881923913956 -0.211340680718 0.513779103756 0.831446290016 -0.24161504209 0.586565732956 0.773003339767 -0.269539475441 0.653706490993 0.707113862038 -0.319132059813 0.704214632511 0.634174644947 -0.292855620384 0.77831351757 0.55534529686 -0.336771756411 0.815057814121 0.47138890624 -0.352977067232 0.853755295277 0.38267159462 -0.365764349699 0.884243309498 0.290261536837 -0.37504196167 0.906216621399 0.195074319839 -0.380687892437 0.919461667538 0.0979949310422 -0.38267159462 0.923856317997 0.0 -0.38096255064 0.919370114803 -0.0979949310422 -0.387615591288 0.899410963058 -0.201940983534 -0.347849965096 0.888363301754 -0.299600213766 -0.354106277227 0.853297531605 -0.38267159462 -0.338175594807 0.814477980137 -0.47138890624 -0.318979471922 0.767815172672 -0.555558919907 -0.296731472015 0.713766872883 -0.634388267994 -0.271614730358 0.652821421623 -0.707113862038 -0.243903934956 0.585589170456 -0.773003339767 -0.213812679052 0.5127415061 -0.831446290016 -0.18167668581 0.434949785471 -0.881923913956 -0.147801145911 0.352946549654 -0.923856317997 -0.112491227686 0.267586290836 -0.956938385963 -0.0761131644249 0.179601430893 -0.980773329735 -0.0439161360264 0.0984527096152 -0.994140446186 -0.0622882768512 0.0879848599434 -0.994140446186 -0.109683521092 0.161320835352 -0.980773329735 -0.16254158318 0.240485861897 -0.956938385963 -0.213812679052 0.317331463099 -0.923856317997 -0.263039022684 0.391125231981 -0.881923913956 -0.309762865305 0.461165189743 -0.831446290016 -0.353465378284 0.52678000927 -0.773003339767 -0.393780320883 0.587298214436 -0.707113862038 -0.430280476809 0.642139971256 -0.634388267994 -0.462660610676 0.690816998482 -0.555558919907 -0.490585029125 0.732840955257 -0.47138890624 -0.513779103756 0.767815172672 -0.38267159462 -0.50526446104 0.812707901001 -0.290139466524 -0.571367561817 0.797173976898 -0.194982752204 -0.552995383739 0.827356815338 -0.0979949310422 -0.555558919907 0.831446290016 0.0 -0.552751243114 0.827539920807 0.0979949310422 -0.529587686062 0.827723026276 0.185399949551 -0.543717741966 0.789880037308 0.283516943455 -0.5127415061 0.768486559391 0.38267159462 -0.48933377862 0.73369550705 0.47138890624 -0.439069807529 0.706228852272 0.55534529686 -0.450392156839 0.628406643867 0.634174644947 -0.391888171434 0.588549435139 0.707113862038 -0.351390123367 0.528153300285 0.773003339767 -0.307535022497 0.462660610676 0.831446290016 -0.260689109564 0.392712175846 0.881923913956 -0.211340680718 0.318979471922 0.923856317997 -0.159978032112 0.242194890976 0.956938385963 -0.107058934867 0.16306039691 0.980773329735 -0.0574663542211 0.0912198275328 0.994140446186 -0.0741599798203 0.0782494619489 0.994140446186 -0.13681447506 0.139042332768 0.980773329735 -0.204138308764 0.206335648894 0.956938385963 -0.269539475441 0.271614730358 0.923856317997 -0.332316040993 0.334299743176 0.881923913956 -0.391888171434 0.393780320883 0.831446290016 -0.447676002979 0.449446082115 0.773003339767 -0.499191254377 0.500778198242 0.707113862038 -0.56434828043 0.528458535671 0.634174644947 -0.56840723753 0.606982648373 0.55534529686 -0.623065888882 0.624134063721 0.47138890624 -0.652821421623 0.653706490993 0.38267159462 -0.698507666588 0.654103219509 0.290139466524 -0.670400083065 0.715903222561 0.194982752204 -0.703573703766 0.703787326813 0.0979949310422 -0.70708334446 0.70708334446 0.0 -0.703787326813 0.703573703766 -0.0979949310422 -0.715903222561 0.670400083065 -0.194982752204 -0.654103219509 0.698507666588 -0.290139466524 -0.653706490993 0.652821421623 -0.38267159462 -0.624134063721 0.623065888882 -0.47138890624 -0.588549435139 0.587298214436 -0.555558919907 -0.551377892494 0.53538620472 -0.639759540558 -0.485641032457 0.50437939167 -0.713950037956 -0.449446082115 0.447676002979 -0.773003339767 -0.393780320883 0.391888171434 -0.831446290016 -0.334299743176 0.332316040993 -0.881923913956 -0.271614730358 0.269539475441 -0.923856317997 -0.206335648894 0.204138308764 -0.956938385963 -0.139042332768 0.13681447506 -0.980773329735 -0.0782494619489 0.0741599798203 -0.994140446186 -0.0912198275328 0.0574663542211 -0.994140446186 -0.16306039691 0.107058934867 -0.980773329735 -0.242194890976 0.159978032112 -0.956938385963 -0.318979471922 0.211340680718 -0.923856317997 -0.392712175846 0.260689109564 -0.881923913956 -0.462660610676 0.307535022497 -0.831446290016 -0.528153300285 0.351390123367 -0.773003339767 -0.574877142906 0.412030398846 -0.706900238991 -0.65660572052 0.408215582371 -0.634174644947 -0.69182407856 0.461195707321 -0.555558919907 -0.73369550705 0.48933377862 -0.47138890624 -0.768486559391 0.5127415061 -0.38267159462 -0.77782523632 0.557481586933 -0.290139466524 -0.832941651344 0.517838060856 -0.194982752204 -0.827539920807 0.552751243114 -0.0979949310422 -0.831446290016 0.555558919907 0.0 -0.827356815338 0.552995383739 0.0979949310422 -0.797173976898 0.571367561817 0.194982752204 -0.812707901001 0.50526446104 0.290139466524 -0.767815172672 0.513779103756 0.38267159462 -0.732840955257 0.490585029125 0.47138890624 -0.675893425941 0.484450817108 0.55534529686 -0.65660572052 0.408215582371 0.634174644947 -0.587298214436 0.393780320883 0.707113862038 -0.52678000927 0.353465378284 0.773003339767 -0.461165189743 0.309762865305 0.831446290016 -0.391155749559 0.263039022684 0.881923913956 -0.317331463099 0.213812679052 0.923856317997 -0.240485861897 0.16254158318 0.956938385963 -0.161320835352 0.109683521092 0.980773329735 -0.0879848599434 0.0622882768512 0.994140446186 0.0 0.0 1.0 -0.0984527096152 0.0439161360264 0.994140446186 -0.179601430893 0.0761131644249 0.980773329735 -0.267586290836 0.112491227686 0.956938385963 -0.352946549654 0.147801145911 0.923856317997 -0.434949785471 0.18167668581 0.881923913956 -0.5127415061 0.213812679052 0.831446290016 -0.585589170456 0.243903934956 0.773003339767 -0.652821421623 0.271614730358 0.707113862038 -0.72362434864 0.272255629301 0.634174644947 -0.757438898087 0.343272209167 0.55534529686 -0.814477980137 0.338175594807 0.47138890624 -0.853297531605 0.354106277227 0.38267159462 -0.895657241344 0.336985379457 0.290139466524 -0.893337786198 0.40485855937 0.194982752204 -0.919370114803 0.38096255064 0.0979949310422 -0.923856317997 0.38267159462 0.0 -0.919461667538 0.380687892437 -0.0979949310422 -0.917966246605 0.345377981663 -0.194982752204 -0.8716391325 0.395031601191 -0.290139466524 -0.853755295277 0.352977067232 -0.38267159462 -0.815057814121 0.336771756411 -0.47138890624 -0.768486559391 0.317361980677 -0.555558919907 -0.72362434864 0.272255629301 -0.634174644947 -0.644215226173 0.291940063238 -0.706900238991 -0.586565732956 0.24161504209 -0.773003339767 -0.513779103756 0.211340680718 -0.831446290016 -0.436017930508 0.179052099586 -0.881923913956 -0.354106277227 0.145054474473 -0.923856317997 -0.268745988607 0.109653003514 -0.956938385963 -0.18082216382 0.0731833875179 -0.980773329735 -0.100680559874 0.0385448783636 -0.994140446186 -0.106265448034 0.0181890316308 -0.994140446186 -0.191625714302 0.0365001372993 -0.980773329735 -0.284981846809 0.055116429925 -0.956938385963 -0.375591307878 0.0731833875179 -0.923856317997 -0.46259957552 0.0905484184623 -0.881923913956 -0.545121610165 0.107058934867 -0.831446290016 -0.622425019741 0.122531816363 -0.773003339767 -0.688772261143 0.160649433732 -0.706900238991 -0.762840688229 0.125858336687 -0.634174644947 -0.81563770771 0.161320835352 -0.555558919907 -0.865108191967 0.171300396323 -0.47138890624 -0.906216621399 0.179631948471 -0.38267159462 -0.931943714619 0.217383340001 -0.290139466524 -0.967711389065 0.15967284143 -0.194982752204 -0.976073503494 0.193975642323 -0.0979949310422 -0.980773329735 0.195074319839 0.0 -0.976012468338 0.194280833006 0.0979949310422 -0.955137789249 0.222785115242 0.194982752204 -0.944212138653 0.155796989799 0.290139466524 -0.906002998352 0.18082216382 0.38267159462 -0.864803016186 0.172765284777 0.47138890624 -0.809839189053 0.188909575343 0.55534529686 -0.762840688229 0.125858336687 0.634174644947 -0.693288981915 0.139042332768 0.707113862038 -0.621936678886 0.124973297119 0.773003339767 -0.544602811337 0.109683521092 0.831446290016 -0.462050229311 0.093325600028 0.881923913956 -0.375011444092 0.0761131644249 0.923856317997 -0.284371465445 0.0581377595663 0.956938385963 -0.191015347838 0.0395825058222 0.980773329735 -0.105136267841 0.023865474388 0.994140446186 -0.107760854065 0.00286873988807 0.994140446186 -0.195074319839 0.00155644398183 0.980773329735 -0.290261536837 0.00152592547238 0.956938385963 -0.38267159462 0.00146488845348 0.923856317997 -0.471358388662 0.00140385143459 0.881923913956 -0.555558919907 0.00131229590625 0.831446290016 -0.634357750416 0.0012207403779 0.773003339767 -0.70708334446 0.00112918484956 0.707113862038 -0.772728681564 -0.0253608822823 0.634174644947 -0.831141114235 0.0272835474461 0.55534529686 -0.881893396378 0.000732444226742 0.47138890624 -0.923856317997 0.000610370188951 0.38267159462 -0.956450104713 -0.0313730277121 0.290139466524 -0.980254530907 0.0321665108204 0.194982752204 -0.995178103447 0.000152592547238 0.0979949310422 -1.0 0.0 0.0 -0.995178103447 -0.000152592547238 -0.0979949310422 -0.980254530907 -0.0321665108204 -0.194982752204 -0.956450104713 0.0313730277121 -0.290139466524 -0.923856317997 -0.000610370188951 -0.38267159462 -0.881893396378 -0.000732444226742 -0.47138890624 -0.831446290016 -0.00088503677398 -0.555558919907 -0.772728681564 -0.0253608822823 -0.634174644947 -0.706900238991 0.0231940671802 -0.706900238991 -0.634357750416 -0.0012207403779 -0.773003339767 -0.555558919907 -0.00131229590625 -0.831446290016 -0.471358388662 -0.00140385143459 -0.881923913956 -0.38267159462 -0.00146488845348 -0.923856317997 -0.290261536837 -0.00152592547238 -0.956938385963 -0.195074319839 -0.00155644398183 -0.980773329735 -0.107760854065 -0.00286873988807 -0.994140446186 -0.105136267841 -0.023865474388 -0.994140446186 -0.191015347838 -0.0395825058222 -0.980773329735 -0.284371465445 -0.0581377595663 -0.956938385963 -0.375011444092 -0.0761131644249 -0.923856317997 -0.462050229311 -0.093325600028 -0.881923913956 -0.544602811337 -0.109683521092 -0.831446290016 -0.621936678886 -0.124973297119 -0.773003339767 -0.697836220264 -0.11514633894 -0.706900238991 -0.752952694893 -0.175634026527 -0.634174644947 -0.815301954746 -0.16306039691 -0.555558919907 -0.864803016186 -0.172765284777 -0.47138890624 -0.906002998352 -0.18082216382 -0.38267159462 -0.944212138653 -0.155796989799 -0.290139466524 -0.955137789249 -0.222785115242 -0.194982752204 -0.976012468338 -0.194280833006 -0.0979949310422 -0.980773329735 -0.195074319839 0.0 -0.976073503494 -0.193975642323 0.0979949310422 -0.967711389065 -0.15967284143 0.194982752204 -0.931943714619 -0.217383340001 0.290139466524 -0.906216621399 -0.179631948471 0.38267159462 -0.865108191967 -0.171300396323 0.47138890624 -0.820490121841 -0.135380104184 0.55534529686 -0.752952694893 -0.175634026527 0.634174644947 -0.693716228008 -0.13681447506 0.707113862038 -0.622425019741 -0.122531816363 0.773003339767 -0.545121610165 -0.107058934867 0.831446290016 -0.46259957552 -0.0905484184623 0.881923913956 -0.375591307878 -0.0731833875179 0.923856317997 -0.284981846809 -0.055116429925 0.956938385963 -0.191625714302 -0.0365001372993 0.980773329735 -0.106265448034 -0.0181890316308 0.994140446186 -0.100680559874 -0.0385448783636 0.994140446186 -0.18082216382 -0.0731833875179 0.980773329735 -0.268745988607 -0.109653003514 0.956938385963 -0.354106277227 -0.145054474473 0.923856317997 -0.436048477888 -0.179052099586 0.881923913956 -0.513779103756 -0.211340680718 0.831446290016 -0.587847530842 -0.252571195364 0.768517076969 -0.665150940418 -0.259712517262 0.700033545494 -0.704214632511 -0.319132059813 0.634174644947 -0.77831351757 -0.292855620384 0.55534529686 -0.815057814121 -0.336771756411 0.47138890624 -0.853755295277 -0.352977067232 0.38267159462 -0.8716391325 -0.395031601191 0.290139466524 -0.917966246605 -0.345377981663 0.194982752204 -0.919461667538 -0.380687892437 0.0979949310422 -0.923856317997 -0.38267159462 0.0 -0.919370114803 -0.38096255064 -0.0979949310422 -0.893337786198 -0.40485855937 -0.194982752204 -0.895657241344 -0.336985379457 -0.290139466524 -0.853297531605 -0.354106277227 -0.38267159462 -0.814477980137 -0.338175594807 -0.47138890624 -0.767815172672 -0.318979471922 -0.555558919907 -0.704214632511 -0.319132059813 -0.634174644947 -0.661976993084 -0.24906155467 -0.706900238991 -0.585589170456 -0.243903934956 -0.773003339767 -0.5127415061 -0.213812679052 -0.831446290016 -0.434949785471 -0.18167668581 -0.881923913956 -0.352946549654 -0.147801145911 -0.923856317997 -0.267586290836 -0.112491227686 -0.956938385963 -0.179601430893 -0.0761131644249 -0.980773329735 -0.0984527096152 -0.0439161360264 -0.994140446186 -0.0879848599434 -0.0622882768512 -0.994140446186 -0.161320835352 -0.109683521092 -0.980773329735 -0.240485861897 -0.16254158318 -0.956938385963 -0.317331463099 -0.213812679052 -0.923856317997 -0.391125231981 -0.263039022684 -0.881923913956 -0.461165189743 -0.309762865305 -0.831446290016 -0.52678000927 -0.353465378284 -0.773003339767 -0.597247242928 -0.387676626444 -0.702078282833 -0.6389965415 -0.44599750638 -0.626697599888 -0.690816998482 -0.462660610676 -0.555558919907 -0.732840955257 -0.490585029125 -0.47138890624 -0.767815172672 -0.513779103756 -0.38267159462 -0.812707901001 -0.50526446104 -0.290139466524 -0.797173976898 -0.571367561817 -0.194982752204 -0.827356815338 -0.552995383739 -0.0979949310422 -0.831446290016 -0.555558919907 0.0 -0.827539920807 -0.552751243114 0.0979949310422 -0.832941651344 -0.517838060856 0.194982752204 -0.77782523632 -0.557481586933 0.290139466524 -0.768486559391 -0.5127415061 0.38267159462 -0.73369550705 -0.48933377862 0.47138890624 -0.706228852272 -0.439069807529 0.55534529686 -0.628406643867 -0.450392156839 0.634174644947 -0.600665330887 -0.373424470425 0.706900238991 -0.515762805939 -0.369670718908 0.772820234299 -0.462660610676 -0.307535022497 0.831446290016 -0.392712175846 -0.260689109564 0.881923913956 -0.318979471922 -0.211340680718 0.923856317997 -0.242194890976 -0.159978032112 0.956938385963 -0.16306039691 -0.107058934867 0.980773329735 -0.0912198275328 -0.0574663542211 0.994140446186 -0.0782494619489 -0.0741599798203 0.994140446186 -0.139042332768 -0.13681447506 0.980773329735 -0.206335648894 -0.204138308764 0.956938385963 -0.271614730358 -0.269539475441 0.923856317997 -0.334299743176 -0.332316040993 0.881923913956 -0.393780320883 -0.391888171434 0.831446290016 -0.433729052544 -0.463179409504 0.772820234299 -0.516251087189 -0.483443707228 0.706900238991 -0.528458535671 -0.56434828043 0.634174644947 -0.606982648373 -0.56840723753 0.55534529686 -0.624134063721 -0.623065888882 0.47138890624 -0.653706490993 -0.652821421623 0.38267159462 -0.661336123943 -0.687612533569 0.299600213766 -0.702291965485 -0.682607471943 0.201940983534 -0.703787326813 -0.703573703766 0.0979949310422 -0.70708334446 -0.70708334446 0.0 -0.703573703766 -0.703787326813 -0.0979949310422 -0.670400083065 -0.715903222561 -0.194982752204 -0.698507666588 -0.654103219509 -0.290139466524 -0.652821421623 -0.653706490993 -0.38267159462 -0.623065888882 -0.624134063721 -0.47138890624 -0.587298214436 -0.588549435139 -0.555558919907 -0.53538620472 -0.551377892494 -0.639759540558 -0.50437939167 -0.485641032457 -0.713950037956 -0.447676002979 -0.449446082115 -0.773003339767 -0.391888171434 -0.393780320883 -0.831446290016 -0.332316040993 -0.334299743176 -0.881923913956 -0.269539475441 -0.271614730358 -0.923856317997 -0.204138308764 -0.206335648894 -0.956938385963 -0.13681447506 -0.139042332768 -0.980773329735 -0.0741599798203 -0.0782494619489 -0.994140446186 -0.0574663542211 -0.0912198275328 -0.994140446186 -0.107058934867 -0.16306039691 -0.980773329735 -0.159978032112 -0.242194890976 -0.956938385963 -0.211340680718 -0.318979471922 -0.923856317997 -0.260689109564 -0.392712175846 -0.881923913956 -0.307535022497 -0.462660610676 -0.831446290016 -0.351390123367 -0.528153300285 -0.773003339767 -0.412030398846 -0.574877142906 -0.706900238991 -0.408215582371 -0.65660572052 -0.634174644947 -0.461195707321 -0.69182407856 -0.555558919907 -0.48933377862 -0.73369550705 -0.47138890624 -0.5127415061 -0.768486559391 -0.38267159462 -0.557481586933 -0.77782523632 -0.290139466524 -0.517838060856 -0.832941651344 -0.194982752204 -0.568437755108 -0.815607190132 -0.107760854065 -0.543778777122 -0.8391674757 -0.00698873866349 -0.552995383739 -0.827356815338 0.0979949310422 -0.545152127743 -0.815301954746 0.195074319839 -0.548997461796 -0.787224948406 0.280800819397 -0.504104733467 -0.777397990227 0.376140624285 -0.490585029125 -0.732840955257 0.47138890624 -0.484450817108 -0.675893425941 0.55534529686 -0.408215582371 -0.65660572052 0.634174644947 -0.412030398846 -0.574877142906 0.706900238991 -0.335032194853 -0.538895845413 0.772820234299 -0.309762865305 -0.461165189743 0.831446290016 -0.263039022684 -0.391155749559 0.881923913956 -0.213812679052 -0.317331463099 0.923856317997 -0.16254158318 -0.240485861897 0.956938385963 -0.109683521092 -0.161320835352 0.980773329735 -0.0622882768512 -0.0879848599434 0.994140446186 -0.0439161360264 -0.0984527096152 0.994140446186 -0.0761131644249 -0.179601430893 0.980773329735 -0.112491227686 -0.267586290836 0.956938385963 -0.147801145911 -0.352946549654 0.923856317997 -0.18167668581 -0.434949785471 0.881923913956 -0.213812679052 -0.5127415061 0.831446290016 -0.223456531763 -0.593920707703 0.772820234299 -0.291940063238 -0.644215226173 0.706900238991 -0.272255629301 -0.72362434864 0.634174644947 -0.343272209167 -0.757438898087 0.55534529686 -0.338175594807 -0.814477980137 0.47138890624 -0.335551023483 -0.856715619564 0.391674548388 -0.378002256155 -0.876857817173 0.296945095062 -0.375591307878 -0.906002998352 0.195074319839 -0.38096255064 -0.919370114803 0.0979949310422 -0.352153092623 -0.935911118984 0.0 -0.41077914834 -0.906430244446 -0.0979644134641 -0.345377981663 -0.917966246605 -0.194982752204 -0.395031601191 -0.8716391325 -0.290139466524 -0.352977067232 -0.853755295277 -0.38267159462 -0.336771756411 -0.815057814121 -0.47138890624 -0.317361980677 -0.768486559391 -0.555558919907 -0.272255629301 -0.72362434864 -0.634174644947 -0.291940063238 -0.644215226173 -0.706900238991 -0.24161504209 -0.586565732956 -0.773003339767 -0.211340680718 -0.513779103756 -0.831446290016 -0.179052099586 -0.436048477888 -0.881923913956 -0.145054474473 -0.354106277227 -0.923856317997 -0.109653003514 -0.268745988607 -0.956938385963 -0.0731833875179 -0.18082216382 -0.980773329735 -0.0385448783636 -0.100680559874 -0.994140446186 -0.0181890316308 -0.106265448034 -0.994140446186 -0.0365001372993 -0.191625714302 -0.980773329735 -0.055116429925 -0.284981846809 -0.956938385963 -0.0731833875179 -0.375591307878 -0.923856317997 -0.0905484184623 -0.46259957552 -0.881923913956 -0.107058934867 -0.545121610165 -0.831446290016 -0.122531816363 -0.622425019741 -0.773003339767 -0.160649433732 -0.688772261143 -0.706900238991 -0.125858336687 -0.762840688229 -0.634174644947 -0.161320835352 -0.81563770771 -0.555558919907 -0.171300396323 -0.865108191967 -0.47138890624 -0.179631948471 -0.906216621399 -0.38267159462 -0.217383340001 -0.931943714619 -0.290139466524 -0.15967284143 -0.967711389065 -0.194982752204 -0.22605060041 -0.969145774841 -0.0979644134641 -0.162785723805 -0.986632883549 0.0 -0.194280833006 -0.976012468338 0.0979949310422 -0.191625714302 -0.961851835251 0.195074319839 -0.205938905478 -0.937376022339 0.280800819397 -0.168248549104 -0.911130070686 0.376140624285 -0.172765284777 -0.864803016186 0.47138890624 -0.188909575343 -0.809839189053 0.55534529686 -0.125858336687 -0.762840688229 0.634174644947 -0.160649433732 -0.688772261143 0.706900238991 -0.103305153549 -0.626117765903 0.772820234299 -0.109683521092 -0.544602811337 0.831446290016 -0.093325600028 -0.462050229311 0.881923913956 -0.0761131644249 -0.375011444092 0.923856317997 -0.0581377595663 -0.284371465445 0.956938385963 -0.0395825058222 -0.191015347838 0.980773329735 -0.023865474388 -0.105136267841 0.994140446186 -0.00286873988807 -0.107760854065 0.994140446186 -0.00155644398183 -0.195074319839 0.980773329735 -0.00152592547238 -0.290261536837 0.956938385963 -0.00146488845348 -0.38267159462 0.923856317997 -0.00140385143459 -0.471358388662 0.881923913956 -0.00131229590625 -0.555558919907 0.831446290016 0.0208136234432 -0.634235680103 0.772820234299 -0.0231940671802 -0.706900238991 0.706900238991 0.0253608822823 -0.772728681564 0.634174644947 -0.0272835474461 -0.831141114235 0.55534529686 -0.000732444226742 -0.881893396378 0.47138890624 0.0303048808128 -0.923429071903 0.382488489151 -0.0313730277121 -0.956450104713 0.290139466524 -0.000305185094476 -0.980773329735 0.195074319839 -0.000152592547238 -0.995178103447 0.0979949310422 0.0328073985875 -0.999450683594 0.0 -0.0326242856681 -0.994628727436 -0.0979644134641 0.0321665108204 -0.980254530907 -0.194982752204 -0.0313730277121 -0.956450104713 -0.290139466524 0.000610370188951 -0.923856317997 -0.38267159462 0.000732444226742 -0.881893396378 -0.47138890624 0.00088503677398 -0.831446290016 -0.555558919907 0.0253608822823 -0.772728681564 -0.634174644947 -0.0231940671802 -0.706900238991 -0.706900238991 0.0012207403779 -0.634357750416 -0.773003339767 0.00131229590625 -0.555558919907 -0.831446290016 0.00140385143459 -0.471358388662 -0.881923913956 0.00146488845348 -0.38267159462 -0.923856317997 0.00152592547238 -0.290261536837 -0.956938385963 0.00155644398183 -0.195074319839 -0.980773329735 0.00286873988807 -0.107760854065 -0.994140446186 0.023865474388 -0.105136267841 -0.994140446186 0.0395825058222 -0.191015347838 -0.980773329735 0.0581377595663 -0.284371465445 -0.956938385963 0.0761131644249 -0.375011444092 -0.923856317997 0.093325600028 -0.462050229311 -0.881923913956 0.109683521092 -0.544602811337 -0.831446290016 0.124973297119 -0.621936678886 -0.773003339767 0.129612103105 -0.700155615807 -0.702078282833 0.167516097426 -0.761040091515 -0.626697599888 0.16306039691 -0.815301954746 -0.555558919907 0.172765284777 -0.864803016186 -0.47138890624 0.18082216382 -0.906002998352 -0.38267159462 0.155796989799 -0.944212138653 -0.290139466524 0.222785115242 -0.955137789249 -0.194982752204 0.180578023195 -0.97930842638 -0.0910061970353 0.214331492782 -0.976683855057 0.00979644153267 0.193975642323 -0.976073503494 0.0979949310422 0.191015347838 -0.961973965168 0.195074319839 0.155796989799 -0.944212138653 0.290139466524 0.209875792265 -0.899777233601 0.382488489151 0.171300396323 -0.865108191967 0.47138890624 0.135380104184 -0.820490121841 0.55534529686 0.175634026527 -0.752952694893 0.634174644947 0.11514633894 -0.697836220264 0.706900238991 0.144138917327 -0.617969274521 0.772820234299 0.107058934867 -0.545121610165 0.831446290016 0.0905484184623 -0.46259957552 0.881923913956 0.0731833875179 -0.375591307878 0.923856317997 0.055116429925 -0.284981846809 0.956938385963 0.0365001372993 -0.191625714302 0.980773329735 0.0181890316308 -0.106265448034 0.994140446186 0.0385448783636 -0.100680559874 0.994140446186 0.0731833875179 -0.18082216382 0.980773329735 0.109653003514 -0.268745988607 0.956938385963 0.145054474473 -0.354106277227 0.923856317997 0.179052099586 -0.436048477888 0.881923913956 0.211340680718 -0.513779103756 0.831446290016 0.261940360069 -0.577990055084 0.772820234299 0.24906155467 -0.661976993084 0.706900238991 0.319132059813 -0.704214632511 0.634174644947 0.292855620384 -0.77831351757 0.55534529686 0.336771756411 -0.815057814121 0.47138890624 0.381389826536 -0.841547906399 0.382488489151 0.336985379457 -0.895657241344 0.290139466524 0.37504196167 -0.906216621399 0.195074319839 0.380687892437 -0.919461667538 0.0979949310422 0.38267159462 -0.923856317997 0.0 0.38096255064 -0.919370114803 -0.0979949310422 0.40485855937 -0.893337786198 -0.194982752204 0.336985379457 -0.895657241344 -0.290139466524 0.354106277227 -0.853297531605 -0.38267159462 0.338175594807 -0.814477980137 -0.47138890624 0.318979471922 -0.767815172672 -0.555558919907 0.296731472015 -0.713766872883 -0.634388267994 0.271614730358 -0.652821421623 -0.707113862038 0.243903934956 -0.585589170456 -0.773003339767 0.213812679052 -0.5127415061 -0.831446290016 0.18167668581 -0.434949785471 -0.881923913956 0.147801145911 -0.352946549654 -0.923856317997 0.112491227686 -0.267586290836 -0.956938385963 0.0761131644249 -0.179601430893 -0.980773329735 0.0439161360264 -0.0984527096152 -0.994140446186 0.0622882768512 -0.0879848599434 -0.994140446186 0.109683521092 -0.161320835352 -0.980773329735 0.16254158318 -0.240485861897 -0.956938385963 0.213812679052 -0.317331463099 -0.923856317997 0.263039022684 -0.391155749559 -0.881923913956 0.309762865305 -0.461165189743 -0.831446290016 0.353465378284 -0.52678000927 -0.773003339767 0.393780320883 -0.587298214436 -0.707113862038 0.430280476809 -0.642139971256 -0.634388267994 0.462660610676 -0.690816998482 -0.555558919907 0.490585029125 -0.732840955257 -0.47138890624 0.513779103756 -0.767815172672 -0.38267159462 0.50526446104 -0.812707901001 -0.290139466524 0.571367561817 -0.797173976898 -0.194982752204 0.535996556282 -0.837275326252 -0.107760854065 0.5671864748 -0.823541998863 -0.00698873866349 0.552751243114 -0.827539920807 0.0979949310422 0.544633328915 -0.81563770771 0.195074319839 0.519089341164 -0.801446557045 0.296945095062 0.525894939899 -0.754966914654 0.391674548388 0.48933377862 -0.73369550705 0.47138890624 0.439069807529 -0.706228852272 0.55534529686 0.450392156839 -0.628406643867 0.634174644947 0.373424470425 -0.600665330887 0.706900238991 0.369670718908 -0.515762805939 0.772820234299 0.307535022497 -0.462660610676 0.831446290016 0.260689109564 -0.392712175846 0.881923913956 0.211340680718 -0.318979471922 0.923856317997 0.159978032112 -0.242194890976 0.956938385963 0.107058934867 -0.16306039691 0.980773329735 0.0574663542211 -0.0912198275328 0.994140446186 0.0741599798203 -0.0782494619489 0.994140446186 0.13681447506 -0.139042332768 0.980773329735 0.204138308764 -0.206335648894 0.956938385963 0.269539475441 -0.271614730358 0.923856317997 0.332316040993 -0.334299743176 0.881923913956 0.391888171434 -0.393780320883 0.831446290016 0.463179409504 -0.433729052544 0.772820234299 0.483443707228 -0.516251087189 0.706900238991 0.56434828043 -0.528458535671 0.634174644947 0.56840723753 -0.606982648373 0.55534529686 0.623065888882 -0.624134063721 0.47138890624 0.652821421623 -0.653706490993 0.38267159462 0.676320672035 -0.67696160078 0.290261536837 0.693288981915 -0.693716228008 0.195074319839 0.703573703766 -0.703787326813 0.0979949310422 0.729911208153 -0.683523058891 0.0 0.680227041245 -0.726401567459 -0.0979644134641 0.715903222561 -0.670400083065 -0.194982752204 0.654103219509 -0.698507666588 -0.290139466524 0.653706490993 -0.652821421623 -0.38267159462 0.624134063721 -0.623065888882 -0.47138890624 0.588549435139 -0.587298214436 -0.555558919907 0.547288417816 -0.54585403204 -0.634388267994 0.500778198242 -0.499160736799 -0.707113862038 0.449446082115 -0.447676002979 -0.773003339767 0.393780320883 -0.391888171434 -0.831446290016 0.334299743176 -0.332316040993 -0.881923913956 0.271614730358 -0.269539475441 -0.923856317997 0.206335648894 -0.204138308764 -0.956938385963 0.139042332768 -0.13681447506 -0.980773329735 0.0782494619489 -0.0741599798203 -0.994140446186 0.0912198275328 -0.0574663542211 -0.994140446186 0.16306039691 -0.107058934867 -0.980773329735 0.242194890976 -0.159978032112 -0.956938385963 0.318979471922 -0.211340680718 -0.923856317997 0.392712175846 -0.260689109564 -0.881923913956 0.462660610676 -0.307535022497 -0.831446290016 0.528153300285 -0.351390123367 -0.773003339767 0.588549435139 -0.391888171434 -0.707113862038 0.643269121647 -0.428601950407 -0.634388267994 0.69182407856 -0.461165189743 -0.555558919907 0.73369550705 -0.48933377862 -0.47138890624 0.768486559391 -0.5127415061 -0.38267159462 0.77782523632 -0.557481586933 -0.290139466524 0.832941651344 -0.517838060856 -0.194982752204 0.808862566948 -0.579729616642 -0.0979644134641 0.849238574505 -0.527970194817 0.0 0.827356815338 -0.552995383739 0.0979949310422 0.815301954746 -0.545152127743 0.195074319839 0.787224948406 -0.548997461796 0.280800819397 0.777397990227 -0.504104733467 0.376140624285 0.732840955257 -0.490585029125 0.47138890624 0.675893425941 -0.484450817108 0.55534529686 0.65660572052 -0.408215582371 0.634174644947 0.577959537506 -0.398724317551 0.711996853352 0.527603983879 -0.338389247656 0.779137551785 0.461165189743 -0.309762865305 0.831446290016 0.391155749559 -0.263039022684 0.881923913956 0.317331463099 -0.213812679052 0.923856317997 0.240485861897 -0.16254158318 0.956938385963 0.161320835352 -0.109683521092 0.980773329735 0.0879848599434 -0.0622882768512 0.994140446186 0.0984527096152 -0.0439161360264 0.994140446186 0.179601430893 -0.0761131644249 0.980773329735 0.267586290836 -0.112491227686 0.956938385963 0.352946549654 -0.147801145911 0.923856317997 0.434949785471 -0.18167668581 0.881923913956 0.5127415061 -0.213812679052 0.831446290016 0.585589170456 -0.243903934956 0.773003339767 0.652821421623 -0.271614730358 0.707113862038 0.72362434864 -0.272255629301 0.634174644947 0.757438898087 -0.343272209167 0.55534529686 0.814477980137 -0.338175594807 0.47138890624 0.86474198103 -0.325357824564 0.382488489151 0.8716391325 -0.395031601191 0.290139466524 0.906002998352 -0.375591307878 0.195074319839 0.919370114803 -0.38096255064 0.0979949310422 0.935911118984 -0.352153092623 0.0 0.906430244446 -0.41077914834 -0.0979644134641 0.917966246605 -0.345377981663 -0.194982752204 0.8716391325 -0.395031601191 -0.290139466524 0.853755295277 -0.352977067232 -0.38267159462 0.815057814121 -0.336771756411 -0.47138890624 0.768486559391 -0.317361980677 -0.555558919907 0.714529871941 -0.294869840145 -0.634388267994 0.653706490993 -0.269539475441 -0.707113862038 0.586565732956 -0.24161504209 -0.773003339767 0.513779103756 -0.211340680718 -0.831446290016 0.436048477888 -0.179052099586 -0.881923913956 0.354106277227 -0.145054474473 -0.923856317997 0.268745988607 -0.109653003514 -0.956938385963 0.18082216382 -0.0731833875179 -0.980773329735 0.100680559874 -0.0385448783636 -0.994140446186 0.106265448034 -0.0181890316308 -0.994140446186 0.191625714302 -0.0365001372993 -0.980773329735 0.284981846809 -0.055116429925 -0.956938385963 0.375591307878 -0.0731833875179 -0.923856317997 0.46259957552 -0.0905484184623 -0.881923913956 0.545121610165 -0.107058934867 -0.831446290016 0.622425019741 -0.122531816363 -0.773003339767 0.693716228008 -0.13681447506 -0.707113862038 0.758323907852 -0.149784848094 -0.634388267994 0.81563770771 -0.161320835352 -0.555558919907 0.865108191967 -0.171300396323 -0.47138890624 0.906216621399 -0.179631948471 -0.38267159462 0.931943714619 -0.217383340001 -0.290139466524 0.967711389065 -0.15967284143 -0.194982752204 0.969145774841 -0.22605060041 -0.0979644134641 0.986632883549 -0.162785723805 0.0 0.976012468338 -0.194280833006 0.0979949310422 0.961851835251 -0.191625714302 0.195074319839 0.931943714619 -0.217383340001 0.290139466524 0.911618411541 -0.150395214558 0.382488489151 0.864803016186 -0.172765284777 0.47138890624 0.809839189053 -0.188909575343 0.55534529686 0.762840688229 -0.125858336687 0.634174644947 0.697347939014 -0.153599664569 0.700033545494 0.629108548164 -0.116580709815 0.768517076969 0.544602811337 -0.109683521092 0.831446290016 0.462050229311 -0.093325600028 0.881923913956 0.375011444092 -0.0761131644249 0.923856317997 0.284371465445 -0.0581377595663 0.956938385963 0.191015347838 -0.0395825058222 0.980773329735 0.105136267841 -0.023865474388 0.994140446186 0.107760854065 -0.00286873988807 0.994140446186 0.195074319839 -0.00155644398183 0.980773329735 0.290261536837 -0.00152592547238 0.956938385963 0.38267159462 -0.00146488845348 0.923856317997 0.471358388662 -0.00140385143459 0.881923913956 0.555558919907 -0.00131229590625 0.831446290016 0.626697599888 0.0117191076279 0.779137551785 0.702078282833 -0.0104068117216 0.711996853352 0.766624987125 0.0145878475159 0.641895830631 0.827478885651 -0.0120548112318 0.561357438564 0.881893396378 -0.000732444226742 0.47138890624 0.91991943121 0.0178228095174 0.391674548388 0.954771578312 -0.0136417737231 0.296945095062 0.980773329735 -0.000305185094476 0.195074319839 0.995178103447 -0.000152592547238 0.0979949310422 0.999450683594 0.0328073985875 0.0 0.994628727436 -0.0326548069715 -0.0979644134641 0.980254530907 0.0321665108204 -0.194982752204 0.954771578312 -0.0136417737231 -0.296945095062 0.917477965355 0.0 -0.397747725248 0.874050140381 0.0 -0.48576310277 0.822229683399 0.0 -0.569109141827 0.762504935265 0.0 -0.646961867809 0.695425271988 0.0 -0.718588829041 0.621631503105 0.0 -0.783288061619 0.541856110096 0.0 -0.840449213982 0.456862092018 0.0 -0.889522969723 0.367473363876 0.0 -0.930021047592 0.274544507265 0.0 -0.96154665947 0.178991064429 0.0 -0.983825206757 0.0979949310422 0.0 -0.995178103447";

    var _box = {};
    _box.id = "XML3D.tools.creation._box";
    _box.index = "4 0 3 4 3 7 2 6 7 2 7 3 1 5 2 5 6 2 0 4 1 4 5 1 4 7 5 7 6 5 0 1 2 0 2 3";
    _box.position = "1.0 1 -1.0 1.0 -1.0 -1.0 -1 -1 -1.0 -1 1 -1.0 1 1 1.0 1 -1 1.0 -1 -1 1.0 -1 1.0 1.0";
    _box.normal = "0.408246099949 0.408246099949 -0.816492199898 0.816492199898 -0.408246099949 -0.408246099949 -0.577349185944 -0.577349185944 -0.577349185944 -0.408246099949 0.816492199898 -0.408246099949 0.666646301746 0.666646301746 0.333323150873 0.333323150873 -0.666646301746 0.666646301746 -0.577349185944 -0.577349185944 0.577349185944 -0.666646301746 0.333323150873 0.666646301746";
    _box.texcoord = "1.0 0.0 1.0 1.0 0.0 1.0 0.0 0.0 0.0 0.0 0.0 1.0 1.0 1.0 1.0 0.0 0.0 0.0 1.0 0.0 1.0 1.0 0.0 1.0 1.0 0.0 0.0 0.0 0.0 1.0 1.0 1.0 0.0 1.0 0.0 0.0 1.0 0.0 1.0 1.0 0.0 0.0 0.0 1.0 1.0 1.0 1.0 0.0";

    var _arrow = {};
    _arrow.id = "XML3D.tools.creation._arrow";
    _arrow.index = "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178 179 180 181 182 183 184 185 186 187 188 189 190 191 192 193 194 195 196 197 198 199 200 201 202 203 204 205 206 207 208 209 210 211 212 213 214 215 216 217 218 219 220 221 222 223 224 225 226 227 228 229 230 231 232 233 234 235 236 237 238 239 240 241 242 243 244 245 246 247 248 249 250 251 252 253 254 255 256 257 258 259 260 261 262 263 264 265 266 267 268 269 270 271 272 273 274 275 276 277 278 279 280 281 282 283 284 285 286 287 288 289 290 291 292 293 294 295 296 297 298 299 300 301 302 303 304 305 306 307 308 309 310 311 312 313 314 315 316 317 318 319 320 321 322 323 324 325 326 327 328 329 330 331 332 333 334 335";
    _arrow.position = "0.019594 0.009438 0.0 0.013559 0.017006 0.0 0.019594 0.009438 0.672052 0.019594 0.009438 0.672052 0.013559 0.017006 0.0 0.013559 0.017006 0.672057 0.013559 0.017006 0.0 0.004839 0.021202 0.0 0.013559 0.017006 0.672057 0.013559 0.017006 0.672057 0.004839 0.021202 0.0 0.004839 0.021202 0.672059 0.004839 0.021202 0.0 -0.004839 0.021202 0.0 0.004839 0.021202 0.672059 0.004839 0.021202 0.672059 -0.004839 0.021202 0.0 -0.004839 0.021202 0.672059 -0.004839 0.021202 0.0 -0.013559 0.017006 0.0 -0.004839 0.021202 0.672059 -0.004839 0.021202 0.672059 -0.013559 0.017006 0.0 -0.013559 0.017006 0.672055 -0.013559 0.017006 0.0 -0.019594 0.009438 0.0 -0.013559 0.017006 0.672055 -0.013559 0.017006 0.672055 -0.019594 0.009438 0.0 -0.019594 0.009438 0.672064 -0.019594 0.009438 0.0 -0.021748 0.0 -0.0 -0.019594 0.009438 0.672064 -0.019594 0.009438 0.672064 -0.021748 0.0 -0.0 -0.021748 0.0 0.672057 -0.021748 0.0 -0.0 -0.019594 -0.009438 0.0 -0.021748 0.0 0.672057 -0.021748 0.0 0.672057 -0.019594 -0.009438 0.0 -0.019594 -0.009438 0.672065 -0.019594 -0.009438 0.0 -0.013559 -0.017006 0.0 -0.019594 -0.009438 0.672065 -0.019594 -0.009438 0.672065 -0.013559 -0.017006 0.0 -0.013559 -0.017006 0.67206 -0.013559 -0.017006 0.0 -0.004839 -0.021202 0.0 -0.013559 -0.017006 0.67206 -0.013559 -0.017006 0.67206 -0.004839 -0.021202 0.0 -0.004839 -0.021202 0.672057 -0.004839 -0.021202 0.0 0.004839 -0.021202 0.0 -0.004839 -0.021202 0.672057 -0.004839 -0.021202 0.672057 0.004839 -0.021202 0.0 0.004839 -0.021202 0.672058 0.004839 -0.021202 0.0 0.013559 -0.017006 0.0 0.004839 -0.021202 0.672058 0.004839 -0.021202 0.672058 0.013559 -0.017006 0.0 0.013559 -0.017006 0.672061 0.013559 -0.017006 0.0 0.019594 -0.009438 0.0 0.013559 -0.017006 0.672061 0.013559 -0.017006 0.672061 0.019594 -0.009438 0.0 0.019594 -0.009438 0.672051 0.019594 -0.009438 0.0 0.021748 0.0 -0.0 0.019594 -0.009438 0.672051 0.019594 -0.009438 0.672051 0.021748 0.0 -0.0 0.021748 0.0 0.672058 0.021748 0.0 -0.0 0.019594 0.009438 0.0 0.021748 0.0 0.672058 0.021748 0.0 0.672058 0.019594 0.009438 0.0 0.019594 0.009438 0.672052 0.013559 0.017006 0.0 0.019594 0.009438 0.0 0.0 0.0 -0.0 0.004839 0.021202 0.0 0.013559 0.017006 0.0 0.0 0.0 -0.0 -0.004839 0.021202 0.0 0.004839 0.021202 0.0 0.0 0.0 -0.0 -0.013559 0.017006 0.0 -0.004839 0.021202 0.0 0.0 0.0 -0.0 -0.019594 0.009438 0.0 -0.013559 0.017006 0.0 0.0 0.0 -0.0 -0.021748 0.0 -0.0 -0.019594 0.009438 0.0 0.0 0.0 -0.0 -0.019594 -0.009438 0.0 -0.021748 0.0 -0.0 0.0 0.0 -0.0 -0.013559 -0.017006 0.0 -0.019594 -0.009438 0.0 0.0 0.0 -0.0 -0.004839 -0.021202 0.0 -0.013559 -0.017006 0.0 0.0 0.0 -0.0 0.004839 -0.021202 0.0 -0.004839 -0.021202 0.0 0.0 0.0 -0.0 0.013559 -0.017006 0.0 0.004839 -0.021202 0.0 0.0 0.0 -0.0 0.019594 -0.009438 0.0 0.013559 -0.017006 0.0 0.0 0.0 -0.0 0.021748 0.0 -0.0 0.019594 -0.009438 0.0 0.0 0.0 -0.0 0.019594 0.009438 0.0 0.021748 0.0 -0.0 0.0 0.0 -0.0 0.002809 0.001358 1.001608 0.001944 0.002441 1.001617 -0.0 0.0 1.001617 0.001944 0.002441 1.001617 6.94E-4 0.003036 1.001608 -0.0 0.0 1.001617 6.94E-4 0.003036 1.001608 -6.94E-4 0.003036 1.001608 -0.0 0.0 1.001617 -6.94E-4 0.003036 1.001608 -0.001944 0.002441 1.001617 -0.0 0.0 1.001617 -0.001944 0.002441 1.001617 -0.002809 0.001358 1.001608 -0.0 0.0 1.001617 -0.002809 0.001358 1.001608 -0.003118 0.0 1.001617 -0.0 0.0 1.001617 -0.003118 0.0 1.001617 -0.002809 -0.001358 1.001627 -0.0 0.0 1.001617 -0.002809 -0.001358 1.001627 -0.001944 -0.002441 1.001617 -0.0 0.0 1.001617 -0.001944 -0.002441 1.001617 -6.94E-4 -0.003036 1.001627 -0.0 0.0 1.001617 -6.94E-4 -0.003036 1.001627 6.94E-4 -0.003036 1.001627 -0.0 0.0 1.001617 6.94E-4 -0.003036 1.001627 0.001944 -0.002441 1.001617 -0.0 0.0 1.001617 0.001944 -0.002441 1.001617 0.002809 -0.001358 1.001627 -0.0 0.0 1.001617 0.002809 -0.001358 1.001627 0.003118 0.0 1.001617 -0.0 0.0 1.001617 0.003118 0.0 1.001617 0.002809 0.001358 1.001608 -0.0 0.0 1.001617 0.019594 0.009438 0.672052 0.013559 0.017006 0.672057 0.065487 0.031532 0.67206 0.065487 0.031532 0.67206 0.013559 0.017006 0.672057 0.045318 0.056831 0.672066 0.013559 0.017006 0.672057 0.004839 0.021202 0.672059 0.045318 0.056831 0.672066 0.045318 0.056831 0.672066 0.004839 0.021202 0.672059 0.016174 0.070862 0.672054 0.004839 0.021202 0.672059 -0.004839 0.021202 0.672059 0.016174 0.070862 0.672054 0.016174 0.070862 0.672054 -0.004839 0.021202 0.672059 -0.016174 0.070862 0.672054 -0.004839 0.021202 0.672059 -0.013559 0.017006 0.672055 -0.016174 0.070862 0.672054 -0.016174 0.070862 0.672054 -0.013559 0.017006 0.672055 -0.045318 0.056831 0.672064 -0.013559 0.017006 0.672055 -0.019594 0.009438 0.672064 -0.045318 0.056831 0.672064 -0.045318 0.056831 0.672064 -0.019594 0.009438 0.672064 -0.065487 0.031532 0.672056 -0.019594 0.009438 0.672064 -0.021748 0.0 0.672057 -0.065487 0.031532 0.672056 -0.065487 0.031532 0.672056 -0.021748 0.0 0.672057 -0.072683 0.0 0.672053 -0.021748 0.0 0.672057 -0.019594 -0.009438 0.672065 -0.072683 0.0 0.672053 -0.072683 0.0 0.672053 -0.019594 -0.009438 0.672065 -0.065487 -0.031532 0.672057 -0.019594 -0.009438 0.672065 -0.013559 -0.017006 0.67206 -0.065487 -0.031532 0.672057 -0.065487 -0.031532 0.672057 -0.013559 -0.017006 0.67206 -0.045318 -0.056831 0.672066 -0.013559 -0.017006 0.67206 -0.004839 -0.021202 0.672057 -0.045318 -0.056831 0.672066 -0.045318 -0.056831 0.672066 -0.004839 -0.021202 0.672057 -0.016174 -0.070862 0.672058 -0.004839 -0.021202 0.672057 0.004839 -0.021202 0.672058 -0.016174 -0.070862 0.672058 -0.016174 -0.070862 0.672058 0.004839 -0.021202 0.672058 0.016174 -0.070862 0.672062 0.004839 -0.021202 0.672058 0.013559 -0.017006 0.672061 0.016174 -0.070862 0.672062 0.016174 -0.070862 0.672062 0.013559 -0.017006 0.672061 0.045318 -0.056831 0.672052 0.013559 -0.017006 0.672061 0.019594 -0.009438 0.672051 0.045318 -0.056831 0.672052 0.045318 -0.056831 0.672052 0.019594 -0.009438 0.672051 0.065487 -0.031532 0.672059 0.019594 -0.009438 0.672051 0.021748 0.0 0.672058 0.065487 -0.031532 0.672059 0.065487 -0.031532 0.672059 0.021748 0.0 0.672058 0.072683 0.0 0.672058 0.021748 0.0 0.672058 0.019594 0.009438 0.672052 0.072683 0.0 0.672058 0.072683 0.0 0.672058 0.019594 0.009438 0.672052 0.065487 0.031532 0.67206 0.001944 0.002441 1.001617 0.002809 0.001358 1.001608 0.045318 0.056831 0.672066 0.065487 0.031532 0.67206 0.045318 0.056831 0.672066 0.002809 0.001358 1.001608 6.94E-4 0.003036 1.001608 0.001944 0.002441 1.001617 0.016174 0.070862 0.672054 0.045318 0.056831 0.672066 0.016174 0.070862 0.672054 0.001944 0.002441 1.001617 -6.94E-4 0.003036 1.001608 6.94E-4 0.003036 1.001608 -0.016174 0.070862 0.672054 0.016174 0.070862 0.672054 -0.016174 0.070862 0.672054 6.94E-4 0.003036 1.001608 -0.001944 0.002441 1.001617 -6.94E-4 0.003036 1.001608 -0.045318 0.056831 0.672064 -0.016174 0.070862 0.672054 -0.045318 0.056831 0.672064 -6.94E-4 0.003036 1.001608 -0.002809 0.001358 1.001608 -0.001944 0.002441 1.001617 -0.065487 0.031532 0.672056 -0.045318 0.056831 0.672064 -0.065487 0.031532 0.672056 -0.001944 0.002441 1.001617 -0.003118 0.0 1.001617 -0.002809 0.001358 1.001608 -0.072683 0.0 0.672053 -0.065487 0.031532 0.672056 -0.072683 0.0 0.672053 -0.002809 0.001358 1.001608 -0.002809 -0.001358 1.001627 -0.003118 0.0 1.001617 -0.065487 -0.031532 0.672057 -0.072683 0.0 0.672053 -0.065487 -0.031532 0.672057 -0.003118 0.0 1.001617 -0.001944 -0.002441 1.001617 -0.002809 -0.001358 1.001627 -0.045318 -0.056831 0.672066 -0.065487 -0.031532 0.672057 -0.045318 -0.056831 0.672066 -0.002809 -0.001358 1.001627 -6.94E-4 -0.003036 1.001627 -0.001944 -0.002441 1.001617 -0.016174 -0.070862 0.672058 -0.045318 -0.056831 0.672066 -0.016174 -0.070862 0.672058 -0.001944 -0.002441 1.001617 6.94E-4 -0.003036 1.001627 -6.94E-4 -0.003036 1.001627 0.016174 -0.070862 0.672062 -0.016174 -0.070862 0.672058 0.016174 -0.070862 0.672062 -6.94E-4 -0.003036 1.001627 0.001944 -0.002441 1.001617 6.94E-4 -0.003036 1.001627 0.045318 -0.056831 0.672052 0.016174 -0.070862 0.672062 0.045318 -0.056831 0.672052 6.94E-4 -0.003036 1.001627 0.002809 -0.001358 1.001627 0.001944 -0.002441 1.001617 0.065487 -0.031532 0.672059 0.045318 -0.056831 0.672052 0.065487 -0.031532 0.672059 0.001944 -0.002441 1.001617 0.003118 0.0 1.001617 0.002809 -0.001358 1.001627 0.072683 0.0 0.672058 0.065487 -0.031532 0.672059 0.072683 0.0 0.672058 0.002809 -0.001358 1.001627 0.002809 0.001358 1.001608 0.003118 0.0 1.001617 0.065487 0.031532 0.67206 0.072683 0.0 0.672058 0.065487 0.031532 0.67206 0.003118 0.0 1.001617";
    _arrow.normal = "0.931288 0.0 -0.364284 0.681004 0.0 -0.732279 0.865457 0.0 -0.500983 0.865457 0.0 -0.500983 0.681004 0.0 -0.732279 0.562382 0.0 -0.826878 0.681004 0.0 -0.732279 0.29584 0.0 -0.955238 0.562382 0.0 -0.826878 0.562382 0.0 -0.826878 0.29584 0.0 -0.955238 0.14792 0.0 -0.988999 0.29584 0.0 -0.955238 -0.14792 0.0 -0.988999 0.14792 0.0 -0.988999 0.14792 0.0 -0.988999 -0.14792 0.0 -0.988999 -0.295839 0.0 -0.955238 -0.14792 0.0 -0.988999 -0.562382 0.0 -0.826878 -0.295839 0.0 -0.955238 -0.295839 0.0 -0.955238 -0.562382 0.0 -0.826878 -0.681004 0.0 -0.73228 -0.562382 0.0 -0.826878 -0.865457 0.0 -0.500983 -0.681004 0.0 -0.73228 -0.681004 0.0 -0.73228 -0.865457 0.0 -0.500983 -0.931288 0.0 -0.364284 -0.865457 0.0 -0.500983 -0.997118 0.0 -0.075862 -0.931288 0.0 -0.364284 -0.931288 0.0 -0.364284 -0.997118 0.0 -0.075862 -0.997118 0.0 0.075862 -0.997118 0.0 -0.075862 -0.931288 0.0 0.364284 -0.997118 0.0 0.075862 -0.997118 0.0 0.075862 -0.931288 0.0 0.364284 -0.865457 0.0 0.500982 -0.931288 0.0 0.364284 -0.681004 0.0 0.732279 -0.865457 0.0 0.500982 -0.865457 0.0 0.500982 -0.681004 0.0 0.732279 -0.562382 0.0 0.826878 -0.681004 0.0 0.732279 -0.29584 0.0 0.955238 -0.562382 0.0 0.826878 -0.562382 0.0 0.826878 -0.29584 0.0 0.955238 -0.14792 0.0 0.988999 -0.29584 0.0 0.955238 0.14792 0.0 0.988999 -0.14792 0.0 0.988999 -0.14792 0.0 0.988999 0.14792 0.0 0.988999 0.295839 0.0 0.955238 0.14792 0.0 0.988999 0.562382 0.0 0.826878 0.295839 0.0 0.955238 0.295839 0.0 0.955238 0.562382 0.0 0.826878 0.681004 0.0 0.732279 0.562382 0.0 0.826878 0.865457 0.0 0.500983 0.681004 0.0 0.732279 0.681004 0.0 0.732279 0.865457 0.0 0.500983 0.931288 0.0 0.364284 0.865457 0.0 0.500983 0.997118 0.0 0.075862 0.931288 0.0 0.364284 0.931288 0.0 0.364284 0.997118 0.0 0.075862 0.997118 0.0 -0.075862 0.997118 0.0 0.075862 0.931288 0.0 -0.364284 0.997118 0.0 -0.075862 0.997118 0.0 -0.075862 0.931288 0.0 -0.364284 0.865457 0.0 -0.500983 0.0 -1.0 2.0E-6 0.0 -1.0 3.0E-6 0.0 -1.0 0.0 0.0 -1.0 -1.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 -1.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 3.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 3.0E-6 0.0 -1.0 3.0E-6 0.0 -1.0 0.0 0.0 -1.0 -3.0E-6 0.0 -1.0 3.0E-6 0.0 -1.0 0.0 0.0 -1.0 -3.0E-6 0.0 -1.0 -3.0E-6 0.0 -1.0 0.0 0.0 -1.0 1.0E-6 0.0 -1.0 -3.0E-6 0.0 -1.0 0.0 0.0 -1.0 1.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 0.0 0.0 -1.0 -3.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 0.0 0.0 -1.0 -3.0E-6 0.0 -1.0 -3.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 -3.0E-6 0.0 -1.0 0.0 0.0 -1.0 3.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 1.0 3.2E-5 0.0 1.0 0.0 0.0 1.0 3.0E-6 0.0 1.0 0.0 0.0 1.0 -8.0E-6 0.0 1.0 3.0E-6 0.0 1.0 -8.0E-6 0.0 1.0 0.0 0.0 1.0 3.0E-6 0.0 1.0 0.0 0.0 1.0 8.0E-6 0.0 1.0 3.0E-6 0.0 1.0 8.0E-6 0.0 1.0 -3.2E-5 0.0 1.0 3.0E-6 0.0 1.0 -3.2E-5 0.0 1.0 -0.0 0.0 1.0 3.0E-6 0.0 1.0 -0.0 0.0 1.0 3.2E-5 0.0 1.0 3.0E-6 0.0 1.0 3.2E-5 0.0 1.0 0.0 0.0 1.0 3.0E-6 0.0 1.0 0.0 0.0 1.0 8.0E-6 0.0 1.0 3.0E-6 0.0 1.0 8.0E-6 0.0 1.0 -8.0E-6 0.0 1.0 3.0E-6 0.0 1.0 -8.0E-6 0.0 1.0 1.6E-5 0.0 1.0 3.0E-6 0.0 1.0 1.6E-5 0.0 1.0 0.0 0.0 1.0 3.0E-6 0.0 1.0 0.0 0.0 1.0 0.0 0.0 1.0 3.0E-6 0.0 1.0 0.0 0.0 1.0 3.2E-5 0.0 1.0 3.0E-6 0.0 -1.0 5.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 -1.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 2.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 -1.0E-6 0.0 -1.0 -1.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 1.0E-6 0.0 -1.0 -5.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 5.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 2.0E-6 0.0 -1.0 0.0 0.0 -1.0 -5.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 -5.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 1.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 1.0E-6 0.0 -1.0 0.0 0.0 -1.0 -5.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 0.0 0.0 -1.0 0.0 0.0 -1.0 -0.0 0.0 -1.0 -0.0 0.0 -1.0 -0.0 0.0 -1.0 -0.0 0.0 -1.0 -0.0 0.0 -1.0 -5.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 -2.0E-6 0.0 -1.0 1.0E-6 0.765774 0.201574 -0.610703 0.765778 0.201574 -0.610698 0.765778 0.201574 -0.610698 0.765782 0.201573 -0.610693 0.765778 0.201574 -0.610698 0.765778 0.201574 -0.610698 0.425011 0.201571 -0.882459 0.424995 0.201572 -0.882467 0.424995 0.201572 -0.882467 0.424979 0.201573 -0.882474 0.424995 0.201572 -0.882467 0.424995 0.201572 -0.882467 0.0 0.201573 -0.979473 0.0 0.201573 -0.979473 0.0 0.201573 -0.979473 0.0 0.201573 -0.979473 0.0 0.201573 -0.979473 0.0 0.201573 -0.979473 -0.425003 0.201574 -0.882463 -0.424991 0.201574 -0.882468 -0.424991 0.201574 -0.882468 -0.424979 0.201573 -0.882474 -0.424991 0.201574 -0.882468 -0.424991 0.201574 -0.882468 -0.765773 0.201572 -0.610705 -0.765777 0.201573 -0.610699 -0.765777 0.201573 -0.610699 -0.765782 0.201573 -0.610694 -0.765777 0.201573 -0.610699 -0.765777 0.201573 -0.610699 -0.954915 0.201573 -0.217959 -0.954916 0.201573 -0.217955 -0.954916 0.201573 -0.217955 -0.954916 0.201573 -0.217952 -0.954916 0.201573 -0.217955 -0.954916 0.201573 -0.217955 -0.954915 0.201573 0.217959 -0.954916 0.201573 0.217955 -0.954916 0.201573 0.217955 -0.954916 0.201573 0.217951 -0.954916 0.201573 0.217955 -0.954916 0.201573 0.217955 -0.765774 0.201573 0.610704 -0.765778 0.201573 0.610698 -0.765778 0.201573 0.610698 -0.765782 0.201573 0.610693 -0.765778 0.201573 0.610698 -0.765778 0.201573 0.610698 -0.425008 0.201572 0.882461 -0.424993 0.201573 0.882468 -0.424993 0.201573 0.882468 -0.424979 0.201573 0.882475 -0.424993 0.201573 0.882468 -0.424993 0.201573 0.882468 0.0 0.201574 0.979473 -0.0 0.201573 0.979473 -0.0 0.201573 0.979473 -0.0 0.201573 0.979474 -0.0 0.201573 0.979473 -0.0 0.201573 0.979473 0.425003 0.201574 0.882463 0.424991 0.201574 0.882468 0.424991 0.201574 0.882468 0.424979 0.201573 0.882474 0.424991 0.201574 0.882468 0.424991 0.201574 0.882468 0.765773 0.201572 0.610705 0.765777 0.201573 0.610699 0.765777 0.201573 0.610699 0.765782 0.201573 0.610694 0.765777 0.201573 0.610699 0.765777 0.201573 0.610699 0.954915 0.201573 0.217959 0.954916 0.201573 0.217955 0.954916 0.201573 0.217955 0.954916 0.201573 0.217952 0.954916 0.201573 0.217955 0.954916 0.201573 0.217955 0.954915 0.201574 -0.217959 0.954916 0.201574 -0.217955 0.954916 0.201574 -0.217955 0.954916 0.201573 -0.217952 0.954916 0.201574 -0.217955 0.954916 0.201574 -0.217955";

    var _cylinder = {};
    _cylinder.id = "XML3D.tools.creation._cylinder";
    _cylinder.index = "0 1 2 0 2 3 4 5 6 4 6 7 8 9 10 8 10 11 12 13 14 12 14 15 16 17 18 16 18 19 20 21 22 20 22 23 24 25 26 24 26 27 28 29 30 28 30 31 32 33 34 32 34 35 36 37 38 36 38 39 40 41 42 40 42 43 44 45 46 44 46 47 48 49 50 48 50 51 52 53 54 52 54 55 56 57 58 56 58 59 60 61 62 60 62 63 64 65 66 64 66 67 68 69 70 68 70 71 72 73 74 72 74 75 76 77 78 76 78 79 80 81 82 80 82 83 84 85 86 84 86 87 88 89 90 88 90 91 92 93 94 92 94 95 96 97 98 96 98 99 100 101 102 100 102 103 104 105 106 104 106 107 108 109 110 108 110 111 112 113 114 112 114 115 116 117 118 116 118 119 120 121 122 120 122 123 124 125 126 124 126 127";
    _cylinder.position = "0.0 1.0 -1.0 0.0 1.0 1.0 0.1950903 0.9807853 1.0 0.1950903 0.9807853 -1.0 0.1950903 0.9807853 -1.0 0.1950903 0.9807853 1.0 0.3826835 0.9238795 1.0 0.3826835 0.9238795 -1.0 0.3826835 0.9238795 -1.0 0.3826835 0.9238795 1.0 0.5555703 0.8314696 1.0 0.5555703 0.8314696 -1.0 0.5555703 0.8314696 -1.0 0.5555703 0.8314696 1.0 0.7071068 0.7071068 1.0 0.7071068 0.7071068 -1.0 0.7071068 0.7071068 -1.0 0.7071068 0.7071068 1.0 0.8314697 0.5555702 1.0 0.8314697 0.5555702 -1.0 0.8314697 0.5555702 -1.0 0.8314697 0.5555702 1.0 0.9238795 0.3826834 1.0 0.9238795 0.3826834 -1.0 0.9238795 0.3826834 -1.0 0.9238795 0.3826834 1.0 0.9807853 0.1950903 1.0 0.9807853 0.1950903 -1.0 0.9807853 0.1950903 -1.0 0.9807853 0.1950903 1.0 1.0 0.0 1.0 1.0 0.0 -1.0 1.0 0.0 -1.0 1.0 0.0 1.0 0.9807853 -0.1950902 1.0 0.9807853 -0.1950902 -1.0 0.9807853 -0.1950902 -1.0 0.9807853 -0.1950902 1.0 0.9238796 -0.3826833 1.0 0.9238796 -0.3826833 -1.0 0.9238796 -0.3826833 -1.0 0.9238796 -0.3826833 1.0 0.8314697 -0.5555702 1.0 0.8314697 -0.5555702 -1.0 0.8314697 -0.5555702 -1.0 0.8314697 -0.5555702 1.0 0.7071068 -0.7071068 1.0 0.7071068 -0.7071068 -1.0 0.7071068 -0.7071068 -1.0 0.7071068 -0.7071068 1.0 0.5555702 -0.8314697 1.0 0.5555702 -0.8314697 -1.0 0.5555702 -0.8314697 -1.0 0.5555702 -0.8314697 1.0 0.3826833 -0.9238796 1.0 0.3826833 -0.9238796 -1.0 0.3826833 -0.9238796 -1.0 0.3826833 -0.9238796 1.0 0.1950901 -0.9807853 1.0 0.1950901 -0.9807853 -1.0 0.1950901 -0.9807853 -1.0 0.1950901 -0.9807853 1.0 -3.25841E-7 -1.0 1.0 -3.25841E-7 -1.0 -1.0 -3.25841E-7 -1.0 -1.0 -3.25841E-7 -1.0 1.0 -0.1950907 -0.9807852 1.0 -0.1950907 -0.9807852 -1.0 -0.1950907 -0.9807852 -1.0 -0.1950907 -0.9807852 1.0 -0.3826839 -0.9238793 1.0 -0.3826839 -0.9238793 -1.0 -0.3826839 -0.9238793 -1.0 -0.3826839 -0.9238793 1.0 -0.5555707 -0.8314693 1.0 -0.5555707 -0.8314693 -1.0 -0.5555707 -0.8314693 -1.0 -0.5555707 -0.8314693 1.0 -0.7071073 -0.7071064 1.0 -0.7071073 -0.7071064 -1.0 -0.7071073 -0.7071064 -1.0 -0.7071073 -0.7071064 1.0 -0.83147 -0.5555697 1.0 -0.83147 -0.5555697 -1.0 -0.83147 -0.5555697 -1.0 -0.83147 -0.5555697 1.0 -0.9238799 -0.3826827 1.0 -0.9238799 -0.3826827 -1.0 -0.9238799 -0.3826827 -1.0 -0.9238799 -0.3826827 1.0 -0.9807854 -0.1950894 1.0 -0.9807854 -0.1950894 -1.0 -0.9807854 -0.1950894 -1.0 -0.9807854 -0.1950894 1.0 -1.0 9.65599E-7 1.0 -1.0 9.65599E-7 -1.0 -1.0 9.65599E-7 -1.0 -1.0 9.65599E-7 1.0 -0.9807851 0.1950913 1.0 -0.9807851 0.1950913 -1.0 -0.9807851 0.1950913 -1.0 -0.9807851 0.1950913 1.0 -0.9238791 0.3826845 1.0 -0.9238791 0.3826845 -1.0 -0.9238791 0.3826845 -1.0 -0.9238791 0.3826845 1.0 -0.8314689 0.5555713 1.0 -0.8314689 0.5555713 -1.0 -0.8314689 0.5555713 -1.0 -0.8314689 0.5555713 1.0 -0.7071059 0.7071077 1.0 -0.7071059 0.7071077 -1.0 -0.7071059 0.7071077 -1.0 -0.7071059 0.7071077 1.0 -0.5555691 0.8314704 1.0 -0.5555691 0.8314704 -1.0 -0.5555691 0.8314704 -1.0 -0.5555691 0.8314704 1.0 -0.3826821 0.9238801 1.0 -0.3826821 0.9238801 -1.0 0.0 1.0 1.0 0.0 1.0 -1.0 -0.1950888 0.9807856 -1.0 -0.1950888 0.9807856 1.0 -0.3826821 0.9238801 -1.0 -0.3826821 0.9238801 1.0 -0.1950888 0.9807856 1.0 -0.1950888 0.9807856 -1.0";
    _cylinder.normal = "0.09801727 0.9951847 0.0 0.09801727 0.9951847 0.0 0.09801727 0.9951847 0.0 0.09801727 0.9951847 0.0 0.2902846 0.9569404 0.0 0.2902846 0.9569404 0.0 0.2902846 0.9569404 0.0 0.2902846 0.9569404 0.0 0.4713967 0.8819213 0.0 0.4713967 0.8819213 0.0 0.4713967 0.8819213 0.0 0.4713967 0.8819213 0.0 0.6343933 0.7730104 0.0 0.6343933 0.7730104 0.0 0.6343933 0.7730104 0.0 0.6343933 0.7730104 0.0 0.7730104 0.6343934 0.0 0.7730104 0.6343934 0.0 0.7730104 0.6343934 0.0 0.7730104 0.6343934 0.0 0.8819214 0.4713965 0.0 0.8819214 0.4713965 0.0 0.8819214 0.4713965 0.0 0.8819214 0.4713965 0.0 0.9569403 0.2902847 0.0 0.9569403 0.2902847 0.0 0.9569403 0.2902847 0.0 0.9569403 0.2902847 0.0 0.9951847 0.09801727 0.0 0.9951847 0.09801727 0.0 0.9951847 0.09801727 0.0 0.9951847 0.09801727 0.0 0.9951847 -0.09801697 0.0 0.9951847 -0.09801697 0.0 0.9951847 -0.09801697 0.0 0.9951847 -0.09801697 0.0 0.9569403 -0.2902847 0.0 0.9569403 -0.2902847 0.0 0.9569403 -0.2902847 0.0 0.9569403 -0.2902847 0.0 0.8819214 -0.4713965 0.0 0.8819214 -0.4713965 0.0 0.8819214 -0.4713965 0.0 0.8819214 -0.4713965 0.0 0.7730104 -0.6343934 0.0 0.7730104 -0.6343934 0.0 0.7730104 -0.6343934 0.0 0.7730104 -0.6343934 0.0 0.6343934 -0.7730104 0.0 0.6343934 -0.7730104 0.0 0.6343934 -0.7730104 0.0 0.6343934 -0.7730104 0.0 0.4713967 -0.8819212 0.0 0.4713967 -0.8819212 0.0 0.4713967 -0.8819212 0.0 0.4713967 -0.8819212 0.0 0.2902843 -0.9569405 0.0 0.2902843 -0.9569405 0.0 0.2902843 -0.9569405 0.0 0.2902843 -0.9569405 0.0 0.09801691 -0.9951847 0.0 0.09801691 -0.9951847 0.0 0.09801691 -0.9951847 0.0 0.09801691 -0.9951847 0.0 -0.09801751 -0.9951847 0.0 -0.09801751 -0.9951847 0.0 -0.09801751 -0.9951847 0.0 -0.09801751 -0.9951847 0.0 -0.2902852 -0.9569402 0.0 -0.2902852 -0.9569402 0.0 -0.2902852 -0.9569402 0.0 -0.2902852 -0.9569402 0.0 -0.4713971 -0.8819211 0.0 -0.4713971 -0.8819211 0.0 -0.4713971 -0.8819211 0.0 -0.4713971 -0.8819211 0.0 -0.6343937 -0.7730101 0.0 -0.6343937 -0.7730101 0.0 -0.6343937 -0.7730101 0.0 -0.6343937 -0.7730101 0.0 -0.773011 -0.6343927 0.0 -0.773011 -0.6343927 0.0 -0.773011 -0.6343927 0.0 -0.773011 -0.6343927 0.0 -0.8819215 -0.471396 0.0 -0.8819215 -0.471396 0.0 -0.8819215 -0.471396 0.0 -0.8819215 -0.471396 0.0 -0.9569407 -0.2902837 0.0 -0.9569407 -0.2902837 0.0 -0.9569407 -0.2902837 0.0 -0.9569407 -0.2902837 0.0 -0.9951848 -0.09801632 0.0 -0.9951848 -0.09801632 0.0 -0.9951848 -0.09801632 0.0 -0.9951848 -0.09801632 0.0 -0.9951846 0.0980181 0.0 -0.9951846 0.0980181 0.0 -0.9951846 0.0980181 0.0 -0.9951846 0.0980181 0.0 -0.95694 0.2902858 0.0 -0.95694 0.2902858 0.0 -0.95694 0.2902858 0.0 -0.95694 0.2902858 0.0 -0.8819208 0.4713976 0.0 -0.8819208 0.4713976 0.0 -0.8819208 0.4713976 0.0 -0.8819208 0.4713976 0.0 -0.7730096 0.6343944 0.0 -0.7730096 0.6343944 0.0 -0.7730096 0.6343944 0.0 -0.7730096 0.6343944 0.0 -0.6343924 0.7730112 0.0 -0.6343924 0.7730112 0.0 -0.6343924 0.7730112 0.0 -0.6343924 0.7730112 0.0 -0.4713954 0.8819218 0.0 -0.4713954 0.8819218 0.0 -0.4713954 0.8819218 0.0 -0.4713954 0.8819218 0.0 -0.0980165 0.9951848 0.0 -0.0980165 0.9951848 0.0 -0.0980165 0.9951848 0.0 -0.0980165 0.9951848 0.0 -0.290283 0.9569409 0.0 -0.290283 0.9569409 0.0 -0.290283 0.9569409 0.0 -0.290283 0.9569409 0.0";

    var sphereObj = new DataObject("sphere", _sphere);
    var rectObj = new DataObject("rect", _rect);
    var boxObj = new DataObject("box", _box);
    var arrowObj = new DataObject("arrow", _arrow);
    var cylinderObj = new DataObject("cylinder", _cylinder);
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

	// source: http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html

    // --- mouse buttons ---
    XML3D.tools.MOUSEBUTTON_LEFT = 0;
    XML3D.tools.MOUSEBUTTON_MIDDLE = 1;
    XML3D.tools.MOUSEBUTTON_RIGHT = 2;

    // --- keys ---
    XML3D.tools.KEY_BACKSPACE = 8;
    XML3D.tools.KEY_TAB = 9;
    XML3D.tools.KEY_ENTER = 13;
    XML3D.tools.KEY_SHIFT = 16;
    XML3D.tools.KEY_CTRL = 17;
    XML3D.tools.KEY_ALT = 18;
    XML3D.tools.KEY_PAUSE = 19;
    XML3D.tools.KEY_CAPSLOCK = 20;
    XML3D.tools.KEY_ESCAPE = 27;
    XML3D.tools.KEY_PAGEUP = 33;
    XML3D.tools.KEY_PAGEDOWN = 34;
    XML3D.tools.KEY_END = 35;
    XML3D.tools.KEY_HOME = 36;

    XML3D.tools.KEY_LEFT = 37;
    XML3D.tools.KEY_UP = 38;
    XML3D.tools.KEY_RIGHT = 39;
    XML3D.tools.KEY_DOWN = 40;

    XML3D.tools.KEY_INSERT = 45;
    XML3D.tools.KEY_DELETE = 46;

    XML3D.tools.KEY_0 = 48;
    XML3D.tools.KEY_1 = 49;
    XML3D.tools.KEY_2 = 50;
    XML3D.tools.KEY_3 = 51;
    XML3D.tools.KEY_4 = 52;
    XML3D.tools.KEY_5 = 53;
    XML3D.tools.KEY_6 = 54;
    XML3D.tools.KEY_7 = 55;
    XML3D.tools.KEY_8 = 56;
    XML3D.tools.KEY_9 = 57;

    XML3D.tools.KEY_A = 65;
    XML3D.tools.KEY_B = 66;
    XML3D.tools.KEY_C = 67;
    XML3D.tools.KEY_D = 68;
    XML3D.tools.KEY_E = 69;
    XML3D.tools.KEY_F = 70;
    XML3D.tools.KEY_G = 71;
    XML3D.tools.KEY_H = 72;
    XML3D.tools.KEY_I = 73;
    XML3D.tools.KEY_J = 74;
    XML3D.tools.KEY_K = 75;
    XML3D.tools.KEY_L = 76;
    XML3D.tools.KEY_M = 77;
    XML3D.tools.KEY_N = 78;
    XML3D.tools.KEY_O = 79;
    XML3D.tools.KEY_P = 80;
    XML3D.tools.KEY_Q = 81;
    XML3D.tools.KEY_R = 82;
    XML3D.tools.KEY_S = 83;
	XML3D.tools.KEY_T = 84;
    XML3D.tools.KEY_U = 85;
    XML3D.tools.KEY_V = 86;
    XML3D.tools.KEY_W = 87;
    XML3D.tools.KEY_X = 88;
    XML3D.tools.KEY_Y = 89;
    XML3D.tools.KEY_Z = 90;

    XML3D.tools.KEY_WINLEFT = 91;
    XML3D.tools.KEY_WINRIGHT = 92;
    XML3D.tools.KEY_SELECT = 93;

    XML3D.tools.KEY_NUMPAD0 = 96;
    XML3D.tools.KEY_NUMPAD1 = 97;
    XML3D.tools.KEY_NUMPAD2 = 98;
    XML3D.tools.KEY_NUMPAD3 = 99;
    XML3D.tools.KEY_NUMPAD4 = 100;
    XML3D.tools.KEY_NUMPAD5 = 101;
    XML3D.tools.KEY_NUMPAD6 = 102;
    XML3D.tools.KEY_NUMPAD7 = 103;
    XML3D.tools.KEY_NUMPAD8 = 104;
    XML3D.tools.KEY_NUMPAD9 = 105;

    XML3D.tools.KEY_NUMPAD_MULTIPLY = 106;
    XML3D.tools.KEY_NUMPAD_ADD = 107;
    XML3D.tools.KEY_NUMPAD_SUBTRACT = 109;
    XML3D.tools.KEY_NUMPAD_DECIMAL = 110;
    XML3D.tools.KEY_NUMPAD_DIVIDE = 111;

    XML3D.tools.KEY_F1 = 112;
    XML3D.tools.KEY_F2 = 113;
    XML3D.tools.KEY_F3 = 114;
    XML3D.tools.KEY_F4 = 115;
    XML3D.tools.KEY_F5 = 116;
    XML3D.tools.KEY_F6 = 117;
    XML3D.tools.KEY_F7 = 118;
    XML3D.tools.KEY_F8 = 119;
    XML3D.tools.KEY_F9 = 120;
    XML3D.tools.KEY_F10 = 121;
    XML3D.tools.KEY_F11 = 122;
    XML3D.tools.KEY_F12 = 123;

    XML3D.tools.KEY_NUMLOCK = 144;
    XML3D.tools.KEY_SCROLLLOCK = 145;
    XML3D.tools.KEY_SEMICOLON = 186;
    XML3D.tools.KEY_EQUALS = 187;
    XML3D.tools.KEY_COMMA = 188;
    XML3D.tools.KEY_DASH = 189;
    XML3D.tools.KEY_PERIOD = 190;
    XML3D.tools.KEY_SLASH = 191;
    XML3D.tools.KEY_GRAVE_ACCENT = 192;
    XML3D.tools.KEY_BRACKET_OPEN = 219;
    XML3D.tools.KEY_BACKSLASH = 220;
    XML3D.tools.KEY_BRACKET_CLOSE = 221;
    XML3D.tools.KEY_SINGLE_QUOTE = 222;
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/** A simple class to manage a geometric object in XML3D. Elements to be inserted in the defs or
 * xml3d section can be added and removed. The object can be inserted and removed from the
 * document.
 *
 * -- Root Element --
 * Special is the root element. In GeoObject.graph["root"] the root element is placed. We want
 * this to have a unique interface for accessing the root node. Also when attaching the geometry
 * only the root node will be attached. All other elements in the graph attribute can be used
 * for storage. They will be detached from their parents during destruction.
 *
 * -- ID --
 * Each GeoObject has an ID. Storage in the defs and graph sections is addressed by local IDs.
 *
 * For example addShaders() or addTransforms() take local IDs, but construct elements with global
 * IDs, formed by the method globalID().
 */
XML3D.tools.util.GeoObject = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

    /** Initializes the object.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {string} _id the ID of this object
     *  @param {!Object} _xml3d the xml3d element in which the object will reside
     *  @param {!Object} [_rootGrp] the group to which this object is to be attached. If not given
     *              it will be appended to the given xml3d element.
     */
    initialize: function(_id, _xml3d, _rootGrp)
    {
        this.callSuper();

        this.ID = _id;
        this.xml3d = _xml3d;
        this.defsRoot = XML3D.tools.util.getOrCreateDefs(_xml3d);

        if(_rootGrp)
            this.rootGrp = _rootGrp;
        else
            this.rootGrp = _xml3d;

        this._rootTransformable = null; // updated during setGraphRoot()

        this.defs = {};     // local IDs -> defs element
        this.graph = {}; // local IDs -> graph element. this.graph["root"] will hold the root node
    },

    /** Detaches the object and resets the defs and graph.
     *
     *  @this {XML3D.tools.util.GeoObject}
     */
    destroy: function()
    {
        this.detach();

        this.defs = {};
        this.graph = {};
    },

    // ========================================================================
    // --- Attach/Detach ---
    // ========================================================================
    /** Attach the defs elements and the graph. Alternatively attachDefs() and
     *  attachGraph() can be called seperately.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @protected
     *  @override
     */
    onAttach: function()
    {
    	this.attachDefs();
    	this.attachGraph();
    },

    /** Remove the graph and defs elements from the DOM.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @protected
     *  @override
     */
    onDetach: function()
    {
        this.rootGrp.removeChild(this.graph["root"]);
        this._removeChildren(this.defsRoot, this.defs);

        this._rootTransformable = null;
    },

    /** Add all defs elements to the defsRoot
     *
     *  @this {XML3D.tools.util.GeoObject}
     */
    attachDefs: function()
    {
        this._appendChildren(this.defsRoot, this.defs);
        this.setAttached(true);
    },

    /** Add the graph["root"] object to the root group
     *
     *  @this {XML3D.tools.util.GeoObject}
     */
    attachGraph: function()
    {
        this.rootGrp.appendChild(this.graph["root"]);
        this.setAttached(true);
    },

    // ========================================================================
    // --- Root Handling ---
    // ========================================================================
    /** Set the given node as the root node in the graph. This is the child node
     *  of this object's root group.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {!Object} rootNode
     */
    setGraphRoot: function(rootNode)
    {
        this.graph["root"] = rootNode;
    },

    /** Add the given array of children to the graph root, set previously by
     *  setGraphRoot().
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {Array.<Object>} children
     */
    addToGraphRoot: function(children)
    {
        if(!this.graph["root"])
            throw "XML3D.tools.util.GeoObject: no root node present.";

        if(children.constructor !== Array)
            children = [children];

        for(var i = 0; i < children.length; i++)
            this.graph["root"].appendChild(children[i]);
    },

    /** Retrieve the graph root node.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @return {Object}
     */
    getGraphRoot: function()
    {
        return this.graph["root"];
    },


    /** Retrieve a transformable to the graph root node.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @return {XML3D.tools.Transformable}
     */
    getGraphRootTransformable: function()
    {
        if(!this._rootTransformable)
        {
            this._rootTransformable =
                XML3D.tools.MotionFactory.createTransformable(this.getGraphRoot());
        }
        return this._rootTransformable;
    },

    // ========================================================================
    // --- Helpers ---
    // ========================================================================

    /** Convert a given id to a global one. This is done by prepending this object's
     *  id to the given id. This could be done without such a function, but it's
     *  pretty often used, so the encapsulation is useful.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {string} id a local ID to be converted
     *  @return {string} the converted, global, ID
     */
    globalID: function(id)
    {
        return this.ID + "_" + id;
    },

    /** Creates phong shaders and adds them to the defs elements.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {string|Array} IDs a single or array of local IDs for the shader.
     *  @param {Object} [opts] the options for XML3D.tools.creation.phongShader()
     *
     *  The id of the created shaders will be set to global IDs. The options
     *  get applied to each of the given IDs.
     */
    addShaders: function(IDs, opts)
    {
        if(!opts)
            opts = {};

        if(IDs.constructor !== Array)
            IDs = [IDs];

        for(var i = 0; i < IDs.length; i++)
        {
            opts.id = this.globalID(IDs[i]);

            this.defs[IDs[i]] = XML3D.tools.creation.phongShader(opts);
        }
    },

    /** Creates transform elements and adds them to the defs elements.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {string|Array} IDs a single or array of local IDs for the transform elements
     *  @param {Object} [opts] the options for XML3D.tools.creation.element()
     *
     *  The id of the created shaders will be set to global IDs. The options will
     *  be applied to each ID.
     */
    addTransforms: function(IDs, opts)
    {
        if(!opts)
            opts = {};

        if(IDs.constructor !== Array)
            IDs = [IDs];

        for(var i = 0; i < IDs.length; i++)
        {
            opts.id = this.globalID(IDs[i]);

            this.defs[IDs[i]] = XML3D.tools.creation.element("transform", opts);
        }
    },

    /** Set the contents of the transform elements, that have the given local IDs,
     *  with the given options. So basically setting a lot of transforms to the same
     *  values with a single call.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {string|Array} localIDs a single ID or an array of IDs
     *  @param {!Object} opts an object of options, supported: transl, scale, rot
     */
    updateTransforms: function(localIDs, opts)
    {
        if(localIDs.constructor !== Array)
            localIDs = [localIDs];

        var len = localIDs.length;
        for(var i = 0; i < len; i++)
        {
            var el = this.defs[localIDs[i]];
            if(!el)
                continue;

            if(opts.transl)
                el.setAttribute("translation", opts.transl);
            if(opts.scale)
                el.setAttribute("scale", opts.scale);
            if(opts.rot)
                el.setAttribute("rotation", opts.rot);
        }
    },

    // ========================================================================
    // --- Private ---
    // ========================================================================

    /** Append all children to the given element.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {!Object} targetEl
     *  @param {Array.<Object>} children
     */
    _appendChildren: function(targetEl, children)
    {
        for(var i in children)
            targetEl.appendChild(children[i]);
    },

    /** Remove all childen from the given element.
     *
     *  @this {XML3D.tools.util.GeoObject}
     *  @param {!Object} targetEl
     *  @param {Array.<Object>} children
     */
    _removeChildren: function(targetEl, children)
    {
        for(var i in children)
            targetEl.removeChild(children[i]);
    }
});
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/** This class manages listeners for given events, for a variable number of arguments.
 *
 *  It holds a map from event names to listeners. The event names can be managed
 *  through add/removeListenerTypes() and isListenerType(). Also derived classes
 *  may define a property "listenerTypes", that will be automatically parsed during
 *  the Observable's constructor.
 *
 *  To register an event, addListener() should be called with the associated event
 *  name and a callback method.
 *
 *  All listeners of an event type can be called with notifyListeners(), which expects the
 *  corresponding event name.
 */
XML3D.tools.util.Observable = new XML3D.tools.Class({

    /**
     *  @this {XML3D.tools.util.Observable}
     */
    initialize: function()
    {
        /** @private */
        this._listeners = {};
        /** @private */
        this._listenerTypes = {};

        // initialize types from derived classes
        if(this.listenerTypes)
            this.addListenerTypes(this.listenerTypes);
    },

    /** Remembers the given (array of) event name as valid event names.
     *
     *  @this {XML3D.tools.util.Observable}
     */
    addListenerTypes: function(listenerTypes)
    {
        if(!listenerTypes)
            return;

        if(listenerTypes.constructor == Array)
        {
            for(var i = 0; i < listenerTypes.length; i++)
            {
                var type = listenerTypes[i];
                if(this._listenerTypes[type] === true)
                    throw "XML3D.tools.util.Observable: type already registered: '" + type + "'!";

                this._listenerTypes[type] = true;
            }
        }
        else if(this._listenerTypes[listenerTypes] === true)
        {
            throw "XML3D.tools.util.Observable: type already registered: '" + listenerTypes + "'!";
        }
        else
            this._listenerTypes[listenerTypes] = true;
    },

    /** Remove the given listener types from the array. The listeners will not be
     *  removed!
     *
     *  @this {XML3D.tools.util.Observable}
     */
    removeListenerTypes: function(listenerTypes)
    {
        if(!listenerTypes)
            return;

        if(listenerTypes.constructor == Array)
        {
            for(var i = 0; i < listenerTypes.length; i++)
                this._listenerTypes[listenerTypes[i]] = false;
        }
        else
            this._listenerTypes[listenerTypes] = false;
    },


    /** Add a listener for the given event type
     *
     *  @this {XML3D.tools.util.Observable}
     *
     *  @param {string} evtname
     *  @param {function()} listener
     */
    addListener: function(evtname, listener)
    {
        if(this.isListenerType(evtname))
        {
            if(!this._listeners[evtname])
                this._listeners[evtname] = [];

            this._listeners[evtname].push(listener);
        }
    },

    /** Remove first occurence of given element.
     *
     *  @this {XML3D.tools.util.Observable}
     *  @param {string} evtname
     *  @param {function()} listener
     */
    removeListener: function(evtname, listener)
    {
        if(this.isListenerType(evtname))
        {
            if(!this._listeners[evtname])
                return;

            for(var i = 0; i < this._listeners[evtname].length; i++)
            {
                if(this._listeners[evtname][i] === listener)
                {
                    this._listeners[evtname].slice(i, 1);
                    return;
                }
            }
        }
    },

    /** Notifies all listeners. Arguments can be given to this function that get
     *     forwarded to each listener.
     *
     *  @this {XML3D.tools.util.Observable}
     *  @param {string} evtname
     */
    notifyListeners: function(evtname)
    {
        if(this.isListenerType(evtname)
        && this._listeners[evtname])
        {
            var args = Array.prototype.slice.call(arguments);
            for(var i = 0; i < this._listeners[evtname].length; i++)
                this._listeners[evtname][i].apply(this, args.slice(1));
        }
    },

    /** Returns whether this listener manager manages the given event name.
     *
     *  @this {XML3D.tools.util.Observable}
     *  @param {string} evtname
     *  @return {boolean} true if evtname is registered as a listener type.
     */
    isListenerType: function(evtname)
    {
        return (this._listenerTypes[evtname] === true);
    }
});
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    /** An EventDispatcher is used to control the specific events that are needed by some
     *  classes, e.g. XML3D.tools.interaction.behaviors.PDSensor.
     *
     *  Why a dispatcher?
     *  Per default the PDSensor emits a "dragstart" event, when any mouse button is pressed.
     *  But what if the behavior is to be toggled only when the left mouse button is pressed
     *  or the left mouse button in combination with the ctrl key?
     *  In that case we can design a custom EventDispatcher, that only propagates the
     *  "mousedown" event, if the left mouse button is pressed or in addition the ctrl key
     *  is pressed.
     *
     *  Using a dispatcher:
     *  Instead of the usual myElement.{add,remove}EventListener() calls invoke
     *  the dispatcher's on() and off() methods.
     *
     *  Creating a custom dispatcher:
     *  1) Derive from or instantiate this class
     *  2) Call registerCustomHandler() for the events you want to control
     *  3) Upon receiving an event decide whether you want the event to be dispatched.
     *      If you don't want it to be dispatched return false. Else return anything else.
     */
    XML3D.tools.util.EventDispatcher = new XML3D.tools.Class({

        /** Initializes the dispatcher.
         *  Optionally a custom handler can be registered right away by providing the
         *  proper arguments.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *
         *  @param {string=} eventName
         *  @param {function(Event):boolean=} callback
         */
        initialize: function(eventName, callback) {
            this._callbackContexts = [];
            this._customHandlers = {}; // eventName -> array of callbacks

            if(arguments.length == 2)
                this.registerCustomHandler(eventName, callback);
        },

        /** Register an event listener on the given target element.
         *  Use this method as a user of the dispatcher, i.e. to abstract from the
         *  direct event.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *
         *  @param {window.Element} targetElement
         *  @param {string} eventName
         *  @param {function(window.Event)} callback
         */
        on: function(targetElement, eventName, callback) {

            if(!this._hasCustomHandlers(eventName)) {
                this._registerListenerOnTarget(targetElement, eventName, callback);
                return;
            }

            var ctx = {
                targetElement: targetElement,
                eventName: eventName,
                callback: callback
            };

            function internalCB(evt) {
                this._handleEvent(evt, ctx);
            };

            ctx.internalCallback = internalCB.bind(this);

            this._callbackContexts.push(ctx);

            this._registerListenerOnTarget(targetElement, eventName, ctx.internalCallback);
        },

        /** Deregister an event listener on the given target element.
         *  Use this method as a user of the dispatcher, i.e. to abstract from the
         *  direct event.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *
         *  @param {window.Element} targetElement
         *  @param {string} eventName
         *  @param {function(window.Event)} callback
         */
        off: function(targetElement, eventName, callback) {

            if(!this._hasCustomHandlers(eventName)) {
                this._deregisterListenerOnTarget(targetElement, eventName, callback);
                return;
            }

            var ctxIdx = this._findContextIndex(targetElement, eventName, callback);
            if(ctxIdx < 0)
                return;

            var ctx = this._callbackContexts[ctxIdx];

            this._deregisterListenerOnTarget(ctx.targetElement, ctx.eventName, ctx.internalCallback);
            this._callbackContexts.splice(ctxIdx, 1);
        },

        /** Tell the dispatcher to be notified for the given event.
         *  Use this method as a custom event dispatcher to tell this dispatcher to
         *  forward any events to the given callback and ask it whether to actually
         *  dispatch the event.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *
         *  @param {string} eventName
         *  @param {function(window.Event): boolean} callback
         */
        registerCustomHandler: function(eventName, callback) {
            if(!this._customHandlers[eventName])
                this._customHandlers[eventName] = [];

            this._customHandlers[eventName].push(callback);
        },

        /** Registers an event in the "traditional" way.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *  @private
         */
        _registerListenerOnTarget: function(targetElement, eventName, callback)
        {
            targetElement.addEventListener(eventName, callback, false);
        },

        /** Deregisters an event in the "traditional" way.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *  @private
         */
        _deregisterListenerOnTarget: function(targetElement, eventName, callback)
        {
            targetElement.removeEventListener(eventName, callback, false);
        },

        /** Will invoke all the custom handlers and ask them whether to dispatch the given event.
         *  If any of the handlers says no, the event will not be dispatched.
         *
         *  @this {XML3D.tools.util.EventDispatcher}
         *  @private
         */
        _handleEvent: function(evt, ctx) {

            var handlers = this._customHandlers[ctx.eventName];
            if(!handlers)
                return;

            var dispatchEvent = true;
            for(var i = 0; i < handlers.length; i++) {
                if(handlers[i](evt) === false)
                    dispatchEvent = false;
            }

            if(dispatchEvent)
                ctx.callback(evt);
        },

        /**
         *  @this {XML3D.tools.util.EventDispatcher}
         *  @private
         */
        _hasCustomHandlers: function(eventName) {

            if(this._customHandlers[eventName])
                return true;
            else
                return false;
        },

        /**
         *  @this {XML3D.tools.util.EventDispatcher}
         *  @private
         */
        _findContextIndex: function(targetElement, eventName, callback) {

            for(var i = 0; i < this._callbackContexts.length; i++) {

                var ctx = this._callbackContexts[i];

                if(ctx.targetElement === targetElement
                && ctx.eventName === eventName
                && ctx.callback === callback)
                    return i;
            }

            return -1;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
XML3D.tools.namespace("XML3D.tools.util");

/**
 *  A plane with an origin and a normal. The special thing here is that the normal can be set
 *  by a normal directly, a group (whose orientation serves for the calculation) or by nothing
 *  in which case a plane parallel to the user's view is constructed.
 */
XML3D.tools.util.Plane = new XML3D.tools.Class({

    /**
     *  @this {XML3D.tools.util.Plane}
     */
    initialize: function(xml3d)
    {
        if(!XML3D.tools.util.isDefined(xml3d))
            throw new Error("XML3D.tools.util.Plane: no xml3d element given.");

        /** This vector will be used when computing the normal based on some orientations.
         *  There we need an "original" vector from which to rotate.
         *  @private
         */
        this._defaultNormal = new window.XML3DVec3(0,0,1);

        this._xml3d = xml3d;

        this._origin = new window.XML3DVec3();
        this._validNormal = new window.XML3DVec3();
        this._isNormalValid = false;

        this._userNormal = null;
        this._userOrientationGrp = null;
        /** If a group is used a tracker is used to update the group's transform on the fly.
         *  @private
         */
        this._userOrientationGrpTracker = null;
    },

    /** Set or retrieve the origin
     *
     *  @this {XML3D.tools.util.Plane}
     *  @param {window.XML3DVec3=} newOrigin
     *  @return {window.XML3DVec3} the origin
     */
    origin: function(newOrigin)
    {
        if(XML3D.tools.util.isDefined(newOrigin))
            this._origin.set(newOrigin);

        return new window.XML3DVec3(this._origin);
    },

    /** Set or retrieve the normal of the plane. The new normal
     *  can be a vector or a group. To instruct the plane to use
     *  the user's view use setOrientation() below.
     *
     *  @this {XML3D.tools.util.Plane}
     *  @param {window.XML3DVec3|!Object=} newNormal
     *  @return {window.XML3DVec3} the current normal
     */
    normal: function(newNormal)
    {
        if(XML3D.tools.util.isDefined(newNormal))
            this.setOrientation(newNormal);
        else if(!this._isNormalValid)
            this._updateOrientation();

        return this._validNormal;
    },

    /** Set a new orientation of the plane. The argument is optional.
     *  If none is given everything's reset and a plane perpendicular to the
     *  user's viewing direction is taken.
     *
     *  @this {XML3D.tools.util.Plane}
     *  @param {window.XML3DVec3|!Object=} newOrientation
     */
    setOrientation: function(newOrientation)
    {
        this._isNormalValid = false;

        // default: view-dependent, no user settings
        this._clearUserDefinitions();

        if(XML3D.tools.util.isDefined(newOrientation))
        {
            // use user-defined normal
            if(newOrientation.constructor === window.XML3DVec3)
            {
                this._userNormal = new window.XML3DVec3(newOrientation);
            }
            else // use user-defined group
            {
                this._userOrientationGrp = newOrientation;
                this._xfmTracker = new XML3D.tools.TransformTracker(newOrientation,
                        this.callback("_invalidateNormal"));
                this._xfmTracker.attach();
            }
        }
        else // user user-view
        {
            this._xfmTracker = new XML3D.tools.ViewTracker(this._xml3d,
                this.callback("_invalidateNormal"));
            this._xfmTracker.attach();
        }

        this._updateOrientation();
    },

    /**
     *  @this {XML3D.tools.util.Plane}
     */
    str: function()
    {
        return "[o: " + this.origin().str() + ", n: " + this.normal().str() + "]";
    },

    /**
     *  @private
     *  @this {XML3D.tools.util.Plane}
     */
    _clearUserDefinitions: function()
    {
        this._userNormal = null;
        this._userOrientationGrp = null;
        if(this._userOrientationGrpTracker)
            this._userOrientationGrpTracker.detach();
    },

    /**
     *  @private
     *  @this {XML3D.tools.util.Plane}
     */
    _updateOrientation: function()
    {
        // user set normal
        if(XML3D.tools.util.isDefined(this._userNormal))
        {
            this._validNormal.set(this._userNormal);
        }
        else
        {
            var orientMatrix = null;

            // user set group
            if(XML3D.tools.util.isDefined(this._userOrientationGrp))
            {
                orientMatrix = this._userOrientationGrp.getWorldMatrix();
            }
            else // take view as basis
            {
                var va = XML3D.util.getOrCreateActiveView(this._xml3d);
                orientMatrix = va.getWorldMatrix();
            }

            this._validNormal.set(orientMatrix.multiplyDir(this._defaultNormal));
        }

        this._validNormal.set(this._validNormal.normalize());
        this._isNormalValid = true;
    },

    /**
     *  @private
     *  @this {XML3D.tools.util.Plane}
     */
    _invalidateNormal: function()
    {
        this._isNormalValid = false;
    }
});
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /**
     * For the given node calls the handler method xfmChanged() when
     * the global transformation changed. This is the case if the transform
     * attribute of the target node or of one of the parent nodes changed.
     * Since transform attributes point to transform elements the transformation of
     * the target node also changes if corresponding transform elements are modified.
     *
     * This observer tracks only these changes, though. It does not track whether some local fields
     * of the target node change since it does not know which there might be.
     *
     * The observer registers itself as listener in all parent nodes that have a transform attribute
     * to find out when changes to that attribute happen.
     *
     * @constructor
     * @param {!Object} _targetNode the node to track
     * @param {function(targetNode:!Object,evt:!Event)=} onXfmChanged method that should be called when transformation changed
     */
    XML3D.tools.TransformTracker = new XML3D.tools.Class({

        initialize: function(_targetNode, onXfmChanged)
        {
            if(!_targetNode)
                throw "TransformTracker: no target node specified.";

            this.xml3d = XML3D.tools.util.getXml3dRoot(_targetNode);
            this.targetNode = _targetNode;

            if(onXfmChanged)
                this.xfmChanged = onXfmChanged;

            /** @private */
            this._attached = false;
        },

        /** Event handler to be overriden by the user
         * @this {XML3D.tools.TransformTracker}
         * @param {!Object} targetNode the node this observer tracks
         * @param {!Event} evt the original DOM event that caused the change
         */
        xfmChanged: function(targetNode, evt) { },

        /**
         * Register callbacks in the given node and all parent nodes.
         *
         * @this {XML3D.tools.TransformTracker}
         * @param {!Object} [node] (internal) the node to register. If not given the
         *  target node is taken.
         */
        attach: function(node)
        {
            if(!this._attached)
            {
                if(!node)
                    node = this.targetNode;

                if(node.tagName.toLowerCase() === "xml3d")
                    return;

                if(node.tagName.toLowerCase() === "group")
                {
                    node.addEventListener("DOMAttrModified",
                        XML3D.tools.util.wrapCallback(this, this._onGrpAttrModified), false);

                    this._attachToTransformOfGrp(node);
                }
                else if(node.tagName.toLowerCase() === "view")
                {
                    node.addEventListener("DOMAttrModified",
                        XML3D.tools.util.wrapCallback(this, this._onViewAttrModified), false);
                }

                if(node.parentNode)
                    this.attach(node.parentNode);

                this._attached = true;
            }

            this.xfmChanged(this.targetNode);
        },

        /**
         * Deregister callbacks in the given node and all parent nodes.
         *
         * @this {XML3D.tools.TransformTracker}
         * @param {Object} node (internal) the node to register. If not given the
         *  target node is taken.
         */
        detach: function(node)
        {
            if(this._attached)
            {
                if(!node)
                    node = this.targetNode;

                if(node.tagName.toLowerCase() === "xml3d")
                    return;

                if(node.tagName.toLowerCase() === "group")
                {
                    node.removeEventListener("DOMAttrModified",
                        XML3D.tools.util.wrapCallback(this, this._onGrpAttrModified), false);

                    this._detachFromTransformOfGrp(node);
                }
                else if(node.tagName.toLowerCase() === "view")
                {
                    node.removeEventListener("DOMAttrModified",
                        XML3D.tools.util.wrapCallback(this, this._onViewAttrModified), false);
                }

                if(node.parentNode)
                    this.detach(node.parentNode);

                this._attached = false;
            }
        },

        /**
         *  @this {XML3D.tools.TransformTracker}
         *  @private
         */
        _onGrpAttrModified: function(evt)
        {
            if(evt.attrName !== "transform")
                return;

            switch(evt.attrChange)
            {
            case 2: // addition
                this._attachToTransformOfGrp(evt.target);
                break;

            case 3: // removal
                this._detachFromTransformOfGrp(evt.target);
                break;
            }

            this.xfmChanged(this.targetNode, evt);
        },

        /**
         *  @this {XML3D.tools.TransformTracker}
         *  @private
         */
        _onViewAttrModified: function(evt)
        {
            if(evt.attrName !== "position"
            && evt.attrName !== "orientation")
                return;

            this.xfmChanged(this.targetNode, evt);
        },

        /**
         *  @this {XML3D.tools.TransformTracker}
         *  @private
         */
        _onXfmAttrModified: function(evt)
        {
            this.xfmChanged(this.targetNode, evt);
        },

        /**
         *  @this {XML3D.tools.TransformTracker}
         *  @private
         */
        _attachToTransformOfGrp: function(grp)
        {
            var xfm = XML3D.tools.util.transform(grp);
            if(!xfm)
                return;

            xfm.addEventListener("DOMAttrModified",
                XML3D.tools.util.wrapCallback(this, this._onXfmAttrModified), false);
        },

        /**
         *  @this {XML3D.tools.TransformTracker}
         *  @private
         */
        _detachFromTransformOfGrp: function(grp)
        {
            var xfm = XML3D.tools.util.transform(grp);
            if(!xfm)
                return;

            xfm.removeEventListener("DOMAttrModified",
                XML3D.tools.util.wrapCallback(this, this._onXfmAttrModified), false);
        }
    });
}());

/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /**
     * Tracks the active view of the given xml3d tag for changes and invokes the given
     * callback when a change happened.
     *
     * @param {!Object} targetXml3dElement the xml3d section whose active view is to be tracked
     * @param {function(viewTracker:!Object,evt:!Event)=} onXfmChanged the callback to be invoked
     */
    XML3D.tools.ViewTracker = new XML3D.tools.Class({

        /** @this {XML3D.tools.ViewTracker} */
        initialize: function(targetXml3dElement, onXfmChanged)
        {
            if(onXfmChanged)
                this.xfmChanged = onXfmChanged;

            /** @private */
            this._currentViewElement = null;

            /** @private */
            this._xml3d = targetXml3dElement;
            if(!this._xml3d)
                throw "ViewTracker: given xml3d node not given";

            /** the TransformTracker used to track changes in the active view element
             *  @private
             */
            this._xfmObs = null;
            /** @private */
            this._attached = false;
        },

        /** Event handler to be overriden by the user
         *
         *  @this {XML3D.tools.ViewTracker}
         *  @param {Object} viewTracker this instance
         *  @param {Object} evt the original DOM event that caused the change
         */
        xfmChanged: function(viewTracker, evt) { },

        /** @this {XML3D.tools.ViewTracker} */
        attach: function()
        {
            if(!this._attached)
            {
                this._xml3d.addEventListener("DOMAttrModified",
                    this.callback("_onXml3DAttrModified"), false);

                this._currentViewElement = XML3D.util.getOrCreateActiveView(this._xml3d);

                if(this._xfmObs)
                    this._xfmObs.detach();
                this._xfmObs = new XML3D.tools.TransformTracker(this._currentViewElement);
                this._xfmObs.xfmChanged = this.callback("_onXfmChanged");
                this._xfmObs.attach();

                this._onXfmChanged();
                this._attached = true;
            }
        },

        /** @this {XML3D.tools.ViewTracker} */
        detach: function()
        {
            if(this._attached)
            {
                this._xfmObs.detach();
                this._xml3d.removeEventListener("DOMAttrModified",
                    this.callback("_onXml3DAttrModified"), false);

                this._attached = false;
            }
        },

        /** @this {XML3D.tools.ViewTracker} */
        getCurrentView: function()
        {
            return this._currentViewElement;
        },

        /**
         *  @private
         *  @this {XML3D.tools.ViewTracker}
         */
        _onXml3DAttrModified: function(evt)
        {
            if(evt.attrName !== "activeView")
                return;

            this.detach();
            this.attach();
        },

        /**
         *  @private
         *  @this {XML3D.tools.ViewTracker}
         */
        _onXfmChanged: function(targetNode, evt)
        {
            if(this.xfmChanged)
                this.xfmChanged(this, evt);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/** A simple TransformSensor, similar to X3D's TransformSensor.
 *
 * You give it a bounding box and target node. The sensor tracks transformation changes
 * in the target node and notifies the listeners as soon as the bounding box
 * of the target node intersects with the given bounding box.
 *
 * The registered listeners for "start" and "end" have a single argument:
 * the associated transform sensor. Any additional information can be obtained from
 * that sensor.
 *
 * @extends XML3D.tools.util.Observable
 */
XML3D.tools.TransformSensor = new XML3D.tools.Class(
    XML3D.tools.util.Observable, {

	listenerTypes: [
        "start", "end" // args (this)
    ],

    /** Initializes the sensor with the given values and attaches the sensor to
     *  the target groups.
     *
     *  @this {XML3D.tools.TransformSensor}
     *
     *  @param {string} _id a unique identifier for this sensor
     *  @param {Array.<Object>} _tarGrps the groups of which to track transformation changes
     *  @param {XML3DBox} _bbox the bounding box to intersect the target groups with
     */
    initialize: function(_id, _tarGrps, _bbox)
    {
    	this.callSuper();

        this.ID = _id;
        this.xml3d = XML3D.tools.util.getXml3dRoot(_tarGrps[0]);
        this.targetGrps = _tarGrps;
        this.bbox = _bbox;

        /** all the target elements that currently intersect with this sensor's
         * bounding box.
         *
         * The type is: grp -> boolean. I.e. it is a set.
         */
        this.currentIntersectGrps = [];

        this._isAttached = false;
        this.attach();
    },

    /** @this {XML3D.tools.TransformSensor} */
    attach: function()
    {
        if(!this._isAttached)
        {
            this._observers = [];

            var grps = this.targetGrps;
            for(var i in grps)
            {
                var tar = grps[i];
                this._observers[tar] = new XML3D.tools.TransformTracker(tar);
                this._observers[tar].xfmChanged = this.callback("_xfmChanged");
                this._observers[tar].attach();
            }

            this._isAttached = true;
        }
    },

    /** @this {XML3D.tools.TransformSensor} */
    detach: function()
    {
        if(this._isAttached)
        {
            var obs = this._observers;
            for(var i in obs)
            {
                var o = obs[i];

                o.xfmChanged = function() {};
                o.detach();
            }

            this._observers = [];

            this._isAttached = false;
        }
    },

    /** Callback of internally used XML3D.tools.TransformTracker
     *
     *  @this {XML3D.tools.TransformSensor}
     *  @private
     *
     *  @param {!Object} tarNode
     */
    _xfmChanged: function(tarNode)
    {
        var tarBBox = XML3D.tools.util.getWorldBBox(tarNode);

        var isInt = this.bbox.intersects(tarBBox);
        var alreadyInt = this.currentIntersectGrps[tarNode];

        if(isInt && !alreadyInt) // new intersection (no intersection before)
        {
            this.currentIntersectGrps[tarNode] = true;
            this.notifyListeners("start", this);
        }
        else if(!isInt && alreadyInt) // intersection gone (and intersection before)
        {
            this.currentIntersectGrps[tarNode] = false;
            this.notifyListeners("end", this);
        }
    }
});
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    /** XML3D.tools.util.Map provides a simple map from objects to arbitrary values.
     * 	In Javascript only strings are supported as keys, but sometimes we want to map
     *	raw objects instead. One object may contain multiple values.
     *
     *  The implementation is very simple, though. We will keep an array of
     *  (key,values)-containers. To find a given key we iterate through the array.
     *  I don't see easy ways to optimize that behavior w/o any further knowledge
     *  of the given object. Converting it to a string won't help, multiple objects
     *  map to the same strings (e.g. nameless native functions all map to
     *  "function() { [native code] }". I don't know of other ways to serialize
     *  arbitrary objects.
     */
    XML3D.tools.util.Map = new XML3D.tools.Class({

        /**
         *  @this {XML3D.tools.util.Map}
         */
        initialize: function() {

            this._containers = [];
        },

        /**
         *  @this {XML3D.tools.util.Map}
         *  @return {number} the number of keys in the map
         */
        size: function() {
            return this._containers.length;
        },

        /** Adds a (key,values) pair to the map. The given key may not exist yet.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@param {Object|Array.<Object>} values
         */
        add: function(key, values) {

            if(!XML3D.tools.util.isDefined(values))
                return;
            if(!(values instanceof Array))
                values = [values];
            if(values.length < 1)
                return;

            var containerIdx = this._indexOfContainer(key);
            if(containerIdx < 0) {
                var container = {
                    key: key,
                    values: values
                };

                this._containers.push(container);
            }
            else {
                var c = this._containers[containerIdx];

                for(var i = 0; i < values.length; i++) {
                    if(0 > c.values.indexOf(values[i])) {
                        c.values.push(values[i]);
                    }
                }
            }
        },

        /** Removes the given key from the map. If an optional value is
         *  given, only the value corresponding to the given key will be
         *  erased. In case the given value is the only value of the associated
         *  key the key will be erased, too.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@param {Object=} value
         */
        remove: function(key, value) {
            if(XML3D.tools.util.isDefined(value)) {
                this._removeValue(key, value);
            }
            else {
                this._removeKey(key);
            }
        },

        /** Removes all keys and values from the map.
         *  @this {XML3D.tools.util.Map}
         */
        clear: function() {
            this._containers = [];
        },

        /** Similar to add(), but removes the key before adding the values to the key.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@param {Object|Array.<Object>} values
         */
        set: function(key, values) {

            this._removeKey(key);
            this.add(key, values);
        },

        /** Returns true if the map contains the given key.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@return {boolean} true if the given key is contained in the map
         */
        has: function(key) {

            return (this._indexOfContainer(key) > -1);
        },

        /** Retrieve all values for a given key. If the key is not contained in the
         *  map an exception is thrown.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@return {Array.<Object>} the values of the given key
         */
        get: function(key) {

            this._assertHas(key);

            var containerIdx = this._indexOfContainer(key);
            return this._containers[containerIdx].values;
        },

        /** Retrieve the values that correspond to the key next to the
         *  given one on the right side. Since the underlying container object
         *  is an array, this is the index of the given key plus one.
         *
         *  @this {XML3D.tools.util.Map}
         *  @param {Object} key
         *  @return {Array.<Object>} values
         */
        getNext: function(key) {

            this._assertHas(key);

            var containerIdx = this._indexOfContainer(key);
            containerIdx = (containerIdx+1) % this.size();

            return this._containers[containerIdx].values;
        },

        /** Retrieve the values that correspond to the key next to the
         *  given one on the left side. Since the underlying container object
         *  is an array, this is the index of the given key minus one.
         *
         *  @this {XML3D.tools.util.Map}
         *  @param {Object} key
         *  @return {Array.<Object>} values
         */
        getPrevious: function(key) {

            this._assertHas(key);

            var containerIdx = this._indexOfContainer(key);
            containerIdx = (containerIdx-1) % this.size();

            return this._containers[containerIdx].values;
        },

        /** Map the given function to all values of the given key.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@param {function(Object)} fn the argument is the value of the given object
         */
        mapValues: function(key, fn) {

            var containerIdx = this._indexOfContainer(key);
            if(containerIdx < 0) return;

            var c = this._containers[containerIdx];

            for(var i = 0; i < c.values.length; i++) {
                fn(c.values[i]);
            }
        },

        /** Checks if the given key has an entry and throws an exception if that's not
         *  the case.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         *  @private
         */
        _assertHas: function(key) {

            if(!this.has(key)) {
                throw new Error("XML3D.tools.util.Map: no entry present for given key");
            }
        },

        /**
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@return {number} the index of the given key in the container array
         *  @private
         */
        _indexOfContainer: function(key) {

            for(var i = 0; i < this._containers.length; i++) {
                if(this._containers[i].key === key) {
                    return i;
                }
            }

            return -1;
        },

        /** Removes a single value from the given key. If the key contains
         *  no values afterwards it is removed from the map.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@param {Object} value
         * 	@private
         */
        _removeValue: function(key, value) {

            var containerIdx = this._indexOfContainer(key);
            if(containerIdx < 0) return;

            var c = this._containers[containerIdx];

            var idx = c.values.indexOf(value);
            if(idx < 0) return;

            c.values.splice(idx, 1);

            if(c.values.length < 1)
                this._removeKey(key);
        },

        /** Removes the key and all of it's values from the map.
         *
         *  @this {XML3D.tools.util.Map}
         * 	@param {Object} key
         * 	@private
         */
        _removeKey: function(key) {

            var containerIdx = this._indexOfContainer(key);
            if(containerIdx < 0) return;

            this._containers.splice(containerIdx, 1);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    /** Offers a single function, newID(), which creates an ID that
     *  was not used before in the instance of this class. The created ID is a
     *  string.
     */
    XML3D.tools.util.IDGenerator = new XML3D.tools.Class({

        /**
         *  @this {XML3D.tools.util.IDGenerator}
         */
        initialize: function() {
            this._id = 0;
        },

        /**
         *  @this {XML3D.tools.util.IDGenerator}
         *  @return {string} a new id
         */
        newID: function() {
            var freshId = "" + this._id;
            this._id++;
            return freshId;
        },

        /**
         *  @this {XML3D.tools.util.IDGenerator}
         */
        reset: function() {
            this._id = 0;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.util");

    /** The HTML mouse click event is raised whenever a mouseup is followed by a mousedown.
     *  However this is not expected behavior because in addition we want that the mouse positions
     *  are the same in down and up events. (else it's actually a dragging operation, not a click).
     *
     *  This class fixes this behavior. Give it an element and a callback, which will be invoked
     *  when a "real" click happens.
     */
    XML3D.tools.util.MouseClickEventProvider = new XML3D.tools.Class({

        _mouseDownX: 0,
        _mouseDownY: 0,
        _mouseUpX: 0,
        _mouseUpY: 0,

        _onClickHandler: function(evt) {},

        /**
         * @param targetElement
         * @param {function(window.MouseEvent)} onClickHandler will receive the click event as argument
         */
        initialize: function(targetElement, onClickHandler) {
            this._onClickHandler = onClickHandler;
            targetElement.addEventListener("mousedown", this.callback("_onMouseDown"));
            targetElement.addEventListener("mouseup", this.callback("_onMouseUp"));
            targetElement.addEventListener("click", this.callback("_onClick"));
        },

        _onMouseDown: function(evt) {
            this._mouseDownX = evt.screenX;
            this._mouseDownY = evt.screenY;
        },

        _onMouseUp: function(evt) {
            this._mouseUpX = evt.screenX;
            this._mouseUpY = evt.screenY;
        },

        _onClick: function(evt) {
            if(this._mouseDownX === this._mouseUpX
            && this._mouseDownY === this._mouseUpY) {
                this._onClickHandler(evt);
            }
        }
    });
}());
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function(){

    "use strict";

    /** Provides a method isPressed(key) to check whether a key is currently pressed.
     *  This removes the need to setup callbacks for keydown/up events and managing
     *  a "currently pressed keys" array for yourself.
     *
     *  @constructor
     */
    XML3D.tools.KeyboardState = new XML3D.tools.Singleton({

        /**
         *  @this {XML3D.tools.KeyboardState}
         *  @public
         */
        initialize: function()
        {
            /** map keyvalue => boolean */
            this._currentlyPressedKeys = {};

            document.addEventListener("keydown", this._onKeyDown.bind(this));
            document.addEventListener("keyup", this._onKeyUp.bind(this));
        },

        /**
         *  @this {XML3D.tools.KeyboardState}
         *  @public
         */
        isPressed: function(key)
        {
            return this._currentlyPressedKeys[key];
        },

        // --- Callbacks ---

        /**
         *  @this {XML3D.tools.KeyboardState}
         *  @private
         */
        _onKeyDown: function(evt)
        {
            this._currentlyPressedKeys[evt.keyCode] = true;
        },

        /**
         *  @this {XML3D.tools.KeyboardState}
         *  @private
         */
        _onKeyUp: function(evt)
        {
            this._currentlyPressedKeys[evt.keyCode] = false;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
/**
 * User: ebersold
 * Date: 10/23/12
 * Time: 12:34 PM
 */

(function () {

    "use strict";

	/**
	 * A GamepadAttribute
	 * @param name {string}
	 * @param value {number}
	 * @constructor
	 */
	function GamepadAttribute(name, value) {
		this.name = name;
		this.value = value;
	}

	/**
	 * Gamepad
	 * @constructor
	 */
	var Gamepad = new XML3D.tools.Class({

        initialize: function(status) {
            this.timestamp = status.timestamp;
            this.id = status.id;
            this.index = status.index;
        },

        /**
         * @abstract
         * @param newStatus
         */
        updateStatus: function (newStatus) { },

        getId: function () {
            return this.id;
        },

        getIndex: function () {
            return this.index;
        },

        dispatchButtonEvent: function (attribute) {
            var eventName = attribute.value ? "GamepadButtonDown" : "GamepadButtonUp";
            var detail = {
                button: attribute.name,
                value: attribute.value,
                padID: this.index
            };
            this.dispatchCustomEvent(eventName, detail);
        },

        dispatchAxisEvent: function (attribute) {
            var eventName = "GamepadAxis";
            var detail = {
                axis: attribute.name,
                value: attribute.value,
                padID: this.index
            };
            this.dispatchCustomEvent(eventName, detail);
        },

        dispatchCustomEvent: function (eventName, detail) {
            var options = {
                detail: detail,
                bubbles: true,
                cancelable: false
            };
            var event = new window.CustomEvent(eventName, options);
            document.dispatchEvent(event);
        }
    });

    /**
     * XBox360Gamepad
     * @extends Gamepad
     * @constructor
     */
    var XBox360Gamepad = new XML3D.tools.Class(Gamepad, {

        initialize: function(status) {
            this.callSuper(status);

            this.buttons = [];
            this.axes = [];
            this.initButtons(status);
            this.initAxes(status);
        },

        initButtons: function (status) {
            this.buttons.push(new GamepadAttribute("A", status.buttons[0]));
            this.buttons.push(new GamepadAttribute("B", status.buttons[1]));
            this.buttons.push(new GamepadAttribute("X", status.buttons[3]));
            this.buttons.push(new GamepadAttribute("Y", status.buttons[2]));
            this.buttons.push(new GamepadAttribute("LB", status.buttons[4]));
            this.buttons.push(new GamepadAttribute("RB", status.buttons[5]));
            this.buttons.push(new GamepadAttribute("LT", status.buttons[6]));
            this.buttons.push(new GamepadAttribute("RT", status.buttons[7]));
            this.buttons.push(new GamepadAttribute("Back", status.buttons[8]));
            this.buttons.push(new GamepadAttribute("Start", status.buttons[9]));
            this.buttons.push(new GamepadAttribute("LeftStickClick", status.buttons[10]));
            this.buttons.push(new GamepadAttribute("RightStickClick", status.buttons[11]));
            this.buttons.push(new GamepadAttribute("Up", status.buttons[12]));
            this.buttons.push(new GamepadAttribute("Down", status.buttons[13]));
            this.buttons.push(new GamepadAttribute("Left", status.buttons[14]));
            this.buttons.push(new GamepadAttribute("Right", status.buttons[15]));
        },

        initAxes: function (status) {
            this.axisEpsilon = 0.001;
            this.axes.push(new GamepadAttribute("LeftStickX", status.axes[0]));
            this.axes.push(new GamepadAttribute("LeftStickY", status.axes[1]));
            this.axes.push(new GamepadAttribute("RightStickX", status.axes[2]));
            this.axes.push(new GamepadAttribute("RightStickY", status.axes[3]));
        },

        updateStatus: function (newStatus) {
            if (newStatus.timestamp === this.timestamp ||
                newStatus.index !== this.index ||
                newStatus.id !== this.id) {
                return;
            }
            this.updateButtons(newStatus);
            this.updateAxes(newStatus);
        },

        updateButtons: function (newStatus) {
            for(var i=0; i<this.buttons.length; i++){
                if(this.buttons[i].value !== newStatus.buttons[i]){
                    this.buttons[i].value = newStatus.buttons[i];
                    this.dispatchButtonEvent(this.buttons[i]);
                }
            }
        },

        updateAxes: function (newStatus) {
            for(var i=0; i<this.axes.length; i++){
                if(newStatus[i] !== this.axes[i].value && Math.abs(this.axes[i].value - newStatus.axes[i]) > this.axisEpsilon){
                    this.axes[i].value = newStatus.axes[i];
                    this.dispatchAxisEvent(this.axes[i]);
                }
            }
        }
    });

    var UnknownControllerIdError = new XML3D.tools.Class({

        initialize: function(controllerId) {
            this.controllerId = controllerId;
        }
    });

	/**
	 * GamepadConnector - Singleton
	 * This whole module will only work with Chrome 21 (or higher)
	 * @private
	 * @constructor
	 */
    XML3D.tools.GamepadEventProvider = new XML3D.tools.Singleton({

        enable: function() {
            if (!this._gamepadApiAvailable()) {
                console.log("No Gamepad API available");
                return;
            }

            this.pollingInProgress = false;
            this.pads = [];
            this._startPolling();
        },

        disable: function() {
            this.pollingInProgress = false;
        },

        _startPolling: function() {
            if (!this.pollingInProgress) {
                this.pollingInProgress = true;
                this._onePoll();
            }
        },

        _gamepadApiAvailable: function() {
            return !!navigator.webkitGetGamepads || !!navigator.webkitGamepads;
        },

        _onePoll: function() {
            var newStatusData = this._getNewStatusDataFromAPI();
            if (!newStatusData) {
                console.log("Cannot retrieve gamepad data");
                return;
            }
            this._processNewStatusData(newStatusData);
            this._nextPoll();
        },

        _getNewStatusDataFromAPI: function() {
            return (navigator.webkitGetGamepads && navigator.webkitGetGamepads()) || navigator.webkitGamepads;
        },

        _processNewStatusData: function(newStatusData) {
            this._handleNewlyConnectedGamepads(newStatusData);
            this._handleDisconnectedGamepads(newStatusData);
            this._updateGamepads(newStatusData);
        },

        _handleNewlyConnectedGamepads: function (newStatusData) {
            for (var i=0; i<newStatusData.length; i++) {
                if(!newStatusData[i]) {
                    continue;
                }
                this._handleNewlyConnectedGamepad(newStatusData[i]);
            }
        },

        _handleNewlyConnectedGamepad: function(statusData) {
            var index = statusData.index;
            if(index === undefined || this.pads[index] !== undefined){
                return;
            }

            try {
                this.pads[index] = this._createNewGamepad(statusData);
            } catch(error) {
                if(!error.controllerId) {
                    throw error;
                }
                console.log("Unknown controller id: " + error.controllerId);
                this.pads[index] = null;
            }
        },

        _createNewGamepad: function (newGamepadData) {
            var id = newGamepadData.id;
            if(id.indexOf("Xbox 360 Controller") !== -1){
                return new XBox360Gamepad(newGamepadData);
            }
            throw new UnknownControllerIdError(id);
        },

        _handleDisconnectedGamepads: function (newStatusData) {
            for(var i=0; i<this.pads.length; i++){
                if(!this.pads[i]){
                    continue;
                }
                var index = this.pads[i].getIndex();
                if( !newStatusData[index] ){
                    this.pads[index] = undefined;
                }
            }
        },

        _updateGamepads: function (newStatusData) {
            for(var i=0; i<this.pads.length; i++){
                if(!this.pads[i]){
                    continue;
                }
                var index = this.pads[i].getIndex();
                this.pads[i].updateStatus(newStatusData[index]);
            }
        },

        _nextPoll: function () {
            if(!this.pollingInProgress){
                return;
            }
            if(window.requestAnimFrame){
                window.requestAnimFrame(this._onePoll.bind(this), undefined);
            }
            else if(window.requestAnimationFrame){
                window.requestAnimationFrame(this._onePoll.bind(this), undefined);
            }
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

	/**
	 * A CombinedAnimation
	 */
    XML3D.tools.CombinedAnimation = new XML3D.tools.Class({

        initialize: function(name, opt)
        {
            /**
             * name of animation
             * @type {string}
             */
            this.name = name;

            /**
             * Animations array
             * Stores animation and their options
             * @private
             * type{Array.<{animation: Animation, opt:{duration: number|undefined, loop: number|undefined, delay: number|undefined, easing: function|undefined, callback: function|undefined}|undefined, boolean: callbackCalled}>}
             */
            this._animations = [];

            /**
             * Counter of finished child animations
             * @private
             * @type {number}
             */
            this._finishedAnimationsCounter = 0;

            //options - set defaults
            /**
             * loop
             * @private
             * @type {number}
             */
            this._loop = 1;
            /**
             * delay
             * @private
             * @type{number}
             */
            this._delay = 0;
            /**
             * Duration of the animation
             * @private
             * @type {number}
             */
            this.duration = 1000;
            /**
             * easing
             * @private
             * @type {Function}
             */
            this._easing = TWEEN.Easing.Linear.None;
            /**
             * Callback, executed as soon as the animation ended
             * @private
             * @type {Function}
             */
            this._callback = function(){};
            if(opt){
                this.setOptions(opt);
            }
        },

        /**
         * Adds an animation
         * @param {Animation} animation
         * @param { {duration: number, loop: number, delay: number, easing: Function, callback: Function}|undefined } opt
         * @return this
         */
        addAnimation: function(animation, opt)
        {
            this._animations.push({
                animation: animation,
                opt: XML3D.tools.mergeOptions(opt, animation.getOptions()),
                callbackCalled: false
            });

            //adopt duration correctly
            var needed_duration = opt.duration*opt.loop + opt.delay;
            if(this.duration < needed_duration)
                this.duration = needed_duration;

            return this;
        },

        /** @inheritDoc */
        applyAnimation: function(animatable, overAllCurrentTime, overAllStartTime/*0*/, overAllendTime, combinedEasing)
        {
            var animations = this._animations;
            for(var i = 0; i < animations.length; i++)
                this._applySingleAnimation(animatable, animations[i], overAllCurrentTime, overAllStartTime);
        },

        _applySingleAnimation: function(animatable, animation, overAllCurrentTime, overAllStartTime)
        {
            var opt = animation.opt;
            overAllCurrentTime = overAllCurrentTime - opt.delay;

            if(overAllCurrentTime < 0 || animation.callbackCalled)
                return;

            var duration = opt.duration;
            var animationCount =   Math.floor(overAllCurrentTime/duration);
            var currentTime = overAllCurrentTime - duration*animationCount;

            if(overAllCurrentTime < duration * opt.loop)
            {
                animation.animation.applyAnimation(animatable, currentTime,
                    overAllStartTime, duration, opt.easing);
                //combinedEasing is animation.getOption("easing"), which means, that we have this in the options if there was no easing added while addAnimation()
            }
            else
                this._finishAnimation(animation);
        },

        _finishAnimation: function(animation) {
            animation.opt.callback();
            this._finishedAnimationsCounter++;
            if(this._finishedAnimationsCounter === this._animations.length)
                this._resetFlags();
        },

        /** @inheritDoc */
        setOptions: function(opt)
        {
            if(opt.loop)
                this._loop = opt.loop;
            if(opt.duration)
                this.duration = opt.duration;
            if(opt.easing && typeof(opt.easing) === "function")
                this._easing = opt.easing;
            if(opt.callback && typeof(opt.callback) === "function")
                this._callback = opt.callback;
        },

        /** @inheritDoc */
        getOptions: function()
        {
            return {
                duration: this.duration,
                loop: this._loop,
                delay: this._delay,
                easing: this._easing,
                callback: this._callback
            };
        },

        /**
         * Resetflags of the child animations
         * @private
         */
        _resetFlags: function()
        {
            for(var i = 0; i < this._animations.length; i++)
                this._animations[i].callbackCalled = false;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    /**
     *  Constraint that allows everything. Useful for Constraints that just want
     *  to constraint a specific operation, e.g. rotation or translation.
     *
     *  @constructor
     *  @implements {Constraint}
     */
    XML3D.tools.DefaultConstraint = new XML3D.tools.Class({

        /** @inheritDoc */
        constrainRotation: function(newRotation, opts){
            return true;
        },

        /** @inheritDoc */
        constrainTranslation: function(newPosition, opts){
            return true;
        },

        constrainScaling: function(newScale, opts){
            return true;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /**
     * ConstraintCollection
     * Combines a number of constraints
     * @constructor
     * @implements {Constraint}
     */
    XML3D.tools.ConstraintCollection = new XML3D.tools.Class({

        /**
         * @param {Array.<Constraint>|undefined} constraints
         * @param {boolean} breakEarly do not check all constraints if one fail
         */
        initialize: function(constraints, breakEarly){
            /**
             * Collection of Contraints
             * @private
             * @type {Array.<Constraint>|undefined}
             */
            this.constraints = constraints == undefined ? [] : constraints;
            /**
             * break early flag
             * @private
             * @type{boolean}
             */
            this.breakEarly = (breakEarly !== undefined) ? breakEarly : true;
        },

        /** @inheritDoc */
        constrainRotation: function(newRotation, opts){
            var constraints = this.constraints;
            var length = constraints.length;
            var i = 0;
            var ret = true;
            var breakEarly = this.breakEarly;

            while( i<length && (ret || !breakEarly) ){
                ret = ret && constraints[i].constrainRotation(newRotation, opts);
                i++;
            }
            return ret;
        },

        /** @inheritDoc */
        constrainTranslation: function(newPosition, opts){
            var constraints = this.constraints;
            var length = constraints.length;
            var i = 0;
            var ret = true;
            var breakEarly = this.breakEarly;
            while( i<length && (ret || !breakEarly) ){
                ret = ret && constraints[i].constrainTranslation(newPosition, opts);
                i++;
            }
            return ret;
        },

        /** @inheritDoc */
        constraintScaling: function(newScale, opts) {
            var constraints = this.constraints;
            var length = constraints.length;
            var i = 0;
            var ret = true;
            var breakEarly = this.breakEarly;
            while( i<length && (ret || !breakEarly) ){
                ret = ret && constraints[i].constraintScaling(newScale, opts);
                i++;
            }
            return ret;
        },

        /**
         * Adds a constraint to the collection
         * @param {Constraint} constraint
         */
        addConstraint: function(constraint){
            this.constraints.push(constraint);
        },

        /**
         * Removes a constraint from the collection
         * @param {Constraint} constraint
         */
        removeContraint: function(constraint){
            var i = this.constraints.indexOf(constraint);
            //indexOf returns -1 if item was not found
            if(i !== -1) this.constraints.splice(i,1);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    /**
     * SimpleConstraint
     * @constructor
     * @implements {Constraint}
     */
    XML3D.tools.SimpleConstraint = new XML3D.tools.Class({

        /**
         * @param {boolean} [allowedToMove]
         * @param {boolean} [allowedToRotate]
         * @param {boolean} [allowedToScale]
         */
        initialize: function(allowedToMove, allowedToRotate, allowedToScale){
            /**
             * allowed to move
             * @private
             * @type {boolean}
             */
            this.allowedToMove = (allowedToMove !== undefined) ? allowedToMove : true;
            /**
             * allowed to Rotate
             * @private
             * @type {boolean}
             */
            this.allowedToRotate = (allowedToRotate !== undefined) ? allowedToRotate : true;
            /**
             * allowed to scale
             * @private
             * @type {boolean}
             */
            this.allowedToScale = (allowedToScale !== undefined) ? allowedToScale: true;
        },

        /** @inheritDoc */
        constrainRotation: function(newRotation, opts){
            return this.allowedToRotate;
        },

        /** @inheritDoc */
        constrainTranslation: function(newPosition, opts){
            return this.allowedToMove;
        },

        constrainScaling: function(newScale, opts){
            return this.allowedToScale;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /**
     * ProhibitAxisMovementConstraint
     * prohibit axismovement, but allow movement around an epsilon of a specified center
     * @constructor
     * @implements {Constraint}
     */
    XML3D.tools.ProhibitAxisMovementConstraint = new XML3D.tools.Class({

        /**
         * @param {Boolean} x prohibit x axis
         * @param {Boolean} y prohibit y axis
         * @param {Boolean} z prohibit z axis
         * @param {number} epsilon
         * @param {number} center
         */
        initialize: function(x,y,z, epsilon, center){
            /**
             * prohibit x axis
             * @private
             * @type {Boolean}
             */
            this.x = x;
            /**
             * prohibit y axis
             * @private
             * @type {Boolean}
             */
            this.y = y;
            /**
             * prohibit z axis
             * @private
             * @type {Boolean}
             */
            this.z = z;
            /**
             * epsilon
             * @private
             * @type {number}
             */
            this.epsilon = epsilon ? epsilon : 0;
            /**
             * center
             * @private
             * @type {number}
             */
            this.center =  center ? center : 0;

        },

        /** @inheritDoc */
        constrainRotation: function(newRotation, opts){
            return true;
        },

        /** @inheritDoc */
        constrainTranslation: function(newPosition, opts){
            if(!opts || !opts.transformable)
                throw "ProhibitAxisMovementConstraint.constrainTranslation: no transformable in options given.";

            var center = this.center;
            var epsilon = this.epsilon;
            var currentPosition = opts.transformable.getPosition();

            if(this.x && Math.abs(center - newPosition.x) > epsilon) newPosition.x = currentPosition.x;
            if(this.y && Math.abs(center - newPosition.y) > epsilon) newPosition.y = currentPosition.y;
            if(this.z && Math.abs(center - newPosition.z) > epsilon) newPosition.z = currentPosition.z;

            return true;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /**
     * BoxedTranslationConstraint
     *
     * Constrains the translation to a box. Translation values outside are clipped.
     *
     * @implements {Constraint}
     * @constructor
     */
    XML3D.tools.BoxedTranslationConstraint = new XML3D.tools.Class({

        /**
         * @param {XML3DBox} [box] the box constraint. Default: infinitely large box, i.e. no constraint
         */
        initialize: function(box){

            /**
             * The box within which the translation is to be performed.
             * @private
             * @type {XML3DBox}
             */
            this.box = null;

            if(box)
                this.box = new window.XML3DBox(box);
            else
            {
                var min = new window.XML3DVec3(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                var max = new window.XML3DVec3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);

                this.box = new window.XML3DBox(min, max);
            }
        },

        /** @inheritDoc */
        constrainTranslation: function(newTranslation){

            var t = newTranslation;

            t.x = this.clipValue(t.x, this.box.min.x, this.box.max.x);
            t.y = this.clipValue(t.y, this.box.min.y, this.box.max.y);
            t.z = this.clipValue(t.z, this.box.min.z, this.box.max.z);

            return true;
        },

        /** @inheritDoc */
        constrainRotation: function(newRotation){
            return true;
        },

        /** @inheritDoc */
        constrainScaling: function(newScale){
            return true;
        },

        /** Clips a single value by min and maximum value. It returns
         *  the value within the range of min and max.
         *
         *  @param {number} value the value to clip
         *  @param {number} min
         *  @param {number} max
         *  @return {number}
         *
         *  @private
         */
        clipValue: function(value, min, max){
            if(value < min)
                return min;
            if(value > max)
                return max;
            return value;
        }
    });
}());
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function(){

    /**
     * CascadedConstraint
     * Establishes a parent-child relationship between two given constraints.
     * That means at first the child constraint is applied and afterwards the
     * parent constraint, on the already modified value of the child.
     *
     * @constructor
     * @implements {Constraint}
     */
    XML3D.tools.CascadedConstraint = new XML3D.tools.Class({

        /**
         * @param {Constraint} parentConstraint
         * @param {Constraint} childConstraint
         */
        initialize: function(parentConstraint, childConstraint)
        {
            this._parentConstraint = parentConstraint;
            this._childConstraint = childConstraint;
        },

        /** @inheritDoc */
        constrainRotation: function(newRotation, opts)
        {
            if(!this._childConstraint.constrainRotation(newRotation, opts))
                return false;

            return this._parentConstraint.constrainRotation(newRotation, opts);
        },

        /** @inheritDoc */
        constrainTranslation: function(newPosition, opts)
        {
            if(!this._childConstraint.constrainTranslation(newPosition, opts))
                return false;

            return this._parentConstraint.constrainTranslation(newPosition, opts);
        },

        /** @inheritDoc */
        constrainScaling: function(newScale, opts)
        {
            if(!this._childConstraint.constrainScaling(newScale, opts))
                return false;

            return this._parentConstraint.constrainScaling(newScale, opts);
        }
    });
}());
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function(){

    /** This constraint will make sure that the target is translated along the surface only.
     *  For that a ray will be casted in front of the object to find the surface height and then
     *  the height of the target will be set to the height of the surface.
     *
     *  @constructor
     *  @extends {XML3D.tools.DefaultConstraint}
     */
    XML3D.tools.AlongSurfaceTranslationConstraint = new XML3D.tools.Class(
        XML3D.tools.DefaultConstraint,
    {
        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @override
         *  @public
         */
        initialize: function(targetTransformable)
        {
            this._target = targetTransformable;
            this._enabled = true;
            this._xml3d = XML3D.tools.util.getXml3dRoot(this._target.object);
            XML3D.tools.util.fireWhenMeshesLoaded(this._target.object, this._initWhenTargetReady.bind(this));
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @private
         */
        _initWhenTargetReady: function()
        {
            this._sceneHeight = this._xml3d.getBoundingBox().max.y;
            this._oldPosition = null;
            this._rayDirection = new XML3DVec3(0, -1, 0);
            this._initialHeight = this._target.getPosition().y;

            var bbox = XML3D.tools.util.getWorldBBox(this._target.object);
            var bboxSize = bbox.size();

            // take bbox half of diagonal of xz-plane as radius
            // xz-plane: gonna translate along that plane only
            this._boundingSphereRadius = Math.sqrt(bboxSize.x*bboxSize.x + bboxSize.z*bboxSize.z) / 2;

            this._resetTranslationDirection();
            this._initialSurfaceHeight = this._getSurfaceHeight();
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @private
         */
        _resetTranslationDirection: function()
        {
            this._translationDirection = new XML3DVec3(0, 0, 1);
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @public
         */
        enable: function()
        {
            this._enabled = true;
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @public
         */
        disable: function()
        {
            this._enabled = false;
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @override
         *  @public
         */
        constrainTranslation: function(newPosition, opts)
        {
            if(!this._enabled)
                return true;

            if(!opts.transformable)
            {
                console.log("AlongSurfaceTranslationConstraint: no transformable given. Won't apply any constraint.");
                return true;
            }

            var surfaceHeight = this._getSurfaceHeight();
            if(surfaceHeight === null)
                return true;

            /* we can't simply add the surface height, we also have to be aware of the initial
             * surface height that might already be given. If it's not zero we have to subtract it
             * else the object will get placed in the air higher and higher.
             */
            newPosition.y = this._initialHeight + (surfaceHeight - this._initialSurfaceHeight);
            this._updateTranslationDirection(newPosition);

            return true;
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @private
         */
        _getSurfaceHeight: function()
        {
            var rayOrigin = this._getRayOrigin();
            var ray = new XML3DRay(rayOrigin, this._rayDirection);
            var hitPoint = new XML3DVec3();

            var hitElement = this._xml3d.getElementByRay(ray, hitPoint);
            if(!hitElement)
                return null;

            if(!this._target.object.parentNode.getWorldMatrix)
                return hitPoint.y;

            // transform hit point from world to local space
            var worldToLocalMatrix = this._target.object.parentNode.getWorldMatrix().inverse();
            hitPoint = worldToLocalMatrix.multiplyPt(hitPoint);
            return hitPoint.y;
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @private
         */
        _getRayOrigin: function()
        {
            // offset the origin to be outside the target in the translation direction
            var rayOriginOffset = this._translationDirection.scale(this._boundingSphereRadius + 0.1);
            rayOriginOffset.y += this._sceneHeight;

            // add the offset to the position of the target
            var objectCenter = XML3D.tools.util.getWorldBBox(this._target.object).center();
            return objectCenter.add(rayOriginOffset);
        },

        /**
         *  @this {XML3D.tools.AlongSurfaceTranslationConstraint}
         *  @private
         */
        _updateTranslationDirection: function(newPosition)
        {
            if(!this._oldPosition)
            {
                this._oldPosition = new XML3DVec3(newPosition);
                return;
            }

            if(newPosition.equals(this._oldPosition))
            {
                this._resetTranslationDirection();
                return;
            }

            var localDirection = newPosition.subtract(this._oldPosition);
            var localToWorldMatrix = this._target.object.getWorldMatrix();
            this._translationDirection = localToWorldMatrix.multiplyDir(localDirection);
            this._translationDirection = this._translationDirection.normalize();
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /** Base class for other behaviors. There's not "the" idea behind it, but rather
     *  a collection of methods that are the same for all behaviors.
     *
     *  @constructor
     */
    XML3D.tools.CameraBehavior = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object=} options
         *
         *  options:
         *  o moveSpeed
         */
        initialize: function(targetViewGroup, options) {

            this.callSuper();

            this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            this._rotateSpeed = 1;

            if(options !== undefined && options.rotateSpeed !== undefined)
                this._rotateSpeed = options.rotateSpeed;
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {window.XML3DRotation} orientation
         *  @return {boolean} true if the rotate action was actually performed
         */
        rotate: function(orientation) {

            var eulerAngles = orientation.toEulerAngles();
            return this.rotateByAngles(eulerAngles.x, eulerAngles.y);
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {number} xAxisAngle in radians
         *  @param {number} yAxisAngle in radians
         *  @return {boolean} true if the rotate action was actually performed
         *
         */
        rotateByAngles: function(xAxisAngle, yAxisAngle) {

            var newOrientation = this.getNewCameraOrientation(xAxisAngle, yAxisAngle);
            return this.target.setOrientation(newOrientation);
        },

        /** Resets the camera pose to look at the whole scene.
         *
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {number=} distanceToSceneCenter. Default: scene's aabb diagonal
         */
        lookAtScene: function(distanceToSceneCenter) {

            var sceneCenter = new XML3DVec3();

            var scene = XML3D.tools.util.getXml3dRoot(this.target.object);
            var bb = scene.getBoundingBox();
            if(!bb.isEmpty()) {
                sceneCenter.set(bb.center());

                if(distanceToSceneCenter === undefined) {
                    distanceToSceneCenter = bb.size().length();
                }
            }

            this.lookAt(sceneCenter, distanceToSceneCenter);
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {window.XML3DVec3} point
         *  @param {number=} distanceToPoint. Default: position is not affected
         */
        lookAt: function(point, distanceToPoint) {

            var initCamDirection = new XML3DVec3(0, 0, -1);

            var position = this.target.getPosition();
            var posToPoint = new XML3DVec3(0, 0, -1);
            if(!position.equals(point))
                posToPoint.set(point.subtract(position).normalize());

            var dirRot = new XML3DRotation();
            dirRot.setRotation(initCamDirection, posToPoint);

            this.target.setOrientation(dirRot);

            if(distanceToPoint !== undefined) {
                var pointToPos = posToPoint.negate().scale(distanceToPoint);
                this.target.setPosition(point.add(pointToPos));
            }
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @return {number}
         */
        getRotationSpeed: function() {
            return this._rotateSpeed;
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @param {number} speed
         */
        setRotationSpeed: function(speed) {
            this._rotateSpeed = speed;
        },

        /**
         *  @this {XML3D.tools.CameraBehavior}
         *  @return {window.XML3DVec3}
         */
        getLookDirection: function() {

            var curRot = this.target.getOrientation();

            var defaultDirection = new window.XML3DVec3(0, 0, -1);
            var lookDirection = curRot.rotateVec3(defaultDirection).normalize();

            return lookDirection;
        },

        /** Calculate and return the camera's orientation with the
         *  given angles applied. The rotation itself is not set in
         *  the camera. This is done in rotateByAngles().
         *
         *  @this {XML3D.tools.CameraBehavior}
         *  @protected
         *  @param {number} xAxisAngle in radians
         *  @param {number} yAxisAngle in radians
         *  @return {window.XML3DRotation}
         */
        getNewCameraOrientation: function(xAxisAngle, yAxisAngle) {

            xAxisAngle *= this._rotateSpeed;
            yAxisAngle *= this._rotateSpeed;

            var mx = new window.XML3DRotation(new window.XML3DVec3(1, 0, 0), xAxisAngle);
            var my = new window.XML3DRotation(new window.XML3DVec3(0, 1, 0), yAxisAngle);

            var currentOrient = this.target.getOrientation();
            return my.multiply(currentOrient.multiply(mx));
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This behavior will provide "examine" mode camera control on the given
     *  target transformable.
     *  This behavior does have no notion of the interaction device. All it needs
     *  are deltaX and deltaY values, from which it computes the camera pose.
     *
     *  Usage: call dolly() and rotate().
     *
     *  @constructor
     */
    XML3D.tools.ExamineBehavior = new XML3D.tools.Class(XML3D.tools.CameraBehavior, {

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o rotateSpeed, default 1
         *  o dollySpeed, default 1
         *  o examineOrigin, default: scene's bounding box center on which lookAtScene() is called
         *  o examineOriginResetDistance: default 1. When the target's transformation changes
         *      the internal state needs to be updated. The examination origin is set by offsetting
         *      it by a factor into the camera's forward direction. That factor is this option.
         *
         *  o {min,max}DistanceToExamineOrigin: default {Number.MIN_VALUE, Number.MAX_VALUE},
         *      minimum and maximum distance to the examination origin
         */
        initialize: function(targetViewGroup, options) {

            this.callSuper(targetViewGroup, options);

            /** @private */
            this._targetScene = XML3D.tools.util.getXml3dRoot(this.target.object);

            /** @private */
            this._dollySpeed = 1;

            /** @private */
            this._initialExamineOriginSet = false;

            /** @private */
            this._examineOrigin = new window.XML3DVec3();

            /** @private */
            this._dollyCoefficient = 1;

            /** @private */
            this._minDistanceToExamineOrigin = 0.1;
            /** @private */
            this._maxDistanceToExamineOrigin = Number.MAX_VALUE;

            /** @private */
            this._examineOriginResetDistance = 10;
            /** @private */
            this._distanceToExamineOrigin = 0;

            /** Helper to keep track when we are changing our own transformation.
             *  Since we will update internal values when the transformation changes
             *  from outside we have to know when not to do this.
             *
             *  @private
             */
            this._doOwnTransformChange = false;

            /** @private */
            this._targetTracker = new XML3D.tools.TransformTracker(this.target.object);
            this._targetTracker.xfmChanged = this.callback("_onTargetXfmChanged");

            this._parseOptions(options);

            this._updateDistanceToExamineOrigin();
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @inheritDoc
         */
        onAttach: function() {
            XML3D.tools.util.fireWhenMeshesLoaded(this.target.object, this.callback("_updateDollyCoefficient"));

            if(this._initialExamineOriginSet)
                this.lookAt(this._examineOrigin);

            this._doOwnTransformChange = true;
            this._targetTracker.attach();
            this._doOwnTransformChange = false;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @inheritDoc
         */
        onDetach: function() {
            this._targetTracker.detach();
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @return {window.XML3DVec3}
         */
        getExamineOrigin: function() {
            return new window.XML3DVec3(this._examineOrigin);
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @return {number}
         */
        getDollySpeed: function() {
            return this._dollySpeed;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @return {number}
         */
        getResetDistanceToExamineOrigin: function() {
            return this._examineOriginResetDistance;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @param {number} newDistance
         */
        setResetDistanceToExamineOrigin: function(newDistance) {
            this._examineOriginResetDistance = newDistance;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @param {number} newMinDistance
         */
        setMinDistanceToExamineOrigin: function(newMinDistance) {
            this._minDistanceToExamineOrigin = newMinDistance;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @param {number} newMaxDistance
         */
        setMaxDistanceToExamineOrigin: function(newMaxDistance) {
            this._maxDistanceToExamineOrigin = newMaxDistance;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         */
        getMinDistanceToExamineOrigin: function() {
            return this._minDistanceToExamineOrigin;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         */
        getMaxDistanceToExamineOrigin: function() {
            return this._maxDistanceToExamineOrigin;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @inheritDoc
         *  @param {number=} distanceToPoint. Default: examine origin reset distance
         */
        lookAt: function(point, distanceToPoint) {

            if(distanceToPoint === undefined)
                distanceToPoint = this._examineOriginResetDistance;

            this._doOwnTransformChange = true;
            this.callSuper(point, distanceToPoint);
            this._doOwnTransformChange = false;

            this._setExamineOrigin(point);
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @param {number} delta the value of how much to dolly from the current pose
         *  @return {boolean} true if the dolly action was actually performed
         */
        dolly: function(delta) {

            var scaledDelta = this._dollySpeed * this._dollyCoefficient * delta;
            var currentScale = this._getDistanceToExamineOrigin();
            var totalScale = this._clampDistanceToExamineOrigin(scaledDelta + currentScale);

            var translVec = this._rotateInTargetSpace(new window.XML3DVec3(0, 0, totalScale));
            var newPosition = this._examineOrigin.add(translVec);

            if(!this._setTargetPosition(newPosition))
                return false;

            this._updateDistanceToExamineOrigin();

            return true;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @inheritDoc
         */
        rotateByAngles: function(xAxisAngle, yAxisAngle) {

            var newOrientation = this.getNewCameraOrientation(xAxisAngle, yAxisAngle);

            var zAxis = newOrientation.rotateVec3(new XML3DVec3(0,0,1));
            var newViewPos = this._examineOrigin.add(zAxis.scale(this._distanceToExamineOrigin));

            var oldViewPos = this.target.getPosition();
            if(!this._setTargetPosition(newViewPos))
                return false;

            if(!this._setTargetOrientation(newOrientation)) {
                this._setTargetPosition(oldViewPos);
                return false;
            }

            return true;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {Object} options
         */
        _parseOptions: function(options) {

            var options = options || {};
            if(options.dollySpeed !== undefined)
                this._dollySpeed = options.dollySpeed;

            if(options.examineOriginResetDistance !== undefined)
                this._examineOriginResetDistance = options.examineOriginResetDistance;
            else
                this._examineOriginResetDistance = this._getDistanceToExamineOrigin();
            if(options.minDistanceToExamineOrigin !== undefined)
                this._minDistanceToExamineOrigin = options.minDistanceToExamineOrigin;
            if(options.maxDistanceToExamineOrigin !== undefined)
                this._maxDistanceToExamineOrigin = options.maxDistanceToExamineOrigin;

            this._examineOriginResetDistance =
                this._clampDistanceToExamineOrigin(this._examineOriginResetDistance);

            if(options.examineOrigin !== undefined) {
                this._initialExamineOriginSet = true;
                this._examineOrigin.set(options.examineOrigin);

                if(options.examineOriginResetDistance === undefined)
                    this._examineOriginResetDistance = this._getDistanceToExamineOrigin();
            }
            else {
                this._initialExamineOriginSet = false;
                this._resetExamineOrigin();
            }
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         */
        _resetExamineOrigin: function() {
            var scaledDir = this.getLookDirection().scale(this._examineOriginResetDistance);
            this._examineOrigin.set(this.target.getPosition().add(scaledDir));
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         */
        _setExamineOrigin: function(newExamineOrigin) {
            this._examineOrigin.set(newExamineOrigin);
            this._updateDistanceToExamineOrigin();
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         */
        _updateDistanceToExamineOrigin: function() {
            this._setDistanceToExamineOrigin(this._getDistanceToExamineOrigin());
        },

        /**
         *  Set the internal variable _distanceToExamineOrigin to the given distance
         *  and clamping against the bounds.
         *
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {number} distance
         */
        _setDistanceToExamineOrigin: function(distance) {

            this._distanceToExamineOrigin = this._clampDistanceToExamineOrigin(distance);
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {number} distance
         *  @return {number} distance clamped by _{min,max}DistanceToExamineOrigin
         */
        _clampDistanceToExamineOrigin: function(distance) {
            return XML3D.tools.util.clamp(distance, this._minDistanceToExamineOrigin,
                this._maxDistanceToExamineOrigin);
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @return {number} the current distance between the target and the origin
         */
        _getDistanceToExamineOrigin: function() {
            return this._examineOrigin.subtract(this.target.getPosition()).length();
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         */
        _updateDollyCoefficient: function() {
            this._dollyCoefficient = this._targetScene.getBoundingBox().size().length() * 0.5;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         */
        _onTargetXfmChanged: function() {
            if(this._doOwnTransformChange)
                return;

            var position = this.target.getPosition();

            this._setDistanceToExamineOrigin(this._examineOriginResetDistance);
            var forward = this._rotateInTargetSpace(new window.XML3DVec3(0,0,-1));
            forward = forward.scale(this._distanceToExamineOrigin);
            this._examineOrigin.set(position.add(forward));
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {window.XML3DVec3} vec
         *  @return {window.XML3DVec3}
         */
        _rotateInTargetSpace: function(vec) {
            return this.target.getOrientation().rotateVec3(vec);
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {window.XML3DVec3} position
         *  @return {boolean} whether setting was successful
         */
        _setTargetPosition: function(position) {
            this._doOwnTransformChange = true;
            var usePosition = this.target.setPosition(position);
            this._doOwnTransformChange = false;
            return usePosition;
        },

        /**
         *  @this {XML3D.tools.ExamineBehavior}
         *  @private
         *  @param {window.XML3DRotation} orientation
         *  @return {boolean} whether setting was successful
         */
        _setTargetOrientation: function(orientation) {
            this._doOwnTransformChange = true;
            var useOrientation = this.target.setOrientation(orientation);
            this._doOwnTransformChange = false;
            return useOrientation;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This class encapsulates the setup of mouse interaction for the use of camera controllers.
     *  It registers callbacks to the appropriate elements, converts mouse coordinates to be
     *  directly usable by a controller behavior and invokes methods in which users of this class
     *  can perform actions.
     *
     *  Usage:
     *  o instantiate or inherit from this class
     *  o override onDragStart(), onDrag() and onDragEnd() to handle the mouse events
     *  o call attach() at some point to enable the controller
     *
     *  @constructor
     */
    XML3D.tools.MouseController = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.MouseController}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o eventDispatcher
         */
        initialize: function(targetViewGroup, options) {

            var options = options || {};

			this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            /** @private */
            this._targetXml3d = XML3D.tools.util.getXml3dRoot(this.target.object);

            /** @private */
            this._canvasWidth = this._targetXml3d.width || 800;

            /** @private */
            this._canvasHeight = this._targetXml3d.height || 600;

            /** @private */
            this._lastMousePos = {
                x : -1,
                y : -1
            };

            /** @private */
            this._isDragging = false;

            /** @private */
            this._eventDispatcher = null;
            if(options.eventDispatcher)
                this._eventDispatcher = options.eventDispatcher;
            else
                this._eventDispatcher = this._createDefaultEventDispatcher();
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @param {XML3D.tools.util.EventDispatcher} eventDispatcher
         */
        setEventDispatcher: function(eventDispatcher) {
            this._eventDispatcher = eventDispatcher;
        },

        /**
         *  @this {XML3D.tools.MouseController}
         */
        onDragStart: function(action) {},

        /**
         *  @this {XML3D.tools.MouseController}
         */
        onDrag: function(action) {},

        /**
         *  @this {XML3D.tools.MouseController}
         */
        onDragEnd: function(action) {},

        /**
         *  @this {XML3D.tools.MouseController}
         */
        getScene: function() {
            return this._targetXml3d;
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @protected
         *  @override
         */
        onAttach: function() {
            this._toggleAttached(true);
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @protected
         *  @override
         */
        onDetach: function() {
            this._toggleAttached(false);
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _toggleAttached: function(doAttach) {

            var regFn = this._eventDispatcher.on.bind(this._eventDispatcher);

            if(!doAttach) {
                regFn = this._eventDispatcher.off.bind(this._eventDispatcher);
            }

            regFn(this._targetXml3d, "mousedown", this.callback("_onXML3DMouseDown"));
            regFn(document, "mousemove", this.callback("_onDocumentMouseMove"));
            regFn(document, "mouseup", this.callback("_onDocumentMouseUp"));
        },

        // --- Callbacks ---

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _onXML3DMouseDown: function(evt) {
            evt.preventDefault();

            this._isDragging = true;
            this.onDragStart(this._constructAction(evt));
            this._rememberPosition(evt);
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _onDocumentMouseMove: function(evt) {
            if(!this._isDragging)
                return;

            if (evt.target.nodeName.toLowerCase() == "xml3d") {
                evt.preventDefault();
            }

            this.onDrag(this._constructAction(evt));
            this._rememberPosition(evt);
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _onDocumentMouseUp: function(evt) {
            if(!this._isDragging)
                return;

            if (evt.target.nodeName.toLowerCase() == "xml3d") {
                evt.preventDefault();
            }

            this._isDragging = false;
            this.onDragEnd(this._constructAction(evt));
            this._rememberPosition(evt);
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _rememberPosition: function(evt) {
            this._lastMousePos.x = evt.pageX;
            this._lastMousePos.y = evt.pageY;
        },

        // --- Utils ---

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _createDefaultEventDispatcher: function() {

            var disp = new XML3D.tools.util.EventDispatcher();

            disp.registerCustomHandler("mousedown", function(evt){
                if(evt.button === XML3D.tools.MOUSEBUTTON_LEFT
                || evt.button === XML3D.tools.MOUSEBUTTON_RIGHT)
                    return true;

                return false;
            });

            return disp;
        },

        /**
         *  @this {XML3D.tools.MouseController}
         *  @private
         */
        _constructAction: function(evt) {

            var deltaX = (evt.pageX - this._lastMousePos.x) / this._canvasWidth;
            var deltaY = (evt.pageY - this._lastMousePos.y) / this._canvasHeight;

            return {
                evt: evt,
                pos: {x: evt.pageX / this._canvasWidth, y: evt.pageY / this._canvasHeight},
                delta: {x: deltaX, y: deltaY}
            };
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This class encapsulates the setup of touch interaction for the use of camera controllers.
     *  It registers callbacks to the appropriate elements, converts touch coordinates to be
     *  directly usable by a controller behavior and invokes methods in which users of this class
     *  can perform actions.
     *
     *  Usage:
     *  o instantiate or inherit from this class
     *  o override onDragStart(), onDrag() and onDragEnd() to handle the touch events
     *  o call attach() at some point to enable the controller
     *
     *  @constructor
     */
    XML3D.tools.TouchController = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.TouchController}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o eventDispatcher
         */
        initialize: function(targetViewGroup, options) {

            var options = options || {};

			this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            /** @private */
            this._targetXml3d = XML3D.tools.util.getXml3dRoot(this.target.object);

            /** @private */
            this._canvasWidth = this._targetXml3d.width || 800;

            /** @private */
            this._canvasHeight = this._targetXml3d.height || 600;

            /** @private */
			this._lastTouchPositions = new Array();
            this._lastTouchPositions[0] = {
                x : -1,
                y : -1
            };

			/** @private */
            this._lastZoomVectorLength = undefined;

            /** @private */
            this._isDragging = false;

            /** @private */
            this._eventDispatcher = null;
            if(options.eventDispatcher)
                this._eventDispatcher = options.eventDispatcher;
            else
                this._eventDispatcher = this._createDefaultEventDispatcher();
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @param {XML3D.tools.util.EventDispatcher} eventDispatcher
         */
        setEventDispatcher: function(eventDispatcher) {
            this._eventDispatcher = eventDispatcher;
        },

        /**
         *  @this {XML3D.tools.TouchController}
         */
        onDragStart: function(action) {},

        /**
         *  @this {XML3D.tools.TouchController}
         */
        onDrag: function(action) {},

        /**
         *  @this {XML3D.tools.TouchController}
         */
        onDragEnd: function(action) {},

        /**
         *  @this {XML3D.tools.TouchController}
         */
        getScene: function() {
            return this._targetXml3d;
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @protected
         *  @override
         */
        onAttach: function() {
            this._toggleAttached(true);
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @protected
         *  @override
         */
        onDetach: function() {
            this._toggleAttached(false);
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _toggleAttached: function(doAttach) {

            var regFn = this._eventDispatcher.on.bind(this._eventDispatcher);

            if(!doAttach) {
                regFn = this._eventDispatcher.off.bind(this._eventDispatcher);
            }

            regFn(this._targetXml3d, "touchstart", this.callback("_onXML3DTouchStart"));
            regFn(document, "touchmove", this.callback("_onDocumentTouchMove"));
            regFn(document, "touchend", this.callback("_onDocumentTouchEnd"));
            regFn(document, "touchcancel", this.callback("_onDocumentTouchEnd"));
        },

        // --- Callbacks ---

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _onXML3DTouchStart: function(evt) {
            evt.preventDefault();

            this._isDragging = true;
            this.onDragStart(this._constructAction(evt));
            this._rememberPositions(evt);
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _onDocumentTouchMove: function(evt) {
            if (evt.target.nodeName.toLowerCase() == "xml3d") {
                evt.preventDefault();
            }

			if(!this._isDragging)
                return;

            this.onDrag(this._constructAction(evt));
            this._rememberPositions(evt);
        },


        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _onDocumentTouchEnd: function(evt) {
            if (evt.target.nodeName.toLowerCase() == "xml3d") {
                evt.preventDefault();
            }

            if(!this._isDragging)
                return;

            //touch array is possibly undefined for 0 touches
            if (evt.touches.length > 0) {
                this.onDragEnd(this._constructAction(evt));
                this._rememberPositions(evt);
            } else {
                this._isDragging = false;
            }
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _rememberPositions: function(evt) {
            var touchPositions = new Array();
            for (var i=0; i<evt.touches.length; i++) {
                touchPositions[i] = {x: evt.touches[i].pageX, y: evt.touches[i].pageY};
            }
            this._lastTouchPositions = touchPositions;
        },

        // --- Utils ---

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _createDefaultEventDispatcher: function() {

            var disp = new XML3D.tools.util.EventDispatcher();

            disp.registerCustomHandler("touchstart", function(evt){
                if(evt.type === "touchstart")
                    return true;

                return false;
            });

            return disp;
        },

        /**
         *  @this {XML3D.tools.TouchController}
         *  @private
         */
        _constructAction: function(evt) {

            var positions = new Array();

            for (var i=0; i<evt.touches.length; i++) {
                positions[i] = {x: evt.touches[i].pageX / this._canvasWidth, y: evt.touches[i].pageY / this._canvasHeight};
            }

            var deltas = new Array();

            for (var i=0; i<evt.touches.length; i++) {
                if(this._lastTouchPositions[i] !== undefined) {
                    deltas[i] = {x: (evt.touches[i].pageX - this._lastTouchPositions[i].x) / this._canvasWidth,
                                 y: (evt.touches[i].pageY - this._lastTouchPositions[i].y) / this._canvasHeight};
                }
            }

            var zoomFactor = 1;

            if (evt.touches.length > 1) {
                if (this._lastZoomVectorLength !== undefined) {
                    var dv = {x: positions[0].x - positions[1].x, y: positions[0].y - positions[1].y};
                    var currLength = Math.sqrt(dv.x*dv.x + dv.y*dv.y);
                    zoomFactor = 1.0 + currLength - this._lastZoomVectorLength;
                    this._lastZoomVectorLength = currLength;
                } else {
                    var dv = {x: positions[0].x - positions[1].x, y: positions[0].y - positions[1].y};
                    this._lastZoomVectorLength = Math.sqrt(dv.x*dv.x + dv.y*dv.y);
                }
            } else {
                this._lastZoomVectorLength = undefined;
            }

            return {
                evt: evt,
                positions: positions,
                deltas: deltas,
                zoom: zoomFactor
            };
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This controller brings together the mouse control and XML3D.tools.ExamineBehavior
     *  to provide examine mode navigation using the mouse.
     *
     *  @constructor
     */
    XML3D.tools.MouseExamineController = new XML3D.tools.Class(XML3D.tools.MouseController, {

        // interaction types
        NONE: 0,
        ROTATE: 1,
        DOLLY: 2,

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         *
         *  The options can be a "controls" object with the following attributes:
         *  o rotate: which mouse button is used for rotation, default left
         *  o dolly: which mouse button is used for dolly, default right
         */
        initialize: function(targetViewGroup, options) {

            var options = options || {};
            options.controls = options.controls || {};
            options.eventDispatcher = this._createMouseEventDispatcher();
            this.callSuper(targetViewGroup, options);

            this.behavior = new XML3D.tools.ExamineBehavior(this.target, options);
            this._currentAction = this.NONE;

            this._controls = this._createControls(options);
        },

        _createControls: function(options) {

            return {
                rotate: options.controls.rotate || XML3D.tools.MOUSEBUTTON_LEFT,
                dolly: options.controls.dolly || XML3D.tools.MOUSEBUTTON_RIGHT
            };
        },

        /** Resets the camera pose to look at the whole scene.
         *
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number=} distance to the scene center, default: scene's aabb diagonal
         */
        lookAtScene: function(distanceToSceneCenter) {
            this.behavior.lookAtScene(distanceToSceneCenter);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {window.XML3DVec3} targetPt
         *  @param {number=} distanceToPoint. Default: examine origin reset distance
         */
        lookAt: function(targetPt, distanceToPoint) {
            this.behavior.lookAt(targetPt, distanceToPoint);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number} delta the value of how much to dolly from the current pose
         *  @return {boolean} true if the dolly action was actually performed
         */
        dolly: function(delta) {
            return this.behavior.dolly(delta);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {window.XML3DRotation} orientation
         *  @return {boolean} true if the rotate action was actually performed
         */
        rotate: function(orientation) {
            return this.behavior.rotate(orientation);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number} deltaXAxis the value on how much to scale on the x-axis
         *  @param {number} deltaYAxis the value on how much to scale on the y-axis
         *  @return {boolean} true if the rotate action was actually performed
         */
        rotateByAngles: function(deltaXAxis, deltaYAxis) {
            return this.behavior.rotateByAngles(deltaXAxis, deltaYAxis);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         */
        onAttach: function() {
            this.callSuper();
            this.behavior.attach();
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         */
        onDetach: function() {
            this.callSuper();
            this.behavior.detach();
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onDragStart: function(action) {

            this._currentAction = this.NONE;
            switch(action.evt.button)
            {
            case this._controls.rotate:
                this._currentAction = this.ROTATE;
                break;
            case this._controls.dolly:
                this._currentAction = this.DOLLY;
                break;
            }
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onDrag: function(action) {

            switch (this._currentAction) {
            case this.DOLLY:
                this.behavior.dolly(action.delta.y);
                break;

            case this.ROTATE:
                this.behavior.rotateByAngles(-action.delta.y, -action.delta.x);
                break;
            }
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onDragEnd: function(action) {
            this._currentAction = this.NONE;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @private
         */
        _createMouseEventDispatcher: function() {

            var disp = new XML3D.tools.util.EventDispatcher();

            disp.registerCustomHandler("mousedown", function(evt){
                if(evt.button === this._controls.rotate
                || evt.button === this._controls.dolly)
                    return true;

                return false;
            }.bind(this));

            return disp;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /** This behavior provides "fly" mode camera control on the given
     *  camera transformable.
     *  This behavior does have no notion of the interaction device. All it needs
     *  are deltaX and deltaY values, from which it computes the camera pose.
     *
     *  Usage:
     *  o instantiate this class
     *  o call rotate(), move{Forward,Backward}(), step{Left,Right}()
     *
     *  @constructor
     */
    XML3D.tools.FlyBehavior = new XML3D.tools.Class(XML3D.tools.CameraBehavior, {

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o rotateSpeed
         *  o moveSpeed
         */
        initialize: function(targetViewGroup, options) {

            this.callSuper(targetViewGroup, options);

            this._moveSpeed = 1;
            if(options !== undefined && options.moveSpeed !== undefined)
                this._moveSpeed = options.moveSpeed;
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         */
        moveForward: function() {
            this._moveInCamDirection();
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         */
        moveBackward: function() {
            this._moveInCamDirection(true);
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         */
        stepRight: function() {
            this._stepRight();
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         */
        stepLeft: function() {
            this._stepRight(true);
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @return {number}
         */
        getMoveSpeed: function() {
            return this._moveSpeed;
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @param {number} speed
         */
        setMoveSpeed: function(speed) {
            this._moveSpeed = speed;
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @param {boolean} doInvertDirection
         *  @private
         */
        _stepRight: function(doInvertDirection) {

            var lookDirection = this.getLookDirection();

            var stepDirection = lookDirection.cross(new XML3DVec3(0,1,0));

            if(doInvertDirection) {
                stepDirection = stepDirection.scale(-1);
            }

            this._translateCamera(stepDirection);
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @param {boolean} doInvertDirection
         *  @private
         */
        _moveInCamDirection: function(doInvertDirection) {

            var moveDirection = this.getLookDirection();

            if(doInvertDirection) {
                moveDirection = moveDirection.scale(-1);
            }

            this._translateCamera(moveDirection);
        },

        /**
         *  @this {XML3D.tools.FlyBehavior}
         *  @param {window.XML3DVec3} direction
         *  @private
         */
        _translateCamera: function(direction) {

            var transl = direction.scale(this._moveSpeed);
            this.target.translate(transl);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This controller brings together the mouse control and XML3D.tools.FlyBehavior
     *  to provide fly mode navigation using the mouse and keyboard.
     *
     *  @constructor
     */
    XML3D.tools.MouseKeyboardFlyController = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o disableMovement: if true, no movement will be possible
         *  o disableRotation: if true, no looking around is possible
         *  o controls: an object that describes custom controls
         *
         *  Controls object attributes:
         *  o forward/backward/left/right: keys for movement, default w/s/a/d
         *  o useRotationActivator: whether to use a mouse button to activate view rotation
         *  o rotationActivator: the mouse button used to activate view rotation
         *
         *  For other options see FlyBehavior.
         *
         *  By default, the view can be rotated using the left mouse button,
         *  and movement can be done using W,A,S,D keys.
         */
        initialize: function(targetViewGroup, options)
        {
            this.callSuper();

            var options = options || {};
            options.controls = options.controls || {};

            this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);
            this.behavior = new XML3D.tools.FlyBehavior(this.target, options);
            this._initControllers();
            this._controls = this._createControls(options);

            this._continuousInputProcessing = false;
            this._disableMovement = (options.disableMovement === true);
            this._disableRotation = (options.disableRotation === true);
        },

        _initControllers: function()
        {
            this._mouseCtrl = new XML3D.tools.MouseController(this.target, {
                eventDispatcher: this._createMouseEventDispatcher()
            });
            this._mouseCtrl.onDrag = this.callback("_onDrag");
        },

        _createControls: function(options)
        {
            var controls = {
                forward: options.controls.forward || XML3D.tools.KEY_W,
                left: options.controls.left || XML3D.tools.KEY_A,
                right: options.controls.right || XML3D.tools.KEY_D,
                backward: options.controls.backward || XML3D.tools.KEY_S,
                useRotationActivator: true,
                rotationActivator: options.controls.rotationActivator || XML3D.tools.MOUSEBUTTON_LEFT
            };

            if(options.useRotationActivator !== undefined)
                controls.useRotationActivator = options.useRotationActivator;

            return controls;
        },

        lookAt: function(point)
        {
            this.behavior.lookAt(point);
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         */
        getMoveSpeed: function()
        {
            return this.behavior.getMoveSpeed();
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         */
        setMoveSpeed: function(speed)
        {
            this.behavior.setMoveSpeed(speed);
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         */
        getRotationSpeed: function()
        {
            return this.behavior.getRotationSpeed();
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         */
        setRotationSpeed: function(speed)
        {
            this.behavior.setRotationSpeed(speed);
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @protected
         *  @override
         */
        onAttach: function()
        {
            if(!this._disableRotation)
                this._mouseCtrl.attach();
            this._startInputProcessingLoop();
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @protected
         *  @override
         */
        onDetach: function()
        {
            this._mouseCtrl.detach();
            this._stopInputProcessingLoop();
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @private
         */
        _onDrag: function(action)
        {
            // we want mouse x-axis movement to map to y-axis rotation
            // so we flip the delta values
            this.behavior.rotateByAngles(-action.delta.y, -action.delta.x);
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @private
         */
        _startInputProcessingLoop: function()
        {
            this._continuousInputProcessing = true;
            this._inputProcessingLoop();
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @private
         */
        _stopInputProcessingLoop: function()
        {
            this._continuousInputProcessing = false;
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @private
         */
        _inputProcessingLoop: function()
        {
            if(!this._continuousInputProcessing)
                return;

            if(!this._disableMovement)
            {
                if(XML3D.tools.KeyboardState.isPressed(this._controls.forward))
                    this.behavior.moveForward();
                if(XML3D.tools.KeyboardState.isPressed(this._controls.backward))
                    this.behavior.moveBackward();
                if(XML3D.tools.KeyboardState.isPressed(this._controls.left))
                    this.behavior.stepLeft();
                if(XML3D.tools.KeyboardState.isPressed(this._controls.right))
                    this.behavior.stepRight();
            }

            window.requestAnimationFrame(this.callback("_inputProcessingLoop"));
        },

        /**
         *  @this {XML3D.tools.MouseKeyboardFlyController}
         *  @private
         */
        _createMouseEventDispatcher: function()
        {
            var disp = new XML3D.tools.util.EventDispatcher();
            disp.registerCustomHandler("mousedown", function(evt){
                if(!this._controls.useRotationActivator)
                    return true;

                return evt.button === this._controls.rotationActivator;
            }.bind(this));

            return disp;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This controller brings together the touch control and XML3D.tools.FlyBehavior
     *  to provide fly mode navigation using touch.
     *
     *  @constructor
     */
    XML3D.tools.TouchFlyController = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.TouchFlyController}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object} options
         *
         *  options:
         *  o behavior: options to be passed to XML3D.tools.FlyBehavior
         *  o touch: options to be passed to XML3D.tools.TouchController
         *
         *  By default, the view can be rotated using the movement of a single finger,
         *  and movement can be done using zoom/pinch gestures.
         */
        initialize: function(targetViewGroup, options) {

            this.callSuper();

            var options = options || {};
            options.behavior = options.behavior || {};
            options.touch = options.touch || {};

            this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            this._behavior = new XML3D.tools.FlyBehavior(this.target, options.behavior);

            this._touchCtrl = new XML3D.tools.TouchController(this.target, options.touch);
            this._touchCtrl.onDrag = this.callback("_onDrag");
        },

        lookAt: function(point) {
            this._behavior.lookAt(point);
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        setPosition: function(position) {
            this._behavior.setPosition(position);
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        setOrientation: function(orientation) {
            this._behavior.setOrientation(orientation);
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        getPosition: function() {
            return this._behavior.getPosition();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        getOrientation: function() {
            return this._behavior.getOrientation();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        getMoveSpeed: function() {
            return this._behavior.getMoveSpeed();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        setMoveSpeed: function(speed) {
            this._behavior.setMoveSpeed(speed);
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        getRotationSpeed: function() {
            return this._behavior.getRotationSpeed();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         */
        setRotationSpeed: function(speed) {
            this._behavior.setRotationSpeed(speed);
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         *  @protected
         *  @override
         */
        onAttach: function() {
            this._touchCtrl.attach();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         *  @protected
         *  @override
         */
        onDetach: function() {
            this._touchCtrl.detach();
        },

        /**
         *  @this {XML3D.tools.TouchFlyController}
         *  @private
         */
        _onDrag: function(action) {
            if (action.evt.touches.length > 1) {
                if (action.zoom > 1.0) { this._behavior.moveForward(); }
                if (action.zoom < 1.0) { this._behavior.moveBackward(); }
            } else {
                //invert delta to represent touch-"dragging" of a point
                this._behavior.rotate(-action.deltas[0].y, -action.deltas[0].x);
            }
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    /** This controller brings together mouse control, touch control and XML3D.tools.ExamineBehavior
     *  to provide examine mode navigation using the mouse or the touchpad.
     *
     *  @constructor
     */
    XML3D.tools.ExamineController = new XML3D.tools.Class(XML3D.tools.util.Attachable, {

        // interaction types
        NONE: 0,
        ROTATE: 1,
        DOLLY: 2,

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         */
        initialize: function(targetViewGroup, options) {

            this.callSuper();

            this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            var options = options || {};
            if(options.mouseEventDispatcher === undefined)
                options.mouseEventDispatcher = this._createMouseEventDispatcher();
            if(options.touchEventDispatcher === undefined)
                options.touchEventDispatcher = this._createTouchEventDispatcher();

            this._mouseController = new XML3D.tools.MouseController(this.target, options);
            this._mouseController.setEventDispatcher(options.mouseEventDispatcher);
            this._mouseController.onDragStart = this.callback("onMouseDragStart");
            this._mouseController.onDrag = this.callback("onMouseDrag");
            this._mouseController.onDragEnd = this.callback("onMouseDragEnd");

            this._touchController = new XML3D.tools.TouchController(this.target, options);
            this._touchController.setEventDispatcher(options.touchEventDispatcher);
            this._touchController.onDragStart = this.callback("onTouchDragStart");
            this._touchController.onDrag = this.callback("onTouchDrag");
            this._touchController.onDragEnd = this.callback("onTouchDragEnd");

            this.behavior = new XML3D.tools.ExamineBehavior(this.target, options);
            this._currentAction = this.NONE;
        },

        /** Resets the camera pose to look at the whole scene.
         *
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number=} distance to the scene center, default: scene's aabb diagonal
         */
        lookAtScene: function(distanceToSceneCenter) {
            this.behavior.lookAtScene(distanceToSceneCenter);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {window.XML3DVec3} targetPt
         *  @param {number=} distanceToPoint. Default: examine origin reset distance
         */
        lookAt: function(targetPt, distanceToPoint) {
            this.behavior.lookAt(targetPt, distanceToPoint);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number} delta the value of how much to dolly from the current pose
         *  @return {boolean} true if the dolly action was actually performed
         */
        dolly: function(delta) {
            return this.behavior.dolly(delta);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {window.XML3DRotation} orientation
         *  @return {boolean} true if the rotate action was actually performed
         */
        rotate: function(orientation) {
            return this.behavior.rotate(orientation);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @param {number} deltaXAxis the value on how much to scale on the x-axis
         *  @param {number} deltaYAxis the value on how much to scale on the y-axis
         *  @return {boolean} true if the rotate action was actually performed
         */
        rotateByAngles: function(deltaXAxis, deltaYAxis) {
            return this.behavior.rotateByAngles(deltaXAxis, deltaYAxis);
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         */
        onAttach: function() {
            this._mouseController.attach();
            this._touchController.attach();
            this.behavior.attach();
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @inheritDoc
         */
        onDetach: function() {
            this._mouseController.detach();
            this._touchController.detach();
            this.behavior.detach();
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onMouseDragStart: function(action) {

            this._currentAction = this.ROTATE;
            if(action.evt.button === XML3D.tools.MOUSEBUTTON_RIGHT)
                this._currentAction = this.DOLLY;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onMouseDrag: function(action) {

            switch (this._currentAction) {
                case this.DOLLY:
                    this.behavior.dolly(action.delta.y);
                    break;

                case this.ROTATE:
                    this.behavior.rotateByAngles(-action.delta.y, -action.delta.x);
                    break;
            }
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onMouseDragEnd: function(action) {
            this._currentAction = this.NONE;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onTouchDragStart: function(action) {

            this._currentAction = this.ROTATE;
            if(action.evt.touches.length > 1)
                this._currentAction = this.DOLLY;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onTouchDrag: function(action) {

            switch (this._currentAction) {
                case this.DOLLY:
                    this.behavior.dolly(action.zoom);
                    break;

                case this.ROTATE:
                    this.behavior.rotateByAngles(-action.deltas[0].y, -action.deltas[0].x);
                    break;
            }
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @override
         */
        onTouchDragEnd: function(action) {
            this._currentAction = this.NONE;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @private
         */
        _createMouseEventDispatcher: function() {

            var disp = new XML3D.tools.util.EventDispatcher();

            disp.registerCustomHandler("mousedown", function(evt){
                if(evt.button === XML3D.tools.MOUSEBUTTON_LEFT
                    || evt.button === XML3D.tools.MOUSEBUTTON_RIGHT)
                    return true;

                return false;
            });

            return disp;
        },

        /**
         *  @this {XML3D.tools.MouseExamineController}
         *  @private
         */
        _createTouchEventDispatcher: function() {

            var disp = new XML3D.tools.util.EventDispatcher();

            disp.registerCustomHandler('touchstart', function(evt){
                if(evt.type === 'touchstart')
                    return true;

                return false;
            });

            return disp;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function() {

    "use strict";

    /** This controller takes a camera target and provides animation using
     *  points of interest. POIs can be added and removed. One can navigate
     *  to next, previous or specific POIs.
     *
     *  @constructor
     */
    XML3D.tools.CameraAnimationController = new XML3D.tools.Class({

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {Element|Transformable} targetViewGroup
         *  @param {Object=} options
         *
         *  Options:
         *      o moveToTime: time in milliseconds used for camera pose animation, default: 3000
         */
        initialize: function(targetViewGroup, options) {

            if(!options) {
                options = {};
            }
            if(!options.moveToTime) {
                options.moveToTime = 3000;
            }

            this.target = XML3D.tools.util.getOrCreateTransformable(targetViewGroup);

            /** @private */
            this._idGenerator = new XML3D.tools.util.IDGenerator();
            /** @private */
            this._pointOfInterests = new XML3D.tools.util.Map();
            /** @private */
            this._moveToTime = options.moveToTime;

            /** @private
             *  @type {string}
             */
            this._currentPointOfInterestID = null;

            /** @private */
            this._movementInProgress = false;
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @return {boolean}
         */
        movementInProgress: function() {
            return this._movementInProgress;
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {window.XML3DVec3} position
         *  @param {window.XML3DRotation} orientation
         *  @param {number=} moveToTime. Default: class instance's moveToTime
         *  @return {string} id of the newly added point of interest
         */
        addPOI: function(position, orientation, moveToTime) {

            var id = this._idGenerator.newID();
            if(moveToTime === undefined)
                moveToTime = this._moveToTime;

            var poi = {
                id: id,
                position: position,
                orientation: orientation,
                moveToTime: moveToTime
            };
            this._pointOfInterests.add(id, poi);

            if(this._currentPointOfInterestID == null) {
                this._currentPointOfInterestID = id;
            }

            return id;
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {string} id of the point of interest to remove
         */
        removePOI: function(id) {
            this._pointOfInterests.remove(id);
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         */
        clearPOIs: function() {
            this.stopMovementToPOI();

            this._pointOfInterests.clear();
            this._currentPointOfInterestID = null;
            this._idGenerator.reset();
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {function()=} moveToFinishedCallback
         */
        moveToNextPOI: function(moveToFinishedCallback) {

            var nextPOI = this._pointOfInterests.getNext(this._currentPointOfInterestID)[0].id;
            this.moveToPOI(nextPOI, moveToFinishedCallback);
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {function()=} moveToFinishedCallback
         */
        moveToPreviousPOI: function(moveToFinishedCallback) {

            var previousPOI = this._pointOfInterests.getPrevious(this._currentPointOfInterestID)[0].id;
            this.moveToPOI(previousPOI, moveToFinishedCallback);
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {Object} poi
         *  @return {boolean} true if movement has actually been started
         *
         *  Attributes of poi:
         *  o id: id of the point of interest to move to
         *  o moveToTime: default: the moved-to POI's moveToTime
         */
        moveToPOI: function(poi, moveToFinishedCallback) {

            var nextPOI = this._pointOfInterests.get(poi.id)[0];

            this._currentPointOfInterestID = poi.id;
            this._movementInProgress = true;

            var internalFinishedCallback = function() {
                this._moveToFinished(moveToFinishedCallback);
            }.bind(this);

            this.target.moveTo(nextPOI.position, nextPOI.orientation, nextPOI.moveToTime, {
                queueing: false,
                callback: internalFinishedCallback
            });
        },

        /** Sequentially move to the given POIs, starting with the one at index 0 and
         *  continuing until the end of the array. If the whole action is finished
         *  invokes the optional callback.
         *
         *  @this {XML3D.tools.CameraAnimationController}
         *  @param {Array.<{id:string,moveToTime:number}>} POIs, moveToTime is optional
         *  @param {function()=} moveToFinishedCallback
         *  @return {boolean} true if movement has actually been started
         */
        moveAlongPOIPath: function(POIs, moveToFinishedCallback) {

            if(this._pointOfInterests.size() < 1 ||
                this._movementInProgress || this.target.movementInProgress()) {
                return false;
            }

            var numPOIs = POIs.length;

            // Moving to a POI is asynchronous and will invoke a callback when the movement
            // is done. Thus, we construct a callback chain, that will trigger the movement
            // to the next POI. The last invokation of the callback will trigger the given
            // moveToFinishedCallback.
            var lastCallback = moveToFinishedCallback;
            var fn = function() {};
            var that = this;

            for(var i = numPOIs-1; i >= 0; i--) {

                (function(){
                    var opts = {};
                    opts.id = POIs[i].id;
                    if(POIs[i].moveToTime !== undefined)
                        opts.moveToTime = POIs[i].moveToTime;

                    var finishedCallback = lastCallback;

                    fn = function() {that.moveToPOI(opts, finishedCallback);}

                    lastCallback = fn;
                }());
            }

            fn();

            return true;
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         */
        stopMovementToPOI: function() {

            this.target.stop();
            this._moveToFinished();
        },

        /**
         *  @this {XML3D.tools.CameraAnimationController}
         *  @private
         *  @param {function()=} moveToFinishedCallback
         */
        _moveToFinished: function(moveToFinishedCallback) {
            this._movementInProgress = false;
            if(moveToFinishedCallback !== undefined)
                moveToFinishedCallback();
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.xml3doverlay");

    /** Will mirror the transformations of the target node in a hierarchy in the
     *  xml3d overlay. Can then be attached/deatched.
     *
     *  The following tree is created:
     *  o target's grandparent
     *      o target's parent
     *          o target
     *
     *  This is needed because:
     *  1) the widget needs access to the target node itself, so it's replicated.
     *  2) the widget will modify the target's parent node, so the exact parent node transformation
     *      has to be replicated.
     *  3) because of the above the grandparent node will hold the world transformation of the
     *      target's grandparent node.
     *
     *  @constructor
     */
    XML3D.tools.xml3doverlay.MirroredWidgetTarget = new XML3D.tools.Class(
        XML3D.tools.util.Attachable, {

        /** Sets up the mirrored node ready for attaching.
         *
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *
         *  @param {string} _id
         *  @param {XML3D.tools.XML3DOverlay} _xml3dOverlay
         *  @param {XML3D.tools.Transformable} _target
         */
        initialize: function(_id, _xml3dOverlay, _target)
        {
            this.ID = _id;

            this._xml3dOverlay = _xml3dOverlay;
            this._target = _target;

            this._mirroredTargetRoot = null;
            this._mirroredTarget = null;

            this._overlayDefs = null;
            this._createdDefsChildren = [];

            this._setupMirroredTarget();
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         */
        getNode: function()
        {
            return this._mirroredTarget;
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         */
        globalID: function(id)
        {
            return this.ID + "_" + id;
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *  @override
         *  @protected
         */
        onAttach: function()
        {
            for(var i = 0; i < this._createdDefsChildren.length; i++)
                this._overlayDefs.appendChild(this._createdDefsChildren[i]);
            this._xml3dOverlay.xml3d.appendChild(this._mirroredTargetRoot);
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *  @override
         *  @protected
         */
        onDetach: function()
        {
            this._xml3dOverlay.xml3d.removeChild(this._mirroredTargetRoot);
            for(var i = 0; i < this._createdDefsChildren.length; i++)
                this._overlayDefs.removeChild(this._createdDefsChildren[i]);
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *  @private
         */
        _setupMirroredTarget: function()
        {
            this._overlayDefs = XML3D.tools.util.getOrCreateDefs(this._xml3dOverlay.xml3d);

            var targetNode = this._target.object;

            // target node
            var mirroredTarget = this._createTransformedGroup(
                "t_mirroredTarget", this._getTargetLocalMatrix());

            // target parent
            var targetParent = targetNode.parentNode;
            var parentMatrix = new window.XML3DMatrix();
            if(targetParent && targetParent.getLocalMatrix)
                parentMatrix = targetParent.getLocalMatrix();

            var mirroredTargetParent = this._createTransformedGroup("t_mirroredTargetParent",
                parentMatrix, mirroredTarget);

            // target's grandparent
            var targetGrandparent = targetParent ? targetParent.parentNode : null;
            var grandparentMatrix = new window.XML3DMatrix();
            if(targetGrandparent && targetGrandparent.getWorldMatrix)
                grandparentMatrix = targetGrandparent.getWorldMatrix();

            var mirroredTargetGrandparent = this._createTransformedGroup(
                "t_mirroredTargetParentsParent", grandparentMatrix, mirroredTargetParent);

            this._mirroredTarget = mirroredTarget;
            this._mirroredTargetRoot = mirroredTargetGrandparent;
        },

        /** Create and return the local matrix of the target node itself.
         *  There is one speciality: we want the scaling to be the bounding box
         *  of the target node. The mirrored target node has no content, so the
         *  bounding box is empty. But we still want the scaling, so we set the
         *  scaling to be related to the target's bounding box size.
         *
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *  @private
         *
         *  @return {window.XML3DMatrix}
         */
        _getTargetLocalMatrix: function()
        {
            var targetNode = this._target.object;

            var targetMatrix = targetNode.getLocalMatrix();
            var targetScale = new XML3DVec3(1,1,1);
            if(!targetNode.getBoundingBox().isEmpty())
                targetScale = targetNode.getBoundingBox().size().scale(0.5);

            // we pre-multiply the scaling to the target's local matrix
            // however we don't want an already set scaling to be affected
            // but it's included in the bounding box.
            // So we remove the local matrix' scaling from the new scale
            var targetMatrixScale = targetMatrix.scaling();
            var invTargetMatrixScale = new window.XML3DVec3(
                1/targetMatrixScale.x, 1/targetMatrixScale.y, 1/targetMatrixScale.z);

            targetScale = targetScale.multiply(invTargetMatrixScale);
            var scaleAvg = (targetScale.x + targetScale.y + targetScale.z) / 3;

            var targetScaleMatrix = new window.XML3DMatrix();
            targetScaleMatrix.m11 = scaleAvg;
            targetScaleMatrix.m22 = scaleAvg;
            targetScaleMatrix.m33 = scaleAvg;

            return targetMatrix.multiply(targetScaleMatrix);
        },

        /** Create a group that is transformed by the given matrix.
         *
         *  @this {XML3D.tools.xml3doverlay.MirroredWidgetTarget}
         *  @private
         *
         *  @param {string} transformId
         *  @param {window.XML3DMatrix} xfmMatrix
         *  @param {window.Element=} child
         */
        _createTransformedGroup: function(transformId, xfmMatrix, child)
        {
            var transform = XML3D.tools.creation.element("transform", {
                id: this.globalID(transformId),
                translation: xfmMatrix.translation().str(),
                rotation: xfmMatrix.rotation().str(),
                scale: xfmMatrix.scaling().str()
            });
            this._overlayDefs.appendChild(transform);

            this._createdDefsChildren.push(transform);

            var group = XML3D.tools.creation.element("group", {
                transform: "#" + this.globalID(transformId)
            });
            if(child)
                group.appendChild(child);

            return group;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.xml3doverlay");

    /** A mirrored view will create a view-subtree of the view of the target xml3d element.
     *  It will track changes to that view and reflect it in the created subtree.
     *
     *  The tree created is:
     *  o view group node (target view's parent node world matrix)
     *      o view node (target view's position and rotation elements)
     */
    XML3D.tools.xml3doverlay.MirroredView = new XML3D.tools.Class(
        XML3D.tools.util.Attachable, {

        nextViewId: 0,

        initialize: function(_xml3dTarget, _xml3dOverlay)
        {
            this.ID = "mirroredView" + this.nextViewId++;

            this._xml3dTarget = _xml3dTarget;
            this._xml3dOverlay = _xml3dOverlay;

            this._mirroredView = null;
            this._mirroredViewGrpXfmable = null;
            this._mirroredViewGrp = null;

            this._setupView();

            this._viewTracker = new XML3D.tools.ViewTracker(
                this._xml3dTarget, this.callback("_targetViewXfmChanged"));
        },

        onAttach: function()
        {
            this._xml3dOverlay.appendChild(this._mirroredViewGrp);
            this._oldActiveView = this._xml3dOverlay.activeView;
            this._xml3dOverlay.activeView = "#v_" + this.ID;

            this._mirroredViewGrpXfmable =
                XML3D.tools.MotionFactory.createTransformable(this._mirroredViewGrp);

            this._viewTracker.attach();
        },

        onDetach: function()
        {
            this._viewTracker.detach();

            this._xml3dOverlay.removeChild(this._mirroredViewGrp);
            this._xml3dOverlay.activeView = this._oldActiveView;
        },

        _setupView: function()
        {
            this._mirroredView = XML3D.tools.creation.element("view", {
                id: "v_" + this.ID
            });

            var viewGrp = XML3D.tools.creation.element("group", {
                children: [this._mirroredView]
            });

            this._mirroredViewGrp = viewGrp;
        },

        _targetViewXfmChanged: function(viewTracker)
        {
            var targetViewEl = viewTracker.getCurrentView();
            this._mirroredView.position.set(targetViewEl.position);
            this._mirroredView.orientation.set(targetViewEl.orientation);
            this._mirroredView.fieldOfView = targetViewEl.fieldOfView;

            var targetViewParent = targetViewEl.parentNode;
            if(!targetViewParent || !targetViewParent.getWorldMatrix)
                return;

            var parentWorldMat = targetViewParent.getWorldMatrix();
            this._mirroredViewGrpXfmable.setPosition(parentWorldMat.translation());
            this._mirroredViewGrpXfmable.setOrientation(parentWorldMat.rotation());
        }
    });

}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.xml3doverlay");

    /** A GroupMirror mirrors a given group in an own overlay.
     *  It creates the overlay and sets up a MirroredWidgetTarget.
     */
    XML3D.tools.xml3doverlay.GroupMirror = new XML3D.tools.Class(
        XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.xml3doverlay.GroupMirror}
         *  @param {string} id
         *  @param {XML3D.tools.Transformable} target
         *  @param {XML3D.tools.XML3DOverlay=} xml3dOverlay
         *
         *  The overlay is optional. If it is not given, one will be created
         *  with the xml3d element of the given target node.
         */
        initialize: function(id, target, xml3dOverlay)
        {
            this._realTarget = target;

            // overlay
            var xml3dTarget = XML3D.tools.util.getXml3dRoot(target.object);
            this._isSelfCreatedOverlay = (xml3dOverlay == undefined);
            if(!this._isSelfCreatedOverlay)
            {
                this._xml3dOverlay = xml3dOverlay;
            }
            else
            {
                this._xml3dOverlay = new XML3D.tools.xml3doverlay.XML3DOverlay(xml3dTarget);
                this._xml3dOverlay.attach();
            }

            // mirror the target node
            this._mirroredTarget = new XML3D.tools.xml3doverlay.MirroredWidgetTarget(
                id, this._xml3dOverlay, target);
        },

        onAttach: function()
        {
            if(this._isSelfCreatedOverlay)
                this._xml3dOverlay.attach();
            this._mirroredTarget.attach();
        },

        onDetach: function()
        {
            this._mirroredTarget.detach();
            if(this._isSelfCreatedOverlay)
                this._xml3dOverlay.detach();
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.GroupMirror}
         *  @return {XML3D.tools.XML3DOverlay}
         */
        overlay: function()
        {
            return this._xml3dOverlay;
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.GroupMirror}
         *  @return {XML3D.tools.Transformable} the target node that is mirrored
         */
        target: function()
        {
            return this._realTarget;
        },

        /** Returns a transformable for the mirrored target node with
         *  the given constraint.
         *
         *  @this {XML3D.tools.xml3doverlay.GroupMirror}
         *  @param {function(XML3DVec3,Object):boolean=} constraint
         *  @return {XML3D.tools.Transformable}
         */
        mirroredTarget: function(constraint)
        {
            return XML3D.tools.MotionFactory.createTransformable(
                this._mirroredTarget.getNode(), constraint);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.xml3doverlay.XML3DOverlay");

    /** This class will create an xml3d element on top of the given one.
     *  It will forward any mouse events that don't hit an xml3d element to the target
     *  element. Also it will mirror and track the target element's view.
     *
     *  This implementation will attach listeners to the canvas element, that is
     *  created for xml3d. The graph looks as follows:
     *  o canvas: the visible stuff
     *  o invisible div: container for the xml3d tree
     *      - xml3d: the actual xml3d element
     *
     *  This is wanted because the xml3d element itself will receive other mouse
     *  events. For example an mouseout event of geometry in the overlay will
     *  probably not be a mouseout event in the underlying element.
     *  Thus, we will simply forward the unfiltered events, that the canvas itself
     *  receives.
     *
     *  The overlay element will be attached to the same parent as the target xml3d element.
     *  More specifically it will have the same parent as the target canvas element
     *  (because after attaching the xml3d.js will pack that into a div aso.).
     *
     *  PROBLEM
     *  There is a general problem with overlays: multiple ones on top of each other.
     *  Now the propagation to underlying elements is done by making itself invisible.
     *  However, if multiple overlays are present that causes an infinite loop (switch
     *  the overlay below another one invisible...).
     */
    XML3D.tools.xml3doverlay.XML3DOverlay = new XML3D.tools.Class(
        XML3D.tools.util.Attachable, {

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         */
        initialize: function(targetXML3DElement)
        {
            this.callSuper();
            this.xml3dTarget = targetXML3DElement;
            this._canvasTarget = this._getCanvasElement(this.xml3dTarget);
            this.xml3d = this._createXML3DElement();

            this._canvas = null; // set in onAttach()

            this._mirroredView = new XML3D.tools.xml3doverlay.MirroredView(
                targetXML3DElement, this.xml3d);
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @override
         *  @protected
         */
        onAttach: function()
        {
            this._canvasTarget.parentNode.appendChild(this.xml3d);
            this._canvas = this._getCanvasElement(this.xml3d);

            this._mirroredView.attach();
            this._registerEventListeners(true);
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @override
         *  @protected
         */
        onDetach: function()
        {
            this._registerEventListeners(false);
            this._mirroredView.detach();
            this.xml3d.parentNode.removeChild(this.xml3d);
        },

        _getCanvasElement: function(xml3d)
        {
            if(!xml3d.parentNode || !xml3d.parentNode.previousElementSibling)
                throw new Error("XML3DOverlay: xml3d element has no parent node or no canvas attached.");

            var canvas = xml3d.parentNode.previousElementSibling;
            if(canvas.tagName.toLowerCase() !== "canvas")
                throw new Error("XML3DOverlay: associated element must be a canvas.");

            return canvas;
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _createXML3DElement: function()
        {
            var targetWidth = this.xml3dTarget.offsetWidth;
            var targetHeight = this.xml3dTarget.offsetHeight;
            var targetOffset = {top : this._canvasTarget.offsetTop, left: this._canvasTarget.offsetLeft};
            console.log("offset: " + targetOffset.top + "x" + targetOffset.left);
            var zIndex = this._getTargetZIndex();

            var styleAttrib = "width:" + targetWidth + "px;height:" + targetHeight + "px;";
            styleAttrib += "background-color:transparent;";
            styleAttrib += "z-index:" + zIndex + ";";
            styleAttrib += "position:absolute;";
            // we append the overlay to the same parent as the original element
            // so we want the same offset to the parent as the other xml3d's canvas
            styleAttrib += "top:" + targetOffset.top + "px;left:" + targetOffset.left + "px;";

            return XML3D.tools.creation.element("xml3d", { style: styleAttrib });
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _registerEventListeners: function(doAddListener)
        {
            this._registerOverlayEventListeners(doAddListener);
            this._registerTargetEventListeners(doAddListener);
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _registerOverlayEventListeners: function(doAddListener)
        {
            var registerFn = this._canvas.addEventListener.bind(this._canvas);
            if(doAddListener === false)
                registerFn = this._canvas.removeEventListener.bind(this._canvas);

            registerFn("click", this.callback("_onOverlayMouseEvent"), false);
            registerFn("mousedown", this.callback("_onOverlayMouseEvent"), false);
            registerFn("mouseup", this.callback("_onOverlayMouseEvent"), false);
            registerFn("mouseover", this.callback("_onOverlayMouseEvent"), false);
            registerFn("mousemove", this.callback("_onOverlayMouseEvent"), false);
            registerFn("mouseout", this.callback("_onOverlayMouseEvent"), false);
        },

        _registerTargetEventListeners: function(doAddListener)
        {
            var registerFn = this.xml3dTarget.addEventListener.bind(this.xml3dTarget);
            if(doAddListener === false)
                registerFn = this.xml3dTarget.removeEventListener.bind(this.xml3dTarget);

            registerFn("resize", this.callback("_onTargetResizeEvent"));
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _onOverlayMouseEvent: function(evt)
        {
            var elOverlay = this.xml3d.getElementByPoint(evt.pageX, evt.pageY);
            if(elOverlay)
                return; // hit: do not delegate anything

            var oldStyleDisplay = this._canvas.style.display;

            this._canvas.style.display = "none";
            var newEl = document.elementFromPoint(evt.clientX, evt.clientY);
            this._canvas.style.display = oldStyleDisplay;

            if(newEl)
                this._delegateEvent(evt, newEl);
        },

        _delegateEvent: function(evt, newTarget)
        {
            var newEvt = document.createEvent("MouseEvents");
            newEvt.initMouseEvent(evt.type, evt.bubbles, evt.cancelable,
                evt.view, evt.detail, evt.screenX, evt.screenY,
                evt.clientX, evt.clientY, evt.ctrlKey, evt.altKey, evt.shiftKey,
                evt.metaKey, evt.button, evt.relatedTarget);

            newTarget.dispatchEvent(newEvt);
        },

        /** We are most-def not parented under the same node as the target xml3d element.
         *  Thus, we track the resize event of the target node and forward that to your
         *  overlay manually.
         *
         *  @param evt
         *  @private
         */
        _onTargetResizeEvent: function(evt)
        {
            var dimensions = evt.detail;
            this.xml3d.style.width = dimensions.width + "px";
            this.xml3d.style.height = dimensions.height + "px";
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _getTargetZIndex: function()
        {
            var zIndex = this._getTargetStyleProperty("z-index");
            if(isNaN(zIndex))
                zIndex = 1;
            else
                zIndex++;

            return zIndex;
        },

        /**
         *  @this {XML3D.tools.xml3doverlay.XML3DOverlay}
         *  @private
         */
        _getTargetStyleProperty: function(stylePropertyName)
        {
            if (this.xml3dTarget.currentStyle)
                return this.xml3dTarget.currentStyle[stylePropertyName];
            else if (window.getComputedStyle) {
                var computedStyle = document.defaultView.getComputedStyle(this.xml3dTarget,null);
                return computedStyle.getPropertyValue(stylePropertyName);
            }

            throw new Error("XML3D.tools.xml3doverlay.XML3DOverlay: missing style property '" + stylePropertyName + "' of target element!");
        }
    });

}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.geometry");

    /** Geometry is used specifically by widgets to
     *  encapsulate it's geometry construction and handling. Usually
     *  a widget defines a certain type of geometry constructor using
     *  the GeometryType field of XML3D.tools.interaction.widgets.Widget
     *  and the Widget does the rest.
     *
     *  Derived classes should override the following methods:
     *  o onCreateDefsElements(): called when the defs elements should be setup
     *  o onCreateGraph(): called when the actual graph is to be set-up. The defs elements are already
     *      attached at this point
     *  o onTargetXfmChanged(): called when the world transformation of the widget's target node changes.
     */
    XML3D.tools.interaction.geometry.Geometry = new XML3D.tools.Class({

        /**
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @param {XML3D.tools.interaction.widgets.Widget} widget
         */
        initialize: function(widget)
        {
            this.geo = new XML3D.tools.util.GeoObject(widget.ID, widget.xml3d, widget.target.object);
            this.widget = widget;

            this._targetTracker = new XML3D.tools.TransformTracker(widget.target.object);
            this._targetTracker.xfmChanged = this.callback("_onTargetXfmChanged");

            this._viewTracker = new XML3D.tools.ViewTracker(widget.xml3d);
            this._viewTracker.xfmChanged = this.callback("_onViewXfmChanged");
        },

        /** Shortcut to graph root
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         */
        getRoot: function()
        {
            return this.geo.getGraphRoot();
        },

        /** Shortcut to geometry access
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @param {string} id
         */
        getGeo: function(id)
        {
            return this.geo.graph[id];
        },

        /** Shortcut to geometry access
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *
         *  @param {string} id
         *  @param {Object} geo geometry to be stored
         *  @return {Object} the given geometry
         */
        setGeo: function(id, geo)
        {
            this.geo.graph[id] = geo;
            return geo;
        },

        /** Setup the defs elements, attach them to the scene graph,
         *  create the graph and attach the graph, too.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         */
        constructAndAttach: function()
        {
            this.createDefsElements();
            this.geo.attachDefs();

            this.createGraph();
            this.geo.attachGraph();

            this._targetTracker.attach();
            this._viewTracker.attach();

            this.onViewXfmChanged();
            this.onTargetXfmChanged();
        },

        destroy: function()
        {
            this._targetTracker.detach();
            this._viewTracker.detach();
            this.geo.destroy();
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         */
        createDefsElements: function()
        {
            this.geo.addTransforms("t_root");
            this.onCreateDefsElements();
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         */
        createGraph: function()
        {
            this.geo.setGraphRoot(XML3D.tools.creation.element("group", {
                id: this.geo.globalID("g_root"),
                transform: "#" + this.geo.globalID("t_root")
            }));

            this.onCreateGraph();
        },

        /**
         * Adds a highlight to the geometry with the given ID. All it does it to set
         * the ambient intensity of the corresponding shader to 1.
         *
         * @this {XML3D.tools.interaction.geometry.Geometry}
         * @param geometryId the ID of the geometry to be highlighted.
         */
        addHighlight: function(geometryId)
        {
            var shaderEl = this.geo.defs["s_" + geometryId];
            if(!shaderEl)
                throw new Error("RotateGizmo.addHighlight(): given shader does not exist: " + geometryId);

            shaderEl.__oldHighlightValue = XML3D.tools.util.setShaderAttribute(
                shaderEl, "ambientIntensity", "1");
        },

        /**
         * Removes a highlight from the geometry with the given ID. All it does it to restore
         * the ambient intensity that has been previously set with addHighlight().
         *
         * @this {XML3D.tools.interaction.geometry.Geometry}
         * @param geometryId the ID of the geometry from which the highlight is to be removed
         */
        removeHighlight: function(geometryId)
        {
            var shaderEl = this.geo.defs["s_" + geometryId];
            if(!shaderEl)
                throw new Error("RotateGizmo.removeHighlight(): given shader does not exist: " + geometryId);

            XML3D.tools.util.setShaderAttribute(
                shaderEl, "ambientIntensity", shaderEl.__oldHighlightValue);
            shaderEl.__oldHighlightValue = undefined;
        },

        /** This is called when the target transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @protected
         */
        onTargetXfmChanged: function() {},

        /** This is called when the view transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @protected
         */
        onViewXfmChanged: function() {},

        /** This is called when the defs elements are created. The geometry's
         *  root transform t_root is already created.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @protected
         */
        onCreateDefsElements: function() {},

        /** This is called when the graph is created. The geometry's root
         *  is already initialized.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @protected
         */
        onCreateGraph: function() {},

        /**
         *  We use an internal wrapper method instead of directly registering
         *  the protected method to allow an override of that method w/o affecting
         *  the ability to track the transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @param {!Object} targetNode the node this observer tracks
         *  @param {!Event} evt the original DOM event that caused the change
         */
        _onTargetXfmChanged: function(targetNode, evt)
        {
            if(this.onTargetXfmChanged)
                this.onTargetXfmChanged();
        },

        /** This is called when the view transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @param {Object} viewTracker the internal tracker used
         *  @param {Object} evt the original DOM event that caused the change
         */
        _onViewXfmChanged: function(viewTracker, evt)
        {
            if(this.onViewXfmChanged)
                this.onViewXfmChanged();
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.geometry");

    /**
     */
    XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry = new XML3D.tools.Class(
        XML3D.tools.interaction.geometry.Geometry, {

        /**
         *  @this {XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry}
         *  @param {XML3D.tools.interaction.widgets.Widget} widget
         *  @param {Object=} options
         *
         *  options:
         *      o scale: a custom scale that should be applied to the geometry
         */
        initialize: function(widget, options)
        {
            if(!options)
                options = {};

            this.callSuper(widget);

            if(options.scale)
                this._customWidgetScale = new XML3DVec3(options.scale);
            else
                this._customWidgetScale = new XML3DVec3(1, 1, 1);
            this._initialRootScaling = new XML3DVec3(1,1,1);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry}
         *  @protected
         */
        onCreateGraph: function()
        {
            this.callSuper();

            var xfmable = this.geo.getGraphRootTransformable();
            this._initialRootScaling.set(xfmable.getScale().multiply(this._customWidgetScale));
            xfmable.setScale(this._initialRootScaling);
        },

        /** @inheritDoc */
        onViewXfmChanged: function() {

            this.callSuper();
            this._adaptWidgetScaleToViewPose();
        },

        /** This is called when the target transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @protected
         */
        onTargetXfmChanged: function() {

            this.callSuper();
            this._adaptWidgetScaleToViewPose();
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry}
         *  @private
         */
        _adaptWidgetScaleToViewPose: function() {

            var rootViewDist = this._getWidgetViewDistance();
            var rootViewScaling = new XML3DVec3(rootViewDist, rootViewDist, rootViewDist);
            var absoluteRootViewScaling = rootViewScaling.multiply(
                this._getWidgetParentInverseScaling());
            var finalRootScale = this._initialRootScaling.multiply(absoluteRootViewScaling);
            this.geo.getGraphRootTransformable().setScale(finalRootScale);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry}
         *  @private
         *  @return {number} distance between the widget's root node and the view
         */
        _getWidgetViewDistance: function() {

            var curView = XML3D.util.getOrCreateActiveView(this.widget.xml3d);;
            var viewPos = curView.getWorldMatrix().translation();

            var rootPos = this.geo.getGraphRoot().getWorldMatrix().translation();
            var viewDistance = rootPos.subtract(viewPos).length();
            if(viewDistance == 0) {
                return 1;
            }
            return viewDistance;
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry}
         *  @private
         *  @return {window.XML3DVec3} world-to-local scaling vector of the widget's parent node
         */
        _getWidgetParentInverseScaling: function() {

            var parentWorldMatrix = this.geo.getGraphRoot().parentNode.getWorldMatrix();
            var scale = parentWorldMatrix.scaling();
            return new XML3DVec3(1/scale.x, 1/scale.y, 1/scale.z);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.geometry");

    /**
     */
    XML3D.tools.interaction.geometry.TargetScaledGeometry = new XML3D.tools.Class(
        XML3D.tools.interaction.geometry.Geometry, {

        /** This is called when the graph is created. The geometry's root
         *  is already initialized.
         *
         *  @this {XML3D.tools.interaction.geometry.Geometry}
         *  @override
         *  @protected
         */
        onCreateGraph: function()
        {
            this.callSuper();

            XML3D.tools.util.fireWhenMeshesLoaded(this.widget.target.object,
                this.callback("_adaptWidgetScaleToViewPose"));
        },

        /** This is called when the target transformation changes.
         *
         *  @this {XML3D.tools.interaction.geometry.TargetScaledGeometry}
         *  @protected
         */
        onTargetXfmChanged: function() {
            this.callSuper();
            this._adaptWidgetScaleToViewPose();
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.TargetScaledGeometry}
         *  @private
         */
        _adaptWidgetScaleToViewPose: function() {
            var scale = this._getWidgetScaling();
            this.geo.getGraphRootTransformable().setScale(scale);
        },

        _getWidgetScaling: function() {
            var target = this.widget.target;
            var scale = new window.XML3DVec3(target.getScale());

            if(!target.object.getBoundingBox().isEmpty())
            {
                var tarBBoxSize = target.object.getBoundingBox().size();
                scale = tarBBoxSize.multiply(new window.XML3DVec3(0.55, 0.55, 0.55));
            }

            var minScale = (scale.x + scale.y + scale.z) / 3;
            minScale /= 2;

            if(scale.x < minScale)
                scale.x = minScale;
            if(scale.y < minScale)
                scale.y = minScale;
            if(scale.z < minScale)
                scale.z = minScale;

            return scale;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.geometry");

    /** The tree of this geometry looks like this:
     *  o graph root
     *      o widget container
     *          o xaxis
     *          o yaxis
     *          o zaxis
     *
     *  The axes can be retrieved by their name using getGeo().
     */
    XML3D.tools.interaction.geometry.TranslateGizmo = new XML3D.tools.Class(
        XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry, {

        disabledComponents: [],

        /**
         *  @this {XML3D.tools.interaction.geometry.TranslateGizmo}
         *  @param {XML3D.tools.interaction.widgets.Widget} widget
         *  @param {Object=} options
         *
         *  options:
         *      o scale: a custom scale that should be applied to the geometry
         *      o disabledComponents: an array with the names of components that are to be disabled
         *          - values: "xaxis", "yaxis", "zaxis", "xyplane", "xzplane", "yzplane"
         */
        initialize: function(widget, options)
        {
            if(!options)
                options = {};
            options = XML3D.tools.extend({}, options);

            var customScale = new XML3DVec3(0.08, 0.08, 0.08);
            if(!options.scale)
                options.scale = customScale;
            else
                options.scale = options.scale.multiply(customScale);
            if(options.disabledComponents)
                this.disabledComponents = options.disabledComponents;

            this.callSuper(widget, options);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.TranslateGizmo}
         */
        onCreateDefsElements: function()
        {
            this.callSuper();

            if(0 > this.disabledComponents.indexOf("xaxis"))
                this._createAxisArrowDefs("xaxis", "0 1 0 1.57", "0 0.8 0");
            if(0 > this.disabledComponents.indexOf("yaxis"))
                this._createAxisArrowDefs("yaxis", "1 0 0 -1.57", "0.8 0 0");
            if(0 > this.disabledComponents.indexOf("zaxis"))
                this._createAxisArrowDefs("zaxis", "0 0 1 0", "0 0 0.8");
            if(0 > this.disabledComponents.indexOf("yzplane"))
                this._createAxisPlaneDefs("yzplane", "0 0.8 0", "0 1 0 -1.57", "0 1 1");
            if(0 > this.disabledComponents.indexOf("xzplane"))
                this._createAxisPlaneDefs("xzplane", "0.8 0 0", "1 0 0 1.57", "1 0 1");
            if(0 > this.disabledComponents.indexOf("xyplane"))
                this._createAxisPlaneDefs("xyplane", "0 0 0.8", "0 0 1 0", "1 1 0");
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.TranslateGizmo}
         */
        onCreateGraph: function()
        {
            this.callSuper();

            if(0 > this.disabledComponents.indexOf("xaxis"))
                this._createAxisArrowGroup("xaxis");
            if(0 > this.disabledComponents.indexOf("yaxis"))
                this._createAxisArrowGroup("yaxis");
            if(0 > this.disabledComponents.indexOf("zaxis"))
                this._createAxisArrowGroup("zaxis");
            if(0 > this.disabledComponents.indexOf("yzplane"))
                this._createAxisPlaneGroup("yzplane");
            if(0 > this.disabledComponents.indexOf("xzplane"))
                this._createAxisPlaneGroup("xzplane");
            if(0 > this.disabledComponents.indexOf("xyplane"))
                this._createAxisPlaneGroup("xyplane");
        },

        _createAxisArrowDefs: function(id, rotation, color)
        {
            this.geo.addTransforms("t_" + id, {
                rotation: rotation,
                scale: "1 1 2"
            });

            this.geo.addShaders("s_" + id, {
                shaderType: "urn:xml3d:shader:tools-eyelight",
                diffuseColor: color,
                ambientIntensity: "0.3"
            });
        },

        _createAxisArrowGroup: function(id)
        {
            var group = XML3D.tools.creation.element("group", {
                transform: "#" + this.geo.globalID("t_" + id),
                shader: "#" + this.geo.globalID("s_" + id),
                children: [
                    XML3D.tools.creation.arrow(this.geo.xml3d)
                ]
            });

            this.setGeo(id, group);
            this.geo.addToGraphRoot(group);
        },

        _createAxisPlaneDefs: function(id, color, rotation, translation)
        {
            var scaleVec = new XML3DVec3(0.3, 0.3, 0.3);
            var translVec = new XML3DVec3();
            translVec.setVec3Value(translation);
            translVec = translVec.multiply(scaleVec);

            this.geo.addTransforms("t_" + id, {
                rotation: rotation,
                scale: scaleVec.str(),
                translation: translVec.str()
            });

            this.geo.addShaders("s_" + id, {
                shaderType: "urn:xml3d:shader:tools-eyelight",
                diffuseColor: color,
                ambientIntensity: "0.3",
                transparency: "0.5"
            });
        },

        _createAxisPlaneGroup: function(id)
        {
            var group = XML3D.tools.creation.element("group", {
                transform: "#" + this.geo.globalID("t_" + id),
                shader: "#" + this.geo.globalID("s_" + id),
                children: [
                    XML3D.tools.creation.rectangle(this.geo.xml3d)
                ]
            });

            this.setGeo(id, group);
            this.geo.addToGraphRoot(group);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.geometry");

    /** The tree of this geometry looks like this:
     *  o graph root
     *      o widget container
     *          o xaxis
     *          o yaxis
     *          o zaxis
     *
     *  The axes can be retrieved by their name using getGeo().
     */
    XML3D.tools.interaction.geometry.RotateGizmo = new XML3D.tools.Class(
        XML3D.tools.interaction.geometry.ViewedConstantSizeGeometry, {

        bandWidth: 1,

        /**
         *  @this {XML3D.tools.interaction.geometry.RotateGizmo}
         *  @param {XML3D.tools.interaction.widgets.Widget} widget
         *  @param {Object=} options
         *
         *  options:
         *      o scale: a custom scale that should be applied to the geometry
         *      o bandWidth: the width of a band (default: 1)
         */
        initialize: function(widget, options)
        {
            if(!options)
                options = {};
            options = XML3D.tools.extend({}, options);

            var customScale = new XML3DVec3(0.05, 0.05, 0.05);
            if(!options.scale)
                options.scale = customScale;
            else
                options.scale = options.scale.multiply(customScale);
            if(options.bandWidth)
                this.bandWidth = options.bandWidth;


            this.callSuper(widget, options);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.RotateGizmo}
         *  @override
         *  @protected
         */
        onCreateDefsElements: function()
        {
            this.callSuper();

            this._createAxisDefsElements("xaxis", "0 0.8 0", "0 1 0 -1.57", 0);
            this._createAxisDefsElements("yaxis", "0.8 0 0", "1 0 0 1.57", 0.01);
            this._createAxisDefsElements("zaxis", "0 0 0.8", "0 0 1 0", 0.02);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.RotateGizmo}
         *  @override
         *  @protected
         */
        onCreateGraph: function()
        {
            this.callSuper();

            this.setGeo("xaxis", this._createAxisGroup("xaxis"));
            this.setGeo("yaxis", this._createAxisGroup("yaxis"));
            this.setGeo("zaxis", this._createAxisGroup("zaxis"));

            this.geo.addToGraphRoot([
                this.getGeo("xaxis"),
                this.getGeo("yaxis"),
                this.getGeo("zaxis")
            ]);
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.RotateGizmo}
         *  @private
         *
         *  @param {string} id
         *  @param {string} color
         *  @param {string=} rotation
         */
        _createAxisDefsElements: function(id, color, rotation, sizeOffset)
        {
            var scaleVec = new XML3DVec3(1, 1, 0.1*this.bandWidth);
            // when increasing the bandwidth the size and thus offset of the band to the lower ones
            // should increase, too, else we get an overlap. Thus, we scale the size offset by the
            // band width
            scaleVec = scaleVec.scale(1 + sizeOffset*this.bandWidth);

            this.geo.addTransforms("t_" + id, {
                scale: scaleVec.str(),
                rotation: rotation
            });

            this.geo.addShaders("s_" + id, {
                shaderType: "urn:xml3d:shader:tools-eyelight",
                diffuseColor: color,
                ambientIntensity: "0.3",
                transparency: "0.5"
            });
        },

        /**
         *  @this {XML3D.tools.interaction.geometry.RotateGizmo}
         *  @private
         *
         *  @param {string} id
         */
        _createAxisGroup: function(id)
        {
            return XML3D.tools.creation.element("group", {
                transform: "#" + this.geo.globalID("t_" + id),
                shader: "#" + this.geo.globalID("s_" + id),
                children: [
                    XML3D.tools.creation.cylinder(this.geo.xml3d)
                ]
            });
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** A simple pointing device sensor.
     *
     * Listens to mouse events and notifies listeners of dragging events, i.e.
     * start/end of dragging and the dragging itself, as well as touch events,
     * when the pointing device touched an element (e.g. mouse click event).
     * The state of the sensor includes a pointing device position (represented
     * by a ray), the current hit element and corresponding hit point.
     *
     * Users of the class register handlers to the dragging events
     * "dragstart", "drag" and "dragend".
     *
     * @extends XML3D.tools.util.Observable
     *
     */
    XML3D.tools.interaction.behaviors.PDSensor = new XML3D.tools.Class(
        XML3D.tools.util.Observable, {

        listenerTypes: [
            "dragstart", "drag", "dragend", // args (this, MouseEvent)
            "touch", 						// args (this, MouseEvent "mouseup"), drag executed on same location
            "attach", "detach" 				// args (),  raised during calls to attach()/detach()
        ],

        /** Constructor of PDSensor
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         *
         * @param {string} id the id of this sensor
         * @param {Array.<Object>} grps the groups this sensor should look for. All should have the same xml3d root element.
         * @param {XML3D.tools.util.EventDispatcher=} eventDispatcher the object used to register events
         */
        initialize: function(id, grps, eventDispatcher)
        {
        	this.callSuper();

            this.ID = id;
            this.xml3d = XML3D.tools.util.getXml3dRoot(grps[0]);
            this.pickGroups = grps;

            // event dispatcher
            if(eventDispatcher !== undefined)
                this._eventDispatcher = eventDispatcher;
            else
                this._eventDispatcher = new XML3D.tools.util.EventDispatcher();

            // -- pointing device's pose and hit information --
            this.pdPose = new window.XML3DRay(new window.XML3DVec3(0,0,0), new window.XML3DVec3(0,0,1));
            this.curHitElement = null;
            this.curHitPoint = null; // if hit occured, holds hit point, else is null

            // pointing stuff
            /** @private */
            this._sensorIsActive = false;
            /** @private */
            this._numObjsOver = 0; // number of objects the sensor is pointing towards
            /** @private */
            this._mouseDownPos = {x: -1, y: -1};

            // attach sensor
            /** @private */
            this._isAttached = false;
            this.attach();
        },

        // -- attaching/detaching of mouse events --
        /**
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         */
        attach: function()
        {
            if(!this._isAttached)
            {
                this._toggleAttached(true);
                this.notifyListeners("attach");
            }
        },

        /**
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         */
        detach: function()
        {
            if(this._isAttached)
            {
                this._toggleAttached(false);
                this.notifyListeners("detach");
            }
        },

        // -- Status access --
        /**
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         */
        isOver: function() { return (this._numObjsOver === 0); },
        /**
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         */
        isActive: function() { return this._sensorIsActive; },

        // ========================================================================
        // --- Private ---
        // ========================================================================

        /** Internal helper method to (de-)register event listeners
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *  @param {boolean} doAttach
         */
        _toggleAttached: function(doAttach)
        {
            var registerFn = this._eventDispatcher.on.bind(this._eventDispatcher);
            if(!doAttach)
                registerFn = this._eventDispatcher.off.bind(this._eventDispatcher);

            for(var i = 0; i < this.pickGroups.length; i++)
            {
                registerFn(this.pickGroups[i], "mouseover", this.callback("_onMouseOver"));
                registerFn(this.pickGroups[i], "mouseout", this.callback("_onMouseOut"));
                registerFn(this.pickGroups[i], "mousedown", this.callback("_onMouseDown"));
            }

            registerFn(document.body, "mousemove", this.callback("_onMouseMove"));
            registerFn(document.body, "mouseup", this.callback("_onMouseUp"));
            registerFn(document.body, "mouseout", this.callback("_onMouseOutOfCanvas"));

            this._firstPickGroupTransformable = XML3D.tools.MotionFactory.createTransformable(this.pickGroups[0]);

            this._isAttached = !this._isAttached;
        },

        // -- Mouse Event Handlers --
        /** onMouseOver: called if pd is moved over the influenced groups
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *  @param {MouseEvent} evt
         */
        _onMouseOver: function(evt)
        {
            this._numObjsOver++;
        },

        /** onMouseOut: called when pd is moved out of influenced groups
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *
         *  @param {MouseEvent} evt
         */
        _onMouseOut: function(evt)
        {
            this._numObjsOver--;
        },

        /** onMouseOutOfCanvas: called when the mouse leaves
         *
         * @this {XML3D.tools.interaction.behaviors.PDSensor}
         * @private
         * @param evt
         */
    	_onMouseOutOfCanvas: function(evt)
    	{
    		if(this._sensorIsActive)
                if(evt.fromElement.tagName.toLowerCase() == "canvas")
    				this._onMouseUp(evt);
    	},

        /** onMouseDown: called when primary pd button is pressed over influenced groups
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *  @param {MouseEvent} evt
         */
        _onMouseDown: function(evt)
        {
        	evt.stopPropagation();

            this._mouseDownPos = {x: evt.pageX, y: evt.pageY};

            this._pickAndUpdateStatus(evt.pageX, evt.pageY);

            this._sensorIsActive = true;

            this.notifyListeners("dragstart", this, evt);
        },

        /** onMouseMove: called whenever the pd is moved
         *  important: it is called when a move happens in xml3d tag,
         *  not just over influenced groups
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *  @param {MouseEvent} evt
         */
        _onMouseMove: function(evt)
        {
            if(this._sensorIsActive)
            {
                evt.stopPropagation();
                this._pickAndUpdateStatus(evt.pageX, evt.pageY);
                this.notifyListeners("drag", this, evt);
            }
        },

        /** Called when mouseup on xml3d element.
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *
         *  @param {MouseEvent} evt
         */
        _onMouseUp: function(evt)
        {
            this._pickAndUpdateStatus(evt.pageX, evt.pageY);

            if(this._sensorIsActive)
            {
                evt.stopPropagation();

                this._sensorIsActive = false;

                this.notifyListeners("dragend", this, evt);
            }

            // raise click if: mouse position is same for mousedown and mouseup event
            // and an element is currently hit
            if(this.curHitElement
            && this._mouseDownPos.x === evt.pageX
            && this._mouseDownPos.y === evt.pageY
            && evt.button == 0) // only take left-button clicks as touch
                this.notifyListeners("touch", this, evt);
        },

        /** perform a pick with the given page coordinates and update the internal state.
         *
         *  @this {XML3D.tools.interaction.behaviors.PDSensor}
         *  @private
         *  @param {number} pageX
         *  @param {number} pageY
         */
        _pickAndUpdateStatus: function(pageX, pageY)
        {
            /** This is a bugfix I just can't track down somehow. When moving an object with an overlay widget,
             *  e.g. the gizmos, the picking afterwards will report the same point on the whole geometry of a widget part.
             *  It only occurs when using the overlay and won't occur when just translating the elements manually.
             *  Some update must fail, because the next line solves the bug.
             */
            this._firstPickGroupTransformable.setPosition(this._firstPickGroupTransformable.getPosition());

            // update pd sensor status
            this.pdPose = this.xml3d.generateRay(pageX, pageY);

            this.curHitPoint = new window.XML3DVec3();
            this.curHitElement = this.xml3d.getElementByPoint(pageX, pageY, this.curHitPoint);

            if(!this.curHitElement)
                this.curHitPoint = null; // invalidate hit point
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** A plane sensor is a pointing device sensor that maps the movement of
     *  the pointing device on a plane. Listeners can be registered for the
     *  event "translchanged", which is raised whenever the pointing
     *  device changed the position on that plane.
     *  In this case the translation property gives the translation since the
     *  start of dragging.
     *
     *  In addition a constraint can be specified to adjust the calculated translation.
     *
     *  One handy thing is the getCanonicalTranslation() method. No matter what the
     *  current plane origin or normal is, this returns the translation in the
     *  canonical [o: (0,0,0), d: (0,0,1)] plane. This comes in handy when
     *  you need to rely on two dimensions (often the case with mouse).
     *
     *  @extends XML3D.tools.interaction.behaviors.PDSensor
     */

    XML3D.tools.interaction.behaviors.PlaneSensor = new XML3D.tools.Class(
        XML3D.tools.interaction.behaviors.PDSensor,
    {
        /** Constructor of PlaneSensor
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *
         *  @param {string} id the id of this sensor
         *  @param {Array.<Object>} grps the groups this sensor should look for
         *  @param {window.XML3DVec3|!Object=} planeOrient the group or vector the sensor takes to decide where the plane
         * 			normal should reside. If it's a group the local z=0 plane of the given group is taken.
         * 			If a vector is given, the vector directly is taken. If not specified a plane
         * 			parallel to the user's view is taken.
         *  @param {Object=} translationConstraint constraint that is applied to the final translation output
         *  @param {XML3D.tools.util.EventDispatcher=} eventDispatcher the object used to register events
         */
        initialize: function(id, grps, planeOrient, translationConstraint, eventDispatcher)
        {
            this.callSuper(id, grps, eventDispatcher);

            // the translation in the plane during a drag operation
            this.translation = new window.XML3DVec3(0,0,0);

            this._plane = new XML3D.tools.util.Plane(this.xml3d);
            this._plane.setOrientation(planeOrient);

            /** The translation constraint for constraining the final output value */
            if(translationConstraint !== undefined && translationConstraint !== null)
                this._translationConstraint = translationConstraint;
            else
                this._translationConstraint = new XML3D.tools.BoxedTranslationConstraint();

            // setup listeners
            this.addListenerTypes("translchanged");

            this.addListener("dragstart", this.callback("_onPlaneDragStart"));
            this.addListener("drag", this.callback("_onPlaneDrag"));
            this.addListener("dragend", this.callback("_onPlaneDragEnd"));
        },

        setPlaneOrientation: function(newPlaneOrientation)
        {
            this._plane.setOrientation(newPlaneOrientation);
        },

        /** retrieve the current translation value in the canonical
         *  direction (0,0,1) no matter what the current normal is.
         *
         *  In this method no constraints are applied!
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *
         *  @return {XML3DVec3}
         */
        getCanonicalTranslation: function()
        {
            var rotToLocal = new XML3DRotation();
            rotToLocal.setRotation(this._plane.normal(), new XML3DVec3(0,0,1));
            var tp = rotToLocal.rotateVec3(this.translation);

            return tp;
        },

        // ========================================================================
        // --- Private ---
        // ========================================================================

        // --- Drag methods ---
        /** Callback for PDSensor's dragstart event
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.PDSensor} sensor
         */
        _onPlaneDragStart: function(sensor)
        {
            this._plane.origin(sensor.curHitPoint);
            this._planeHitPoint = this._plane.origin();
        },

        /** Callback for PDSensor's drag event
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.PDSensor} sensor
         */
        _onPlaneDrag: function(sensor)
        {
            var hitP = this._calcPlaneHitPoint();
            if(!hitP)
                return;
            this._planeHitPoint = hitP;

            this._calcTranslation();

            this.notifyListeners("translchanged", this);
        },

        /** Callback for PDSensor's dragend event
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.PDSensor} sensor
         */
        _onPlaneDragEnd: function(sensor)
        {
        },

        /** Calculate the hit point on the sensor's plane.
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *  @private
         *
         *  @return {XML3DVec3} the hit point or null in case no hit occured
         */
        _calcPlaneHitPoint: function()
        {
            // intersect ray with view plane norm
            var intersectHitP = new window.XML3DVec3();
            if(1 !== XML3D.tools.math.intersectRayPlane(this.pdPose,
                this._plane.origin(), this._plane.normal(), intersectHitP))
            {
                // either didnt hit or whole ray lies on plane
                // ignore it
                return null;
            }

            return intersectHitP;
        },

        /** Calculate translation based on the current _planeHitPoint
         *  and apply translation offset and constrain it. It will set
         *  the translation property of this instance.
         *
         *  @this {XML3D.tools.interaction.behaviors.PlaneSensor}
         *  @private
         */
        _calcTranslation: function()
        {
            var transl = this._planeHitPoint.subtract(this._plane.origin());
            if(this._translationConstraint.constrainTranslation(transl))
                this.translation.set(transl);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** Scaler maps the translation on a plane into a uniform scaling in all 3 dimensions.
     *
     * Scaling is performed as follows. We remember the current scaling of the target at the
     * beginning of a drag operation. That scaling is multiplied with a factor to lead the new
     * scaling.
     * The factor is computed in _calcUniformScaleFactor(). It is based on the length of the
     * canonical translation vector on the plane.
     * Canonical translation is used for easy computation. It will always lie in the in the plane
     * with normal (0, 0, 1). With that length we have an initial estimate.
     * We want to make the object smaller, too. So we do the following. If both components of
     * the canonical translation are negative, the factor will become negative. The same holds,
     * if only one component is negative, but the length is below a small threshold.
     *
     * To make the scaling more intuitive, at last the factor is adjusted with the size of the
     * world bounding box of the whole widget. The bigger the widget, the less fast the factor
     * increases. If we don't do this, the scaling of the object will grow faster than the mouse
     * position is moving and, thus, flips with the scaling factor can happen.
     *
     * @extends XML3D.tools.interaction.behaviors.PlaneSensor
     */
    XML3D.tools.interaction.behaviors.Scaler = new XML3D.tools.Class(
        XML3D.tools.interaction.behaviors.PlaneSensor,
    {
        /** Constructor of Scaler
         *
         *  @this {XML3D.tools.interaction.behaviors.Scaler}
         *
         *  @param {string} id the id of this sensor
         *  @param {Array.<Object>} pickGrps the groups this sensor will listen for events
         *  @param {XML3D.tools.Transformable} targetTransformable the group this sensor will modify. If not given,
         *             it's equal to the first element in pickGrp.
         *  @param {boolean} [uniformScale] whether to perform uniform scaling. Default: true.
         *  @param {XML3D.tools.util.EventDispatcher=} eventDispatcher the object used to register events
         *
         *  @throws "target no transform"/"pick no transform" - targetGrp/pickGrp doesn't have transform attribute
         */
        initialize: function(id, pickGrps, targetTransformable, uniformScale, eventDispatcher)
        {
            // parent class
            this.callSuper(id, pickGrps, undefined, undefined, eventDispatcher);

            this.uniformScale = true;
            if(uniformScale)
                this.uniformScale = uniformScale;

            if(!targetTransformable)
                targetTransformable = XML3D.tools.MotionFactory.createTransformable(pickGrps[0]);

            this.targetTransformable = targetTransformable;

            // listeners
            this.addListener("dragstart", this.callback("_onScalePlaneDragStart"));
            this.addListener("translchanged", this.callback("_onScalePlaneTranslChanged"));
        },

        // ========================================================================
        // --- Private ---
        // ========================================================================

        /**
         *  @this {XML3D.tools.interaction.behaviors.Scaler}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.Scaler} sensor
         */
        _onScalePlaneDragStart: function(sensor)
        {
            this._startTarGrpScale = new window.XML3DVec3(this.targetTransformable.transform.scale);

            // adjust scaling factor with world bounding box of target node
            var tarSize = XML3D.tools.util.getWorldBBox(this.targetTransformable.object).size();

            this._scaleAdjFactor = tarSize.length();
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Scaler}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.Scaler} sensor
         */
        _onScalePlaneTranslChanged: function(sensor)
        {
            var factor = new window.XML3DVec3();

            if(this.uniformScale)
            {
                var fac = this._calcUniformScaleFactor();
                factor.x = factor.y = factor.z = fac;
            }
            else
                factor = sensor.translation;

            var delta = this._startTarGrpScale.multiply(factor);
            var newScale = this._startTarGrpScale.add(delta);

            this.targetTransformable.setScale(newScale);
        },

        /** Calculates the scaling factor for uniform scaling.
         *  We take the length of the canonical position on the plane. Also
         *  we have to decide when to apply negative scaling. This is done
         *  if either both position attributes, x and y, are negative or
         *  the length is below a certain threshold and one of x and y is negative.
         *
         *  @this {XML3D.tools.interaction.behaviors.Scaler}
         *  @private
         *
         *  @return {number} the scaling factor
         */
        _calcUniformScaleFactor: function()
        {
            var canTrans = this.getCanonicalTranslation();

            var fac = Math.sqrt(canTrans.x*canTrans.x + canTrans.y*canTrans.y);

            if((canTrans.x < 0 && canTrans.y < 0) // both negative
            || ((canTrans.x < 0 || canTrans.y < 0) && fac < XML3D.EPSILON)) // one negative and length below threshold
            {
                fac = -fac;
            }

            fac /= this._scaleAdjFactor;

            return fac;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** Simple 2DOF controlled rotator.
     *
     * Before usage the bounds have to be set. During dragging the given
     * coordinates are assumed to be in the ranges [0,maxX] and [0,maxY] for x and y
     * coordinates, respectively.
     *
     * The rotating speed can be set using the rotateSpeed attribute.
     *
     * The trackball remembers the rotations of previous rotations so that
     * a new drag operation starts at the last executed rotation. To reset
     * the rotation call resetRotationOffset() before starting to drag.
     *
     * Rotation idea taken from xml3d scene controller's rotate action.
     * See XML3D.Xml3dSceneController.prototype.mouseMoveEvent() "case(this.ROTATE)"
     * for more info.
     */
    XML3D.tools.interaction.behaviors.TrackBall = new XML3D.tools.Class({

        /** Initializes the trackball with the dimensions of the tracking space.
         *
         *  The dimensions are needed to normalize the dragging input.
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         *
         *  @param {number} maxX
         *  @param {number} maxY
         */
        initialize: function(maxX, maxY)
        {
            if(maxX && maxY)
                this.setBounds(maxX, maxY);

            this.rotationSpeed = 1;
            this.lastRotation = new window.XML3DRotation(); // last rotation calculated in drag()

            /** accumulated rotation of the lastRotation values of previous drag operations
             * Using rotationOffset we can remember the rotation of a drag operation and
             * use it as starting rotation in a next drag operation.
             * Without this every new drag operation would reset the object's rotation to zero
             * angle.
             */
            this.rotationOffset = new XML3DRotation();

            /** 2D start position of dragging
             *  @private
             */
            this._start2DPos = {x:0, y:0};
            /** @private */
            this._axisRestriction = null;
        },

        /** Sets the maximum x and y values. This is used for
         *  normalizing the 2D positions
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         *
         *  @param {number} maxX
         *  @param {number} maxY
         */
        setBounds: function(maxX, maxY)
        {
            this.maxX = maxX;
            this.maxY = maxY;
        },

        /** Clear the rotation offset
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         */
        resetRotationOffset: function()
        {
            this.rotationOffset = new window.XML3DRotation();
        },

        /** Restrict the rotation to x or y axis
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         *
         *  @param {string} [axis] the axis to restrict to. Can be "x", "y" or "z". Default: release
         *      the restriction.
         */
        axisRestriction: function(axis)
        {
            if(axis && (axis === "x" || axis === "y" || axis === "z"))
                this._axisRestriction = axis;
            else
                this._axisRestriction = null;

            return this._axisRestriction;
        },

        /** Sets the initial point on the sphere
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         *
         *  @param {number} x within [0,maxX]
         *  @param {number} y within [0,maxY]
         */
        dragStart: function(x, y)
        {
            this._start2DPos.x = x;
            this._start2DPos.y = y;
        },

        /** Remember the last output rotation as new offset.
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         */
        dragEnd: function()
        {
            this.rotationOffset = this.lastRotation;
        },

        /** calculate the rotation from start to current point on sphere.
         *
         *  @this {XML3D.tools.interaction.behaviors.TrackBall}
         *
         *  @param {number} x within [0,maxX]
         *  @param {number} y within [0,maxY]
         *  @return {XML3DRotation} the calculated rotation
         */
        drag: function(x, y)
        {
            var newRot = null;

            var fac = this.rotationSpeed * 2.0 * Math.PI;

            // clamp too big values
            if(x > this.maxX)
                x = this.maxX;
            if(y > this.maxY)
                y = this.maxY;

            // calculate deltas from start position
            var dx = (x - this._start2DPos.x) / this.maxX;
            dx *= fac;

            var dy = (y - this._start2DPos.y) / this.maxY;
            dy *= fac;

            var angle = dx + dy;

            // calculate rotation based on the axis restriction
            if(this._axisRestriction == "x")
            {
                newRot = new window.XML3DRotation(new window.XML3DVec3(1,0,0), angle);
            }
            else if(this._axisRestriction == "y")
            {
                newRot = new window.XML3DRotation(new window.XML3DVec3(0,1,0), angle);
            }
            else if(this._axisRestriction == "z")
            {
                newRot = new window.XML3DRotation(new window.XML3DVec3(0,0,1), angle);
            }
            else
            {
                var mx = new window.XML3DRotation(new window.XML3DVec3(0,1,0), dx);
                var my = new window.XML3DRotation(new window.XML3DVec3(1,0,0), dy);

                newRot = mx.multiply(my);
            }

            this.lastRotation = newRot.multiply(this.rotationOffset);

            return this.lastRotation;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** The Rotater takes the translation given by the PlaneSensor and interprets
     *  the individual components as angle in radians along the corresponding axis.
     *
     *  @extends XML3D.tools.interaction.behaviors.PlaneSensor
     */
    XML3D.tools.interaction.behaviors.Rotater = new XML3D.tools.Class(
        XML3D.tools.interaction.behaviors.PlaneSensor,
    {
        /** Constructor of Rotater
         *
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         *
         *  @param {string} id the id of this sensor
         *  @param {Array.<Object>} pickGrps the group this sensor will listen for events
         *  @param {XML3D.tools.Transformable=} targetTransformable the group this sensor will modify.
         *                 If not given, it is equal to the first element in pickGrp.
         *  @param {number=} rotSpeed rotation speed, default is 1
         *                  See XML3D.interaction.behaviors.PlaneSensor for further information.
         *  @param {XML3D.tools.util.EventDispatcher=} eventDispatcher the object used to register events
         *
         *  @throws "target no transform" if the target group doesn't have a transform
         *           attribute
         */
        initialize: function(id, pickGrps, targetTransformable, rotSpeed, eventDispatcher)
        {
            // --- setup pdsensor ---
            this.callSuper(id, pickGrps, undefined, undefined, eventDispatcher);

            // --- setup this sensor ---
            if(!targetTransformable)
                targetTransformable = XML3D.tools.MotionFactory.createTransformable(pickGrps[0]);

            this.targetTransformable = targetTransformable;

            this._rotationSpeed = 1;
            if(rotSpeed)
                this._rotationSpeed = rotSpeed;

            this._initialRotation = new XML3DRotation(this.targetTransformable.getOrientation());
            this._rotationOffset = new XML3DRotation(this._initialRotation);

            this._rotationXAxis = new XML3DVec3(-1, 0, 0);
            this._rotationYAxis = new XML3DVec3(0, 1, 0);
            this._rotationZAxis = new XML3DVec3(0, 0, 1);

            // listeners
            this.addListener("dragstart", this.callback("_onRotaterDragStart"));
            this.addListener("translchanged", this.callback("_onRotaterTranslChanged"));
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         *
         *  @param {string=} axis. Should be "x", "y" or "z"
         *  @return {string} current/new restriction
         */
        axisRestriction: function(axis)
        {
            if(XML3D.tools.util.isDefined(axis))
            {
                this._axisRestriction = axis;
            }

            return this._axisRestriction;
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         */
        clearAxisRestriction: function()
        {
            this._axisRestriction = undefined;
        },

        /** reset the rotation that gets remembered between drags
         *
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         */
        resetRotation: function()
        {
            this.targetTransformable.setOrientation(this._initialRotation);
        },

        /** Set or retrieve the rotation speed
         *
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         *
         *  @param {number} [speed] default: do not set the speed.
         *  @return {number} the current speed
         */
        rotationSpeed: function(speed)
        {
            if(speed)
                this.trackBall.rotationSpeed = speed;

            return this.trackBall.rotationSpeed;
        },

        // ========================================================================
        // --- Private ---
        // ========================================================================

        /**
         *  @private
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         *
         *  @param {XML3D.tools.interaction.behaviors.Rotater} sensor
         */
        _onRotaterDragStart: function(sensor)
        {
            // update the offset with perhaps changed rotation
            this._rotationOffset = new window.XML3DRotation(this.targetTransformable.transform.rotation);
            this._updateRotationAxes();
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Rotater}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.Rotater} sensor
         */
        _onRotaterTranslChanged: function(sensor)
        {
            var t = sensor.getCanonicalTranslation();

            // calculate angle along the axes
            /** in the z=1 plane x-translation should map to y-axis rotation
             *  and y-translation to x-axis rotation
             */
            var angleX = t.y * this._rotationSpeed;
            var angleY = t.x * this._rotationSpeed;

            // apply axis restrictions
            var rotation = new XML3DRotation();
            if(this._axisRestriction === undefined)
            {
                var rotX = new XML3DRotation(this._rotationXAxis, angleX);
                var rotY = new XML3DRotation(this._rotationYAxis, angleY);
                rotation.set(rotY.multiply(rotX));
            }
            else
            {
                var angleSum = angleX + angleY;
                var axis = new XML3DVec3();

                if(this._axisRestriction === "x")
                {
                    axis.set(this._rotationXAxis);
                }
                else if(this._axisRestriction === "y")
                {
                    axis.set(this._rotationYAxis);
                }
                else // === "z"
                {
                    axis.set(this._rotationZAxis);
                }

                rotation.setAxisAngle(axis, angleSum);
            }

            // apply rotation offset
            rotation.set(this._rotationOffset.multiply(rotation));

            // and update target orientation
            this.targetTransformable.setOrientation(rotation);
        },

        /**
         * We will always rotate around the local axes, e.g. (1,0,0) for the x-axis. However,
         * dependent on the view, we might want to rotate around (-1,0,0) for example to stay
         * coherent with the mouse movement.
         * Thus, we will transform these axes from view space to the target space and there take
         * the signs of the corresponding axis.
         *
         * @private
         */
        _updateRotationAxes: function() {
            // get view to target matrix
            var view = XML3D.util.getOrCreateActiveView(this.xml3d);
            var viewToWorldMatrix = view.getViewMatrix().inverse();
            var worldToTargetMatrix = this.targetTransformable.object.getWorldMatrix().inverse();
            var viewToTargetMatrix = viewToWorldMatrix.multiply(worldToTargetMatrix);

            // calculate signs
            var xAxisFactor = viewToTargetMatrix.multiplyDir(new XML3DVec3(-1, 0, 0)).x;
            var yAxisFactor = viewToTargetMatrix.multiplyDir(new XML3DVec3(0, 1, 0)).y;
            var zAxisFactor = viewToTargetMatrix.multiplyDir(new XML3DVec3(0, 0, 1)).z;
            var xAxisSign = this._getSignOfValue(xAxisFactor);
            var yAxisSign = this._getSignOfValue(yAxisFactor);
            var zAxisSign = this._getSignOfValue(zAxisFactor);

            // update axes
            this._rotationXAxis = new XML3DVec3(xAxisSign, 0, 0);
            this._rotationYAxis = new XML3DVec3(0, yAxisSign, 0);
            this._rotationZAxis = new XML3DVec3(0, 0, zAxisSign);
        },

        _getSignOfValue: function(value) {
            return (value < 0) ? -1 : 1;
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** Translater is a plane sensor that maps the translation output of that sensor
     *  directly to the given group transform's translation attribute.
     *
     *  @extends XML3D.tools.interaction.behaviors.PlaneSensor
     */
    XML3D.tools.interaction.behaviors.Translater = new XML3D.tools.Class(
            XML3D.tools.interaction.behaviors.PlaneSensor,
    {
        /** Constructor of Translater
         *
         *  @this {XML3D.tools.interaction.behaviors.Translater}
         *
         *  @param {string} id the id of this sensor
         *  @param {Array.<window.Element>} pickGrps the group this sensor should look for
         *  @param {XML3D.tools.Transformable} targetTransformable the movable this sensor will modify.
         *                 If not given, a Movable will be created from the first element of pickGrps
         *  @param {XML3DVec3|!window.Element} [planeOrient] the group or vector the sensor takes to decide where the plane
         *             normal should reside. If it's a group the local z=0 plane of the given group is taken.
         *             If a vector is given, the vector directly is taken. If not specified a plane
         *             parallel to the user's view is taken.
         *  @param {XML3D.tools.util.EventDispatcher=} eventDispatcher the object used to register events
         */
        initialize: function(id, pickGrps, targetTransformable, planeOrient, eventDispatcher)
        {
            if(!targetTransformable)
                targetTransformable = XML3D.tools.MotionFactory.createTransformable(pickGrps[0]);

            this.targetTransformable = targetTransformable;

            // take local matrix as initial offset
            // we manipulate the transform node of the group, so take the local one
            this._translationOffset = new window.XML3DVec3(this.targetTransformable.transform.translation);

            this.callSuper(id, pickGrps, planeOrient, undefined, eventDispatcher);

            this.addListener("dragstart", this.callback("_onTransPlaneDragStart"));
            this.addListener("translchanged", this.callback("_onTranslChanged"));
        },


        // ========================================================================
        // --- Private ---
        // ========================================================================

        /**
         *  @this {XML3D.tools.interaction.behaviors.Translater}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.Translater} sensor
         */
        _onTransPlaneDragStart: function(sensor)
        {
            this._translationOffset.set(this.targetTransformable.getPosition());
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.Translater}
         *  @private
         *
         *  @param {XML3D.tools.interaction.behaviors.Translater} sensor
         */
        _onTranslChanged: function(sensor)
        {
            /** The translation of the PDSensor is in world-space, thus we will transform
             *  it to fit into the target node's local space. It does not need to be translated
             *  since that is what we care about. But the rotation should match the target node's
             *  space. Thus we will transform it by the parent node's world orientation.
             *  We do not take the target node's world orientation itself because the translation
             *  of the target node does not include it's rotation (an object is translate and afterwards
             *  it is rotated).
             *  We do the same for the scaling factor. If the scaling of the parent node is too high/low
             *  the translation will be too much/less.
             */
            var localTranslation = this.translation;
            if(this.targetTransformable.object.parentNode.getWorldMatrix !== undefined)
            {
                var parentWorldMatrix = this.targetTransformable.object.parentNode.getWorldMatrix();
                var worldToLocalRotation = parentWorldMatrix.rotation().inverse();
                var localToWorldScale = parentWorldMatrix.scaling();
                var worldToLocalScale =
                    new XML3DVec3(1/localToWorldScale.x, 1/localToWorldScale.y, 1/localToWorldScale.z);
                localTranslation = localTranslation.multiply(worldToLocalScale);
                localTranslation = worldToLocalRotation.rotateVec3(localTranslation);
            }

            var finalTransl = this._translationOffset.add(localTranslation);
            this.targetTransformable.setPosition(finalTransl);
        }
    });
}());
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.behaviors");

    /** A translater which permits movement along the surface only. It does this by
     *  attaching a XML3D.tools.AlongSurfaceTranslationConstraint to the target
     *  transformable.
     *
     *  @extends XML3D.tools.interaction.behaviors.Translater
     */
    XML3D.tools.interaction.behaviors.AlongSurfaceTranslater = new XML3D.tools.Class(
        XML3D.tools.interaction.behaviors.Translater,
    {
        /**
         *  @this {XML3D.tools.interaction.behaviors.AlongSurfaceTranslater}
         *  @override
         *  @public
         */
        initialize: function(id, pickGrps, targetTransformable, eventDispatcher)
        {
            if(!targetTransformable)
                targetTransformable = XML3D.tools.MotionFactory.createTransformable(pickGrps[0]);
            targetTransformable = this._createCustomTransformable(targetTransformable);
            this.callSuper(id, pickGrps, targetTransformable, new XML3DVec3(0, 1, 0), eventDispatcher);
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.AlongSurfaceTranslater}
         *  @private
         */
        _createCustomTransformable: function(targetTransformable)
        {
            this._constraint = new XML3D.tools.AlongSurfaceTranslationConstraint(targetTransformable);
            var cascadedConstraint = new XML3D.tools.CascadedConstraint(
                targetTransformable.constraint, this._constraint);
            return XML3D.tools.MotionFactory.createTransformable(
                targetTransformable.object, cascadedConstraint);
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.AlongSurfaceTranslater}
         *  @public
         */
        enableConstraint: function()
        {
            this._constraint.enable();
        },

        /**
         *  @this {XML3D.tools.interaction.behaviors.AlongSurfaceTranslater}
         *  @public
         */
        disableConstraint: function()
        {
            this._constraint.disable();
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.widgets");

    /**
     * Widget is a utility base class, that gathers some common functions required
     * by most widgets.
     *
     * o geometry and behavior attributes: places where to put geometry and behavior
     * o attach/detach(): automatic attach and detach and invoking corresponding callbacks, so child classes can react.
     * o onTargetXfmChanged() : called automatically when target's transformation changes
     * o callbacks where object creation/destruction takes place
     * o inherited from XML3D.tools.util.Observable: child classes can use event mechanism easily.
     * o automatic translation of widget geometry to the bbox center of the target node
     *
     * Derived classes have to specify the property GeometryType. It is used to construct the geometry
     * of the specific widget.
     *
     * @extends XML3D.tools.util.Observable
     */
    XML3D.tools.interaction.widgets.Widget = new XML3D.tools.Class(
        XML3D.tools.util.Observable, {

        // this should be overriden by derived classes, else the widget won't have any geometry
        GeometryType: XML3D.tools.interaction.geometry.Geometry,

        /** Sets up the basic construct for a widget.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *
         *  @param {string} id the id if this TransformBox and also the id of the corresponding root group node
         *  @param {XML3D.tools.Transformable} target the target transformable
         *  @param {Object=} options
         *
         *  Options:
         *  o geometry: options given to the instanciated geometry class
         *
         *  IMPORTANT: the target's corresponding transform node (for a group: the attached
         *  transform node and for a mesh that of it's parent node) is modified. If the target's
         *  group node has no transform element attached one is created.
         */
        initialize: function(id, target, options)
        {
            if(!options)
                options = {};

            this.callSuper();
            this.addListenerTypes(["dragstart", "drag", "dragend"]); // arg: this

            this.xml3d = XML3D.tools.util.getXml3dRoot(target.object);
            this.ID = id;
            this.target = target;

            this.geometry = new this.GeometryType(this, options.geometry);
            this.behavior = {}; // localID -> behavior, storage for all sensors and alike

            this._isAttached = false;
        },

        /** @this {XML3D.tools.interaction.widgets.Widget} */
        attach: function()
        {
            if(!this._isAttached)
            {
                this.onBeforeAttach();
                this.geometry.constructAndAttach();
                this._createBehavior();

                this._isAttached = true;
            }
        },

        /** @this {XML3D.tools.interaction.widgets.Widget} */
        detach: function()
        {
            if(this._isAttached)
            {
                this._destroyBehavior();
                this.geometry.destroy();

                this.onAfterDetach();

                this._isAttached = false;
            }
        },

        /** Returns true if any object in the behavior is active. That means
         *  it has a method isActive and that method returns true.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *
         *  @return {boolean}
         */
        isActive: function()
        {
            if(!this._isAttached)
                return false;

            for(var i in this.behavior)
            {
                if(this.behavior[i].isActive
                && this.behavior[i].isActive())
                    return true;
            }

            return false;
        },

        /** This is the target that should be used for the behaviors.
         *  It will be a transformable pointing to the widget's root node, i.e.
         *  the target's node.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @return {XML3D.tools.Transformable}
         */
        createBehaviorTarget: function(constraint)
        {
            return XML3D.tools.MotionFactory.createTransformable(this.target.object, constraint);
        },

        // --- Methods to be overriden ---

        /** Called before anything is attached.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @protected
         */
        onBeforeAttach: function() {},

        /** Called after everything is detached.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @protected
         */
        onAfterDetach: function() {},

        /** Called after defs and groups are attached and the behavior can be set up. This
         *  is done afterwards a TransformTracker is placed in behavior["target_track"] which
         *  will invoke the onTarXfmChanged() method, so that clients have a place to adjust
         *  to transformation changes.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @protected
         */
        onCreateBehavior: function() {},

        /** Called before geometry is destroyed and where the sensor attribute is still filled.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @protected
         */
        onDestroyBehavior: function() {},

        // --- Global ID stuff ---
        /** all IDs are prefixed with the widget's ID. This function
         *  encapsulates the creation of such "global" IDs.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *
         *  @param localID
         *  @return {string} the ID prefixed with the widget's ID
         */
        globalID: function(localID)
        {
            return this.ID + "_" + localID;
        },

        /** Returns the element corresponding to the global if of the given
         *  local id.
         *
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *
         *  @param {string} localID
         *  @return {Element}
         */
        element: function(localID)
        {
            return document.getElementById(this.globalID(localID));
        },

        // ========================================================================
        // --- Private ---
        // ========================================================================

        _createBehavior: function()
        {
            this.onCreateBehavior();
            for(var s in this.behavior)
            {
                var beh = this.behavior[s];

                if(beh.attach)
                    beh.attach();

                if(!beh.addListener || !beh.isListenerType || !beh.isListenerType("dragstart")
                || !beh.isListenerType("drag") || !beh.isListenerType("dragend"))
                    continue;

                beh.addListener("dragstart", this.callback("_onBehaviorDragStart"));
                beh.addListener("drag", this.callback("_onBehaviorDrag"));
                beh.addListener("dragend", this.callback("_onBehaviorDragEnd"));
            }

            this._isDragging = false;
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.Widget}
         *  @private
         */
        _destroyBehavior: function()
        {
            this.onDestroyBehavior();
            for(var s in this.behavior)
            {
                if(this.behavior[s].detach)
                    this.behavior[s].detach();
            }

            this.behavior = {};
        },

        _onBehaviorDragStart: function()
        {
            if(this._isDragging)
                return;

            this._isDragging = true;
            this.notifyListeners("dragstart", this);
        },

        _onBehaviorDrag: function()
        {
            this.notifyListeners("drag", this);
        },

        _onBehaviorDragEnd: function()
        {
            if(!this._isDragging)
                return;

            this._isDragging = false;
            this.notifyListeners("dragend", this);
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.widgets");

    /** An OverlayWidget will work on a xml3d overlay to modify the given target.
     *  This class will setup a mirror for the target node and with that initialize
     *  the base class.
     *
     *  @extends XML3D.tools.interaction.widgets.Widget
     */
    XML3D.tools.interaction.widgets.OverlayWidget = new XML3D.tools.Class(
        XML3D.tools.interaction.widgets.Widget, {

        /**
         *  @this {XML3D.tools.interaction.widgets.OverlayWidget}
         *  @param {string} id
         *  @param {Object} options
         *
         *  The options are the following:
         *  o target: if given a GroupMirror is constructed with that target
         *  o xml3dOverlay: if target is given, an overlay can be specified that is given to
         *      the GroupMirror constructor
         *  o mirror: if given, the given mirror is used as basis for this widget.
         *
         *  Either target (and optionally xml3dOverlay) or mirror must be given.
         */
        initialize: function(id, options)
        {
            if(!options)
                throw new Error("XML3D.tools.interaction.widgets.TranslateGizmo: no options given.");
            options = XML3D.tools.extend({}, options);

            if(options.mirror !== undefined)
            {
                this._selfCreatedMirror = false;
                this._mirror = options.mirror;
            }
            else if(options.target !== undefined)
            {
                this._selfCreatedMirror = true;
                this._mirror = new XML3D.tools.xml3doverlay.GroupMirror(
                    id, options.target, options.xml3dOverlay);
            }
            else
                throw new Error("XML3D.tools.interaction.widgets.TranslateGizmo: the options must be either a target or a mirror.");

            this._mirror.attach();

            this.callSuper(id, this._mirror.mirroredTarget(), options);
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.OverlayWidget}
         *  @override
         *  @protected
         */
        onBeforeAttach: function()
        {
            this.callSuper();
            if(this._selfCreatedMirror)
                this._mirror.attach();
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.OverlayWidget}
         *  @override
         *  @protected
         */
        onAfterDetach: function()
        {
            this.callSuper();
            if(this._selfCreatedMirror)
                this._mirror.detach();
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.OverlayWidget}
         *  @return {XML3D.tools.XML3D.tools.interaction.behaviors.GroupMirror} the mirror set up by this class
         */
        mirror: function()
        {
            return this._mirror;
        },

        /** In addition to asking given constraint functions whether the constraint should apply
         *  it also set's the target node's properties, if the constraint admits the new values.
         *
         *  @param {Object} the constraint functions to be applied. They have the same signature
         *      and name as in XML3D.tools.Constraint.
         */
        createReflectingConstraint: function(options)
        {
            var target = XML3D.tools.MotionFactory.createTransformable(
                this._mirror.target().object);

            var options = options || {};

            return {
                constrainRotation: function(newRotation, opts){

                    if(options.constrainRotation && !options.constrainRotation(newRotation, opts))
                        return false;

                    target.setOrientation(newRotation);
                    return true;
                },

                constrainScaling: function(newScale, opts){

                    if(options.constrainScaling && !options.constrainScaling(newScale, opts))
                        return false;

                    target.setScale(newScale);
                    return true;
                },

                constrainTranslation: function(newTranslation, opts) {

                    if(options.constrainTranslation && !options.constrainTranslation(newTranslation, opts))
                        return false;

                    target.setPosition(newTranslation);
                    return true;
                }
            };
        }
    });
}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.widgets");

    /**
     *  A TranslateGizmo attaches three arrow-handles to the target and
     *  through that enables constraint translation either along a single
     *  axis or a plane.
     *
     *  @extends XML3D.tools.interaction.widgets.OverlayWidget
     *
     *  constructor options:
     *  o geometry.scale: a custom scaling of the widget geometry
     *  o disabledComponents: an array with the names of components that are to be disabled
     *      - values: "xaxis", "yaxis", "zaxis", "xyplane", "xzplane", "yzplane"
     */
    XML3D.tools.interaction.widgets.TranslateGizmo = new XML3D.tools.Class(
        XML3D.tools.interaction.widgets.OverlayWidget, {

        GeometryType: XML3D.tools.interaction.geometry.TranslateGizmo,
        disabledComponents: [],

        initialize: function(id, options)
        {
            if(options.disabledComponents)
            {
                this.disabledComponents = options.disabledComponents;
                if(!options.geometry)
                    options.geometry = {};
                options.geometry.disabledComponents = options.disabledComponents;
            }

            this.callSuper(id, options);
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @override
         *  @protected
         */
        onCreateBehavior: function()
        {
            this._setup1DTranslaters();
            this._setup2DTranslaters();
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @private
         */
        _setup1DTranslaters: function()
        {
            if(0 > this.disabledComponents.indexOf("xaxis"))
            {
                var xAxisConstraintFn = function(currentTranslation, newTranslation) {
                    newTranslation.y = currentTranslation.y;
                    newTranslation.z = currentTranslation.z;
                };

                this.behavior["xaxis"] = this._create1DTranslater(
                    "xaxis", "zaxis", xAxisConstraintFn);
            }

            if(0 > this.disabledComponents.indexOf("yaxis"))
            {
                var yAxisConstraintFn = function(currentTranslation, newTranslation) {
                    newTranslation.x = currentTranslation.x;
                    newTranslation.z = currentTranslation.z;
                };

                this.behavior["yaxis"] = this._create1DTranslater(
                    "yaxis", "zaxis", yAxisConstraintFn);
            }

            if(0 > this.disabledComponents.indexOf("zaxis"))
            {
                var zAxisConstraintFn = function(currentTranslation, newTranslation) {
                    newTranslation.x = currentTranslation.x;
                    newTranslation.y = currentTranslation.y;
                };

                this.behavior["zaxis"] = this._create1DTranslater(
                    "zaxis", "xaxis", zAxisConstraintFn);
            }
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @private
         */
        _setup2DTranslaters: function()
        {
            if(0 > this.disabledComponents.indexOf("xyplane"))
                this.behavior["xyplane"] = this._create2DTranslater("xyplane");
            if(0 > this.disabledComponents.indexOf("yzplane"))
                this.behavior["yzplane"] = this._create2DTranslater("yzplane");
            if(0 > this.disabledComponents.indexOf("xzplane"))
                this.behavior["xzplane"] = this._create2DTranslater("xzplane");
        },

        /** Sets up a XML3D.tools.interaction.behaviors.Translater for 1D translation.
         *  An event dispatcher will be configured for mousedown event to allow
         *  only left button in combination if no ctrl key being pressed.
         *
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @private
         *
         *  @param {string} id should be the axisname, e.g. xaxis and correspond to the geometry name
         *  @param {string} planeOrientGrp the plane orientation of the translater
         *  @param {function(window.XML3DVec3,window.XML3DVec3)} constraintFn
         *  @return {XML3D.tools.interaction.behaviors.Translater}
         */
        _create1DTranslater: function(id, planeOrientGrpId, constraintFn)
        {
            var eventDispatcher = new XML3D.tools.util.EventDispatcher("mousedown", function(evt){
                return (evt.button === XML3D.tools.MOUSEBUTTON_LEFT);
            });

            var constraint = this._createTranslationConstraint(constraintFn);
            var behaviorTarget = this.createBehaviorTarget(constraint);

            var pickGrps = [this.geometry.getGeo(id)];

            var translater = new XML3D.tools.interaction.behaviors.Translater(
                this.globalID(id), pickGrps, behaviorTarget,
                this.geometry.getGeo(planeOrientGrpId), eventDispatcher);

            translater.addListener("dragstart", function() {
                this.geometry.addHighlight(id);
            }.bind(this));
            translater.addListener("dragend", function() {
                this.geometry.removeHighlight(id);
            }.bind(this));

            return translater;
        },

        /** Sets up a XML3D.tools.interaction.behaviors.Translater for 2D translation.
         *
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @private
         *
         *  @param {string} id
         *  @return {XML3D.tools.interaction.behaviors.Translater}
         */
        _create2DTranslater: function(id)
        {
            var eventDispatcher = new XML3D.tools.util.EventDispatcher("mousedown", function(evt) {
                return (evt.button === XML3D.tools.MOUSEBUTTON_LEFT);
            });

            var constraint = this._createTranslationConstraint(function(){});
            var behaviorTarget = this.createBehaviorTarget(constraint);

            var pickGrps = [this.geometry.getGeo(id)];

            var translater = new XML3D.tools.interaction.behaviors.Translater(
                this.globalID(id), pickGrps, behaviorTarget,
                pickGrps[0], eventDispatcher);

            translater.addListener("dragstart", function() {
                this.geometry.addHighlight(id);
            }.bind(this));
            translater.addListener("dragend", function() {
                this.geometry.removeHighlight(id);
            }.bind(this));

            return translater;
        },

        /** Creates a translation constraint, where the given constraint function is applied
         *  and afterwards updates the real target's translation with the new translation.
         *
         *  @this {XML3D.tools.interaction.widgets.TranslateGizmo}
         *  @private
         *
         *  @param {function(window.XML3DVec3,window.XML3DVec3)} constrainTranslationFunction
         *  @return {XML3D.tools.Constraint}
         *
         *  The constraint function is given the current translation and new translation
         *  and should update the new translation. The given translation values are
         *  in local space of the target node.
         */
        _createTranslationConstraint: function(constrainTranslationFunction) {
            function constrainTranslation(newTranslation, opts)
            {
                if(!opts.transformable)
                    throw new Error("Constraint: no transformable given.");

                /** We want the translation to be in local space of the target node, which
                 *  includes the target node's own rotation. This rotation is not yet applied
                 *  to the translation value, so we transform it here.
                 */
                // apply target node's rotation
                var currentTranslation = opts.transformable.getPosition();
                var targetRotation = opts.transformable.getOrientation();
                var invTargetRotation = targetRotation.inverse();

                // we take the inverse rotation because we want to transform from the target's
                // "world" space to the target's local space (incl. rotation)
                var localCurTranslation = invTargetRotation.rotateVec3(currentTranslation);
                var localNewTranslation = invTargetRotation.rotateVec3(newTranslation);

                // constrain it
                constrainTranslationFunction(localCurTranslation, localNewTranslation);

                // invert the rotation again
                var targetNewTranslation = targetRotation.rotateVec3(localNewTranslation);
                newTranslation.set(targetNewTranslation);

                return true;
            };

            return this.createReflectingConstraint({constrainTranslation: constrainTranslation});
        }
    });

}());
/*
Copyright (c) 2010-2014
              DFKI - German Research Center for Artificial Intelligence
              www.dfki.de

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.widgets");

    /**
     *  This gizmo adds 3 small rectangles to the target object with which the
     *  rotation of the target can be controlled, constrained to single axes the
     *  rectangle present.
     *
     * @extends XML3D.tools.interaction.widgets.OverlayWidget
     */
    XML3D.tools.interaction.widgets.RotateGizmo = new XML3D.tools.Class(
        XML3D.tools.interaction.widgets.OverlayWidget, {

        GeometryType: XML3D.tools.interaction.geometry.RotateGizmo,

        /**
         *  @this {XML3D.tools.interaction.widgets.RotateGizmo}
         *
         *  options:
         *  o geometry.scale: a custom scaling of the widget geometry
         *  o geometry.bandWidth: the width of a band (default: 1)
         */
        initialize: function(id, options)
        {
            this.callSuper(id, options);

            if(options.rotationSpeed)
                this._rotationSpeed = options.rotationSpeed;
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.RotateGizmo}
         *  @override
         *  @protected
         */
        onCreateBehavior: function()
        {
            this.behavior["xaxis"] = this._createRotater("x");
            this.behavior["yaxis"] = this._createRotater("y");
            this.behavior["zaxis"] = this._createRotater("z");
        },

        /**
         *  @this {XML3D.tools.interaction.widgets.RotateGizmo}
         *  @private
         *
         *  @param {string} axis. "x", "y" or "z"
         */
        _createRotater: function(axis)
        {
            var geoId = axis + "axis";

            var eventDispatcher = new XML3D.tools.util.EventDispatcher("mousedown", function(evt) {
                return (evt.button === XML3D.tools.MOUSEBUTTON_LEFT);
            });

            var constraint = this.createReflectingConstraint();
            var behaviorTarget = this.createBehaviorTarget(constraint);

            var pickGrps = [this.geometry.getGeo(geoId)];

            var rot = new XML3D.tools.interaction.behaviors.Rotater(
                this.globalID(geoId), pickGrps, behaviorTarget, this._rotationSpeed, eventDispatcher);
            rot.axisRestriction(axis);

            rot.addListener("dragstart", function() {
                this.geometry.addHighlight(geoId);
            }.bind(this));
            rot.addListener("dragend", function() {
                this.geometry.removeHighlight(geoId);
            }.bind(this));

            return rot;
        }
    });
}());
/*
 Copyright (c) 2010-2014
 DFKI - German Research Center for Artificial Intelligence
 www.dfki.de

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 of the Software, and to permit persons to whom the Software is furnished to do
 so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function(){

    "use strict";

    XML3D.tools.namespace("XML3D.tools.interaction.widgets");

    /** Attaches a XML3D.tools.interaction.behaviors.AlongSurfaceTranslater to the given
     *  target. You can disable the constraint when dragging by pressing a key (Ctrl by default).
     *
     *  @extends XML3D.tools.interaction.widgets.Widget
     */
    XML3D.tools.interaction.widgets.AlongSurfaceTranslateGizmo = new XML3D.tools.Class(
        XML3D.tools.interaction.widgets.Widget, {

            /**
             *  @this {XML3D.tools.interaction.widgets.AlongSurfaceTranslateGizmo}
             *  @override
             *  @public
             *
             *  options:
             *      o keyDisableConstraint: the key with which to disable the constraint (Ctrl by default)
             */
            initialize: function(id, target, options)
            {
                var options = options || {};
                this._keyDisableConstraint = XML3D.tools.KEY_CTRL;
                if(options.keyDisableConstraint !== undefined)
                    this._keyDisableConstraint = options.keyDisableConstraint;

                this.callSuper(id, target, options);
            },

            /**
             *  @this {XML3D.tools.interaction.widgets.AlongSurfaceTranslateGizmo}
             *  @override
             *  @protected
             */
            onCreateBehavior: function()
            {
                this.behavior["main"] = new XML3D.tools.interaction.behaviors.AlongSurfaceTranslater(
                    this.globalID("main"), [this.target.object], this.target);
                this.behavior["main"].addListener("dragstart", this._onDragStart.bind(this));
                this.behavior["main"].addListener("dragend", this._onDragEnd.bind(this));
            },

            /**
             *  @this {XML3D.tools.interaction.widgets.AlongSurfaceTranslateGizmo}
             *  @private
             */
            _onDragStart: function()
            {
                if(XML3D.tools.KeyboardState.isPressed(this._keyDisableConstraint))
                    this.behavior["main"].disableConstraint();
            },

            /**
             *  @this {XML3D.tools.interaction.widgets.AlongSurfaceTranslateGizmo}
             *  @private
             */
            _onDragEnd: function()
            {
                this.behavior["main"].enableConstraint();
            }
        });
}());
