import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Episode, Sound } from '../../app/entities';
import { EpisodeService } from '../../app/_services/episode.service';
import { SoundService } from '../../app/_services/sound.service';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html'
})
export class EpisodePage {

  public episode: Episode;

  constructor(public navCtrl: NavController, public navParams: NavParams, private episodeService: EpisodeService, private soundService: SoundService) {
      this.episodeService.getEpisode(this.navParams.get('episodeId'))
        .then((episode: Episode) => {
          this.episode = episode;
        });
  }

  public onSoundClick(sound: Sound) {
    this.soundService.playSound(sound);
  }

}
