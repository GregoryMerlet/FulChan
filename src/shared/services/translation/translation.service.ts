import { Injectable } from "@angular/core";
import {URLTRANSLATER} from "../../constants/urls";
import {MessageModel} from "../../models/MessageModel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Http} from "@angular/http";
import {MessageService} from "../message/message.service";

@Injectable()
export class TranslationService {

  public traductedText: BehaviorSubject<string>;
  constructor(private http: Http, private messageService: MessageService) {
    this.traductedText = new BehaviorSubject("");
  }


  /**
   * Fonction getTranslation.
   * Cette fonction est appellée lors du clique sur le bouton translate
   * Elle traduit le message de l'utilisateur sans envoyer le message
   * l'utilisateur à alors le choix de l'envoyer ou de le modifier
   * @param text
   * @param to
   */
  public getTranslation(text: string, to: string) {
    const finalUrl = URLTRANSLATER + "text=" + text + "&lang=" + to;
    this.http.get(finalUrl).subscribe((response) => {
      this.traductedText.next(response.json().text[0]);
    });
  }

  /**
   * Fonction translate.
   * Cette fonction permet de traduire le "text" dans la langue "to" en utilisant l'api Yandex
   * puis envoie le "message" traduit dans le chat l'aide de sendMessage
   * @param message
   * @param route
   * @param to
   * @param text
   */
  public translate(text: string, to: string, route: string, message: MessageModel) {
    const finalUrl = URLTRANSLATER + "text=" + text + "&lang=" + to;
    this.http.get(finalUrl).subscribe((response) => {
      message.content = response.json().text[0];
      this.messageService.sendMessage(route, message);
      message.content = "";
    });
  }
}
