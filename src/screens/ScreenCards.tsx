import React from "react";
import { FlatList, Image, ImageSourcePropType, Modal, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamExpansions } from '../interfaces/route-params';
import { CardData } from '../interfaces/ItemCard.types';

import ItemCard from "../shared/ItemCard";

import SB from '../../assets/cards/serie_originale/SB.json';
import JU from '../../assets/cards/serie_originale/JU.json';
import FO from '../../assets/cards/serie_originale/FO.json';
import B2 from '../../assets/cards/serie_originale/B2.json';
import TR from '../../assets/cards/serie_originale/TR.json';
import G1 from '../../assets/cards/serie_originale/G1.json';
import G2 from '../../assets/cards/serie_originale/G2.json';

import N1 from '../../assets/cards/serie_neo/N1.json';
import N2 from '../../assets/cards/serie_neo/N2.json';
import N3 from '../../assets/cards/serie_neo/N3.json';
import N4 from '../../assets/cards/serie_neo/N4.json';

import LC from '../../assets/cards/serie_legendary_collection/LC.json';

import EX from '../../assets/cards/serie_e_card/EX.json';
import AQ from '../../assets/cards/serie_e_card/AQ.json';
import SK from '../../assets/cards/serie_e_card/SK.json';

import RS from '../../assets/cards/serie_ex/RS.json';
import SS from '../../assets/cards/serie_ex/SS.json';
import DR from '../../assets/cards/serie_ex/DR.json';
import MA from '../../assets/cards/serie_ex/MA.json';
import HL from '../../assets/cards/serie_ex/HL.json';
import FG from '../../assets/cards/serie_ex/FG.json';
import TRR from '../../assets/cards/serie_ex/TRR.json';
import DX from '../../assets/cards/serie_ex/DX.json';

import MEG from '../../assets/cards/megaevoluzione/MEG.json';
import PFL from '../../assets/cards/megaevoluzione/PFL.json';

import SVE from '../../assets/cards/energie/SVE.json';

import { LinearGradient } from "expo-linear-gradient";
import fetchCardPrice from "../utility/CardPrice";

export default function ScreenCards({ navigation, route } : NativeStackScreenProps<StackParamExpansions, "ScreenCards", undefined>)
{
    const [selectedCardIndex, setSelectedCardIndex] = React.useState<number | null>(null);

    const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);

    const [cardPrice, setCardPrice] = React.useState<string>('');

    const GridCard = React.memo( ( { item, index } : { item : CardData, index : number } ) =>
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            expansion={route.params.data}
                            onSelectCard={(index : number, card : CardData) => { setSelectedCardIndex(index); setSelectedCard(card); }}/>)

    React.useEffect(() =>
    {
        const getCardPrice = async () =>
        {
            if (selectedCard === null) return;

            setCardPrice(await fetchCardPrice(route.params.data.code, selectedCard));
        };

        getCardPrice();
    }, [selectedCard]);

    const handlePrev = () =>
    {
        if (selectedCardIndex === null) return;
        
        const prevIndex : number = (selectedCardIndex > 0) ? (selectedCardIndex - 1) : 0;
        
        setCardPrice('');
        setSelectedCardIndex(prevIndex);
        setSelectedCard(cardList[prevIndex]);
    };

    const handleNext = () =>
    {
        if (selectedCardIndex === null) return;

        const nextIndex : number = (selectedCardIndex + 1) % cardList.length;
        
        setCardPrice('');
        setSelectedCardIndex(nextIndex);
        setSelectedCard(cardList[nextIndex]);
    };

    var cardList : CardData[] = [];

    if      (route.params.data.code === 'SB') cardList = SB;
    else if (route.params.data.code === 'JU') cardList = JU;
    else if (route.params.data.code === 'FO') cardList = FO;
    else if (route.params.data.code === 'B2') cardList = B2;
    else if (route.params.data.code === 'TR') cardList = TR;
    else if (route.params.data.code === 'G1') cardList = G1;
    else if (route.params.data.code === 'G2') cardList = G2;

    else if (route.params.data.code === 'N1') cardList = N1;
    else if (route.params.data.code === 'N2') cardList = N2;
    else if (route.params.data.code === 'N3') cardList = N3;
    else if (route.params.data.code === 'N4') cardList = N4;

    else if (route.params.data.code === 'LC') cardList = LC;

    else if (route.params.data.code === 'EX') cardList = EX;
    else if (route.params.data.code === 'AQ') cardList = AQ;
    else if (route.params.data.code === 'SK') cardList = SK;

    else if (route.params.data.code === 'RS') cardList = RS;
    else if (route.params.data.code === 'SS') cardList = SS;
    else if (route.params.data.code === 'DR') cardList = DR;
    else if (route.params.data.code === 'MA') cardList = MA;
    else if (route.params.data.code === 'HL') cardList = HL;
    else if (route.params.data.code === 'FG') cardList = FG;
    else if (route.params.data.code === 'TRR') cardList = TRR;
    else if (route.params.data.code === 'DX') cardList = DX;

    else if (route.params.data.code === 'MEG') cardList = MEG;
    else if (route.params.data.code === 'PFL') cardList = PFL;
    else if (route.params.data.code === 'SVE') cardList = SVE;

    return (
        <View className="flex-1">

            <FlatList
                key={"cards-grid"}
                data={cardList}
                numColumns={2}
                keyExtractor={ (item : CardData) => String(item.id) }
                renderItem={ ( { item, index } : { item : CardData, index : number } ) => <GridCard item={item} index={index}/>}
            />

            <Modal visible={!!selectedCard} transparent={true}>

                <LinearGradient
                    colors={[route.params.data.fromColor + 'F0', route.params.data.toColor + 'F0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className='flex-1 justify-center items-center'
                >

                    <View className="w-[100%] h-[100%] flex-1 justify-center items-center gap-2 p-4">

                        <Text className="font-bold text-center text-xl bg-white p-2 rounded-xl">
                            {selectedCard?.id + '/' + String(route.params.data.regularCards).padStart(3, '0') + ' - ILL. ' + selectedCard?.illustrator}
                        </Text>

                        <Image
                            source={{ uri: selectedCard?.image ? selectedCard?.image : 'https://media.pokemoncentral.it/wiki/1/17/Cardback.jpg' }}
                            style={{ width: '100%', height: '70%' }}
                            resizeMode='contain'
                        />

                        <View className="bg-white p-2 rounded-xl flex-row justify-center items-center gap-4">

                            <Image
                                source={require('../../assets/icons/game-icons--money-stack.png')}
                                style={{ width: 32, height: 32 }}
                                resizeMode='contain'
                                tintColor={'#000000'}
                            />
                            
                            <Text className="font-bold text-center text-xl text-black ">{cardPrice}</Text>

                        </View>

                        <View className="flex-row gap-4 mt-4 justify-center items-center">

                            <Pressable
                                onPress={handlePrev}
                                pointerEvents={(selectedCardIndex! > 0) ? 'auto' : 'none'}
                                style={{ opacity: (selectedCardIndex! > 0) ? 1 : 0 }}>

                                <Image
                                    source={require('../../assets/icons/solar--map-arrow-left-bold-duotone.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#FFFFFF'}
                                    resizeMode='contain'
                                />
                                
                            </Pressable>

                            <Pressable
                                onPress={() => { setCardPrice(''); setSelectedCardIndex(null); setSelectedCard(null); }}>

                                <Image
                                    source={require('../../assets/icons/carbon--close-filled.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#FFFFFF'}
                                    resizeMode='contain'
                                />

                            </Pressable>

                            <Pressable
                                onPress={handleNext}
                                pointerEvents={(selectedCardIndex! < (cardList.length - 1)) ? 'auto' : 'none'}
                                style={{ opacity: (selectedCardIndex! < (cardList.length - 1)) ? 1 : 0 }}>
                                
                                <Image
                                    source={require('../../assets/icons/solar--map-arrow-right-bold-duotone.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#FFFFFF'}
                                    resizeMode='contain'
                                />

                            </Pressable>

                        </View>

                    </View>
                
                </LinearGradient>

            </Modal>

        </View>
    );
}