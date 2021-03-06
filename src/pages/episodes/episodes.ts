import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EpisodeSumUp } from '../../app/entities';
import { EpisodeService } from '../../app/_services/episode.service';
import { EpisodePage } from '../episode/episode';

@Component({
  selector: 'page-episodes',
  templateUrl: 'episodes.html'
})
export class EpisodesPage implements OnInit {

  public episodes: EpisodeSumUp[] = [];

  constructor(public navCtrl: NavController, private episodeService: EpisodeService) {}

  ngOnInit(){
    this.episodeService.getEpisodesSumUp()
      .then((episodesSumUp: EpisodeSumUp[]) => {
        this.episodes = episodesSumUp;
      });
  }

  public onEpisodeClick(episodeId: number) {
    this.navCtrl.push(EpisodePage, {'episodeId': episodeId});
  }
}
