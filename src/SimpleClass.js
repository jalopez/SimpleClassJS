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
        if (methods.hasOwnProperty(method) && method != "constructor") {
            var parentMethod = klass.prototype[method];
            if (parentMethod) {
                klass.prototype[method] = function() {
                    var _super = function() {
                        return parentMethod.apply(this, arguments);
                    }
                    return methods[method].apply(this, arguments);
                }
            } else {
                klass.prototype[method] = methods[method];
            }
        }
    }
    return klass;
};
