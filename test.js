const myObject = (function(){
    let __name = "sven";
    return {
        getName(){
            return __name;
        }
    }
})();

console.log(myObject.getName());