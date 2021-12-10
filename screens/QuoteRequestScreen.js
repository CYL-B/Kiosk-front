import React from "react";
import { View} from 'react-native';
import { HeaderBar } from '../components/Header'
import OfferCardLight from '../components/OfferCardLight';
import { Button, ButtonText } from "../components/Buttons";

const QuoteRequestScreen = (props) => {
    return (<View>
        <HeaderBar
        leftComponent
        title="Demande de devis"
        navigation={props.navigation}
    >

    </HeaderBar>
    
    <Button 
title="Envoyer la demande"
size="md"
color="primary"
></Button>
<ButtonText title="Annuler"></ButtonText> 
    </View>
    )
}
export default QuoteRequestScreen;

/* <OfferCardLight></OfferCardLight>
 */