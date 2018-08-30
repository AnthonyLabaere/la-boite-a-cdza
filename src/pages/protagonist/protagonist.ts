import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, NgZone, ViewChild } from '@angular/core';
import { Events, Navbar, NavController, NavParams } from 'ionic-angular';
import { LaBoiteACDZAApp } from '../../app/app.component';
import { Protagonist, Sound } from '../../app/entities';
import { ProtagonistService } from '../../app/_services/protagonist.service';
import { SoundService } from '../../app/_services/sound.service';

@Component({
  selector: 'page-protagonist',
  templateUrl: 'protagonist.html',
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
export class ProtagonistPage {

  public static PROTAGONIST_ID_PARAM_KEY = 'protagonistId';
  
  @ViewChild(Navbar) navBar: Navbar;

  public protagonist: Protagonist;

  private playingSound: Sound;

  constructor(private zone: NgZone, private navCtrl: NavController, private navParams: NavParams, private events: Events, 
    private protagonistService: ProtagonistService, private soundService: SoundService) {
        this.protagonistService.getProtagonist(this.navParams.get(ProtagonistPage.PROTAGONIST_ID_PARAM_KEY))
        .then((protagonist: Protagonist) => {
          this.protagonist = protagonist;
        });

        this.events.subscribe(LaBoiteACDZAApp.ON_TABS_CHANGE, (id: string) => {
          if (id !== LaBoiteACDZAApp.PROTAGONISTS_TAB_ID) {
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
