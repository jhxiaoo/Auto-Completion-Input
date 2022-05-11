import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AutoInput';
  getSelect(name: string){
    alert('Selected: ' + name);
    // console.log("Selected:", name);
  }
}
