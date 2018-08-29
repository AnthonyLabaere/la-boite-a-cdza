import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommonService } from '../../app/_services/common.service';
import { EpisodeSumUp } from '../../app/entities';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public episodes: EpisodeSumUp[] = [];

  constructor(public navCtrl: NavController, private commonService: CommonService) {
    
  }

  ngOnInit(){
    this.commonService.getEpisodesSumUp()
      .then((episodesSumUp: EpisodeSumUp[]) => {
        this.episodes = episodesSumUp;
      });
  }

  public onEpisodeClick(/*episode: Episode*/) {
    // this.navCtrl.push(EpisodePage, {episode: episode});
  }

}
