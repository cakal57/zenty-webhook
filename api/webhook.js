// Zenty AI Webhook Server + Firebase Integration
// Vercel Serverless Function

// Firebase Admin SDK
const admin = require('firebase-admin');

// Initialize Firebase Admin (with better error handling)
function initFirebase() {
    if (admin.apps.length > 0) {
        return admin.app(); // Already initialized
    }
    
    try {
        // Check if required env vars exist
        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_DATABASE_URL) {
            throw new Error('Missing Firebase environment variables');
        }
        
        // Clean and parse private key
        let privateKey = process.env.FIREBASE_PRIVATE_KEY;
        // Replace literal \n with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');
        
        const app = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: privateKey,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });
        
        console.log('✅ Firebase Admin initialized successfully');
        console.log('🔥 Database URL:', process.env.FIREBASE_DATABASE_URL);
        return app;
    } catch (error) {
        console.error('❌ Firebase Admin init error:', error.message);
        console.error('❌ Error details:', error);
        throw error;
    }
}

// Initialize on module load
try {
    initFirebase();
} catch (error) {
    console.error('⚠️ Firebase init failed on module load:', error.message);
}

module.exports = async (req, res) => {
    // CORS ayarları (tarayıcıdan erişim için)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // OPTIONS request (CORS preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Sadece POST kabul et
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            message: 'Please use POST method' 
        });
    }
    
    try {
        // TradingView'dan gelen veriyi al
        const data = req.body;
        
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📊 ZENTY AI SIGNAL RECEIVED');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🕐 Time:', new Date().toLocaleString('tr-TR'));
        console.log('📍 Symbol:', data.symbol || 'UNKNOWN');
        console.log('🎯 Signal:', data.signal || 'WAIT');
        console.log('💰 Price:', data.price || 0);
        console.log('⭐ Confluence:', data.confluenceScore || 0, '%');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        
        // Veriyi parse et ve temizle
        const signal = {
            symbol: data.symbol || 'UNKNOWN',
            signal: data.signal || 'WAIT',
            price: parseFloat(data.price) || 0,
            confluenceScore: parseInt(data.confluenceScore) || 0,
            rsi: parseFloat(data.rsi) || 0,
            cvd: parseFloat(data.cvd) || 0,
            whaleBuy: data.whaleBuy === 'true' || data.whaleBuy === true,
            whaleSell: data.whaleSell === 'true' || data.whaleSell === true,
            orderBlock: data.orderBlock === 'true' || data.orderBlock === true,
            liquidationLevel: parseFloat(data.liquidationLevel) || 0,
            exchange: data.exchange || 'BINANCE',
            interval: data.interval || '1H',
            timestamp: new Date().toISOString(),
            source: 'tradingview'
        };
        
        console.log('✅ Parsed Signal:', signal);
        
       
        // Başarılı yanıt
        return res.status(200).json({ 
            success: true, 
            message: 'Signal received and saved to Firebase',
            data: signal,
            receivedAt: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('❌ ERROR:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
};

