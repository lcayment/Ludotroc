import User from "./user.model";

export default class JDS {
  constructor(
    public nbJoueurs: number,
    public tempsDeJeu: number,
    public ageMini: number,
    public dateDeSortie: Date,
    //public types: Array<Types>,   // jsp comment le gérer ça donc pour l'instant c'est commenté
    public id: number,
    public nom: string,
    public description: string,
    public disponibilite: boolean,
    public proprietaire: User
  ) {}
}
