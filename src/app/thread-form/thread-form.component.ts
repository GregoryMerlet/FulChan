import {Component, OnInit, ViewChild} from "@angular/core";

import { ThreadService } from "../../shared/services";
import { ChanelModel } from "../../shared/models/ChannelModel";
import "rxjs/add/operator/toPromise";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";
import {ThreadBarComponent} from "../thread-bar/thread-bar.component";
import {INVALIDTHREADNAME, VALIDTHREADNAME} from "../../shared/constants/texts";

@Component({
  selector: "app-thread-form",
  templateUrl: "./thread-form.component.html",
  styleUrls: ["./thread-form.component.css"]
})
export class ThreadFormComponent implements OnInit {

  public thread: ChanelModel;
  @ViewChild("nameInput") nameInput;

  constructor(private threadService: ThreadService, private actualThreadService: ActualThreadService) {
    this.thread = new ChanelModel();
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Le composant ThreadComponent prend en @Input un thread. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l'utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu'à
   * l'initialisation simple des variables. Pour plus d'information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() { }

  /**
   * Méthode qui permet de créer un thread et bascule sur le thread pour que l'utilisateur puisse communiquer
   */
  createThread() {
    if (this.thread.name && this.thread.name !== "") {
      this.nameInput.nativeElement.title = "";
      this.nameInput.nativeElement.classList.remove("wrong");
      this.nameInput.nativeElement.classList.remove("right");
      this.threadService.createThread(this.thread, this.actualThreadService.actualThread);
      this.thread.name = "";
    } else {
      this.nameInput.nativeElement.title = INVALIDTHREADNAME;
      this.nameInput.nativeElement.classList.add("wrong");
    }
  }

  checkValidity() {
    const input = this.nameInput.nativeElement.value;
    this.nameInput.nativeElement.title = "";
    this.nameInput.nativeElement.classList.remove("wrong");
    this.nameInput.nativeElement.classList.remove("right");
    if (input === "") {
      this.nameInput.nativeElement.title = INVALIDTHREADNAME;
      this.nameInput.nativeElement.classList.add("wrong");
    } else {
      this.nameInput.nativeElement.title = VALIDTHREADNAME;
      this.nameInput.nativeElement.classList.add("right");
    }
  }
}
