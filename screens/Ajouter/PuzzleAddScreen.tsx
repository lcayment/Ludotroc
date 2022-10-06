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
interface PuzzleAddScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "PuzzleAdd">;
}

// State de la sous-page PuzzleScreen avec les puzzles
interface PuzzleAddScreenState {
  // puzzle: Puzzle;
  // isLoading: boolean;
}

export default class PuzzleAddScreen extends Component<
  PuzzleAddScreenProps,
  PuzzleAddScreenState
> {
  // Initialisation des states
  state: PuzzleAddScreenState = {
    // isLoading: true,
    // puzzle: null,
  };

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Ajouter un puzzle" });
  }

  render() {
    // if (this.state.isLoading) return <ActivityIndicator />;
    // else {
    //   const { puzzle } = this.state;

    //   // La variable disponibilite est un boolean, on gère ici l'affichage en fonction de sa valeur
    //   var dispo = "";
    //   if (puzzle.disponibilite == false) {
    //     dispo = "Non disponible";
    //   } else {
    //     dispo = "Disponible";
    //   }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.title}>Ajout Puzzle</Text>
            {/* <Text style={styles.text}> {puzzle.nom}</Text> */}
          </View>
        </View>
      </ScrollView>
    );
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
