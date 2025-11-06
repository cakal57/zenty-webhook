module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }
    
    const data = req.body || {};
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SIGNAL RECEIVED');
    console.log('Symbol:', data.symbol);
    console.log('Signal:', data.signal);
    console.log('Price:', data.price);
    console.log('Confidence:', data.confluenceScore);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return res.status(200).json({ 
        success: true, 
        message: 'Signal received successfully',
        data: {
            symbol: data.symbol,
            signal: data.signal,
            price: data.price,
            timestamp: new Date().toISOString()
        }
    });
};
