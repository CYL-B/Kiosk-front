import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

import { connect } from "react-redux";

import { REACT_APP_IPSERVER } from "@env";

function Searchbar(props) {
  const [search, setSearch] = useState("");

  var handlesearch = async function (val) {
    console.log("envoyer resultat", val);
    const data = await fetch(
      `http://${REACT_APP_IPSERVER}/recherche/rechercheparlabar`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `recherche=${val}`,
      }
    );
    var sousCategorieData = await data.json();

    console.log("sousCategorie", sousCategorieData);

    if (sousCategorieData.result === true) {
      console.log("sousCategorie", sousCategorieData);
      props.subCategoryChoice({
        subCategoryName: sousCategorieData.sousCategorie.subCategoryName,
        subCategoryId: sousCategorieData.sousCategorie._id,
      });
      props.navigation.navigate("Rechercher");
    } else {
      console.log("pas de sous categories");
      props.navigation.navigate("Rechercher");
    }
  };

  return (
    <SearchBar
      lightTheme={true}
      containerStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        height: 50,
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 20,
        padding: 0,
        borderRadius: 50,
      }}
      inputContainerStyle={{
        backgroundColor: "#FAF0E6",
        borderRadius: 50,
        margin: 0,
        padding: 0,
        height: 50,
      }}
      inputStyle={{
        backgroundColor: "#FAF0E6",
        margin: 0,
        padding: 0,
        height: 50,
      }}
      placeholder="Quel est votre besoin ?"
      onSubmitEditing={() => handlesearch(search)}
      onChangeText={(val) => setSearch(val)}
      value={search}
    />
  );
}

function mapDispatchToProps(dispatch) {
  return {
    subCategoryChoice: function (subCategoryChosenData) {
      dispatch({ type: "setSubCategoryChosen", subCategoryChosenData });
    },
    categoryAll: function (categoryChosenData) {
      dispatch({ type: "setcategoryall", categoryChosenData });
    },
  };
}

export default connect(null, mapDispatchToProps)(Searchbar);
