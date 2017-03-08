SimpleClassJS
=============
This project is deprectaded and no longer maintained. It is better to use [ES6 Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Classes) plus [Babel](https://babeljs.io/) instead.

[![Build Status](https://secure.travis-ci.org/jalopez/SimpleClassJS.png)](http://travis-ci.org/jalopez/SimpleClassJS)

A lightweight JavaScript Class framework

Purpose
-------
The purpose of this framework is to be lightweight (< 1K when minified) and clean, but offering
full OO support, including subclassing, inheritance and so.
There are better class JS frameworks out there, but this is an exercise to
see if I can make something simple but powerful enough for a real app.

Download & Installation
----------------------
 * Download Minified version available in `dist` folder
 * To include it in a web application:
    * Copy `dist/Class.min.js` where your javascripts are placed
    * Include it in your index.html as: `<script type="text/javascript" src="PATH_TO_YOUR_JS/Class.min.js"></script>`
 * To include it in a Node.js app:
    * Copy `dist/Class.min.js` where your javascripts are placed
    * Import it with `var Class = require('PATH_TO_YOUR_JS/Class.min.js');`


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

Basic inheritance with \_super support to call parent methods

    var HybridCar = Class(Car, {
        // Overrides Car.toString
        toString: function() {
            return this._super() + ' Hybrid';
        }
    });

    var hybrid = new HybridCar("Honda", "Civic");
    hybrid.toString(); // will return "Honda Civic Hybrid"

Chained inheritance is also supported

    var MyAwesomeCar = Class(HybridCar, {
        constructor: function(manufacturer, model, speed) {
            this._super(manufacturer, model);
            this.speed = speed;
        },
        getSpeed: function() {
            return this.speed;
        },
        toString: function() {
            return this._super() + ' is Awesome';
        }
    });
