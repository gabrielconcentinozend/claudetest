# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-17

### Added
- **Migration Wizard** - Complete multi-step wizard modal flow
  - Intro screen with illustration and bonus card
  - Step 1: Select channels with Garden Table and checkboxes
  - Step 2: Review responses with expandable cards
  - Step 3: Set up AI agent with form fields
  - Step 4: Complete migration with animated progress
  - Success screen with confetti illustration
  
- **Save and Resume Functionality**
  - localStorage persistence for wizard progress
  - Resume screen showing pending and reviewed items
  - Banner button changes from "Get started" to "Continue migration"
  - Auto-clear progress on success
  
- **Multi-Channel Support**
  - Sequential channel review in Step 2
  - Messenger counter (e.g., "Messenger 2 of 3")
  - Sequential animation processing in Step 4
  
- **Animation System**
  - 4-stage migration animation per channel
  - 3-second intervals between stages
  - Visual indicators (loading dots, green checkmark)
  - Sequential processing (one channel at a time)
  
- **Migration Banner**
  - Deadline tag "Complete by June 1st"
  - Gradient background with blur effects
  - Chat illustration
  - Dynamic CTA button
  
- **Business Hours Configuration**
  - Custom dropdown component
  - Schedule selection (Always online, Custom schedule)
  - Day/hours table (conditional visibility)
  - Manage schedules link
  
- **Responses Configuration**
  - Expandable card with tabs
  - During/Outside business hours tabs (conditional)
  - First message textarea
  - Customer details display
  - Follow-up message textarea

### Technical Details
- React 18 with TypeScript
- styled-components for styling
- Zendesk Garden component library
- localStorage for state persistence
- useEffect hooks for animations
- Custom dropdown implementation

### Design Implementation
- Figma design: Migration Essentials → AIAA
- Modal dimensions: 900×600px with 24px border-radius
- Stepper sidebar: 210px width
- Purple and blue gradient backgrounds
- Garden color tokens throughout

## [0.1.0] - 2026-04-16

### Added
- Initial Admin Center home page prototype
- Zendesk-UI global navigation
- Garden design system integration
- Account overview metrics
- Quick actions cards
- Recent activity timeline
- Environment switcher
- Theme switcher (light/dark/system)

---

## Future Releases

### [1.1.0] - Planned
- [ ] Add form validation for required fields
- [ ] Improve accessibility (keyboard navigation, screen reader support)
- [ ] Add error states and error handling
- [ ] Implement toast notifications
- [ ] Add analytics/tracking events

### [1.2.0] - Planned
- [ ] Migrate to native Garden Dropdown component
- [ ] Add browser back/forward navigation support
- [ ] Implement retry logic for failed operations
- [ ] Add keyboard shortcuts

### [2.0.0] - Future
- [ ] Backend API integration
- [ ] Real authentication checks
- [ ] Actual channel data fetching
- [ ] Real AI agent creation service
- [ ] Error recovery flows
- [ ] Localization support (i18n)
