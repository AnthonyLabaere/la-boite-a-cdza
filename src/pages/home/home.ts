import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
import { Events } from 'ionic-angular';
import { LaBoiteACDZAApp } from '../../app/app.component';
import { Sound } from '../../app/entities';
import { SoundService } from '../../app/_services/sound.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('sound', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active',   style({
        transform: 'scale(1.05)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class HomePage {

  private seyaSound: Sound;

  public playingSound: Sound;

  constructor(private zone: NgZone, private events: Events, private soundService: SoundService) {
    this.seyaSound = new Sound(null, 0, null, 'plait-il', null);

    this.events.subscribe(LaBoiteACDZAApp.ON_TABS_CHANGE, (id: string) => {
      if (id !== LaBoiteACDZAApp.HOME_TAB_ID) {
        this.stopPlayingSound();
      }
    });
  }

  private stopPlayingSound() {
    if (this.playingSound) {
      this.seyaSound.state = 'inactive';
      this.soundService.stopSound(this.playingSound);
      this.playingSound = undefined;
    }
  }

  public onSeyaClick(sound: Sound) {
    if (sound.state === 'active') {
      this.playingSound = undefined;

      sound.state = 'inactive';
      this.soundService.stopSound(sound);
    } else {
      this.playingSound = sound;

      sound.state = 'active';

      this.soundService.playSound(sound, () => {
        this.zone.run(() => {
          if (this.playingSound) {
            this.playingSound = undefined;
          }

          sound.state = 'inactive';
        });
      });
    }
  }

}
