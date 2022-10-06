import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Puzzle from "../services/puzzle.model";

// Props pour récupérer un puzzle
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface PuzzleItemProps extends NavigationProps {
  puzzle: Puzzle;
}

const getImage = (name) => {
  switch (name) {
    case "Amsterdam":
      return require("../assets/puzzle/amsterdam.jpg");
    case "Le Roi Lion":
      return require("../assets/puzzle/le-roi-lion.jpg");
    case "Titeuf":
      return require("../assets/puzzle/titeuf.jpg");
    case "Arthur":
      return require("../assets/puzzle/arthur.jpg");
    default:
      return require("../assets/no-pic.png");
  }
};

export default class PuzzleItem extends Component<PuzzleItemProps> {
  render() {
    // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
    const { puzzle, navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            // on navigue vers la page avec le nom "Puzzle" qui est en fait PuzzleScreen (cf app-stacks.js)
            navigation.navigate("Puzzle", {
              puzzleId: puzzle.id,
            });
          }}
        >
          {/* Pour l'instant carré gris pour l'image mais à terme en récupérer d'une API ? */}
          <Image style={styles.image} source={getImage(puzzle.nom)} />
          <Text style={styles.text}> {puzzle.nom} </Text>
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
    color: "#49266F",
  },
  image: {
    height: 130,
    width: 130,
  },
});
