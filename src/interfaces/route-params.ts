import { ExpansionData, SeriesData } from "./ItemExpansion.types";

export type StackParamExpansions =
{
    ScreenExpansions: undefined;
    
    ScreenExpansion:
    {
        seriesData: SeriesData;
        data: ExpansionData;
    };

    ScreenCards:
    {
        seriesData: SeriesData;
        data: ExpansionData;
    };
};