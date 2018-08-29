import {Injectable} from '@angular/core';
import { ProtagonistData, ProtagonistSumUp } from '../entities';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProtagonistService {

    private protagonistsData: ProtagonistData[];
    private protagonistsSumUp: ProtagonistSumUp[];

    constructor(private http: HttpClient) {}

    public getProtagonistsSumUp(): Promise<ProtagonistData[]> {
        if (this.protagonistsSumUp) {
            return Promise.resolve(this.protagonistsSumUp);
        } else if (this.protagonistsData) {
            return Promise.resolve(this.buildProtagonistsSumUp(this.protagonistsData));
        } else {
            return this.loadProtagonistsData()
                .then((protagonists: ProtagonistData[]) => {
                    return Promise.resolve(this.buildProtagonistsSumUp(protagonists))
                });
        }
    }

    private loadProtagonistsData(): Promise<ProtagonistData[]> {
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
    
    private buildProtagonistsSumUp(protagonistsData: ProtagonistData[]): ProtagonistSumUp[] {
        const protagonistsSumUp: ProtagonistSumUp[] = [];

        protagonistsData.forEach((protagonistData: ProtagonistData) => {
            protagonistsSumUp.push(ProtagonistSumUp.constructFromData(protagonistData));
        });

        return protagonistsSumUp;
    }
}