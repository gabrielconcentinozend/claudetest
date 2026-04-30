# Claude Code Integration Guide

This document contains context and instructions for working with Claude Code on this project.

## Project Overview

Admin Center Migration Wizard - A complete migration flow that guides users from completing a migration to navigating to the AI Agents Dashboard.

## Recent Changes

### Migration Flow Integration (April 2026)

Added integration between the migration wizard and the AI Agents Dashboard prototype.

**What was changed:**
- Updated success screen button to redirect to AI Agents Dashboard
- Button now uses dynamic URL based on environment (localhost vs production)
- Production URL: `https://laughing-guacamole-wwnrp4l.pages.github.io/?from=migration`
- Passes `?from=migration` query parameter to trigger onboarding modal

**Files modified:**
- `src/components/MigrationWizard.tsx` (lines ~1211-1223)

**Implementation details:**
```typescript
<a
  href={import.meta.env.DEV
    ? "http://localhost:5180/?from=migration"
    : "https://laughing-guacamole-wwnrp4l.pages.github.io/?from=migration"
  }
  target="_blank"
  rel="noopener noreferrer"
  style={{ textDecoration: 'none' }}
>
  <Button isPrimary style={{ width: 'fit-content' }}>
    Go to AI agents dashboard
  </Button>
</a>
```

**Why this approach:**
- Garden Button component doesn't support `as="a"` prop
- Wrapping Button in anchor tag maintains visual consistency
- Opens in new tab to preserve migration wizard state
- Query parameter enables the dashboard to detect migration source

## Project Structure

```
admin-center-migration/
├── src/
│   ├── components/
│   │   ├── GlobalNav.tsx           # Zendesk-UI navigation
│   │   ├── HomePage.tsx            # Main home page
│   │   ├── MigrationBanner.tsx     # Banner component
│   │   └── MigrationWizard.tsx     # Multi-step wizard (SUCCESS SCREEN at ~1150-1230)
│   └── App.tsx
├── public/
│   ├── chat-success.svg            # Success screen illustration
│   ├── chat-banner.svg             # Banner illustrations
│   └── chat-*.png                  # Other assets
└── .github/workflows/deploy.yml    # GitHub Pages deployment
```

## Key Locations

### Success Screen
**File:** `src/components/MigrationWizard.tsx`
**Lines:** ~1150-1230
**What's there:** The final screen shown after migration completion with the redirect button

### GitHub Pages Deployment
**URL:** https://gabrielconcentinozend.github.io/claudetest/
**Base path:** `/claudetest/` (configured in `vite.config.ts`)
**Deploy trigger:** Push to `main` branch

## Development Commands

```bash
# Start dev server (localhost:5173)
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Preview production build
npm run preview
```

## Working with Claude Code

### When modifying the success screen:
1. Read `MigrationWizard.tsx` starting around line 1150
2. The success screen is rendered when `currentStep === 'success'`
3. Button URL logic is at lines ~1212-1214
4. Test both DEV and production URLs before committing

### When adding new assets:
1. Place images in `public/` directory
2. Reference with `${import.meta.env.BASE_URL}filename.ext`
3. For GitHub Pages, BASE_URL is `/claudetest/`

### When deploying:
1. Commit changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. Check Actions tab for build status
4. Site updates at https://gabrielconcentinozend.github.io/claudetest/

## Connected Projects

This project integrates with:

**AI Agents Dashboard**
- Repository: `zendesk/prototype-ai-agents-dashboard`
- Production URL: https://laughing-guacamole-wwnrp4l.pages.github.io/
- Local dev: http://localhost:5180/
- Receives migration flow via `?from=migration` parameter

## Common Tasks

### Update redirect URL
**File:** `src/components/MigrationWizard.tsx`
**Line:** ~1214
Change production URL in the ternary expression

### Modify success screen content
**File:** `src/components/MigrationWizard.tsx`
**Lines:** ~1150-1230
Edit JSX for title, description, button text, or layout

### Change migration steps
**File:** `src/components/MigrationWizard.tsx`
**Lines:** Varies by step (search for step rendering)
Each step has its own render section

## Design Reference

**Figma:** https://www.figma.com/design/tNNPSKPlx5jrEZtWHludvd/Migration-Essentials-%3E-AIAA

Key screens:
- Success screen (Confetti) - Node 609-10517
- Migration wizard flow - Various nodes

## Dependencies

### Private packages (require Artifactory):
- `@zendesk-ui/navigation` - Navigation components
- `@zendesk-ui/assets` - Icons and assets

### Public packages:
- `@zendeskgarden/*` - Design system components
- All available via npm

## Troubleshooting

### Button doesn't navigate
- Check if URL is correct for environment
- Verify anchor tag has `target="_blank"`
- Test in browser DevTools network tab

### Images not loading
- Ensure `BASE_URL` is used in image paths
- Check `public/` directory for file existence
- Verify filename case matches (case-sensitive)

### Build fails
- Check Artifactory credentials in GitHub secrets
- Verify all dependencies are installed
- Check GitHub Actions logs for specific error

## Git Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Commit with descriptive message
4. Push to `main` branch
5. GitHub Actions deploys automatically
6. Verify at production URL

## Notes for Future Work

- Success screen button opens in new tab to preserve migration state
- Migration wizard uses localStorage for progress persistence
- Dashboard integration relies on URL parameter, not session storage
- Consider adding analytics tracking to button click
- May want to add loading state while dashboard loads

---

**Last updated:** April 30, 2026
**Last modified by:** Claude Sonnet 4.5
