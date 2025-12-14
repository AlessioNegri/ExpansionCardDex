interface ExpansionData
{
    name: string;
    symbol: string;
    code: string;
    type: string;
    releaseDate: string;
    totalCards: number;
    regularCards: number;
    secretCards: number;
    fromColor: string;
    toColor: string;
    image: string;
    packImages: string[];
}

interface SeriesData
{
    name: string;
    fromColor: string;
    toColor: string;
    expansions: ExpansionData[];
}

interface ItemExpansionProps
{
    item: SeriesData;
    index: number;
    onPressExpansion: (expansion : ExpansionData) => void;
}

export
{
    ExpansionData,
    SeriesData,
    ItemExpansionProps
};