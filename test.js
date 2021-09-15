
const MyImage = (function () {
  const imageNode = new Image(200, 100);
  document.body.appendChild(imageNode);
  const img = new Image();
  img.onload = function () {
    imageNode.src = img.src;
  };
  return {
    setSrc(src) {
      imageNode.src =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201710%2F23%2F20171023160752_PBGwi.gif&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1634281117&t=4a9b3c4bfb52442efb23a1745adfca2e";
      img.src = src;
    },
  };
})();

MyImage.setSrc("https://pics7.baidu.com/feed/8694a4c27d1ed21b3470873872dbc3cd53da3ff4.png?token=eb83c87627ca445b920733b3b9740f23")