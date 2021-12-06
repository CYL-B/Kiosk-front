import React, { useEffect, useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Button, ButtonText } from '../components/Buttons';
import { useForm } from "react-hook-form";
import { Input, Image } from 'react-native-elements';

const LoginScreen = (props) => {
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

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/background-login.png")} resizeMode="cover" style={styles.image}>
                <View style={styles.logoContainer}>
                    <Image
                    source={require("../assets/logo-light-2.png")}
                    style={styles.logo}
                    />
                </View>
                <View style={styles.form}>
                    <Text style={styles.text}>Connexion</Text>
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
                        placeholder="Entrez votre mot de passe"
                        onChangeText={onChangeField('password')}
                        label="Mot de passe"
                        inputStyle={styles.inputText}
                        inputContainerStyle={styles.input}
                        labelStyle={styles.label}
                        placeholderTextColor="#DCDCDC"
                    />
                    
                </View>
                <View style={styles.buttonContainer}>
                    <Button size="md" color="primary" title="Se connecter" onPress={handleSubmit(onSubmit)} />
                    <ButtonText color="light" title="Annuler" onPress={() => props.navigation.navigate('Bienvenue')} />
                </View>
            </ImageBackground>
        </View>
    );
};

export default LoginScreen;