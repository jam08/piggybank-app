const firebase = require("nativescript-plugin-firebase");
var observableModule = require("data/observable");
var ObservableArray = require("data/observable-array").ObservableArray;
var topmost = require("ui/frame").topmost();

var pageData = new observableModule.fromObject({
});

let page;
let context;
let goals = [];

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
}

exports.pageNavigatedTo = function(args) {
  context = args.object.navigationContext;
  pageData.set("cid", context.cid);
  //console.log("newGoal:" + pageData.get("cid"));
}

exports.saveGoal = function() {
    //console.log("goal!!!");
  const newGoal = {
    name: page.getViewById("goalName").text,
    price: page.getViewById("price").text,
    cid: pageData.get("cid")
  };

  firebase.push(
    '/goals',
    newGoal
  ).then(
    function(result) {
      const path = "/children/" + pageData.get("cid");
      goals.push(result.key);
      firebase.update(path, {'goals': goals});
      //console.log("created key: " + result.key);
    }
  ).then(() => {
    let navigationEntry = {
      moduleName: "views/childProfile/childProfile",
      context: { cid: pageData.get("cid"), goals: goals },
      animated: false
    }
    topmost.navigate(navigationEntry);
  });
}