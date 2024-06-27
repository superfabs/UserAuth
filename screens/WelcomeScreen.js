import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState("");
  //1- the idea is to fetch the message from the backend and display it on the screen for the authenticated user only
  //2- so i adjust the rules of the database to be :
  //   "rules": {
  //     ".read": "auth.uid != null",
  //     ".write": "auth.uid != null"
  //   }
  // }
  //3- i added "?auth=" + token to the url to make sure that the token is sent with the request

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    axios
      .get("https://rn-course-udemy-default-rtdb.firebaseio.com/message.json?auth=" + token)
      .then((response) => {
        //you can't use await here bc useEffect can't be an async function thats why we use .then
        setFetchedMessage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
