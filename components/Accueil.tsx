import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import JDSs from "../services/jds.model";
import Puzzles from "../services/puzzle.model";

import JDSItem from "./JDSItem";
import PuzzleItem from "./PuzzleItem";

// Props de la page Accueil pour récupérer les puzzles et les JDS
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface AccueilProps extends NavigationProps {
  jdss: Array<JDSs>;
  puzzles: Array<Puzzles>;
}

export default class Accueil extends Component<AccueilProps> {
  render() {
    // si la taille du tableau du puzzle et des JDS est inférieur à zéro on affiche "Pas de puzzle ni de jeu de société"
    if (this.props.jdss?.length > 0 && this.props.puzzles?.length > 0)
      return (
        <View style={styles.container}>
          <View style={styles.puzzle}>
            {/* FlatList pour l'affichage des puzzles */}
            <FlatList<Puzzles>
              scrollEnabled={false}
              style={styles.jeuxList}
              data={this.props.puzzles}
              keyExtractor={(puzzle) => puzzle.id.toString()}
              renderItem={({ item }) => {
                if (item.disponibilite) {
                  // on affiche seulement les puzzles disponibles
                  // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
                  return (
                    <PuzzleItem
                      puzzle={item}
                      navigation={this.props.navigation}
                    />
                  );
                }
              }}
            />
            {/* FlatList pour l'affichage des jds */}
            <FlatList<JDSs>
              scrollEnabled={false}
              style={styles.jeuxList}
              data={this.props.jdss}
              keyExtractor={(jds) => jds.id.toString()}
              renderItem={({ item }) => {
                if (item.disponibilite) {
                  // on affiche seulement les puzzles disponibles
                  return (
                    <JDSItem jds={item} navigation={this.props.navigation} />
                  );
                }
              }}
            />
          </View>
        </View>
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas de puzzle ni de jeu de société</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
    width: "100%",
  },
  text: {
    fontSize: 30,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  puzzle: {
    margin: 5,
    flexDirection: "row",
  },
  jeuxList: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
