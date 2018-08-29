import {Injectable} from '@angular/core';
import { EpisodeData, ProtagonistData, SoundData, EpisodeSumUp } from '../../app/entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {

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

    // public loadEpisodesData(callback : (episodes: EpisodeData[]) => void): void {
    //     this.http.get("../assets/data/episodes.json").subscribe(
    //         (episodes: EpisodeData[]) => {
    //             this.episodes = episodes;

    //             callback(episodes);
    //         }, 
    //         error => {
    //             console.log("Impossible de charger le fichier episodes.json");
    //         }
    //     );
    // }
    
    // public getProtagonists(): ProtagonistData[] {
    //     return this.protagonists;
    // }

    // public loadProtagonistsData(callback : (protagonists: ProtagonistData[]) => void): void {
    //     this.http.get("../assets/data/episodes.json").subscribe(
    //         (protagonists: ProtagonistData[]) => {
    //             this.protagonists = protagonists;

    //             callback(protagonists);
    //         }, 
    //         error => {
    //             console.log("Impossible de charger le fichier protagonists.json");
    //         }
    //     );
    // }
    
    // public getSounds(): SoundData[] {
    //     return this.sounds;
    // }

    // public loadSoundsData(callback : (sounds: SoundData[]) => void): void {
    //     this.http.get("../assets/data/sounds.json").subscribe(
    //         (sounds: SoundData[]) => {
    //             this.sounds = sounds;

    //             callback(sounds);
    //         }, 
    //         error => {
    //             console.log("Impossible de charger le fichier sounds.json");
    //         }
    //     );
    // }
}