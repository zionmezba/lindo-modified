import { MainWindow } from './windows/main-window';
export declare class Application {
    static mainWindows: MainWindow[];
    static appPath: string;
    static userDataPath: string;
    static version: string;
    static remoteBuildVersion: string;
    static remoteAppVersion: string;
    static canAddWindow: boolean;
    static skipAuthentication: boolean;
    static isAuthenticated: boolean;
    static masterPassword: string;
    static run(): void;
    static addWindow(): void;
}
