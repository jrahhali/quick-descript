var Descriptor = require("./Descriptor").Descriptor,
    AccessorDescriptor = require("./Descriptor").AccessorDescriptor,
    DataDescriptor = require("./Descriptor").DataDescriptor,
    configurable = true,
    enumerable = true,
    writable = true;

module.exports = function(object) {
    return createDescriptor(object, !configurable, !enumerable, !writable);
};

module.exports.c = module.exports.C = function(object) {
    return createDescriptor(object, configurable, !enumerable, !writable);
};

module.exports.e = module.exports.E = function(object) {
    return createDescriptor(object, !configurable, enumerable, !writable);
};

module.exports.w = module.exports.W = function(object) {
    return createDescriptor(object, !configurable, !enumerable, writable);
};

module.exports.ce = module.exports.ec = module.exports.CE = module.exports.EC = function(object) {
    return createDescriptor(object, configurable, enumerable, !writable);
};

module.exports.cw = module.exports.wc = module.exports.CW = module.exports.WC = function(object) {
    return createDescriptor(object, configurable, !enumerable, writable);
};

module.exports.ew = module.exports.we = module.exports.EW = module.exports.WE = function(object) {
    return createDescriptor(object, !configurable, enumerable, writable);
};

module.exports.cew = module.exports.cwe = module.exports.ecw = module.exports.ewc = module.exports.wce = module.exports.wec =
module.exports.CEW = module.exports.CWE = module.exports.ECW = module.exports.EWC = module.exports.WCE = module.exports.WEC = function(object) {
    return createDescriptor(object, configurable, enumerable, writable);
};

module.exports.apply = function(object) {
    if (object === undefined || object === null)
        throw new TypeError("Argument must be an instance of Object");

    for (var property in object) {
        if (object.hasOwnProperty(property) && object[property] instanceof Descriptor) {
            var configurable = object[property]._configurable;
            var enumerable = object[property]._enumerable;

            if (object[property] instanceof DataDescriptor) {
                var value = object[property]._value;
                var writable = object[property]._writable;

                Object.defineProperty(object, property, {
                    configurable: configurable,
                    enumerable: enumerable,
                    value: value,
                    writable: writable
                });
            }
            else {
                var get = object[property]._get;
                var set = object[property]._set;

                Object.defineProperty(object, property, {
                    get: get,
                    set: set,
                    configurable: configurable,
                    enumerable: enumerable
                });
            }
        }
    }
};

var createDescriptor = function(object, configurable, enumerable, writable) {
    if (object !== null && object !== undefined) {
        if ( (object.hasOwnProperty("get") && typeof object.get === "function") || (object.hasOwnProperty("set") && typeof object.set === "function") ) {
            if (writable)
                throw new Error("Attempted to set the writable property for an access descroptor.  Accessor descriptors do not have a writable property.");
            return new AccessorDescriptor(object.get, object.set, configurable, enumerable);
        }
    }
    return new DataDescriptor(object, configurable, enumerable, writable);
};
