import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { ExpansionData, ItemExpansionProps, SeriesData } from "../interfaces/ItemExpansion.types";

export default function ItemExpansion(props: ItemExpansionProps)
{
    const [openSeries, setOpenSeries] = useState<boolean>(false);

    var item : SeriesData = props.item;

    return (
        <View className="m-5 border-2 border-blue-800 rounded-lg p-2 bg-green-100">
            
            <TouchableOpacity onPress={() => setOpenSeries(!openSeries)}>

                <Text className='bg-blue-500 uppercase text-lg font-robotmono \
                                text-white p-3 border-4 border-yellow-500 \
                                rounded-md text-center'>
                    {item.name}
                </Text>

            </TouchableOpacity>

            {
                openSeries && (item.expansions.map((exp : ExpansionData) => (

                    <TouchableOpacity key={exp.code} onPress={() => props.onPressExpansion(exp)}>
                        
                        <View
                            key={exp.code}
                            className={`my-3 p-3 rounded-md border-2 \
                                        ${exp.type === 'M' ? 'bg-slate-100' : 'bg-yellow-100'} \
                                        ${exp.type === 'M' ? 'border-slate-500' : 'border-yellow-500'}`}>

                            <Image
                                source={{ uri: exp.image ?? undefined }}
                                style={{ width: '100%', height: 100 }}
                                resizeMode='contain'
                            />

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

                        </View>

                    </TouchableOpacity>
                    
                )))
            }

        </View>
    );
}