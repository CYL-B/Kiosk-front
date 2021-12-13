import React, { useState, useCallback, useEffect } from 'react'
//Store
import { connect } from 'react-redux';
//Var de connexion
import { REACT_APP_IPSERVER } from '@env'

//import de la librairie gifted chat avec ses éléments
import { GiftedChat, InputToolbar, Send, Bubble, MessageText } from 'react-native-gifted-chat'
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { HeaderBar } from '../components/Header'
import { Divider, Badge, AirbnbRating } from 'react-native-elements';
import { AvatarRound } from '../components/avatar'
import { FontAwesome } from '@expo/vector-icons';
import { Card } from 'react-native-elements/dist/card/Card';
import { ScrollView } from 'react-native-gesture-handler';

const RatingScreen = (props) => {
    return (
    
    <View style={{ flex: 1, backgroundColor: "white" }}>

        <HeaderBar
            title="NOM CIE"
            leftComponent
            locationIndication
            location="Paris"
            user={props.user}
            onBackPress={() => props.navigation.goBack()}
        >
        </HeaderBar>

        <Divider 
            style={{ 
                backgroundColor: '#FAF0E6', 
                height: 80, 
                justifyContent: "center", 
                alignItems: "flex-start",
                
            }}>
            <View
                style={{left:10}}>
                <Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}
                    >NBR commentaires
                </Text>
                <View style={{display:"flex", flexDirection:"row", left:8}}>
                    <AirbnbRating style={{left:10}}
                        selectedColor="#F47805"
                        unSelectedColor="#F4780533"
                        reviewColor="#F47805"
                        defaultRating={3} //changer avec rating
                        isDisabled
                        count={5}
                        size={20}
                        showRating={false}
                    />
                    <Text style={{ fontSize: 20, color: "#1A0842", marginLeft: 10 }}
                        > NOTE
                    </Text>
                </View>
            </View>
        </Divider>

        <ScrollView >

            <View style={{paddingBottom:30}}>
                <View style={{display:"flex", flexDirection:"row", left:15, marginTop:20, marginRight:30}}>
                    <AvatarRound 
                        navigation={props.navigation} size="md"
                        source={{ uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg' }}
                    >
                    </AvatarRound>
                    <View style={{left:10}}>
                        <Text
                            >USER USER
                        </Text>
                        <Text
                            >CIE - DATE ???
                        </Text>
                    </View>
                </View>
                <View style={{display:"flex", flexDirection:"column",left:15}}>
                    {/* <View style={{marginRight:30, backgroundColor:"blue"}}> */}
                        <Text style={{flexShrink: 1, top:10, marginRight:30}}
                            > AVIS : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis, neque sed ornare dapibus, urna turpis vulputate elit, vel volutpat urna tortor vel neque. Cras porta leo sit amet convallis accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed id nisl risus. Curabitur ultrices cursus rhoncus. Nunc hendrerit turpis et massa porttitor, eu varius tortor viverra. Etiam feugiat placerat diam, semper vestibulum turpis ultricies ut. Donec eu felis quis eros semper faucibus sit amet vitae turpis. Aliquam ac sollicitudin mauris. Curabitur urna elit, iaculis in nunc et, rhoncus bibendum enim. 
                        </Text>
                    {/* </View> */}
                        <View style={{ alignItems:"flex-start", top:15, marginRight:30}}>
                        <AirbnbRating 
                        style={{marginTop:10}}
                            selectedColor="#F47805"
                            unSelectedColor="#F4780533"
                            reviewColor="#F47805"
                            defaultRating={3} //changer avec rating
                            isDisabled
                            count={5}
                            size={20}
                            showRating={false}
                        />
                        </View>
                </View>
            </View>

            <View style={{paddingBottom:30}}>
                <View style={{display:"flex", flexDirection:"row", left:15, marginTop:20, marginRight:30}}>
                    <AvatarRound 
                        navigation={props.navigation} size="md"
                        source={{ uri: 'https://numero.twic.pics/images/flexible_grid/100/push-cover-beyonce-ticket-concert-a-vie-jay-numero-magazine.jpg' }}
                    >
                    </AvatarRound>
                    <View style={{left:10}}>
                        <Text
                            >USER USER
                        </Text>
                        <Text
                            >CIE - DATE ???
                        </Text>
                    </View>
                </View>
                <View style={{display:"flex", flexDirection:"column",left:15}}>
                        <Text style={{flexShrink: 1, top:10, marginRight:30}}
                            > AVIS : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis, neque sed ornare dapibus, urna turpis vulputate elit, vel volutpat urna tortor vel neque. Cras porta leo sit amet convallis accumsan. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed id nisl risus. Curabitur ultrices cursus rhoncus. Nunc hendrerit turpis et massa porttitor, eu varius tortor viverra. Etiam feugiat placerat diam, semper vestibulum turpis ultricies ut. Donec eu felis quis eros semper faucibus sit amet vitae turpis. Aliquam ac sollicitudin mauris. Curabitur urna elit, iaculis in nunc et, rhoncus bibendum enim. 
                        </Text>
                        <View style={{ alignItems:"flex-start", top:15, marginRight:30}}>
                        <AirbnbRating 
                        style={{marginTop:10}}
                            selectedColor="#F47805"
                            unSelectedColor="#F4780533"
                            reviewColor="#F47805"
                            defaultRating={3} //changer avec rating
                            isDisabled
                            count={5}
                            size={20}
                            showRating={false}
                        />
                        </View>
                </View>
            </View>

        </ScrollView>

    </View>
    )
};



// on récupère le user stocké dans le store : 
function mapStateToProps(state) {
      return { user: state.user }
    };

    export default connect(mapStateToProps, null)(RatingScreen);