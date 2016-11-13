import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public serverHost: string = "";
  public apiBasePath: string = "assets/json/";
  public serverUrl = this.serverHost + this.apiBasePath;
}
