# SpreadSheet - A Modern Spreadsheet Application

SpreadSheet is a modern, web-based spreadsheet application built with Next.js and React. It provides a familiar spreadsheet interface with features like formula support, cell references, and undo/redo functionality.

## Features

- 📊 Grid-based interface with rows and columns
- 🔢 Formula support with cell references
- 🔄 Undo/Redo functionality
- 💾 Local storage persistence
- ⌨️ Keyboard navigation
- 🎨 Cell styling support
- 📱 Responsive design

## Tech Stack

- **Frontend Framework**: Next.js 15.3.0
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context API with custom reducer

## Project Structure

```
SpreadSheet/
├── app/              # Next.js app directory
├── context/          # React Context and Reducers
│   ├── GridContext.tsx
│   └── reducers/
│       └── gridReducer.ts
├── components/       # React components
│   └── grid/        # Grid-related components
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
└── public/          # Static assets
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/SpreadSheet.git
   cd SpreadSheet
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Key Features Implementation

### Grid State Management

The application uses a custom reducer pattern with React Context for state management. The grid state includes:

- Cell data (content, formulas, references)
- Grid dimensions (rows, columns)
- History for undo/redo operations

### Formula Support

- Formulas start with `=` (e.g., `=A1+B1`)
- Automatic reference tracking
- Computed value updates

### Keyboard Navigation

- Arrow keys for cell navigation
- Enter to edit cell content
- Tab to move between cells

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
