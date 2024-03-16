# PolyBuddy

Our PolyBuddy app is a user-friendly tool designed to seamlessly guide users to their desired destinations, using Google Maps and the Mustang Shuttle, for university students and staff navigating the sprawling Cal Poly SLO campus. With intuitive and user-friendly features, PolyBuddy aims to eliminate the frustration and time wasted on finding classes and buildings, enhancing the overall campus experience.

View our deployment [here](https://mango-coast-050270d10.5.azurestaticapps.net/)!

## Developed By

Nathan Ip

Meyli Jaeger

Misaki Tanabe

Michael Montemurno

Michelle Chi

### UI Prototype

[Our Figma UI Prototype](https://www.figma.com/file/FOLkjA34MuM4At3CVWLIgr/Campus-Map-Prototype?type=design&node-id=81%3A50&mode=design&t=oKbUU3ubrdHgVDHl-1)
(Last Updated 2/29/24)

### Class Diagram

[UML Class Diagram](https://github.com/csc307-mnms/mnms-campus-app/wiki/UML-Class-Diagram)
(Last Updated 2/23/24)

### Code Coverage

![Screenshot 2024-03-15 at 10 21 05 PM](https://github.com/csc307-mnms/mnms-campus-app/assets/90160919/cd9a927e-49e9-4b73-b331-834e8fc0f46f)

(Last Updated 3/15/24)

## React App Set Up

Required Development Tools:

- Node.js: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- MongoDB: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- ESLint: `npm init @eslint/config`
- Prettier: `npm install --save-dev --save-exact prettier`

Steps:

1. Clone the repository using the HTTP URL link.

```
https://github.com/csc307-mnms/mnms-campus-app.git
```

2. Install required dependencies from main folder.

```
cd packages/express-backend && npm install && cd ..
cd packages/react-frontend && npm install && cd ..
```

3. Enable git pre-commit formatter and linter.

```
npm run installHooks
```

4.  Run in packages directory before committing.

```
npm run release
```

5. Run in both the express-backend and react-frontend directory to start the app.

```
npm start
```
