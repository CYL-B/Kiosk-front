import React, { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function Searchbar(props) {
  const [search, setSearch] = useState("");

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
        margin: 0,
        padding: 0,
        borderRadius: 20,
      }}
      inputContainerStyle={{
        backgroundColor: "#FAF0E6",
        borderRadius: 20,
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
      onChangeText={(val) => setSearch(val)}
      value={search}
    />
  );
}
