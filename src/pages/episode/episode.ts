import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { Episode, Sound } from '../../app/entities';
import { EpisodeService } from '../../app/_services/episode.service';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html'
})
export class EpisodePage {

  private static AUDIO_FILES_PATH = 'assets/sounds/';
  private static AUDIO_FILE_EXTENSION = '.mp3';

  public episode: Episode;

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeAudio: NativeAudio, private episodeService: EpisodeService) {
      this.episodeService.getEpisode(this.navParams.get('episodeId'))
        .then((episode: Episode) => {
          this.episode = episode;
        });
  }

  public onSoundClick(sound: Sound) {
    this.nativeAudio.preloadSimple(sound.fileName, EpisodePage.AUDIO_FILES_PATH + sound.fileName + EpisodePage.AUDIO_FILE_EXTENSION)
      .then((res: any) => {})
      .catch(error => {
        console.log('Impossible de charger le fichier ' + sound.fileName + EpisodePage.AUDIO_FILE_EXTENSION)
      });

    this.nativeAudio.play(sound.fileName)
    .then((res: any) => {})
    .catch(error => {
      console.log('Impossible de jouer le fichier ' + sound.fileName + EpisodePage.AUDIO_FILE_EXTENSION)
    });
  }

}
