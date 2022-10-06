import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import { NavigationProps } from "../../navigation/app-stacks";

import User from "../../services/user.model";
import JDS from "../../services/jds.model";
import Puzzle from "../../services/puzzle.model";

import userdbapiService from "../../services/userdbapi.service";
import jdsdbapiService from "../../services/jdsdbapi.service";
import puzzledbapiService from "../../services/puzzledbapi.service";

import Profil from "../../components/Profil";

// State de la page Profil avec un utilisateur, les puzzles et les jds
interface ProfilScreenState {
  user: User;
  jds: Array<JDS>;
  puzzle: Array<Puzzle>;
}

export default class ProfilScreen extends Component<
  NavigationProps,
  ProfilScreenState
> {
  // Initialisation des states
  state: ProfilScreenState = {
    user: null,
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
    // Load one user
    jdsdbapiService.getAll().then((jds: Array<JDS>) => {
      this.setState({ jds });
    });
  };

  // Récupération d'un utilisateur
  // Note : nous n'avons pas de système d'authentification donc nous avons choisi aléatoirement
  // l'utilisateur avec l'ID 349 comme étant notre utilisateur de référence
  loadUser = () => {
    // Load one user
    userdbapiService.findUserById(6).then((user) => {
      this.setState({ user });
    });
  };

  componentDidMount() {
    this.loadUser();
    this.loadJDSs();
    this.loadPuzzles();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Appel du composant "Profil" */}
        <Profil
          profilUser={this.state.user}
          jdssUser={this.state.jds}
          puzzleUser={this.state.puzzle}
          navigation={this.props.navigation}
        ></Profil>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
