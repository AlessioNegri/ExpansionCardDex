import React from "react";
import { FlatList, Image, ImageSourcePropType, Modal, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamExpansions } from '../interfaces/route-params';
import { CardData } from '../interfaces/ItemCard.types';

import ItemCard from "../shared/ItemCard";

import MEG from '../../assets/cards/MEG.json';
import PFL from '../../assets/cards/PFL.json';
import SVE from '../../assets/cards/SVE.json';

export default function ScreenCards({ navigation, route } : NativeStackScreenProps<StackParamExpansions, "ScreenCards", undefined>)
{
    const [selectedCardIndex, setSelectedCardIndex] = React.useState<number | null>(null);

    const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);

    const GridCard = React.memo( ( { item, index } : { item : CardData, index : number } ) =>
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            expansion={route.params.data}
                            onSelectCard={(index : number, card : CardData) => { setSelectedCardIndex(index); setSelectedCard(card); }}/>)

    const handlePrev = () =>
    {
        if (selectedCardIndex === null) return;
        
        const prevIndex : number = (selectedCardIndex > 0) ? (selectedCardIndex - 1) : 0;
        
        setSelectedCardIndex(prevIndex);
        setSelectedCard(cardList[prevIndex]);
    };

    const handleNext = () =>
    {
        if (selectedCardIndex === null) return;

        const nextIndex : number = (selectedCardIndex + 1) % cardList.length;
        
        setSelectedCardIndex(nextIndex);
        setSelectedCard(cardList[nextIndex]);
    };

    var cardList : CardData[] = [];

    if      (route.params.data.code === 'MEG') cardList = MEG;
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

                <View className="w-[100%] h-[100%] flex-1 justify-center items-center gap-4 p-4 bg-blue-900/95">

                    <Text className="font-bold text-center text-white text-xl bg-red-800 p-2 rounded-xl">
                        {selectedCard?.id + '/' + route.params.data.regularCards + ' - ILL. ' + selectedCard?.illustrator}
                    </Text>

                    <Image
                        source={{ uri: selectedCard?.image ? selectedCard?.image : 'https://media.pokemoncentral.it/wiki/1/17/Cardback.jpg' }}
                        style={{ width: '100%', height: '70%' }}
                        resizeMode='contain'
                    />

                    <View className="flex-row gap-4 mt-4 justify-center items-center">

                        <Pressable
                            onPress={handlePrev}
                            pointerEvents={(selectedCardIndex! > 0) ? 'auto' : 'none'}
                            style={{ opacity: (selectedCardIndex! > 0) ? 1 : 0 }}>

                            <Image
                                source={require('../../assets/icons/wpf--previous.png')}
                                style={{ width: 48, height: 48 }}
                                tintColor={'#FFFFFF'}
                                resizeMode='contain'
                            />
                            
                        </Pressable>

                        <Pressable
                            onPress={() => { setSelectedCardIndex(null); setSelectedCard(null); }}>

                            <Image
                                source={require('../../assets/icons/carbon--close-filled.png')}
                                style={{ width: 56, height: 56 }}
                                tintColor={'#FFFFFF'}
                                resizeMode='contain'
                            />

                        </Pressable>

                        <Pressable
                            onPress={handleNext}
                            pointerEvents={(selectedCardIndex! < (cardList.length - 1)) ? 'auto' : 'none'}
                            style={{ opacity: (selectedCardIndex! < (cardList.length - 1)) ? 1 : 0 }}>
                            
                            <Image
                                source={require('../../assets/icons/wpf--next.png')}
                                style={{ width: 48, height: 48 }}
                                tintColor={'#FFFFFF'}
                                resizeMode='contain'
                            />

                        </Pressable>

                    </View>

                </View>

            </Modal>

        </View>
    );
}