import {Injectable} from '@angular/core';
import { SoundData } from '../entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SoundService {

    private static SOUNDS_DATA_FILE_PATH = '../assets/data/sounds.json';

    private soundsData: SoundData[];

    constructor(private http: HttpClient) {}

    public getSoundsData(): Promise<SoundData[]> {
        if (this.soundsData) {
            return Promise.resolve(this.soundsData);
        } else {
            return new Promise(resolve => {
                this.http.get(SoundService.SOUNDS_DATA_FILE_PATH)
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