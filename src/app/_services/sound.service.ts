import {Injectable} from '@angular/core';
import { SoundData } from '../entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SoundService {

    private soundsData: SoundData[];

    constructor(private http: HttpClient) {}

    public getSoundsData(): Promise<SoundData[]> {
        if (this.soundsData) {
            return Promise.resolve(this.soundsData);
        } else {
            return new Promise(resolve => {
                this.http.get("../assets/data/sounds.json")
                .subscribe(
                    (soundsData: SoundData[]) => {
                        this.soundsData = soundsData;
    
                        resolve(soundsData);
                    },
                    error => {}
                );
            });
        }
    }
}