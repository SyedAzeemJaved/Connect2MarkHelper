import { View, Text, TouchableHighlight } from 'react-native';

import { BoxWithUnderLine } from '@components';

export const LocationBox = () => {
  return (
    <View className="w-full">
      <BoxWithUnderLine
        title="Location"
        children={
          <View className="flex flex-col items-center justify-between space-y-4">
            <Text className="font-poppins text-lg font-semibold">
              24.61254, 28,55964
            </Text>

            <View className="flex h-12 flex-row items-center justify-between space-x-4">
              <TouchableHighlight className="flex h-full w-[80%] flex-col items-center justify-center rounded-lg bg-primary leading-none">
                <Text className="font-semibold uppercase text-white">
                  Get Coordinates
                </Text>
              </TouchableHighlight>
              <TouchableHighlight className="flex h-full flex-auto flex-col items-center justify-center rounded-lg bg-gray-300">
                <Text>👌🏽</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
      />
    </View>
  );
};
