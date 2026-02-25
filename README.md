# Bright Ascension – Cat API Coding Assignment

A React + TypeScript single-page application that integrates with [The Cat API](https://thecatapi.com). Users can upload cat images, browse their collection, vote on cats, and mark favourites.

---

## Tech Stack

| Layer       | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | React 19, TypeScript (strict)                 |
| Build       | Vite 7                                        |
| Routing     | React Router DOM v7                           |
| Styling     | Tailwind CSS 3                                |
| HTTP        | Axios                                         |
| Icons       | Font Awesome (free solid + regular SVG icons) |
| Linting     | ESLint 9 with typescript-eslint               |

---

## Features

### Upload (`/upload`)

- Drag-and-drop or click-to-browse file input
- Live image preview before uploading
- Submits via `multipart/form-data` to The Cat API
- Redirects to the list page on success; shows error feedback on failure

### Cat List (`/`)

- Displays the authenticated user’s uploaded cat images in a responsive grid
- Up to 4 images per row, scaling down cleanly to 340px viewports
- Images preserve their native aspect ratio
- Loading spinner while fetching; empty-state message when no cats exist

### Voting

- Up/down vote buttons on each cat card
- Vote count aggregated from individual vote records returned by the API
- State updates on successful API response

### Favouriting

- Heart icon toggle (filled when favourited, outlined when not)
- Adds or removes favourites via The Cat API
- Favourite state derived from API responses

### 404

- Custom "lost cat" page with a link back to the home route

---

## Project Structure

```
src/
├── main.tsx              # Entry point, wraps App in BrowserRouter
├── App.tsx               # Shell: navigation bar + router outlet
├── Router.tsx            # Route definitions (/, /upload, *)
├── index.css             # Tailwind directives
├── pages/
│   ├── List.tsx          # Home page – fetches and renders the cat grid
│   ├── Upload.tsx        # Upload page – drag-drop form + API call
│   └── 404.tsx           # Not-found fallback
├── components/
│   └── CatCard.tsx       # Card UI: image, favourite toggle, vote buttons
├── services/             # All API calls isolated here
│   ├── read.ts           # GET /images/ enriched with votes and favourites
│   ├── create.ts         # POST /images/upload
│   ├── favourite.ts      # POST /favourites, DELETE /favourites/:id
│   └── vote.ts           # POST /votes, GET /votes with aggregation
└── types/
    ├── Cat.ts            # Cat, Favourite, Breed, Weight types
    └── Response.ts       # Generic Response<T> wrapper
```

Every service function returns a typed `Response<T>` object with a `status: ‘success’ | ‘failure’` rather than throwing directly. 
Environment variables are validated before each network call.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- A free API key from [The Cat API](https://thecatapi.com)

### Environment Variables

Create a `.env` file in the project root:

```
VITE_API_KEY=your_cat_api_key_here
VITE_BASE_URL=https://api.thecatapi.com/v1
```

### Development

```bash
npm install
npm run dev
```

The Vite dev server starts at `http://localhost:5173` by default.

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```