import { Injectable } from "@angular/core";
import {MessageModel} from "../../models/MessageModel";
import {KEYAPIIA} from "../../constants/keys";
import {URLIA} from "../../constants/urls";
import {Http} from "@angular/http";
import {Headers} from "@angular/http";
import {MessageService} from "../message/message.service";

@Injectable()
export class IaService {

  constructor(private http: Http, private messageService: MessageService) { }

  /**
   * Fonction ia.
   * Cette fonction permet de communiquer avec un ia "text" est envoyé à l'ia de l'api api.ia
   * l'api necessite une clef d'api conservé dans les constantes key
   * puis envoie la réponse de l'ia dans le chat
   * @param message
   * @param route
   * @param text
   */
  public ia(text: string, route: string, message: MessageModel) {
    const finalUrl = URLIA + "query=" + text;
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + KEYAPIIA);
    return this.http.get(finalUrl, {headers: headers}).subscribe((response) => {
      let message2: MessageModel;
      message2 = new MessageModel();
      message2.content = response.json().result.fulfillment.speech;
      message2.from = "iateamf";
      this.messageService.sendMessage(route, message2);
      message.content = "";
    });
  }
}
