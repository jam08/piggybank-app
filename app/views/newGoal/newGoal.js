const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
});

let page;
let context;

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

exports.pageNavigatedTo = function(args) {
  context = args.object.navigationContext;
  pageData.set("cid", context.cid);
  console.log(pageData.get("cid"));
}
exports.onTap = function() {
    //console.log("goal!!!");
  let newGoal = {
    name: page.getViewById("goalName"),
    price: page.getViewById("price"),
    cid: pageData.get("cid")
  };
  firebase.push(
    '/goals',
    newGoal
  ).then(
    function(result) {
      console.log("created key: " + result.key);
    }
  );
  /*firebase.push(
    '/goals',
    newGoal
  ).then(
    function(result) {
      //const path = "/children/" + pageData.get("cid");
      //console.log("path: " + path);
        //goals.push(result.key);
      //console.log("goals: " + goals);
        //firebase.update(path, {'goals': goals});
      console.log("created key: " + result.key);
    }
  );*/
    //topmost.navigate("views/childProfile/childProfile");
  }