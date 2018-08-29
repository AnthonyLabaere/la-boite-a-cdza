import {Injectable} from '@angular/core';
import { EpisodeData, EpisodeSumUp, Episode, SoundData } from '../entities';
import { HttpClient } from '@angular/common/http';

import * as _ from 'lodash';
import { SoundService } from './sound.service';

@Injectable()
export class EpisodeService {

    private static EPISODES_DATA_FILE_PATH = '../assets/data/episodes.json';

    private episodesData: EpisodeData[];
    private episodes: Episode[] = [];
    private episodesSumUp: EpisodeSumUp[];

    constructor(private http: HttpClient, private soundService: SoundService) {}

    public getEpisode(id: number): Promise<Episode> {
        let episode = _.find(this.episodes, (episode: Episode) => {
            return episode.id === id;
        });

        if (episode) {
            return Promise.resolve(episode);
        } else {
            let episodesData: EpisodeData[];
            return this.getEpisodesData()
                .then((episodesDataTmp: EpisodeData[]) => {
                    episodesData = episodesDataTmp;
                    return this.soundService.getSoundsData();
                })
                .then((soundsData: SoundData[]) => {
                    return Promise.resolve(this.buildEpisode(id, episodesData, soundsData));
                });
        }
    }

    public getEpisodesSumUp(): Promise<EpisodeSumUp[]> {
        if (this.episodesSumUp) {
            return Promise.resolve(this.episodesSumUp);
        } else {
            return this.getEpisodesData()
                .then((episodesData: EpisodeData[]) => {
                    return Promise.resolve(this.buildEpisodesSumUp(episodesData));
                });
        }
    }

    private getEpisodesData(): Promise<EpisodeData[]> {
        if (this.episodesData) {
            return Promise.resolve(this.episodesData);
        } else {
            return new Promise(resolve => {
                this.http.get(EpisodeService.EPISODES_DATA_FILE_PATH)
                .subscribe(
                    (episodesData: EpisodeData[]) => {
                        this.episodesData = episodesData;
    
                        resolve(episodesData);
                    },
                    error => {}
                );
            });
        }
    }
    
    private buildEpisodesSumUp(episodesData: EpisodeData[]): EpisodeSumUp[] {
        const episodesSumUp: EpisodeSumUp[] = [];

        episodesData.forEach((episodeData: EpisodeData) => {
            episodesSumUp.push(EpisodeSumUp.constructFromData(episodeData));
        });

        return episodesSumUp;
    }
    
    private buildEpisode(id: number, episodesData: EpisodeData[], soundsData: SoundData[]): Episode {
        const episodeData:EpisodeData = _.find(episodesData, (episodeData: EpisodeData) => {
            return episodeData.id === id;
        });
        const episodeSoundsData:SoundData[] = soundsData.filter((soundData: SoundData) => {
            return soundData.episodeId === id;
        });

        const episode = Episode.constructFromData(episodeData, episodeSoundsData);

        // Sauvegarde de l'épisode
        this.episodes.push(episode);

        return episode;
    }
}