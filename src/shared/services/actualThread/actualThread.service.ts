import {Injectable} from "@angular/core";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ThreadService} from "../thread/thread.service";
import {ChanelModel} from "../../models/ChannelModel";

@Injectable()
export class ActualThreadService {
  public actualThread = new BehaviorSubject<ChanelModel>(new ChanelModel(-1));

  constructor(private threadService: ThreadService) {  }

  getThreadId(name: string): number {
    this.threadService.getThreads();
    const array = this.threadService.threadList$.getValue();
    for (let i = 0; i < array.length; i++) {
      const elem = array[i];
      if (name === elem.name) {
        return elem.id;
      }
    }
    return -1;
  }
}
