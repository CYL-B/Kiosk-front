import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

export default function Searchbar(props) {
  const [search, setSearch] = useState("");

  function handlesearch(val) {
    setSearch(val);
  }

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
      onChangeText={(val) => handlesearch(val)}
      value={search}
    />
  );
}
