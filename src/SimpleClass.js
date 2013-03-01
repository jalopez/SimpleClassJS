var Class = function() {
    // TODO: Check the number of arguments 

    var constructor = function(){},
        methods = {},
        baseClass = null;

    if (arguments[0]) {
        if (typeof arguments[0] == "object") {
            methods = arguments[0];
        } else if (typeof arguments[0] == "function") {
            baseClass = arguments[0];
            methods = arguments[1];
            constructor = baseClass.prototype.constructor;
        } else {
            // TODO: Throw exception
        }

        if (methods.hasOwnProperty("constructor") && 
            typeof methods.constructor == "function") {
            constructor = methods.constructor;
        }
    }

    
    var klass = function() {
        constructor.apply(this, arguments);
    };

    if (baseClass) {
        klass.prototype = new baseClass;
    }
    for (var method in methods) {
        if (methods.hasOwnProperty(method) && method !== "constructor") {
            var parentMethod = klass.prototype[method];

            klass.prototype[method] = (function(_method, _super) {
                return function() {
                    this._super = _super || function() {};
                    return _method.apply(this, arguments);
                };
            })(methods[method], parentMethod);
        }
    }
    return klass;
};
