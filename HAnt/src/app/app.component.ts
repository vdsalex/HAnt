import { Component } from '@angular/core';
import {Router} from '@angular/router';

interface MyMarker {
  lat: number;
  lng: number;
  iconPath: string;
  hazardName: string;
  location: string;
  time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent {
  previous;
  hasEvent = true;
  markers: MyMarker[] = [
    {
      lat: 47.166700,
      lng: 27.600000,
      iconPath: 'assets/icons/fire.png',
      hazardName: 'Fire',
      location: 'Iași',
      time: '18:44 AM'
    },
    {
      lat: 46.866700,
      lng: 28.600000,
      iconPath: 'assets/icons/flood.png',
      hazardName: 'Flood',
      location: 'Hîncești',
      time: '19:44 PM'
    },
    {
      lat: 46.166700,
      lng: 29.600000,
      iconPath: 'assets/icons/earthquake.png',
      hazardName: 'Earthquake',
      location: 'Vvedenka',
      time: '23:44 PM'
    }
    ];
  constructor(private router: Router) {
  }
  clickMarker(infowindow, infowindowHazard, location, localTime, hazard) {
    infowindowHazard.innerHTML = hazard.hazardName;
    location.innerHTML = 'Location: ' + hazard.location;
    localTime.innerHTML = 'Local Time: ' + hazard.time;
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
  openDetailsPage(container) {
    container.style.display = 'none';
    this.router.navigate(['/details']);
  }
}
