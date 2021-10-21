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
}
