import { Component, OnInit } from "@angular/core";
import { ActualThreadService } from "../../shared/services/actualThread/actualThread.service";
import {ThreadService} from "../../shared/services/thread/thread.service";
import {ChanelModel} from "../../shared/models/ChannelModel";

@Component({
  selector: "app-thread-bar",
  templateUrl: "./thread-bar.component.html",
  styleUrls: ["./thread-bar.component.css"]
})
export class ThreadBarComponent implements OnInit {
  private actualThread: ChanelModel;
  private isOnEdit = false;
  constructor(private actualThreadService: ActualThreadService, private threadS: ThreadService) { }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant ThreadComponent prend en @Input un thread. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
    this.actualThreadService.actualThread.subscribe(thread => {
      this.actualThread = thread;
    });
  }

  /**
   * Méthode qui permet de switcher du titre de thread à la modification
   */
  switchEditMode() {
    this.isOnEdit = !this.isOnEdit;
  }

  /**
   * Méthode permettant de renommer un thread
   */
  changeName() {
    this.switchEditMode();
    this.actualThreadService.actualThread.next(this.actualThread);
    this.threadS.updateThread(this.actualThread);
  }
}
