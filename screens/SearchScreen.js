import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import CateGoriesList from "../components/SearchElements/CategoriesList";
import SubCategoriesList from "../components/SearchElements/SubCategoriesList";

import { connect } from "react-redux";

import Searchbar from "../components/SearchBar";
import { HeaderBar } from "../components/Header";

const SearchScreen = (props) => {
  const [menuToShow, setMenuToShow] = useState(
    <CateGoriesList></CateGoriesList>
  );

  //var menuToShow = <CateGoriesList></CateGoriesList>;

  useEffect(() => {
    if (props.categoryChoice == "") {
      setMenuToShow(<CateGoriesList></CateGoriesList>);
    } else if (props.categoryChoice !== "" && props.subCategoryChoice === "") {
      setMenuToShow(<SubCategoriesList></SubCategoriesList>);
    } else if (props.subCategoryChoice !== "") {
      setMenuToShow(<Text>ecran offre</Text>);
    }
    return menuToShow;
  }, [props.categoryChoice, props.subCategoryChoice]);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
      }}
    >
      <HeaderBar leftComponent title="Recherche"></HeaderBar>
      <Searchbar></Searchbar>
      {menuToShow}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    categoryChoice: state.categoryChoice,
    subCategoryChoice: state.subCategoryChoice,
  };
}

export default connect(mapStateToProps, null)(SearchScreen);
