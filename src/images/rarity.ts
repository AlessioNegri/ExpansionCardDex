type RarityImagesType =
{
    [key: string]: ReturnType<typeof require>;
};

const rarityImages : RarityImagesType =
{
    'C': require('../../assets/icons/material-symbols--circle.png'),
    'U': require('../../assets/icons/mynaui--diamond-solid.png'),
    'R': require('../../assets/icons/solar--star-bold.png'),
    'RR': require('../../assets/icons/solar--star-bold.png'),
    'AR': require('../../assets/icons/solar--star-bold.png'),
    'SR': require('../../assets/icons/solar--star-bold.png'),
    'SAR': require('../../assets/icons/solar--star-bold.png'),
    'IM': require('../../assets/icons/solar--star-bold.png'),
    'UR': require('../../assets/icons/solar--star-bold.png'),
    'S': require('../../assets/icons/solar--star-bold.png'),
    'SSR': require('../../assets/icons/solar--star-bold.png')
};

type RarityColorsType =
{
    [key: string]: string;
};

const rarityColors : RarityColorsType =
{
    'C': '#000000',
    'U': '#000000',
    'R': '#000000',
    'RR': '#000000',
    'AR': '#000000',
    'SR': '#000000',
    'SAR': '#000000',
    'IM': '#000000',
    'UR': '#000000',
    'S': '#000000',
    'SSR': '#000000'
};

export { rarityImages, rarityColors };