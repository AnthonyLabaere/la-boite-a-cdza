import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EpisodeService } from '../../app/_services/episode.service';
import { EpisodeSumUp } from '../../app/entities';
import { EpisodePage } from '../episode/episode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  public episodes: EpisodeSumUp[] = [];

  constructor(public navCtrl: NavController, private episodeService: EpisodeService) {
    
  }

  ngOnInit(){
    this.episodeService.getEpisodesSumUp()
      .then((episodesSumUp: EpisodeSumUp[]) => {
        this.episodes = episodesSumUp;
      });
  }

  public onEpisodeClick(episodeId: number) {
    this.navCtrl.push(EpisodePage, {episodeId: episodeId});
  }

}
