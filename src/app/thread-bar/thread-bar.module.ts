import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ThreadBarComponent } from "./thread-bar.component";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";
import {ThreadService} from "../../shared/services/thread/thread.service";

@NgModule({
  declarations: [
    ThreadBarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ThreadBarComponent],
  providers: [ActualThreadService, ThreadService]
})
export class ThreadBarModule { }
