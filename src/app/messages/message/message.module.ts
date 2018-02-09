import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageComponent } from "./message.component";
import {MessageService} from "../../../shared/services/message/message.service";

@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MessageComponent],
  providers: [MessageService]
})
export class MessageModule { }
