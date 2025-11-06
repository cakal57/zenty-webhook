module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }
    
    const data = req.body || {};
    
    console.log('Signal received:', data.symbol, data.signal, data.price);
    
    return res.status(200).json({ 
        success: true, 
        message: 'OK',
        data: data
    });
};
