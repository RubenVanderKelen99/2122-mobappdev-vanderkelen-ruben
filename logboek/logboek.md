# Logboek Mobile Application Development 2021-2022
### Taxi app - Ruben Van der Kelen

### Week 1
Prototype in Figma gemaakt die de volgende pagina's bevat: Aanmelden, Verificatie identiteit, Home, Rit Aanmaken (met en zonder tussenstop), Rit bevestigen, Menu (Sidebar), Betalingen, Reisgeschiedenis en Promoties.

### Week 2
Verder afwerken van het prototype in Figma en inplannen user testen hiervan. <br/>
Database design en uitwerking eerste versie in Back4App. <br/>
Research van ReactNative, NativeBase en installatie project hiervan. <br/>
Leren werken met Android Studio.

### Week 3
#### Gedaan
User test uitgevoerd met Stijn Rogiest en Moise VanKeymeulen. Verslag hierover gemaakt en prototype aangepast op basis van User tests. <br/>
Veel tijd verloren aan het proberen verbinden met de Parse API van Back4App +/- 8 uur (zie problemen). <br/>
Toestemming gevraagd aan docent om over te schakelen op Firebase. <br/>
Dit voorstel werd goedgekeurd, nu overgeschakeld naar Firebase als backend. <br/>
Installatie & setup React-Native Firebase.
#### Problemen
1. Bij het toevoegen van Back4App is het niet mogelijk om het commando cd ios & pod-install uit te voeren.
2. Ik kan niet verbinden met de parse-server van Back4App.
   Ik krijg: Possible Unhandled Promise Rejection (id: 1) en Error: XMLHttpRequest failed: "Unable to connect to the Parse API".
3. Build errors in Gradle: No signature of method: .android() is applicable for argument types. Exception in build.gradle (app)
4. in de app-level build.gradle krijg ik Error: Cannot resolve symbol 'build'
#### Opgelost
1. pod-install is enkel nodig voor het developen in ios en dit laat ik momenteel achterwege.
2. geprobeerd: nieuwe app aanmaken op Back4App, nieuwe gebruiker aanmaken op Back4App, Parse-server downgraden naar vorige versie, werken met request headers, debugging.
   'oplossing': overgeschakeld naar Firebase.
3. foutieve codeblocken verwijden uit app-level build.gradle (2122-mobappdev-vanderkelen-ruben/app/build.gradle), buildscript en allprojects had ik hier ingezet, maar
   dit moest in het project-level build.gradle d.i. (2122-mobappdev-vanderkelen-ruben/build.gradle).
4. Ik moest de android SDK Home Environment Variable instellen in Windows, variable name = ANDROID_HOME & value = C:\Users\Ruben\AppData\Local\Android\Sdk, na een restart werkt dit.
   Edit: de error is terug maar zorgt voor geen problemen tijdens het builden.
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
- https://firebase.google.com/docs/guides
- https://firebase.google.com/docs/samples
- https://reactnative.dev/docs/safeareaview

### Week 4
#### Gedaan
Tutorial freecodecamp gevolgd:
- Firebase correct instellen.
- routering opzetten (werken met screens).
- eerste versie van user authentication via Firebase.
#### Problemen
1. Bij het importeren van de screens in App.js krijg ik volgende error:
```
Error: Unable to resolve module ./screens from C:\Users\Ruben\Desktop\Mobile App Development\2122-mobappdev-vanderkelen-ruben\js\App.js:
None of these files exist:
* js\screens(.native|.android.ts|.native.ts|.ts|.android.tsx|.native.tsx|.tsx|.android.js|.native.js|.js|.android.jsx|.native.jsx|.jsx|.android.json|.native.json|.json)
* js\screens\index(.native|.android.ts|.native.ts|.ts|.android.tsx|.native.tsx|.tsx|.android.js|.native.js|.js|.android.jsx|.native.jsx|.jsx|.android.json|.native.json|.json)
```
#### Opgelost
1. Index.js moest een andere naam hebben: index.js.
#### Bronnen
- https://www.freecodecamp.org/news/react-native-firebase-tutorial/
- https://reactnavigation.org/docs/screen-options/

### Week 5
#### Gedaan
Na nog veel proberen werkt de connectie met Firebase nog niet => files verwijderen/opnieuw beginnen. <br/>
Tutorial medium.com gevolgd:
- Firebase correct instellen.
- verbinding maken met Firestore en weergeven dynamische data.
- routering opzetten (werken met screens) d.m.v. ReactNavigation.
- forms met validatie en doorgeven van data.
- user authentication via firebase (registreren/aanmelden).
- persistentie user
<br/>
Validatie email-adres: juiste formaat abc@def.xyz. <br/>
Validatie wachtwoord en controle-wachtwoord: sterk genoeg (8 karakters, 1 grote letter, 1 kleine letter en 1 getal) en komen overeen. <br/>
Sign out functionaliteit (voorlopig) op homescreen.
#### Problemen
1. LoginScreen: Er wordt geen data doorgegeven bij het submitten van de form.
2. Errors Firebase worden nergens opgevangen.
#### Opgelost
1. Syntax moest aangepast worden: **van**
```
render={({ onChange, onBlur, value }) => (
```
**naar**
```
render={({ **field:** { onChange, onBlur, value } }) => (
```
2. Overal waar er een firebase oproep gedaan word staat er:
```
.catch((error) => {
    alert(error)
});
```
#### Bronnen
- https://medium.com/swlh/lets-create-mobile-app-with-react-native-and-firebase-6967a7946408
- https://reactnavigation.org/docs/stack-navigator/
- https://react-hook-form.com/get-started/
- https://www.section.io/engineering-education/password-strength-checker-javascript/
- https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

### To-do
### Week 6
- User authentication: phone verification en login,
- Homescreen: Locatieservices (huidige locatie tonen, plaats zoeken,
- Hamburgermenu: Onderdelen weergeven & linken,

### Week 7/8/...
- Homescreen: Locatieservices verder uitwerken (route plannen, andere gebruikers weergeven),
- UserDetailsScreen: Details gebruiker weergeven, aanpasvelden,
- DriverDetailsScreen: Informatie gekozen chauffeur weergeven,
- CreateRideScreen: Tussenstop toevoegen, Locatieservices (plaats zoeken, routeplannen),
...
