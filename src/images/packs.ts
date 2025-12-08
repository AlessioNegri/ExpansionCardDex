type PackImagesType =
{
    [key: string]: { [index: number]: ReturnType<typeof require> };
};

const packImages : PackImagesType =
{
    MEG:
    {
        0: require('../../assets/packs/MEG/00.png'),
        1: require('../../assets/packs/MEG/01.png'),
        2: require('../../assets/packs/MEG/02.png'),
        3: require('../../assets/packs/MEG/03.png'),
        4: require('../../assets/packs/MEG/04.png'),
    }
};

export { packImages };