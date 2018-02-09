import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./message-form";
import {MessageService} from "../shared/services/message/message.service";

import {ThreadListComponent} from "./thread-list";
import {ThreadService} from "../shared/services/thread/thread.service";
import {ReversePipe} from "../shared/pipes/reversePipe/reverse.pipe";
import {DateFormatter} from "../shared/pipes/dateFormatter/date.formatter";
import {ActualThreadService} from "../shared/services/actualThread/actualThread.service";
import {ThreadFormComponent} from "./thread-form/thread-form.component";
import {ThreadBarComponent} from "./thread-bar";
import {LoginComponent} from "./login/login.component";
import {SafePipe} from "../shared/pipes/safe/safe.pipe";
import {WeatherComponent} from "./weather/weather.component";
import {WeatherService} from "../shared/services/weather/weather.service";
import {TranslationService} from "../shared/services/translation/translation.service";
import {IaService} from "../shared/services/ia/ia.service";


@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    ThreadListComponent,
    ReversePipe,
    DateFormatter,
    ThreadFormComponent,
    ThreadBarComponent,
    LoginComponent,
    SafePipe,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessageService, ThreadService, ActualThreadService, WeatherService, TranslationService, IaService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
