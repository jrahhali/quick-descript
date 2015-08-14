function Descriptor(configurable, enumerable) {
    if (typeof configurable !== "boolean" || typeof enumerable !== "boolean")
        throw TypeError("Arguments must be boolean types.");
    this._configurable = configurable;
    this._enumerable = enumerable;
}

Descriptor.prototype.configurable = function() {
    this._configurable = true;
    return this;
};

Descriptor.prototype.enumerable = function() {
    this._enumerable = true;
    return this;
};

function AccessorDescriptor(get, set, configurable, enumerable) {
    Descriptor.call(this, configurable, enumerable);
    if (typeof get !== "function" && typeof set !== "function")
        throw TypeError("Arguments must be function types.");
    this._get = get;
    this._set = set;
}

AccessorDescriptor.prototype = Object.create(Descriptor.prototype);
AccessorDescriptor.prototype.constructor = AccessorDescriptor;

function DataDescriptor(value, configurable, enumerable, writable) {
    Descriptor.call(this, configurable, enumerable);
    if (typeof writable !== "boolean")
        throw TypeError("Arguments must be boolean types.");
    this._value = value;
    this._writable = writable;
}

DataDescriptor.prototype = Object.create(Descriptor.prototype);
DataDescriptor.prototype.constructor = DataDescriptor;

DataDescriptor.prototype.writable = function() {
    this._writable = true;
    return this;
};

module.exports = {
    Descriptor: Descriptor,
    AccessorDescriptor: AccessorDescriptor,
    DataDescriptor: DataDescriptor
};
