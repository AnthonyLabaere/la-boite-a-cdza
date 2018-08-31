import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { TranslateService } from '@ngx-translate/core';
import { Events, Platform } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { EpisodesPage } from '../pages/episodes/episodes';
import { ProtagonistsPage } from '../pages/protagonists/protagonists';

@Component({
  templateUrl: 'app.html'
})
export class LaBoiteACDZAApp {

  public static ON_TABS_CHANGE = 'tabs:change';
  public static EPISODES_TAB_ID = 't0-0';
  public static PROTAGONISTS_TAB_ID = 't0-1';
  public static ABOUT_TAB_ID = 't0-2';

  episodesTab: any = EpisodesPage;
  protagonistsTab: any = ProtagonistsPage;
  aboutTab: any = AboutPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private screenOrientation: ScreenOrientation, translate: TranslateService, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        .catch(() => {});

      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('fr');
  
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('fr');
    });
  }

  public onTabsChange(event: any) {
    this.events.publish(LaBoiteACDZAApp.ON_TABS_CHANGE, event.id);
  }
}

