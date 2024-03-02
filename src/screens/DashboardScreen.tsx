import React, { SetStateAction, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { DeviceLocationProps } from '@types';

import { AndroidSafeView, BoxWithUnderLine, Logo } from '@components';

import { useLocation, useBluetooth } from '@hooks';

import { distanceInMeters } from '@utils';

interface DashboardProps {
  latitude: number | null;
  longitude: number | null;
  altitude: number | null;
  bluetooth_address: string | null;
}

enum AttendanceResultEnum {
  CHECK = 'check',
  MARKED = 'marked',
  NOT_MARKED = 'not_marked',
}

const Item = ({
  bluetooth_address,
  handleSetData,
}: {
  bluetooth_address: string;
  handleSetData: React.Dispatch<SetStateAction<DashboardProps>>;
}) => (
  <View className="flex h-8 w-full flex-col items-start justify-center space-y-4">
    <TouchableOpacity
      className="w-full"
      onPress={() => {
        handleSetData((prev) => ({
          ...prev,
          bluetooth_address,
        }));
      }}
    >
      <Text className="font-lg">{bluetooth_address}</Text>
    </TouchableOpacity>
  </View>
);

export const DashboardScreen = () => {
  const [loadingBLE, setLoadingBLE] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  const [attendanceResult, setAttendanceResult] =
    useState<AttendanceResultEnum>(AttendanceResultEnum.CHECK);

  const [data, setData] = useState<DashboardProps>({
    latitude: null,
    longitude: null,
    altitude: null,
    bluetooth_address: null,
  });

  const getLocation = useLocation();
  const getDevices = useBluetooth();

  const [availableLocation, setAvailableLocation] =
    useState<DeviceLocationProps | null>(null);
  const [
    availableBluetoothLowEnergyDevices,
    setAvailableBluetoothLowEnergyDevices,
  ] = useState<string[]>([]);

  const handleSetAttendanceResult = (val: AttendanceResultEnum) => {
    setAttendanceResult(val);

    setTimeout(() => {
      setAttendanceResult(AttendanceResultEnum.CHECK);
    }, 5000);
  };

  return (
    <AndroidSafeView>
      <ScrollView>
        <View className="mx-6 flex flex-col items-center space-y-6">
          <View className="mt-6 w-full">
            <View className="flex flex-col items-center rounded-xl bg-white py-6">
              <Logo />
              <View className="flex flex-col items-center font-poppins">
                <Text className="-mt-1 text-xs font-light italic text-gray-500">
                  Get current location and available BLE addresses
                </Text>
              </View>
            </View>
          </View>
          <View className="w-full">
            <BoxWithUnderLine
              title="Location"
              children={
                <View className="flex flex-col items-center justify-between space-y-4">
                  {availableLocation?.coords.latitude &&
                  availableLocation.coords.longitude ? (
                    <Text className="font-poppins text-lg font-semibold">{`${availableLocation.coords.latitude}, ${availableLocation.coords.longitude}`}</Text>
                  ) : (
                    <Text>Please scan</Text>
                  )}

                  <View className="flex h-12 flex-row items-center justify-between space-x-4">
                    <TouchableOpacity
                      className="flex h-full w-[80%] flex-col items-center justify-center rounded-lg bg-primary leading-none"
                      onPress={() => {
                        (async () => {
                          try {
                            const res = await getLocation();
                            setAvailableLocation(res);
                          } catch (err) {
                            // console.log(err);
                          }
                        })();
                      }}
                    >
                      <Text className="font-semibold uppercase text-white">
                        Get Coordinates
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className="flex h-full flex-auto flex-col items-center justify-center rounded-lg bg-gray-300"
                      onPress={() => {
                        setData((prev) => ({
                          ...prev,
                          latitude: availableLocation?.coords.latitude ?? null,
                          longitude:
                            availableLocation?.coords.longitude ?? null,
                          altitude: availableLocation?.coords.altitude ?? null,
                        }));
                      }}
                    >
                      <Text>👌🏽</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              }
            />
          </View>
          <View className="w-full">
            <BoxWithUnderLine
              title="Bluetooth Devices"
              children={
                <View className="flex flex-col items-center justify-between space-y-4">
                  {availableBluetoothLowEnergyDevices.length > 0 ? (
                    <ScrollView
                      className="h-32 w-full"
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={true}
                      nestedScrollEnabled={true}
                    >
                      {availableBluetoothLowEnergyDevices.map((item) => (
                        <Item
                          key={item}
                          bluetooth_address={item}
                          handleSetData={setData}
                        />
                      ))}
                    </ScrollView>
                  ) : (
                    <Text>Nothing found</Text>
                  )}

                  <TouchableOpacity
                    className="flex h-12 w-full flex-col items-center justify-center rounded-lg bg-primary leading-none"
                    onPress={() => {
                      (async () => {
                        setAvailableBluetoothLowEnergyDevices([]);
                        try {
                          setLoadingBLE(true);
                          const res = await getDevices();
                          setAvailableBluetoothLowEnergyDevices(res);
                        } catch (err) {
                          // console.log(err);
                        } finally {
                          setLoadingBLE(false);
                        }
                      })();
                    }}
                  >
                    <Text className="font-semibold uppercase text-white">
                      {loadingBLE ? (
                        <ActivityIndicator size="small" color={'#ffffff'} />
                      ) : (
                        'BLE Scan'
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
          <View className="mb-6 w-full">
            <BoxWithUnderLine
              title="Current Values"
              children={
                <View className="flex flex-col items-center justify-between space-y-4">
                  <Text>
                    {data.latitude && data.latitude && data.altitude
                      ? `${data.latitude}, ${data.longitude} (Altitude: ${data.altitude})`
                      : 'No location set'}
                  </Text>
                  <Text>{data.bluetooth_address ?? 'No device set'}</Text>
                  <TouchableOpacity
                    className={`flex h-12 w-full flex-col items-center justify-center rounded-lg border border-primary leading-none transition duration-300 ${attendanceResult === AttendanceResultEnum.MARKED ? 'bg-green-100' : attendanceResult === AttendanceResultEnum.NOT_MARKED ? 'bg-red-100' : 'bg-white'}`}
                    disabled={
                      data.latitude && data.longitude && data.bluetooth_address
                        ? false
                        : true
                    }
                    onPress={() => {
                      (async () => {
                        try {
                          if (!data.latitude || !data.longitude) {
                            return;
                          }

                          if (!data.bluetooth_address) {
                            return;
                          }

                          setLoadingAttendance(true);

                          const location = await getLocation();
                          const bleDevices = await getDevices();

                          // console.log('all devices', bleDevices);
                          // console.log('Current', data.bluetooth_address);

                          if (
                            !location.coords.latitude ||
                            !location.coords.longitude
                          ) {
                            return;
                          }

                          const distance = distanceInMeters(
                            data.latitude,
                            data.longitude,
                            location.coords.latitude,
                            location.coords.longitude
                          );

                          if (
                            bleDevices.includes(data.bluetooth_address) &&
                            distance <= 5
                          ) {
                            handleSetAttendanceResult(
                              AttendanceResultEnum.MARKED
                            );
                            // console.log('Attendance marked');
                          } else {
                            handleSetAttendanceResult(
                              AttendanceResultEnum.NOT_MARKED
                            );
                            // console.log('Attendance not marked');
                          }
                        } catch (err) {
                          // console.log(err);
                        } finally {
                          setLoadingAttendance(false);
                        }
                      })();
                    }}
                  >
                    <Text className="font-semibold uppercase text-primary">
                      {loadingAttendance
                        ? 'Checking'
                        : attendanceResult === AttendanceResultEnum.MARKED
                          ? 'Marked'
                          : attendanceResult === AttendanceResultEnum.NOT_MARKED
                            ? 'Not marked'
                            : 'Check Attendance'}
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </AndroidSafeView>
  );
};
