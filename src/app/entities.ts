
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
    logo: Image;

    constructor(id: number, episodeId: number, protagonistId: number, title: string, logo?: Image) {
        this.id = id;
        this.episodeId = episodeId;
        this.protagonistId = protagonistId;
        this.title = title;
        this.logo = logo;
    }
}

// endRegion

//region Utilitaires

export class Image {
    fileName: string;
    description: string;
}

export class LocalizedString {
    default: string;
    fr: string;
    en: string;

    constructor(fr: string, en: string) {
        
    }
}

// endRegion