import React from "react";
import { Image, ImageBackground, Pressable, Text, View } from 'react-native';

import { ItemCardProps } from "../interfaces/ItemCard.types";

import { megImages } from "../images/meg";
import { rarityImages } from "../images/rarity";
import { typeImages } from "../images/types";

export default function ItemCard(props: ItemCardProps)
{
    return (
        <View className="flex-1 min-h-20 overflow-hidden">
        {
            props.gridView
            
            ?

            // <ImageBackground
            //     source={{ uri: 'https://media.pokemoncentral.it/wiki/1/17/Cardback.jpg' }}
            //     resizeMode="contain"
            //     className="m-2">

            <View
                className={`m-2 border-2 rounded-xl 
                    ${(Number(props.item.id) <= props.expansion.regularCards) ?
                    'bg-blue-500/80 border-blue-900' :
                    'bg-yellow-400/80 border-yellow-200'}`}>

                <Pressable className="flex justify-center items-center" onPress={() => props.onSelectCard(props.index, props.item)}>

                    <Text className="font-robotomono text-center bg-cyan-900 text-white p-1 rounded-t-lg w-[100%] mb-2">{props.item.id + '/' + props.expansion.regularCards}</Text>

                    <Image
                        source={{ uri: props.item.image ? props.item.image : 'https://media.pokemoncentral.it/wiki/1/17/Cardback.jpg' }}
                        style={{ width: '100%', height: 200 }}
                        resizeMode='contain'
                    />

                    <Text className="font-bold text-center bg-yellow-900 text-white p-1 rounded-b-lg w-[100%] mt-2">{props.item.name}</Text>

                </Pressable>

            </View>
                
            // </ImageBackground>
            
            :

            <Pressable
                className="border boder-1 rounded-xl m-2 p-2 flex-row justify-between items-center gap-2"
                onPress={() => props.onSelectCard(props.index, props.item)}>
                
                <Text className="font-robotomono">{props.item.id + '/' + props.expansion.regularCards}</Text>
                
                <View className="flex-col justify-center items-center">

                    <Text className="font-bold text-xl">{props.item.name}</Text>

                    <Text className="font-novasquare">{'ILL. ' + props.item.illustrator}</Text>

                </View>

                <View className="flex-row gap-1">

                    <Image
                        source={rarityImages[props.item.rarity]}
                        style={{ width: 24, height: 24}}
                        resizeMode='contain'
                    />

                    {
                        props.item.rarity === 'RR' &&
                        <Image
                            source={rarityImages[props.item.rarity]}
                            style={{ width: 24, height: 24}}
                            resizeMode='contain'
                        />
                    }

                    <Image
                        source={typeImages[props.item.type.toLowerCase()]}
                        style={{ width: 24, height: 24, marginStart: 10 }}
                        resizeMode='contain'
                    />

                </View>

            </Pressable>
        }

        </View>
    );
}