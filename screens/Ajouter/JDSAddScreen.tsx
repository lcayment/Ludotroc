import React, { Component, useCallback } from "react";
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
interface JDSAddScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "JDSAdd">;
}

// State de la sous-page PuzzleScreen avec les puzzles
interface JDSAddScreenState {
  jdsId: number;
  // isLoading: boolean;
}

export default class JDSAddScreen extends Component<
  JDSAddScreenProps,
  JDSAddScreenState
> {
  // Initialisation des states
  state: JDSAddScreenState = {
    // isLoading: true,
    jdsId: null,
  };

  componentDidMount() {
    this.props.navigation.setOptions({ title: "Ajouter un jeu de société" });
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
            <Text style={styles.title}>Ajout JDS</Text>
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
