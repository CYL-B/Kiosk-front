import React, { useState, useCallback, useEffect } from 'react'
//Store
import { connect } from 'react-redux';
//Var de connexion
import { REACT_APP_IPSERVER } from '@env'

//import de la librairie gifted chat avec ses éléments
import { GiftedChat, InputToolbar, Send, Bubble, MessageText } from 'react-native-gifted-chat'
import { View, Text, StyleSheet } from 'react-native';
import { HeaderBar } from '../components/Header'
import { Divider, Badge } from 'react-native-elements';
import { AvatarRound } from '../components/avatar'
import { FontAwesome } from '@expo/vector-icons';


const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState();
  const [convId, setConvId] = useState(props.route.params && props.route.params.convId ? props.route.params.convId : "61b0e6837ee15e4f2a1a936f");
  

  // &user=${props.user}
  

  //on récupère le convID depuis "messages screen" au press sur la conversation correspondante


  useEffect(() => {
    const findMessages = async()=>{
      const data = await fetch(`http://${REACT_APP_IPSERVER}/conversations/messages/${convId}`)
      const body = await data.json();
      console.log("body",body.sortedMessages)
      
      setMessages(body.sortedMessages)
    }
    findMessages();
  }, [])


  //fonction qui prévoit d'ajouter (append) les nouveaux messages aux anciens au click sur le "send"
  //var addMessage s'exécute pour enregistrer le dernier message en base de données
  //message est un tableau

  const onSend = useCallback((messages = []) => {
    var newMessage
    var addMessage = async (message) => {
      console.log('addMessage', message[0].text)
      const saveReq = await fetch(`http://${REACT_APP_IPSERVER}/conversations/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `convId=${convId}&userId=${props.user._id}&message=${message[0].text}&date=${message[0].createdAt}`
        
      }) 
      const fromBack = await saveReq.json()
      newMessage = fromBack.messageToSendToFront
      console.log("newMessage", newMessage)
      setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
    console.log("messagesChat", messages)
    }
    addMessage(messages)
  },
    [])


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
    onBackPress={() => props.navigation.goBack()}
  ></HeaderBar>
    <Divider style={{ backgroundColor: '#FAF0E6', height: 60, flexDirection: "row", justifyContent: "center", alignItems: "center" }}><Badge status="error" badgeStyle={{ marginTop: 6 }} /><Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}>Pas de contrat en cours</Text></Divider>
    <GiftedChat
      listViewProps={{ marginBottom: 5 }}
      renderInputToolbar={renderInputToolbar}
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
    marginTop: 10,
    marginBottom: 10
  },
  send: {
    flexDirection: "row",
    paddingTop: 10,
    paddingRight: 15
  },
  bubble: {

  }
})
function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(
  mapStateToProps,
  null
)(ChatScreen)