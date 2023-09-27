import { IFormClient } from "./IFormClient";

export interface IBaseFormControlProps
{
    id: string;
    label?: string;
    client: IFormClient;
    defaultValue?: string;
}