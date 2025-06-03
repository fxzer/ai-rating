# AI Rating

Ultimate AI model comparison and evaluation system, developed with React and Zustand, featuring a friendly Bento-style UI.

## Main Features

### 1. Test Questions/AI Management
 Adding/modifying/deleting/drag-and-drop sorting of test questions and AI models

### 2. Rating System
- Rate multiple AI models, such as: Gemini 2.5 Pro, Claude 4 Opus, ChatGPT o3, Grok 3
- Each test allows rating each model from 1-5 points
- State is saved in local storage, won't be lost when refreshing the page

### 3. Data Visualization
- Display current test progress
- Display overall evaluation progress
- Results page shows model rankings

### 4. UI Features
- Modern, friendly Bento-style card design
- Animation effects enhance user experience
- Responsive layout, adapts to various device sizes

## Tech Stack
- React 19
- TypeScript
- Zustand (state management)
- @dnd-kit (drag-and-drop sorting)
- TailwindCSS (styling)
- FontAwesome (icons)

## Project Structure

```
src/
  components/
    Header/
    CurrentTest/
    AIModels/
    TestGrid/
    ResultsModal/
  store/
    useStore.ts
  routes/
    App.tsx
  main.tsx
  styles.css
  ...
```

## Development

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build Production Version
```bash
npm run build
```

## Customization
You can add your own test questions, and the system will automatically calculate and track the performance comparison of various AI models.

---

 