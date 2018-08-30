import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private iab: InAppBrowser) {}

  public onYoutubeClick() {
    this.iab.create('https://www.youtube.com/user/CDZAbridged/videos');
  }
}
