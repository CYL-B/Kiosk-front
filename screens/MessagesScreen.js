import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { HeaderBar } from '../components/Header'
import { ListItem } from 'react-native-elements';
import { AvatarRound } from '../components/avatar'
import { REACT_APP_IPSERVER } from '@env'

const MessagesScreen = (props) => {
    
    const[conversations, setConversations] = useState([])
    var lastMessage = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    if (lastMessage.length > 35) {
        lastMessage = lastMessage.slice(0, 35) + "..."
    }
//
    useEffect(() => {
    const findConversations = async()=>{
        const data = await fetch(`http://${REACT_APP_IPSERVER}/conversations`)
        const body= await data.json();
        setConversations(body)
    };findConversations()
    }, []);

    console.log("body", conversations)
    return (
        <View><HeaderBar
            title="Messages"
        >

        </HeaderBar>
            <ScrollView>
                <ListItem containerStyle={{
                    justifyContent: 'space-around'

                }}
                    onPress={() => props.navigation.navigate('ChatScreen')}
                >
                    <AvatarRound size="md"
                        source={{ uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg' }}></AvatarRound>
                    <ListItem.Content>

                        <ListItem.Title
                            style={{ color: "#1A0842", fontSize: 20, fontWeight: "bold", marginBottom: 5 }}
                        >Hello Swiper</ListItem.Title>
                        <ListItem.Subtitle style={{ color: "#1A0842", fontSize: 12 }}>{lastMessage}</ListItem.Subtitle></ListItem.Content>
                    <Text style={{ color: "#1A0842", fontSize: 12 }}>Date</Text>
                </ListItem>
                <ListItem containerStyle={{
                    justifyContent: 'space-around'

                }}
                    onPress={() => props.navigation.navigate('ChatScreen')}>
                    <AvatarRound size="md"
                        source={{ uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg' }}></AvatarRound>
                    <ListItem.Content>

                        <ListItem.Title
                            style={{ color: "#1A0842", fontSize: 20, fontWeight: "bold", marginBottom: 5 }}
                        >Hello Swiper</ListItem.Title>
                        <ListItem.Subtitle style={{ color: "#1A0842", fontSize: 12 }}>Tchi</ListItem.Subtitle></ListItem.Content>
                    <Text style={{ color: "#1A0842", fontSize: 12 }}>Date</Text>
                </ListItem></ScrollView></View>


    );
};

// function mapStateToProps(state){
//     return {user: state.user}
//   }
  
//   export default connect(
//     mapStateToProps,
//     null
//   )(MessagesScreen)
export default MessagesScreen;