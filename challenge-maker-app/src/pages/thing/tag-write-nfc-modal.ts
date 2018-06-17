import {AfterViewInit, ApplicationRef, Component} from '@angular/core';

import {NavParams, ViewController} from 'ionic-angular';
import {Ndef, NFC} from "@ionic-native/nfc";

@Component({
  selector: 'page-tag-write-nfc-modal',
  templateUrl: 'tag-write-nfc-modal.html'
})
export class TagWriteNfcModalPage implements AfterViewInit {
  steps: any = {
    0: {
      'message': 'Touch an NFC tag with your device to write the action into it.',
      'image': 'assets/imgs/tap-and-go.gif'
    },
    1: {
      'message': 'Tag Empty',
      'image': ''
    },
    2: {
      'message': 'The action has been written to the NFC Tag.',
    }
  };

  currentStep: number = 0;
  tagWritten: boolean = false;

  protected url: any = null;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public nfc: NFC,
    public ndef: Ndef,
    private applicationRef: ApplicationRef
  ) {
  }

  ngAfterViewInit() {
    var subscription = this.nfc.addNdefListener(() => {
      console.log('successfully attached ndef listener');
      this.currentStep = 0;
    }, (err) => {
      console.log('error attaching ndef listener', err);
    }).subscribe((event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));

      this.currentStep = 1;
      let messages = [
      ];


      messages.push(this.ndef.uriRecord(this.params.data.url, ''));

      this.nfc.write(messages).then((success) => {
        this.currentStep = 2;
        this.tagWritten = true;
        subscription.unsubscribe();
        this.applicationRef.tick();
        console.log('Success: ' + JSON.stringify(success));
        console.log('Step: ' + this.currentStep);
      }).catch((error) => {
        console.log('Error: ' + JSON.stringify(error));
      });
    });
  }

  changeStep() {
    this.currentStep++;
  }

  dismiss(goToActionList: boolean = false) {
    this.viewCtrl.dismiss({
      tagWritten: this.tagWritten,
      goToActionList: goToActionList
    });
  }
}
