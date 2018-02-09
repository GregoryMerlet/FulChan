import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {MessageFormComponent} from "./message-form.component";
import {MessageService} from "../../shared/services/message/message.service";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";
import {WeatherService} from "../../shared/services/weather/weather.service";
import {TranslationService} from "../../shared/services/translation/translation.service";
import {IaService} from "../../shared/services/ia/ia.service";

@NgModule({
  declarations: [
    MessageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [MessageFormComponent],
  providers: [MessageService, ActualThreadService, WeatherService, TranslationService, IaService]
})
export class MessageFormModule {
}
