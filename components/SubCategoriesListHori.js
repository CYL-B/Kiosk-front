import React, { useState, useEffect } from "react";
import { View, ScrollView, Image } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const CateGoriesList = (props) => {
  var categoriesData = props.categorieslist;

  function handlePress(categoryChosenData) {
    props.CategoryChoice(categoryChosenData);
  }

  // console.log(categoriesData);

  var categories = categoriesData.map((e, i) => {
    return (
      <View
        style={{
          alignItems: "center",
          margin: 10,
          borderWidth: 1,
          height: 100,
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{ uri: e.categoryImage }}
        ></Image>
        <Text>{e.categoryName}</Text>
      </View>

      // <ListItem>
      //   <Avatar source={{ uri: e.categoryImage }} />
      //   <ListItem.Content>
      //     <ListItem.Title>{e.categoryName}</ListItem.Title>
      //   </ListItem.Content>
      // </ListItem>
    );
  });

  return <ScrollView>{categories}</ScrollView>; //{categories}
};

function mapStateToProps(state) {
  return { categorieslist: state.categorieslist };
}

function mapDispatchToProps(dispatch) {
  return {
    CategoryChoice: function (categoryChosenData) {
      dispatch({ type: "setCategoryChosen", categoryChosenData });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateGoriesList);
