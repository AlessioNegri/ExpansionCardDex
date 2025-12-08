type TypeImagesType =
{
    [key: string]: ReturnType<typeof require>;
};

const typeImages : TypeImagesType =
{
    'colorless': require('../../assets/types/colorless.webp'),
    'dark': require('../../assets/types/dark.webp'),
    'dragon': require('../../assets/types/dragon.webp'),
    'electric': require('../../assets/types/electric.webp'),
    'fairy': require('../../assets/types/fairy.webp'),
    'fighting': require('../../assets/types/fighting.webp'),
    'fire': require('../../assets/types/fire.webp'),
    'grass': require('../../assets/types/grass.webp'),
    'psychic': require('../../assets/types/psychic.webp'),
    'steel': require('../../assets/types/steel.webp'),
    'water': require('../../assets/types/water.webp')
};

export { typeImages };