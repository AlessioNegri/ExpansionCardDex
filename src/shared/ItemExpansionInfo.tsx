import { Text, View } from 'react-native';

import { ItemExpansionInfoProps } from '../interfaces/ItemExpansionInfo.types';

export default function ItemExpansionInfo({ label, value, capitalize = false } : ItemExpansionInfoProps)
{
    return (
        <View className="flex-row justify-between items-center py-4 px-2 border-b-2 border-gray-300">

            <Text className="font-bold text-lg">{label}</Text>

            <Text className={`${capitalize ? 'capitalize' : ''}`}>{value}</Text>
            
        </View>
    );
};