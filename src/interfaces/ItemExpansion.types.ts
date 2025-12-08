interface ExpansionData
{
    name: string;
    code: string;
    type: string;
    releaseDate: string;
    totalCards: number;
    regularCards: number;
    secretCards: number,
    image: string;
    packImages: string[];
}

interface SeriesData
{
    name: string;
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