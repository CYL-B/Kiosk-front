export default function (categoryChoice = "", action) {
  if (action.type === "setCategoryChoice") {
    var newCategoryChoice = action.categoryChoice;
    return newCategoryChoice;
  } else if (action.type === "Reset") {
    var newCategoryChoice = "";
    return newCategoryChoice;
  } else {
    return categoryChoice;
  }
}
