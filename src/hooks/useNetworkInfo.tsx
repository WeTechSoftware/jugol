import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export default function useNetworkInfo(): {
  networkIsConnected: boolean;
} {
  const [networkIsConnected, setNetworkIsConnected] = useState<boolean>(true);

  const handleConnectivityChange = (state: any) => {
    setNetworkIsConnected(state.isConnected);
  };

  useEffect(() => {
    const subscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      subscribe();
    };
  }, []);

  return {
    networkIsConnected,
  };
}
