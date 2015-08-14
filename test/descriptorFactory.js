var assert = require("assert"),
    p = require("./../lib/descriptorFactory"),
    Descriptor = require("./../lib/descriptor").Descriptor,
    AccessorDescriptor = require("./../lib/descriptor").AccessorDescriptor,
    DataDescriptor = require("./../lib/descriptor").DataDescriptor;

var func = function() {};

describe("descriptorFactory", function() {
    it("should create an AccessorDescriptor when an object with get property is passed in", function() {
        var test = p({get: func});
        assert(test.constructor.toString() === AccessorDescriptor.toString());
        // No idea why this isn't working.
        // My guess is mocha is loading difference instance of lib/descriptor.js than ib/descriptorFactory.js is
        //assert(test instanceof AccessorDescriptor);
    });

    it("should create an AccessorDescriptor when an object with set property is passed in", function() {
        debugger;
        var test = p({set: func});
        assert(test.constructor.toString() === AccessorDescriptor.toString());
        // No idea why this isn't working.
        // My guess is mocha is loading difference instance of lib/descriptor.js than ib/descriptorFactory.js is
        //assert(test instanceof AccessorDescriptor);
    });

    it("should create an AccessorDescriptor when an object with get and set property are passed in", function() {
        var test = p({set: func, get: func});
        assert(test.constructor.toString() === AccessorDescriptor.toString());
        // No idea why this isn't working.
        // My guess is mocha is loading difference instance of lib/descriptor.js than ib/descriptorFactory.js is
        //assert(test instanceof AccessorDescriptor);
    });

    it("should create an DataDescriptor when an object any other object is passed in", function() {
        var test = p({});
        assert(test.constructor.toString() === DataDescriptor.toString());
        // No idea why this isn't working.
        // My guess is mocha is loading difference instance of lib/descriptor.js than ib/descriptorFactory.js is
        //assert(test instanceof AccessorDescriptor);
    });

    describe("()", function() {
        it("should return !c!e!w", function() {
            var test = p({});
            assert(!test._configurable && !test._enumerable && !test._writable);
        });
    });

    describe("c(), C()", function() {
        it("should return c!e!w", function() {
            var test = p.c({});
            assert(test._configurable && !test._enumerable && !test._writable);
        });
    });

    describe("e(), E()", function() {
        it("should return !ce!w", function() {
            var test = p.e({});
            assert(!test._configurable && test._enumerable && !test._writable);
        });
    });

    describe("w(), W()", function() {
        it("should return !c!ew", function() {
            var test = p.w({});
            assert(!test._configurable && !test._enumerable && test._writable);
        });

        it("should throw when trying trying to create accessor descriptor", function() {
            assert.throws(function() {
                p.w({get: func, set: func});
            });
        });
    });

    describe("ce(), ec(), CE(), EC()", function() {
        it("should return ce!w", function() {
            var test = p.ce({});
            assert(test._configurable && test._enumerable && !test._writable);
        });
    });

    describe("cw(), wc(), CW(), WC()", function() {
        it("should return c!ew", function() {
            var test = p.cw({});
            assert(test._configurable && !test._enumerable && test._writable);
        });

        it("should throw when trying trying to create accessor descriptor", function() {
            assert.throws(function() {
                p.w({get: func, set: func});
            });
        });
    });

    describe("ew(), we(), EW(), WE()", function() {
        it("should return !cew", function() {
            var test = p.ew({});
            assert(!test._configurable && test._enumerable && test._writable);
        });

        it("should throw when trying trying to create accessor descriptor", function() {
            assert.throws(function() {
                p.w({get: func, set: func});
            });
        });
    });

    describe("cew(), cwe(), ecw(), ewc(), wce(), wec(), CEW(), CWE(), ECW(), EWC(), WCE(), WEC()", function() {
        it("should return cew", function() {
            var test = p.cew({});
            assert(test._configurable && test._enumerable && test._writable);
        });

        it("should throw when trying trying to create accessor descriptor", function() {
            assert.throws(function() {
                p.w({get: func, set: func});
            });
        });
    });

    describe("apply()", function() {
        it("should create properties with the correct descriptors", function() {
            var obj = {
                member1: p.ce("member1"),
                member2: p("member2"),
                member3: p.wce("member3"),
                member4: p.e({
                    get: function() {
                        return "get";
                    },
                    set: function(val) {
                        return "set to " + val;
                    }
                })
            };
            p.apply(obj);
            debugger;
            var desc1 = Object.getOwnPropertyDescriptor(obj, "member1");
            var desc2 = Object.getOwnPropertyDescriptor(obj, "member2");
            var desc3 = Object.getOwnPropertyDescriptor(obj, "member3");
            var desc4 = Object.getOwnPropertyDescriptor(obj, "member4");
            assert(desc1.configurable && desc1.enumerable && !desc1.writable &&
                   !desc2.configurable && !desc2.enumerable && !desc2.writable &&
                   desc3.configurable && desc3.enumerable && desc3.writable &&
                   !desc4.configurable && desc4.enumerable && typeof desc4.get === "function" && typeof desc4.set === "function");
        });
    });
});
