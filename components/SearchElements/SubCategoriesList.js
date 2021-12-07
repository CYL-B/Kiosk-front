import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const SubCateGoriesList = (props) => {
  var categoriesData = props.categorieslist;

  const [categoryChoice, setCategoryChoice] = useState(props.categoryChoice);
  const [subCategoryChoice, setSubCategoryChoice] = useState();

  function handlePress(subCategoryNameChoice) {
    setSubCategoryChoice(subCategoryNameChoice);
    props.subCategoryChoice(subCategoryNameChoice);
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
    var subCategories = categoriesData[indexcategoriesData].subCategories.map(
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
  return {
    categoryChoice: state.categoryChoice,
    categorieslist: state.categorieslist,
  };
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
