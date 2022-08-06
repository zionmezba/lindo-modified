import { UpdateInformations } from '../update/update-informations.interface';
export declare class Api {
    static apiUrl: string;
    static getRemoteVersion(): Promise<Object | any>;
    static getUpdateInformations(): Promise<UpdateInformations | any>;
}
