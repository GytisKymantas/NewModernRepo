# self-service-jar-provider-ui

## Aprašymas

Ši aplikacija yra modernizuotos Juridinių Asmenų Registro Informacinės Sistemos (JAR IS) dalis.
Savitarnos React UI microfrontend aplikacija.


## Projekto paleidimas 'development' režime

```
npm i
npm run dev
```

## Standalone paleidimas 
- Lokaliai pridėtas @rc-ses/mfe-host modulis
- Pamodifikuota webpack konfigūracija (kaip resolvint mfe-host ir kad react'as nebūtų external)
```
npm install
npm run build
npm run dev:standalone
```
