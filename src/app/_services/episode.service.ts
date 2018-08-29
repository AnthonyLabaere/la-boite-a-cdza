import {Injectable} from '@angular/core';
import { EpisodeData, EpisodeSumUp, Episode } from '../entities';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';

@Injectable()
export class EpisodeService {

    private episodesData: EpisodeData[];
    private episodes: Episode[] = [];
    private episodesSumUp: EpisodeSumUp[];

    constructor(private http: HttpClient) {}

    public getEpisode(id: number): Promise<Episode> {
        let episode = _.find(this.episodes, (episode: Episode) => {
            return episode.id === id;
        });

        if (episode) {
            return Promise.resolve(episode);
        } else if (this.episodesData) {
            return Promise.resolve(this.buildEpisode(id));
        } else {
            return this.loadEpisodesData()
                .then((episodes: EpisodeData[]) => {
                    return Promise.resolve(this.buildEpisode(id))
                });
        }
    }

    public getEpisodesSumUp(): Promise<EpisodeData[]> {
        if (this.episodesSumUp) {
            return Promise.resolve(this.episodesSumUp);
        } else if (this.episodesData) {
            return Promise.resolve(this.buildEpisodesSumUp());
        } else {
            return this.loadEpisodesData()
                .then((episodes: EpisodeData[]) => {
                    return Promise.resolve(this.buildEpisodesSumUp())
                });
        }
    }

    private loadEpisodesData(): Promise<EpisodeData[]> {
        return new Promise(resolve => {
            this.http.get("../assets/data/episodes.json")
            .subscribe(
                (episodesData: EpisodeData[]) => {
                    this.episodesData = episodesData;

                    resolve(episodesData);
                },
                error => {}
            );
        });
    }
    
    private buildEpisodesSumUp(): EpisodeSumUp[] {
        const episodesSumUp: EpisodeSumUp[] = [];

        this.episodesData.forEach((episodeData: EpisodeData) => {
            episodesSumUp.push(EpisodeSumUp.constructFromData(episodeData));
        });

        return episodesSumUp;
    }
    
    private buildEpisode(id: number): Episode {
        const episodeData = _.find(this.episodesData, (episodeData: EpisodeData) => {
            return episodeData.id === id;
        });

        const episode = Episode.constructFromData(episodeData);

        // Sauvegarde de l'épisode
        this.episodes.push(episode);

        return episode;
    }
}