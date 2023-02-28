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

import axios from "axios";

export default function TrendingNews({ navigation }) {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
    url: "https://videogames-news2.p.rapidapi.com/videogames_news/recent",
    headers: {
      "X-RapidAPI-Key": "ac9f22f1a4msh4e7e7c8f95cad9ap10630ejsnf8831475432f",
      "X-RapidAPI-Host": "videogames-news2.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setResults(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return (
    <View>
      <Image
        style={{
          position: "absolute",
          height: 2000,
          width: "100%",
        }}
        source={require("../assets/images1.jpg")}
      />
      <Text
        style={{
          position: "absolute",
          marginTop: 70,
          marginLeft: 40,
          fontSize: 40,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Trending News
      </Text>

      <View style={{ margin: 25, marginTop: 130 }}>
        <FlatList
          data={results}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          renderItem={({ item }) => (
            <View
              style={{
                marginTop: 20,
                height: 250,
                width: 180,
                marginRight: 20,
                backgroundColor: "rgb(180,20,56)",
                borderRadius: 50,
                shadowColor: "black",
                shadowRadius: 10,
                shadowOpacity: 0.4,
                shadowOffset: { height: 5 },
              }}
            >
              <Image
                style={{
                  position: "absolute",
                  height: 180,
                  width: 180,
                  borderRadius: 50,
                }}
                source={{ uri: `${item.image}` }}
              />
              <View
                style={{
                  marginTop: 140,
                  backgroundColor: "rgb(140, 0, 0)",
                  height: 115,
                  borderBottomEndRadius: 50,
                  borderBottomStartRadius: 50,
                }}
              >
                <Image
                  style={{
                    position: "absolute",
                    height: 115,
                    width: 180,
                    marginRight: 20,
                    borderBottomRightRadius: 50,
                    opacity: 0.4,
                    borderBottomLeftRadius: 50,
                  }}
                  source={{ uri: `${item.image}` }}
                  blurRadius={30}
                />
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    fontSize: 13,
                    marginLeft: 15,
                    marginTop: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    marginRight: 20,
                    marginTop: 20,
                    height: 30,
                    width: 80,
                    borderRadius: 50,
                    backgroundColor: "white",
                  }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate("NewsDetails", { item });
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      marginTop: 6,
                      fontWeight: "bold",
                      color: "rgb(200,0,0)",
                    }}
                  >
                    Read More
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.date}
        />
      </View>
    </View>
  );
}
