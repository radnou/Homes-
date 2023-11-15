import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {HousingService} from "../housing.service";
import {Housinglocation} from "../housinglocation";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" alt="exterion" class="listing-photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-featues">
        <h2 class="section-heading">About this housing</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi : {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <button class="primary" type="button">Apply now </button>
      </section>
    </article> `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService =inject(HousingService);
  housingLocation : Housinglocation  | undefined;
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }
}
