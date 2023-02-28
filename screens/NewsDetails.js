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
  Linking,
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

export default function NewsDetails({ route, navigation }) {
  // const item = navigation.getParam("data");
  const { item } = route.params;

  return (
    <View style={{ backgroundColor: "rgb(250,250,250)", flex: 1 }}>
      <Image style={{ height: 320 }} source={{ uri: `${item.image}` }}></Image>

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
          marginTop: 300,
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
        <Text
          style={{
            marginTop: 35,
            marginLeft: 25,
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 22,

            padding: 20,
            paddingTop: 30,
            color: "white",
          }}
        >
          News: Details
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
          {item.description}
          {"  "}
        </Text>

        <TouchableOpacity
          style={{
            alignSelf: "flex-start",
            position: "absolute",

            marginTop: 500,
            height: 50,
            width: 170,
            borderRadius: 50,
            backgroundColor: "white",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
          }}
          onPress={() => {
            Linking.openURL(item.link);
          }}
        >
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Read Article
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
