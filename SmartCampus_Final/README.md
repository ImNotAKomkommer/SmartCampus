# Smart Campus Room Availability Checker — Assignment #04

A fictional, read-only campus room availability checker, extended from the archived Assignment #03 / Practice #06 React+TypeScript prototype.

## Features

- Four rooms, each with ID, name, capacity, required equipment, blocked status, and room-specific sample bookings.
- Capacity filter (`capacity >= attendees`) and equipment filter (**all** selected items required).
- Explicit no-matches message and safe selection fallback if filters hide the selected room.
- Availability result and timeline recomputed for the selected room; blocked rooms never show `Available`.
- Existing AC1–AC6 rules preserved in `src/availability.ts`. Nothing is saved or confirmed.
- Fixed fictional clock of **09:00** for reproducible demos, as specified in Assignment #04.

## Requirements

- Node.js 20+ and npm (Node 22 was used for the test run).
- Internet access on the first `npm ci` to install the dependencies in the checked-in `package-lock.json`.

## Setup, run, test

```bash
npm ci
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

```bash
npm test             # compile business rules and run 28 Node.js unit/integration tests
npm run typecheck    # full React/TypeScript type-check (after npm ci)
npm run build        # production build (after npm ci)
npm run lint         # lint (after npm ci)
```

The `npm test` script uses the local `typescript` dependency and Node's built-in test runner, so no new test library is required. It creates `.test-build/` automatically; generated outputs are gitignored.

## How to demonstrate F1–F5

1. Start with **1 attendee** and no equipment: all four rooms should appear.
2. Enter **40 attendees**: Athena (40) should remain, Curie (24) and Darwin (18) should disappear (F1).
3. Choose **Projector + Computers**: only Athena and blocked Newton should match (F2/F3).
4. Enter **61 attendees**: show the `No rooms match your requirements` state (F4).
5. Restore 1 attendee, choose **Curie 204**, then **Athena 101** and request 10:00–11:00: Curie has a conflicting booking and Athena does not (F5 + room-specific bookings). Fixed current time is 09:00.
6. Select Newton 310 with valid time: it must remain `Unavailable` (blocked room).

For a normal default: **11:00–12:00** is after the fixed current time.

## Source structure

- `src/roomData.ts`: rooms and available equipment options.
- `src/bookingData.ts`: fictional bookings.
- `src/roomFilters.ts`: pure F1/F2 predicate.
- `src/roomSelection.ts`: selection fallback for F4/F5.
- `src/availability.ts`: unchanged AC1–AC4 validation semantics; signature accepts a readonly list.
- `src/availabilityView.ts`: composition of selection, room-specific bookings, and availability decision.
- `src/components/*`: separate filters, catalog, time form, timeline, and result presentation.
- `tests/logic.test.cjs`: 28 executable unit/integration checks.

## Known limitation and verification boundary

The native HTML time input accepts times through 23:59, so the numeric `end = 1440` acceptance boundary is covered by a unit test but not directly enterable in the browser form. The local verification environment could run the 28 pure-logic/integration tests, but did not have the React dependencies available for a browser build and UI screenshot; run `npm ci`, `npm run typecheck`, `npm run build`, and manual responsive UI checks in your own environment before submission.

No login, real personal data, database, backend, external API, or saved booking action is implemented.
