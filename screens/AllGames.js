import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Searchbar } from "react-native-paper";
import axios from "axios";

export default function AllGames({ navigation }) {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const options = {
    method: "GET",
    url: `https://api.rawg.io/api/games`,
    params: {
      search: `${search}`,
      key: "7e7b164f9ee54364a97a3f6bbca89f6f",
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setResults(response.data.results);
        console.log("hello", response.data.results);
        console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  function searching() {
    axios
      .request(options)
      .then(function (response) {
        setResults(response.data.results);
        console.log("hello", response.data.results);
        console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }
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
          marginTop: 60,
          marginLeft: 40,
          fontSize: 40,
          fontWeight: "bold",
          color: "white",
        }}
      >
        Games
      </Text>
      <View style={{ paddingTop: 40 }}>
        <Searchbar
          style={{
            borderRadius: 25,
            marginHorizontal: 20,
            marginTop: 100,
            width: "90%",
            backgroundColor: "rgb(236,236,236)",
          }}
          value={search}
          onChangeText={(text) => {
            setSearch(text);
          }}
          onSubmitEditing={() => {
            searching();
          }}
          placeholder={"search"}
        />
      </View>
      <View style={{ margin: 25 }}>
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
                source={{ uri: `${item.background_image}` }}
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
                  source={{ uri: `${item.background_image}` }}
                  blurRadius={30}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: "white",
                    fontSize: 20,
                    marginLeft: 15,
                    marginTop: 15,
                    fontWeight: "bold",
                  }}
                >
                  {item.name}
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
                    navigation.navigate("Details", { item });
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
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
