import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SocialSharingService} from "../../services/social-sharing-service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'share-via-whatsapp-button',
  templateUrl: 'share-via-whatsapp-button.component.html'
})
export class ShareViaWhatsappButtonComponent {
  @Input() input: any;
  @Input() message: string;
  @Input() url: string;
  @Input() image: string;

  @Output() onShared = new EventEmitter();

  whatsAppEnabled: Observable<boolean>;

  constructor(private socialSharing: SocialSharingService) {
    this.whatsAppEnabled = socialSharing.whatsAppEnabled;
  }

  share() {
    console.log('sharibng: ' + this.getValue(this.input, this.message));
    this.socialSharing.shareViaWhatsApp(this.getValue(this.input, this.message), this.getValue(this.input, this.image), this.getValue(this.input, this.url))
      .subscribe(() => this.onShared.emit(this.input), e => console.log(e))
  }

  private getValue(input: any, type: any): string {
    if (typeof type === 'function') {
      return type.apply(this, [input]);
    } else if (typeof type === 'string') {
      return type;
    }
    return null;
  }
}
