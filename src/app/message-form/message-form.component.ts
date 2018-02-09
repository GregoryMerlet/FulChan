import {Component, OnInit, ViewChild} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";
import {ROUTE} from "../../shared/constants/urls";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {ChanelModel} from "../../shared/models/ChannelModel";
import {
  COMMANDERROR, EMPTYMESSAGEERROR, HELP, LANGUAGESLIST, LANGUAGESMAP, SMILEYLIST,
  SMILEYMAP
} from "../../shared/constants/texts";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {IaService} from "../../shared/services/ia/ia.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;
  private route: string;
  public smileyList = SMILEYLIST;
  public smileyMap = SMILEYMAP;
  private schedulePanel = false;
  private infos = HELP;
  private errorMessage: boolean;
  private errorMessageText: string;
  @ViewChild("option1") option1;
  @ViewChild("option2") option2;
  @ViewChild("option1Input") option1Input;
  @ViewChild("option2Input") option2Input;
  @ViewChild("channelInput") channelInput;
  @ViewChild("languageSelect") languageSelect;
  private actualThread: ChanelModel;
  public languagesList = LANGUAGESLIST;
  public languagesMap = LANGUAGESMAP;

  constructor(private messageService: MessageService, private actualThreadService: ActualThreadService,
              private wService: WeatherService, private translationService: TranslationService, private iaService: IaService) {
    this.message = new MessageModel();
    this.route = "1/messages";
    this.errorMessage = false;
    this.errorMessageText = "";
  }

  ngOnInit() {
    this.actualThreadService.actualThread.subscribe(thread => {
      this.actualThread = thread;
      this.route = thread.id + ROUTE;
    });
    this.translationService.traductedText.subscribe((text) => {
      this.message.content = text;
    });
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    this.errorMessage = false;
    this.errorMessageText = "";
    if (this.message.content === "") {
      this.errorMessage = true;
      this.errorMessageText = EMPTYMESSAGEERROR;
    } else {
      if (localStorage.getItem("userName") != null) {
        this.message.from = localStorage.getItem("userName");
      }
      if (this.message.content && this.message.content.startsWith("/ia")) {
        this.ia();
      } else if (this.message.content && this.message.content.startsWith("/trad")) {
        this.traduction();
      } else if (this.message.content.startsWith("/schedule")) {
        this.parseScheduleMessage(this.message.content);
      } else if (this.message.content && this.message.content.startsWith("/meteo")) {
        this.weather(this.message.content);
      } else {
        if (this.option1 && this.option1.nativeElement.checked) {
          this.scheduleMessage(this.channelInput.nativeElement.value,
            this.option1Input.nativeElement.value, this.message.content);
        } else if (this.option2 && this.option2.nativeElement.checked) {
          this.scheduleMessage(this.channelInput.nativeElement.value,
            this.option2Input.nativeElement.value, this.message.content);
        } else {
          this.messageService.sendMessage(this.route, this.message);
        }
      }
      this.message.content = "";
    }
  }

  /**
   * Fonction traduction.
   * Cette fonction est appelée si le contenu du message contient une url seule.
   * Elle supprime l'url du message, la copie dans message.img et passe le boolean isPicture à true pour afficher l'image.
   */
  traduction() {
    const content = this.message.content;
    const tab = content.split(" ");
    if (tab.length < 4) {
      this.errorMessage = true;
      this.errorMessageText = COMMANDERROR;
      return;
    }
    const text = content.substring(tab[0].length + tab[1].length + tab[2].length + 3);
    this.translationService.translate(text, tab[2], this.route, this.message);
  }

  /**
   * Méthode qui permet d'afficher la météo de la ville choisie
   * si la commande est invalide on affiche le message d'erreur à l'utilisateur
   * @param content
   */
  private weather(content: string) {
    if (content.indexOf(" ") === -1) {
      this.errorMessage = true;
      this.errorMessageText = COMMANDERROR;
      return;
    }
    this.wService.weatherTown(content.substring(content.split(" ")[0].length + 1));
  }

  addToMessage(text: string) {
    if (this.message.content == null) {
      this.message.content = "";
    }
    this.message.content += text;
  }

  switchSchedulePanel() {
    this.schedulePanel = !this.schedulePanel;
  }

  /**
   * Méthode qui permet d'envoyer un message dans le futur, si la commande ne respecte pas
   * la bonne syntaxe on affiche le message d'erreur à l'utilisateur
   * @param message
   */
  private parseScheduleMessage(message: string) {
    const otherThread = new RegExp("#(.+) @").exec(message);
    let thread = this.route;
    if (otherThread) {
      thread = otherThread[1];
    }
    const match = new RegExp("@([^ ]+) (.+)").exec(message);
    if (match) {
      this.scheduleMessage(thread, match[1], match[2]);
    }else {
        this.errorMessage = true;
        this.errorMessageText = COMMANDERROR;
        return;
    }
  }

  /**
   * Méthode qui permet de lancer le service pour le message dans le futur avec tous les paramètres necessaires
   * @param thread
   * @param time
   * @param message
   */
  private scheduleMessage(thread: string, time: string, message: string) {
    const date = new Date(Date.now());
    const hourSecond = new RegExp("(\\d+):(\\d+)").exec(time);
    const second = new RegExp("(\\d+)").exec(time);
    if (hourSecond) {
      date.setHours(parseInt(hourSecond[1], 10), parseInt(hourSecond[2], 10), 0);
    } else if (second) {
      date.setSeconds(date.getSeconds() + parseInt(second[1], 10));
    }
    if (date.getTime() > Date.now()) {
      const timer = new TimerObservable(date.getTime() - Date.now());
      if (thread !== this.route) {
        thread = this.actualThreadService.getThreadId(thread) + ROUTE;
        timer.subscribe(() => {
          this.messageService.sendMessageWithoutGet(thread, new MessageModel(1, message, this.message.from))
            .subscribe(response => {
              const res = response.json() || {};
              this.messageService.mySentID.push(res["id"]);
            });
        });
      } else {
        timer.subscribe(() =>
          this.messageService.sendMessage(this.route, new MessageModel(1, message, this.message.from)));
      }
    }else {
      this.errorMessage = true;
      this.errorMessageText = COMMANDERROR;
      return;
    }
  }

  /**
   * Méthode qui permet de communiquer avec l'ia si la commande est invalide on affiche le message d'erreur à l'utilisateur
   */
  ia() {
    const content = this.message.content;
    const tab = content.split(" ");
    const text = content.substring(tab[0].length);
    if (tab.length < 2) {
      this.errorMessage = true;
      this.errorMessageText = COMMANDERROR;
      return;
    }
    this.message.content = text;
    this.messageService.sendMessage(this.route, this.message);
    this.iaService.ia(text, this.route, this.message);
  }

  /**
   * Méthode qui permet de lancer la traduction sur l'api effectué via l'interface (bouton traduction)
   */
  traduct() {
    if (this.languageSelect.nativeElement.options[this.languageSelect.nativeElement.selectedIndex].value !==
      this.languagesMap.get(this.languagesList[0])) {
      this.translationService.getTranslation(this.message.content,
        this.languageSelect.nativeElement.options[this.languageSelect.nativeElement.selectedIndex].value);
    }
  }
}
