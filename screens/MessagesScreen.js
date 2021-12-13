import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { HeaderBar } from '../components/Header'
import { ListItem, Avatar } from 'react-native-elements';
import { REACT_APP_IPSERVER } from '@env'
import { State } from 'react-native-gesture-handler';

const MessagesScreen = (props) => {

    const [conversations, setConversations] = useState([])

    //ce code permet de couper les messages trop longs
    // if (conversation.message.message.length > 35) {
    //     conversation.message.message = conversation.message.message.slice(0, 35) + "..."
    // }
    //ne pas oublier de renvoyer le user dans le fetch
    useEffect(() => {
        const findConversations = async () => {
            const data = await fetch(`http://${REACT_APP_IPSERVER}/conversations/${props.user.companyId}/${props.user.type}`)
            const body = await data.json();
            setConversations(body.conversationsToDisplay)
        }; findConversations()
    }, []);

    var conversationsList = conversations.map((conversation, i) => {
        return (
            <ListItem containerStyle={{
                justifyContent: 'space-around'

        }}
            onPress={() => props.navigation.navigate('Chat', {convId: conversation.id})}
            key={i}
        >
            <Avatar rounded size="small" imageProps={{resizeMode: 'contain'}} title={conversation.companyName.substring(0, 2)}
                source={{ uri: conversation.logo }}></Avatar>
            <ListItem.Content>

                    <ListItem.Title
                        style={{ color: "#1A0842", fontSize: 20, fontWeight: "bold", marginBottom: 5 }}
                    >{conversation.companyName}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: "#1A0842", fontSize: 12 }}>{conversation.message}</ListItem.Subtitle></ListItem.Content>
                <Text style={{ color: "#1A0842", fontSize: 12 }}>{conversation.date}</Text>
            </ListItem>)

    })
    return (
        <View><HeaderBar
            title="Messages"
            navigation={props.navigation}
            user={props.user}
        >

        </HeaderBar>
            <ScrollView>
                {conversationsList}
            </ScrollView></View>


    );
};

function mapStateToProps(state) {
    return { user: state.user }
}
export default connect(mapStateToProps, null)(MessagesScreen)