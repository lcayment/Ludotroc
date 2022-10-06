import Puzzle from "./puzzle.model";

const rootEndpoint = "https://enscludotroc.azurewebsites.net/api/PuzzleApi/";

export interface PuzzleData {
  nbPieces: number;
  //public couleurs: Array<Couleurs>,
  //public themes: Array<Themes>,
  id: number;
  nom: string;
  description: string;
  disponibilite: boolean;
  proprietaire: string;
}

class PuzzlesDbApi {
  /* Pas encore utilisé mais ca ne saurait tarder */
  // searchUsersById(userId: string): Promise<Array<User>> {
  //   return this.fetchFromApi(
  //     `${rootEndpoint}/UtilisateurApi/Details/${userId}`
  //   ).then((users) => this.createUsers(users));
  // }

  /* Pas encore utilisé mais ca ne saurait tarder */
  // searchCocktailsByIngredientName(name: string): Promise<Array<Ludotroc>> {
  //   // Doesn't return cocktail instructions
  //   return this.fetchFromApi(
  //     `${rootEndpoint}/filter.php?i=${name.trim()}`
  //   ).then((drinks) => this.createCocktails(drinks));
  // }

  searchPuzzlesByName(name: string): Promise<Array<Puzzle>> {
    // voir la valeur de ce return, ca me semble bizarre
    return this.fetchFromApi(`${rootEndpoint}?name=${name.trim()}`).then(
      (puzzles) => this.createPuzzles(puzzles)
    );
  }

  // Récupération de tous les puzzles
  getAll(): Promise<Array<Puzzle>> {
    // On utilise fetchFromApi
    return this.fetchFromApi(`${rootEndpoint}`).then((puzzles) =>
      this.createPuzzles(puzzles)
    );
  }

  // Récupération d'un puzzle donné avec son id
  // ex d'url : https://enscludotroc.azurewebsites.net/api/PuzzleApi/3
  findPuzzleById(id: number): Promise<Puzzle> {
    // On utilise fetchFromApiOne
    return this.fetchFromApiOne(`${rootEndpoint}${id}`).then((puzzles) =>
      this.createPuzzle(puzzles)
    );
  }

  // On fetch depuis l'API avec une promesse de TABLEAU DE PUZZLE
  private fetchFromApi(query: string): Promise<Array<Puzzle>> {
    return (
      fetch(query)
        // FIXME: JSON parse error when ingredient is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => {
          console.error(error);
        })
    );
  }

  // On fetch depuis l'API avec une promesse d'UN SEUL PUZZLE
  private fetchFromApiOne(query: string): Promise<Puzzle> {
    return (
      fetch(query)
        // FIXME: JSON parse error when puzzle is not found
        .then((response) => response.json())
        .then((jsonResponse) => jsonResponse || [])
        .catch((error) => {
          console.error(error);
        })
    );
  }

  // Après avoir fetch de l'API on crée le puzzle
  private createPuzzle(puzzledata: PuzzleData): Puzzle {
    return new Puzzle(
      puzzledata.nbPieces,
      puzzledata.id,
      puzzledata.nom,
      puzzledata.description,
      puzzledata.disponibilite,
      puzzledata.proprietaire
    );
  }

  // Après avoir fetch de l'API on crée le tableau de puzzle
  private createPuzzles(puzzlesData: Array<PuzzleData>): Array<Puzzle> {
    return puzzlesData.map((puzzledata) => this.createPuzzle(puzzledata));
  }
}

export default new PuzzlesDbApi();
