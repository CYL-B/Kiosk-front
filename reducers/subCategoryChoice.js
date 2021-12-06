export default function (subCategoryChoice = "", action) {
  if (action.type === "setSubCategoryChoice") {
    var newSubCategoryChoice = action.subCategoryChoice;
    return newSubCategoryChoice;
  } else {
    return subCategoryChoice;
  }
}
