import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ThreadListComponent } from "./thread-list.component";
import { ThreadService } from "../../shared/services";
import {ActualThreadService} from "../../shared/services/actualThread/actualThread.service";

@NgModule({
  declarations: [
    ThreadListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ThreadListComponent],
  providers: [ThreadService, ActualThreadService]
})
export class ThreadListModule { }
