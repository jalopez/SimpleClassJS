describe("SimpleClassJS", function() {

    it("should create an empty class", function() {
        // When
        var Empty = Class();

        // Expect
        expect(Empty).toBeDefined();
    });


    it("should create a class with a constructor", function() {
        // Given
        var i = 0;
        
        var Simple = Class({
            constructor: function() {
                i++; 
            }
        });

        // When
        var instance1 = new Simple(),
            instance2 = new Simple();

        // Expect
        expect(i).toBe(2);
    });

    it("should accept constructors with a parameter", function() {
        // Given
        var i = 0;

        var Sum = Class({
            constructor: function(sum) {
                i += sum;
            }
        });

        // When
        var instance1 = new Sum(3),
            instance2 = new Sum(4);

        // Expect
        expect(i).toBe(7);
    });

    it("should accept constructors with many parameters", function() {
        // Given
        var i = 0;

        var Sum2 = Class({
            constructor: function(a, b) {
                i = a + b;
            }
        });

        // When
        var instance = new Sum2(3,2);

        // Expect
        expect(i).toBe(5);
    });

    it("should contain public methods", function() {
        // Given
        var i = 0;

        var Increment = Class({
            increment: function() {
                i++;
            }
        });

        // When
        var instance = new Increment();
        instance.increment();
        instance.increment();

        // Expect
        expect(i).toBe(2);
    });

    it("should have methods that access to instance context", function() {
        // Given
        var SimpleGetter = Class({
            constructor: function(a, b) {
                this.a = a;
                this.b = b;
            },
            getA: function() {
                return this.a;
            },
            getB: function() {
                return this.b;
            }
        });
    
        // When
        var instance = new SimpleGetter(2,3);

        // Expect
        expect(instance.getA()).toBe(2);
        expect(instance.getB()).toBe(3);
    });

    it("should have methods that call other methods", function() {
        // Given
        var Sum = Class({
            constructor: function(a, b) {
                this.a = a;
                this.b = b;
            },
            getA: function() {
                return this.a;
            },
            getB: function() {
                return this.b;
            },
            sum: function() {
                return this.getA() + this.getB();
            }
        });

        // When
        var instance = new Sum(2,4);

        // Then
        expect(instance.sum()).toBe(6);
    });

    it("should have inherited classes", function() {
        // Given
        var Base = Class({
            constructor: function(a) {
                this.a = a;
            },
            getA: function(a) {
                return this.a;
            }
        });
        var Inherited = Class(Base, {
            sum: function(b) {
                return this.getA() + b;
            }
        });
        // When
        instance = new Inherited(2);
    
        // Then
        expect(instance.sum(3)).toBe(5);
    });

    it("should override constructor", function() {
        // Given
        var Base = Class({
            constructor: function(a) {
                this.a = a;
            },

            getA: function(a) {
                return this.a;
            }
        });
        var Inherited = Class(Base, {
            constructor: function(a) {
                this.a = 2*a;
            }
        });

        // When
        instance = new Base(2);
        instance2 = new Inherited(2);
        
        // Then
        expect(instance.getA()).toBe(2);
        expect(instance2.getA()).toBe(4);
    });

    it("should have inherited with no constructors", function() {
        // Given
        var Base = Class({
            printHello: function() {
                return "hello";
            }
        });

        var Inherited = Class(Base, {
            printWorld: function() {
                return "world";
            }
        });
        // When
        var instance1 = new Base();
        var instance2 = new Inherited();

        // Then
        expect(instance1.printHello()).toEqual("hello");
        expect(instance2.printWorld()).toEqual("world");
    });


    it("should override instance methods", function() {
        // Given
        var Base = Class({
            printHello: function() {
                return "hello";
            }
        });

        var Inherited = Class(Base, {
            printHello: function() {
                return "Hello World!";
            }
        });

        // When
        var instance = new Inherited();
    
        // Then
        expect(instance.printHello()).toEqual("Hello World!");
    });

    it("should call parent method from a method using this._super()", function() {
        // Given
        var Base = Class({
            printHello: function() {
                return "hello world";
            }
        });

        var Inherited = Class(Base, {
            printHello: function() {
                return this._super().toUpperCase();
            }
        });
        
        // When
        var instance = new Inherited();

        // Then
        expect(instance.printHello()).toEqual("HELLO WORLD");
    });


    it("should have a single super for each method", function() {
        // Given
        var Base = Class({
            constructor: function(a,b) {
                this.a = a;
                this.b = b;
            },

            getA: function() {
                return this.a; 
            },

            getB: function() {
                return this.b;
            }
        });

        var Inherited = Class(Base, {
            getA: function() {
                return this._super() * 2;
            },
            
            getB: function() {
                return this._super() * 3;
            }
        });

        // When
        var instance1 = new Inherited(1, 2);

        // Then
        expect(instance1.getA()).toBe(2);
        expect(instance1.getB()).toBe(6);
    });

    it("should support to call super in a non-overriden method", function() {
        // Given
        var Base = Class({
            constructor: function(a) {
                this.a = a;
            }
        });

        var Inherited = Class(Base, {
            getA: function() {
                this._super();
                return this.a;
            }
        });

        // When
        var instance = new Inherited(1);

        // Then
        expect(instance.getA()).toBe(1); // Should not raise an error
    });

    it("should support to call super in the constructor", function() {
        // Given
        var Base = Class({
            constructor: function(a) {
                this.a = a;
            },
            getA: function() {
                return this.a;
            }
        });

        var Inherited = Class(Base, {
            constructor: function(a, b) {
                this._super(a);
                this.b = b;
            },
            getB: function() {
                return this.b;
            }
        });

        // When
        var instance = new Inherited(3, 4);

        // Then
        expect(instance.getA()).toBe(3);
        expect(instance.getB()).toBe(4);
    });

    it("should suport chained inheritance", function() {
        // Given
        var Base = Class({
            constructor: function(a) {
                this.a = a;
            },
            sum: function(number) {
                return this.a + number;
            }
        });

        var Inherited = Class(Base, {
            sum: function(number) {
                return this._super(number) + 2;
            }
        });

        var OtherInherited = Class(Inherited, {
            constructor: function() {
                this._super(3);
            },
            sum: function(number, number2) {
                return this._super(number) + number2;
            }
        });

        // When
        var instance = new OtherInherited();

        // Then
        expect(instance.sum(1, 2)).toBe(8); // 3 + 1 + 2 + 2
    });
});
