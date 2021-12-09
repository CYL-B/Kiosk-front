import Carousel from 'react-native-snap-carousel';
import React from "react";
import {Component, View, Text, Dimensions} from "react-native";


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
 class MyCarousel extends React.Component {
     
    _renderItem ({item, index}) {
        return (
            <View style={{ height: viewportHeight }} /> // or { flex: 1 } for responsive height
        );
    }

    render () {
        return (
            <Carousel
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={viewportWidth}
              itemWidth={viewportWidth}
              slideStyle={{ width: viewportWidth }}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
            />
        );
    }


}

export default MyCarousel;