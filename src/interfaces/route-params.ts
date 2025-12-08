import { ExpansionData } from "./ItemExpansion.types";
import { CardData } from "./ItemCard.types";

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