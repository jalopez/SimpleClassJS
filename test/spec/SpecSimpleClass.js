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
});
