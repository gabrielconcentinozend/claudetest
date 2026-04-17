# Admin Center Migration Wizard Prototype

A production-quality prototype of the Admin Center home page with a complete migration wizard flow for moving Messenger responses to the AI agents dashboard. Built with Zendesk's Garden design system and Zendesk-UI navigation components.

## Features

### Core Features
- **Complete Admin Center home page** with dashboard metrics, quick actions, and recent activity
- **Migration banner** with deadline tag and call-to-action buttons
- **Multi-step migration wizard** with 4 steps and progress tracking
- **Save and resume functionality** with localStorage persistence
- **Authentic Zendesk navigation** using Zendesk-UI components
- **Garden design system** for all UI elements

### Migration Wizard Flow
1. **Intro screen** - Overview of migration with illustration
2. **Select channels** - Table with checkboxes for multiple channel selection
3. **Review responses** - Expandable cards for business hours and responses configuration
4. **Set up AI agent** - Form for agent name and language selection
5. **Complete migration** - Animated progress tracker for each channel
6. **Success screen** - Completion confirmation with illustration

### Advanced Functionality
- **Multi-channel support** - Handle multiple messengers sequentially
- **Progress persistence** - Save and resume migration at any point
- **Resume screen** - Shows pending and reviewed channels when returning
- **Dynamic banner** - Button changes from "Get started" to "Continue migration"
- **Animated migration** - 4-stage progress animation (3 seconds per stage)
- **Auto-reset** - Clears progress after successful completion

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zendesk Garden** - Open-source design system for content components
- **Zendesk-UI** - Private component library for navigation
- **styled-components** - CSS-in-JS styling
- **Playwright** - End-to-end testing

## Setup

### Prerequisites

- Node.js 18+ installed
- jFrog Artifactory authentication configured (for `@zendesk-ui/*` packages)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The prototype will be available at http://localhost:5173

## Testing

### Run Playwright tests

```bash
npm run test
```

### Run tests with UI

```bash
npm run test:ui
```

### Update snapshots

```bash
npm run test -- --update-snapshots
```

## Project Structure

```
admin-center-home-prototype/
├── src/
│   ├── components/
│   │   ├── GlobalNav.tsx          # Zendesk-UI navigation wrapper
│   │   ├── HomePage.tsx           # Admin Center home page content
│   │   ├── MigrationBanner.tsx    # Migration announcement banner
│   │   └── MigrationWizard.tsx    # Multi-step migration wizard modal
│   ├── App.tsx                    # Root application component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Global styles
│   └── vite-env.d.ts              # TypeScript declarations
├── public/
│   ├── bonus-icon.svg             # Bonus card icon
│   ├── wizard-illustration.png    # Intro screen illustration
│   └── chat-success.svg           # Success screen illustration
├── tests/
│   └── prototype.spec.ts          # Playwright tests
├── playwright.config.ts           # Playwright configuration
├── vite.config.ts                 # Vite configuration (with SVG support)
└── package.json
```

## Components

### GlobalNav
The global navigation component that wraps all pages. Includes:
- **Product tray** - Switch between Zendesk products
- **Environment switcher** - Multi-brand support (Zendesk, Brand A, Brand B)
- **Header** - Search, help, profile menu
- **Main navigation** - Account, People, Channels, Apps, Settings
- **Theme switcher** - Light/dark/system theme via profile menu

### HomePage
The Admin Center home page featuring:
- **Migration banner** - Prominent announcement with deadline tag
- **Account overview** - 4 metric cards showing key statistics
- **Quick actions** - 3 action cards for common tasks
- **Recent activity** - Timeline of recent account changes
- **Call to action** - "View all settings" button

### MigrationBanner
Migration announcement banner with:
- **Deadline tag** - "Complete by June 1st" pill-style tag
- **Title and description** - Clear messaging about migration
- **Blurred gradient background** - Purple and blue circles
- **Chat illustration** - Visual representation with SVG
- **Action buttons** - Primary CTA (Get started/Continue migration) + Learn more
- **Dynamic state** - Button text changes based on saved progress

### MigrationWizard
Multi-step wizard modal (900×600px, 24px border-radius) with:

#### Intro Screen
- Left side: Title, description, bullet points, bonus card, start button
- Right side: Grey background with gradient circles and illustration
- No stepper visible yet

#### Stepper Flow (Steps 1-4)
- **Left sidebar (210px)** - Vertical stepper with 4 steps
- **Right content area** - Dynamic content based on current step
- **Footer** - Navigation buttons (Previous step, Save and exit, Next)
- **Background gradient** - Top-right purple gradient (Ellipse 6288)

#### Step 1: Select Channels
- Garden Table with checkboxes
- Header checkbox selects/deselects all
- Channel name, type, and status columns
- Multi-selection support

#### Step 2: Review Responses
- **Multi-channel navigation** - Cycles through selected channels
- **Messenger counter** - "Messenger X of Y" (when multiple selected)
- **Business Hours card** - Expandable with custom dropdown
  - Schedule selection (Always online, Custom schedule)
  - Day/hours table (only visible for Custom schedule)
  - Manage schedules link
- **Responses card** - Expandable with tabs
  - During business hours tab (always visible)
  - Outside business hours tab (only if Custom schedule selected)
  - First message textarea
  - Customer details display (Name field)
  - Follow-up message textarea

#### Step 3: Set up AI Agent
- Agent name input field
- Language dropdown (English, Spanish, French, German)
- Learn more link
- Description text explaining AI agent purpose

#### Step 4: Complete Migration
- **Migration cards** - One per selected channel
- **Animated progress** - Sequential processing with 4 stages:
  1. Checking responses
  2. Configuring AI agent
  3. Setting it up in the AI agent dashboard
  4. Done
- **Visual indicators**:
  - Waiting: "Waiting for migration" (subtle text, no icon)
  - Processing: Animated dots + current stage label
  - Complete: Green checkmark + "Done"
- **Timing** - 3 seconds per stage
- **Sequential** - One channel completes before next starts

#### Success Screen
- Left side: Green checkmark + title, description, Learn more link, CTA button
- Right side: Chat illustration (chat-success.svg)
- Gradient backgrounds (purple and blue)
- "Go to AI agents dashboard" button

#### Resume Screen (Save and Exit)
- Shows when user returns after saving progress
- **Pending section** - Yellow warning icon
  - Lists unreviewed channels (if stopped in Step 2)
  - Shows "AI agent creation" (if stopped in Step 3)
- **Reviewed section** - Green check icon
  - Lists completed channels
- Buttons: Save and exit, Next (to resume)

## State Management

### Migration Progress Persistence
The wizard uses `localStorage` to persist progress:

```typescript
// Saved progress structure
{
  currentStep: number,           // 1-4
  currentMessengerIndex: number, // Current channel being reviewed
  reviewedChannels: string[]     // IDs of completed channels
}
```

**Key behaviors:**
- Saved when user clicks "Save and exit" (Steps 2 or 3 only)
- Restored when modal reopens (shows Resume screen)
- Cleared automatically on success screen
- HomePage checks `migrationProgress` key every 500ms to update banner

### Channel State
```typescript
interface Channel {
  id: string;
  name: string;
  channel: string;    // 'iOS', 'Web Widget', etc.
  status: string;     // 'Active', 'Inactive'
  selected: boolean;  // User selected for migration
  reviewed?: boolean; // Completed review process
}
```

### Migration Animation State
```typescript
// migrationSteps: { [channelId]: stepIndex }
// stepIndex: 0 (checking) → 1 (configuring) → 2 (setting up) → 3 (done)

// currentMigratingIndex: which channel is currently processing
```

## User Flows

### First-Time User (No Saved Progress)
1. User sees banner with "Get started" button
2. Clicks "Get started" → Opens intro screen
3. Clicks "Start assisted migration" → Shows Step 1
4. Selects channels → Next
5. Reviews each channel → Next (cycles through multiple channels)
6. Sets up AI agent → Next
7. Watches migration animation → Success screen
8. Progress auto-cleared

### Returning User (Saved Progress - Step 2)
1. User sees banner with "Continue migration" button
2. Clicks "Continue migration" → Opens resume screen directly
3. Sees pending and reviewed channels
4. Clicks "Next" → Returns to Step 2 at saved position
5. Continues from where they left off

### Returning User (Saved Progress - Step 3)
1. Same as above, but:
2. Resume screen shows "AI agent creation" in pending
3. All channels appear in reviewed section
4. Clicks "Next" → Returns to Step 3
5. Completes AI agent setup and proceeds

## Customization Guide

### Modifying Channel Data
Edit `MigrationWizard.tsx` line ~711:
```typescript
const [channels, setChannels] = useState<Channel[]>([
  { id: '1', name: "Joe's Coffee", channel: 'iOS', status: 'Active', selected: true },
  // Add more channels here
]);
```

### Changing Animation Timing
Edit `MigrationWizard.tsx` line ~773-787:
```typescript
const timeout1 = setTimeout(() => {
  setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 1 }));
}, 3100); // Change 3100 to desired milliseconds
```

### Adjusting Modal Dimensions
Edit `MigrationWizard.tsx` line ~915-920:
```typescript
<Modal
  onClose={handleModalClose}
  style={{
    maxWidth: '900px',  // Change width
    height: '600px',    // Change height
    borderRadius: '24px',
  }}
>
```

### Adding Migration Steps
1. Update `migrationStepLabels` array (line ~733)
2. Adjust timeout delays in migration useEffect (line ~763)
3. Update step label rendering logic (line ~1324)

### Customizing Banner
Edit `MigrationBanner.tsx`:
- Change deadline text (line ~165)
- Modify colors/gradients (lines ~36-59)
- Update illustration (line ~155-157)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to GitHub Pages or any static hosting service.

## Deployment

### Option 1: GitHub Pages

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

### Option 2: Manual hosting

Upload the contents of `dist/` to any static web host.

## Design Specifications

### Colors (Garden Tokens)
- **Purple gradient**: `rgba(181, 135, 225, 0.8)` with 80px blur
- **Blue gradient**: `rgba(127, 153, 233, 0.7)` with 80px blur
- **Success green**: `hue: 'green', shade: 600`
- **Warning yellow**: `hue: 'yellow', shade: 600`
- **Foreground subtle**: `variable: 'foreground.subtle'`
- **Border default**: `variable: 'border.default'`

### Typography
- **Page title**: 26px, SF Pro Display, 32px line-height
- **Section title**: 18px, 600 weight, 24px line-height
- **Body text**: 14px, 20px line-height
- **Small text**: 12px, 16px line-height

### Spacing
- **Modal padding**: 40px
- **Card padding**: 20px-32px
- **Gap between sections**: 20px
- **Gap between elements**: 8-12px

### Dimensions
- **Modal**: 900×600px
- **Stepper sidebar**: 210px
- **Border radius (modal)**: 24px
- **Border radius (cards)**: 8-12px
- **Border radius (inputs)**: 4px

## Technical Notes

### Dependencies
- The `@zendesk-ui/*` packages are private and require jFrog authentication
- SVG icons use `vite-plugin-svgr` with the `?react` suffix for imports
- Navigation uses 20px icons from `@zendesk-ui/assets`
- Content area uses 16px icons from `@zendeskgarden/svg-icons`

### Code Patterns
- **Transient props** - Use `$prop` (e.g., `$isExpanded`) to prevent React DOM warnings
- **Garden colors** - Use `getColor()` utility with theme context
- **State management** - Local state with hooks, localStorage for persistence
- **Event handling** - Use `stopPropagation()` for nested interactive elements

### Known Limitations
- Modal close prevention uses temporary flag (`preventModalClose`)
- Custom dropdown implemented (Garden Dropdown component unavailable)
- localStorage is synchronous (consider async storage for production)
- Animation timing is hardcoded (could be configurable)

## Testing the Prototype

### Manual Test Scenarios

#### Happy Path
1. Open page → See banner with "Get started"
2. Click "Get started" → Intro screen appears
3. Click "Start assisted migration" → Step 1
4. Select 2+ channels → Click "Next"
5. Review first channel → Click "Next"
6. Review second channel → Click "Next"
7. Fill in agent name and language → Click "Next"
8. Watch migration complete → Success screen
9. Refresh page → Banner shows "Get started" again

#### Save and Resume (Step 2)
1. Follow Happy Path steps 1-5
2. Click "Save and exit"
3. Refresh page → Banner shows "Continue migration"
4. Click "Continue migration" → Resume screen appears
5. Verify pending and reviewed lists
6. Click "Next" → Returns to Step 2 where you left off
7. Complete flow

#### Save and Resume (Step 3)
1. Follow Happy Path steps 1-7
2. Click "Save and exit" at Step 3
3. Refresh page → Banner shows "Continue migration"
4. Click "Continue migration" → Resume screen appears
5. Verify all channels in reviewed, "AI agent creation" in pending
6. Click "Next" → Returns to Step 3
7. Complete flow

#### Multi-Channel Sequential
1. Select 3 channels in Step 1
2. Proceed through Step 2 three times (one per channel)
3. Proceed to Step 4
4. Observe sequential animation (3 cards)
5. Verify each completes before next starts

## Troubleshooting

### Modal doesn't open
- Check `isWizardOpen` state in HomePage
- Verify `onGetStarted` prop is passed to MigrationBanner

### Progress not saving
- Check browser localStorage in DevTools
- Verify `migrationProgress` key exists after "Save and exit"
- Ensure localStorage is not disabled (private browsing)

### Banner button stuck on "Continue migration"
- Manually clear localStorage: `localStorage.removeItem('migrationProgress')`
- Or complete the full flow to auto-clear

### Animation doesn't progress
- Check console for errors
- Verify `selectedChannels` has items
- Ensure `currentStep === 4`

### Dropdown closes modal
- Check `preventModalClose` flag implementation
- Verify `stopPropagation()` on dropdown events

## Future Enhancements

### Potential Improvements
- [ ] Add loading states for async operations
- [ ] Implement error handling and retry logic
- [ ] Add toast notifications for save/success
- [ ] Support browser back/forward navigation
- [ ] Add keyboard shortcuts (ESC to close, etc.)
- [ ] Implement form validation
- [ ] Add analytics/tracking events
- [ ] Support for more than 3 channels
- [ ] Localization support (i18n)
- [ ] Accessibility audit (WCAG 2.1 AA)

### Integration Considerations
- Replace localStorage with backend API calls
- Add authentication checks
- Implement real channel data fetching
- Connect to actual AI agent creation service
- Add error states for failed migrations

## Figma Design Reference

**Main design file**: [Migration Essentials → AIAA](https://www.figma.com/design/tNNPSKPlx5jrEZtWHludvd/Migration-Essentials-%3E-AIAA)

Key screens implemented:
- Intro screen
- Step 1: Select channels
- Step 2: Review responses (Business Hours + Responses cards)
- Step 3: Set up AI agent
- Step 4: Complete migration
- Success screen (Confetti)
- Resume screen (Return flow)

## License

Built with Zendesk Garden (MIT) and Zendesk-UI (proprietary).
