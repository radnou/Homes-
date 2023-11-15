import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { Housinglocation } from "../housinglocation";
import { HousingService } from "../housing.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form action="">
        <input type="text" placeholder="Filter by city " />
        <button class="primary" type="button">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of housinglocationList"
        [housinglocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housinglocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
   constructor() {
     this.housingService.getAllHousingLocation()
         .then ((housingLocationList) => this.housinglocationList = housingLocationList)
  }
}
