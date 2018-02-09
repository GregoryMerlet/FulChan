import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public user: string;
  public isLogin: boolean;
  public loginValid: boolean;

  constructor() {
    this.user = "";
  }

  ngOnInit() {
    this.isLogin = localStorage.getItem("isLogin") === "true";
    this.loginValid = true;
    this.user = localStorage.getItem("userName");
  }

  /**
   * Fonction pour se connecter.
   * L'utilisateur se connecte en cliquant sur le bouton Login.
   */
  login() {
    const regex = this.user.match("[a-z]{1,}");
    if (regex && regex.input === regex[0]) {
      localStorage.setItem("userName", this.user);
      this.isLogin = true;
      this.loginValid = true;
      localStorage.setItem("isLogin", this.isLogin.toString());
    } else {
      this.loginValid = false;
    }
  }

  /**
   * Fonction pour se déconnecter.
   * L'utilisateur se déconnecte en cliquant sur le bouton Logout.
   */
  logout() {
    localStorage.setItem("userName", "");
    this.isLogin = false;
    localStorage.setItem("isLogin", this.isLogin.toString());
  }
}
