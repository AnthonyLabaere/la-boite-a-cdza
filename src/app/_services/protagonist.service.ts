import {Injectable} from '@angular/core';
import { ProtagonistData, ProtagonistSumUp, SoundData, Protagonist } from '../entities';
import { HttpClient } from '@angular/common/http';
import { SoundService } from './sound.service';

@Injectable()
export class ProtagonistService {

    private protagonistsData: ProtagonistData[];
    private protagonists: Protagonist[] = [];
    private protagonistsSumUp: ProtagonistSumUp[];

    constructor(private http: HttpClient, private soundService: SoundService) {}

    public getProtagonist(id: number): Promise<Protagonist> {
        let protagonist = _.find(this.protagonists, (protagonist: Protagonist) => {
            return protagonist.id === id;
        });

        if (protagonist) {
            return Promise.resolve(protagonist);
        } else {
            let protagonistsData: ProtagonistData[];
            return this.getProtagonistsData()
                .then((protagonistsDataTmp: ProtagonistData[]) => {
                    protagonistsData = protagonistsDataTmp;
                    return this.soundService.getSoundsData();
                })
                .then((soundsData: SoundData[]) => {
                    return Promise.resolve(this.buildProtagonist(id, protagonistsData, soundsData));
                });
        }
    }

    public getProtagonistsSumUp(): Promise<ProtagonistData[]> {
        if (this.protagonistsSumUp) {
            return Promise.resolve(this.protagonistsSumUp);
        } else {
            return this.getProtagonistsData()
                .then((protagonists: ProtagonistData[]) => {
                    return Promise.resolve(this.buildProtagonistsSumUp(protagonists))
                });
        }
    }

    private getProtagonistsData(): Promise<ProtagonistData[]> {
        if (this.protagonistsData) {
            return Promise.resolve(this.protagonistsData);
        } else {
            return new Promise(resolve => {
                this.http.get("../assets/data/protagonists.json")
                .subscribe(
                    (protagonistsData: ProtagonistData[]) => {
                        this.protagonistsData = protagonistsData;
    
                        resolve(protagonistsData);
                    },
                    error => {}
                );
            });
        }
    }
    
    private buildProtagonistsSumUp(protagonistsData: ProtagonistData[]): ProtagonistSumUp[] {
        const protagonistsSumUp: ProtagonistSumUp[] = [];

        protagonistsData.forEach((protagonistData: ProtagonistData) => {
            protagonistsSumUp.push(ProtagonistSumUp.constructFromData(protagonistData));
        });

        return protagonistsSumUp;
    }

    private buildProtagonist(id: number, protagonistsData: ProtagonistData[], soundsData: SoundData[]): Protagonist {
        const protagonistData:ProtagonistData = _.find(protagonistsData, (protagonistData: ProtagonistData) => {
            return protagonistData.id === id;
        });
        const protagonistSoundsData:SoundData[] = soundsData.filter((soundData: SoundData) => {
            return soundData.protagonistId === id;
        });

        const protagonist = Protagonist.constructFromData(protagonistData, protagonistSoundsData);

        // Sauvegarde de l'épisode
        this.protagonists.push(protagonist);

        return protagonist;
    }
}