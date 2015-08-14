var assert = require("assert"),
    Descriptor = require("./../lib/descriptor").Descriptor,
    AccessorDescriptor = require("./../lib/descriptor").AccessorDescriptor,
    DataDescriptor = require("./../lib/descriptor").DataDescriptor;

describe("AccessorDescriptor", function() {
    describe("constructor()", function() {
        it("should throw if configurable argument not boolean", function() {
            assert.throws(function() {
                new AccessorDescriptor(function(){}, function(){}, null, true);
            });
        });

        it("should throw if enumerable argument not boolean", function() {
            assert.throws(function() {
                new AccessorDescriptor(function(){}, function(){}, false, null);
            });
        });

        it("should set configurable and enumerable properties", function() {
            var descriptor = new AccessorDescriptor(function(){}, function(){}, true, true);
            assert(descriptor._configurable && descriptor._enumerable);
        });
    });

    describe("configurable()", function() {
        it("should set the configurable property", function() {
            var descriptor = new AccessorDescriptor(function(){}, function(){}, false, false).configurable();
            assert(descriptor._configurable);
        });
    });

    describe("enumerable()", function() {
        it("should set the enumerable property", function() {
            var descriptor = new AccessorDescriptor(function(){}, function(){}, false, false).enumerable();
            assert(descriptor._enumerable);
        });
    });
});

describe("DataDescriptor", function() {
    describe("constructor()", function() {
        it("should throw if configurable argument not boolean", function() {
            assert.throws(function() {
                new DataDescriptor({}, null, true);
            });
        });

        it("should throw if enumerable argument not boolean", function() {
            assert.throws(function() {
                new DataDescriptor({}, false, null);
            });
        });

        it("should throw if writable argument not boolean", function() {
            assert.throws(function() {
                new DataDescriptor({}, false, false, null);
            });
        });

        it("should set configurable, enumerable, and writable properties", function() {
            var descriptor = new DataDescriptor({}, true, true, true);
            assert(descriptor._configurable && descriptor._enumerable && descriptor._writable);
        });
    });

    describe("configurable()", function() {
        it("should set the configurable property", function() {
            var descriptor = new DataDescriptor({}, false, false, false).configurable();
            assert(descriptor._configurable);
        });
    });

    describe("enumerable()", function() {
        it("should set the enumerable property", function() {
            var descriptor = new DataDescriptor({}, false, false, false).enumerable();
            assert(descriptor._enumerable);
        });
    });

    describe("writable()", function() {
        it("should set the writable property", function() {
            var descriptor = new DataDescriptor({}, false, false, false).writable();
            assert(descriptor._writable);
        });
    });
});
