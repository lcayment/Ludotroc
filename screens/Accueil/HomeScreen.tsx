import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { NavigationProps } from "../../navigation/app-stacks";

import JDS from "../../services/jds.model";
import Puzzle from "../../services/puzzle.model";

import jdsdbapiService from "../../services/jdsdbapi.service";
import puzzledbapiService from "../../services/puzzledbapi.service";

import Accueil from "../../components/Accueil";

// State de la page Accueil avec les puzzles et les JDS
interface HomeScreenState {
  jds: Array<JDS>;
  puzzle: Array<Puzzle>;
}

export default class HomeScreen extends Component<
  NavigationProps,
  HomeScreenState
> {
  // On initialise avec des tableaux vides
  state: HomeScreenState = {
    jds: [],
    puzzle: [],
  };

  // Récupération de tous les puzzles
  loadPuzzles = () => {
    puzzledbapiService.getAll().then((puzzle: Array<Puzzle>) => {
      this.setState({ puzzle });
    });
  };

  // Récupération de tous les JDSs
  loadJDSs = () => {
    jdsdbapiService.getAll().then((jds: Array<JDS>) => {
      this.setState({ jds });
    });
  };

  componentDidMount() {
    this.loadJDSs();
    this.loadPuzzles();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {/* Appel du composant "Accueil" */}
          <Accueil
            jdss={this.state.jds}
            puzzles={this.state.puzzle}
            navigation={this.props.navigation}
          ></Accueil>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
});
