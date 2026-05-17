# TaskHub - Task Manager Vue 3

A modern, feature-rich task management application built with Vue 3, Vite, and Tailwind CSS. TaskHub helps you organize and manage your daily tasks efficiently with an intuitive dark-themed interface.

## Features

- **User Authentication** — Secure login and registration system
- **Task Management** — Create, update, delete, and organize tasks
- **Task Filtering** — Filter tasks by status (Pending, In Progress, Done)
- **Search Functionality** — Find tasks quickly by title or description
- **Task Status Tracking** — Monitor task progress with three status options
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **Dark Theme** — Eye-friendly dark interface with custom color palette
- **Real-time Updates** — Instant feedback with toast notifications
- **State Management** — Centralized state management with Pinia
- **RESTful API Integration** — Connects to a backend API for data persistence

## Tech Stack

- **Vue 3** — Progressive JavaScript framework
- **Vite** — Next-generation frontend build tool
- **Tailwind CSS** — Utility-first CSS framework
- **Pinia** — State management library
- **Vue Router** — Client-side routing
- **Lucide Vue** — Beautiful SVG icons
- **Axios** — HTTP client for API requests

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── ui/             # UI component library
│   ├── Header.vue
│   ├── Sidebar.vue
│   └── ...
├── pages/              # Page components
│   ├── Auth/           # Authentication pages
│   ├── Dashboard/      # Dashboard page
│   └── Task/           # Task management pages
├── stores/             # Pinia stores
│   ├── auth.js         # Authentication state
│   ├── tasks.js        # Task management state
│   └── toast.js        # Toast notifications
├── services/           # API services
├── router/             # Vue Router configuration
├── lib/                # Utility functions
├── App.vue
└── main.js
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Project Setup

### Installation

```sh
npm install
```

### Development

```sh
npm run dev
```

Starts the development server with hot-reload enabled.

### Build for Production

```sh
npm run build
```

Builds the application for production deployment with optimizations.

## API Requirements

This application requires a backend API running at the configured endpoint. The API should support the following endpoints:

### Authentication
- `POST /register` — User registration
- `POST /login` — User login
- `POST /logout` — User logout
- `GET /me` — Get current user info

### Tasks
- `GET /tasks` — Fetch all tasks (with pagination and filtering)
- `POST /tasks` — Create a new task
- `PUT /tasks/:id` — Update a task
- `DELETE /tasks/:id` — Delete a task

## Configuration

Update the API base URL in `src/services/api.js` to point to your backend API.

## Features in Detail

### Task Management
- Create tasks with title and description
- Set task priorities and due dates
- Update task status (Pending → In Progress → Done)
- Delete completed or unwanted tasks

### Search & Filter
- Search tasks by title or description
- Filter tasks by status
- Pagination support for large task lists

### User Dashboard
- View task statistics
- Quick overview of pending, in-progress, and completed tasks
- Easy navigation to all features

## Customization

See [Vite Configuration Reference](https://vite.dev/config/).

