import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";

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
  // user: User;
  // jds: Array<JDS>;
  // puzzle: Array<Puzzle>;
}

export default class ProfilScreen extends Component<
  NavigationProps,
  ProfilScreenState
> {
  // Initialisation des states
  state: ProfilScreenState = {
    // user: null,
    // jds: [],
    // puzzle: [],
  };

  // Récupération de tous les puzzles
  // loadPuzzles = () => {
  //   puzzledbapiService.getAll().then((puzzle: Array<Puzzle>) => {
  //     this.setState({ puzzle });
  //   });
  // };

  // // Récupération de tous les JDSs
  // loadJDSs = () => {
  //   // Load one user
  //   jdsdbapiService.getAll().then((jds: Array<JDS>) => {
  //     this.setState({ jds });
  //   });
  // };

  // Récupération d'un utilisateur
  // Note : nous n'avons pas de système d'authentification donc nous avons choisi aléatoirement
  // l'utilisateur avec l'ID 349 comme étant notre utilisateur de référence
  // loadUser = () => {
  //   // Load one user
  //   userdbapiService.findUserById(1).then((user) => {
  //     this.setState({ user });
  //   });
  // };

  componentDidMount() {
    // this.loadUser();
    // this.loadJDSs();
    // this.loadPuzzles();
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Appel du composant "Profil" */}
        <Text style={styles.title}>Je souhaite proposer un </Text>
        <View>
          <Pressable
            style={styles.buttonPuzzle}
            onPress={() => this.props.navigation.navigate("PuzzleAdd")}
          >
            <Text style={styles.text}>Puzzle</Text>
          </Pressable>
          <Pressable
            style={styles.buttonJDS}
            onPress={() => this.props.navigation.navigate("JDSAdd")}
          >
            <Text style={styles.text}>Jeu de société</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

//jds : color="#98473E"
//puzzle : color="#49266F"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    textAlign: "center",
    marginVertical: 8,
  },
  buttonPuzzle: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#49266F",
    marginTop: 15,
  },
  buttonJDS: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#98473E",
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
