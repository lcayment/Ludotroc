import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { NavigationProps } from "../navigation/app-stacks";

import ProfilUser from "../services/user.model";
import JDSsUser from "../services/jds.model";
import PuzzleUser from "../services/puzzle.model";

import Ionicons from "react-native-vector-icons/Ionicons";

import JDSItem from "./JDSItem";
import PuzzleItem from "./PuzzleItem";

// Props pour récupérer l'utilisateur et les jeux
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface ProfilUserProps extends NavigationProps {
  profilUser: ProfilUser;
  jdssUser: Array<JDSsUser>;
  puzzleUser: Array<PuzzleUser>;
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

export default class ProfilUserItem extends Component<ProfilUserProps> {
  render() {
    const { profilUser } = this.props;
    if (this.props.profilUser?.pseudo != null)
      // si le nom d'utilisateur est nul (donc n'existe pas dans l'API) on affiche "Pas d'utilisateur"
      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.infoUser}>
              <Image
                style={styles.image}
                source={getImage(profilUser.pseudo)}
              />

              <Text style={styles.text}>
                {profilUser.pseudo} - {profilUser.localisation}
              </Text>
            </View>

            <View style={styles.puzzle}>
              <View style={[styles.titleView, styles.puzzlecolor]}>
                <Ionicons color="white" name={"ios-image-outline"} size={35} />
                <Text style={styles.title}>Mes puzzles</Text>
                <Ionicons color="white" name={"ios-image-outline"} size={35} />
              </View>
              {/* FlatList pour l'affichage des puzzles */}
              <FlatList<PuzzleUser>
                horizontal={true}
                style={styles.jeuxList}
                data={this.props.puzzleUser}
                keyExtractor={(puzzle) => puzzle.id.toString()}
                renderItem={({ item }) => {
                  return (
                    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
                    <PuzzleItem
                      puzzle={item}
                      navigation={this.props.navigation}
                    />
                  );
                }}
              />
            </View>
            <View style={styles.puzzle}>
              <View style={[styles.titleView, styles.jdscolor]}>
                <Ionicons color="white" name={"ios-map-outline"} size={35} />
                <Text style={styles.title}>Mes jeux de société</Text>
                <Ionicons color="white" name={"ios-map-outline"} size={35} />
              </View>
              {/* FlatList pour l'affichage des jds */}
              <FlatList<JDSsUser>
                horizontal={true}
                style={styles.jeuxList}
                data={this.props.jdssUser}
                keyExtractor={(jds) => jds.id.toString()}
                renderItem={({ item }) => {
                  return (
                    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
                    <JDSItem jds={item} navigation={this.props.navigation} />
                  );
                }}
              />
            </View>

            {/* Toute la partie qui suit est écrite en brute donc à voir ce qu'on en fait */}
            <View style={styles.puzzle}>
              <View style={[styles.titleView, styles.aviscolor]}>
                <Ionicons color="white" name={"ios-star-outline"} size={35} />
                <Text style={styles.title}>Mes avis</Text>
                <Ionicons color="white" name={"ios-star-outline"} size={35} />
              </View>
              <Text style={styles.text}> Mysterium : 5/5 </Text>
              <Text style={styles.text}> Puissance 4 : 3/5 </Text>
            </View>

            <View style={styles.puzzle}>
              <View style={[styles.titleView, styles.favoriscolor]}>
                <Ionicons color="white" name={"ios-heart-outline"} size={35} />
                <Text style={styles.title}>Mes favoris</Text>
                <Ionicons color="white" name={"ios-heart-outline"} size={35} />
              </View>
              <Text style={styles.text}> Mysterium </Text>
            </View>

            <View style={styles.puzzle}>
              <View style={[styles.titleView, styles.wishlistcolor]}>
                <Ionicons
                  color="white"
                  name={"ios-color-wand-outline"}
                  size={35}
                />
                <Text style={styles.title}>Ma wishlist</Text>
                <Ionicons
                  color="white"
                  name={"ios-color-wand-outline"}
                  size={35}
                />
              </View>
              <Text style={styles.text}> Vide </Text>
            </View>
          </View>
        </ScrollView>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas d'utilisateur</Text>
        </View>
      );
  }
}

//jds : color="#98473E"
//puzzle : color="#49266F"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
  },
  puzzlecolor: {
    backgroundColor: "#49266F",
  },
  jdscolor: {
    backgroundColor: "#98473E",
  },
  aviscolor: {
    backgroundColor: "#05668D",
  },
  favoriscolor: {
    backgroundColor: "#9EADC8",
  },
  wishlistcolor: {
    backgroundColor: "#EEC643",
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 6,
    padding: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  image: { height: 75, width: 75 },
  infoUser: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  puzzle: {
    margin: 5,
    display: "flex",
    justifyContent: "space-evenly",
  },
  jeuxList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
