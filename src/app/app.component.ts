import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EpisodesPage } from '../pages/episodes/episodes';
import { TranslateService } from '@ngx-translate/core';
import { ProtagonistsPage } from '../pages/protagonists/protagonists';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  episodesTab: any = EpisodesPage;
  protagonistsTab: any = ProtagonistsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('fr');
  
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('fr');
    });
  }
}

