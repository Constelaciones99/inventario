import 'dotenv/config';

export default {
  expo: {
    owner: "devcahp",
    name: "inventary",
    slug: "inventary",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.devcahp.inventary" // Recomendado añadir esto
    },
    
    android: {
      package: "com.devcahp.inventary", // Mejor formato para package name
      versionCode: 1, // Recomendado añadir
      icon: "./assets/icon.png",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      },
      googleServicesFile: './google-services.json',
      
      edgeToEdgeEnabled: true
    },
    
    web: {
      favicon: "./assets/favicon.png"
    },
    
    extra: {
       // Agrupar config de Firebase
       apiKey: "AIzaSyAbmB39xaosD2G3zrVBtnOmX70HZ3nlpDA",
  authDomain: "inventary-74f46.firebaseapp.com",
  projectId: "inventary-74f46",
  storageBucket: "inventary-74f46.firebasestorage.app",
  messagingSenderId: "262404945117",
  appId: "1:262404945117:web:f71e0e1fa0ae65007d9734"
      ,
      eas: {
        projectId: "b65549f7-b3e7-42f7-9e36-db22b5fb1017"
      }
    },
    
    // Configuración adicional recomendada
    plugins: [
      "@react-native-firebase/app", // Si usas Firebase
      [
        "expo-image-picker",
        {
          "photosPermission": "La app necesita acceso a tus fotos para subir imágenes.",
          "cameraPermission": "La app necesita acceso a tu cámara para tomar fotos."
        }
      ]
    ],
    
    runtimeVersion: {
      policy: "sdkVersion" // Para updates de Expo
    },
    "ios": {
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "La app necesita acceso a tus fotos para subir imágenes.",
        "NSCameraUsageDescription": "La app necesita acceso a tu cámara para tomar fotos.",
        "NSMicrophoneUsageDescription": "La app necesita acceso a tu micrófono cuando grabas videos."
      }
    },
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.READ_EXTERNAL_STORAGE",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission.RECORD_AUDIO"
      ]
    }
  }
}
  
