# Logboek Mobile Application Development 2021-2022
### Taxi app - Ruben Van der Kelen

### Week 1
Prototype in Figma gemaakt die de volgende pagina's bevat: Aanmelden, Verificatie identiteit, Home, Rit Aanmaken (met en zonder tussenstop), Rit bevestigen, Menu (Sidebar), Betalingen, Reisgeschiedenis en Promoties.

### Week 2
Verder afwerken van het prototype in Figma en inplannen user testen hiervan.
Database design en uitwerking eerste versie in Back4App.
Research van ReactNative, NativeBase en installatie project hiervan.
Leren werken met Android Studio.

### Week 3
#### Gedaan
User test uitgevoerd met Stijn Rogiest en Moise VanKeymeulen.
Veel tijd verloren aan het proberen verbinden met de Parse API van Back4App +/- 8 uur (zie problemen).
Toestemming gevraagd aan docent om over te schakelen op Firebase.
Dit voorstel werd goedgekeurd, nu overgeschakeld naar Firebase als backend.
#### Problemen
1. Bij het toevoegen van Back4App is het niet mogelijk om het commando cd ios & pod-install uit te voeren.
2. Ik kan niet verbinden met de parse-server van Back4App.
   Ik krijg: Possible Unhandled Promise Rejection (id: 1) en Error: XMLHttpRequest failed: "Unable to connect to the Parse API".
#### Opgelost
1. pod-install is enkel nodig voor het developen in ios en dit laat ik momenteel achterwege.
2. geprobeerd: nieuwe app aanmaken op Back4App, nieuwe gebruiker aanmaken op Back4App, Parse-server downgraden naar vorige versie, werken met request headers, debugging.
   'oplossing': overgeschakeld naar Firebase.
#### Bronnen
- https://www.back4app.com/docs/react-native/parse-sdk/react-native-sdk
- https://www.back4app.com/docs/android/login-android-tutorial
- https://www.npmjs.com/package/@parse/react-native
- https://github.com/parse-community/parse-server/issues/667
- https://rnfirebase.io/
- https://rnfirebase.io/auth/usage
- https://firebase.google.com/docs/firestore/security/get-started
- https://firebase.google.com/docs/firestore/manage-data/structure-data
- https://www.freecodecamp.org/news/the-firestore-tutorial-for-2020-learn-by-example/
