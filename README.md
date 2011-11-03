SimpleClassJS
=============
A lightweight JavaScript Class framework

Purpose
-------
The purpose of this framework is to be lightweight and clean, but offering
full OO support, including subclassing, inheritance and so.
There are better class JS frameworks out there, but this is an exercise to
see if I can make something simple but powerful enough for a real app.

Usage
-----

Create an empty class

    var Empty = Class();
    var instance = new Empty(); // Do nothing

Create a class with only a constructor

    var Simple = Class({
        constructor: function() {
            alert("Hello World!");
        }
    });
    var instance = new Simple(); // alert "Hello world!"

Create a class with constructor, methods and context handling

    var Car = Class({
        constructor: function(manufacturer, model) {
            this.manufacturer = manufacturer;
            this.model = model;
        },
        toString: function() {
            return this.manufacturer + " " + this.model;
        }
    });
    var honda = new Car("Honda", "Civic");
    honda.toString(); // will return "Honda Civic" 

