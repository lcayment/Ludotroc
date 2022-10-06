export default class Puzzle {
  constructor(
    public nbPieces: number,
    //public couleurs: Array<Couleurs>,     // jsp comment le gérer ça donc pour l'instant c'est commenté
    //public themes: Array<Themes>,         // jsp comment le gérer ça donc pour l'instant c'est commenté
    public id: number,
    public nom: string,
    public description: string,
    public disponibilite: boolean,
    public proprietaire: string
  ) {}
}
