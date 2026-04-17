# Migration Wizard - Technical Documentation

## Overview

The Migration Wizard is a multi-step modal flow that guides users through migrating their Messenger responses to the AI agents dashboard. It supports progress persistence, multi-channel management, and sequential processing with animated feedback.

## Architecture

### Component Hierarchy
```
MigrationWizard (Modal Container)
├── Intro Screen (Initial state)
│   ├── Left Content (Text + CTA)
│   └── Right Content (Illustration + Gradients)
├── Stepper Flow (After start)
│   ├── Stepper Left (Sidebar)
│   │   └── Step Icons (1-4)
│   ├── Stepper Right (Content)
│   │   ├── Resume Screen (if savedProgress)
│   │   ├── Step 1: Select Channels (Table)
│   │   ├── Step 2: Review Responses (Cards)
│   │   ├── Step 3: Set up AI Agent (Form)
│   │   └── Step 4: Complete Migration (Animation)
│   └── Action Footer (Navigation)
└── Success Screen (After completion)
    ├── Left Content (Success message + CTA)
    └── Right Content (Illustration)
```

## State Management

### Core State Variables

```typescript
// UI State
const [showStepper, setShowStepper] = useState(false);        // Intro vs Stepper
const [showResumeScreen, setShowResumeScreen] = useState(false); // Resume screen
const [showSuccessScreen, setShowSuccessScreen] = useState(false); // Success screen
const [currentStep, setCurrentStep] = useState(1);             // 1-4

// Data State
const [channels, setChannels] = useState<Channel[]>([...]);   // Channel list
const [currentMessengerIndex, setCurrentMessengerIndex] = useState(0); // Multi-channel nav

// Form State (Step 2)
const [expandedCards, setExpandedCards] = useState({
  businessHours: false,
  responses: false
});
const [selectedSchedule, setSelectedSchedule] = useState('Custom schedule');
const [selectedTab, setSelectedTab] = useState('during');
const [firstMessage, setFirstMessage] = useState('');

// Form State (Step 3)
const [agentName, setAgentName] = useState('');
const [agentLanguage, setAgentLanguage] = useState('English');

// Animation State (Step 4)
const [migrationSteps, setMigrationSteps] = useState<{ [key: string]: number }>({});
const [currentMigratingIndex, setCurrentMigratingIndex] = useState(0);

// Persistence
const [savedProgress, setSavedProgress] = useState<{
  currentStep: number;
  currentMessengerIndex: number;
  reviewedChannels: string[];
} | null>(null);
```

### State Flow Diagram

```
[Initial] → showStepper=false, currentStep=1
    ↓
[Start Click] → Check localStorage
    ↓
    ├── No Progress → showStepper=true (Intro → Step 1)
    └── Has Progress → showStepper=true, showResumeScreen=true
              ↓
        [Resume Screen] → Display pending/reviewed
              ↓
        [Next Click] → showResumeScreen=false, restore step/index
              ↓
        [Continue Flow] → Steps 2-4
              ↓
        [Complete] → showSuccessScreen=true
              ↓
        [Auto Clear] → localStorage cleared, ready to restart
```

## Step-by-Step Breakdown

### Intro Screen
**State**: `showStepper=false`

**Layout**:
- Fixed dimensions: 900×600px modal
- Two-column: 526px left, flex right
- Left: Vertical center alignment
- Right: Grey background with gradient circles + illustration

**Content**:
- Title: "A new home for your messenger responses"
- Description with bullet points (no changes, no cost, no interruption)
- Learn more link (external)
- Bonus card with icon
- Primary CTA: "Start assisted migration"

**Interactions**:
- Click CTA → `setShowStepper(true)` → Reveals Step 1
- Close modal → Reset all state

---

### Step 1: Select Channels
**State**: `currentStep=1, showStepper=true`

**Layout**:
- Stepper sidebar (210px) on left
- Content area on right
- Footer with "Save and exit" + "Next"

**Content**:
- Page title: "Select Messenger channels"
- Description text
- Garden Table component with checkboxes
- Columns: Checkbox, Name, Channel, Status

**Interactions**:
- Header checkbox → Select/deselect all channels
- Row checkbox → Toggle individual channel
- "Next" → Validate selection, advance to Step 2
- No "Previous" button (first step)

**Validation**:
- At least one channel must be selected

---

### Step 2: Review Responses
**State**: `currentStep=2, showStepper=true`

**Multi-channel Navigation**:
```typescript
selectedChannels = channels.filter(ch => ch.selected)
currentMessenger = selectedChannels[currentMessengerIndex]

// Display: "Messenger 2 of 3" (if multiple)
// Title: currentMessenger.name
```

**Layout**:
- Messenger counter (if > 1 selected)
- Page title (messenger name)
- Two expandable cards: Business Hours, Responses
- Footer with "Previous step" + "Save and exit" + "Next"

#### Business Hours Card
**Collapsed state**: Shows selected schedule as subtitle

**Expanded state**:
- Description text + "Manage schedules" link
- Custom dropdown (Always online, Custom schedule)
- Schedule table (only visible if "Custom schedule" selected)
  - Days column: Sunday-Saturday
  - Hours column: Closed / 9am-5pm

**Interactions**:
- Click card header → Toggle expansion
- Select schedule → Update state, hide/show table
- Schedule change → Update "Outside business hours" tab visibility

#### Responses Card
**Collapsed state**: Shows first message as subtitle (or "No message set")

**Expanded state**:
- Garden Tabs: "During business hours" + "Outside business hours" (conditional)
- Each tab contains:
  - First message (Textarea with hint)
  - Customer details (Display card with Name field)
  - Follow-up message (Textarea with hint)

**Interactions**:
- Click card header → Toggle expansion
- Type in textarea → Update `firstMessage` state
- Switch tabs → Update `selectedTab` state

**Multi-channel Flow**:
```typescript
handleNext() {
  if (currentMessengerIndex < selectedChannels.length - 1) {
    setCurrentMessengerIndex(currentMessengerIndex + 1); // Next messenger
  } else {
    setCurrentMessengerIndex(0);
    setCurrentStep(3); // All done, proceed to Step 3
  }
}

handlePrevious() {
  if (currentMessengerIndex > 0) {
    setCurrentMessengerIndex(currentMessengerIndex - 1); // Previous messenger
  } else {
    setCurrentStep(1); // Back to channel selection
    setCurrentMessengerIndex(0);
  }
}
```

---

### Step 3: Set up AI Agent
**State**: `currentStep=3, showStepper=true`

**Layout**:
- Page title: "AI agent"
- Description paragraph
- "Learn more about AI agents" link
- Two form fields
- Footer with "Previous step" + "Save and exit" + "Next"

**Form Fields**:
1. **Name** (Garden Input)
   - Label: "Name"
   - Hint: Long description about agent name visibility
   - Value: `agentName` state

2. **Language** (Custom Dropdown)
   - Label: "Language"
   - Hint: "The default language your AI agent uses to communicate."
   - Options: English, Spanish, French, German
   - Value: `agentLanguage` state

**Interactions**:
- Type in name field → Update `agentName`
- Select language → Update `agentLanguage`
- "Previous" → Back to Step 2 (last messenger)
- "Next" → Proceed to Step 4

---

### Step 4: Complete Migration
**State**: `currentStep=4, showStepper=true`

**Layout**:
- Page title: "Moving responses"
- Description text
- Migration cards (one per selected channel)
- Footer with loading button only (disabled)

**Migration Card Structure**:
```tsx
<MigrationCard>
  <MigrationCardTitle>{channel.name}</MigrationCardTitle>
  <MigrationStatus>
    {/* Conditional icon */}
    {isProcessing && !isDone && <Dots />}
    {isDone && <CheckIcon />}
    
    <MigrationStatusText>
      {stepLabel}
    </MigrationStatusText>
  </MigrationStatus>
</MigrationCard>
```

**Animation States**:
| State | Icon | Text | Color |
|-------|------|------|-------|
| Waiting | None | "Waiting for migration" | Subtle |
| Stage 0 | Dots | "Checking responses" | Default |
| Stage 1 | Dots | "Configuring AI agent" | Default |
| Stage 2 | Dots | "Setting it up in the AI agent dashboard" | Default |
| Stage 3 | Check | "Done" | Green |

**Animation Logic**:
```typescript
useEffect(() => {
  if (currentStep !== 4) return;
  
  const selected = channels.filter(ch => ch.selected);
  if (selected.length === 0 || currentMigratingIndex >= selected.length) return;
  
  const currentChannel = selected[currentMigratingIndex];
  
  // Stage 0 at 100ms
  const timeout0 = setTimeout(() => {
    setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 0 }));
  }, 100);
  
  // Stage 1 at 3100ms
  const timeout1 = setTimeout(() => {
    setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 1 }));
  }, 3100);
  
  // Stage 2 at 6100ms
  const timeout2 = setTimeout(() => {
    setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 2 }));
  }, 6100);
  
  // Stage 3 (Done) at 9100ms
  const timeout3 = setTimeout(() => {
    setMigrationSteps(prev => ({ ...prev, [currentChannel.id]: 3 }));
  }, 9100);
  
  // Next channel or success at 9200ms
  const timeoutNext = setTimeout(() => {
    if (currentMigratingIndex < selected.length - 1) {
      setCurrentMigratingIndex(prev => prev + 1); // Next channel
    } else {
      setShowSuccessScreen(true); // All done
    }
  }, 9200);
  
  return () => {
    // Cleanup all timeouts
    clearTimeout(timeout0);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);
    clearTimeout(timeoutNext);
  };
}, [currentStep, currentMigratingIndex, channels]);
```

**Sequential Processing**:
- Channel 1: 0→1→2→3 (9 seconds)
- Channel 2: 0→1→2→3 (9 seconds)
- Channel 3: 0→1→2→3 (9 seconds)
- Success screen appears after last channel

---

### Success Screen
**State**: `showSuccessScreen=true`

**Layout**:
- Two-column: 450px left, flex right
- Gradient backgrounds (purple + blue)
- Chat illustration on right (450×350px)

**Content**:
- Green checkmark icon (16px)
- Title: "Messenger responses moved"
- Description paragraph
- "Learn more about the migration" link
- Primary CTA: "Go to AI agents dashboard"

**Interactions**:
- Click CTA → Open external link (stub)
- Close modal → Auto-clear localStorage, reset state

**Auto-clear Effect**:
```typescript
useEffect(() => {
  if (showSuccessScreen) {
    localStorage.removeItem('migrationProgress');
    setSavedProgress(null);
  }
}, [showSuccessScreen]);
```

---

### Resume Screen
**State**: `showResumeScreen=true, showStepper=true`

**When shown**:
- User previously clicked "Save and exit" in Step 2 or 3
- localStorage contains `migrationProgress`
- Modal opens directly to this screen (skips intro)

**Layout**:
- Page title: "Finish moving Messenger responses"
- Description text
- Status card with two sections
- Footer with "Save and exit" + "Next"

**Status Card Structure**:
```tsx
<ResumeCard>
  {/* Pending Section */}
  <ResumeSection>
    <Header>
      <YellowWarningIcon />
      <Title>Pending</Title>
    </Header>
    <List>
      {savedProgress.currentStep === 2 && 
        // Show unreviewed channels
      }
      {savedProgress.currentStep === 3 && 
        // Show "AI agent creation"
      }
    </List>
  </ResumeSection>
  
  <Separator />
  
  {/* Reviewed Section */}
  <ResumeSection>
    <Header>
      <GreenCheckIcon />
      <Title>Reviewed</Title>
    </Header>
    <List>
      {/* Show reviewed channels */}
    </List>
  </ResumeSection>
</ResumeCard>
```

**Interactions**:
- "Next" → Restore `currentStep` and `currentMessengerIndex`, hide resume screen
- "Save and exit" → Close modal (progress remains)

---

## Save and Exit Flow

### When Available
- Step 2: Review responses
- Step 3: Set up AI agent

### Save Logic
```typescript
handleSaveAndExit() {
  let reviewedChannelIds: string[];
  
  // Step 3: All channels reviewed
  if (currentStep === 3) {
    reviewedChannelIds = selectedChannels.map(ch => ch.id);
  }
  // Step 2: Only previous channels reviewed
  else {
    reviewedChannelIds = selectedChannels
      .slice(0, currentMessengerIndex)
      .map(ch => ch.id);
  }
  
  const progress = {
    currentStep,
    currentMessengerIndex,
    reviewedChannels: reviewedChannelIds
  };
  
  localStorage.setItem('migrationProgress', JSON.stringify(progress));
  
  // Reset UI state
  setShowStepper(false);
  setShowResumeScreen(false);
  setCurrentStep(1);
  setCurrentMessengerIndex(0);
  
  onClose();
}
```

### Resume Logic
```typescript
// On modal open
useEffect(() => {
  if (isOpen) {
    const saved = localStorage.getItem('migrationProgress');
    if (saved) {
      const progress = JSON.parse(saved);
      setSavedProgress(progress);
      setShowResumeScreen(true);
      setShowStepper(true);
      setCurrentStep(progress.currentStep);
    }
  }
}, [isOpen]);

// On resume click
handleResumeFromSaved() {
  if (savedProgress) {
    setCurrentStep(savedProgress.currentStep);
    setCurrentMessengerIndex(savedProgress.currentMessengerIndex);
    setShowResumeScreen(false);
  }
}
```

---

## Banner Integration

### HomePage State Management
```typescript
const [hasSavedProgress, setHasSavedProgress] = useState(false);

useEffect(() => {
  const checkProgress = () => {
    const saved = localStorage.getItem('migrationProgress');
    setHasSavedProgress(!!saved);
  };
  
  checkProgress();
  
  // Poll every 500ms
  const interval = setInterval(checkProgress, 500);
  
  // Listen to storage events
  window.addEventListener('storage', checkProgress);
  
  return () => {
    clearInterval(interval);
    window.removeEventListener('storage', checkProgress);
  };
}, []);
```

### Banner Button Logic
```tsx
<Button isPrimary size="small" onClick={onGetStarted}>
  {hasSavedProgress ? 'Continue migration' : 'Get started'}
</Button>
```

---

## Custom Components

### Custom Dropdown
**Why**: Garden Dropdown component was unavailable during implementation.

**Implementation**:
- Trigger button with chevron icon
- Menu div with absolute positioning
- Menu items with hover states
- Click-outside detection with useRef

**Styling**:
- Matches Garden design tokens
- Proper z-index layering
- Box shadow for elevation
- Border radius and padding

**Event Handling**:
```typescript
const handleScheduleSelect = (value: string, e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
  
  preventModalClose = true; // Prevent modal close
  setSelectedSchedule(value);
  setDropdownOpen(false);
  
  setTimeout(() => {
    preventModalClose = false;
  }, 100);
};
```

---

## Validation Rules

### Step 1: Select Channels
- ✅ At least one channel must be selected
- ⚠️ Currently no UI validation, button always enabled

### Step 2: Review Responses
- ✅ No required fields (all optional)
- ℹ️ First message displayed as subtitle when card collapsed

### Step 3: Set up AI Agent
- ⚠️ Name and language fields are optional (no validation)
- ℹ️ Default language is "English"

### Step 4: Complete Migration
- ✅ Auto-advances, no user input required

---

## Edge Cases & Error Handling

### No Channels Selected
**Current**: User can proceed to Step 2 with no selection
**Impact**: Step 2 will error (no channels to review)
**Solution**: Add validation in Step 1 to disable "Next" if no selection

### Modal Close During Animation
**Current**: Animation continues in background
**Impact**: No visual impact, state cleanup happens on next open
**Solution**: Already handled via timeout cleanup in useEffect

### localStorage Disabled
**Current**: Progress not saved, flow works but can't resume
**Impact**: Banner stays on "Get started", no resume screen
**Solution**: Could add fallback to sessionStorage or warning message

### Multiple Tabs Open
**Current**: Storage events trigger in other tabs
**Impact**: Banner updates across tabs (expected behavior)
**Solution**: Works as designed

### Browser Refresh During Flow
**Current**: Modal closes, progress lost (unless "Save and exit" was clicked)
**Impact**: User must restart from Step 1
**Solution**: Could auto-save progress on each step change

---

## Performance Considerations

### Re-renders
- useEffect dependencies carefully managed
- Timeout cleanup prevents memory leaks
- State updates batched where possible

### localStorage
- Synchronous reads/writes (minimal data)
- Polling at 500ms interval (negligible impact)
- Single key with JSON data (~200 bytes)

### Animation
- Single useEffect with multiple timeouts
- Sequential processing (one channel at a time)
- Proper cleanup on unmount/step change

---

## Accessibility

### Keyboard Navigation
- ✅ Modal can be closed with ESC (Garden default)
- ✅ Tab order follows visual order
- ⚠️ Custom dropdown needs arrow key support

### Screen Readers
- ✅ Button labels are descriptive
- ✅ Form fields have labels and hints
- ⚠️ Loading state in Step 4 could use aria-live region

### Color Contrast
- ✅ All text meets WCAG AA standards
- ✅ Icons have sufficient contrast
- ✅ Disabled states are visually distinct

### Focus Management
- ⚠️ Focus should move to modal content on open
- ⚠️ Focus should return to trigger button on close

---

## Testing Checklist

### Functional Tests
- [ ] Step 1: Select channels (single and multiple)
- [ ] Step 2: Review single channel
- [ ] Step 2: Review multiple channels (navigation)
- [ ] Step 2: Business hours dropdown
- [ ] Step 2: Custom schedule table visibility
- [ ] Step 2: Responses tabs
- [ ] Step 2: Outside hours tab conditional
- [ ] Step 3: Agent name and language
- [ ] Step 4: Single channel animation
- [ ] Step 4: Multiple channel sequential animation
- [ ] Success screen display
- [ ] Save and exit from Step 2
- [ ] Save and exit from Step 3
- [ ] Resume from saved progress
- [ ] Banner button text change
- [ ] localStorage clear on success

### Edge Case Tests
- [ ] No channels selected
- [ ] Close modal during animation
- [ ] Rapid clicking "Next" button
- [ ] Dropdown close on outside click
- [ ] Modal close prevention
- [ ] Refresh during flow (no save)
- [ ] Refresh after save and exit

### Browser Tests
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## Known Issues

### 1. Custom Dropdown
**Issue**: Not using native Garden Dropdown
**Impact**: Missing some accessibility features
**Workaround**: Manually implemented with styled-components
**TODO**: Migrate to Garden Dropdown when available

### 2. Modal Close Prevention
**Issue**: Uses global flag instead of event capture
**Impact**: Potential race conditions
**Workaround**: 100ms timeout seems reliable
**TODO**: Investigate better event handling pattern

### 3. No Form Validation
**Issue**: Can proceed with empty fields
**Impact**: Demo data could be incomplete
**Workaround**: Default values provided
**TODO**: Add validation for required fields

### 4. Animation Cannot Be Paused
**Issue**: Once Step 4 starts, cannot go back
**Impact**: User must wait for completion
**Workaround**: Footer shows loading state
**TODO**: Add cancel/pause functionality

---

## Maintenance Guide

### Adding a New Step
1. Update `steps` array (line ~903)
2. Add step content in `StepperRight` (line ~1007)
3. Update navigation logic in `handleNext`/`handlePrevious`
4. Add state variables for step data
5. Update save/resume logic if applicable

### Changing Animation Timing
```typescript
// File: MigrationWizard.tsx
// Location: useEffect for migration animation (~line 763)

// Change these timeout values (in milliseconds):
setTimeout(() => { /* Stage 0 */ }, 100);   // Checking responses
setTimeout(() => { /* Stage 1 */ }, 3100);  // Configuring AI agent
setTimeout(() => { /* Stage 2 */ }, 6100);  // Setting up dashboard
setTimeout(() => { /* Stage 3 */ }, 9100);  // Done
setTimeout(() => { /* Next */   }, 9200);  // Next channel or success
```

### Updating Channel List
```typescript
// File: MigrationWizard.tsx
// Location: Initial state (~line 711)

const [channels, setChannels] = useState<Channel[]>([
  { 
    id: '1', 
    name: "Joe's Coffee", 
    channel: 'iOS', 
    status: 'Active', 
    selected: true 
  },
  // Add new channels here
]);
```

### Modifying Illustrations
```
public/
├── bonus-icon.svg          → Intro screen bonus card
├── wizard-illustration.png → Intro screen right side
└── chat-success.svg        → Success screen illustration
```

Replace these files with same dimensions for consistency.

---

## Component API

### MigrationWizard Props
```typescript
interface MigrationWizardProps {
  isOpen: boolean;              // Modal visibility
  onClose: () => void;          // Close callback
  onStartMigration: () => void; // Start callback (optional logging)
}
```

### MigrationBanner Props
```typescript
interface MigrationBannerProps {
  onGetStarted?: () => void;    // Get started button callback
  onLearnMore?: () => void;     // Learn more button callback
  onClose?: () => void;         // Close button callback (unused)
  hasSavedProgress?: boolean;   // Changes button text
}
```

---

## Version History

### v1.0 (Current)
- ✅ Complete 4-step wizard flow
- ✅ Multi-channel support
- ✅ Save and resume functionality
- ✅ Animated migration progress
- ✅ Success screen with auto-clear
- ✅ Banner integration with dynamic button

### Future Versions
- v1.1: Add form validation
- v1.2: Migrate to Garden Dropdown
- v1.3: Add error handling
- v1.4: Accessibility improvements
- v2.0: Backend integration

---

## Support

For questions or issues with this prototype, contact the development team or refer to:
- [Zendesk Garden Documentation](https://garden.zendesk.com)
- [Figma Design File](https://www.figma.com/design/tNNPSKPlx5jrEZtWHludvd)
- Main README.md in project root
