import React, { useEffect } from "react";
import { View, ImageBackground, Dimensions } from "react-native";
// Import des composants Button customisés
import Text from "../components/Text";
import { ButtonText } from "../components/Buttons";

import SubCategoriesListHori from "../components/SubCategoriesListHori";
import { HeaderBar } from "../components/Header";
import CompanyCard from "../components/CompanyCard";
// import PackCard from "../components/PackCard";

import { connect } from "react-redux";

import { REACT_APP_IPSERVER } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import Searchbar from "../components/SearchBar";

import { useIsFocused } from "@react-navigation/native";

const HomeScreen = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  var dataCompany = {
    siret: "9999999999",
    companyName: "CompanyTest1",
    logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
    type: "Prestataire",
    description:
      "Mpjgfddddffxxxxcfdssxccccgffxcccc he vvcffdfdssxxxxdhgfrgcchvvccfffffbvvggg vccfffcc",
    shortDescription:
      "ShortDescription company 1, ShortDescription company 1,ShortDescription company 1",
    website: "https://www.google.fr/",
    companyImage:
      "http://res.cloudinary.com/djlnzwuj2/image/upload/v1639069695/iu0v8tbi5kipbakhlult.jpg",
    labels: [
      {
        _id: "61b2386ff31b3b87e3859a58",
      },
      {
        _id: "61b23994f31b3b87e3859a5a",
      },
      {
        _id: "61b23994f31b3b87e3859a5a",
      },
    ],
    offers: [
      {
        _id: "61af78bc4292b4fe7bf8a1d9",
      },
      {
        _id: "61af79470346488ca041da0c",
      },
      {
        _id: "61af796c6f3e101baa8b7cd1",
      },
      {
        _id: "61af79a9c3c2ce891515a112",
      },
    ],
    offices: [
      {
        address: "56 Bv Pereire",
        city: "Paris",
        postalCode: "70017",
        country: "France",
        officeName: "Main Office",
        phone: "0000000009",
        _id: {
          _id: "61b097c526db20ecf9e66954",
        },
      },
    ],
    __v: 24,
  };

  const isFocused = useIsFocused();
  if (isFocused) {
    console.log("props.recherche", props.recherche);
  }

  useEffect(() => {
    var setcategorieslist = async function () {
      const data = await fetch(
        `http://${REACT_APP_IPSERVER}/recherche/getcategories`
      );
      const body = await data.json();
      var categorieslist = body.categorieList;
      props.setcategoriesList(categorieslist);
    };
    setcategorieslist();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      {/* View pour NAVBAR */}
      <View style={{}}>
        <HeaderBar
          title="Kiosk"
          navigation={props.navigation}
          user={props.user}
        />
      </View>

      {/* View pour la bar de recherche */}
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Searchbar navigation={props.navigation}></Searchbar>
        </View>

        {/* View pour List categorie horizontale */}

        <View style={{}}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              //borderWidth: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Nos catégories
              </Text>
            </View>
            <View style={{ marginRight: 20 }}>
              <ButtonText
                color="primary"
                title="Voir plus"
                onPress={() => props.navigation.navigate("Rechercher")}
              />
            </View>
          </View>

          <SubCategoriesListHori
            navigation={props.navigation}
          ></SubCategoriesListHori>
        </View>

        {/* View pour l'entrperise de la semaine */}
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              //borderWidth: 1,
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                L'entreprise de la semaine
              </Text>
            </View>
          </View>
          <View style={{ padding: 20 }}>
            <CompanyCard
              navigation={props.navigation}
              dataCompany={dataCompany}
            ></CompanyCard>
          </View>
        </View>

        {/* NOS PACKS */}
        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 20 }}>
              Nos packs
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                alignContent: "space-around",
                top: 20,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 10,
                }}
              >
                <View style={{ paddingRight: 10 }}>
                  <ImageBackground
                    source={require("../assets/nouveaubureau.png")}
                    imageStyle={{ borderRadius: 20 }}
                    style={{
                      margin: 3,
                      height: 200,
                      width: windowWidth / 2.4,
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      Je change de bureau
                    </Text>
                  </ImageBackground>
                </View>

                {/* <View> */}
                <ImageBackground
                  source={require("../assets/maboite.png")}
                  imageStyle={{ borderRadius: 20 }}
                  style={{
                    margin: 3,
                    height: 200,
                    width: windowWidth / 2.4,
                    justifyContent: "center",
                    // alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    Je monte ma boîte
                  </Text>
                </ImageBackground>
                {/* </View> */}
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 10,
                }}
              >
                <View style={{ paddingRight: 10 }}>
                  <ImageBackground
                    source={require("../assets/équipement.png")}
                    imageStyle={{ borderRadius: 20 }}
                    style={{
                      margin: 3,
                      height: 200,
                      width: windowWidth / 2.4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        paddingHorizontal: 10,
                      }}
                    >
                      J'équipe mes employés
                    </Text>
                  </ImageBackground>
                </View>

                {/* <View> */}
                <ImageBackground
                  source={require("../assets/employés.png")}
                  imageStyle={{ borderRadius: 20 }}
                  style={{
                    margin: 3,
                    height: 200,
                    width: windowWidth / 2.4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      paddingHorizontal: 10,
                    }}
                  >
                    Je chouchoute mes employés
                  </Text>
                </ImageBackground>
                {/* </View> */}
              </View>
            </View>
          </View>
        </View>

        {/* <View
        style={{
          flex: 1,
          backgroundColor: "yellow",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          size="md"
          color="primary"
          title="Company Page"
          onPress={() => props.navigation.navigate("CompanyPage")}
        />
      </View> */}
      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
    recherche: state.recherche,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setcategoriesList: function (categorieslist) {
      dispatch({ type: "setcategoriesList", categorieslist });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
