import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  requireNativeComponent,
} from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import JDSs from "../services/jds.model";

// Props pour récupérer un jeu de société
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface JDSsItemProps extends NavigationProps {
  jds: JDSs;
}

const getImage = (name) => {
  switch (name) {
    case "Mysterium":
      return require("../assets/jds/Mysterium.png");
    case "7 wonders":
      return require("../assets/jds/7-wonders.jpg");
    case "Puissance 4":
      return require("../assets/jds/puissance-4.jpg");
    case "Dixit":
      return require("../assets/jds/dixit.jpg");
    case "Catan":
      return require("../assets/jds/catan.jpg");
    default:
      return require("../assets/no-pic.png");
  }
};

export default class JDSItem extends Component<JDSsItemProps> {
  render() {
    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
    const { jds, navigation } = this.props;
    let path = `../assets/${jds.nom}.png`;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            // on navigue vers la page avec le nom "JDS" qui est en fait JDSScreen (cf app-stacks.js)
            navigation.navigate("JDS", {
              jdsId: jds.id,
            });
          }}
        >
          {/* Pour l'instant carré gris pour l'image mais à terme en récupérer d'une API ? */}
          <Image style={styles.image} source={getImage(jds.nom)} />
          <Text style={styles.text}>{jds.nom}</Text>
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
    color: "#98473E",
  },
  image: {
    height: 130,
    width: 130,
  },
});
