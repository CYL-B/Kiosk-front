import React, { useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const CateGoriesList = (props) => {
  var image =
    "https://images.unsplash.com/photo-1558959356-2f36c7322d3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
  var employeesImage =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
  var KPIimage =
    "https://images.unsplash.com/photo-1589568482418-998c3cb2430a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";

  var categoriesData = [
    {
      categoryName: "Gerer vos bureaux",
      categoryImage: image,
      suCategories: [
        { subCategoryName: "Entretien", subCategoryImage: image },
        { subCategoryName: "Equipement IT", subCategoryImage: image },
        { subCategoryName: "Snacks et boissons", subCategoryImage: image },
        { subCategoryName: "Café", subCategoryImage: image },
        { subCategoryName: "Mobilier", subCategoryImage: image },
        { subCategoryName: "Recyclage", subCategoryImage: image },
      ],
    },
    {
      categoryName: "Motiver vos enmployer",
      categoryImage: employeesImage,
      suCategories: [
        {
          subCategoryName: "Motiver vos enmployer 1",
          subCategoryImage: employeesImage,
        },
        {
          subCategoryName: "Motiver vos enmployer 2",
          subCategoryImage: employeesImage,
        },
        {
          subCategoryName: "Motiver vos enmployer 2",
          subCategoryImage: employeesImage,
        },
      ],
    },
    {
      categoryName: "Piloter votre entreprise",
      categoryImage: KPIimage,
      suCategories: [
        {
          subCategoryName: "Piloter votre entreprise 1",
          subCategoryImage: KPIimage,
        },
        {
          subCategoryName: "Piloter votre entreprise 2",
          subCategoryImage: KPIimage,
        },
        {
          subCategoryName: "Piloter votre entreprise 3",
          subCategoryImage: KPIimage,
        },
      ],
    },
  ];

  const [categoryChoice, setCategoryChoice] = useState();

  function handlePress(categoryChoice) {
    setCategoryChoice(categoryChoice);
    props.CategoryChoice(categoryChoice);
  }

  //console.log(categoryChoice);
  var categories = categoriesData.map((e, i) => {
    return (
      <ListItem
        style={{ width: "100%" }}
        key={i}
        bottomDivider
        onPress={
          () => handlePress(e.categoryName) //setCategoryChoice(e.categoryName)
        }
      >
        <ListItem.Content>
          <ListItem.Title>{e.categoryName}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  });
  return categories;
};

function mapDispatchToProps(dispatch) {
  return {
    CategoryChoice: function (categoryChoice) {
      dispatch({ type: "setCategoryChoice", categoryChoice });
    },
  };
}

export default connect(null, mapDispatchToProps)(CateGoriesList);
