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

    // Enregistrement en cours de lecture
    private playingSoundKey: string;
    private playingSoundDonePlayingCallBack: () => void;

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

    public playSound(sound: Sound, donePlayingCallback: () => void) {
        if (this.playingSoundKey) {
            // Arrêt de l'enregistrement en cours
            this.nativeAudio.stop(this.playingSoundKey);
            this.nativeAudio.unload(this.playingSoundKey);

            this.playingSoundKey = undefined;
            if (this.playingSoundDonePlayingCallBack) {
                this.playingSoundDonePlayingCallBack();
            }
        }

        this.playingSoundKey = sound.fileName;
        this.playingSoundDonePlayingCallBack = donePlayingCallback;

        // Lancement de l'enregistrement
        this.nativeAudio.preloadSimple(sound.fileName, SoundService.AUDIO_FILES_PATH + sound.episodeId + '/' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
            .then(
                () => {
                    this.nativeAudio.play(sound.fileName, () => {
                        donePlayingCallback();
                        this.nativeAudio.unload(sound.fileName);
                    });
                }, 
                () => {
                    this.nativeAudio.unload(sound.fileName);
                    // donePlayingCallback();
                    console.log('Impossible de charger le fichier ' + sound.fileName + SoundService.AUDIO_FILE_EXTENSION)
                });
    }

    public stopSound(sound: Sound) {
        // Arrêt de l'enregistrement en cours
        this.nativeAudio.stop(sound.fileName);
        this.nativeAudio.unload(sound.fileName);

        this.playingSoundKey = undefined;
        this.playingSoundDonePlayingCallBack = undefined;
    }
}