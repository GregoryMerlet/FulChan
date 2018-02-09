import {Component, Input, OnInit} from "@angular/core";
import {MessageModel} from "../../../shared/models/MessageModel";
import {PICFORMATS} from "../../../shared/constants/texts";
import {URLTWITTER, URLYOUTUBE} from "../../../shared/constants/urls";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {
  @Input() message: MessageModel;
  public pictures: string[];
  public links: string[];
  private isMyMessage: boolean;
  private text = "";
  private formats = PICFORMATS;

  constructor() {
    this.message = new MessageModel(0, "14!");
    this.pictures = [];
    this.links = [];
  }

  /**
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   */
  ngOnInit() {
    this.text = this.message.content;
    this.pictures = [];
    if (this.text) {
      const mess = this.text.split(/\s/);
      this.text = "";
      let cptImage = 0;
      for (let y = 0; y < mess.length; y++) {
        if (!this.youtubeCheck(mess[y]) && !this.twitterCheck(mess[y]) && !this.instagramCheck(mess[y])) {
          const url = mess[y].split(".");
          const format = url[url.length - 1];
          let thisBlocIsImage = false;
          for (let i = 0; i < this.formats.length; i++) {
            if (format.toLowerCase() === this.formats[i]) {
              thisBlocIsImage = true;
              break;
            }
          }
          if (thisBlocIsImage) {
            this.pictures[cptImage] = mess[y];
            cptImage = cptImage + 1;
          } else {
            this.text += mess[y] + " ";
          }
        }
      }
    }
    this.checkMyMessage();
  }

  public getTwitterString(url: string) {
    return URLTWITTER + url;
  }

  /**
   * Méthode qui permet de vérifier si l'url est une url youtube retourne vrai si c'est le cas
   * @param url
   * @returns {boolean}
   */
  private youtubeCheck(url: string): boolean {
    const regExp = new RegExp("https?:\/\/www\\.youtube\\.com(.*v=([^&]*)|.*embed\\/(.*)).*");
    const match = regExp.exec(url);
    if (match) {
      this.links.push(URLYOUTUBE + match[2]);
      return true;
    }
    return false;
  }


  /**
   * Méthode qui vérifie si l'url est une url instagram retourne vrai si c'est le cas
   * @param url
   * @returns {boolean}
   */
  private instagramCheck(url: string) {
    const regExp = new RegExp("(https?:\/\/.*instagram\\.com[^\?]*)");
    const match = regExp.exec(url);
    if (match) {
      const u = match[1];
      if (u.endsWith("/")) {
        this.links.push(u + "embed");
      } else {
        this.links.push(u + "/embed");
      }
      return true;
    }
    return false;
  }

  /**
   * Méthode qui vérifie si l'url est une url twitter retourne vrai si c'est le cas
   * @param url
   * @returns {boolean}
   */
  private twitterCheck(url: string) {
    const regExp = new RegExp("https?:\/\/.*twitter\\.com");
    if (regExp.test(url)) {
      this.links.push(this.getTwitterString(url));
      return true;
    }
    return false;
  }

  /**
   * Méthode qui permet de savoir si le message à été écrit par l'utilisateur pour l'afficher sur le côté droit
   */
  private checkMyMessage() {
    let me;
    if (localStorage.getItem("userName") != null) {
      me = localStorage.getItem("userName");
    }
    this.isMyMessage = this.message.from === me;
  }
}
