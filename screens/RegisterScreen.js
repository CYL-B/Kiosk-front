import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, ButtonText } from '../components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import { useForm } from "react-hook-form";
import { Input, Image } from 'react-native-elements';

const RegisterScreen = (props) => {
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    const [currentStep, setCurrentStep] = useState(1);

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = useCallback(formData => {
        console.log(formData);
    }, []);
    const onChangeField = useCallback(
        name => text => {
            setValue(name, text);
        },
        []
    );
    useEffect(() => {
        register('email');
        register('password');
        register('firstName');
        register('lastName');
        register('phoneNumber');
        register('role');
        register('imgProfil');
        register('companyName');
        register('companyAddress');
        register('companySIRET');
    }, [register]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        image: {
            flex: 1,
            justifyContent: "space-between"
        },
        logoContainer: {
            alignItems: "center"
        },
        buttonContainer: {
            alignItems: "center",
            marginBottom: 33
        },
        logo: {
            width: 200,
            height: 34.9,
            marginTop: 114
        },
        profil: {
            width: 179,
            height: 179,
            marginBottom: 11
        },
        form: {
            alignItems: "center",
            marginHorizontal: 45
        },
        input: {
            borderBottomColor: "#FAF0E6"
        },
        inputText: {
            color: "#fff"
        },
        label: {
            color: "#fff",
            fontWeight: "normal"
        },
        text: {
            color: "white",
            fontSize: 22,
            lineHeight: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 60
        }
    });

    const Step1 = () => {
        return (
            <View style={styles.form}>
                <Text style={styles.text}>Veuillez renseigner vos informations personnelles</Text>
                <Input
                    autoCompleteType="email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    placeholder="Votre email pro"
                    onChangeText={onChangeField('email')}
                    inputStyle={styles.inputText}
                    label="Adresse email pro"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    secureTextEntry
                    autoCompleteType="password"
                    placeholder="Choisissez un mot de passe"
                    onChangeText={onChangeField('password')}
                    label="Mot de passe"
                    inputStyle={styles.inputText}
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />

            </View>
        )
    }

    const Step2 = () => {
        return (
            <View style={styles.form}>
                <Text style={styles.text}>Veuillez renseigner vos informations personnelles</Text>
                <Input
                    autoCompleteType="name"
                    textContentType="name"
                    placeholder="Votre prénom"
                    onChangeText={onChangeField('firstName')}
                    inputStyle={styles.inputText}
                    label="Prénom"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    autoCompleteType="name"
                    textContentType="familyName"
                    placeholder="Votre nom"
                    onChangeText={onChangeField('lastName')}
                    inputStyle={styles.inputText}
                    label="Nom"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    autoCompleteType="tel"
                    textContentType="telephoneNumber"
                    placeholder="Votre numéro de téléphone pro"
                    onChangeText={onChangeField('telephoneNumber')}
                    inputStyle={styles.inputText}
                    label="Téléphone pro"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    autoCompleteType="off"
                    textContentType="jobTitle"
                    placeholder="Votre rôle dans l'entreprise"
                    onChangeText={onChangeField('role')}
                    inputStyle={styles.inputText}
                    label="Rôle"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
            </View>
        )
    }

    const Step3 = () => {
        return (
            <View style={styles.form}>
                <Text style={styles.text}>Veuillez renseigner vos informations personnelles</Text>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <Image
                        source={require("../assets/profil-pic.png")}
                        style={styles.profil}
                    />
                </TouchableOpacity>
                <ButtonText color="light" title="Ajouter votre photo de profil" onPress={openImagePickerAsync} />
            </View>
        )
    }

    const Step4 = () => {
        return (
            <View style={styles.form}>
                <Text style={styles.text}>Veuillez renseigner les informations concernant l’entreprise</Text>
                <Input
                    autoCompleteType="off"
                    textContentType="organizationName"
                    placeholder="Le nom de l’entreprise"
                    onChangeText={onChangeField('companyName')}
                    inputStyle={styles.inputText}
                    label="Nom"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    autoCompleteType="street-address"
                    textContentType="fullStreetAddress"
                    placeholder="L'adresse du siège social"
                    onChangeText={onChangeField('companyAddress')}
                    inputStyle={styles.inputText}
                    label="Adresse"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
                <Input
                    autoCompleteType="off"
                    textContentType="none"
                    placeholder="Le numéro SIRET"
                    onChangeText={onChangeField('companySIRET')}
                    inputStyle={styles.inputText}
                    label="SIRET"
                    inputContainerStyle={styles.input}
                    labelStyle={styles.label}
                    placeholderTextColor="#DCDCDC"
                />
            </View>
        )
    }

    let Step;
    switch (currentStep) {
        case 1: {
            Step = Step1;
            break;
        }
        case 2: {
            Step = Step2;
            break;
        }
        case 3: {
            Step = Step3;
            break;
        }
        case 4: {
            Step = Step4;
            break;
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/background-login.png")} resizeMode="cover" style={styles.image}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/logo-light-2.png")}
                        style={styles.logo}
                    />
                </View>
                <Step />
                <View style={styles.buttonContainer}>
                    { currentStep === 4 ? (
                        <Button size="md" color="primary" title="Valider" onPress={handleSubmit(onSubmit)} />
                    ) : (
                        <Button size="md" color="primary" title="Suivant" onPress={() => setCurrentStep(currentStep+1)} />
                    )}
                    { currentStep === 1 ? (
                        <ButtonText color="light" title="Annuler" onPress={() => props.navigation.navigate('Bienvenue')} />
                    ) : (
                        <ButtonText color="light" title="Précédent" onPress={() => setCurrentStep(currentStep-1)} />
                        )}
                </View>
            </ImageBackground>
        </View>
    );
};

export default RegisterScreen;