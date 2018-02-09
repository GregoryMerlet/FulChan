import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {ChanelModel} from "../../models/ChannelModel";
import {URLSERVER} from "shared/constants/urls";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class ThreadService {

  /**
   * ThreadList$ est un type d'Observable particulier appelé ReplaySubject.
   * ThreadList$ est un flux d'évenements qui stock la liste des threads. A chaque fois que l'on fait une requète
   * pour récupérer la liste des threads, threadList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les threads. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public threadList$: BehaviorSubject<ChanelModel[]>;
  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux threads.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux threads.
   */
  private url: string;
  private oldThreadList: ChanelModel[];

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.threadList$ = new BehaviorSubject([]);
    this.threadList$.next([]);
  }

  /**
   * Fonction getThread.
   * Cette fonction permet de récupérer la liste des threads pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des threads la route doit avoir la structure suivante: :id/threads avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/threads
   * @param route
   * @returns {Observable<R>}
   */
  public getThreads(page?: number) {
    let myPage: number;
    myPage = 0;
    if (page) {
      myPage = page;
    }
    const finalUrl = this.url + "?page=" + myPage;
    this.http.get(finalUrl)
      .subscribe((response) => {
        if (response.json().length > 0) {
          this.extractAndUpdateThreadList(response);
          this.getThreads(myPage + 1);
        }
      });
  }

  /**
   * Fonction extractAndUpdateThreadList.
   * Cette fonction permet d'extraire la liste des threads de la 'response' reçue et ensuite de mettre à jour la liste
   * des thread dans l'observable threadList$.
   * Elle est appelée dans la fonction getThreads et permet de directement récuperer une liste de ThreadModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateThreadList(response: Response) {
    const responseJson = response.json();
    let haveBeenModified = false;
    if (!this.oldThreadList || this.oldThreadList.length === 0) {
      this.oldThreadList = responseJson;
      haveBeenModified = true;
    } else {
      for (const i in responseJson) {
        if (!this.isInOldThreadList(responseJson[i])) {
          this.oldThreadList.push(responseJson[i]);
          haveBeenModified = true;
        }
      }
    }
    if (haveBeenModified) {
      this.threadList$.next(this.oldThreadList);
    }
  }

  isInOldThreadList(thread: ChanelModel): boolean {
    let found = false;
    for (const i in this.oldThreadList) {
      if (this.oldThreadList[i].id === thread.id) {
        found = true;
        break;
      }
    }
    return found;
  }

  /**
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/messages
   * - message: Le message à envoyer. Ce message est de type MessageModel.
   * @param thread
   * @param actualThread
   */
  public createThread(thread: ChanelModel, actualThread: BehaviorSubject<ChanelModel>) {
    const finalUrl = URLSERVER;
    thread.id = 0;
    this.http.post(finalUrl, thread)
      .subscribe((response) => {
        actualThread.next(response.json());
        this.getThreads();
      });
  }

  public updateThread(thread: ChanelModel) {
    const finalUrl = URLSERVER + thread.id;
    this.http.put(finalUrl, thread).subscribe();
  }

}
