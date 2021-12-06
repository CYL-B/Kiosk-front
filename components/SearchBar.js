import React, { useState } from "react";
import { SearchBar } from "react-native-elements";

export default function Searchbar(props) {
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      lightTheme={true}
      containerStyle={{
        width: "90%",
        backgroundColor: "white",
      }}
      inputContainerStyle={{
        backgroundColor: "#FAF0E6",
        borderRadius: 20,
      }}
      inputStyle={{ backgroundColor: "#FAF0E6" }}
      placeholder="Search..."
      onChangeText={(val) => setSearch(val)}
      value={search}
    />
  );
}
