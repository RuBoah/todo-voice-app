# 📝 Todo Voice App

A modern todo management application with voice transcription capabilities, built to demonstrate clean architecture and engineering best practices.

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, delete todos
- 🎤 **Voice Transcription** - Add voice notes to todos using Web Speech API
- 💾 **Persistent Storage** - Data saves automatically to browser localStorage
- ✏️ **Inline Editing** - Edit todos with keyboard shortcuts (Enter to save, Escape to cancel)
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## 🏗️ Architecture

4-layer clean architecture demonstrating separation of concerns:
Layer 4: UI Components (React)
↓
Layer 3: State Management (useTodos hook)
↓
Layer 2: Business Logic (TodoService, TranscriptionService)
↓
Layer 1: Data Storage (LocalStorage wrapper)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool (minimal dependencies)
- **Tailwind CSS v4** - Styling
- **Web Speech API** - Voice transcription
- **localStorage** - Data persistence

## 🚀 Setup & Run

### Prerequisites

- Node.js 16+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/RuBoah/todo-voice-app.git

# Navigate to project
cd todo-voice-app

# Install dependencies
npm install

# Run development server
npm run dev
Open http://localhost:5173/ in your browser.
Build for Production
npm run build
🎤 Voice Feature
Voice transcription uses the Web Speech API (free, built-in, zero cost).
Browser Support:
✅ Chrome
✅ Edge
❌ Firefox (coming soon)
❌ Safari (not supported)
Graceful Degradation:
App detects browser support automatically
Shows warning if voice unavailable
All CRUD features work in every browser
📁 Project Structure
src/
├── models/           # Data structures (Todo.js)
├── storage/          # Persistence layer (LocalStorage.js)
├── services/         # Business logic (TodoService, TranscriptionService)
├── utils/            # Utilities (validation.js)
├── hooks/            # React hooks (useTodos.js)
├── components/       # UI components
└── App.jsx           # Main application
🎯 Key Engineering Decisions
Why Vite over Create React App?
4 dependencies vs 30+
Meets "avoid heavy scaffolding" requirement
Faster build times
Why Web Speech API?
Free (no API costs)
Built into browser (no backend)
Zero dependencies
Acceptable 70% browser coverage
Why localStorage?
Meets persistence requirement
No backend complexity
Instant setup
ID Generation Strategy
Timestamp + random string
Unique without external library
Sortable by creation time
Example: 1739452800000-k3j5n2m9p
⚠️ Known Limitations
Voice Chrome/Edge only - Web Speech API browser limitation
Single device storage - localStorage is per-browser
No automated tests - Time constraint (would add Jest + RTL)
No edit history - Future enhancement
No categories/tags - Scope decision
🔮 Future Improvements
High Priority:
Automated testing (Jest + React Testing Library)
Cloud sync (Firebase/Supabase)
Export/import data
Medium Priority:
Multiple voice notes per todo
Search & filter functionality
Drag-and-drop reordering
Low Priority:
Categories and tags
Due dates with reminders
Collaboration features
📊 Development Process
Planning First - PLANNING.md committed before code
Incremental Development - 20+ meaningful commits
Clean Architecture - Separation of concerns throughout
Error Handling - Validation at every layer
Documentation - Inline comments and README

👤 Author
Ruth Boahene
GitHub: @RuBoah
LinkedIn: www.linkedin.com/in/ruthboahene
Built with ❤️ as a software engineering challenge
```
