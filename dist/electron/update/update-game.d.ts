import { Versions } from './versions.interface';
export declare class UpdateGame {
    static updateWindow: Electron.BrowserWindow;
    static officialUpdate(): Promise<Versions>;
}
