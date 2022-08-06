import { Application } from '../application';
import { ShortCuts } from '../core/shortcuts';
import { UserAgent } from '../core/user-agent';
export declare class MainWindow {
    private static count;
    win: Electron.BrowserWindow;
    shortCuts: ShortCuts;
    userAgent: UserAgent;
    private application;
    private menu;
    private events;
    constructor(application: Application);
    reloadSettings(): void;
    reloadShortcut(): void;
    run(): void;
}
