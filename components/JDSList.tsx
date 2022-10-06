import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import JDS from "../services/jds.model";
import JDSItem from "./JDSItem";

// Props pour récupérer l'ensemble des utilisateurs
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface JDSListProps extends NavigationProps {
  jdss: Array<JDS>;
}

export default class JDSList extends Component<JDSListProps, {}> {
  render() {
    // si il n'y a pas d'utilisateurs on affiche "Pas d'utilisateurs"
    if (this.props.jdss?.length > 0)
      return (
        <FlatList<JDS>
          horizontal={true}
          style={styles.userList}
          data={this.props.jdss}
          keyExtractor={(jds) => jds.id.toString()}
          renderItem={({ item }) => {
            return (
              // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
              <JDSItem jds={item} navigation={this.props.navigation} />
            );
          }}
        />
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas de jeux de société</Text>
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
  userList: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
  },
});
