import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { NavigationProps } from "../../navigation/app-stacks";

import Transaction from "../../services/transaction.model";
import User from "../../services/user.model";

import transactiondbapiService from "../../services/transactiondbapi.service";
import userdbapiService from "../../services/userdbapi.service";

import Messages from "../../components/Messages";

interface MessagesScreenState {
  transaction: Array<Transaction>;
  user: Array<User>;
}

export default class MessagesScreen extends Component<
  NavigationProps,
  MessagesScreenState
> {
  // On initialise avec des tableaux vides
  state: MessagesScreenState = {
    transaction: [],
    user: [],
  };

  // Récupération de toutes les transactions
  loadTransactions = () => {
    transactiondbapiService.getAll().then((transaction: Array<Transaction>) => {
      this.setState({ transaction });
    });
  };

  // Récupération de tous les utilisateurs
  loadUsers = () => {
    userdbapiService.getAll().then((user: Array<User>) => {
      this.setState({ user });
    });
  };

  componentDidMount() {
    this.loadTransactions();
    this.loadUsers();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Messages
            transactions={this.state.transaction}
            users={this.state.user}
            navigation={this.props.navigation}
          ></Messages>
        </View>
      </ScrollView>
    );
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
