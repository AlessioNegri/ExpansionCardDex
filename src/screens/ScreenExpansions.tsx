import React from "react";
import { FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { StackParamExpansions } from '../interfaces/route-params';
import { ExpansionData, SeriesData } from '../interfaces/ItemExpansion.types';

import ItemExpansion from "../shared/ItemExpansion";

import data from '../../assets/series.json';

export default function ScreenExpansions( { navigation } : NativeStackScreenProps<StackParamExpansions, "ScreenExpansions", undefined> )
{
    return (
        <FlatList
            data={data.series}
            keyExtractor={ (item : SeriesData) => String(item.name) }
            renderItem={ ( { item, index } : { item : SeriesData, index : number } ) =>
                <ItemExpansion
                    item={item}
                    index={index}
                    onPressExpansion={ (exp : ExpansionData) => { navigation.navigate('ScreenExpansion', { data: exp }) } }/>}
            />
    );
}