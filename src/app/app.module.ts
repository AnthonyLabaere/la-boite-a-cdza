import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { EpisodesPage } from '../pages/episodes/episodes';
import { EpisodeService } from './_services/episode.service';
import { ProtagonistService } from './_services/protagonist.service';
import { SoundService } from './_services/sound.service';
import { EpisodePage } from '../pages/episode/episode';
import { NativeAudio } from '@ionic-native/native-audio';
import { ProtagonistsPage } from '../pages/protagonists/protagonists';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    MyApp,
    EpisodesPage,
    EpisodePage,
    ProtagonistsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
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
    MyApp,
    EpisodesPage,
    EpisodePage,
    ProtagonistsPage
  ],
  providers: [
    NativeAudio,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EpisodeService,
    ProtagonistService,
    SoundService
  ]
})
export class AppModule {}
