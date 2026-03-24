# Hybrid AI-Assisted QA Pipeline

My idea of hybrid Software Development Life Cycle pipeline 
 - combining **Generative AI (LangGraph)** 
 - with **Modern Automation (Playwright/TypeScript)** 
 - and **DevOps (Docker, CI/CD)**.

This project aims to solve real-world business problem: translating business requirements into automated tests, executing them in isolated environments, and providing human-readable, AI-analyzed reports for the business side.

Instead of relying solely on AI to write and execute code (which is prone to errors), this architecture uses a **Human-in-the-Loop** approach where AI assists in designing tests and analyzing failures, while execution relies on rock-solid TypeScript automation.

# Architecture

1. **AI Test Designer and Test Reviewer (Python, LangGraph)** - Parses website requirements and outputs BDD Test Plans.
2. **Test Automation Development (TypeScript/Playwright)**: E2E testing framework, human-coded.
3. **Execution Engine (Docker/CI/CD)**: Runs tests in isolated containers.
4. **AI Report Analyzer (Python/LangGraph)**: Analyzes JSON logs and generates business-facing reports.

# Roadmap

- [x] **Phase 1: AI Test Design Pipeline**
  - [x] Setup LangGraph State and Core Architecture.
  - [x] Create Business Analyst Agent (Parses URL/Requirements).
  - [x] Create QA Test Designer Agent (Generates BDD Scenarios).
  - [x] Create QA Reviewer Agent (Quality Gate & Edge Cases).
  - [x] Save final output to `docs/TEST_PLAN.md`.

- [] **Phase 2: Human-in-the-Loop Automation**
  - [x] Initialize Node.js + TypeScript + Playwright project.
  - [x] Manually implement E2E tests based on `TEST_PLAN.md`.
  - [x] Configure structured JSON reporting.

- [x] **Phase 3: DevOps & Execution**
  - [x] Dockerize the Playwright testing environment.
  - [x] Ensure seamless execution via terminal commands.

- [ ] **Phase 4: AI Report Analyzer(current)**
  - [ ] Create LangGraph Node to ingest `report.json`.
  - [ ] Use LLM to diagnose stack traces.
  - [ ] Generate business-friendly `TEST_RESULTS.md`.

- [ ] **Phase 5: CI/CD Integration**
  - [ ] Build GitHub Actions workflow to run the entire hybrid pipeline automatically on push.