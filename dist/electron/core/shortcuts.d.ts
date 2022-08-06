/** TODO a déplacer dans l'app */
export declare class ShortCuts {
    private win;
    private isBinded;
    constructor(win: Electron.BrowserWindow);
    bindAll(): void;
    reload(): void;
    enable(): void;
    disable(): void;
    static convert(shortcut: string): string;
}
