# WebMappVenezia
Applicazione per rappresentare POI, servizi e informazioni geolocalizzate del territorio. L'applicazione è stata sviluppata per la Città metropolitana di Venezia e per gli enti che ne fanno parte, per valorizzare i servizi e le specificità dei territori.

Requisiti:
- Web Server con servizio di hosting (consigliato Ubuntu e Apache);
- Sencha command ( https://www.sencha.com/products/extjs/cmd-download/ )
- Cordova ( https://cordova.apache.org/ )
- Postgres

Istruzioni di riutilizzo

1. Scaricare la cartella del progetto quindi spostare la parte di backend all'interno di un web server;
2. Creare il database utilizzando lo script webmappvenezia.sql
3. Al percorso frontend/app/util modificare le variabili di url all'interno del file Services.js;
4. Dalla cartella di frontend lanciare il comando "sencha app build native" , il quale genererà al percorso dato in output l'apk dell'applicazione in versione debug;
5. Installare l'apk sul dispositivo.


Per testare l'applicativo tramite browser, lanciare dalla cartella frontend il comando "sencha app watch", quindi raggiungere l'indirizzo della macchina in cui è situato alla porta 1841.
