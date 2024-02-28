import { View, Text, Image } from 'react-native';

import { Logo } from '@components';

export const TopBar = () => {
  return (
    <View className="flex flex-col items-center rounded-xl bg-white py-6">
      <Logo />
      <View className="flex flex-col items-center font-poppins">
        <Text className="-mt-1 text-xs font-light italic text-gray-500">
          Get current location and available BLE addresses
        </Text>
      </View>
    </View>
  );
};
