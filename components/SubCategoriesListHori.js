import React from "react";
import { View, ScrollView, Image, Pressable } from "react-native";

import Text from "./Text";

import { connect } from "react-redux";

//composant permettant d'afficher la liste déroulante de catégories à l'horizontal
const CateGoriesList = (props) => {
 
  var categorieslist = props.categorieslist;
  var subcategorieList = [];
  for (var i = 0; i < categorieslist.length; i++) {
    for (var j = 0; j < categorieslist[i].subCategories.length; j++) {
      subcategorieList.push(categorieslist[i].subCategories[j]);
    }
  }

  function handlePress(subCategoryChoice) {
    props.CategoryChoiceReset();
    props.subCategoryChoiceReset();
    props.subCategoryChoice(subCategoryChoice);
    props.navigation.navigate("Rechercher", { screen: "Search" });
  }

  var categories = subcategorieList.map((e, i) => {
    return (
      <Pressable
        key={i}
        onPress={() =>
          handlePress({
            subCategoryName: e.subCategoryName,
            subCategoryId: e._id,
          })
        }
      >
        <View
          style={{
            alignItems: "center",

            margin: 10,
            
            width: 90,
          }}
        >
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              marginBottom: 5,
            }}
            source={{ uri: e.subCategoryImage }}
          ></Image>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            {e.subCategoryName}
          </Text>
        </View>
      </Pressable>

    );
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories}
    </ScrollView>
  ); 
};

function mapStateToProps(state) {
  return { categorieslist: state.categorieslist };
}

function mapDispatchToProps(dispatch) {
  return {
    subCategoryChoice: function (subCategoryChosenData) {
      dispatch({ type: "setSubCategoryChosen", subCategoryChosenData });
    },
    CategoryChoiceReset: function () {
      dispatch({ type: "Reset" });
    },
    subCategoryChoiceReset: function () {
      dispatch({ type: "ResteSubCategorie" });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateGoriesList);
