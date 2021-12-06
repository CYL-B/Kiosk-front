import React from 'react';

import {Avatar} from 'react-native-elements';
//création d'un composant avatar avec options de taille (petit et moyen)

const AvatarRound = (props) => {
    //options de taille dans les composants recevant l'avatar
    let size
    if (props.size === "md"){
        size=50;
    } else {
    size=25;
    } ;
    const { onPress } = props;

    return(
        <Avatar
        rounded
        onPress={() => onPress()}
        size={size}
        source={props.source}
      />
    )
}

export {AvatarRound};