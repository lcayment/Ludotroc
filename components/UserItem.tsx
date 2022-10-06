import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import User from "../services/user.model";

// Props pour récupérer un utilisateur
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface UserItemProps extends NavigationProps {
  user: User;
}

const getImage = (name) => {
  switch (name) {
    case "Chris33000":
      return require("../assets/user/Chris33000.png");
    case "KR":
      return require("../assets/user/KR.png");
    case "Lucie":
      return require("../assets/user/Lucie.png");
    case "LudoJeux":
      return require("../assets/user/LudoJeux.png");
    case "Milo":
      return require("../assets/user/Milo.png");
    case "Pat22":
      return require("../assets/user/Pat22.png");
    default:
      return require("../assets/no-pic.png");
  }
};

export default class UserItem extends Component<UserItemProps> {
  render() {
    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
    const { user, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            // on navigue vers la page avec le nom "User" qui est en fait SearchScreen (cf app-stacks.js)
            navigation.navigate("User", {
              userId: user.id,
            });
          }}
        >
          {/* Pour l'instant carré gris pour l'image mais à terme en récupérer d'une API ? */}
          <Image style={styles.image} source={getImage(user.pseudo)} />
          <Text style={styles.text}>{user.pseudo}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "#50668F",
  },
  image: {
    height: 130,
    width: 130,
  },
});
