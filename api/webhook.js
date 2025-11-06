const admin = require('firebase-admin');

// Firebase init (safe)
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        console.log('✅ Firebase OK');
    } catch (e) {
        console.log('⚠️ Firebase SKIP:', e.message);
    }
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
    
    const data = req.body || {};
    console.log('📊 Signal:', data.symbol, data.signal, data.price);
    
    // Firebase save (opsiyonel)
    let firebaseSaved = false;
    try {
        if (admin.apps.length > 0) {
            const signal = {
                symbol: data.symbol,
                signal: data.signal,
                price: data.price,
                timestamp: new Date().toISOString()
            };
            await admin.database().ref('webhook-signals').push().set(signal);
            console.log('🔥 Firebase SAVED!');
            firebaseSaved = true;
        }
    } catch (e) {
        console.log('⚠️ Firebase skip:', e.message);
    }
    
    return res.status(200).json({ 
        success: true, 
        message: firebaseSaved ? 'Saved to Firebase' : 'OK (no Firebase)',
        data: data
    });
};
