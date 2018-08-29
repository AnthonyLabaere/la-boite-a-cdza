import {Injectable} from '@angular/core';
import { SoundData, Sound } from '../entities';
import { HttpClient } from '@angular/common/http';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class SoundService {

    private static SOUNDS_DATA_FILE_PATH = '../assets/data/sounds.json';

    public static AUDIO_FILES_PATH = 'assets/sounds/';
    public static AUDIO_FILE_EXTENSION = '.mp3';

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

    public playSound(sound: Sound, callbackDonePlaying: () => void) {
        this.nativeAudio.preloadSimple(sound.fileName, SoundService.AUDIO_FILES_PATH + sound.episodeId + '/' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
            .then(
                () => {
                    this.nativeAudio.play(sound.fileName, () => {
                        callbackDonePlaying();
                        this.nativeAudio.unload(sound.fileName);
                    });
                }, 
                () => {
                    this.nativeAudio.unload(sound.fileName);
                    callbackDonePlaying();
                    console.log('Impossible de charger le fichier ' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
                });
    }
}