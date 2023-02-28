// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Button,
//   Image,
//   StatusBar,
//   TextInput,
//   ImageBackground,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";

// export default function LoginScreen() {
//   return (
//     <View style={styles.container}>
//       <ImageBackground
//         style={{ flex: 1 }}
//         source={require("../assets/background.jpeg")}
//       >
//         <View style={{ marginBottom: 400 }}></View>
//         <TouchableOpacity style={styles.signup}>
//           <Text style={{ color: "white" }}>Signup</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={{}}>Register</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#ff3131",
//     flex: 1,
//   },
//   button: {
//     backgroundColor: "white",
//     justifyContent: "center",
//     margin: 10,
//     alignSelf: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     borderColor: "black",
//     borderWidth: 3,
//     width: 200,
//     height: 50,
//   },
//   signup: {
//     backgroundColor: "black",
//     justifyContent: "center",
//     alignSelf: "center",
//     alignItems: "center",
//     borderRadius: 25,
//     width: 200,
//     height: 50,
//   },
// });
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { ImageBackground } from "react-native-web";
import {
  collection,
  setDoc,
  getDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./Firebase";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with", user.email);
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    const session = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("MyTabs");
      }
    });
    return session;
  }, []);

  return (
    <View style={styles.container} behavior="padding">
      <Image
        style={{ position: "absolute", flex: 1, height: "100%", width: "100%" }}
        source={require("../assets/images1.jpg")}
      />
      <Image style={styles.logo} source={require("../assets/icon1.png")} />
      <Text style={styles.loginText}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={{ position: "absolute", marginLeft: 250, marginTop: 12 }}
        >
          <Text style={[styles.showPasswordText]}>
            {showPassword ? "HIDE" : "SHOW"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={{ color: "white" }}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.signUpButtonContainer}
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.signUpButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 100,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.4,
    shadowOffset: { height: 7, width: -7 },
  },
  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 100,
    position: "relative",
    marginTop: 20,
    color: "rgb(230,87,70)",
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    marginBottom: 20,
    color: "#222",
    paddingHorizontal: 10,
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2 },
    position: "relative",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignItems: "stretch",
  },
  showPasswordText: {
    color: "#e74c3c",
    position: "absolute",
    width: 50,
  },
  buttonContainer: {
    backgroundColor: "#e74c3c",
    marginTop: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: "30%",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signUpButtonContainer: {
    borderBottomColor: "#e74c3c",
    borderBottomWidth: 1,
  },
  signUpButtonText: {
    color: "#e74c3c",
  },
});

export default LoginPage;
