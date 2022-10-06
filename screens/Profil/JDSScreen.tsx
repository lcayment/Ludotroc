import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { RouteProp } from "@react-navigation/core";
import {
  RootStackParamList,
  NavigationProps,
} from "../../navigation/app-stacks";
import { format } from "date-fns";

import JDS from "../../services/jds.model";

import jdsdbapiService from "../../services/jdsdbapi.service";

import Moment from "moment";

// Props pour la navigation
interface JDSScreenProps extends NavigationProps {
  route: RouteProp<RootStackParamList, "JDS">;
}

// State de la sous-page JDSScreen avec les jds
interface JDSScreenState {
  jds: JDS;
  isLoading: boolean;
}

Moment.locale("fr");

const getImage = (name) => {
  switch (name) {
    case "Mysterium":
      return require("../../assets/jds/Mysterium.png");
    case "7 wonders":
      return require("../../assets/jds/7-wonders.jpg");
    case "Puissance 4":
      return require("../../assets/jds/puissance-4.jpg");
    case "Dixit":
      return require("../../assets/jds/dixit.jpg");
    case "Catan":
      return require("../../assets/jds/catan.jpg");
    default:
      return require("../../assets/no-pic.png");
  }
};

export default class JDSScreen extends Component<
  JDSScreenProps,
  JDSScreenState
> {
  // Initialisation des states
  state: JDSScreenState = {
    isLoading: true,
    jds: null,
  };

  componentDidMount() {
    const jdsId = this.props.route.params.jdsId;

    // On récupère le jds sur lequel on a cliqué grâce à "jdsId"
    jdsdbapiService.findJDSById(jdsId).then((jds: JDS) => {
      this.props.navigation.setOptions({ title: "Jeu de société" });
      this.setState({ jds, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) return <ActivityIndicator />;
    else {
      const { jds } = this.state;

      // La variable disponibilite est un boolean, on gère ici l'affichage en fonction de sa valeur
      var dispo = "";
      if (jds.disponibilite == false) {
        dispo = "Non disponible";
      } else {
        dispo = "Disponible";
      }

      return (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Nom du jeu :</Text>
              <Text style={styles.instructionsText}>{jds.nom}</Text>
            </View>

            <View style={styles.imageView}>
              {/* Pour l'instant carré gris pour l'image mais à terme en récupérer d'une API ? */}
              <Image style={styles.image} source={getImage(jds.nom)} />
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>
                Propriétaire du jeu :
              </Text>
              <Text style={styles.instructionsText}> {jds.proprietaire}</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Nombre de joueurs : </Text>
              <Text style={styles.instructionsText}>{jds.nbJoueurs}</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Age minimum :</Text>
              <Text style={styles.instructionsText}> {jds.ageMini} ans</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Date de sortie :</Text>
              <Text style={styles.instructionsText}>
                {/* La date ne s'affiche pas bien ici jsp pourquoi */}
                {Moment(jds.dateDeSortie).format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Disponibilité : </Text>
              <Text style={styles.instructionsText}>{dispo}</Text>
            </View>

            <View style={styles.titleView}>
              <Text style={styles.instructionsTitle}>Temps de jeu :</Text>
              <Text style={styles.instructionsText}>
                {jds.tempsDeJeu} minutes
              </Text>
            </View>

            <Text style={styles.instructionsTitle}>Description : </Text>
            <Text style={styles.instructionsText}>{jds.description}</Text>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 5,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 15,
    marginTop: 15,
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
  imageView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
