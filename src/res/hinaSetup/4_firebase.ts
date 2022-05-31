import 'dotenv/config';
import firebaseAdmin from 'firebase-admin';

import Hina from './3_player.js';

/**
 * connect to firebase
 */
const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS!)),
    databaseURL: 'https://hina-9a90d-default-rtdb.firebaseio.com/',
});

Hina.database = firebaseAdmin.firestore(app);

export default Hina;
