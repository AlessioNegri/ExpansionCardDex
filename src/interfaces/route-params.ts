import { ExpansionData } from "./ItemExpansion.types";

export type StackParamExpansions =
{
    ScreenExpansions: undefined;
    
    ScreenExpansion:
    {
        data: ExpansionData;
    };

    ScreenCards:
    {
        data: ExpansionData;
    };
};