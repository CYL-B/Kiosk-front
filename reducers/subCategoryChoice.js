export default function (subCategoryChosenData = "", action) {
  if (action.type === "setSubCategoryChosen") {
    var newSubCategoryChosenData = action.subCategoryChosenData;
    return newSubCategoryChosenData;
  } else {
    return subCategoryChosenData;
  }
}
