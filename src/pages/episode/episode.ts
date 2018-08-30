import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Events } from 'ionic-angular';
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
import { LaBoiteACDZAApp } from '../../app/app.component';

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

  public static EPISODE_ID_PARAM_KEY = 'episodeId';
  
  @ViewChild(Navbar) navBar: Navbar;

  public episode: Episode;

  private playingSound: Sound;

  constructor(private zone: NgZone, private navCtrl: NavController, private navParams: NavParams, private events: Events, 
    private episodeService: EpisodeService, private soundService: SoundService) {
      this.episodeService.getEpisode(this.navParams.get(EpisodePage.EPISODE_ID_PARAM_KEY))
        .then((episode: Episode) => {
          this.episode = episode;
        });

        this.events.subscribe(LaBoiteACDZAApp.ON_TABS_CHANGE, (id: string) => {
          if (id !== LaBoiteACDZAApp.EPISODES_TAB_ID) {
            this.stopPlayingSound();
          }
        });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=> {
      this.stopPlayingSound();
      this.navCtrl.pop();
    }
  }

  private stopPlayingSound() {
    if (this.playingSound) {
      this.playingSound.state = 'inactive';
      this.soundService.stopSound(this.playingSound);
      this.playingSound = undefined;
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
