import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const CateGoriesList = (props) => {
  const [categoryChoice, setCategoryChoice] = useState();
  var categoriesData = props.categorieslist;

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

function mapStateToProps(state) {
  return { categorieslist: state.categorieslist };
}

function mapDispatchToProps(dispatch) {
  return {
    CategoryChoice: function (categoryChoice) {
      dispatch({ type: "setCategoryChoice", categoryChoice });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateGoriesList);
