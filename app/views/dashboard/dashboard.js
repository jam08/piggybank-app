//const firebase = require("nativescript-plugin-firebase");
//const dialogsModule = require("ui/dialogs");
const observableModule = require("data/observable")
const ObservableArray = require("data/observable-array").ObservableArray;

const pageData = new observableModule.fromObject({
  children: new ObservableArray([
      { image: "res://pygge3x", name: "JOSHUA", value: "50kr" },
      { image: "res://pygge3x", name: "SIENA", value: "50kr" }
  ])
});

exports.loaded = function(args) {
  page = args.object;
  page.bindingContext = pageData;
};
/*const layout = require("ui/layouts/grid-layout");
const LabelModule = require("tns-core-modules/ui/label");
var page;

exports.loaded = function(args) {
  page = args.object;
  const grid = page.getViewById("children");
  console.log(grid);
  //create child label
  const label = new LabelModule.Label();
  const labelText = "First child";
  label.text = labelText;

  const label2 = new LabelModule.Label();
  const label2Text = "Second child";
  label2.text = label2Text;
  
  const firstColumn = new layout.ItemSpec(1, "star");
  const firstRow = new layout.ItemSpec(1, "star");

  const secondColum = new layout.ItemSpec(1, "star");

  grid.addColumn(firstColumn);
  grid.addRow(firstRow);
  //add child label to grid
  grid.addChild(label);
  //grid.addChild(label2);
}*/