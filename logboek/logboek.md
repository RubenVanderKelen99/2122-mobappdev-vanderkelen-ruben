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
- persistentie user <br/>
Validatie email-adres: juiste formaat abc@def.xyz. <br/>
Validatie wachtwoord en controle-wachtwoord: sterk genoeg (8 karakters, 1 grote letter, 1 kleine letter en 1 getal) en komen overeen. <br/>
Sign out functionaliteit (voorlopig) op homescreen. <br/>
Opslaan gebruikersdata in firestore database en toevoegen persistentie gebruiker.

#### Problemen
1. LoginScreen: Er wordt geen data doorgegeven bij het submitten van de form.
2. Errors Firebase worden nergens opgevangen.
3. AVD wilt niet opstarten wanneer ik op power klik.
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
3. AVD manager -> Actions -> Cold Boot Now
#### Bronnen
- https://medium.com/swlh/lets-create-mobile-app-with-react-native-and-firebase-6967a7946408
- https://reactnavigation.org/docs/stack-navigator/
- https://react-hook-form.com/get-started/
- https://www.section.io/engineering-education/password-strength-checker-javascript/
- https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/

### Week 6
#### Gedaan
Logica CompleteProfileScreen: hierop wordt extra data van de gebruiker opgevraagd (email, naam, achternaam, geboortedatum, land), <br/>
deze wordt gevalideerd, eventuele errors worden weergegeven en indien correct wordt de data doorgegeven aan Firestore. <br/>
Werkende datetimepicker gerealiseerd. Deze werd later weer verwijdert wegens te ongebruiksvriendelijk (te klein, niet praktisch: maand, jaar zoeken). <br/>
Picker wordt gebruikt om maand te selecteren en CountryPicker om een land te selecteren. <br/>
Validatie email-adres: juiste formaat abc@def.xyz. <br/>
Validatie geboortedatum: dag: enkel cijfers, aantal cijfers >=2, correcte dag: 1-31 (later wil ik dit laten afhangen van maand). <br/>
Validatie geboortedatum: jaar: enkel cijfers, aantal cijfers = 4, correct jaar: 1900-2020 (later wil ik via huidig jaar controleren of leeftijd >=18). <br/>
Validatie geboortedatum: maand: er werd een maand gekozen, correcte maand: 1-12. <br/>
Implementeren Keyboardavoidingview samen met ScrollView. <br/>
#### Problemen
1. De module react-native-date-picker geeft volgende error:
```
Invariant Violation: requireNativeComponent: "DatePickerManager" was not found in the UIManager.
```
2. Wanneer er in de DateTimePicker op cancel wordt geklikt krijg ik:
```
Invariant Violation: A date or time should be specified as `value`.
```
3. Het is niet mogelijk om aan Picker een label mee te geven, dus deze wordt gewoon meegetoont in de lijst.
4. Error bij het implementeren van ScrollView:
```
Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, o
r you might have mixed up default and named imports.
```
#### Opgelost
1. Expo ondersteunt geen native modules en react-native-date-picker is er zo een, overgeschakeld naar @react-native-community/datetimepicker.
2. In de OnChange functie moet er gekeken worden welk type evenment het is: selected -> setDate, dismissed -> doe niets.
3. Via native-base zou dit mogelijk zijn? maar dit geeft andere errors.
4. Scroll**view** moest Scroll**View** zijn.
#### Bronnen
- https://docs.expo.dev/versions/latest/sdk/date-time-picker/
- https://github.com/react-native-datetimepicker/datetimepicker#timepickerandroid
- https://react-hook-form.com/api/useform/register
- https://github.com/react-native-picker/picker
- https://docs.nativebase.io/3.0.0-next.40/installation
- https://github.com/xcarpentier/react-native-country-picker-modal
- https://reactnavigation.org/docs/params/
- https://www.positronx.io/react-native-stack-navigator-passing-getting-params-to-screen/
- https://reactnative.dev/docs/scrollview
- https://reactnative.dev/docs/keyboardavoidingview
- https://stackoverflow.com/questions/40438986/keyboardavoidingview-with-scrollview

### Week 7
#### Gedaan
LoginScreen, RegistrationScreen: styling.
HomeScreen: styling, UI rounded buttons menu en my-location via react-native-elements.
Implementatie functionaliteit toon/verberg wachtwoord.
#### Problemen
1. Bij het weergeven van een Image krijg ik volgende error:
```
Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have
mixed up default and named imports.

Check the render method of `RegistrationScreen`.
```
#### Opgelost
1. Ik had de Image foutief onder react geimporteerd en dit moest onder react-native.
#### Bronnen
- https://callstack.github.io/react-native-paper/icons.html
- https://reactnative.dev/docs/text
- https://reactnativeelements.com/
- https://reactnativeelements.com/docs/icon
- https://reactnative.dev/docs/touchableopacity

### Week 8
#### Gedaan
Implementatie functionaliteit toon/verberg wachtwoord.
#### Problemen
1. Expo wilt niet meer opstarten:
```
Error: error:0308010C:digital envelope routines::unsupported
```
#### Opgelost
1. Blijkbaar heeft dit te maken met een incompatibele node versie: <br/>
Om dit op te lossen waren er verschillende stappen:
- nvm voor windows installeren: uninstall node.js, verwijderen oude files
- installeren nvm-windows van github
- huidige lts versie node installeren: nvm install lts
- huidige lts versie node in gebruik nemen: nvm use lts
- globale utilities herinstalleren: yarn, expo
- opstarten project/expo: werkt
#### Bronnen
- https://stackoverflow.com/questions/69692842/error0308010cdigital-envelope-routinesunsupported
- https://github.com/nvm-sh/nvm
- https://nodejs.org/en/about/releases/

### Week 9
#### Gedaan
De setup van stack navigator was nog niet volledig goed: bepaalde dependecies/imports
ontbraken.
#### Problemen
1. ontbrekende dependencies/imports Stack Nav.
#### Opgelost
1. toevoegen dependencies//imports
#### Bronnen
- https://reactnavigation.org/docs/getting-started/

### Week 10
#### Gedaan
Setup en implementatie van drawer navigation. <br/>
Nesten drawer navigator in stack navigator. <br/>
Aanmaken nieuwe screens: History, Promotions, FAQ & About. Routering naar deze schermen via drawer navigator. <br/>
Toevoegen back button/header aan nieuwe screens. <br/>
#### Problemen
Geen problemen ondervonden.
#### Opgelost
Geen problemen ondervonden.
#### Bronnen
- https://reactnavigation.org/docs/drawer-navigator/
- https://www.youtube.com/watch?v=ayxRtBHw754

### Week 11
#### Gedaan
Nieuwe file aangemaakt drawerContent. <br/>
Tutorial youtube gevold om drawerContent aan te maken. <br/>
Implementatie logica drawerContent in drawer navigatie. <br/>
UI FAQ pagina. <br/>
#### Problemen
Geen problemen ondervonden.
#### Opgelost
Geen problemen ondervonden.
#### Bronnen
- https://reactnavigation.org/docs/drawer-navigator/
- https://www.youtube.com/watch?v=ayxRtBHw754
- https://medium.com/backticks-tildes/customizing-react-navigation-drawer-cf60c01a296a

### Week 12
#### Gedaan
UI FAQ pagina verder uitgewerkt d.m.v. Accordion List van React Native Paper.<br/>
Weergeven van kaart en huidige gebruikerslocatie op de homepage. <br/>
UI Promotiecode pagina. <br/>
#### Problemen
1. De initialregion van de MapView wordt niet correct ingesteld omdat de latitude/longtitude variabelen nog undefined zijn. Deze worden dus niet correct ingesteld in de useEffect().
#### Opgelost
1. Door het toepassen van conditional rendering op de MapView word deze pas getoond nadat de lat/lon correct werden ingesteld (setState).
#### Bronnen
- https://callstack.github.io/react-native-paper/list-accordion.html
- https://callstack.github.io/react-native-paper/list-item.html
- https://docs.expo.dev/versions/latest/sdk/map-view/
- https://docs.expo.dev/versions/latest/sdk/location/#usage
- https://medium.com/geekculture/track-user-location-in-react-native-204bc489ed6b

### Week 13
#### Gedaan
UI mapview & logica toUserLocation.<br/>
Aanpassen security rules firestore database.<br/>
Inlezen data uit firestore database met nieuwe security rules.<br/>
#### Problemen
1. Wanneer zIndex toegepast wordt op de buttons zal de kaart maar zo groot zijn als de buttons zelf.
2. Het is niet mogelijk om de mapview rechstreeks aan te spreken:
```   
TypeError: undefined is not an object (evaluating '_this.mapView')
```
#### Opgelost
1. De verschillende views waarin de mapView inzit voorzaken dit, deze zijn nu aangepast en het probleem is opgelost.
2. Door gebruik te maken van een ref en na aanpassen van de aan te roepen methode (mapViewRef.animateToRegion -> mapViewRef.current.animateToRegion) werkt dit wel.
#### Bronnen
- https://docs.expo.dev/versions/latest/sdk/map-view/
- https://reactnative.dev/docs/layout-props#bottom
- https://www.youtube.com/watch?v=BQBUUJb0n8Q
- https://github.com/react-native-maps/react-native-maps/blob/master/docs/mapview.md
- https://reactjs.org/docs/refs-and-the-dom.html
- https://pretagteam.com/question/reactnativehow-to-use-map-and-ref-together
- https://firebase.google.com/docs/rules
- https://firebase.google.com/docs/firestore/security/get-started

### Week 14
#### Gedaan
Expo account integratie a.d.h.v. youtube tutorial. <br/>
Genereren app bundle: app.json file aanpassen, keystores laten aanmaken (madLift4You.jks) & app bundle. <br/>
Google play store account aanmaken (playstore account: rubenvdk, email: vanderkelenruben@gmail.com). <br/>
Genereren api key google play store account (pc-api-8335892221988097473-56-cc18bcc4fad4.json). <br/>
Primaire winkelvermelding: naam, beschrijving, icon toevoegen & Play store graphics. <br/>
App op playstore zetten (status: wordt beoordeeld). <br/>
#### Problemen
Geen problemen ondervonden.
#### Opgelost
Geen problemen ondervonden.
#### Bronnen
- https://www.youtube.com/watch?v=z8XYPm8Lgsc
- https://www.youtube.com/watch?v=7DQbbTQpUjQ
- https://www.youtube.com/watch?v=2KTtvwAvV4I
- https://www.youtube.com/watch?v=oC7XwWRyCd0
- https://www.youtube.com/watch?v=zY1fQWCetXw
- https://www.youtube.com/watch?v=cQrIateTW_0
- https://www.youtube.com/watch?v=nFCWY-BwTBQ

### Week 15
#### Gedaan
UI HomeScreenverder uitgewerkt. <br/>
Afwerking sidebar menu: costum drawer navigation. <br/>
#### Problemen
Geen problemen ondervonden.
#### Opgelost
Geen problemen ondervonden.
#### Bronnen
- https://www.youtube.com/watch?v=ayxRtBHw754

### Week 16
#### Gedaan
Datastructuuren firestore database kiezen. <br/>
Werken aan firestore database security rules. <br/>
Data uit firestore database ophalen en weergeven (FAQ-pagina). <br/>
Markers toevoegen aan Mapview. <br/>
#### Problemen
1. De functie push() werkt niet om data te pushen naar een state array.
```   
TypeError: setFaqs.push is not a function. (In 'setFaqs.push(doc.data())', 'setFaqs.push' is undefined)]
```
2. Het is niet mogelijk om een for-loop in JSX te gebruiken er moet dus op een andere manier door de array geloopd worden.
#### Opgelost
1. Door gebruik te maken van concat() lukt dit wel
``` 
setFaqs(faqs => faqs.concat(doc.data()))
```
2. De map() functie kan hiervoor gebruikt worden in react native.
#### Bronnen
- https://firebase.google.com/docs/firestore/manage-data/structure-data
- https://firebase.google.com/docs/firestore/query-data/get-data
- https://firebase.google.com/docs/firestore/query-data/queries
- https://firebase.google.com/docs/firestore/security/rules-conditions
- https://firebase.google.com/docs/firestore/security/rules-structure  
- https://stackoverflow.com/questions/67918324/firebase-cloud-firestore-security-rules-only-allow-read-not-write
- https://reactjs.org/docs/lists-and-keys.html  
- https://javascript.plainenglish.io/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
- https://github.com/react-native-maps/react-native-maps  
- https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md
- https://medium.com/@clarkjohnson_85334/adding-fetched-markers-to-my-react-native-maps-app-5f068c7be14d

### Week 17
#### Gedaan
UI HomeScreen finale versie. <br/>
Gebruikersdata opslaan in firestore database. <br/>
Zones (met auto's & openingsuren) in firestore database steken. <br/>
Watcher op locatiedata van gebruiker (luisterd naar locatie-updates) met cleanup. <br/>
Zones uit firestore weergeven op de Mapview. <br/>
Aanmaken ZonesScreen en opzetten routering. <br/>
Data lokaal opslaan met AsyncStorage. <br/>
Userdata uit AsyncStorage weergeven op HomeScreen. <br/>
AboutUsdata uit AsyncStorage weergeven op AboutScreen. <br/>
Afstand tussen gebruikerslocatie & zones berekenen met AsyncStorage. <br/>
Zones sorteren op afstand (van gebruikerslocatie). <br/>
Vanuit 3 dichstbijzijnde locaties op HomeScreen.js rechstreeks naar details op ZonesScreen.js. <br/>
Aanmaken OrderScreen en opzetten routering. <br/>
MapView voor gebruik bij standalone app correct instellen. <br/>
App-bundle maken en play-store listing updaten. <br/>
Uitwerking administratiepaneel. <br/>
#### Problemen
1. Bij het weergeven van de FAQ komt er:
```    
Warning: Each child in a list should have a unique "key" prop.
Check the render method of `FAQScreen`. See https://fb.me/react-warning-keys for more information.
```
2. Bij het teruggaan op sommige schermen verschijnt er een error:
```   
The action 'GO_BACK' was not handled by any navigator.
Is there any screen to go back to?
This is a development-only warning and won't be shown in production.
```
3. De data uit firebase kan niet rechtstreeks gebruikt worden om markers op de mapview weer te geven, error zegt:
```     
Warning: Failed prop type: Invalid prop `coordinate` of type `number` supplied to `MapMarker`, expected `object`.
```
4. Bij het berekenen van de afstand tussen 2 punten (user & zone) met getDistance() van geolib geeft deze NaN weer.
5. Veel problemen bij het zetten van states.
6. Het is niet mogelijk om functies van localDataStore.js in andere functies van de localDataStore aan te roepen.
``` 
Can't find variable: getSortedZonesWithDistance
```
7. Bij een locatieupdate wordt de callback functie in Location.watchPositionAsync() meerdere keren aangeroepen waardoor er enorm veel variabelen moeten berekend/gewijzigd worden.
8. De afstand van zones in de ZonesScreen verandert niet wanneer de userlocation verandert. Deze blijft hetzelfde zolang de app draait.
9. De toolbaar van react-native-maps verschijnt niet (gebruikt om route te bepalen met Google Maps). Dit probleem is al sinds 2016 bekend maar er is nog geen echte oplossing (https://github.com/react-native-maps/react-native-maps/search?q=toolbar&type=issues).
#### Opgelost
1. ?
2. Eerst controleren of de navigatie terugkan en zo niet: terug naar HomeScreen
``` 
if (navigation.canGoBack())
   navigation.goBack()
else
   navigation.navigate('home')
```
3. De Coordinate-prop van de Marker moet expliciet opgesplitst worden:
```       
coordinate={{
latitude: marker.location.latitude,
longitude: marker.location.longitude
}}
```
4. De latitude en longitude moeten expliciet opgenoemd worden bij methode-aanroep.
```
//d.i. fout:    
zoneData.distance = getDistance(
{currentLatitude, currentLongitude},
{zoneLatitude, zoneLongitude}
);
//d.i. juist:
zoneData.distance = getDistance(
{latitude: currentLatitude, longitude: currentLongitude},
{latitude: zoneLatitude, longitude: zoneLongitude}
);
```
5. Het updaten van states is async en een state mag dus niet gebaseerd zijn op een andere state. Oplossing: in UseEffect luisteren naar veranderingen in state.
6. Door de functieaanroep anders the formuleren (this.function()) werkt dit wel.
7. Kan opgelost worden door de accuracy van Location.watchPositionAsync op high te zetten.
```   
let locationUpdate = await Location.watchPositionAsync({accuracy: Location.Accuracy.High, ...);
```
8. Door gebruik te maken useFocusEffect van react-navigation kunnen er state updates gedaan worden wanneer het scherm gefocusd wordt.
9. Door de MapView eenmalig te resizen werkt de toolbar.
#### Bronnen
- https://fb.me/react-warning-keys
- https://medium.com/swlh/lets-create-mobile-app-with-react-native-and-firebase-6967a7946408
- https://github.com/react-navigation/react-navigation/issues/8771  
- https://stackoverflow.com/questions/61950258/firebase-cloud-database-rules-how-to-retrieve-data-only-where-the-user-id-match
- https://www.youtube.com/watch?v=4N-8RTeQ1fA
- https://blog.kiprosh.com/react-native-custom-google-maps-with-track-location/
- https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once  
- https://aboutreact.com/react-native-calculate-distance-between-two-locations/
- https://www.youtube.com/watch?v=PRGHWgTydyQ  
- https://www.codegrepper.com/code-examples/javascript/firestore+delete+document+and+subcollection
- https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
- https://stackoverflow.com/questions/36085726/why-is-setstate-in-reactjs-async-instead-of-sync
- https://stackoverflow.com/questions/62035096/react-native-call-function-when-a-specific-state-changes
- https://github.com/manuelbieh/geolib  
- https://github.com/react-native-async-storage/async-storage
- https://react-native-async-storage.github.io/async-storage/docs/install/
- https://www.youtube.com/watch?v=PRGHWgTydyQ&t=720s
- https://stackoverflow.com/questions/47876754/query-firestore-database-for-document-id
- https://www.w3schools.com/js/js_array_sort.asp
- https://reactnavigation.org/docs/function-after-focusing-screen/
- https://medium.com/nerd-for-tech/react-native-custom-search-bar-with-google-places-autocomplete-api-69b1c98de6a0
- https://reactnavigation.org/docs/use-focus-effect/
- https://www.youtube.com/watch?v=05q7aEeye_0&list=PLk8gdrb2DmCjsRsDIwMBJdf350qKMiJ8R


### To-do
- Bij updaten play store: version code in app.json naar 2 (1 -> 2)
### Planning
#### 16 Januari:
- zoeken op zoneScreen met autocomplete bij search https://medium.com/nerd-for-tech/react-native-custom-search-bar-with-google-places-autocomplete-api-69b1c98de6a0
#### 17:30
- Transactie starten vanuit gelesecteerde auto
- Transacties in firestore steken
- Reminder voor Transacties (ophalen/leveren) in agenda ?
- Handelingen bevestigen op tijdstip
- Alle transacties (actief, voltooid, geanulleerd) weergeven op HistoryScreen
#### 19:00  
- data verwijderen uit AsyncStorage bij logout, ...
- wat doen bij location.permission.denied?  
- firestore database security rules
- styling andere files bekijken
  
- Beveiligde authenticatie en autorisatie: OAuth2, OpenID Connect, JWT etc. (vereiste) nog bekijken
- updaten naar Playstore (version code in app.json naar 2 (1 -> 2))
- data sync nog eens bekijken
- laatste aanpassingen, testen van app/bugfixing
- Deadline is om 20u -> finale push naar git
#### Als er nog extra tijd is:
- zonedata weergeven op homescreen: extra data bij click op marker
- app check voor firestore database: https://firebase.google.com/docs/app-check
- Pushnotificaties voor gebeurtenissen (rit start, rit bijna gedaan, ...)
- UserDetailsScreen: Details gebruiker weergeven, aanpasvelden
- afbeeldingen toevoegen aan zones
- Reminder voor Transacties (ophalen/leveren) in agenda ?