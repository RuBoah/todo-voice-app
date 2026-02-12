# Todo Voice App - Planning Document

**Created:** February 11, 2026
**Purpose:** Document my thinking and approach before implementation

---

## Problem Analysis

### What I'm Building

A todo management system with voice transcription capability.

### What I'm Really Being Evaluated On

- **NOT** just a working app
- **YES** how I think, plan, and structure code
- **YES** incremental development process
- **YES** ability to explain decisions

### Core Requirements Checklist

- [ ] Create todo
- [ ] Edit/update todo
- [ ] Mark complete/incomplete
- [ ] Delete todo
- [ ] Persist data between runs
- [ ] Input validation (no empty todos)
- [ ] **Voice transcription** - attach voice note that becomes text

---

## Technology Stack Decision

### Chosen Stack

- **React 18** - UI components
- **Vite** - Build tool (lightweight, not "heavy scaffolding")
- **Tailwind CSS** - Styling
- **Web Speech API** - Voice transcription
- **localStorage** - Data persistence

### Why React?

**Pros:**

- Component-based architecture
- Clear separation of concerns
- Easy to demonstrate modular design

**Cons:**

- Adds build step complexity
- More setup than vanilla JS

**Decision:** Benefits outweigh complexity for this challenge

### Why Vite over Create React App?

- Challenge says "avoid heavy scaffolding"
- Vite is minimal (4 dependencies)
- CRA feels heavy (30+ dependencies)
- Faster dev server

### Why Web Speech API?

**Alternatives Considered:**

- ❌ OpenAI Whisper - costs money, needs backend
- ❌ Google Cloud Speech - needs account, costs money
- ❌ Mock/fake service - doesn't show real integration
- ✅ **Web Speech API** - free, built-in, meets "minimal dependencies"

**Tradeoff:**

- Only works in Chrome/Edge (~70% browser coverage)
- Firefox/Safari won't have voice feature
- **Decision:** Acceptable - app still works without voice, shows graceful degradation

### Why localStorage?

- Meets "persist between runs" requirement
- No backend needed
- Simple to demonstrate
- **Tradeoff:** Single device only (acceptable for challenge)

---

## Architecture Design

### Layer Structure (Bottom to Top)

┌─────────────────────────────────┐
│ Presentation Layer │ React Components
│ - TodoForm, TodoList, etc │ (UI only, no logic)
└─────────────────┬───────────────┘
↓
┌─────────────────────────────────┐
│ State Management │ useTodos hook
│ - Orchestrate services │ (Bridge)
└─────────────────┬───────────────┘
↓
┌─────────────────────────────────┐
│ Business Logic │ TodoService
│ - CRUD, validation │ TranscriptionService
└─────────────────┬───────────────┘
↓
┌─────────────────────────────────┐
│ Data Storage │ LocalStorage wrapper
│ - Save/load │
└─────────────────────────────────┘

### File Structure Plan

src/
├── models/Todo.js (Data structure)
├── storage/LocalStorage.js (Persistence)
├── services/
│ ├── TodoService.js (CRUD operations)
│ └── TranscriptionService.js (Voice-to-text)
├── utils/validation.js (Input validation)
├── hooks/useTodos.js (State management)
├── components/
│ ├── TodoForm.jsx
│ ├── TodoList.jsx
│ ├── TodoItem.jsx
│ ├── VoiceRecorder.jsx
│ └── ErrorMessage.jsx
├── App.jsx
└── main.jsx

**Target:** 12-15 files, each under 250 lines

## Data Model Design

### Todo Object Structure

javascript
{
id: string,  
 title: string,  
 completed: boolean,  
 createdAt: string,  
 updatedAt: string,  
 transcript: string | null,  
 transcriptCreatedAt: string | null
}

### Design Decisions

**ID Generation:**

- Considered: array index, counter, UUID library
- **Chose:** `Date.now() + '-' + Math.random().toString(36).substr(2, 9)`
- **Why:** Unique, no library, sortable, handles collisions

**Timestamps:**

- Format: ISO 8601 (e.g., "2026-02-12T10:30:00.000Z")
- **Why:** Standard, sortable, timezone-aware

**Transcript Storage:**

- **Chose:** Direct property in todo object
- **Why:** Simple, keeps related data together
- **Alternative rejected:** Separate array (harder to sync)

**Null vs Undefined:**

- Use `null` for "no transcript"
- **Why:** Explicit, survives JSON serialization

---

## Build Order

### Phase 1: Foundation

**No UI yet - build from bottom up**

**Sprint 1:**

- Project setup (Vite, Tailwind)
- Folder structure
- Git initialization
- This planning document

**Sprint 2:**

- Todo model
- LocalStorage wrapper
- Validation utilities
- TodoService skeleton

**Why this order:** Foundation must be solid before UI

---

### Phase 2: Business Logic (Sprint 3)

**Still no UI - complete services**

- Implement all CRUD operations
- Add transcript methods
- Test in console
- Document with JSDoc

**Why:** Services work independently of React

---

### Phase 3: UI Layer (Sprint 4)

**Now build visual layer**

- Create React components
- Build useTodos hook
- Wire components together
- Test CRUD through UI

**Why:** UI just connects to working services

---

### Phase 4: Voice Feature (Sprint 5)

**Add special feature**

- TranscriptionService
- Web Speech API integration
- VoiceRecorder component
- Connect to todos

**Why:** Complex feature needs solid foundation

---

### Phase 5: Polish (Sprint 6)

**Make it professional**

- Bug fixes
- Error handling
- Edge case testing
- UI/UX improvements
- Cross-browser testing

---

### Phase 6: Documentation

**Tell the story**

- Complete README
- Code comments
- Architecture diagrams
- Presentation prep

---

## Risk Assessment

### Identified Risks & Mitigations

**Risk 1: Browser compatibility (Web Speech API)**

- **Impact:** High - core feature requirement
- **Mitigation:**
  - Detect browser support on load
  - Show clear error if unsupported
  - App works fully without voice feature
  - Document browser requirements in README

**Risk 2: Microphone permission denied**

- **Impact:** Medium - blocks voice feature
- **Mitigation:**
  - Handle permission denial gracefully
  - Show helpful error message
  - Provide instructions to enable
  - App remains functional

**Risk 3: Time constraints**

- **Impact:** Medium - might not finish all polish
- **Mitigation:**
  - Focus on core requirements first
  - Voice feature before extra polish
  - Document what would improve with more time

**Risk 4: Complex state management**

- **Impact:** Low - could get messy
- **Mitigation:**
  - Keep state simple
  - Single source of truth (useTodos)
  - Don't over-engineer

---

## Validation Strategy

### Input Validation Rules

**Empty check:**

```javascript
if (!title || title.trim().length === 0) {
  return { valid: false, error: "Title cannot be empty" };
}
```

**Length check:**

```javascript
if (title.length > 200) {
  return { valid: false, error: "Title too long (max 200 characters)" };
}
```

**Where validation happens:**

- TodoService.createTodo() - server-side style
- TodoForm - UI feedback
- Both layers validate (defense in depth)

---

## Error Handling Strategy

### Scenarios to Handle

**1. Input Validation Errors**

- Empty title → Show error message in UI
- Too long → Show character count + error
- Whitespace only → Trim and reject

**2. Transcription Errors**

- Browser unsupported → Show warning, hide voice button
- Mic denied → Show instructions to enable
- No speech detected → Prompt to try again
- Network error → Show retry option

**3. Storage Errors**

- localStorage quota exceeded → Show error, suggest clearing
- localStorage disabled → Show error, explain issue
- Save failure → Log error, show notification

**4. Not Found Errors**

- Todo doesn't exist → Show error, refresh list
- Invalid ID → Ignore gracefully

---

## Testing Approach

### Manual Testing Plan

**Phase 1: Unit-level (console)**

- Test Todo model creation
- Test ID uniqueness
- Test validation functions
- Test storage save/load

**Phase 2: Integration (UI)**

- Test CRUD operations
- Test edge cases (empty, long input)
- Test persistence (refresh page)
- Test error messages

**Phase 3: Voice Feature**

- Test in Chrome/Edge
- Test mic permission flow
- Test actual transcription
- Test transcript persistence
- Test in Firefox (should show warning)

**Phase 4: Cross-browser**

- Chrome - full functionality
- Edge - full functionality
- Firefox - CRUD only, warning shown

**Phase 5: Edge Cases**

- Empty input submission
- 500 character paste
- Denied microphone
- Multiple simultaneous recordings
- Delete with confirmation

### Why No Automated Tests?

- Challenge emphasizes architecture over tests
- Manual testing covers requirements
- **Would add automated tests first with more time**

---

## Assumptions

### What I'm Assuming

**1. Single User**

- One person uses app
- No authentication needed
- No multi-user features

**2. Single Device**

- Data stays in one browser
- No sync across devices
- localStorage is sufficient

**3. Modern Browser**

- User has recent browser
- JavaScript enabled
- ES6+ supported

**4. English Language**

- Voice notes in English
- Hardcoded to `en-US`
- Could extend later

**5. Short Todos**

- Typical todo is 1 sentence
- 200 char limit is reasonable
- Not writing paragraphs

**6. Voice Notes Optional**

- Not every todo needs voice
- App works fully without voice
- Voice is enhancement

---

## Success Criteria

### Minimum Viable Product

- ✅ All CRUD operations work
- ✅ Data persists after page refresh
- ✅ Voice recording works (in supported browsers)
- ✅ Transcripts save and display
- ✅ Clean code structure (layers separated)
- ✅ Meaningful git history (40+ commits)
- ✅ Complete README

### What Makes This Excellent

- Clean separation of concerns
- Each file under 250 lines
- Incremental git commits
- Planning documented first
- Honest about tradeoffs
- Clear explanation of decisions
- Professional error handling

### What Would Be Nice (If Time)

- Edit functionality
- Automated tests
- Export/import data
- Multiple voice notes per todo
- Search/filter

---

## Commit Strategy

### Commit Frequency

- After completing each logical piece
- After each successful test

type: description

Examples:
feat: Create Todo model with ID generation
fix: Handle microphone permission denial
docs: Add architecture diagram to README
test: Verify persistence after page refresh
refactor: Extract validation to separate utility
style: Add Tailwind styling to components
