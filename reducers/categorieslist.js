export default function (categorieslist = [], action) {
  if (action.type === "setcategoriesList") {
    var newcategorieslist = action.categorieslist;
    return newcategorieslist;
  } else {
    return categorieslist;
  }
}

//reducer utilisé pour la liste des catégories