import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {HousingService} from "../housing.service";
import {Housinglocation} from "../housinglocation";
import {FormGroup, FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
        <form action="" [formGroup]="applyForm" (submit)="submitApplication()">
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" formControlName="firstName">
            
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" formControlName="lastName"> 
            
            <label for="email">Email</label>
            <input type="text" id="email" formControlName="email">
            <button class="primary" type="submit">Apply Now</button>
        </form>      
      
      </section>
    </article> `,
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService =inject(HousingService);
  housingLocation : Housinglocation  | undefined;
  applyForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
      }
  );
  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

    /**
     * checks input of form and submit
     */
    submitApplication() {
        this.housingService.submitApplication(
            this.applyForm.value.firstName ?? '',
            this.applyForm.value.lastName ?? '',
            this.applyForm.value.email ?? '',
        )
        this.applyForm.reset();
    }
}
