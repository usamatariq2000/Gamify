import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  StatusBar,
  FlatList,
  TextInput,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useNavigation,
  route,
  navigation,
  NavigationContainer,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar, Searchbar } from "react-native-paper";
import axios from "axios";

export default function Details({ route, navigation }) {
  // const item = navigation.getParam("data");
  const { item } = route.params;
  const [results, setResults] = useState([]);

  const options = {
    method: "GET",
    url: `https://api.rawg.io/api/games/${item.id}`,
    params: {
      key: "7e7b164f9ee54364a97a3f6bbca89f6f",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setResults(response.data);
        console.log("hello", response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <View style={{ backgroundColor: "rgb(250,250,250)", flex: 1 }}>
      <Image
        style={{ height: 400 }}
        source={{ uri: `${item.background_image}` }}
      ></Image>

      <View
        style={{
          height: 150,
          marginTop: 200,
          opacity: 0.5,
          width: "100%",
          backgroundColor: "black",
          position: "absolute",
        }}
      ></View>

      <Text
        numberOfLines={1}
        style={{
          position: "absolute",
          marginTop: 240,
          marginLeft: 25,
          fontSize: 40,
          fontWeight: "bold",
          color: "white",
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          position: "absolute",
          marginTop: 290,
          marginLeft: 25,
          fontSize: 25,
          fontWeight: "light",
          color: "white",
        }}
      >
        {item.genres[0]?.name} | {item.genres[1]?.name}
      </Text>
      <TouchableOpacity
        style={{ position: "absolute", marginTop: 45, marginLeft: 25 }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <AntDesign name="back" size={40} color="white" />
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          marginTop: 350,
          height: "100%",
          width: "100%",

          backgroundColor: "white",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <Image
          style={{
            position: "absolute",

            height: 1000,
            width: "100%",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
          source={require("../assets/images1.jpg")}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 30,
            marginTop: 50,
            alignItems: "center",
            borderRadius: 40,
            backgroundColor: "rgb(240,240,240)",
            height: 70,
            width: 370,
          }}
        >
          <Text
            style={{
              marginHorizontal: 12,

              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            ESRB:{item.esrb_rating?.name}
          </Text>
          <Text
            style={{
              marginHorizontal: 14,
              fontWeight: "300",
              marginLeft: 20,
              fontSize: 30,
              opacity: 0.4,
            }}
          >
            |
          </Text>
          <Text
            style={{ marginHorizontal: 25, fontWeight: "bold", fontSize: 15 }}
          >
            Rating: {item?.rating}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            padding: 20,
            paddingTop: 50,
            color: "white",
          }}
        >
          About Game
        </Text>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 15,
            fontWeight: "light",
            color: "white",
          }}
          numberOfLines={10}
        >
          {results.description_raw}
        </Text>
      </View>
    </View>
  );
}
