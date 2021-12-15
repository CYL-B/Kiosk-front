<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Badge} from "react-native-elements";
<<<<<<< HEAD
import {Button} from '../../components/Buttons.js'
import { HeaderBar } from '../../components/Header.js';
=======
import {Button} from '../../components/Buttons'
import { HeaderBar } from '../../components/Header';
>>>>>>> front-a
=======
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Badge } from "react-native-elements";
import { Button } from "../../components/Buttons";
import { HeaderBar } from "../../components/Header";
>>>>>>> pageprofil

//import du switch
import Toggle from "react-native-toggle-element";
import { connect } from "react-redux";
import { REACT_APP_IPSERVER } from "@env";

const QuotationScreen = (props) => {
  const [toggleValue, setToggleValue] = useState(false);
  const [quotations, setQuotations] = useState([]);

  var leftComponentDisplay;
  var rightComponentDisplay;

  useEffect(() => {
    const findQuotations = async () => {
      const data = await fetch(
        `http://${REACT_APP_IPSERVER}/quotations/find-quotation/${props.user.token}/${props.user.companyId}`
      );
      const body = await data.json();
      setQuotations(body.quotationsToDisplay);
      // console.log(quotations)
    };
    findQuotations();
  }, []);

  if (toggleValue == false) {
    leftComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>En cours</Text>
    );
    rightComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>Passés</Text>
    );
    var devis = quotations.map((quotation, i) => {
      if (quotation.status == "requested") {
        return (
          <Card>
            <Card.Title>{quotation.offer}</Card.Title>

            <Card.Image
              style={{ borderRadius: 100, width: 60, height: 60 }}
              source={{ uri: quotation.logo }}
            ></Card.Image>
            <Text>{quotation.name}</Text>
            <Text>
              <Badge badgeStyle={{ backgroundColor: "#808080" }} />
              Devis en cours
            </Text>

            <Card.Divider
              style={{ backgroundColor: "#FAF0E6", alignItems: "flex-end" }}
            >
              <Button title="Contacter" size="md" color="secondary" />
            </Card.Divider>
          </Card>
        );
      } else if (quotation.status == "sent") {
        return (
          <Card>
            <Card.Title>{quotation.offer}</Card.Title>
            <Badge badgeStyle={{ color: "#FFFF00" }} />
            <Text style={{ marginBottom: 10 }}>
              {quotation.name}
              Devis envoyé
            </Text>
            {/* <Card.Image source={{require()}}></Card.Image> */}

            <Card.Divider
              style={{ backgroundColor: "#FAF0E6", alignItems: "flex-end" }}
            >
              <Button title="Contacter" size="md" color="secondary" />
            </Card.Divider>
          </Card>
        );
      } else if (quotation.status == "accepted") {
        return (
          <Card>
            <Card.Title>{quotation.offer}</Card.Title>
            <Badge badgeStyle={{ color: "#F4592B" }} />
            <Text style={{ marginBottom: 10 }}>
              {quotation.name}
              "Devis accepté"
            </Text>
            {/* <Card.Image source={{require()}}></Card.Image> */}

            <Card.Divider
              style={{ backgroundColor: "#FAF0E6", alignItems: "flex-end" }}
            >
              <Button title="Contacter" size="md" color="secondary" />
            </Card.Divider>
          </Card>
        );
      } else if (quotation.status == "paid") {
        return (
          <Card>
            <Card.Title>{quotation.offer}</Card.Title>
            <Badge value="Requested" badgeStyle={{ color: "#FFFF00" }} />
            <Text style={{ marginBottom: 10 }}>
              {quotation.name}
              "Devis payé"
            </Text>
            {/* <Card.Image source={{require()}}></Card.Image> */}

            <Card.Divider
              style={{ backgroundColor: "#FAF0E6", alignItems: "flex-end" }}
            >
              <Button title="Contacter" size="md" color="secondary" />
            </Card.Divider>
          </Card>
        );
      }
    });
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderBar
          title="Vos devis"
          navigation={props.navigation}
          user={props.user}
        ></HeaderBar>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Toggle
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
            leftComponent={leftComponentDisplay}
            thumbButton={{
              width: 175,
              height: 50,
              radius: 30,
              activeBackgroundColor: "#F47805",
              inActiveBackgroundColor: "#F47805",
            }}
            rightComponent={rightComponentDisplay}
            trackBar={{
              width: 350,
              activeBackgroundColor: "#FAF0E6",
              inActiveBackgroundColor: "#FAF0E6",
            }}
          />
        </View>
        <ScrollView>{devis}</ScrollView>
      </View>
    );
  } else {
    leftComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>En cours</Text>
    );
    rightComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>Passés</Text>
    );

    var done = quotations.map((quotation, i) => {
      if (quotation.status == "done") {
        <Card>
          <Card.Title>{quotation.offer}</Card.Title>
          <Text style={{ marginBottom: 10 }}>
            {quotation.name}
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          {/* <Card.Image source={{require()}}></Card.Image> */}

          <Card.Divider
            style={{ backgroundColor: "#FAF0E6", alignItems: "flex-end" }}
          >
            <Button title="Contacter" size="md" color="secondary" />
          </Card.Divider>
        </Card>;
      }
    });

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <HeaderBar
          title="Vos devis"
          navigation={props.navigation}
          user={props.user}
        ></HeaderBar>

        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Toggle
            value={toggleValue}
            onPress={(newState) => setToggleValue(newState)}
            leftComponent={leftComponentDisplay}
            thumbButton={{
              width: 175,
              height: 50,
              radius: 30,
              activeBackgroundColor: "#F47805",
              inActiveBackgroundColor: "#F47805",
            }}
            rightComponent={rightComponentDisplay}
            trackBar={{
              width: 350,
              activeBackgroundColor: "#FAF0E6",
              inActiveBackgroundColor: "#FAF0E6",
            }}
          />
        </View>
        <ScrollView>{done}</ScrollView>
      </View>
    );
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, null)(QuotationScreen);
