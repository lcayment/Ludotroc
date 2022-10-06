import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { RouteProp } from "@react-navigation/core";
import {
  RootStackParamList,
  NavigationProps,
} from "../../navigation/app-stacks";

import Puzzle from "../../services/puzzle.model";

import puzzledbapiService from "../../services/puzzledbapi.service";

// Props pour la navigation
interface PuzzleScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Puzzle">;
}

// State de la sous-page PuzzleScreen avec les puzzles
interface PuzzleScreenState {
  puzzle: Puzzle;
  isLoading: boolean;
}

const getImage = (name) => {
  switch (name) {
    case "Amsterdam":
      return require("../../assets/puzzle/amsterdam.jpg");
    case "Le Roi Lion":
      return require("../../assets/puzzle/le-roi-lion.jpg");
    case "Titeuf":
      return require("../../assets/puzzle/titeuf.jpg");
    case "Arthur":
      return require("../../assets/puzzle/arthur.jpg");
    default:
      return require("../../assets/no-pic.png");
  }
};

export default class PuzzleScreen extends Component<
  PuzzleScreenProps,
  PuzzleScreenState
> {
  // Initialisation des states
  state: PuzzleScreenState = {
    isLoading: true,
    puzzle: null,
  };

  componentDidMount() {
    const puzzleId = this.props.route.params.puzzleId;

    // On récupère le puzzle sur lequel on a cliqué grâce à "puzzleId"
    puzzledbapiService.findPuzzleById(puzzleId).then((puzzle: Puzzle) => {
      this.props.navigation.setOptions({ title: "Puzzle" });

      this.setState({ puzzle, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { puzzle } = this.state;

      // La variable disponibilite est un boolean, on gère ici l'affichage en fonction de sa valeur
      var dispo = "";
      if (puzzle.disponibilite == false) {
        dispo = "Non disponible";
      } else {
        dispo = "Disponible";
      }

      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.title}>Nom du puzzle :</Text>
              <Text style={styles.text}> {puzzle.nom}</Text>
            </View>

            <View style={styles.imageView}>
              {/* Pour l'instant carré gris pour l'image mais à terme en récupérer d'une API ? */}
              <Image style={styles.image} source={getImage(puzzle.nom)} />
            </View>

            <View style={styles.titleView}>
              <Text style={styles.title}>Propriétaire du puzzle :</Text>
              <Text style={styles.text}>{puzzle.proprietaire}</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.title}>Nombre de pièces : </Text>
              <Text style={styles.text}>{puzzle.nbPieces} pièces</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.title}>Disponibilité :</Text>
              <Text style={styles.text}> {dispo}</Text>
            </View>

            <Text style={styles.title}>Description :</Text>
            <Text style={styles.text}>{puzzle.description}</Text>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 15,
    marginTop: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  titleView: {
    flexDirection: "row",
  },
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
