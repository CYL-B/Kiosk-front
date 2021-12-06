import React from 'react';
import { Header, Avatar, Text } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { Ionicons } from '@expo/vector-icons';


const HeaderBar = (props) => {
  const { onPress } = props;
  return (
    <Header
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={
        <FontAwesome5 name="chevron-left" size={50} color="#1A0842" onPress={() => onPress()} />
      }
      centerComponent={<ListItem containerStyle={{ flexDirection: "column", paddingTop: 0 }}><Text style={{ color: "#1A0842", fontSize: 32, fontWeight: "bold" }}>Blibli</Text>
        <Text style={{ color: "#1A0842", fontSize: 10 }}><Ionicons name="ios-location-sharp" size={10} color="#1A0842" />Paris, Ile de France</Text></ListItem>}
      containerStyle={{
        backgroundColor: 'white',
        justifyContent: 'space-around'

      }}
      rightComponent={<Avatar
        rounded
        onPress={() => onPress()}
        size={50}
        source={{
          uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg'
        }}
      />}
    />)
}

export { HeaderBar };