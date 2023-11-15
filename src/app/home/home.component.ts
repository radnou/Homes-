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
      <form>
        <input type="text" placeholder="Filter by city " #filter (keydown)="filterResults(filter.value)"/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housinglocation]="housingLocation"
      >
      </app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  housingLocationList: Housinglocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: Housinglocation[] = [];
   constructor() {
     this.housingService.getAllHousingLocation()
         .then ((housingLocationList) => {
           this.housingLocationList = housingLocationList;
           this.filteredLocationList = housingLocationList;
         })
  }

  filterResults(value: string) {
    if(!value) this.filteredLocationList = this.housingLocationList;
       this.filteredLocationList = this.housingLocationList.filter(
        housingLocation => housingLocation?.city.toLowerCase().includes(value.toLowerCase())
       )


  }
}
