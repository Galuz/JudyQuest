# JudyQuest — Tasks

## 0. Project Setup

- [x] Create repository
- [x] Select React + TypeScript + Vite as frontend stack
- [ ] Bootstrap React + TypeScript + Vite application
- [ ] Configure linting
- [ ] Configure formatting
- [ ] Configure unit testing
- [ ] Configure routing
- [ ] Create module-based architecture
- [ ] Add README
- [x] Add SPEC.md
- [x] Add PLAN.md
- [x] Add TASKS.md

## 0.1. PWA & Local-First Foundation

- [ ] Configure PWA support
- [ ] Create Web App Manifest
- [ ] Add app name and short name
- [ ] Add installable app icons
- [ ] Configure standalone display mode
- [ ] Configure Service Worker
- [ ] Cache application shell
- [ ] Define offline caching strategy
- [ ] Add offline fallback
- [ ] Define PWA update strategy
- [ ] Validate installability on Judy's tablet
- [ ] Validate launch from home screen
- [ ] Validate offline launch
- [ ] Validate offline Math session
- [ ] Validate offline Reading session
- [ ] Configure Vercel deployment
- [ ] Validate HTTPS production deployment

## 0.2. Local Persistence Architecture

- [ ] Add IndexedDB persistence
- [ ] Evaluate/add Dexie as IndexedDB wrapper
- [ ] Create database schema and versioning strategy
- [ ] Create ProfileRepository interface
- [ ] Create ProgressRepository interface
- [ ] Create SessionRepository interface
- [ ] Create RewardRepository interface
- [ ] Create ChallengeRepository interface
- [ ] Create SettingsRepository interface
- [ ] Implement IndexedDB repository adapters
- [ ] Ensure domain modules do not access IndexedDB directly
- [ ] Persist Reward Ledger locally
- [ ] Persist mastery locally
- [ ] Persist XP and streaks locally
- [ ] Persist Parent Settings locally
- [ ] Test database migration path
- [ ] Test application restart with persisted state

## 0.3. Future Cloud Sync Boundary

- [ ] Define optional SyncProvider interface
- [ ] Keep cloud sync disabled for MVP
- [ ] Document future multi-device synchronization
- [ ] Document future remote backup/recovery
- [ ] Evaluate Supabase only when cloud sync is required

## 1. Platform Core

- [ ] ChildProfile
- [ ] ParentSettings
- [ ] Subject model
- [ ] LearningModule interface
- [ ] Skill model
- [ ] LearningSession
- [ ] Attempt base model
- [ ] Module registry
- [ ] Persistence abstraction
- [ ] Restore state after restart

## 2. Shared Systems

- [ ] Challenge
- [ ] ChallengeResult
- [ ] Reward
- [ ] RewardLedgerEntry
- [ ] WeeklyBudget
- [ ] PaymentRecord
- [ ] Achievement
- [ ] Streak
- [ ] SavingsGoal

## 3. Reward Engine

- [ ] Default limit $100 MXN
- [ ] Configurable limit
- [ ] Shared limit across subjects
- [ ] ONCE rewards
- [ ] DAILY rewards
- [ ] WEEKLY rewards
- [ ] SKILL_MILESTONE
- [ ] MODULE_MILESTONE
- [ ] ACHIEVEMENT
- [ ] BOSS
- [ ] Partial rewards
- [ ] Reward ledger
- [ ] Duplicate prevention
- [ ] Idempotent reward processing

## 4. Anti-Farming Tests

- [ ] Same challenge twice → one payment
- [ ] Same challenge 20 times → one payment
- [ ] Boss replay → no money
- [ ] App reload → no duplicate
- [ ] App restart → no duplicate
- [ ] Back navigation → no duplicate
- [ ] Duplicate reward request → one reward
- [ ] Weekly cap respected
- [ ] Partial reward at cap
- [ ] Cross-subject cap respected
- [ ] Practice repetition → no money
- [ ] Easy-content farming → no money

## 5. XP & Levels

- [ ] XP service
- [ ] Level progression
- [ ] Correct-answer XP
- [ ] Mastery XP
- [ ] Challenge XP
- [ ] Boss XP
- [ ] XP after monetary cap

## 6. Streaks

- [ ] Valid session rules
- [ ] Current streak
- [ ] Best streak
- [ ] Prevent one-question farming

## 7. Mathematics — Domain

- [ ] MultiplicationFact
- [ ] MathAttempt
- [ ] MathSession
- [ ] MathSkillProgress
- [ ] MathMasteryEngine
- [ ] MathAdaptiveEngine
- [ ] MultiplicationEngine

## 8. Mathematics — Practice

- [ ] Tables 1–10
- [ ] Random questions
- [ ] Mixed tables
- [ ] Avoid immediate duplicates
- [ ] Numeric input
- [ ] Response timing
- [ ] Feedback
- [ ] Spaced retry
- [ ] Session summary
- [ ] Persistence

## 9. Mathematics — Learning

- [ ] ×1
- [ ] ×2
- [ ] ×3
- [ ] ×4
- [ ] ×5
- [ ] ×6
- [ ] ×7
- [ ] ×8
- [ ] ×9
- [ ] ×10
- [ ] Repeated addition
- [ ] Groups
- [ ] Commutative property
- [ ] Tricks

## 10. Mathematics — Mastery

- [ ] NEW
- [ ] LEARNING
- [ ] PRACTICING
- [ ] FAMILIAR
- [ ] MASTERED
- [ ] Accuracy
- [ ] Speed
- [ ] Practice days
- [ ] Recent performance
- [ ] Weak facts
- [ ] Strong facts

## 11. Mathematics — Speed

- [ ] Timer
- [ ] Accuracy gate
- [ ] Bronze
- [ ] Silver
- [ ] Gold
- [ ] Platinum
- [ ] Personal records

## 12. Mathematics — Bosses

- [ ] Generic Table Boss
- [ ] Boss ×1
- [ ] Boss ×2
- [ ] Boss ×3
- [ ] Boss ×4
- [ ] Boss ×5
- [ ] Boss ×6
- [ ] Boss ×7
- [ ] Boss ×8
- [ ] Boss ×9
- [ ] Boss ×10
- [ ] First-clear reward
- [ ] Replay without money

## 13. Language Module

- [ ] Create LanguageModule
- [ ] Register ReadingModule
- [ ] Reserve SpellingModule
- [ ] Reserve VocabularyModule
- [ ] Reserve GrammarModule

## 14. Reading — Domain

- [ ] ReadingText
- [ ] ReadingQuestion
- [ ] ReadingAttempt
- [ ] ReadingSession
- [ ] ReadingSkill
- [ ] ReadingDifficulty
- [ ] ReadingSkillProgress
- [ ] ReadingMasteryEngine
- [ ] ReadingAdaptiveEngine

## 15. Reading — Skills

- [ ] LITERAL
- [ ] SEQUENCE
- [ ] MAIN_IDEA
- [ ] DETAILS
- [ ] CAUSE_EFFECT
- [ ] INFERENCE
- [ ] CONTEXT_VOCABULARY
- [ ] EVIDENCE
- [ ] CHARACTER_INTENT
- [ ] AUTHOR_INTENT
- [ ] SUMMARY

## 16. Reading — Content

- [ ] Content schema
- [ ] Age range
- [ ] Difficulty
- [ ] Word count
- [ ] Content type
- [ ] Supported skills
- [ ] Questions
- [ ] Distractors
- [ ] Explanations
- [ ] Evidence references

## 17. Reading — Practice

- [ ] Text reader
- [ ] Questions
- [ ] Save answers
- [ ] Correct feedback
- [ ] Incorrect feedback
- [ ] Explanation
- [ ] Evidence
- [ ] Session summary
- [ ] Persistence

## 18. Reading — Learning

- [ ] Literal explanation
- [ ] Sequence explanation
- [ ] Main Idea explanation
- [ ] Cause/Effect explanation
- [ ] Inference explanation
- [ ] Vocabulary explanation
- [ ] Evidence explanation
- [ ] Guided examples
- [ ] Independent examples

## 19. Reading — Detective Mode

- [ ] Evidence questions
- [ ] Sentence selection
- [ ] Evidence validation
- [ ] Feedback
- [ ] Mastery tracking

## 20. Reading — Inference Mode

- [ ] Inference exercises
- [ ] Clues
- [ ] Explanation
- [ ] Accuracy tracking
- [ ] Adaptive difficulty

## 21. Reading — Mastery

- [ ] Mastery per skill
- [ ] Accuracy weighting
- [ ] Difficulty weighting
- [ ] Recent performance
- [ ] Practice days
- [ ] Text variety
- [ ] Prevent easy-question mastery
- [ ] Weak skills
- [ ] Strong skills

## 22. Reading — Bosses

- [ ] Generic Reading Boss
- [ ] Multi-skill challenge
- [ ] Score
- [ ] Accuracy requirement
- [ ] First clear
- [ ] Best score
- [ ] First-clear reward
- [ ] Replay without money

## 23. Shared Challenge Engine

- [ ] Math challenges
- [ ] Reading challenges
- [ ] Cross-module challenges
- [ ] Accuracy conditions
- [ ] Mastery conditions
- [ ] Session conditions
- [ ] Time conditions
- [ ] Streak conditions
- [ ] Boss conditions
- [ ] Multiple simultaneous conditions

## 24. Cross-Module Missions

- [ ] Math activity requirement
- [ ] Reading activity requirement
- [ ] Mixed mastery requirement
- [ ] Weekly mission reward
- [ ] Anti-farming validation

## 25. Child Home

- [ ] Level
- [ ] XP
- [ ] Streak
- [ ] Weekly money
- [ ] Remaining weekly money
- [ ] Subject cards
- [ ] Next challenge
- [ ] Weekly mission
- [ ] Achievements

## 26. Parent Mode

- [ ] PIN
- [ ] Weekly limit
- [ ] Edit weekly limit
- [ ] Weekly earnings
- [ ] Pending payments
- [ ] Paid rewards
- [ ] Mark as paid
- [ ] Reward Ledger
- [ ] Math analytics
- [ ] Reading analytics
- [ ] Subject-level progress

## 27. Weekly Reset

- [ ] Week identifier
- [ ] Detect new week
- [ ] Reset weekly earnings
- [ ] Reset WEEKLY eligibility
- [ ] Preserve XP
- [ ] Preserve mastery
- [ ] Preserve history
- [ ] Preserve bosses
- [ ] Preserve achievements

## 28. Savings Goals

- [ ] Create goal
- [ ] Goal name
- [ ] Target amount
- [ ] Progress
- [ ] Parent edit
- [ ] Mark completed

## 29. UX & Accessibility

- [ ] Mobile-first
- [ ] Tablet layout
- [ ] Large touch targets
- [ ] Child-friendly language
- [ ] Positive feedback
- [ ] Celebration animations
- [ ] Boss animations
- [ ] Reward animations
- [ ] Sound toggle
- [ ] Reduced motion
- [ ] Accessible contrast

## 30. Phase 2 — Spelling Module

- [ ] SpellingModule
- [ ] SpellingSkill
- [ ] SpellingAttempt
- [ ] SpellingMasteryEngine
- [ ] b/v exercises
- [ ] c/s/z exercises
- [ ] g/j exercises
- [ ] ll/y exercises
- [ ] h exercises
- [ ] accent marks
- [ ] capitalization
- [ ] punctuation
- [ ] dictation
- [ ] Spelling Boss
- [ ] Spelling analytics

## 31. Phase 2 — Vocabulary Module

- [ ] VocabularyModule
- [ ] Definitions
- [ ] Synonyms
- [ ] Antonyms
- [ ] Context meaning
- [ ] Prefixes
- [ ] Suffixes
- [ ] Word families
- [ ] Vocabulary mastery
- [ ] Vocabulary Boss

## 32. Phase 3 — English Module

- [ ] EnglishModule
- [ ] Vocabulary skill
- [ ] Reading skill
- [ ] Spelling skill
- [ ] Grammar skill
- [ ] Sentence building
- [ ] Comprehension
- [ ] English Mastery
- [ ] Adaptive learning
- [ ] English Boss
- [ ] English analytics

## 33. Phase 4 — Science Module

- [ ] ScienceModule
- [ ] ScienceTopic
- [ ] ScienceConcept
- [ ] ScienceQuestion
- [ ] ScienceMasteryEngine
- [ ] Living things
- [ ] Human body
- [ ] Ecosystems
- [ ] Matter
- [ ] Energy
- [ ] Solar system
- [ ] Environment
- [ ] Science Boss
- [ ] Science analytics

## 34. Phase 5 — Geography Module

- [ ] GeographyModule
- [ ] GeographySkill
- [ ] Continents
- [ ] Oceans
- [ ] Countries
- [ ] Capitals
- [ ] States of Mexico
- [ ] Climate
- [ ] Relief
- [ ] Orientation
- [ ] Map exercises
- [ ] Geography Boss
- [ ] Geography analytics

## 35. Phase 5 — History Module

- [ ] HistoryModule
- [ ] HistoricalEvent
- [ ] HistoricalPeriod
- [ ] Timeline exercises
- [ ] Chronology skill
- [ ] Cause/effect skill
- [ ] Historical figures
- [ ] Event relationships
- [ ] Period comparisons
- [ ] Basic source interpretation
- [ ] History Boss
- [ ] History analytics

## 36. Phase 6 — Grammar Module

- [ ] GrammarModule
- [ ] Nouns
- [ ] Verbs
- [ ] Adjectives
- [ ] Pronouns
- [ ] Subject
- [ ] Predicate
- [ ] Verb tenses
- [ ] Sentence structure
- [ ] Grammar Mastery
- [ ] Grammar Boss

## 37. Phase 6 — Math Expansion

- [ ] Addition
- [ ] Subtraction
- [ ] Division
- [ ] Fractions
- [ ] Mental math
- [ ] Word problems
- [ ] Geometry
- [ ] Percentages

## 38. Adventure Mode — Post MVP

- [ ] Adventure framework
- [ ] Character
- [ ] World progression
- [ ] Math encounters
- [ ] Reading clues
- [ ] Science puzzles
- [ ] Geography travel
- [ ] History timelines
- [ ] Mixed bosses
- [ ] Unlockable areas

# MVP Release Checklist

- [ ] Judy can choose Math or Reading
- [ ] Math Learning works
- [ ] Math Practice works
- [ ] Math adapts to weak facts
- [ ] Math Speed works
- [ ] Math Boss works
- [ ] Reading works
- [ ] Reading skill tracking works
- [ ] Reading adapts to weaknesses
- [ ] Inference works
- [ ] Evidence exercises work
- [ ] Reading Boss works
- [ ] XP works
- [ ] Streaks work
- [ ] Weekly default is $100 MXN
- [ ] Budget is shared
- [ ] Rewards cannot be farmed
- [ ] XP continues after $100
- [ ] Parent can change weekly limit
- [ ] Parent can inspect weaknesses
- [ ] Parent can mark rewards paid
- [ ] State survives restart
- [ ] Reward ledger survives restart
- [ ] Anti-farming tests pass

# Official Future Modules Checklist

- [ ] Español — Ortografía
- [ ] Español — Vocabulario
- [ ] Español — Gramática
- [ ] Inglés
- [ ] Ciencias
- [ ] Geografía
- [ ] Historia
- [ ] Matemáticas avanzadas
- [ ] Adventure Mode
