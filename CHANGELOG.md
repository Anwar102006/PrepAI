# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-12

### Added
- **AI Mock Interviews**: Conversational behavioral and technical interviews powered by OpenAI `gpt-4o`.
- **Resume Analyzer**: Instant PDF parsing (`pdf-parse`) and ATS optimization feedback.
- **Coding Sandbox**: Integrated Monaco Editor with multi-language secure execution via Piston API.
- **Complexity Analysis**: AI-generated Big-O Time/Space complexity grading for coding challenges.
- **Admin Dashboard**: Real-time telemetry, charts (Recharts), and user management with RBAC.
- **Rate Limiting**: Upstash Redis edge rate limiters applied to all unauthenticated and AI API routes.
- **Dockerization**: Optimized multi-stage `standalone` Dockerfile.
- **CI/CD**: GitHub Actions workflow for linting, typechecking, and building on PRs.
- **Documentation**: Added comprehensive API, Database, Installation, and Deployment guides.

### Fixed
- Fixed critical SSR `DOMMatrix` bug during `next build` by sandboxing `pdf-parse` via dynamic imports.
- Replaced un-scalable API `console.error` logs with structured `logger.error` wrapper to prevent instance crashes.
- Made Upstash Ratelimit fail gracefully for local development without `.env` config.
