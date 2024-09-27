import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUserName } from '../../store/auth/auth.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
  private readonly store = inject(Store);
  userName$ = this.store.select(selectUserName);
  
}
