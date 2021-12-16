import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Badge } from "react-native-elements";
import { Button } from "../../components/Buttons";
import { HeaderBar } from "../../components/Header";

import { useIsFocused } from "@react-navigation/native";

//import du switch
import Toggle from "react-native-toggle-element";
import { connect } from "react-redux";
import { REACT_APP_IPSERVER } from "@env";

const QuotationScreen = (props) => {
  const [toggleValue, setToggleValue] = useState(false);
  const [quotations, setQuotations] = useState([]);
  const [requests, setRequests] = useState([]);

  const isFocused = useIsFocused();

  var leftComponentDisplay;
  var rightComponentDisplay;

  useEffect(() => {
    const findQuotations = async () => {
      const data = await fetch(
        `http://${REACT_APP_IPSERVER}/quotations/find-quotation/${props.user.token}/${props.user.companyId}`
      );
      const body = await data.json();
      setQuotations(body.quotationsToDisplay);
      setRequests(body.requestsToDisplay);
    };
    if (isFocused == true) {
      findQuotations();
    }
  }, [isFocused]);

  

  if (toggleValue == false) {
    leftComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>En cours</Text>
    );
    rightComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>Passés</Text>
    );

    var demandes = requests.map((request, i) => {
      var backgroundRequest;
      var statut;
      var badgeColor;
      var title;
      var button;
      if (
        request.status == "requested" ||
        request.status == "sent" ||
        request.status == "accepted" ||
        request.status == "paid"
      ) {
        if (request.status == "requested") {
          backgroundRequest = "#619B8A";
          statut = "Devis en attente";
          badgeColor = "#808080";
          title = "Voir la demande";
          button = (
            <Button
              title={title}
              style={{ margin: 10 }}
              onPress={() =>
                props.navigation.navigate("SendQuote", { quoteId: request.id })
              }
              size="md"
              color="secondary"
            ></Button>
          );
        } else if (request.status == "sent") {
          backgroundRequest = "#619B8A";
          statut = "Devis envoyé";
          badgeColor = "#FFA500";
          title = "Voir le devis";
          button = (
            <Button
              title={title}
              style={{ margin: 10 }}
              size="md"
              color="secondary"
            ></Button>
          );
        } else if (request.status == "accepted") {
          backgroundRequest = "#619B8A";
          statut = "Devis accepté";
          badgeColor = "#FFFF00";
          title = "Voir le devis";
          button = (
            <Button
              title={title}
              style={{ margin: 10 }}
              size="md"
              color="secondary"
            ></Button>
          );
        } else if (request.status == "paid") {
          backgroundRequest = "#619B8A";
          statut = "Devis payé";
          badgeColor = "#00FF00";
          title = "Voir le paiement";
          button = (
            <Button
              title={title}
              style={{ margin: 10 }}
              size="md"
              color="secondary"
            ></Button>
          );
        }

        return (
          <Card
            containerStyle={{
              padding: 0,
              borderRadius: 20,
              shadowColor: "rgba(0,0,0,0.4)",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
              backgroundColor: backgroundRequest,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                <Card.Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: 30,
                  }}
                  source={{ uri: request.logo }}
                ></Card.Image>
              </View>
              <View style={{ margin: 10, flexShrink: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {request.offer}
                </Text>
                <Text style={{ margin: 2 }}>{request.name}</Text>
                <Text>
                  <Badge
                    badgeStyle={{ backgroundColor: badgeColor, margin: 2 }}
                  />
                  {statut}
                </Text>
              </View>
            </View>

            <Card.Divider
              style={{
                backgroundColor: "#FAF0E6",
                alignItems: "flex-end",
                padding: 0,
                marginBottom: 0,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              }}
            >
              {button}
            </Card.Divider>
          </Card>
        );
      }
    });

    var devis = quotations.map((quotation, i) => {
      var statut;
      var badgeColor;
      var title;
      var button;

      if (
        quotation.status == "requested" ||
        quotation.status == "sent" ||
        quotation.status == "accepted" ||
        quotation.status == "paid"
      ) {
        if (quotation.status == "requested") {
          statut = "Devis en attente";
          badgeColor = "#808080";
        } else if (quotation.status == "sent") {
          statut = "Devis envoyé";
          badgeColor = "#FFA500";
          title = "Voir le devis";
          button = (
            <Button
              title={title}
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              size="md"
              color="primary"
            ></Button>
          );
        } else if (quotation.status == "accepted") {
          statut = "Devis accepté";
          badgeColor = "#FFFF00";
          title = "Voir le devis";
          button = (
            <Button
              title={title}
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              size="md"
              color="primary"
            ></Button>
          );
        } else if (quotation.status == "paid") {
          statut = "Devis payé";
          badgeColor = "#00FF00";
          title = "Voir le paiement";
          button = (
            <Button
              title={title}
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
              }}
              size="md"
              color="primary"
            ></Button>
          );
        }

        return (
          <Card
            containerStyle={{
              padding: 0,
              borderRadius: 20,
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
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                <Card.Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: 30,
                  }}
                  source={{ uri: quotation.logo }}
                ></Card.Image>
              </View>
              <View style={{ margin: 10, flexShrink: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {quotation.offer}
                </Text>
                <Text style={{ margin: 2 }}>{quotation.name}</Text>
                <Text>
                  <Badge
                    badgeStyle={{ backgroundColor: badgeColor, margin: 2 }}
                  />
                  {statut}
                </Text>
              </View>
            </View>

            <Card.Divider
              style={{
                backgroundColor: "#FAF0E6",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 0,
                marginBottom: 0,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              }}
            >
              <Button
                title="Contacter"
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                size="md"
                color="secondary"
              />
              {button}
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
        <ScrollView>
          {devis}
          {demandes}
        </ScrollView>
      </View>
    );
  } else {
    leftComponentDisplay = (
      <Text style={{ color: "#1A0842", fontWeight: "bold" }}>En cours</Text>
    );
    rightComponentDisplay = (
      <Text style={{ color: "white", fontWeight: "bold" }}>Passés</Text>
    );

    if (requests.length == !0) {
      var requestsDone = requests.map((request, i) => {
        if (request.status == "done") {
          return (
            <Card
              containerStyle={{
                padding: 0,
                borderRadius: 20,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowOffset: {
                  width: 0,
                  height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
                backgroundColor: "#619B8A",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    alignSelf: "center",
                  }}
                >
                  <Card.Image
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                      borderRadius: 30,
                    }}
                    source={{ uri: request.logo }}
                  ></Card.Image>
                </View>
                <View style={{ margin: 10, flexShrink: 1 }}>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {request.offer}
                  </Text>
                  <Text style={{ margin: 2 }}>{request.name}</Text>
                  <Text>
                    <Badge badgeStyle={{ backgroundColor: "red", margin: 2 }} />
                    Devis Passé
                  </Text>
                </View>
              </View>

              <Card.Divider
                style={{
                  backgroundColor: "#FAF0E6",
                  alignItems: "flex-end",
                  padding: 0,
                  marginBottom: 0,
                  borderBottomEndRadius: 20,
                  borderBottomStartRadius: 20,
                }}
              >
                <Button
                  title="Voir la facture"
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  size="md"
                  color="secondary"
                />
              </Card.Divider>
            </Card>
          );
        }
      });
    }

    var done = quotations.map((quotation, i) => {
      if (quotation.status == "done") {
        return (
          <Card
            containerStyle={{
              padding: 0,
              borderRadius: 20,
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
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 60,
                  height: 60,
                  margin: 10,
                  alignSelf: "center",
                }}
              >
                <Card.Image
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "contain",
                    borderRadius: 30,
                  }}
                  source={{ uri: quotation.logo }}
                ></Card.Image>
              </View>
              <View style={{ margin: 10, flexShrink: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {quotation.offer}
                </Text>
                <Text style={{ margin: 2 }}>{quotation.name}</Text>
                <Text>
                  <Badge badgeStyle={{ backgroundColor: "red", margin: 2 }} />
                  Devis passé
                </Text>
              </View>
            </View>

            <Card.Divider
              style={{
                backgroundColor: "#FAF0E6",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 0,
                marginBottom: 0,
                borderBottomEndRadius: 20,
                borderBottomStartRadius: 20,
              }}
            >
              <Button
                title="Laisser un avis"
                onPress={() => props.navigation.navigate("LeaveFeedback")}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                size="md"
                color="primary"
              />
              <Button
                title="Voir la facture"
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 5,
                  marginRight: 5,
                }}
                size="md"
                color="secondary"
              />
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
        <ScrollView>
          {requestsDone}
          {done}
        </ScrollView>
      </View>
    );
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps, null)(QuotationScreen);
