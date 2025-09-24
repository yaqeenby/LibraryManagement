import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: false
})
export class CardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() desc: string = '';

}
