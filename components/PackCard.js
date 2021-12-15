import React from "react";
import { View, Image } from "react-native";
import { Card, AirbnbRating } from "react-native-elements";
import { Button } from "./Buttons";
import Text from "./Text";

export default function PackCard(props) {
  return (
    <Card
      containerStyle={{
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderRadius: 20,
        zIndex: 2,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
      }}
    >
      {/* Image offre */}
      <Card.Image
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: "flex-end",
        }}
        source={{ uri: props.dataCompany.companyImage ? props.dataCompany.companyImage : "https://images.unsplash.com/photo-1551836022-8b2858c9c69b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" }}
      >        
      </Card.Image>

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
        <View>
          <Button
            size="md"
            containerStyle={{ width: 100 }}
            color="primary"
            title="Plus de détails"
            onPress={() =>
              props.navigation.navigate("CompanyPage", {
                companyId: props.dataCompany._id,
              })
            }
          />
        </View>
      </View>
    </Card>
  );
}
