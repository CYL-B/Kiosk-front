import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button, ButtonText } from "../../components/Buttons";
import { useForm } from "react-hook-form";
import { Input, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

import { REACT_APP_IPSERVER } from "@env";
import { ScrollView } from "react-native-gesture-handler";

const UserProfileScreen = (props) => {
  //console.log("props.user", props.user);

  const { handleSubmit, setValue } = useForm();
  const [imgProfil, setImgProfil] = useState(props.user.avatar);

  const [email, setEmail] = useState(props.user.email);
  const [firstname, setFirstname] = useState(props.user.firstName);
  const [lastName, setLastname] = useState(props.user.lastName);
  const [phone, setPhone] = useState(props.user.phone);
  const [role, setRole] = useState(props.user.role);

  console.log("email", email, "firstname", firstname);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // on récupère l'uri de l'image et on la stocke dans un état
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImgProfil(pickerResult.uri);
  };

  async function handleclickUpdtate() {
    var userUpdate = await fetch(
      `http://${REACT_APP_IPSERVER}/users/updateuserdata`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${props.user.token}&email=${email}&firstName=${firstname}&lastName=${lastName}&phone=${phone}&role=${role}`,
      }
    );
    let res = await userUpdate.json();

    if (res.result === true) {
      props.storeUser(res.userData);
      props.navigation.navigate("Home");
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "space-between",
    },

    buttonContainer: {
      alignItems: "center",
      marginBottom: 33,
    },
    logo: {
      width: 200,
      height: 34.9,
      marginTop: 114,
    },
    form: {
      alignItems: "center",
      marginHorizontal: 45,
      //borderWidth: 1,
      marginTop: 40,
    },
    input: {
      borderBottomColor: "#FAF0E6",
    },
    inputText: {
      color: "#fff",
    },
    label: {
      color: "#fff",
      fontWeight: "normal",
    },
    text: {
      color: "white",
      fontSize: 22,
      lineHeight: 32,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    profil: {
      width: 179,
      height: 179,
      marginBottom: 11,
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/background-login.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView>
          <View style={styles.form}>
            <Text style={styles.text}>Profil</Text>
            <TouchableOpacity
              onPress={openImagePickerAsync}
              style={{ marginBottom: 20 }}
            >
              {imgProfil ? (
                <Image source={{ uri: imgProfil }} style={styles.profil} />
              ) : (
                <Image
                  source={require("../../assets/profil-pic.png")}
                  style={styles.profil}
                />
              )}
              <ButtonText
                containerStyle={{ marginBottom: 30 }}
                color="light"
                title="Modifier votre photo de profil"
                onPress={openImagePickerAsync}
              />
            </TouchableOpacity>

            <Input
              autoCompleteType="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              placeholder="Votre email pro"
              onChangeText={(value) => setEmail(value)}
              inputStyle={styles.inputText}
              label="Adresse email pro"
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
              value={email}
            />
            <Input
              secureTextEntry
              autoCompleteType="password"
              placeholder="Entrez votre mot de passe"
              //onChangeText={onChangeField("password")}
              label="Mot de passe"
              inputStyle={styles.inputText}
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
            />

            <Input
              autoCompleteType="name"
              textContentType="name"
              placeholder="Votre prénom"
              onChangeText={(value) => setFirstname(value)}
              inputStyle={styles.inputText}
              label="Prénom"
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
              value={firstname}
            />
            <Input
              autoCompleteType="name"
              textContentType="familyName"
              placeholder="Votre nom"
              onChangeText={(value) => setLastname(value)}
              inputStyle={styles.inputText}
              label="Nom"
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
              value={lastName}
            />
            <Input
              autoCompleteType="tel"
              textContentType="telephoneNumber"
              placeholder="Votre numéro de téléphone pro"
              onChangeText={(value) => setPhone(value)}
              inputStyle={styles.inputText}
              label="Téléphone pro"
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
              value={phone}
            />
            <Input
              autoCompleteType="off"
              textContentType="jobTitle"
              placeholder="Votre rôle dans l'entreprise"
              onChangeText={(value) => setRole(value)}
              inputStyle={styles.inputText}
              label="Rôle"
              inputContainerStyle={styles.input}
              labelStyle={styles.label}
              placeholderTextColor="#DCDCDC"
              value={role}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              size="md"
              color="primary"
              title="Modifier"
              onPress={() => handleclickUpdtate()}
            />
            <ButtonText
              color="light"
              title="Annuler"
              onPress={() => props.navigation.navigate("Home")}
            />
          </View>
        </ScrollView>
      </ImageBackground>
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
    storeUser: function (user) {
      dispatch({ type: "storeUser", user });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);
