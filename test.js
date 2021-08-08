function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve, ms,'done');
    })
}

new Promise((resolve,reject)=>{
    setTimeout(resolve, ms,'done');
}).then()


class Pro<T>{
    then()
}
