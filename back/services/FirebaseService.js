
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

class FirebaseService {

    initialize() {

        if (this.app) return;

        const firebaseConfig = {
            apiKey: "AIzaSyCnHWEvmdMjTfLz8PE39s5KYyGxwjY6zPY",
            authDomain: "nefrokids-1e98c.firebaseapp.com",
            projectId: "nefrokids-1e98c",
            storageBucket: "nefrokids-1e98c.firebasestorage.app",
            messagingSenderId: "379593900267",
            appId: "1:379593900267:web:9c43da54079050280c7eae",
            measurementId: "G-F2HLXMTKY6"
        };

        this.app = initializeApp(firebaseConfig);

        this.auth = initializeAuth(
            this.app,
            {
                persistence:
                    getReactNativePersistence(
                        AsyncStorage
                    )
            }
        );

        this.firestore = getFirestore(this.app);
    }
}