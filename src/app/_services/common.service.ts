import {Injectable} from '@angular/core';
import { EpisodeData, ProtagonistData, SoundData } from '../../app/entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService {

    private episodes: EpisodeData[];
    private protagonists: ProtagonistData[];
    private sounds: SoundData[];

    constructor(private http: HttpClient) {}
    
    public getEpisodes(): EpisodeData[] {
        return this.episodes;
    }

    public loadEpisodes(callback : (episodes: EpisodeData[]) => void): void {
        this.http.get("../assets/data/episodes.json").subscribe(
            (episodes: EpisodeData[]) => {
                this.episodes = episodes;

                callback(episodes);
            }, 
            error => {
                console.log("Impossible de charger le fichier episodes.json");
            }
        );
    }
    
    public getProtagonists(): ProtagonistData[] {
        return this.protagonists;
    }

    public loadProtagonists(callback : (protagonists: ProtagonistData[]) => void): void {
        this.http.get("../assets/data/episodes.json").subscribe(
            (protagonists: ProtagonistData[]) => {
                this.protagonists = protagonists;

                callback(protagonists);
            }, 
            error => {
                console.log("Impossible de charger le fichier protagonists.json");
            }
        );
    }
    
    public getSounds(): SoundData[] {
        return this.sounds;
    }

    public loadSounds(callback : (sounds: SoundData[]) => void): void {
        this.http.get("../assets/data/sounds.json").subscribe(
            (sounds: SoundData[]) => {
                this.sounds = sounds;

                callback(sounds);
            }, 
            error => {
                console.log("Impossible de charger le fichier sounds.json");
            }
        );
    }
}