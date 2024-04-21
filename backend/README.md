# Express OpenAPI scaffold

Egy repo, amivel gyorsan fel lehet húzni egy Express-es OpenAPI 3-as backendet.

## Indulás

Le kell klónozni a repot, és utána ki kell törölni a `.git` mappát:

```shell
cp .env.example .env
rm -r .git/
```

## Felépítés

```
project/
├── api/                    API controllerek listája
│   ├── cards/
│   │   └── GetCards.js     példa endpoint függvény
│   ├── openapi.yaml        endpointok leírása OpenAPI 3 formátumban
├── common/                 általános függvények
├── dependencies/           függőségek regisztrációja
├── middleware/             express middlewarek
├── migrations/             SQL fájlok, amik leírják az adatbázis módosításokat
├── models/                 Sequelize modellek listája
├── services/               service-ek listája
├── .env                    környezeti változók definiálása
├── config.js               konfigurációs fájl
└── index.js                belépési pont a szerverbe
```
