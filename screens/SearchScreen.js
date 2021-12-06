import React from "react";
import { View, Text } from "react-native";
import Searchbar from "../components/SearchBar";
import OfferCardMain from "../components/OfferCardMain";

const SearchScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Text>Search</Text>
      <Searchbar></Searchbar>
    </View>
  );
};

export default SearchScreen;
