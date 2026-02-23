\# ADR-004: Data Storage



\## Status

Approved



\## Context

Pocket Playground is a hub-based Android application that contains multiple mini-games and interactive tools.

The app may need to store:



\- High scores

\- Basic user settings

\- Favorite games

\- Simple configuration data



The app does not require user accounts or cloud synchronization.



The solution must remain within the scope of this course and avoid unnecessary backend complexity.



\## Decision

We will use \*\*Local Storage (AsyncStorage or equivalent local storage solution)\*\*.



We will not use a remote database (e.g., Firebase) for this project.



\## Rationale

\- The app does not require real-time syncing or online accounts.

\- Local storage is sufficient for high scores and user preferences.

\- Reduces setup complexity and deployment risk.

\- Works offline.

\- Keeps project scope manageable within semester timeline.



\## Consequences



\### Positive

\- No internet dependency

\- Faster development and easier testing

\- No backend configuration required

\- Better reliability for simple data needs



\### Negative

\- Data will not sync across multiple devices

\- Data may be lost if the app is uninstalled

