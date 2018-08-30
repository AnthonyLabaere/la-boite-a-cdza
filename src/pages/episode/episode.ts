import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
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
  
  @ViewChild(Navbar) navBar: Navbar;

  public episode: Episode;

  private playingSound: Sound;

  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams, private episodeService: EpisodeService, private soundService: SoundService) {
      this.episodeService.getEpisode(this.navParams.get('episodeId'))
        .then((episode: Episode) => {
          this.episode = episode;
        });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      if (this.playingSound) {
        this.playingSound.state = 'inactive';
        this.soundService.stopSound(this.playingSound);
        this.playingSound = undefined;
      }
      this.navCtrl.pop();
    }
  }

  public onSoundClick(sound: Sound) {
    if (sound.state === 'active') {
      this.playingSound = undefined;

      sound.state = 'inactive';
      this.soundService.stopSound(sound);
    } else {
      this.playingSound = sound;

      sound.state = 'active';

      this.soundService.playSound(sound, () => {
        this.zone.run(() => {
          if (this.playingSound && this.playingSound.id === sound.id) {
            this.playingSound = undefined;
          }

          sound.state = 'inactive';
        });
      });
    }
  }

}
