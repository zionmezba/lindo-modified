/// <reference types="node" />
export declare class Settings {
    static init(): void;
    static resetSettings(): void;
    static reloadSettings(): void;
    static reloadShortcut(): void;
    static getAppConfig(): {
        gamePath: string;
        appPath: string;
        platform: NodeJS.Platform;
        language: any;
    };
    static resetGame(): void;
    static clearCache(): void;
}
