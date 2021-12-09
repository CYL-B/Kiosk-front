import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 30
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
     
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    width: ITEM_WIDTH,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    alignItems : "center"

   
    
  },
  header: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    paddingTop: 20
  },
  body: {
    color: "#FFFFFF",
    fontSize: 18,
    paddingRight : 25
    
  
  }
})

export default CarouselCardItem