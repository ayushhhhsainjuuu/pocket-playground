# ADR-004: Data Storage

## Status

Approved

## Context

Pocket Playground is a hub-based Android application that contains multiple mini-games and interactive tools.

The app needs to persist lightweight, non-sensitive data including:

- High scores
- Basic user settings
- Favorite games
- Simple configuration data

The application does not require user authentication, online accounts, real-time synchronization, or shared data across devices.

The selected storage solution must remain within the scope of this course and avoid unnecessary backend complexity or infrastructure setup.

## Decision

We will use Local Storage (AsyncStorage in React Native) to store non-sensitive application data.

We will not implement a remote database (e.g., Firebase) or cloud-based storage for this project.

Encryption will not be used because the stored data does not contain sensitive information.

## Rationale

- The application only stores non-sensitive data such as scores and preferences.
- No real-time syncing or account system is required.
- Local storage is sufficient and efficient for simple key-value persistence.
- Avoids backend setup, authentication flows, and cloud configuration.
- Reduces architectural complexity and development risk.
- Ensures full offline functionality.
- Keeps the project within semester scope and team capability.

## Consequences

### Positive

- No internet dependency
- Faster development and easier testing
- No backend configuration required
- Reliable offline operation
- Lower architectural risk

### Negative

- Data will not sync across multiple devices
- Data may be lost if the app is uninstalled
- Not suitable for future multi-user or cloud-based expansion without redesign
