/**
 * Classe représentant l'objet Weather
 */
export class Weather {
  /**
   * Les informations importantes envoyées par l'API de météo sont stockées ici.
   */
  public town: string;
  public temp: number;
  public id: number;
  public description: string;

  constructor(town: string, temp: number, id: number, description: string) {
    this.town = town;
    this.temp = Math.floor(temp);
    this.id = id;
    this.description = description;
  }
}
