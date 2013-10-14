/**
 * Class mechanism
 * @see https://github.com/jalopez/SimpleClassJS
 * @param {Object|Function} parent The parent class of this one. If only one parameter, it will an
 *									object containing the class methods.
 * @param {Object=} methods (optional) The class methods. When omitted, methods will be the first param
 * @return {Function} the class.
 */
var Class = function(parent, methods) {

	var	BaseClass = null,
		constructor = function() {};

	methods = methods || {};

	if (parent) {
		if (typeof parent === 'object') {
			methods = parent;
		} else {
			// Assume it is a function
			BaseClass = parent;
			constructor = BaseClass.prototype.constructor;
		}

		if (methods.hasOwnProperty('constructor') && typeof methods.constructor === 'function') {
			constructor = methods.constructor;
		}
	}

	var klass = function() {
		if (!(this instanceof klass)) {
			// Invoked without 'new'
			// we need to wrap constructor call in a function to pass arguments
			var F = function(args) {
				return klass.apply(this, args);
			};
			F.prototype = klass.prototype;
			return new F(arguments);
		} else {
			var prevSuper = this._super,
				that = this;

			this._super = function() {
				if (BaseClass) {
					BaseClass.apply(that, arguments);
				}
			};
			constructor.apply(this, arguments);
			this._super = prevSuper;
		}
	};

	if (BaseClass) {
		// We need an intermediate class to avoid errors with constructors with parameters
		var Intermediate = function() {};
		Intermediate.prototype = BaseClass.prototype;
		klass.prototype = new Intermediate();
	}
	for (var method in methods) {
		if (methods.hasOwnProperty(method) && method !== 'constructor') {
			var parentMethod = klass.prototype[method];

			klass.prototype[method] = (function(_method, _super) {
				return function() {
					var prevSuper = this._super;
					this._super = _super || function() {};
					var ret = _method.apply(this, arguments);
					this._super = prevSuper;
					return ret;
				};
			})(methods[method], parentMethod);
		}
	}
	return klass;
};

if (typeof module !== 'undefined') {
    module.exports = Class;
}
