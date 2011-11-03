var Class = function(methods) {
    var constructor = function(){};
    if (methods) {
        if (methods.constructor && methods.constructor instanceof Function) {
            constructor = methods.constructor;
        }
    }

    var klass = function() {
        constructor.apply(this, arguments);
    };

    klass.prototype = methods;

    return klass;
};
