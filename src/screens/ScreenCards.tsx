import React from "react";
import { FlatList, Image, ImageSourcePropType, Modal, Pressable, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { StackParamExpansions } from '../interfaces/route-params';
import { CardData } from '../interfaces/ItemCard.types';

import ItemCard from "../shared/ItemCard";

import { CardImagesType, megImages } from "../images/meg";

import ItemExpansionInfo from "../shared/ItemExpansionInfo";

import data from '../../assets/cards/MEG.json';
import rarity from '../../assets/rarity.json';

export default function ScreenCards({ navigation, route } : NativeStackScreenProps<StackParamExpansions, "ScreenCards", undefined>)
{
    const [selectedCardIndex, setSelectedCardIndex] = React.useState<number | null>(null);

    const [selectedCard, setSelectedCard] = React.useState<CardData | null>(null);

    const [gridView, setGridView] = React.useState<boolean>(true);

    const GridCard = React.memo( ( { item, index } : { item : CardData, index : number } ) =>
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            gridView={gridView}
                            expansion={route.params.data}
                            onSelectCard={(index : number, card : CardData) => { setSelectedCardIndex(index); setSelectedCard(card); }}/>)

    var cardList : CardData[] = [];

    if (route.params.data.code === 'MEG')
    {
        cardList = data;
    }

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

    const getCardImage = (images: CardImagesType, cardNumber: number | null): ImageSourcePropType | undefined =>
    {
        if (cardNumber == null) return undefined;

        const key = String(cardNumber + 1).padStart(3, "0");

        return images[key] || undefined;
    };

    return (
        <View className="flex-1 bg-blue-400/40">

            <View className="flex-row gap-4 mt-4 justify-end items-center mb-2 border-b-2 pb-2">

                <Text className="text-left flex-1 pl-4 text-xl">{gridView ? "Vista a griglia" : "Vista a lista"}</Text>
            
                <Pressable
                    onPress={() => setGridView(true)}
                    pointerEvents={!gridView ? 'auto' : 'none'}>

                    <Image
                        source={require('../../assets/icons/si--grid-fill.png')}
                        style={{ width: 32, height: 32 }}
                        tintColor={!gridView ? '#0000FF' : '#808080'}
                        resizeMode='contain'
                    />
                    
                </Pressable>

                <Pressable
                    onPress={() => setGridView(false)}
                    pointerEvents={gridView ? 'auto' : 'none'}>
                    
                    <Image
                        source={require('../../assets/icons/tabler--list.png')}
                        style={{ width: 32, height: 32 }}
                        tintColor={gridView ? '#0000FF' : '#808080'}
                        resizeMode='contain'
                    />

                </Pressable>

            </View>

            {
                gridView
                ?
                <FlatList
                    key={"cards-grid"}
                    data={cardList}
                    numColumns={2}
                    keyExtractor={ (item : CardData) => String(item.id) }
                    renderItem={ ( { item, index } : { item : CardData, index : number } ) =>
                        <GridCard
                            item={item}
                            index={index}/>}
                />
                :
                <FlatList
                    key={"cards-list"}
                    data={cardList}
                    keyExtractor={ (item : CardData) => String(item.id) }
                    renderItem={ ( { item, index } : { item : CardData, index : number } ) =>
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={index}
                            gridView={gridView}
                            expansion={route.params.data}
                            onSelectCard={(index : number, card : CardData) => { setSelectedCardIndex(index); setSelectedCard(card); }}/>}
                />
            }

            {
                gridView
                ?
                <Modal
                    visible={!!selectedCard}
                    transparent={true}>

                    <View className="w-[100%] h-[100%] flex-1 justify-center items-center gap-4 p-4 bg-blue-900/95">

                        <Text className="font-bold text-center text-white text-4xl bg-red-800 p-2 rounded-xl">{selectedCard?.id + '/' + route.params.data.regularCards}</Text>

                        <Text className="font-bold text-center text-white text-4xl bg-red-800 p-2 rounded-xl">{selectedCard?.name}</Text>

                        <Image
                            source={getCardImage(megImages, selectedCardIndex)}
                            style={{ width: '100%', height: '70%' }}
                            resizeMode='contain'
                            // className="border-2 border-yellow-400 rounded-lg bg-yellow-100"
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

                :

                <Modal
                    visible={!!selectedCard}
                    transparent={true}>
    
                    <View className="bg-white/95 h-[100%] flex justify-center">

                        <Image
                            source={getCardImage(megImages, selectedCardIndex)}
                            style={{ width: '100%', height: 400 }}
                            resizeMode='contain'
                        />

                        <View className="mt-4">
                        
                            <ItemExpansionInfo label="Numero" value={selectedCard?.id ?? ''} />
                            <ItemExpansionInfo label="Nome" value={selectedCard?.name ?? ''} />
                            <ItemExpansionInfo label="Rarità" value={rarity[selectedCard?.rarity as keyof typeof rarity ?? 'C'] ?? ''} />
                            <ItemExpansionInfo label="Tipo" value={selectedCard?.type ?? ''} capitalize={true} />
                            <ItemExpansionInfo label="Illustratore" value={selectedCard?.illustrator ?? ''} />
        
                        </View>

                        <View className="flex-row gap-4 mt-4 justify-center items-center">

                            <Pressable
                                onPress={handlePrev}
                                pointerEvents={(selectedCardIndex! > 0) ? 'auto' : 'none'}
                                style={{ opacity: (selectedCardIndex! > 0) ? 1 : 0 }}>

                                <Image
                                    source={require('../../assets/icons/wpf--previous.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#0000FF'}
                                    resizeMode='contain'
                                />
                                
                            </Pressable>

                            <Pressable
                                onPress={() => { setSelectedCardIndex(null); setSelectedCard(null); }}>

                                <Image
                                    source={require('../../assets/icons/carbon--close-filled.png')}
                                    style={{ width: 56, height: 56 }}
                                    tintColor={'#0000FF'}
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
                                    tintColor={'#0000FF'}
                                    resizeMode='contain'
                                />

                            </Pressable>

                        </View>

                    </View>
    
                </Modal>
            }

        </View>
    );
}