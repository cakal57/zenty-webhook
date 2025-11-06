// Simple Test Webhook - Environment Variables Check
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const envCheck = {
        FIREBASE_PROJECT_ID: {
            exists: !!process.env.FIREBASE_PROJECT_ID,
            value: process.env.FIREBASE_PROJECT_ID || 'MISSING'
        },
        FIREBASE_CLIENT_EMAIL: {
            exists: !!process.env.FIREBASE_CLIENT_EMAIL,
            value: process.env.FIREBASE_CLIENT_EMAIL || 'MISSING'
        },
        FIREBASE_DATABASE_URL: {
            exists: !!process.env.FIREBASE_DATABASE_URL,
            value: process.env.FIREBASE_DATABASE_URL || 'MISSING'
        },
        FIREBASE_PRIVATE_KEY: {
            exists: !!process.env.FIREBASE_PRIVATE_KEY,
            length: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.length : 0,
            starts_with: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.substring(0, 27) : 'MISSING',
            has_newlines: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.includes('\n') : false,
            has_literal_backslash_n: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.includes('\\n') : false
        }
    };
    
    return res.status(200).json({
        message: 'Environment Variables Check',
        all_set: envCheck.FIREBASE_PROJECT_ID.exists && 
                 envCheck.FIREBASE_CLIENT_EMAIL.exists && 
                 envCheck.FIREBASE_DATABASE_URL.exists && 
                 envCheck.FIREBASE_PRIVATE_KEY.exists,
        details: envCheck
    });
};

