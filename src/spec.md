# Specification

## Summary
**Goal:** Add a dedicated title page at route “/” that prominently shows the app name “ANIMEXIS” and an owner-name line in English, with an explicit way to proceed to the existing gallery at “/gallery”.

**Planned changes:**
- Add a new title page at route “/” and make it the first screen shown on app load (instead of the gallery).
- Update the existing letter-by-letter title component to render two lines: the main title (“ANIMEXIS”) and a prominent owner line (e.g., “Created by Ashwath”), with reduced-motion support (no animated reveal when preferred).
- Add a clear, non-scroll-gated navigation affordance on the title page to go to “/gallery” (e.g., a link or button), keeping the gallery behavior unchanged after navigation.

**User-visible outcome:** When the app opens, users land on a title page showing “ANIMEXIS” and a prominent creator line in English, and can proceed to the gallery via an explicit link/button without needing to scroll.
