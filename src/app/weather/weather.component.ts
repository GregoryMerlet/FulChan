import { Component, OnInit } from "@angular/core";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {Weather} from "../../shared/models/WeatherModel";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"]
})
export class WeatherComponent implements OnInit {
  /**
   * Informations envoyées par l'API météo
   */
  public weatherTown: Weather;

  /**
   * Nom de l'image correspondant à la météo de la ville
   */
  public picture: string;

  /**
   * Nombre représentant l'état de la machine à état.
   */
  public state: number;

  /**
   * Ville indiquée dans le formulaire.
   */
  public answer: string;

  constructor(private weatherService: WeatherService) {
    this.picture = "";
    this.state = 0;
  }

  /**
   * Met à jour la ville courante.
   */
  ngOnInit() {
    this.weatherService.town.subscribe(t => {
      if (t.id !== -1) {
        this.createId(t.id);
        this.weatherTown = t;
        this.state = 2;
      }
    });
  }

  /**
   * Relie l'identifiant de la météo à la photo correspondante.
   * @param id
   */
  private createId(id: number) {
    switch (Math.floor(id / 100)) {
      case 2:
        this.picture = "storm";
        break;
      case 3:
        this.picture = "drizzle";
        break;
      case 5:
        this.picture = "rain";
        break;
      case 6:
        this.picture = "snow";
        break;
      case 9:
      case 7:
        this.picture = "tornado";
        break;
      case 8:
        if (id === 800) {
          this.picture = "sun";
        } else {
          this.picture = "cloudy";
        }
        break;
      default:
        break;
    }
  }

  /**
   * Accède à l'étape suivante.
   */
  next() {
    switch (this.state) {
      case 0:
        this.state = 1;
        break;
      case 1:
        this.state = 0;
        break;
      case 2:
        this.state = 1;
        break;
      default:
        this.state = 0;
        break;
    }
  }

  /**
   * Envoie la requête pour obtenir la météo d'une ville.
   */
  searchTown() {
    if (this.answer && this.answer.trim().length > 1) {
      this.weatherService.weatherTown(this.answer);
      this.state++;
    }
    this.answer = "";
  }
}
