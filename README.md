# Rick & Morty Multiverse Challenge

## Description
A specialized frontend dashboard built to compare episodic timelines between characters from the Rick & Morty universe. Users can browse two independent, paginated lists of characters. Upon selecting a character from both lists, the application calculates and displays three distinct sets of data:
- Episodes exclusive to Character #1
- Episodes shared between both characters
- Episodes exclusive to Character #2

The UI strictly prevents the episode comparison board from rendering until both selections are made, ensuring a focused and deliberate user experience.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Tailwind CSS
- **State Management & Data Fetching:** TanStack Query (React Query)
- **Testing:** Vitest + React Testing Library

## Getting Started

First, clone the repository and install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts
- `npm run dev`: Starts the local development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code quality and Next.js strict rules.
- `npm run test`: Executes the unit and integration test suites using Vitest.

## Technical Decisions
- **Feature-Sliced Design Strategy:** The codebase is organized by domain (`features/characters`, `features/episodes`) rather than purely by file type. This creates highly cohesive, independent modules that are easier to scale and test.
- **Component Architecture:** Applied a mixed Atomic Design approach (`atoms`, `molecules`, `modules`) inside the `components` directory to keep UI elements reusable, agnostic, and strictly focused.
- **Set Theory Optimization:** Instead of nested loops with $O(N^2)$ complexity, the intersection and difference of episodes between characters are calculated using native JavaScript `Set` structures, achieving optimal $O(N)$ execution time.
- **Batched API Fetching:** Deduplicated the global IDs from both characters' episode arrays to fire a single API request for all needed episodes, drastically cutting down network waterfall.
- **Memoization Boundaries:** Strategically utilized `React.memo` for leaf components (Cards) and `useMemo` for heavy algebraic operations to prevent unnecessary virtual DOM reconciliations and logic recalculations on unrelated state changes.

## Features
- **Independent Pagination:** Two separate character grids that paginate flawlessly without blocking or interfering with one another.
- **Deduplicated Cache:** React Query handles background caching, meaning previously visited pages or re-selected characters load instantaneously.
- **Robust UI States:** Every section handles its own distinct states (`Loading`, `Error`, `Empty`, `Success`) gracefully avoiding layout shifts or broken interfaces.
- **Optimized Assets:** The native `next/image` dynamically optimizes remote avatars directly from the API CDN.

## Testing
The testing strategy intentionally prioritizes the core business logic and critical user journeys:
1. **Mathematical Logic (`episode-set-operations.test.ts`):** Validates the isolated pure functions responsible for separating intersecting episode URLs into the three strictly required subsets (Only 1, Shared, Only 2) handling complex overlapping arrays properly.
2. **Conditional UI Integration (`challenge-dashboard.test.tsx`):** Confirms through mocked Network Hooks that the Shared Episodes layout remains completely locked and hidden behind the placeholder until the dual-character selection criteria are explicitly met.

## Future Improvements
- Implement Virtualized Lists (Windowing) for the episode grids to maintain 60 FPS in extreme edge cases where characters might share over 50+ episodes.
- Add E2E tests using Cypress or Playwright to simulate full cross-browser user journeys.
- Introduce advanced filtering (e.g., filter by species or dimension) directly into the independent lists via debounced query params.

## Deploy
Check out the live production version here: 
https://rick-morty-challenge.vercel.app/