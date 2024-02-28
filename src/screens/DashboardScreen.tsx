import { useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { DashboardProps } from '@types';

import { AndroidSafeView, TopBar, LocationBox, Logo } from '@components';

// import { useBluetooth, useLocation } from '@hooks';

export const DashboardScreen = () => {
  const [data, setData] = useState<DashboardProps | null>(null);

  // const getLocation = useLocation();
  // const getDevices = useBluetooth();

  return (
    <AndroidSafeView>
      <ScrollView>
        <View className="mx-6 flex flex-col items-center space-y-6">
          <View className="mt-6 w-full">
            <TopBar />
          </View>
          <View className="w-full">
            <LocationBox />
          </View>
          {/* <View className="mb-6 w-full">
            <View className="flex flex-row items-end justify-center">
              <Text className="mr-1 text-sm text-black">Change account?</Text>
              <Link title={'Logout'} handlePress={handleLogout} />
            </View>
          </View> */}

          {/* <TouchableOpacity
            onPress={() => {
              (async () => {
                await getDevices()
                  .then((resolve) => {
                    console.log(resolve);
                  })
                  .catch((err) => console.log(err));
              })();
            }}
          >
            <View className="mb-6 flex h-16 w-24 flex-col items-center justify-center rounded-2xl bg-red-300">
              <Text>Bluetooth</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </AndroidSafeView>
  );
};
