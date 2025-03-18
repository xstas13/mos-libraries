import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter'
})
export class HighlighterPipe implements PipeTransform {
  transform(value: string, args: string): string {
    if (!args) return value;

    return value.replace(new RegExp(args, 'igm'), '<span class="highlighted-text">$&</span>');
  }
}
