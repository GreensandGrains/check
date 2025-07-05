# Project Overview

## Overview
A comprehensive Replit clone featuring dark black theme, complete authentication system with login/dashboard redirection, AI content creation capabilities, and a custom AI coding assistant without external APIs. The project includes all Replit-like processes and pages with affordable pricing structure.

## System Architecture
Full-stack TypeScript application:
- Frontend: React 19 with Vite, TailwindCSS for dark theme styling, Wouter for routing
- Backend: Express.js with TypeScript, custom AI assistant using pattern matching
- Database: PostgreSQL with Drizzle ORM for data persistence
- Authentication: Replit OAuth integration with session management
- API: RESTful API design with protected routes

## Key Components
✓ Complete authentication system with Replit OAuth
✓ PostgreSQL database with user, project, and AI session tables
✓ Custom AI coding assistant without external API dependencies
✓ Dark theme implementation with TailwindCSS
✓ Full page structure: Landing, Dashboard, Projects, Editor, Pricing, Profile
✓ Express server with protected routes and session management
✓ React Query for data fetching and state management

## Data Flow
- Frontend communicates with backend via RESTful API endpoints
- Authentication handled through Replit OAuth with session persistence
- AI assistant processes code and provides suggestions using local pattern matching
- Database operations managed through Drizzle ORM
- Frontend routing handled by Wouter with authentication guards

## External Dependencies
- Replit OAuth for authentication (openid-client, passport)
- PostgreSQL database (available via DATABASE_URL)
- React ecosystem (@tanstack/react-query, react-hook-form)
- TailwindCSS for styling and dark theme
- Drizzle ORM for database operations
- Express.js for backend API server

## Deployment Strategy
- Replit deployment using built-in deployment tools
- Backend server runs on port 3000
- Frontend Vite dev server proxies API requests to backend
- Database schema created and ready for production use
- Environment variables configured for Replit hosting

## Recent Changes
✓ Set up complete project structure with React frontend and Express backend
✓ Implemented PostgreSQL database schema with all required tables
✓ Created custom AI coding assistant with pattern matching capabilities
✓ Developed authentication system with Replit OAuth integration
✓ Built dark theme UI with TailwindCSS and component structure
✓ Configured development environment with proper build tools

## User Preferences
- Custom AI coding assistant without using external APIs for cost efficiency
- Affordable pricing structure similar to Replit but cheaper
- Dark black theme with images and backgrounds throughout application
- Simple, everyday language for user communication