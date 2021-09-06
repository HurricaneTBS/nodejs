function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }


 console.log( escapeRegExp("[test]苏军杨的工厂"));