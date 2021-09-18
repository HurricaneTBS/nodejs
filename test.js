const Folder = function (name) {
  this.name = name;
  this.files = [];
  this.add = function (file) {
    this.files.push(file);
  };
  this.scan = function () {
    console.log(`开始扫描文件夹：${this.name}`);
    for (let i = 0, file, files = this.files; (file = files[i++]); ) {
      file.scan();
    }
  };
};

const File = function (name) {
  this.name = name;
  this.add = function () {
    throw new Error("文件下面不能再添加问价");
  };
  this.scan = function () {
    console.log(`开始扫描文件：${this.name}`);
  };
};

const folder = new Folder("学习资料");
const folder1 = new Folder("JavaScript");
const folder2 = new Folder("jQuery");
const file1 = new File("JavaScript设计模式与开发实践");
const file2 = new File("精通jQuery");
const file3 = new File("重构与模式");
folder1.add(file1);
folder2.add(file2);
folder.add(folder1);
folder.add(folder2);
folder.add(file3);
var folder3 = new Folder("Nodejs");
var file4 = new File("深入浅出Node.js");
folder3.add(file4);
var file5 = new File("JavaScript语言精髓与编程实践");
folder.add(folder3);
folder.add(file5);

folder.scan();

// /******************************* Folder ******************************/
// var Folder = function (name) {
//   this.name = name;
//   this.files = [];
// };
// Folder.prototype.add = function (file) {
//   this.files.push(file);
// };
// Folder.prototype.scan = function () {
//   console.log("开始扫描文件夹: " + this.name);
//   for (var i = 0, file, files = this.files; (file = files[i++]); ) {
//     file.scan();
//   }
// };
// /******************************* File ******************************/
// var File = function (name) {
//   this.name = name;
// };
// File.prototype.add = function () {
//   throw new Error("文件下面不能再添加文件");
// };
// File.prototype.scan = function () {
//   console.log("开始扫描文件: " + this.name);
// };

// var folder = new Folder("学习资料");
// var folder1 = new Folder("JavaScript");
// var folder2 = new Folder("jQuery");
// var file1 = new File("JavaScript设计模式与开发实践");
// var file2 = new File("精通jQuery");
// var file3 = new File("重构与模式");
// folder1.add(file1);
// folder2.add(file2);
// folder.add(folder1);
// folder.add(folder2);
// folder.add(file3);

// var folder3 = new Folder("Nodejs");
// var file4 = new File("深入浅出Node.js");
// folder3.add(file4);
// var file5 = new File("JavaScript语言精髓与编程实践");

// folder.add(folder3);
// folder.add(file5);
// folder.scan();

var RefreshMenuBarCommand = (function () {
  function RefreshMenuBarCommand() {}
  RefreshMenuBarCommand.prototype.execute = function () {
    console.log("刷新菜单界面");
  };
  return RefreshMenuBarCommand;
})();
var AddSubMenuCommand = (function () {
  function AddSubMenuCommand() {}
  AddSubMenuCommand.prototype.execute = function () {
    console.log("增加子菜单");
  };
  return AddSubMenuCommand;
})();
var DelSubMenuCommand = (function () {
  function DelSubMenuCommand() {}
  return DelSubMenuCommand;
})();
var refreshMenuBarCommand = new RefreshMenuBarCommand(),
  addSubMenuCommand = new AddSubMenuCommand(),
  delSubMenuCommand = new DelSubMenuCommand();
refreshMenuBarCommand.execute();
addSubMenuCommand.execute();
delSubMenuCommand.execute();
