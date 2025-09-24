import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrl: './dialog-template.component.scss',
  standalone: false
})
export class DialogTemplateComponent {
  @Input() title = '';
  @Input() action = 'Ok'

  @Output() onActionClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCloseClicked: EventEmitter<any> = new EventEmitter<any>();

}
