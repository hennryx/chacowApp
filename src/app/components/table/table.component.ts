import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'Table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})

export class TableComponent {
  @Input() headData: string[] = [];
  @Input() contentData: any[] = []; 
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  handleAction(action: string, id: number) {
    this.action.emit({ action, id });
  }
}
