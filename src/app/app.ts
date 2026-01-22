import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar'; // Add this

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], // Include NavbarComponent here
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }