function sayHello(greeting) {
    return `${greeting}, ${this.name}`;
  }
  
  const user = {
    name: 'Harrison',
  };
  
  // using call
  console.log(sayHello.call(user, 'Hello')); // prints "Hello, Harrison"
  
  // using apply
  console.log(sayHello.apply(user, ['Good morning'])); // prints "Good morning, Harrison"
  
  // using bind
  const boundSayHello = sayHello.bind(user, 'Hey there');
  console.log(sayHello.bind(user, 'Hey there')); // prints "Hey there, Harrison"