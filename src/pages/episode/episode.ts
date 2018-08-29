import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Episode, Sound } from '../../app/entities';
import { EpisodeService } from '../../app/_services/episode.service';
import { SoundService } from '../../app/_services/sound.service';

@Component({
  selector: 'page-episode',
  templateUrl: 'episode.html',
  animations: [
    trigger('sound', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
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
    sound.state = 'active';

    this.soundService.playSound(sound, () => {
      console.log("callbackDonePlaying");
      sound.state = 'inactive';
    });
  }

}
