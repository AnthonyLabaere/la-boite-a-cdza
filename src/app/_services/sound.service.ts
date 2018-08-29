import {Injectable} from '@angular/core';
import { SoundData } from '../entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SoundService {

    private soundsData: SoundData[];

    constructor(private http: HttpClient) {}

    public getSoundsData(): SoundData[] {
        return this.soundsData;
    }

    public loadSoundsData(): Promise<SoundData[]> {
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