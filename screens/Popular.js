import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";
import Star from 'react-native-star-view';

export default class PopularMoviesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      ngrok_url: " https://f6e1-2804-14d-1687-8e48-b0d8-8694-dcba-7958.ngrok-free.app"
    }
  }

  /*defina a função getData() aqui*/
  componentDidMount() {
    this.getData();
  }



  getData =()=> {
    const url = this.state.ngrok_url + "/popular_movies";
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

keyExtractor =(item,index)=>{
  index.toString()
}
renderItem =({item,index})=> {
return <View style = {styles.cardContainer}>
<Image source = {{uri: item.poster_link}} style = {styles.posterImage}/>
<View style = {styles.movieTitleContainer}>
  <Text style = {styles.title}>
    {item.original_title}
  </Text>
  <View style = {{flexDirection: "row"}}>
    <Text style = {styles.subtitle}>
      {item.duration} mim
    </Text>
    <Star style = {styles.starStyle} score = {item.rating}></Star>
  </View>
</View>
</View>
}

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1 }}
        >
          {/*Adicione o componente FlatList para mostrar os dados dos filmes populares abaixo*/}
          <FlatList data = {this.state.data} keyExtractor = {this.keyExtractor} renderItem = {this.renderItem}/>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    borderRadius: RFValue(10),
    height: RFValue(200),
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(15),
  },
  posterImage: {
    flex: 1,
    borderRadius: RFValue(10),
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  subtitle: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "#3c8ed9",
    fontFamily: "monospace",
    marginVertical: RFValue(2),
  },
  movieTitleContainer: {
    position: "absolute",
    backgroundColor: "white",
    width:RFValue(250),
    padding: RFValue(10),
    bottom: RFValue(10),
    left: RFValue(10),
    borderRadius: RFValue(10),
    borderWidth:RFValue(2),
    borderColor:"#3c8ed9"
  },
  starStyle: {
    width: RFValue(75),
    height: RFValue(15),
  }
});
