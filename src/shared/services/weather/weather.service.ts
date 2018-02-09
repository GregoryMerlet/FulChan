import { Injectable } from "@angular/core";
import {URLWEATHER} from "../../constants/urls";
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Weather} from "../../models/WeatherModel";

@Injectable()
export class WeatherService {
  /**
   * Flot de données correspondant à la météo des villes recherchées.
   * @type {BehaviorSubject<Weather>}
   */
  public town = new BehaviorSubject<Weather>(new Weather("", -1, -1, ""));

  constructor(private http: Http) { }

  /**
   * Fonction weatherTown.
   * Effectue une requête auprès de l'API météo pour obtenir les conditions
   * climatiques d'une ville donnée en paramètre.
   * @param town
   */
  public weatherTown(town: string) {
    const finalUrl = URLWEATHER + town;
    this.http.get(finalUrl).subscribe((response) => {
      const answer = response.json();
      this.town.next(new Weather(answer.name, answer.main.temp, answer.weather["0"].id, answer.weather["0"].description));
    });
  }
}
