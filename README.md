# Steam Дома — Frontend

**Steam Дома** is a gaming marketplace developed as a team educational project at [RS School](https://rs.school/).

The project is inspired by Steam and aims to provide a modern, responsive interface for browsing and purchasing video games.

**Status:** In Development

## Features

The following features are planned:

- **Game Catalog** — browse games with detailed information, prices, ratings, and screenshots.
- **Search & Filtering** — search by title and filter by genres, Steam categories, platforms, and price.
- **Shopping Cart** — add and manage selected games.
- **Authentication** — user registration, login, and account management.
- **Admin Panel** — add and edit games, manage users, and view activity logs.
- **Responsive Design** — support for desktop, tablet, and mobile devices.
- **Light & Dark Themes** — switch between two visual themes.
- **Internationalization** — Russian and English language support.
- **GraphQL Integration** — retrieve and manage data through a backend API.

## Tech Stack

**Frontend:**
- React
- TypeScript
- Vite
- Material UI (MUI)
- SCSS
- Apollo Client (GraphQL)
- i18next

**Backend (separate repository):**
- Python / FastAPI
- GraphQL
- PostgreSQL
- Steam Dataset 2025

## Getting Started

### Prerequisites

- Git
- Docker
- Visual Studio Code
- Dev Containers extension for VS Code

### Development with Dev Container

1. Clone the repository.
2. Open the project folder in Visual Studio Code.
3. Run `Dev Containers: Reopen in Container` from the Command Palette.
4. Install dependencies:

   `npm install`

5. Start the development server:

   `npm run dev -- --host 0.0.0.0`

6. Open `http://localhost:5173` in your browser.

Node.js and npm are provided by the development container.

## Project Architecture

The frontend communicates with a separate Python backend through a GraphQL API.

Game data is stored in PostgreSQL using the Steam Dataset 2025. Apollo Client is planned for GraphQL requests and client-side caching.

## Team

| Developer | Role |
|---|---|
| Aleksei Ovchinnikov | Team Member |
| Nataliya Krylova | Team Member |

## Education

Developed as part of the [RS School](https://rs.school/) educational program.

**Project type:** Team Educational Project

---

*Steam Дома is an independent educational project and is not affiliated with Valve Corporation or Steam.*