var Class = function(methods) {
    var constructor = function(){};
    if (methods) {
        if (methods.constructor && methods.constructor instanceof Function) {
            constructor = methods.constructor;
        }
    }

    var klass = function() {
        return new constructor();
    };

    return klass;
};
