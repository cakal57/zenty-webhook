Windows PowerShell
Copyright (C) Microsoft Corporation. Alle Rechte vorbehalten.

Installieren Sie die neueste PowerShell für neue Funktionen und Verbesserungen! https://aka.ms/PSWindows

PS C:\Users\yasar> $body = @{
>>     symbol = "BTCUSDT"
>>     signal = "🔥 FINAL TEST"
>>     price = 69000
>>     confluenceScore = 100
>>     rsi = 70
>>     whaleBuy = $true
>>     exchange = "BINANCE"
>>     interval = "15m"
>> } | ConvertTo-Json
PS C:\Users\yasar>
PS C:\Users\yasar> Invoke-RestMethod -Uri "https://zenty-webhook.vercel.app/api/webhook" -Method POST -Body $body -ContentType "application/json"
Invoke-RestMethod : A server error has occurred
FUNCTION_INVOCATION_FAILED
fra1::hvmbg-1762427867106-2b998707ef1b
In Zeile:1 Zeichen:1
+ Invoke-RestMethod -Uri "https://zenty-webhook.vercel.app/api/webhook" ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (System.Net.HttpWebRequest:HttpWebRequest) [Invoke-RestMethod], WebExc
   eption
    + FullyQualifiedErrorId : WebCmdletWebResponseException,Microsoft.PowerShell.Commands.InvokeRestMethodCommand
PS C:\Users\yasar>

