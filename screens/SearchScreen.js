import React from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import CateGoriesList from "../components/SearchElements/CategoriesList";
import SubCategoriesList from "../components/SearchElements/SubCategoriesList";

import { connect } from "react-redux";

import Searchbar from "../components/SearchBar";

const SearchScreen = (props) => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: 50,
      }}
    >
      <Text h1>Rechercher</Text>
      <Searchbar></Searchbar>
      <CateGoriesList></CateGoriesList>
      <SubCategoriesList></SubCategoriesList>
    </View>
  );
};

function mapStateToProps(state) {
  return { CategoryChoice: state.CategoryChoice };
}

export default connect(mapStateToProps, null)(SearchScreen);
