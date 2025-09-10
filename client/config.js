import Constants from "expo-constants";

const { manifest, expoConfig } = Constants;

// For Expo Go: debuggerHost looks like "192.168.1.45:19000"
const host = manifest?.debuggerHost?.split(":")[0] 
          || expoConfig?.hostUri?.split(":")[0]; 

export const SERVER_URL = `http://${host}:4000`;
