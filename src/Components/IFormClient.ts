

export interface IFormClient
{
    setFormControlValue(id: string, value: string): void;
    getFormControlValue(id: string): string | undefined;
}
