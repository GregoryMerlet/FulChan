import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "dateFormat"
})
export class DateFormatter implements PipeTransform {

  transform(input: string): string {
    if (input) {
      const date = new Date(input);
      const s = date.toLocaleTimeString();
      const t = s.substr(0, s.length - 3);
      return t;
    }
    return input;
  }

}
