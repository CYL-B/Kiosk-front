import React from "react";
import { View, Text, Image } from "react-native";
import { Card, AirbnbRating } from "react-native-elements";
import { Button } from "../components/Buttons";
import { Ionicons } from "@expo/vector-icons";

export default function OfferCardLight(props) {
  // boucle pour renplir la list des commitments
  return (
    <Card
      containerStyle={{
        width: 350,
        marginBottom: 10,
        padding: 0,
        borderWidth: 0,
        borderRadius: 20,
      }}
    >
      {/* Image offre */}
      <Card.Image
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,

          alignItems: "flex-end",
        }}
        source={{ uri: props.dataOffre.offerImage }}
      ></Card.Image>
      {/* Titre + description courte */}
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
          }}
        >
          {props.dataOffre.offerName}
        </Card.Title>
        <Text>{props.dataOffre.shortDescription}</Text>
      </View>
      {/*bouton */}
      <View
        style={{
          margin: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
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
