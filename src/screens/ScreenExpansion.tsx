import React from "react";
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from "expo-linear-gradient";

import { StackParamExpansions } from '../interfaces/route-params';

import ItemExpansionInfo from "../shared/ItemExpansionInfo";

export default function ScreenExpansion({ navigation, route } : NativeStackScreenProps<StackParamExpansions, "ScreenExpansion", undefined>)
{
    const [selectedPack, setSelectedPack] = React.useState<number | null>(null);

    const { data } = route.params;

    const handlePrev = () =>
    {
        if (selectedPack === null) return;

        const prevIndex : number = (selectedPack - 1 + data.packImages.length) % data.packImages.length;
        
        setSelectedPack(prevIndex);
    };

    const handleNext = () =>
    {
        if (selectedPack === null) return;

        const nextIndex : number = (selectedPack + 1) % (data.packImages.length + 1);
        
        setSelectedPack(nextIndex);
    };

    return (
        <View className="flex flex-1 justify-between">

            <View>

                <Image
                    source={{ uri: data.image ?? undefined }}
                    style={{ width: '95%', height: 100, margin: 10 }}
                    resizeMode='contain'
                />

                <View className="mt-4">

                    <ItemExpansionInfo label="Nome" value={data.name} />
                    <ItemExpansionInfo label="Codice" value={data.code} />
                    <ItemExpansionInfo label="Tipo" value={data.type === 'M' ? 'Principale' : 'Speciale'} />
                    <ItemExpansionInfo label="Data di pubblicazione" value={data.releaseDate} />
                    <ItemExpansionInfo label="Carte (regolari + segrete)" value={data.totalCards + ' (' + data.regularCards + ' - ' + (data.totalCards - data.regularCards) + ')'} />

                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ScreenCards', { seriesData: route.params.seriesData, data: data })}
                    className="bg-blue-400 aria-pressed:bg-blue-100 p-4 rounded-lg m-4 text-center">
                    
                    <Text className="text-center text-white font-bold text-xl">Carte</Text>
                
                </TouchableOpacity>

            </View>

            <View className="flex-row justify-center">

                {
                    data.packImages.map((value : string, index : number) => (
                        <Pressable key={index} onPress={() => setSelectedPack(index)}>
                            
                            <Image
                                source={{ uri: value }}
                                style={{ width: 90, height: 150, margin: 5 }}
                                resizeMode='contain'
                            />

                        </Pressable>
                    ))
                }

            </View>

            <Modal
                visible={selectedPack != null}
                transparent={true}>

                <LinearGradient
                    colors={[route.params.data.fromColor + 'F0', route.params.data.toColor + 'F0']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className='flex-1 justify-center items-center'
                >

                    <View className="w-[80%] h-[100%] justify-center items-center">

                        <Image
                            source={{ uri: data.packImages[selectedPack! ] }}
                            style={{ width: '120%', height: '80%' }}
                            resizeMode='contain'
                            //className="border-2 border-yellow-400 rounded-lg bg-yellow-100"
                        />

                        <View className="flex-row gap-4 mt-4 justify-center items-center">

                            <Pressable
                                onPress={handlePrev}
                                pointerEvents={(selectedPack! > 0) ? 'auto' : 'none'}
                                style={{ opacity: (selectedPack! > 0) ? 1 : 0 }}>

                                <Image
                                    source={require('../../assets/icons/solar--map-arrow-left-bold-duotone.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#FFFFFF'}
                                    resizeMode='contain'
                                />
                                
                            </Pressable>

                            <Pressable
                                onPress={() => setSelectedPack(null)}>

                                <Image
                                    source={require('../../assets/icons/carbon--close-filled.png')}
                                    style={{ width: 48, height: 48 }}
                                    tintColor={'#FFFFFF'}
                                    resizeMode='contain'
                                />

                            </Pressable>

                            <Pressable
                                onPress={handleNext}
                                pointerEvents={(selectedPack! < data.packImages.length - 1) ? 'auto' : 'none'}
                                style={{ opacity: (selectedPack! < data.packImages.length - 1) ? 1 : 0 }}>
                                
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