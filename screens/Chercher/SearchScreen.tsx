import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";

import { RouteProp } from "@react-navigation/core";
import {
  RootStackParamList,
  NavigationProps,
} from "../../navigation/app-stacks";

import User from "../../services/user.model";
import JDS from "../../services/jds.model";
import Puzzle from "../../services/puzzle.model";

import userdbapiService from "../../services/userdbapi.service";
import jdsdbapiService from "../../services/jdsdbapi.service";
import puzzledbapiService from "../../services/puzzledbapi.service";

import { getUserPicture } from "../../services/getUserPicture";

import Profil from "../../components/Profil";
// Props pour la navigation
interface SearchScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "User">;
}

// State de la sous-page SearchScreen avec les utilisateurs
interface SearchScreenState {
  user: User;
  jds: Array<JDS>;
  puzzle: Array<Puzzle>;
  isLoading: boolean;
  imagePath: string;
}

const getImage = (name) => {
  switch (name) {
    case "Chris33000":
      return require("../../assets/user/Chris33000.png");
    case "KR":
      return require("../../assets/user/KR.png");
    case "Lucie":
      return require("../../assets/user/Lucie.png");
    case "LudoJeux":
      return require("../../assets/user/LudoJeux.png");
    case "Milo":
      return require("../../assets/user/Milo.png");
    case "Pat22":
      return require("../../assets/user/Pat22.png");
    default:
      return require("../../assets/no-pic.png");
  }
};

export default class SearchScreen extends Component<
  SearchScreenProps,
  SearchScreenState
> {
  // Initialisation des states
  state: SearchScreenState = {
    isLoading: true,
    user: null,
    jds: [],
    puzzle: [],
    imagePath: "",
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

  componentDidMount() {
    const userId = this.props.route.params.userId;

    // On récupère l'utilisateur sur lequel on a cliqué grâce à "userId"
    userdbapiService.findUserById(userId).then((user: User) => {
      this.props.navigation.setOptions({ title: user.pseudo });
      this.setState({ user, isLoading: false });
    });
    this.loadJDSs();
    this.loadPuzzles();
  }

  componentDidUpdate() {}

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { user } = this.state;
      return (
        <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: { height: 75, width: 75 },
});
