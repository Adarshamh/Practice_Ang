import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  // Use a component property for the image path so Angular resolves the asset reliably
  imageSrc = 'assets/Mine.png';

}
