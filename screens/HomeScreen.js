import React, { useEffect, useState } from "react";
import { View, ImageBackground, Dimensions } from 'react-native';
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

const HomeScreen = (props) => {
  const [dataCompany, setDataCompany] = useState(null);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // useEffect d'initialisation de la page Company :
  useEffect(() => {

    // DANS USE : fonction chargement des infos de la compagnie loggée :
    async function loadDataCie() {
        var rawDataCieList = await fetch(`http://${REACT_APP_IPSERVER}/companies/all/${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
        var dataCieList = await rawDataCieList.json();
        if (dataCieList.result) {
          const random = Math.floor(Math.random() * dataCieList.companies.length);
          var rawDataCie = await fetch(`http://${REACT_APP_IPSERVER}/companies/${dataCieList.companies[random]}/${props.user.token}`); // (`adresseIPserveur/route appelée/req.params?req.query`)
          var dataCie = await rawDataCie.json();
      // console.log("dataCie", dataCie);
          if (dataCie.result) {
              setDataCompany(dataCie.company); // set état company avec toutes data
          }
        }
        // appel route put pour modifier données company
        
    }
    loadDataCie();
  }, []);

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
            <View style={{ marginHorizontal: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Nos catégories
              </Text>
            </View>
            <View style={{ marginHorizontal: 15 }}>
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
            <View style={{ marginHorizontal: 15 }}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                L'entreprise à découvrir
              </Text>
            </View>
          </View>
          <View>
            {dataCompany && (<CompanyCard
              navigation={props.navigation}
              dataCompany={dataCompany}
            ></CompanyCard>)}
          </View>
        </View>

{/* NOS PACKS */}
        <View style={{ marginTop: 20, marginBottom:30 }}>
          
          <View>

            <Text style={{ fontWeight: "bold", fontSize: 18, marginHorizontal: 15 }}>Nos packs</Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent:"space-evenly",
                alignContent:"space-around",
                top:20,
                paddingVertical:10
              }}
            >

            <View style={{display:"flex", flexDirection:"row", paddingBottom:10}}>
              <View style={{paddingRight:10}}>
                <ImageBackground
                  source={require('../assets/nouveaubureau.png')}
                  imageStyle={{borderRadius:20}}
                  style={{ 
                    margin: 3,
                    height: 200,
                    width: windowWidth/2.4,
                    justifyContent: "center",
                    // alignItems: "center",
                  }}>
                  <Text
                    style={{color:"#FFFFFF", textAlign:"center", paddingHorizontal:10}}
                  >Je change de bureau</Text>
                </ImageBackground>
              </View>

              {/* <View> */}
                <ImageBackground
                  source={require('../assets/maboite.png')}
                  imageStyle={{borderRadius:20}}
                  style={{ 
                    margin: 3,
                    height: 200,
                    width: windowWidth/2.4,
                    justifyContent: "center",
                    // alignItems: "center",
                  }}>
                  <Text
                    style={{color:"#FFFFFF", textAlign:"center", paddingHorizontal:10}}
                  >Je monte ma boîte</Text>
                </ImageBackground>
              {/* </View> */}
            </View>

            <View style={{display:"flex", flexDirection:"row", paddingBottom:10}}>
              <View style={{paddingRight:10}}>
                <ImageBackground
                  source={require('../assets/équipement.png')}
                  imageStyle={{borderRadius:20}}
                  style={{ 
                    margin: 3,
                    height: 200,
                    width: windowWidth/2.4,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{color:"#FFFFFF", textAlign:"center", paddingHorizontal:10}}
                  >J'équipe mes employés</Text>
                </ImageBackground>
              </View>

              {/* <View> */}
                <ImageBackground
                  source={require('../assets/employés.png')}
                  imageStyle={{borderRadius:20}}
                  style={{ 
                    margin: 3,
                    height: 200,
                    width: windowWidth/2.4,
                    justifyContent: "center",
                    alignItems: "center",
                    
                  }}>
                  <Text
                    style={{color:"#FFFFFF", textAlign:"center", paddingHorizontal:10}}
                  >Je chouchoute mes employés</Text>
                </ImageBackground>
              {/* </View> */}
            </View>

            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
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
