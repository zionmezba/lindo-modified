import { UpdateInformations } from './update-informations.interface';
export declare class UpdateApp {
    static check(response: UpdateInformations): boolean;
    static update(response: UpdateInformations): Promise<UpdateInformations>;
    static openUpdateInfo(response: UpdateInformations): Promise<UpdateInformations>;
}
