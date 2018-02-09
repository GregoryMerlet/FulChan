import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ActualThreadService} from "../../../shared/services/actualThread/actualThread.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {ROUTE} from "../../../shared/constants/urls";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];
  public messagesHistory: MessageModel[];
  private route: string;
  private pageAvailable: boolean;

  constructor(private messageService: MessageService, private actualThreadService: ActualThreadService) {
    this.route = "";
  }

  /**
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   */
  ngOnInit() {
    this.messageService.messageList$.subscribe((messages) => {
      let equals = true;
      if (this.messageList) {
        if (this.messageList.length > 0 && messages.length > 0) {
          equals = (this.messageList[0].id === messages[0].id);
        }
        this.pageAvailable = !((this.messageList.length % 20 !== 0) || (this.messageList.length === 0));
      }
      this.updateMessages(messages);
      if (!equals) {
        document.getElementById("appMessage").scrollTop = document.getElementById("appMessage").scrollHeight;
      }
    });

    this.messageService.messagesHistory$.subscribe((messages) => {
      if (messages == null) {
        this.messagesHistory = [];
      } else if (messages.length !== 0) {
        this.messagesHistory = messages;
      }
    });

    this.actualThreadService.actualThread.subscribe(thread => {
      if (thread.id > 0) {
        this.route = thread.id + ROUTE;
        this.messageService.getMessages(this.route);
        this.messageService.page = 0;
        this.messagesHistory = null;
      }
    });

    const timer = new TimerObservable(500, 500);
    timer.subscribe(t => {
      if (this.actualThreadService.actualThread.getValue().id > 0) {
        this.route = this.actualThreadService.actualThread.getValue().id + ROUTE;
        this.messageService.getMessages(this.route);
      }
    });
  }

  /**
   * Méthode qui affiche les 20 messages les plus récents de l'historique
   */
  addMoreMessages() {
    this.messageService.addMessages(this.actualThreadService.actualThread.getValue().id);
  }

  /**
   * Methode qui permet de ne pas réafficher les messages déjà affichés
   * @param index
   * @param currentModel
   * @returns {number}
   */
  trackByMessageID(index, currentModel: MessageModel) {
    return currentModel.id;
  }

  /**
   * Méthode qui ajoute les nouveaux message à la liste des messages du thread
   */
  private updateMessages(messages: MessageModel[]) {
    if (this.messagesHistory != null) {
      this.messageList = [];
      for (let i = 0; i < messages.length; i++) {
        this.messageList.push(messages[i]);
      }
      for (let i = 0; i < this.messagesHistory.length; i++) {
        if (this.messagesHistory[i].id) {
          this.messageList.push(this.messagesHistory[i]);
        }
      }
    } else {
      if (!messages[0] || messages[0].threadId === this.actualThreadService.actualThread.getValue().id) {
        this.messageList = messages;
      }
    }
  }
}
