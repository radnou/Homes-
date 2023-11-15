import { Injectable } from "@angular/core";
import { Housinglocation } from "./housinglocation";
@Injectable({
  providedIn: "root",
})
export class HousingService {
url = 'http://localhost:3000/locations';
  constructor() {}

  /**
   * return all the houses
   */
  async getAllHousingLocation(): Promise<Housinglocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  /**
   * return the corresponding house based of id
   * @param id
   */
  async getHousingLocationById(id: Number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  /**
   * check paremeters and to the apply table
   * @param firstName
   * @param lastName
   * @param email
   */
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName,lastName,email)
  }
}
