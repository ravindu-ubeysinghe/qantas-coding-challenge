# Qantas coding challenge

Mockup 👉

![Mockup](/page-mock.jpg)

[Original instructions](/instructions.md)

## ⚙️ Requirements for initial set up

- Install the latest node stable version: 22.13.1
- Install `yarn`
- `cd` into the project directory and run `yarn` to install all the required dependencies
- Run `yarn dev` to start up the Next.js dev server with HMR

## 👨‍💻 Technologies/Frameworks used

- Next.js, React.js and Typescript
- Material UI and Material UI icons
- Jest along with React Testing Library

## 📚 Component structure

### Containers

Containers are responsible for fetching data, composing a high level layout using several pure components and maintaining any global states required to facilitate a feature

### Pure

Pure components are low level building blocks that could be re-used and are often imported into containers to form comprehensive features

### Trade-offs

Provided there was more time:

- The component structure could be cleaned up/improved a bit
- A proper global theme could be defined to clearly expose brand colours and spacing values etc. to minimise any misuses in the future and to avoid having to duplicate them throughout the codebase
- The structured schema definitions could be improved to cover things like proper addresses
