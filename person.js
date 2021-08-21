const obj = {
  name: "Tom",
  age: 20,
  country: "China",
};

const proxy = new Proxy(obj, {
  get(target, propKey) {
    return target[propKey];
  },
  set(target, propKey) {
    if (propKey === "country") {
      console.log("不能对国家属性做修改");
      return;
    }
  },
});

console.log(proxy.name);
proxy.country = "美国";

console.log(proxy.country);
