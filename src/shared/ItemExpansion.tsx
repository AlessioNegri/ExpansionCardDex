import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import { ExpansionData, ItemExpansionProps, SeriesData } from "../interfaces/ItemExpansion.types";

export default function ItemExpansion(props: ItemExpansionProps)
{
    const [openSeries, setOpenSeries] = useState<boolean>(false);

    var item : SeriesData = props.item;

    return (
        <View className="m-5 border-2 border-blue-800 rounded-lg p-2">
            
            <TouchableOpacity onPress={() => setOpenSeries(!openSeries)} className="rounded-md">

                <LinearGradient
                    colors={[item.fromColor + '50', item.toColor + '50']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ borderRadius: 8 }}
                >
                    
                    <Text className='uppercase text-xl font-bold text-blue-900 p-3 text-center'>{item.name}</Text>

                </LinearGradient>

            </TouchableOpacity>

            {
                openSeries && (item.expansions.map((exp : ExpansionData) => (

                    <TouchableOpacity key={exp.code} onPress={() => props.onPressExpansion(exp)}>
                        
                        <LinearGradient
                            key={exp.code}
                            colors={[exp.fromColor + '50', exp.toColor + '50']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className={`my-3 p-3 rounded-md border-4 \
                                        ${exp.type === 'M' ? 'border-slate-500' : 'border-slate-500'}`}
                        >

                            <View className="flex-row justify-between align-top">

                                <Image
                                    source={{ uri: (exp.symbol && exp.symbol !== '') ? exp.symbol : undefined }}
                                    style={{ width: 32, height: 32 }}
                                    resizeMode='contain'
                                />

                                <Image
                                    source={{ uri: (exp.image && exp.image !== '') ? exp.image : undefined }}
                                    style={{ width: '80%', height: 100 }}
                                    resizeMode='contain'
                                />

                                <Image
                                    source={require('../../assets/icons/solar--star-bold.png')}
                                    style={{ width: 32, height: 32 }}
                                    resizeMode='contain'
                                    tintColor={(exp.type === 'S') ? '#FFA500' : '#00000000'}
                                />
                                
                            </View>


                            <View className='flex flex-row justify-between items-center border-t-2 pt-2 mt-2'>

                                <Text className='bg-black text-white font-semibold tracking-[3px] p-1 rounded-lg font-robotomono'>
                                    {exp.code}
                                </Text>
                                
                                <View className='flex flex-row justify-between items-center gap-4'>

                                    <Image
                                        source={require('../../assets/icons/guidance--calendar.png')}
                                        tintColor={'#000000'}
                                        style={{ width: 24, height: 24 }}
                                        resizeMode='contain'
                                    />
                                    
                                    <Text className='font-novasquare'>
                                        {exp.releaseDate}
                                    </Text>

                                </View>
                            
                                <View className='flex flex-row justify-between items-center gap-4'>

                                    <Image
                                        source={require('../../assets/icons/mdi--cards.png')}
                                        tintColor={'#000000'}
                                        style={{ width: 24, height: 24 }}
                                        resizeMode='contain'
                                    />

                                    <Text className='font-novasquare'>
                                        {exp.totalCards}
                                    </Text>

                                </View>

                            </View>

                        </LinearGradient>

                    </TouchableOpacity>
                    
                )))
            }

        </View>
    );
}