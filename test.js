function Set() {
  let items = {};
  this.has = function (value) {
    return items.hasOwnProperty(value);
  };
  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value;
      return true;
    }
    return false;
  };
  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };
  this.clear = function () {
    items = {};
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.sizeLegacy = function () {
    let count = 0;
    for (let prop in items) {
      if (items.hasOwnProperty(prop)) {
        ++count;
      }
    }
    return count;
  };
}

