import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "reverse"
})
export class ReversePipe implements PipeTransform {

  transform(input: any): any {
    if (input) {
      const ret = [];
      for (let i = input.length - 1; i >= 0; i--) {
        ret.push(input[i]);
      }
      return ret;
    }
    return input;
  }
}
