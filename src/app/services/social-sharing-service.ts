import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Platform} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Observable} from "rxjs";

@Injectable()
export class SocialSharingService {
  whatsAppEnabled: Observable<boolean>;
  facebookEnabled: Observable<boolean>;

  constructor(private platform: Platform, private socialSharing: SocialSharing) {
    const nativeEnabled = Observable.of(platform.is('core'))
      .filter(chrome => !chrome);

    this.whatsAppEnabled = nativeEnabled
      .flatMap(() => Observable.fromPromise(socialSharing.canShareVia('whatsapp')));

    this.facebookEnabled = nativeEnabled
      .flatMap(() => Observable.fromPromise(socialSharing.canShareVia('facebook')));
  }

  shareViaWhatsApp(message: string, image: string, url: string) {
    return this.whatsAppEnabled
      .switchMap(enabled => enabled ?
        Observable.fromPromise(this.socialSharing.shareViaWhatsApp(message, image, url)) :
        Observable.throw('WhatsApp not supported')
      );
  }
}
