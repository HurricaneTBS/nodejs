let connUrl = new URL("http://im.zfqu.cn:8065");

connUrl.protocol = "ws:";

connUrl = connUrl.toString()
console.log(connUrl);