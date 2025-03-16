# CDU MuscleForge App

A browser-based fitness application for Cock Diesel University (CDU) that helps users track workouts and nutrition, gamifies progress with Diesel Points, includes a quiz bot, and syncs with Discord/Skool for community engagement.

## Features

### Core Features

- **Workout Logging**:
  - Library of exercises by muscle group
  - Custom exercise creation
  - Workout setup flow with different goals and splits
  - Track sets, reps, weight, and RPE
  - Progress visualization with graphs

- **Nutrition Tracking**:
  - Food database with macronutrient information
  - Meal logging with photo uploads
  - TDEE calculator
  - Daily macro tracking and trends

### Gamification

- **Diesel Points System**:
  - Points for workouts, nutrition, quizzes, and community engagement
  - Streak bonuses for consistency
  - Perks and rewards at different point levels
  - Leaderboards for friendly competition

### Quiz Bot

- **Daily Questions**:
  - Test your fitness knowledge
  - Educational content with explanations
  - Streak system with bonus points
  - Fun and humorous questions

### Community Integration

- **Discord Integration**:
  - Post workout and nutrition logs to channels
  - Unlock special roles based on Diesel Points
  - Share your Diesel Meter with the community

- **Skool Integration**:
  - Sync points for monthly challenges
  - Participate in frat competitions

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Storage, Authentication)
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/username/cdu-muscleforge-app.git
   cd cdu-muscleforge-app
   ```

2. Install dependencies:
   ```
   npm install
   # or
   pnpm install
   ```

3. Start the development server:
   ```
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application is configured for deployment to GitHub Pages. To deploy:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy the application
3. The deployed application will be available at: https://username.github.io/cdu-muscleforge-app/

## Project Structure

- `/src/app` - Next.js pages and routing
- `/src/components` - React components organized by feature
- `/src/lib` - Utility functions, types, and services
- `/src/lib/firebase` - Firebase configuration and services
- `/src/lib/data` - Static data (exercises, food database)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Cock Diesel University for the project requirements
- The Next.js and React teams for the amazing frameworks
- Firebase for the backend services
