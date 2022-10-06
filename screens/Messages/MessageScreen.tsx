import React, { Component } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Input from "../../components/Input";

import { RouteProp } from "@react-navigation/core";
import {
  RootStackParamList,
  NavigationProps,
} from "../../navigation/app-stacks";

import User from "../../services/user.model";
import Transaction from "../../services/transaction.model";

import userdbapiService from "../../services/userdbapi.service";
import transactiondbapiService from "../../services/transactiondbapi.service";

import Moment from "moment";

// Props pour la navigation
interface MessageScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "Message">;
}

// State de la sous-page MessageScreen avec les utilisateurs
interface MessageScreenState {
  user: User;
  transaction: Transaction;
  isLoading: boolean;
}
Moment.locale("fr");

export default class MessageScreen extends Component<
  MessageScreenProps,
  MessageScreenState
> {
  // Initialisation des states
  state: MessageScreenState = {
    isLoading: true,
    user: null,
    transaction: null,
  };

  // onInput = (text: string) => {
  //   cocktaildbapiService
  //     .searchCocktailsByName(text)
  //     .then((cocktails: Array<Cocktail>) => {
  //       this.setState({ cocktails });
  //     });
  // };

  componentDidMount() {
    const transactionId = this.props.route.params.messageId;

    // On récupère la transaction sur laquelle on a cliqué grâce à "messageId"
    transactiondbapiService
      .findTransactionById(transactionId)
      .then((transaction: Transaction) => {
        this.props.navigation.setOptions({
          title: "Transaction",
        });
        this.setState({ transaction, isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { transaction } = this.state;

      return (
        <View style={styles.container}>
          <Text style={styles.instructionsTitle}>
            ID du jeu : {transaction.jeuxId}
          </Text>
          <Text style={styles.instructionsText}>
            ID du receveur : {transaction.receveurId}
          </Text>
          <Text style={styles.instructionsText}>
            Nom du receveur : {this.state.user?.pseudo}
          </Text>
          <Text style={styles.instructionsText}>
            Date de début du prêt :{" "}
            {Moment(transaction.dateDebut).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.instructionsText}>
            Date de fin du prêt :{" "}
            {Moment(transaction.dateFin).format("DD/MM/YYYY")} (à rendre{" "}
            {Moment(transaction.dateFin).fromNow()})
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  instructionsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  instructionsText: {
    fontSize: 20,
    margin: 10,
  },
  titleView: {
    flexDirection: "row",
  },
});
