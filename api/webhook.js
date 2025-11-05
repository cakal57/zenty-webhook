// Zenty AI Webhook Server
// Vercel Serverless Function

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
        console.log('📊 Full Data:', JSON.stringify(data, null, 2));
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
            timestamp: new Date().toISOString()
        };
        
        console.log('✅ Parsed Signal:', signal);
        
        // TODO: Buraya eklenebilir:
        // 1. Telegram Bot (anlık bildirim)
        // 2. Database (MongoDB, PostgreSQL)
        // 3. Web Push Notification
        // 4. Email bildirimi
        
        // Başarılı yanıt
        return res.status(200).json({ 
            success: true, 
            message: 'Signal received and logged',
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

