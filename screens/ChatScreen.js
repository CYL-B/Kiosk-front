import React, { useState, useCallback, useEffect } from 'react'

//import de la librairie gifted chat avec ses éléments
import { GiftedChat, InputToolbar, Send, Bubble, MessageText } from 'react-native-gifted-chat'
import { View, Text, StyleSheet } from 'react-native';
import { HeaderBar } from '../components/Header'
import { Divider, Badge } from 'react-native-elements';
import { AvatarRound } from '../components/avatar'
import { FontAwesome } from '@expo/vector-icons';


const MessagesScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const[currentMessage, setCurrentMessage] = useState();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  //tableau de messages

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  //fonction qui prévoit d'ajouter (append) des messages au click sur le "send"

  function renderInputToolbar(props) {
    return (
      <InputToolbar {...props} containerStyle={styles.toolbar} />
    )
  }
  //permet de modifier l'input

  function renderSend(props) {
    return (
      <Send {...props} containerStyle={styles.send}><FontAwesome name="send" size={22} color="#F4592B" /></Send>
    )
  }
  //permet de modifier le bouton send

  function renderBubble(props) {
    return (<Bubble {...props} containerStyle={styles.bubble} textStyle={{
      left: {
        color: "#1A0842"
      },
      right: {
        color: "white"
      }
    }} wrapperStyle={{
      left: {
        backgroundColor: "#FAF0E6"
      },
      right: { backgroundColor: "#F4592B" }
    }}></Bubble>)
  }
  //permet de modifier les bulles de conversation qui s'affichent à droite et à gauche de l'écran
 


  return (<View style={{ flex: 1, backgroundColor: "white" }}><HeaderBar
    title="Chat"

    leftComponent
    locationIndication
    location="Paris"
    onPress={() => onBackPress(props.navigation.navigate('MessagesScreen'))}
  ></HeaderBar>
    <Divider style={{ backgroundColor: '#FAF0E6', height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" }}><Badge status="error" badgeStyle={{ marginTop: 6 }} /><Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}>Pas de contrat en cours</Text></Divider>
    <GiftedChat
      listViewProps={{ marginBottom: 5 }}
      onInputTextChanged={(msg)=>setCurrentMessage(msg)}
      text={currentMessage}
      renderInputToolbar={renderInputToolbar}
      messageText={renderMessageText}
      renderSend={renderSend}
      renderBubble={renderBubble}
      textInputStyle={{ color: "#1A0842" }}
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend={true}
      user={{
        _id: 1,
      }}
    /></View>

  );
};
const styles = StyleSheet.create({
  toolbar: {
    borderRadius: 30,
    backgroundColor: "#FAF0E6",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10


  },
  send: {
    flexDirection: "row",
    paddingTop: 10,
    paddingRight: 15
  },
  bubble: {

  }
})

export default MessagesScreen;