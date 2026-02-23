\# ADR-003: Hardware Features



\## Status

Approved



\## Context

Pocket Playground is a hub-based Android application that launches multiple small games and interactive tools.

One of the project goals is to explore mobile APIs and hardware features across different experiences.

However, the team must choose features that are realistic to implement within the course timeline and team skillset.



We want hardware features that:

\- work well for mini-games / interactive tools

\- are available on most Android devices

\- are low-risk to implement and test



\## Decision

We will support the following hardware / device features:



1\. \*\*Motion Sensors (Accelerometer / Gyroscope)\*\*

&nbsp;  - Used for tilt-based controls or movement-based mini-games (e.g., balance game, tilt maze).



2\. \*\*Haptics / Vibration\*\*

&nbsp;  - Used for feedback on interactions (e.g., button taps, collisions, success/fail feedback).



3\. \*\*Audio Output (Speaker)\*\*

&nbsp;  - Used for simple sound effects and game feedback.



We will \*\*not\*\* require GPS or fingerprint authentication for Phase 2/4 because they increase complexity and do not strongly align with the “hub of mini-games” concept.



\## Rationale

\- Sensors support fun interactive experiences and align with the project’s learning goals.

\- Vibration and audio improve user feedback and game feel with minimal implementation risk.

\- Avoiding GPS/fingerprint keeps the scope manageable and reduces device-permission complexity.



\## Consequences



\### Positive

\- Supports a variety of unique mini-games and tools

\- Encourages experimentation with mobile APIs

\- Minimal user permissions required (especially for vibration/audio)

\- Easier testing across team devices



\### Negative

\- Sensor behavior can vary between devices, requiring calibration/testing

\- Audio and haptics must be implemented consistently to avoid noisy/annoying UX

