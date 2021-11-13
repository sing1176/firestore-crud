import {initializeApp  } from 'firebase/app'
import { getFirestore  } from 'firebase/firestore'


const firebaseConfig = {
	apiKey: 'AIzaSyAFHMXPW1wJ52usn5-V2Kp2KljWpb4BIio',
	authDomain: 'first-app-d5ff4.firebaseapp.com',
	projectId: 'first-app-d5ff4',
	storageBucket: 'first-app-d5ff4.appspot.com',
	messagingSenderId: '778940712601',
	appId: '1:778940712601:web:398e0545d73d110b01da08',
};




initializeApp(firebaseConfig)
const db = getFirestore()

 export default db;


