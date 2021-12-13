import React, { useState } from 'react';
import { View, Text} from 'react-native';
import { HeaderBar } from '/Users/Camille/Desktop/Lacapsule1/lacapsule2/kiosk-project/kiosk/frontend/components/Header.js';
import Toggle from 'react-native-toggle-element';

const QuotationScreen =(props) =>{
    const [toggleValue, setToggleValue] = useState(false);

    var leftComponentDisplay 
    if(toggleValue == false) 
    {leftComponentDisplay = <Text style={{color : "white", fontWeight:"bold"}}>En cours</Text>} else{
        leftComponentDisplay = <Text style={{color : "#1A0842", fontWeight:"bold"}}>En cours</Text>

    }
    var rightComponentDisplay
    if(toggleValue == true) {
    var rightComponentDisplay = <Text style={{color : "white", fontWeight:"bold"}}>Passés</Text>}else{
        var rightComponentDisplay = <Text style={{color : "#1A0842", fontWeight:"bold"}}>Passés</Text>
    }

    return(
        <View style={{flex:1, backgroundColor:"white"}}>
        <HeaderBar
        title="Vos devis"
        navigation={props.navigation}>
            
        </HeaderBar>
        
       <View style={{alignItems:"center", marginTop:10}}><Toggle
        value={toggleValue}
        onPress={(newState) => setToggleValue(newState)}
        
        leftComponent ={leftComponentDisplay}
        thumbButton={{
            width: 175,
            height: 50,
            radius: 30,
            activeBackgroundColor : "#F47805",
            inActiveBackgroundColor : "#F47805"

        }}
        
            rightComponent = {rightComponentDisplay}
            trackBar={{
                width: 350,
                activeBackgroundColor : "#FAF0E6",
                inActiveBackgroundColor : "#FAF0E6"
                
            }}
            
      />
      </View> 
      </View>
    )
}

export default QuotationScreen;