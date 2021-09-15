const synchronousFile = (id) => {
  console.log(`开始同步文件，id为：${id}`);
};

const proxySynchronousFile = (() => {
  const cache = [];
  let timer = null;
  return function (id) {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      synchronousFile(cache.join(","));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
})();

const checkboxes = document.getElementsByTagName("input");

for (let i = 0, c; (c = checkboxes[i++]); ) {
  c.onclick = function () {
    if (this.checked === true) {
        proxySynchronousFile(this.id);
    }
  };
}
