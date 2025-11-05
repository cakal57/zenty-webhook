# 🚀 Zenty AI Webhook Server - Kurulum Rehberi

## 📋 İçindekiler
1. [Vercel ile Deploy (Kolay)](#vercel-ile-deploy)
2. [GitHub'a Yükle](#githuba-yükle)
3. [TradingView Alert Kur](#tradingview-alert)
4. [Test Et](#test)

---

## 🎯 YÖNTEM 1: Vercel ile Deploy (EN KOLAY!)

### ADIM 1: Vercel Hesabı Aç

1. **https://vercel.com** adresine git
2. **"Sign Up"** tıkla
3. **"Continue with GitHub"** seç (GitHub hesabı gerekli)
4. GitHub'da **"Authorize Vercel"** tıkla

### ADIM 2: Dosyaları GitHub'a Yükle

#### **Windows PowerShell:**
```powershell
# Webhook klasörüne git
cd C:\Users\yasar\CURSOR\webhook-server

# Git başlat (ilk kez ise)
git init

# Dosyaları ekle
git add .

# Commit
git commit -m "Zenty webhook server"

# GitHub'da yeni repo oluştur: https://github.com/new
# Repo adı: zenty-webhook

# Remote ekle (SENIN_KULLANICI_ADIN yerine GitHub kullanıcı adını yaz)
git remote add origin https://github.com/SENIN_KULLANICI_ADIN/zenty-webhook.git

# Push et
git branch -M main
git push -u origin main
```

#### **VEYA GitHub Desktop Kullan (Daha Kolay!):**
1. **GitHub Desktop** indir: https://desktop.github.com/
2. **File** → **Add Local Repository** → `C:\Users\yasar\CURSOR\webhook-server` seç
3. **Publish Repository** tıkla
4. Repository name: `zenty-webhook`
5. **Publish** tıkla ✅

### ADIM 3: Vercel'e Deploy Et

1. **https://vercel.com/dashboard** git
2. **"New Project"** tıkla
3. **"Import Git Repository"** seç
4. **"zenty-webhook"** reposunu seç
5. **Framework Preset:** "Other" bırak
6. **"Deploy"** tıkla

### ADIM 4: URL'yi Kopyala

Deploy bitince:
1. **"View Project"** tıkla
2. **URL'yi kopyala** (örn: `https://zenty-webhook.vercel.app`)
3. Webhook URL'in: `https://zenty-webhook.vercel.app/api/webhook` ✅

---

## 🔔 TradingView Alert Kurulumu

### ADIM 1: Pine Script Ekle

1. **TradingView** → https://www.tradingview.com/chart/
2. Herhangi bir coin seç (örn: BTCUSDT)
3. Alt panelde **"Pine Editor"** tıkla
4. **"Open"** → **"New indicator"** tıkla
5. `YASAR-AI-ULTIMATE-PRO.pine` dosyasındaki **TÜM KODU** kopyala
6. Pine Editor'e yapıştır
7. **Ctrl+S** → İsim: **"Yasar AI Ultra"**
8. **"Add to Chart"** tıkla

### ADIM 2: Alert Oluştur

1. Chart'ta sağ üstte **🔔 Alert** ikonu
2. **"Create Alert"** tıkla

**Ayarlar:**

**Condition:**
- Dropdown 1: **"Yasar AI Ultra"** seç
- Dropdown 2: **"Any alert() function call"** seç

**Alert name:**
```
Zenty AI - {{ticker}}
```

**Message:**
```json
{
  "symbol": "{{ticker}}",
  "signal": "LONG",
  "price": {{close}},
  "confluenceScore": 85,
  "rsi": 65,
  "cvd": 12500,
  "whaleBuy": true,
  "whaleSell": false,
  "orderBlock": true,
  "liquidationLevel": 95000,
  "exchange": "{{exchange}}",
  "interval": "{{interval}}"
}
```

**Options:**
- ✅ **Webhook URL:** `https://zenty-webhook.vercel.app/api/webhook` (senin URL'in)
- ✅ **Once Per Bar Close** (önemli!)
- ✅ **Open-ended alert** (sürekli çalışsın)

**"Create"** tıkla! ✅

---

## ✅ TEST ET

### Vercel Logs'a Bak

1. **https://vercel.com/dashboard** git
2. Projena tıkla → **"Logs"** sekmesi
3. Birkaç dakika bekle (TradingView sinyali göndermeli)
4. Log'larda göreceksin:

```
📊 ZENTY AI SIGNAL RECEIVED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Time: 5.11.2025 14:30:15
📍 Symbol: BTCUSDT
🎯 Signal: LONG
💰 Price: 97458
⭐ Confluence: 85 %
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### ÇALIŞIYORSA: 🎉
Webhook aktif! Artık TradingView'dan gelen her sinyal Vercel'e kaydediliyor!

### ÇALIŞMIYORSA: ⚠️
1. Alert ayarlarını kontrol et
2. Webhook URL doğru mu?
3. Pine Script chart'ta mı?
4. Alert aktif mi? (TradingView'da sağ üstte 🔔 yanında sayı olmalı)

---

## 🔧 Sorun Giderme

### "Method not allowed" hatası:
- Alert'te **POST** method seçili olmalı
- Webhook URL'de `/api/webhook` var mı kontrol et

### "CORS error":
- Normal! Tarayıcıdan test edersen CORS hatası alırsın
- TradingView'dan gönderince çalışır

### Log'larda hiçbir şey yok:
- TradingView alert aktif mi?
- Chart'ta Pine Script eklendi mi?
- Sinyal çıktı mı? (Chart'ta 🤖💎 ikonu olmalı)

---

## 📊 Multi-Coin Setup (Opsiyonel)

Her coin için ayrı alert kur:
1. BTCUSDT → Alert kur
2. ETHUSDT → Alert kur
3. BNBUSDT → Alert kur
4. ...

TradingView Pro: **400 alert** kurabilirsin! 🚀

---

## 🤖 Telegram Entegrasyonu (Sonraki Adım)

Webhook'a Telegram bot ekleyerek **anlık bildirim** alabilirsin!

Detaylar: `TRADINGVIEW-WEBHOOK-KURULUM.md` dosyasında 📱

---

## ✅ Tamamlandı!

Webhook server çalışıyor! 🎉

**Sonraki adım:** `index.html` → Webhook verilerini göster

