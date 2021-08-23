const arr = [
  "宋传明",
  "王晶",
  "金子俊",
  "苏俊洋",
  "郜振琦",
  "裘佳瑶",
  "赵富庆",
  "李彤辉",
];

const result = [];
let item = [];

while (true) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  item.push(arr[randomIndex]);
  arr.splice(randomIndex, 1);
  if (item.length === 2) {
    result.push(item);
    item = [];
  }
  if (arr.length == 0) break;
}

console.log(result);
