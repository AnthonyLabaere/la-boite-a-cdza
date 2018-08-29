import {Injectable} from '@angular/core';
import { SoundData, Sound } from '../entities';
import { HttpClient } from '@angular/common/http';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class SoundService {

    private static SOUNDS_DATA_FILE_PATH = '../assets/data/sounds.json';

    private static AUDIO_FILES_PATH = 'assets/sounds/';
    private static AUDIO_FILE_EXTENSION = '.mp3';

    private soundsData: SoundData[];

    constructor(private http: HttpClient, private nativeAudio: NativeAudio) {}

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

    public playSound(sound: Sound) {
        // TODO : jouer les mp3 d'une manière plus éléguante ?
        this.nativeAudio.preloadSimple(sound.fileName, SoundService.AUDIO_FILES_PATH + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
            .then((res: any) => {})
            .catch(error => {
                console.log('Impossible de charger le fichier ' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
            });
  
        this.nativeAudio.play(sound.fileName)
            .then((res: any) => {})
            .catch(error => {
                console.log('Impossible de jouer le fichier ' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
            });
    }
}