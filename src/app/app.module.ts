import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NativeAudio } from '@ionic-native/native-audio';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { EpisodePage } from '../pages/episode/episode';
import { EpisodesPage } from '../pages/episodes/episodes';
import { HomePage } from '../pages/home/home';
import { ProtagonistPage } from '../pages/protagonist/protagonist';
import { ProtagonistsPage } from '../pages/protagonists/protagonists';
import { LaBoiteACDZAApp } from './app.component';
import { EpisodeService } from './_services/episode.service';
import { ProtagonistService } from './_services/protagonist.service';
import { SoundService } from './_services/sound.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LaBoiteACDZAApp,
    HomePage,
    EpisodesPage,
    EpisodePage,
    AboutPage,
    ProtagonistsPage,
    ProtagonistPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(LaBoiteACDZAApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LaBoiteACDZAApp,
    HomePage,
    EpisodesPage,
    EpisodePage,
    AboutPage,
    ProtagonistsPage,
    ProtagonistPage
  ],
  providers: [
    NativeAudio,
    ScreenOrientation,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EpisodeService,
    ProtagonistService,
    SoundService
  ]
})
export class AppModule {}
