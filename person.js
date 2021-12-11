async function fetchText(){
    let res = await fetch("./readme.md");
    console.log(res);
}

fetchText()