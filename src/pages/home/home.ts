import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, NgZone } from '@angular/core';
import { Events, IonicPage } from 'ionic-angular';
import { LaBoiteACDZAApp } from '../../app/app.component';
import { Sound } from '../../app/entities';
import { SoundService } from '../../app/_services/sound.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
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
export class HomePage {

  private seyaSound: Sound;

  constructor(private zone: NgZone, private events: Events, private soundService: SoundService) {
    this.seyaSound = new Sound(null, 0, null, 'plait-il', null);

    this.events.subscribe(LaBoiteACDZAApp.ON_TABS_CHANGE, (id: string) => {
      if (id !== LaBoiteACDZAApp.HOME_TAB_ID) {
        this.stopPlayingSound();
      }
    });
  }

  private stopPlayingSound() {
    this.seyaSound.state = 'inactive';
    this.soundService.stopSound(this.seyaSound);
  }

  public onSeyaClick() {
    if (this.seyaSound.state === 'active') {
      this.seyaSound.state = 'inactive';
      this.soundService.stopSound(this.seyaSound);
    } else {
      this.seyaSound.state = 'active';

      this.soundService.playSound(this.seyaSound, () => {
        this.zone.run(() => {
          this.seyaSound.state = 'inactive';
        });
      });
    }
  }

}
