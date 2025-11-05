import { Pipe, PipeTransform } from '@angular/core';
import { Level } from './model/employee';
const MapLevels: Record<Level, string> = {
  'J': 'Junior',
  'M': 'Mid-level',
  'S': 'Senior'
}
@Pipe({
  name: 'level',
  standalone: true
})
export class LevelPipe implements PipeTransform {

  transform(value: Level): string {
    return MapLevels[value] || 'Unknown Level';
  }

}
