var Class = function(methods) {
    var constructor = function(){};
    if (methods) {
        if (methods.constructor && methods.constructor instanceof Function) {
            constructor = methods.constructor;
        }
    }

    var context = {};

    var klass = function() {
        constructor.apply(context, arguments);
    };

    return klass;
};
