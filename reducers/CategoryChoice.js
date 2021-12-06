export default function (categoryChoice = "", action) {
  if (action.type === "setCategoryChoice") {
    var newCategoryChoice = action.categoryChoice;
    return newCategoryChoice;
  } else {
    return categoryChoice;
  }
}
