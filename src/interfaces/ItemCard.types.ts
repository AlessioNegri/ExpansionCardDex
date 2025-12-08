import { ExpansionData } from "./ItemExpansion.types";

interface CardData
{
    id: string;
    name: string;
    type: string;
    rarity: string;
    illustrator: string;
    image?: string;
}

interface ItemCardProps
{
    item: CardData;
    index: number;
    gridView: boolean;
    expansion: ExpansionData;
    onSelectCard: (index : number, card: CardData) => void;
}

export
{
    CardData,
    ItemCardProps
};