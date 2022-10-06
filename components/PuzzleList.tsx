import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import Puzzle from "../services/puzzle.model";
import PuzzleItem from "./PuzzleItem";

// Props pour récupérer l'ensemble des utilisateurs
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface PuzzleListProps extends NavigationProps {
  puzzles: Array<Puzzle>;
}

export default class PuzzleList extends Component<PuzzleListProps, {}> {
  render() {
    // si il n'y a pas d'utilisateurs on affiche "Pas d'utilisateurs"
    if (this.props.puzzles?.length > 0)
      return (
        <FlatList<Puzzle>
          horizontal={true}
          style={styles.puzzleList}
          data={this.props.puzzles}
          keyExtractor={(puzzle) => puzzle.id.toString()}
          renderItem={({ item }) => {
            return (
              // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
              <PuzzleItem puzzle={item} navigation={this.props.navigation} />
            );
          }}
        />
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas de puzzle</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  puzzleList: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});
