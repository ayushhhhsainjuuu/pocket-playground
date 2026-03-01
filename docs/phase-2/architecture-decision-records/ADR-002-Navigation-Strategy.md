\# ADR-002: Navigation Strategy



\## Status

Approved



\## Context

Pocket Playground is designed as a centralized hub that launches a collection of small games, tools, and interactive experiences.

Navigation must be simple, consistent across mini-games, and easy to expand as new experiences are added.



The app will need:

\- A Home/Hub screen that lists games/tools

\- A way to open an experience

\- A way to return back to the hub consistently

\- Optional screens such as Settings and About



\## Decision

We will use bottom Tab Navigation for top-level sections (Hub, Favorites/Library, settings.) And Stack Navigation within each tab for navigating into individual games/tools. 



\## Rationale

\- Tabs make it easy for users to switch between core sections without getting lost

\- Stack navigation allows clean transitions from Hub → Game Screen → Results/Score Screen (if needed)

\- Supports modular growth as more mini-games are added

\- Keeps UI consistent across the app and fits within project scope



\## Consequences



\### Positive

\- Clear, predictable navigation for users

\- Clean UX with high prototypicality

\- Modular system makes it easy to add new games/tools 

\- Clean back-navigation behavior (Back to Hub)

\- Works well for a “hub + experiences” app structure



\### Negative

\- Slightly more setup than using only a single navigator

\- Requires screens to be named consistently and conventionally to avoid confusion 

