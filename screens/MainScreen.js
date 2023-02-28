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
  navigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar, Searchbar } from "react-native-paper";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { auth, db } from "./Firebase";
import {
  collection,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";

export default function MainScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const [results1, setResults1] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");

  const options = {
    method: "GET",
    url: `https://api.rawg.io/api/games`,
    params: {
      key: "7e7b164f9ee54364a97a3f6bbca89f6f",
    },
  };

  const options1 = {
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
        setResults(response.data.results);
        console.log("hello", response.data.results);
        console.log(results);
      })
      .catch(function (error) {
        console.error(error);
      });

    axios
      .request(options1)
      .then(function (response1) {
        setResults1(response1.data);
        console.log(response1.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    getDataWithID();
  }, []);

  function getDataWithID() {
    getDocs(
      query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
    )
      .then((docData) => {
        if (docData.docs[0]) {
          setName(docData.docs[0].data().FirstName);
          console.log(docData.docs[0].data().FirstName);
        } else {
          console.log("no such data");
        }
      })
      .catch((error) => alert(error.message));
  }

  function Signout() {
    auth.signOut().then(() => {
      navigation.navigate("LoginScreen");
    });
  }

  function Save(uid, id) {
    setDoc(doc(collection(db, "saves")), {
      uid: uid,
      postId: id,
    })
      .then(() => {
        console.log("data saved");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const DATA = [
    {
      id: "1",
      title: "God Of War",
      image:
        "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
    },
  ];
  return (
    <ScrollView>
      <View style={{ backgroundColor: "rgb(250,250,250)", flex: 1 }}>
        <Image
          style={{
            position: "absolute",

            height: 2000,
            width: "100%",
          }}
          source={require("../assets/images1.jpg")}
        />
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 20,
          }}
        >
          <View style={{ marginBottom: 50 }}>
            <Text
              style={{
                position: "absolute",
                marginTop: 30,
                marginBottom: 20,
                marginLeft: 20,
                fontSize: 35,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Hi {name}!
            </Text>
            <Text
              style={{
                position: "absolute",
                marginTop: 70,
                marginBottom: 20,
                marginLeft: 20,
                fontSize: 20,
                fontWeight: "400",
                color: "white",
              }}
            >
              Welcome to gamer's heaven
            </Text>
            <TouchableOpacity
              onPress={() => {
                Signout();
              }}
            >
              <Avatar.Image
                size={50}
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  marginBottom: 30,
                  alignSelf: "flex-end",
                }}
                source={{
                  uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              marginTop: 20,
              marginLeft: 20,
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
            }}
          >
            TRENDING GAMES
          </Text>

          <FlatList
            data={results}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 20,
                  height: 280,
                  width: 220,
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
                    height: 280,
                    width: 220,
                    borderRadius: 50,
                  }}
                  source={{ uri: `${item.background_image}` }}
                />
                <View
                  style={{
                    marginTop: 165,
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
                      width: 220,
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
                      Save(auth.currentUser.uid, item.id);
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
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-start",
                      position: "absolute",
                      marginLeft: 20,
                      marginTop: 58,
                      height: 30,
                      width: 80,
                      borderRadius: 50,
                      backgroundColor: "white",
                    }}
                    onPress={() => {
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

          <View style={{ marginTop: 40 }}>
            <Text
              style={{
                color: "black",
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 20,
                color: "white",
              }}
            >
              GAME OF THE DAY
            </Text>
            <View
              style={{
                backgroundColor: "white",
                height: 200,
                borderRadius: 35,
                marginTop: 25,
                shadowColor: "black",
                shadowRadius: 10,
                shadowOpacity: 0.2,
                shadowOffset: { height: 5 },
              }}
            >
              <Image
                style={{
                  backgroundColor: "red",
                  height: 150,
                  width: 140,
                  marginHorizontal: 20,
                  marginVertical: 23,
                  borderRadius: 25,
                }}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
                }}
              ></Image>
              <View style={{ position: "absolute", marginLeft: 190 }}>
                <Text
                  style={{ marginTop: 65, fontSize: 30, fontWeight: "bold" }}
                >
                  God of War
                </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 15,
                    color: "rgb(100,100,100)",
                  }}
                >
                  {"  "}
                  Genre: Fighting
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{
              marginTop: 30,
              marginLeft: 20,
              fontSize: 25,
              fontWeight: "bold",
              color: "white",
            }}
          >
            TRENDING
          </Text>
          <FlatList
            data={results1}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item }) => (
              <View
                style={{
                  marginTop: 20,
                  height: 280,
                  width: 220,
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
                    height: 280,
                    width: 220,
                    borderRadius: 50,
                  }}
                  source={{ uri: `${item.image}` }}
                />
                <View
                  style={{
                    marginTop: 165,
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
                      width: 220,
                      marginRight: 20,
                      borderBottomRightRadius: 50,
                      opacity: 0.4,
                      borderBottomLeftRadius: 50,
                    }}
                    source={{ uri: `${item.image}` }}
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
                      Read
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.date}
          />
          <View style={{ height: 120 }}></View>
        </View>
      </View>
    </ScrollView>
  );
}
