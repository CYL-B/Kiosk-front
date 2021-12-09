import React, { useState, useEffect } from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { Text, ListItem, Avatar } from "react-native-elements";

import { connect } from "react-redux";

const CateGoriesList = (props) => {
  //subcategorielist en dure
  var subcategorieList = [
    {
      subCategoryName: "Entretien",
      subCategoryImage:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac4",
    },
    {
      subCategoryName: "Equipement IT",
      subCategoryImage:
        "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac5",
    },
    {
      subCategoryName: "Snacks et boissons",
      subCategoryImage:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac6",
    },
    {
      subCategoryName: "Café",
      subCategoryImage:
        "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1661&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac7",
    },
    {
      subCategoryName: "Mobilier",
      subCategoryImage:
        "https://images.unsplash.com/photo-1542360915390-e1a7b3ce8865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac8",
    },
    {
      subCategoryName: "Recyclage",
      subCategoryImage:
        "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af71d1d5cc85a5c2ec1ac9",
    },
    {
      subCategoryName: "Avantage",
      subCategoryImage:
        "https://images.unsplash.com/photo-1623057000049-e220f79c7051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1604&q=80",
      _id: "61af73b7d3a79c53397e973e",
    },
    {
      subCategoryName: "Bien-être",
      subCategoryImage:
        "https://images.unsplash.com/photo-1511256094521-c1cf19529095?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      _id: "61af73b7d3a79c53397e973f",
    },
    {
      subCategoryName: "Evenements",
      subCategoryImage:
        "https://images.unsplash.com/photo-1559456751-057ed03f3143?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2101&q=80",
      _id: "61af73b7d3a79c53397e9740",
    },
    {
      subCategoryName: "Restauration",
      subCategoryImage:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af73b7d3a79c53397e9741",
    },
    {
      subCategoryName: "Training",
      subCategoryImage:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      _id: "61af73b7d3a79c53397e9742",
    },
    {
      subCategoryName: "Welcome Pack",
      subCategoryImage:
        "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
      _id: "61af73b7d3a79c53397e9743",
    },
    {
      subCategoryName: "Herbergement",
      subCategoryImage:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2234&q=80",
      _id: "61af7536b46295d96d1e42e0",
    },
    {
      subCategoryName: "Juridique",
      subCategoryImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af7536b46295d96d1e42e1",
    },
    {
      subCategoryName: "Livraison",
      subCategoryImage:
        "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      _id: "61af7536b46295d96d1e42e2",
    },
    {
      subCategoryName: "Logiciel",
      subCategoryImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      _id: "61af7536b46295d96d1e42e3",
    },
  ];

  function handlePress(subCategoryChoice) {
    props.subCategoryChoice(subCategoryChoice);
    props.navigation.navigate("Rechercher");
  }

  var categories = subcategorieList.map((e, i) => {
    return (
      <Pressable
        onPress={() =>
          handlePress({
            subCategoryName: e.subCategoryName,
            subCategoryId: e._id,
          })
        }
      >
<<<<<<< HEAD
        <Image
          style={{ width: 50, height: 50, borderRadius: 50 }}
          source={{ uri: e.categoryImage }}
        ></Image>
        <Text>{e.categoryName}</Text>
      </View>
=======
        <View
          style={{
            alignItems: "center",

            margin: 10,
            //borderWidth: 1,
            height: 100,
            width: 80,
          }}
        >
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: "50",
              marginBottom: 15,
            }}
            source={{ uri: e.subCategoryImage }}
          ></Image>

          <Text style={{ textAlign: "center" }}>{e.subCategoryName}</Text>
        </View>
      </Pressable>
>>>>>>> recherchebar

      // <ListItem>
      //   <Avatar source={{ uri: e.categoryImage }} />
      //   <ListItem.Content>
      //     <ListItem.Title>{e.categoryName}</ListItem.Title>
      //   </ListItem.Content>
      // </ListItem>
    );
  });

  return <ScrollView horizontal>{categories}</ScrollView>; //{categories}
};

function mapStateToProps(state) {
  return { categorieslist: state.categorieslist };
}

function mapDispatchToProps(dispatch) {
  return {
    subCategoryChoice: function (subCategoryChosenData) {
      dispatch({ type: "setSubCategoryChosen", subCategoryChosenData });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CateGoriesList);
