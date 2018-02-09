import { Component, OnInit } from "@angular/core";

import { ThreadService } from "../../shared/services";
import { ChanelModel } from "../../shared/models/ChannelModel";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: "app-thread-list",
  templateUrl: "./thread-list.component.html",
  styleUrls: ["./thread-list.component.css"]
})
export class ThreadListComponent implements OnInit {

  public threadList: ChanelModel[];

  constructor(private threadService: ThreadService, private actualThreadService: ActualThreadService) { }

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
    this.threadService.getThreads();
    this.threadService.threadList$.subscribe((threads) => {
      this.updateThreads(threads);
      if (this.threadList.length > 0) {
        if (this.actualThreadService.actualThread.getValue().id < 0) {
          this.actualThreadService.actualThread.next(this.threadList[0]);
        }
      }
    });

    const timer = new TimerObservable(30000, 30000);
    timer.subscribe(t => this.threadService.getThreads());
  }


  /**
   * Méthode qui permet de changer de thread, change la couleur du lien actif et du lien précèdent,
   * Elle change aussi la liste des messages de l'ancien thread par le nouveau
   * @param thread
   */
  changeThread(thread: ChanelModel) {
    for (let i = 0; i < document.getElementsByClassName("activeThread").length; i++) {
      document.getElementsByClassName("activeThread").item(i).classList.remove("activeThread");
    }
    document.getElementById("thread" + thread.id).classList.add("activeThread");
    this.actualThreadService.actualThread.next(thread);
  }

  /**
   * Methode qui permet de mettre à jour la liste des threads si ils ne sont pas deja dans la liste
   * @param threads
   */
  updateThreads(threads: ChanelModel[]) {
    if (this.threadList) {
      for (const i in threads) {
        if (!this.isIn(threads[i], this.threadList)) {
          this.threadList.push(threads[i]);
        }
      }
    } else {
      this.threadList = threads;
    }
    const actualThreadID = this.actualThreadService.actualThread.getValue().id;
    if (document.getElementById("thread" + actualThreadID)) {
      document.getElementById("thread" + actualThreadID).classList.add("activeThread");
    }
  }

  /**
   * Methode permettant de savoir si "thread" fait parti du tableau "threads"
   * @param thread
   * @param threads
   * @returns {boolean}
   */
  isIn(thread: ChanelModel, threads: ChanelModel[]): boolean {
    for (const i in threads) {
      if (threads[i].id === thread.id) {
        return true;
      }
    }
    return false;
  }

}
