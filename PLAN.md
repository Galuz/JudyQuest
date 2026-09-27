# JudyQuest — Implementation Plan

## Phase 0 — Technical Foundation

Definir JudyQuest como PWA local-first.

Stack oficial:

- React;
- TypeScript;
- Vite;
- PWA / Service Worker;
- Web App Manifest;
- IndexedDB;
- Dexie recomendado como capa de persistencia.

Objetivo de distribución inicial:

URL
→ instalar en pantalla de inicio
→ ejecutar como aplicación standalone en la tablet.

No implementar backend en el MVP.

### Persistence Architecture

Definir interfaces:

ProfileRepository

ProgressRepository

SessionRepository

RewardRepository

ChallengeRepository

SettingsRepository

Implementación inicial:

Repository interfaces
↓
IndexedDB adapter

Los motores educativos y sistemas globales no deben depender directamente de IndexedDB.

### PWA Foundation

Implementar:

- manifest;
- app icons;
- standalone display;
- Service Worker;
- application-shell cache;
- offline strategy;
- offline fallback;
- update strategy.

Validar instalación real en tablet.

### Deployment

Usar Vercel como deployment inicial recomendado.

Mantener la aplicación compatible con hosting estático HTTPS.

### Future Sync Boundary

Dejar preparado un adapter de sincronización futuro sin implementarlo en el MVP.

Evolución prevista:

IndexedDB local
+
optional cloud sync

Supabase puede evaluarse cuando se requiera:

- sincronización entre dispositivos;
- dashboard del adulto desde otro dispositivo;
- backups;
- recuperación remota.

## Phase 1 — Platform Foundation

Crear:

- app shell;
- routing;
- Child Profile;
- Parent Profile;
- Parent PIN;
- persistence;
- settings;
- module registry.

La arquitectura debe soportar múltiples materias desde el inicio.

## Phase 2 — Shared Domain

Crear:

UserProfile

ParentSettings

LearningModule

Subject

Skill

LearningSession

Attempt

Challenge

ChallengeResult

Reward

RewardLedgerEntry

Achievement

Streak

WeeklyBudget

PaymentRecord

SavingsGoal

## Phase 3 — Learning Module Contract

Definir interfaces comunes:

LearningEngine

MasteryEngine

AdaptiveEngine

ChallengeProvider

ProgressProvider

ContentProvider

Cada materia implementará su propia lógica educativa.

## Phase 4 — Reward Engine

Implementar:

weeklyLimit = 100 MXN

Proceso:

1. validar challenge;
2. comprobar reward period;
3. consultar ledger;
4. evitar duplicados;
5. comprobar cap;
6. calcular partial reward;
7. registrar reward.

## Phase 5 — Anti-Farming

Implementar:

- unique claims;
- reward periods;
- shared weekly cap;
- idempotency;
- immutable ledger;
- no-money normal practice;
- challenge randomization.

Crear tests de abuso.

## Phase 6 — XP, Levels, Streaks & Achievements

Crear sistemas globales independientes del dinero.

## Phase 7 — Mathematics Domain

Crear:

MultiplicationFact

MathAttempt

MathSession

MathSkillProgress

MultiplicationEngine

MathMasteryEngine

MathAdaptiveEngine

## Phase 8 — Math Practice

Implementar:

- question generation;
- answers;
- timing;
- feedback;
- persistence;
- spaced retry;
- session summary.

## Phase 9 — Math Mastery

Usar:

- accuracy;
- speed;
- practice days;
- recent performance;
- attempts.

Estados:

NEW

LEARNING

PRACTICING

FAMILIAR

MASTERED

## Phase 10 — Math Learning

Lecciones para:

×1  
×2  
×5  
×10  
×3  
×4  
×6  
×9  
×7  
×8

## Phase 11 — Math Speed

Crear:

- timed runs;
- accuracy gate;
- Bronze;
- Silver;
- Gold;
- Platinum;
- records.

## Phase 12 — Math Bosses

Crear bosses por tabla y first-clear rewards.

## Phase 13 — Language Module Foundation

Crear LanguageModule como contenedor de:

ReadingModule

SpellingModule

VocabularyModule

GrammarModule

Solo ReadingModule se implementa en MVP.

## Phase 14 — Reading Domain

Crear:

ReadingText

ReadingQuestion

ReadingAttempt

ReadingSession

ReadingSkill

ReadingSkillProgress

ReadingDifficulty

ReadingMasteryEngine

ReadingAdaptiveEngine

## Phase 15 — Reading Content Engine

Metadata:

id

title

text

ageRange

difficulty

wordCount

contentType

skillsSupported

questions

Cada pregunta incluye:

skill

correctAnswer

distractors

explanation

evidence

difficulty

## Phase 16 — Reading Practice

Crear:

- reader;
- questions;
- answer validation;
- feedback;
- explanations;
- evidence;
- session summary.

## Phase 17 — Reading Skills

Implementar MVP:

LITERAL

SEQUENCE

MAIN_IDEA

DETAILS

CAUSE_EFFECT

INFERENCE

CONTEXT_VOCABULARY

EVIDENCE

Después:

CHARACTER_INTENT

AUTHOR_INTENT

SUMMARY

## Phase 18 — Reading Adaptive Engine

Priorizar:

- weak skills;
- recent errors;
- forgotten skills;
- appropriate difficulty.

## Phase 19 — Detective Mode

Implementar selección de evidencia textual.

## Phase 20 — Inference Mode

Crear ejercicios con:

clues

reasoning

conclusion

explanation

## Phase 21 — Reading Bosses

Crear retos multi-skill.

First clear:

XP + reward + badge.

Replay:

sin reward monetario.

## Phase 22 — Shared Challenge Engine

Soportar:

- Math;
- Reading;
- future modules;
- cross-module missions.

Requirements:

accuracy

mastery

sessions

time

streak

bosses

skills

module combinations

## Phase 23 — Cross-Module Missions

Crear misiones que requieran trabajo en más de una materia.

## Phase 24 — Child Home

Mostrar:

- XP;
- level;
- streak;
- weekly money;
- materias;
- next challenge;
- weekly mission;
- achievements.

## Phase 25 — Subject Dashboards

Crear componente reusable.

Math añade:

- tables;
- weak facts;
- speed records.

Reading añade:

- skill mastery;
- comprehension;
- weak skills.

## Phase 26 — Parent Dashboard

General:

- weekly cap;
- earnings;
- pending payments;
- reward ledger;
- session activity.

Por materia:

- mastery;
- accuracy;
- weaknesses;
- progress.

## Phase 27 — Savings Goals

Crear metas de ahorro visuales.

## Phase 28 — MVP Validation

Validar con uso real antes de añadir nuevas materias.

Revisar:

- engagement;
- session length;
- reward balance;
- difficulty;
- mastery reliability;
- reading question quality.

## Phase 29 — Spelling Module

Post-MVP.

Crear:

SpellingSkill

SpellingExercise

SpellingAttempt

SpellingMasteryEngine

Habilidades iniciales:

b/v

c/s/z

g/j

ll/y

h

accent marks

punctuation

capitalization

dictation

## Phase 30 — Vocabulary Module

Crear:

- synonyms;
- antonyms;
- definitions;
- contextual meaning;
- prefixes;
- suffixes;
- word families.

Puede compartir contenido con ReadingModule.

## Phase 31 — English Module

Crear arquitectura para:

Vocabulary

Reading

Spelling

Grammar

Sentence Building

Comprehension

Debe tener mastery independiente por skill.

## Phase 32 — Science Module

Crear:

ScienceTopic

ScienceConcept

ScienceQuestion

ScienceMastery

Priorizar comprensión conceptual.

Temas iniciales:

living things

human body

ecosystems

matter

energy

solar system

environment

## Phase 33 — Geography Module

Crear:

GeographySkill

LocationQuestion

MapExercise

Topics:

continents

oceans

countries

capitals

Mexico states

climate

relief

orientation

## Phase 34 — History Module

Crear:

HistoricalEvent

HistoricalPeriod

TimelineExercise

HistoryQuestion

Skills:

chronology

cause/effect

people

events

comparison

source interpretation

## Phase 35 — Grammar Module

Fase posterior.

Skills:

nouns

verbs

adjectives

pronouns

subject

predicate

verb tenses

sentence structure

## Phase 36 — Mathematics Expansion

Añadir:

- addition;
- subtraction;
- division;
- fractions;
- mental math;
- word problems;
- geometry;
- percentages.

## Phase 37 — Adventure Mode

Construir una vez validados varios módulos.

Debe reutilizar:

Learning Engines

Mastery Engines

ChallengeEngine

RewardEngine

XPSystem

## Phase 38 — Analytics

Registrar:

sessions

attempts

skill progression

mastery

response time

challenge outcomes

reward events

## Phase 39 — Testing

Tests:

RewardEngine

RewardLedger

WeeklyBudget

ChallengeEngine

XP

Streaks

Math

Reading

Future module contracts

## Phase 40 — Roadmap Order

### MVP

Core  
Math  
Reading

### Phase 2

Spelling  
Vocabulary

### Phase 3

English

### Phase 4

Science

### Phase 5

Geography  
History

### Phase 6

Grammar  
Math Expansion  
Adventure Mode

El orden puede modificarse según las necesidades reales observadas.
