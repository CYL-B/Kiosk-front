import React from "react";
import { View, Text, Image } from "react-native";
import { Card, AirbnbRating } from "react-native-elements";
import { Button } from "../components/Buttons";
import { Ionicons } from "@expo/vector-icons";

export default function OfferCardMain(props) {
  var dataOffre = {
    rating: 3,
    companyName: "Akagreen",
    companyLogo: "../assets/logo.png",
    offerImage: "../assets/imagebackground.png",
    officies: "Paris, Ile de France",
    shortDescription:
      "BlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablablBlablabl",
    commiments: [
      "Livré à vélo",
      "Tous les livreurs sont en CDI",
      "Tous les livreurs sont en CDI",
    ],
  };

  // boucle pour renplir la list des commitments
  var listCommitments = dataOffre.commiments.map((e, i) => {
    return (
      <Text style={{ marginBottom: 0 }}>
        <Ionicons name="checkmark-outline"></Ionicons>
        {e}
      </Text>
    );
  });

  return (
    <Card
      containerStyle={{
        width: 350,
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderRadius: 20,
        zIndex: 2,
      }}
    >
      {/* Image offre */}
      <Card.Image
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: "flex-end",
        }}
        source={require("../assets/imagebackground.png")} //image a remplacer par props.
      >
        {/* Partie rating */}
        <View
          style={{
            backgroundColor: "white",
            margin: 10,
            borderRadius: 20,
            padding: 6,
          }}
        >
          <AirbnbRating
            type="custom"
            selectedColor="#F47805"
            unSelectedColor="#F4780533"
            reviewColor="#F47805"
            defaultRating={dataOffre.rating}
            isDisabled
            count={5}
            size={20}
            showRating={false}
          />
        </View>
      </Card.Image>
      {/* Logo entreprise : la View est pardessus les autres éléments grace au zindex. Elle est positionner par rapport à la Card*/}
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 50,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          zIndex: 2,
          top: 115,
          left: "77%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Image
          style={{ height: 10, width: 60 }}
          source={require("../assets/logo.png")}
        />
      </View>
      {/* Titre + location + description  */}
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Card.Title
          style={{
            textAlign: "left",
            marginBottom: 0,
            zIndex: 1,
          }}
        >
          {dataOffre.companyName}
        </Card.Title>
        <Text
          style={{
            textAlign: "left",
            marginBottom: 10,
          }}
        >
          {dataOffre.officies}
        </Text>
        <Text>{dataOffre.shortDescription}</Text>
      </View>
      {/* Commitments + bouton */}
      <View
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {listCommitments}
        </View>
        <View>
          <Button
            size="md"
            containerStyle={{ width: 100 }}
            color="primary"
            title="Voir l'offre"
          />
        </View>
      </View>
    </Card>
  );
}
