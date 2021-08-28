const makeSound = function (animal) {
  animal.sound();
};

const Duck = function () {};
const Chicken = function () {};

Duck.prototype.sound = function () {
  console.log("嘎嘎嘎");
};

Chicken.prototype.sound = function () {
  console.log("咯咯咯");
};

makeSound(new Duck());
makeSound(new Chicken());
