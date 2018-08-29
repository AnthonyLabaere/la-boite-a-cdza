import {Injectable} from '@angular/core';
import { EpisodeData, ProtagonistData, SoundData, EpisodeSumUp } from '../entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EpisodeService {

    private episodesData: EpisodeData[];
    private episodesSumUp: EpisodeSumUp[];

    private protagonistsData: ProtagonistData[];
    private protagonistsSumUp: EpisodeSumUp[];

    private soundsData: SoundData[];

    constructor(private http: HttpClient) {}

    ngOnInit(){
        
    }
    
    public getEpisodesSumUp(): Promise<EpisodeData[]> {
        if (this.episodesSumUp) {
            return Promise.resolve(this.episodesSumUp);
        } else if (this.episodesData) {
            return Promise.resolve(this.buildEpisodesSumUp(this.episodesData));
        } else {
            return this.loadEpisodesData()
                .then((episodes: EpisodeData[]) => {
                    return Promise.resolve(this.buildEpisodesSumUp(episodes))
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
    
    private buildEpisodesSumUp(episodesData: EpisodeData[]): EpisodeSumUp[] {
        const episodesSumUp: EpisodeSumUp[] = [];

        episodesData.forEach((episodeData: EpisodeData) => {
            episodesSumUp.push(EpisodeSumUp.constructFromData(episodeData));
        });

        return episodesSumUp;
    }
}