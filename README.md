Financial Instruments Table

A React + TypeScript + Vite project that displays a table of financial instruments with sorting, row coloring, and dynamic styling.

Features:

Dynamic table rendering of financial instruments.

Columns: Ticker, Price, Asset Class.

Sorting by Ticker (A-Z/Z-A), Price (asc/desc), and Asset Class (custom order: Equities → Macro → Credit).

Row background color based on Asset Class.

Price cell coloring: blue if positive, red if negative.

Fully typed with TypeScript.

Reusable Table component.

Tech Stack:

React 19

TypeScript

Vite

Jest / Vitest for unit testing

React Testing Library

CSS Modules for styling

Getting Started:

Prerequisites:

Node.js >= 18

npm >= 9

Installation:

Clone the repository:
git clone https://github.com/sowjanya-Frontend/Financial-Instruments-Table.git
cd financial-instruments-table

Install dependencies:
npm install

Running the App:

Start the development server:
npm run dev

Open your browser at http://localhost:5173 [port number may change here please check]

Building for Production:

Build the app:
npm run build

Preview production build:
npm run preview

Testing:

Run all tests:
npm run test

Run a specific test file:
npx vitest run src/components/FinancialTable/FinancialTable.test.tsx

Project Structure:

src/

components/FinancialTable/ Main table component

common/Table/ Reusable generic Table component

constants/colors.ts Color constants for Asset Class & Price

data/instruments.json Mock financial instrument data

types/types.ts Shared TypeScript types

utils/sorting/ Sorting helper functions

Notes:

All styles are modular and reusable.

Sorting logic is implemented in pure functions for testability.

Unit tests cover Table component, FinancialTable component, sorting, cell colors, and row styles.

Contact:
Project developed by: Sowjanya Kandra
Email: kandra.sowjanya@gmail.com
