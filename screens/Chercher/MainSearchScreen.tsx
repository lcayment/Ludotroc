import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";

import { NavigationProps } from "../../navigation/app-stacks";

import User from "../../services/user.model";
import JDS from "../../services/jds.model";
import Puzzle from "../../services/puzzle.model";

import jdsdbapiService from "../../services/jdsdbapi.service";
import puzzledbapiService from "../../services/puzzledbapi.service";
import userdbapiService from "../../services/userdbapi.service";

import Input from "../../components/Input";
import UserList from "../../components/UserList";
import JDSList from "../../components/JDSList";
import PuzzleList from "../../components/PuzzleList";


// State de la page Accueil avec les utilisateurs
interface MainSearchScreenState {
  users: Array<User>;
  jds: Array<JDS>;
  puzzle: Array<Puzzle>;
}

export default class MainSearchScreen extends Component<
  NavigationProps,
  MainSearchScreenState
> {
  // On initialise avec un tableau vide
  state: MainSearchScreenState = {
    users: [],
    jds: [],
    puzzle: [],
  };

  // Récupération de tous les utilisateurs
  loadUsers = () => {
    userdbapiService.getAll().then((users: Array<User>) => {
      this.setState({ users });
    });
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
    this.loadUsers();
    this.loadJDSs();
    this.loadPuzzles();
  }

 

  /* Pas encore utilisé mai ca ne saurait tarder */
  onInputUser = (text: string) => {
    userdbapiService.searchUsersByName(text).then((users: Array<User>) => {
      this.setState({ users });
    });
  };

  /* Pas encore utilisé mai ca ne saurait tarder */
  onInputPuzzle = (text: string) => {
    puzzledbapiService
      .searchPuzzlesByName(text)
      .then((puzzle: Array<Puzzle>) => {
        this.setState({ puzzle });
      });
  };

  /* Pas encore utilisé mai ca ne saurait tarder */
  onInputJDS = (text: string) => {
    jdsdbapiService.searchJDSsByName(text).then((jds: Array<JDS>) => {
      this.setState({ jds });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> UTILISATEURS </Text>
        <Input
          placeholder="Entrez un nom d'utilisateur"
          onSubmitEditing={this.onInputUser}
        />
        <UserList users={this.state.users} navigation={this.props.navigation} />
        <Text style={styles.title}> JEUX DE SOCIETE </Text>
        <Input
          placeholder="Entrez un nom de jeu de société"
          onSubmitEditing={this.onInputJDS}
        />
        <JDSList jdss={this.state.jds} navigation={this.props.navigation} />
        <Text style={styles.title}> PUZZLES </Text>
        <Input
          placeholder="Entrez un nom de puzzle"
          onSubmitEditing={this.onInputPuzzle}
        />
        <PuzzleList
          puzzles={this.state.puzzle}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
});
