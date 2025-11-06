let firebaseReady = false;

// Firebase init - ultra safe
try {
    const admin = require('firebase-admin');
    
    if (!admin.apps.length && process.env.FIREBASE_PROJECT_ID) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        firebaseReady = true;
        console.log('✅ Firebase initialized');
    }
} catch (error) {
    console.log('⚠️ Firebase disabled:', error.message);
    firebaseReady = false;
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
    
    const data = req.body || {};
    
    console.log('📊 Signal:', data.symbol, data.signal, data.price);
    
    // Firebase save
    let saved = false;
    if (firebaseReady) {
        try {
            const admin = require('firebase-admin');
            const signal = {
                symbol: data.symbol,
                signal: data.signal,
                price: parseFloat(data.price) || 0,
                confluenceScore: parseInt(data.confluenceScore) || 0,
                timestamp: new Date().toISOString()
            };
            await admin.database().ref('webhook-signals').push().set(signal);
            console.log('🔥 Saved to Firebase!');
            saved = true;
        } catch (e) {
            console.log('Firebase save error:', e.message);
        }
    }
    
    return res.status(200).json({ 
        success: true, 
        message: saved ? 'Saved to Firebase!' : 'Signal received (Firebase disabled)',
        firebase: saved,
        data: data
    });
};
