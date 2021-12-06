import React from "react";
import { View, Text } from "react-native";
import Searchbar from "../components/SearchBar";
import OfferCardMain from "../components/OfferCardMain";

const SearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Search</Text>
      <OfferCardMain></OfferCardMain>
    </View>
  );
};

export default SearchScreen;
