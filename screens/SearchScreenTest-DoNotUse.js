import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";
import CateGoriesList from "../components/SearchElements/CategoriesList";
import SubCategoriesList from "../components/SearchElements/SubCategoriesList";

import { connect } from "react-redux";

import Searchbar from "../components/SearchBar";
import { HeaderBar } from "../components/Header";

const SearchScreen = (props) => {
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
      categoryName: "Gerer vos bureaux2",
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

  // const [menuToShow, setMenuToShow] = useState(
  //   <CateGoriesList></CateGoriesList>
  // );

  //var menuToShow = <CateGoriesList></CateGoriesList>;

  // useEffect(() => {
  //   if (props.categoryChoice == "") {
  //     setMenuToShow(<CateGoriesList></CateGoriesList>);
  //   } else if (props.categoryChoice !== "" && props.subCategoryChoice === "") {
  //     setMenuToShow(<SubCategoriesList></SubCategoriesList>);
  //   } else if (props.subCategoryChoice !== "") {
  //     setMenuToShow(<Text>ecran offre</Text>);
  //   }
  //   return menuToShow;
  // }, [props.categoryChoice, props.subCategoryChoice]);

  const [expanded, setExpanded] = useState(false);

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
      <ListItem.Accordion
        containerStyle={{ width: "100%" }}
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        {categoriesData.map((l, i) => (
          <ListItem
            key={i}
            onPress={() => {
              setExpanded(!expanded);
            }}
            bottomDivider
          >
            <ListItem.Content>
              <ListItem.Title Style={{ width: "100%" }}>
                {l.categoryImage}
              </ListItem.Title>
              <ListItem.Subtitle>{l.categoryImage}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
      {/* {menuToShow} */}
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
