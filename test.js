function sendLog(status) {
  console.log(`log message is ${status}`);
}

function jumpTo(pageUrl) {
  console.log(`跳转到 ${pageUrl}`);
}

const actions = new Map([
  [
    { identity: "guest", status: 1 },
    () => {
      /*do sth*/
    },
  ],
  [
    { identity: "guest", status: 2 },
    () => {
      /*do sth*/
    },
  ],
  //...
]);

const onButtonClick = (identity, status) => {
  let action = [...actions].filter(
    ([key, value]) => key.identity == identity && key.status == status
  );
  console.log(action);
  action.forEach(([key, value]) => value.call(this));
};

onButtonClick("guest",1)