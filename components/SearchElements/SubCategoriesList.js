import React, { useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const SubCateGoriesList = (props) => {
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
          subCategoryName: "Motiver vos enmployer 3",
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

  const [categoryChoice, setCategoryChoice] = useState(props.categoryChoice);
  const [subCategoryChoice, setSubCategoryChoice] = useState();

  function handlePress(subCategoryChoice) {
    setSubCategoryChoice(subCategoryChoice);
    props.subCategoryChoice(subCategoryChoice);
  }

  function handlePressRetour() {
    props.CategoryChoice(categoryChoice);
  }

  var indexcategoriesData = -1;
  for (var i = 0; i < categoriesData.length; i++)
    if (categoriesData[i].categoryName === props.categoryChoice) {
      indexcategoriesData = i;
    }

  var subCategories;
  if (indexcategoriesData === -1) {
    subCategories = <View style={{ flex: 1 }}></View>;
  } else {
    var subCategories = categoriesData[indexcategoriesData].suCategories.map(
      (e, i) => {
        return (
          <ListItem
            style={{ width: "100%" }}
            key={i}
            bottomDivider
            topDivider
            onPress={() => handlePress(e.subCategoryName)}
          >
            <ListItem.Content>
              <ListItem.Title>{e.subCategoryName}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        );
      }
    );
  }
  return (
    <View style={{ width: "100%" }}>
      <ListItem
        style={{ width: "100%" }}
        key={i}
        bottomDivider
        topDivider
        onPress={() => handlePressRetour()}
      >
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {props.categoryChoice}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {subCategories}
    </View>
  );
};

function mapStateToProps(state) {
  return { categoryChoice: state.categoryChoice };
}

function mapDispatchToProps(dispatch) {
  return {
    subCategoryChoice: function (subCategoryChoice) {
      dispatch({ type: "setSubCategoryChoice", subCategoryChoice });
    },
    CategoryChoice: function (categoryChoice) {
      dispatch({ type: "Reset", categoryChoice });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubCateGoriesList);
