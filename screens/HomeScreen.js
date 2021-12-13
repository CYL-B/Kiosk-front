import React, { useEffect } from "react";
import { View } from "react-native";
// Import des composants Button customisés
import { Text } from "react-native-elements";
import { Button, ButtonText } from "../components/Buttons";

import SubCategoriesListHori from "../components/SubCategoriesListHori";
import { HeaderBar } from "../components/Header";
import CompanyCard from "../components/CompanyCard";

import { connect } from "react-redux";

import { REACT_APP_IPSERVER } from "@env";
import { ScrollView } from "react-native-gesture-handler";
import Searchbar from "../components/SearchBar";

const HomeScreen = (props) => {
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
        <HeaderBar title="Accueil" navigation={props.navigation} user={props.user} />
      </View>

      {/* View pour la bar de recherche */}
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Searchbar
            onPress={() => props.navigation.navigate("Rechercher")}
          ></Searchbar>
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
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Recherche par sous-Categories
              </Text>
            </View>
            <View style={{ marginRight: 10 }}>
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
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                L'entreprise de la semaine
              </Text>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <CompanyCard
              navigation={props.navigation}
              dataCompany={dataCompany}
            ></CompanyCard>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Nos pack</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  margin: 30,
                  height: 150,
                  width: 120,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Pack 1</Text>
              </View>
              <View
                style={{
                  margin: 30,
                  height: 150,
                  width: 120,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Pack 2</Text>
              </View>
              <View
                style={{
                  margin: 30,
                  height: 150,
                  width: 120,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Pack 3</Text>
              </View>
              <View
                style={{
                  margin: 30,
                  height: 150,
                  width: 120,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Pack 4</Text>
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
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return {
    setcategoriesList: function (categorieslist) {
      dispatch({ type: "setcategoriesList", categorieslist });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
