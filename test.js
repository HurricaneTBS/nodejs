const wait = async (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds,'ddddd'));
const test = async ()=>{
  const res = await wait(2000)
  console.log(res);
}

test()