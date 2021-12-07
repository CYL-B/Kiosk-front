import React, { useState } from 'react';
//import du header, du texte et de listItem de react native elements

import { Header, Text, Overlay, ListItem} from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';

//import des icons depuis fontawesome et ionicons
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

//import du composant "avatarRound" créé dans le répertoire "components" pour l'utiliser en tant que right component du header
import { AvatarRound } from './avatar'


const HeaderBar = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { onBackPress } = props;
  var leftComponentDisplay
  if(props.leftComponent)
  {leftComponentDisplay = 
    <TouchableOpacity onPress={() => onBackPress()}><FontAwesome5 name="chevron-left" size={50} color="#1A0842" /></TouchableOpacity>
  }
//condition pour afficher le composant de gauche (la flèche de retour) dans les composants qui recoivent le header, il est aussi possible d'ajuster le "onBackPress" dans ces mêmes composants 

  var locationIndication
  if (props.locationIndication){
    locationIndication = <Text style={{ color: "#1A0842", fontSize: 10 }}><Ionicons name="ios-location-sharp" size={10} color="#1A0842" />{props.location}</Text>
  }

//comdition pour afficher le sous titre location "locationIndication" qui se situe en dessous du titre de la page dans les composants recevant le header. Il est aussi possible d'ajuster le lieu "location "

  return (
    <Header
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent = {leftComponentDisplay}
      centerComponent={<ListItem containerStyle={{ flexDirection: "column", paddingTop: 0 }}><Text style={{ color: "#1A0842", fontSize: 32, fontWeight: "bold" }}>{props.title}</Text>{locationIndication}
        </ListItem>}
      containerStyle={{
        backgroundColor: 'white',
        justifyContent: 'space-around'

      }}
      rightComponent={<AvatarRound size="md"
        source={{ uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg' }}
        onPress={() => setIsVisible(true)}>
        <Overlay style={{ flex: 1 }}
          isVisible={isVisible}><View>
            <ListItem>
              <Link to={{ screen: 'Devis' }}>
                Devis
              </Link>
              <Link to={{ screen: 'Favoris' }}>
                Favoris
              </Link>
              <Link to={{ screen: 'Favoris' }}>
                Profil
              </Link>
              
              <Link to={{ screen: 'Favoris' }}>
                Entreprise
              </Link>
              <Link to={{ screen: 'Favoris' }}>
                Déconnexion
              </Link>
            </ListItem>
          </View></Overlay>
      </AvatarRound>
      }

    />)
}

export { HeaderBar };