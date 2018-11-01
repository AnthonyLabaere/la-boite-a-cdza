
//region "DTO"

export class Episode {
    id: number;
    title: string;
    logo: Image;
    sounds: Sound[];

    constructor(id: number, title: string, logo: Image, sounds: Sound[]) {
        this.id = id;
        this.title = title;
        this.logo = logo;
        this.sounds = sounds;
    }

    public static constructFromData(episodeData: EpisodeData, soundsData: SoundData[]): Episode {
        const sounds:Sound[] = [];

        soundsData.forEach((soundData: SoundData) => {
            sounds.push(Sound.constructFromData(soundData));
        });

        return new Episode(episodeData.id, episodeData.title, episodeData.logo, sounds);
    }
}

export class EpisodeSumUp {
    id: number;
    title: string;
    logo: Image;

    constructor(id: number, title: string, logo: Image) {
        this.id = id;
        this.title = title;
        this.logo = logo;
    }

    public static constructFromData(episodeData: EpisodeData): EpisodeSumUp {
        return new EpisodeSumUp(episodeData.id, episodeData.title, episodeData.logo);
    }
}

export class Protagonist {
    id: number;
    name: string;
    logo: Image;
    sounds: Sound[];

    constructor(id: number, name: string, logo: Image, sounds: Sound[]) {
        this.id = id;
        this.name = name;
        this.logo = logo;
        this.sounds = sounds;
    }

    public static constructFromData(protagonistData: ProtagonistData, soundsData: SoundData[]): Protagonist {
        const sounds:Sound[] = [];

        soundsData.forEach((soundData: SoundData) => {
            sounds.push(Sound.constructFromData(soundData));
        });

        return new Protagonist(protagonistData.id, protagonistData.name, protagonistData.logo, sounds);
    }
}

export class ProtagonistSumUp {
    id: number;
    name: string;
    logo: Image;

    constructor(id: number, name: string, logo: Image) {
        this.id = id;
        this.name = name;
        this.logo = logo;
    }

    public static constructFromData(protagonistData: ProtagonistData): ProtagonistSumUp {
        return new ProtagonistSumUp(protagonistData.id, protagonistData.name, protagonistData.logo);
    }
}

export class Sound {
    id: number;
    episodeId: number; // Part of the logo' file path
    title: string;
    fileName: string;
    logo: Image;
    state: string = 'inactive';

    constructor(id: number, episodeId: number, title: string, fileName:string, logo?: Image) {
        this.id = id;
        this.episodeId = episodeId;
        this.title = title;
        this.fileName = fileName;
        this.logo = logo;
    }

    public static constructFromData(soundData: SoundData) {
        return new Sound(soundData.id, soundData.episodeId, soundData.title, soundData.fileName, soundData.logo);
    }
}

//region Data

export class EpisodeData {
    id: number;
    title: string;
    logo: Image;

    constructor(id: number, title: string, logo: Image) {
        this.id = id;
        this.title = title;
        this.logo = logo;
    }
}

export class ProtagonistData {
    id: number;
    name: string;
    logo: Image;

    constructor(id: number, name: string, logo: Image) {
        this.id = id;
        this.name = name;
        this.logo = logo;
    }
}

export class SoundData {
    id: number;
    episodeId: number;
    protagonistId: number;    
    title: string;
    fileName: string;
    logo: Image;

    constructor(id: number, episodeId: number, protagonistId: number, title: string, fileName: string, logo?: Image) {
        this.id = id;
        this.episodeId = episodeId;
        this.protagonistId = protagonistId;
        this.title = title;
        this.fileName = fileName;
        this.logo = logo;
    }
}

// endRegion

//region Utilitaires

export class Image {
    fileName: string;
    description: string;
}

// TODO : à utiliser pour avoir une véritable internationalisation
export class LocalizedString {
    default: string;
    fr: string;
    en: string;

    constructor(_default: string, fr: string, en: string) {
        this.default = _default;
        this.fr = fr;
        this.en = en;
    }
}

// endRegion