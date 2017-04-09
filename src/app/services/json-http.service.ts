import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {Configuration} from "../app.configuration";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class JsonHttp {

  private headers: Headers;

  constructor(private $http: Http, private configuration: Configuration) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  get<T>(relativeUrl: String, options?: RequestOptionsArgs): Observable<T> {
    const url = this.buildUrl(relativeUrl);

    return this.$http.get(url, JsonHttp.appendJsonHeaders(options))
      .map((r: Response) => <T>r.json());
  }

  post<T>(relativeUrl: String, body: any, options?: RequestOptionsArgs) {
    const url = this.buildUrl(relativeUrl);

    return this.$http.post(url, body, JsonHttp.appendJsonHeaders(options))
      .map((r: Response) => <T>r.json());
  }

  private buildUrl(relativeUrl: String) {
    return (this.configuration.serverUrl + '/' + relativeUrl).replace(/\/+/, '/');
  }

  private static appendJsonHeaders(options: RequestOptionsArgs) {
    const newHeaders = new Headers(Object.assign({}, (options || {}).headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }));

    return Object.assign({}, options, {
      headers: newHeaders
    });
  }
}
