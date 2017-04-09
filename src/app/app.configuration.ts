import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  private serverHost: string = "";
  private apiBasePath: string = "assets/json/";
  public serverUrl = this.serverHost + this.apiBasePath;
}
