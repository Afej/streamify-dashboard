# Streamify Dashboard

A modern analytics dashboard for a music streaming platform built with React, TypeScript, and Tailwind CSS.

## Features

- Real-time metrics visualization
- Interactive charts (line, bar, pie)
- Sortable and searchable data tables
- Responsive design
- Clean and modern UI

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Chart.js
- TanStack Table
- Lucide Icons

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Afej/streamify-dashboard.git
```

2. Install dependencies:

```bash
cd streamify-dashboard
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
├── components/ # Reusable UI components
├── store/      # Zustand store configuration
├── types/      # TypeScript type definitions
├── mockData.ts # Sample data for development
└── App.tsx     # Main application component
```

## Architecture Decisions

- **State Management**: Zustand was chosen for its simplicity and minimal boilerplate while providing powerful state management capabilities.

- **Component Structure**: Components are built to be reusable and self-contained, with clear props interfaces.

- **Data Flow**: All data flows through the central store, making it easier to manage and modify data throughout the application.

- **UI/UX**: Tailwind CSS enables rapid development of a consistent and responsive design system.

- **Performance**: Table virtualization and efficient state updates ensure smooth performance even with large datasets.

## Future Improvements

- Add authentication
- Implement real-time data updates
- Add more advanced filtering options
- Include data export functionality
- Add dark mode support
