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
});
