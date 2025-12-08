type ExpansionImagesType =
{
    [key: string]: ReturnType<typeof require>;
};

const expansionImages : ExpansionImagesType =
{
    SVI: require('../../assets/expansions/SVI.webp'),
    PAL: require('../../assets/expansions/PAL.png'),
    OBF: require('../../assets/expansions/OBF.png'),
    MEW: require('../../assets/expansions/MEW.webp'),
    PAR: require('../../assets/expansions/PAR.png'),
    PAF: require('../../assets/expansions/PAF.webp'),
    TEF: require('../../assets/expansions/TEF.webp'),
    TWM: require('../../assets/expansions/TWM.webp'),
    SFA: require('../../assets/expansions/SFA.webp'),
    SCR: require('../../assets/expansions/SCR.png'),
    SSP: require('../../assets/expansions/SSP.png'),
    PRE: require('../../assets/expansions/PRE.png'),
    JTG: require('../../assets/expansions/JTG.png'),
    DRI: require('../../assets/expansions/DRI.webp'),
    BLK: require('../../assets/expansions/BLK.png'),
    WHT: require('../../assets/expansions/WHT.webp'),

    MEG: require('../../assets/expansions/MEG.webp'),
    PFL: require('../../assets/expansions/PFL.webp'),
    ASC: require('../../assets/expansions/ASC.png'),
};

export { expansionImages };