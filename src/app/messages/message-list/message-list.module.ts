import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {MessageListComponent} from "./message-list.component";
import {MessageModule} from "../message";
import {MessageService} from "../../../shared/services";
import {ActualThreadService} from "../../../shared/services/actualThread/actualThread.service";

@NgModule({
  declarations: [
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [MessageListComponent],
  providers: [MessageService, ActualThreadService]
})
export class MessageListModule {
}
