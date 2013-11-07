// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once. since the whole function is wrapped in parentheses,
		// none of these variables are put in the global namespace.
		var catify = "catify",
				defaults = {
				propertyName: "value"
		};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element; //'this' in a constructor always refers to the instance of a constructor
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.options = $.extend( {}, defaults, options );

				//generaly an underscore prepended to a variable means "do not change this again"
				this._defaults = defaults;
				this._name = catify;
				this.$el = $(this.element)
				this.init();
		}

		Plugin.prototype = {
				

				init: function () {
					// Place initialization logic here
					// You already have access to the DOM element and
					// the options via the instance, e.g. this.element
					// and this.options
					// you can add more functions like the one below and
					// call them like so: this.yourOtherFunction(this.element, this.options).
					console.log('catify has been called');
					this.playSound('Messiah.mp3')
					var that = this
					setInterval(function() {
						that.setBackground()
					}, 200)

				},

				playSound: function (soundfile) {
 					document.getElementById("element").innerHTML=
 					"<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"true\" />";
 				},

 				setBackground: function ()
				{
					var randomColor = [
					'#0000FF', 
					'#FF1919', 
					'#19D119', 
					'FF33FF', 
					"#FFFF00", 
					"#7D9999", 
					'#990000',
					'#003D5C',
					'#D14719',
					'#00FF99'
					]
					console.log("-webkit-linear-gradient(top, "+ randomColor[Math.floor(Math.random()*10)] + " 0%,"+ randomColor[Math.floor(Math.random()*10)] + " 100%)")
					$("body").css({"background": "-webkit-linear-gradient("+ randomColor[Math.floor(Math.random()*10)] + " 0%,"+ randomColor[Math.floor(Math.random()*10)] + " 100%)"});

				}

		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[catify] = function ( options ) {
				return this.each(function() {
						if ( !$.data( this, "plugin_" + catify ) ) {
								$.data( this, "plugin_" + catify, new Plugin( this, options ) );
						}
				});
		};

})( jQuery, window, document );
