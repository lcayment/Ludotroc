import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { NavigationProps } from "../navigation/app-stacks";
import User from "../services/user.model";
import UserItem from "./UserItem";

// Props pour récupérer l'ensemble des utilisateurs
// Note : les props de navigation étendues sont bien là même si elles ne sont pas visibles
interface UserListProps extends NavigationProps {
  users: Array<User>;
}

export default class UserList extends Component<UserListProps, {}> {
  render() {
    // si il n'y a pas d'utilisateurs on affiche "Pas d'utilisateurs"
    if (this.props.users?.length > 0)
      return (
        <FlatList<User>
          horizontal={true}
          style={styles.userList}
          data={this.props.users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => {
            return (
              // navigation correspond aux props de navigation obtenues grâce à "extends NavigationsProps"
              <UserItem user={item} navigation={this.props.navigation} />
            );
          }}
        />
      );
    else
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Pas d'utilisateurs</Text>
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
