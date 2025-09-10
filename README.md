# 📚 Learnoverse App

Learnoverse is a full-stack app built with React Native (Expo) on the client side and Node.js + Express + MongoDB on the server side.
It fetches YouTube videos using the YouTube API and stores them in MongoDB.

# 📂 Project Structure
```bash
learnoverse/
├── client/          # React Native (Expo) frontend
│   ├── screens/     # App screens (ListScreen, PlayerScreen)
│   ├── assets/      # Images and icons
│   └── App.js       # Entry point
│
├── server/          # Node.js + Express backend
│   ├── index.js     # Server entry
│   ├── package.json # Backend dependencies
│   └── .env         # Environment variables 
│
├── .gitignore
└── README.md
```

# ⚙️ Setup Instructions
## 1. Clone the repository
```bash
git clone https://github.com/<your-username>/learnoverse-app.git
cd learnoverse
```

## 2. Backend Setup (Server)
```bash
cd server
npm install
```
Edit the .env file inside server:
```bash
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB=learnoverse
COLLECTION=videos
YT_API_KEY=your_youtube_api_key
PORT=4000
```
Note: Make sure to change the MONGODB URI in 'index.js' if using a different url. I have hard coded my connection url as mentioned in the assignment. 
      If you dont want to hardcode the mongo connection url, you can insert the url in .env and use it.

# 📌 Explanation of .env values:

* MONGODB_URI → MongoDB Atlas or local URI
* MONGODB_DB → Database name (default: learnoverse)
* COLLECTION → Collection where videos will be stored (default: videos)
* YT_API_KEY → Your YouTube Data API key
* PORT → Port for Express server (default: 4000)

Run the backend:
```bash
npm start
```

## 3. Frontend Setup (Client)
```bash
cd ../client
npm install
```

Start Expo:
```bash
npx expo start
```
* Scan the QR code with Expo Go app (on Android/iOS)
* Or run on an emulator (Android Studio / Xcode)

## 4. Connect Client with Server
This project is already configured to auto-detect your machine’s local IP (thanks to Expo’s debuggerHost).          
Check client/config.js:
```bash
import Constants from "expo-constants";

const { manifest, expoConfig } = Constants;

// For Expo Go: debuggerHost looks like "192.168.1.45:19000"
const host =
  manifest?.debuggerHost?.split(":")[0] ||
  expoConfig?.hostUri?.split(":")[0];

export const SERVER_URL = `http://${host}:4000`;
```

# 🚀 Running the App

1. Start backend (server/ → npm start)
2. Start frontend (client/ → npx expo start)
3. Open app in Expo Go → Browse and play YouTube videos 🎥

# 📝 Notes

* .env contains my YT API Key, so I have uploaded an example .env
* Make sure MongoDB Atlas cluster is whitelisted for your IP.
* Ensure both mobile and server are on the same WiFi for local testing.





