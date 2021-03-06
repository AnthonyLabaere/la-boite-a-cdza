import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProtagonistSumUp } from '../../app/entities';
import { ProtagonistService } from '../../app/_services/protagonist.service';
import { ProtagonistPage } from '../protagonist/protagonist';

@Component({
  selector: 'page-protagonists',
  templateUrl: 'protagonists.html'
})
export class ProtagonistsPage implements OnInit {

  public protagonists: ProtagonistSumUp[] = [];

  constructor(public navCtrl: NavController, private protagonistService: ProtagonistService) {
    
  }

  ngOnInit(){
    this.protagonistService.getProtagonistsSumUp()
      .then((protagonistsSumUp: ProtagonistSumUp[]) => {
        this.protagonists = protagonistsSumUp.filter(protagonist => {
          return protagonist.logo.fileName.length > 0;
        });
      });
  }

  public onProtagonistClick(protagonistId: number) {
    this.navCtrl.push(ProtagonistPage, {'protagonistId': protagonistId});
  }

}
