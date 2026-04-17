# Project Structure

```
admin-center-home-prototype/
│
├── README.md                      # Main project documentation
├── CHANGELOG.md                   # Version history and changes
├── MIGRATION_WIZARD.md            # Detailed technical documentation for wizard
├── PROJECT_STRUCTURE.md           # This file
│
├── package.json                   # Dependencies and scripts
├── package-lock.json              # Locked dependency versions
│
├── index.html                     # Entry HTML file
├── vite.config.ts                 # Vite build configuration
├── tsconfig.json                  # TypeScript configuration
├── tsconfig.app.json              # App-specific TS config
├── tsconfig.node.json             # Node-specific TS config
├── eslint.config.js               # ESLint configuration
├── playwright.config.ts           # E2E test configuration
│
├── src/                           # Source code
│   ├── main.tsx                   # Application entry point
│   ├── App.tsx                    # Root component
│   ├── App.css                    # App-level styles
│   ├── index.css                  # Global styles
│   ├── vite-env.d.ts              # Vite type declarations
│   │
│   ├── components/                # React components
│   │   ├── GlobalNav.tsx          # Zendesk-UI navigation wrapper
│   │   ├── HomePage.tsx           # Admin Center home page
│   │   ├── MigrationBanner.tsx    # Migration announcement banner
│   │   └── MigrationWizard.tsx    # Multi-step migration wizard
│   │
│   └── assets/                    # Static assets (unused)
│       ├── hero.png
│       ├── react.svg
│       └── vite.svg
│
├── public/                        # Public static files
│   ├── favicon.svg                # Browser favicon
│   ├── icons.svg                  # SVG icon sprite (unused)
│   ├── bonus-icon.svg             # Wizard intro bonus card icon
│   ├── wizard-illustration.png    # Wizard intro illustration
│   ├── wizard-illustration.svg    # Wizard intro illustration (SVG version)
│   └── chat-success.svg           # Success screen illustration
│
├── tests/                         # Playwright E2E tests
│   └── prototype.spec.ts          # Main test suite
│
└── node_modules/                  # Dependencies (not in version control)
```

## File Descriptions

### Root Configuration Files

#### `package.json`
- Project metadata and dependencies
- npm scripts: `dev`, `build`, `test`, `preview`
- Dependencies: React, TypeScript, Zendesk Garden, styled-components
- Dev dependencies: Vite, ESLint, Playwright

#### `vite.config.ts`
- Vite build tool configuration
- SVG plugin configuration for `?react` imports
- React plugin setup

#### `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- TypeScript compiler options
- Path resolution and module settings
- Separate configs for app and build tools

#### `eslint.config.js`
- Code linting rules
- React and TypeScript ESLint plugins

#### `playwright.config.ts`
- E2E test configuration
- Browser targets and test settings

### Source Files

#### `src/main.tsx`
- Application entry point
- Renders `<App />` into DOM
- ThemeProvider setup

#### `src/App.tsx`
- Root application component
- Wraps HomePage with GlobalNav
- Theme context provider

#### `src/index.css`
- Global CSS reset and base styles
- Font imports
- Body and root element styling

#### `src/components/GlobalNav.tsx`
**Purpose**: Zendesk-UI navigation wrapper  
**Size**: ~300 lines  
**Key Features**:
- Product tray with environment switcher
- Header with search, help, and profile menu
- Main navigation (Account, People, Channels, Apps, Settings)
- Theme switcher functionality

**State Management**:
```typescript
- currentNav: string (active navigation item)
- currentTheme: 'light' | 'dark' | 'system'
- currentEnvironment: string (multi-brand support)
```

#### `src/components/HomePage.tsx`
**Purpose**: Admin Center home page content  
**Size**: ~380 lines  
**Key Features**:
- Dashboard metrics (4 metric cards)
- Quick actions (3 action cards)
- Recent activity timeline
- Migration banner integration
- Wizard modal integration

**State Management**:
```typescript
- isWizardOpen: boolean (modal visibility)
- hasSavedProgress: boolean (banner button text)
```

**Integration**:
- Checks localStorage every 500ms for migration progress
- Passes hasSavedProgress to MigrationBanner
- Handles wizard open/close

#### `src/components/MigrationBanner.tsx`
**Purpose**: Migration announcement banner  
**Size**: ~189 lines  
**Key Features**:
- Deadline tag ("Complete by June 1st")
- Title and description text
- Gradient background (purple/blue blur circles)
- Chat illustration (SVG)
- Action buttons (Get started / Continue migration + Learn more)

**Props**:
```typescript
interface MigrationBannerProps {
  onGetStarted?: () => void;
  onLearnMore?: () => void;
  onClose?: () => void;
  hasSavedProgress?: boolean;
}
```

**Styling**:
- Fixed rounded corners (24px border-radius)
- Positioned gradient circles
- Responsive layout

#### `src/components/MigrationWizard.tsx`
**Purpose**: Multi-step migration wizard modal  
**Size**: ~1,385 lines  
**Key Features**:
- 4-step wizard flow with stepper
- Multi-channel support
- Save and resume functionality
- Animated migration progress
- Success screen

**See MIGRATION_WIZARD.md for detailed documentation**

**Major State Variables**:
```typescript
- showStepper: boolean
- showResumeScreen: boolean
- showSuccessScreen: boolean
- currentStep: number (1-4)
- channels: Channel[]
- currentMessengerIndex: number
- savedProgress: SavedProgress | null
- migrationSteps: { [channelId]: stepIndex }
```

### Public Assets

#### `public/bonus-icon.svg`
- Icon for bonus card in wizard intro
- Dimensions: 50×36px

#### `public/wizard-illustration.png` / `.svg`
- Main illustration for wizard intro screen
- Shows Admin Center interface mockup
- Dimensions: 480×auto (responsive height)

#### `public/chat-success.svg`
- Chat illustration for success screen
- Shows messaging interface with AI bot
- Dimensions: 450×350px

#### `public/favicon.svg`
- Browser tab icon
- Zendesk logo

### Test Files

#### `tests/prototype.spec.ts`
- Playwright E2E test suite
- Tests navigation rendering
- Tests component visibility

## Component Dependencies

### External Dependencies
```
@zendeskgarden/react-buttons
@zendeskgarden/react-chrome
@zendeskgarden/react-forms
@zendeskgarden/react-loaders
@zendeskgarden/react-modals
@zendeskgarden/react-tables
@zendeskgarden/react-tabs
@zendeskgarden/react-tags
@zendeskgarden/react-theming
@zendeskgarden/svg-icons

@zendesk-ui/chrome
@zendesk-ui/assets

styled-components
react
react-dom
```

### Internal Dependencies
```
HomePage
  ├── MigrationBanner
  └── MigrationWizard

App
  └── GlobalNav
       └── HomePage
```

## Build Output

```
dist/                              # Production build output
├── index.html                     # Bundled HTML
├── assets/
│   ├── index-[hash].js            # Bundled JavaScript
│   ├── index-[hash].css           # Bundled CSS
│   └── [asset-files]              # Images, fonts, etc.
└── [public-files]                 # Copied from public/
```

## Development Workflow

### Scripts
```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production (outputs to dist/)
npm run preview    # Preview production build locally
npm run test       # Run Playwright tests
npm run test:ui    # Run tests with Playwright UI
```

### File Locations by Feature

#### Migration Wizard
- Component: `src/components/MigrationWizard.tsx`
- Banner: `src/components/MigrationBanner.tsx`
- Illustrations: `public/wizard-illustration.png`, `public/chat-success.svg`
- Icon: `public/bonus-icon.svg`
- Documentation: `MIGRATION_WIZARD.md`

#### Admin Center Home
- Component: `src/components/HomePage.tsx`
- Layout: Integrated with GlobalNav
- Metrics, actions, activity all in one file

#### Navigation
- Component: `src/components/GlobalNav.tsx`
- Uses Zendesk-UI components
- Theme and environment management

## Code Organization Patterns

### Styled Components
- All components use styled-components
- Component-specific styles defined at top of file
- Transient props use `$` prefix (e.g., `$isExpanded`)
- Theme colors via `getColor()` utility

### State Management
- Local state with `useState` hooks
- Effects with `useEffect` hooks
- Refs with `useRef` for DOM access
- localStorage for persistence

### Type Safety
- TypeScript interfaces for all props
- Explicit return types where helpful
- Type annotations for complex state

### File Structure Pattern
```typescript
// 1. Imports
import React from 'react';
import styled from 'styled-components';
// ...

// 2. Styled Components
const Container = styled.div`...`;
const Title = styled.h1`...`;
// ...

// 3. Interfaces
interface Props {
  // ...
}

// 4. Component
function Component({ props }: Props) {
  // State
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Handlers
  const handleClick = () => {
    // ...
  };
  
  // Render
  return (
    <Container>
      {/* ... */}
    </Container>
  );
}

// 5. Export
export default Component;
```

## Code Metrics

| File | Lines | Components | State Variables |
|------|-------|------------|-----------------|
| MigrationWizard.tsx | 1,385 | 30+ styled | 14 |
| HomePage.tsx | 380 | 15+ styled | 2 |
| MigrationBanner.tsx | 189 | 20+ styled | 0 |
| GlobalNav.tsx | 300 | 10+ styled | 3 |

**Total**: ~2,254 lines of component code

## Future Refactoring Considerations

### Potential Improvements

1. **Extract Wizard Steps** (if file grows beyond 2000 lines)
   ```
   src/components/
   ├── MigrationWizard/
   │   ├── index.tsx              # Main wizard component
   │   ├── IntroScreen.tsx        # Step 0
   │   ├── SelectChannels.tsx     # Step 1
   │   ├── ReviewResponses.tsx    # Step 2
   │   ├── SetupAgent.tsx         # Step 3
   │   ├── CompleteMigration.tsx  # Step 4
   │   ├── SuccessScreen.tsx      # Final screen
   │   ├── ResumeScreen.tsx       # Resume flow
   │   └── types.ts               # Shared interfaces
   ```

2. **Shared Components**
   ```
   src/components/
   ├── common/
   │   ├── CustomDropdown.tsx     # Reusable dropdown
   │   ├── ExpandableCard.tsx     # Reusable card
   │   └── Stepper.tsx            # Reusable stepper
   ```

3. **Utilities**
   ```
   src/utils/
   ├── storage.ts                 # localStorage helpers
   ├── validation.ts              # Form validation
   └── constants.ts               # Shared constants
   ```

4. **Hooks**
   ```
   src/hooks/
   ├── useMigrationProgress.ts    # Progress management
   ├── useWizardNavigation.ts     # Step navigation
   └── useOutsideClick.ts         # Click-outside detection
   ```

## Documentation Index

1. **README.md** - Main documentation, getting started, features overview
2. **MIGRATION_WIZARD.md** - Detailed wizard technical docs, API reference
3. **CHANGELOG.md** - Version history, release notes
4. **PROJECT_STRUCTURE.md** - This file, architecture overview
5. **Code Comments** - Inline documentation in source files

---

Last updated: 2026-04-17
