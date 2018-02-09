import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {ROUTE, URLSERVER} from "shared/constants/urls";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  private url: string;
  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;
  public messagesHistory$: ReplaySubject<MessageModel[]>;
  public mySentID = [];
  public page = 0;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.messageList$ = new ReplaySubject(1);
    this.messageList$.next([new MessageModel()]);
    this.messagesHistory$ = new ReplaySubject(1);
    this.messagesHistory$.next([new MessageModel()]);
  }

  /**
   * Fonction getMessage.
   * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/messages
   * @param route
   * @returns {Observable<R>}
   */
  public getMessages(route: string) {
    const finalUrl = this.url + route;
    this.http.get(finalUrl).subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  /**
   * Fonction sendMessageWithoutGet.
   * Permet d'envoyer un message sans mettre à jour la liste de tous les message
   * du channel
   * @param message
   * @param route
   */
  public sendMessageWithoutGet(route: string, message: MessageModel): Observable<Response> {
    const finalUrl = URLSERVER + route;
    return this.http.post(finalUrl, message);
  }

  /**
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/messages
   * - message: Le message à envoyer. Ce message est de type MessageModel.
   * @param route
   * @param message
   */
  public sendMessage(route: string, message: MessageModel) {
    message.content = this.filterEmo(message.content);
    const finalUrl = URLSERVER + route;
    this.http.post(finalUrl, message)
      .subscribe((response) => this.extractMessageAndGetMessages(response, route));
    this.messagesHistory$.next([new MessageModel()]);
  }

  /**
   * Fonction extractAndUpdateMessageList.
   * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
   * des message dans l'observable messageList$.
   * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de MessageModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateMessageList(response: Response) {
    const messageList = response.json() || [];
    this.messageList$.next(messageList);
  }

  /**
   * Fonction extractMessage.
   * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
   * sendMessage et permet de directement récuperer un MessageModel.
   * Elle va également faire un nouvel appel pour récupérer la liste complete des messages pour pouvoir mettre à jour la
   * liste des messages dans les composants.
   * @param response
   * @param route
   * @returns {any|{}}
   */
  private extractMessageAndGetMessages(response: Response, route: string): MessageModel {
    const message = response.json() || {};
    this.mySentID.push(message["id"]);
    this.getMessages(route);
    return message;
  }

  /**
   * Fonction addMessages.
   * Effectue des requêtes GET afin de récupérer les messages des anciennes pages.
   * @param actualThread
   */
  public addMessages(actualThread: number) {
    this.page++;
    for (let i = 1; i <= this.page; i++) {
      const finalUrl = URLSERVER + actualThread + ROUTE + "?page=" + i;
      this.http.get(finalUrl).subscribe((response) => this.messagesHistory$.next(response.json() || []));
    }
  }

  /**
   * Fonction filterEmo.
   * Filtre le contenu du message pour remplacer les smileys par leur équivalent en UTF-8.
   * @param message
   * @returns {string}
   */
  private filterEmo(message: string): string {
    if (message) {
      return message.replace(/:\)/gi, "😊").replace(/;\)/gi, "😉").replace(/:D/gi, "😄")
        .replace(/xD/gi, "😆").replace(/:p/gi, "😋").replace(/:S/gi, "😖").replace(/:\(/gi, "😞").replace(/:O/gi, "😲");
    }
  }
}
