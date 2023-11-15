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
   * return the corresponding houses based of id
   * @param id
   */
  async getHousingLocationById(id: Number): Promise<Housinglocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  /**
   * check parameters and to the application table
   * @param firstName
   * @param lastName
   * @param email
   */
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(firstName,lastName,email)
  }

  /**
   * return the promise with housingLocation based on city
   * @param cityValue
   */

  async getHousingLocationByCity(cityValue: string):Promise<Housinglocation[] | undefined> {
    if(!cityValue) return ;
     const data = await fetch(`${this.url}/?city_like=${cityValue}`);
    return await data.json();
  }
}
