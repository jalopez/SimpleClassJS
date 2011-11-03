describe("SimpleClassJS", function() {

    it("should create an empty class", function() {
        var Empty = Class();    
        expect(Empty).toBeDefined();
    });


    it("should create a class with a constructor", function() {
        var i = 0;
        
        var Simple = Class({
            constructor: function() {
                i++; 
            }
        });

        var instance1 = new Simple(),
            instance2 = new Simple();

        expect(i).toBe(2);
    });

    it("should accept constructors with a parameter", function() {
        var i = 0;

        var Sum = Class({
            constructor: function(sum) {
                i += sum;
            }
        });

        var instance1 = new Sum(3),
            instance2 = new Sum(4);

        expect(i).toBe(7);
    });

    it("should accept constructors with many parameters", function() {
        var i = 0;

        var Sum2 = Class({
            constructor: function(a, b) {
                i = a + b;
            }
        });

        var instance1 = new Sum2(3,2);

        expect(i).toBe(5);
    });
});
