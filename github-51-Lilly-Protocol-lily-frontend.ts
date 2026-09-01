# Testing Conventions

This document outlines the testing conventions for the Lily-Frontend project.

## Overview

We use **Jest** as the test runner and **React Testing Library (RTL)** for component testing. Tests should focus on user-facing behavior rather than implementation details.

## File Structure & Naming

- Test files live alongside source files with a `.test.tsx` or `.test.ts` suffix
- Example: `src/components/Button.tsx` → `src/components/Button.test.tsx`
- Test files for hooks live in `src/hooks/__tests__/` (e.g., `useCounter.test.ts`)

## Test Organization