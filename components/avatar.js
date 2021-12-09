import React, { useState } from 'react';



import { Avatar, Overlay, ListItem } from 'react-native-elements';
//création d'un composant avatar avec options de taille (petit et moyen)

const AvatarRound = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleOverlay = () => {
        setIsVisible(!isVisible);
    };
    var navigate = (screen) => {
        setIsVisible(!isVisible)
        props.navigation.navigate(screen);

    }

    //options de taille dans les composants recevant l'avatar
    let size
    if (props.size === "md") {
        size = 50;
    } else {
        size = 25;
    };
    const { onPress } = props;

    return (
        <Avatar
            rounded
            onPress={() => toggleOverlay()}
            size={size}
            source={props.source}
        >
            <Overlay style={{ flex: 1 }} overlayStyle={{
                position: "absolute", top: 85.5, right: 25, borderRadius: 10, backgroundColor: "#FAF0E6", elevation: 4, shadowOpacity: 0.29,
                shadowRadius: 4.65,
            }}
                isVisible={isVisible} onBackdropPress={toggleOverlay}
                backdropStyle={{ backgroundColor: "transparent" }}>
                <ListItem containerStyle={{ backgroundColor: "#FAF0E6" }} onPress={() => navigate("UserProfile")}>
                    <ListItem.Title style={{ color: "#1A0842", fontWeight: "bold" }}>Profil</ListItem.Title>

                </ListItem>
                <ListItem containerStyle={{ backgroundColor: "#FAF0E6" }} onPress={() => navigate("Favorites")}>
                    <ListItem.Title style={{ color: "#1A0842", fontWeight: "bold" }}>Favoris</ListItem.Title>

                </ListItem>
                <ListItem containerStyle={{ backgroundColor: "#FAF0E6" }} onPress={() => navigate("Quotation")}>
                    <ListItem.Title style={{ color: "#1A0842", fontWeight: "bold" }}>Devis</ListItem.Title>

                </ListItem>
                <ListItem containerStyle={{ backgroundColor: "#FAF0E6" }} onPress={() => navigate("CompanyProfile")}>
                    <ListItem.Title style={{ color: "#1A0842", fontWeight: "bold" }}>Entreprise</ListItem.Title>

                </ListItem>
                <ListItem containerStyle={{ backgroundColor: "#FAF0E6" }}>
                    <ListItem.Title style={{ color: "#1A0842", fontWeight: "bold" }}>Déconnexion</ListItem.Title>

                </ListItem>
            </Overlay></Avatar>
    )
}

export { AvatarRound };