This is a demo project. All rights reserved.

Demo: https://morco.ro/demo-ai-chat

Notes:

- All data is stored locally in browser, using local storage.
- All API is local (no network requests), except for 3rd-party GPT models.
- Demo GPTs are free and can be used for testing app features.

---

How to run this project locally:

1. Clone repo
2. Run `npm install`
3. Run `npm run app--local` for main app
4. Run `npm run ds--local` for design system

---

## Tech Stack

| Name           | Description                               |
| -------------- | ----------------------------------------- |
| Ant Design     | For UI components                         |
| Anthropic SDK  | For accessing Anthropic API               |
| DOMPurify      | For sanitizing HTML in JS                 |
| DotEnv-Flow    | For loading env variables                 |
| ESLint         | For linting the code                      |
| Emotion        | For managing CSS in JS                    |
| Events         | For global event bus                      |
| Faker.js       | For generating random data                |
| GitHub Actions | For CI/CD pipelines                       |
| Highlight.js   | For code highlighting                     |
| Lodash         | For utility functions                     |
| Mantine        | For UI components                         |
| Marked         | For parsing markdown                      |
| Material UI    | For UI components                         |
| NPM            | For managing libraries                    |
| OpenAI SDK     | For accessing OpenAI API                  |
| PostCSS        | For managing CSS files                    |
| Prettier       | For formatting the code                   |
| React          | For developing the app                    |
| React I18next  | For managing multiple languages           |
| React Router   | For managing app routing                  |
| Storybook      | For managing components and design system |
| Tailwind       | For managing CSS classes                  |
| Vite           | For developing and deploying the app      |

<br>

## Project Structure

| Directory               | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| `.env/`                 | Files with env variables                                      |
| `.github/`              | GitHub pipelines                                              |
| `.storybook/`           | Storybook config files                                        |
| `.storybook/public/`    | Static files used by Storybook app                            |
| `.tooling/`             | Custom scripts for deployment                                 |
| `.tooling/gitlab/`      | Old GitLab pipeline configs                                   |
| `src-api/`              | [Sub-project] Mock API for app                                |
| `src-api/docs/`         | Dev interface for mock API endpoints                          |
| `src-app/`              | [Sub-project] Application files                               |
| `src-app/api/`          | Based API config for app logic                                |
| `src-app/biz-modules/`  | Business modules of the app                                   |
| `src-app/core-modules/` | Non-business / generic modules of the app                     |
| `src-app/layouts/`      | App layouts for module pages                                  |
| `src-app/library/`      | Shared components and utilities for app modules               |
| `src-app/public/`       | Static assets for app                                         |
| `src-app/routing/`      | Routing logic for app pages                                   |
| `src-app/styling/`      | Styling logic for app interface                               |
| `src-ds/`               | [Sub-project] Design system files                             |
| `src-ds/docs/`          | Docs pages for Storybook app                                  |
| `src-ds/release/`       | Import aliases to be used inside app, instead of /src/        |
| `src-ds/src/`           | Actual source code for the design system                      |
| `src-i18n/`             | [Sub-project] I18n configs and JSONs with translations        |
| `src-utils/`            | [Sub-project] Shared utilities between all other sub-projects |

<br>

## Coding Style

| Rule                            | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| Automatic JS imports sorting    | For more consistency and better git diffs              |
| Automatic Tailwind sorting      | For more consistency                                   |
| Concentric CSS order            | For standardizing CSS rule order                       |
| Constants as UPPER_SNAKE_CASE   | For quick identification                               |
| ESLint JS/TS recommended        | For industry best practices for TypeScript             |
| ESLint React recommended        | For industry best practices for React                  |
| Env vars with `ENV__` prefix    | For quick identification                               |
| File names as kebab-case        | For general project consistency                        |
| Partial files with `_` prefix   | For file sorting and quick identification              |
| Print width of 115 chars        | For line hard limit, approx. 120 minus tab indentation |
| Props interface above component | For defining props easily                              |
| SFC with CSS-in-JS              | For more modular code                                  |
| Single quotes                   | For less visual clutter                                |
| Tab indentation                 | For better accessibility and DX                        |
| Trailing comma                  | For better git diffs                                   |

<br>

## NPM Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `app--local`       | Start app locally for development        |
| `app--build-dev`   | Build app for `dev` environment          |
| `app--build-alpha` | Build app for `alpha` environment        |
| `app--build-beta`  | Build app for `beta` environment         |
| `app--build-prod`  | Build app for `prod` environment         |
| `app--preview`     | Preview previous app build locally       |
| `ds--local`        | Start Storybook locally for development  |
| `ds--build-dev`    | Build Storybook for `dev` environment    |
| `ds--build-prod`   | Build Storybook for `prod` environment   |
| `ds--preview`      | Preview previous Storybook build locally |
| `lint`             | Check code for linting errors            |
| `lint-fix`         | Fix linting errors                       |
| `lint-typescript`  | Check code for TypeScript errors         |

<br>

## Git Branches

| Branch              | Description                                 | Attributes          |
| ------------------- | ------------------------------------------- | ------------------- |
| `0-dev`             | Branch for development and quick testing    | unstable, permanent |
| `1-alpha`           | Branch for QA testing using development API | stable, permanent   |
| `2-beta`            | Branch for QA testing using production API  | stable, permanent   |
| `3-preprod`         | Branch for preparing production deployments | stable, permanent   |
| `4-production`      | Main branch with production / live code     | stable, permanent   |
| `feature/#id--name` | Branch for new features                     | unstable, temporary |
| `bugfix/#id--name`  | Branch for fixing bugs                      | unstable, temporary |

<br>

## CI/CD Pipelines

| Step         | Description                                       | Dependency              |
| ------------ | ------------------------------------------------- | ----------------------- |
| Check_Branch | Checks if the current branch can run the pipeline | No dependency           |
| Init_Vars    | Initializes env variables if exist                | Check_Branch            |
| Install_Deps | Runs `npm install` for 3rd-party dependencies     | Check_Branch            |
| Lint_Code    | Checks the code for linting errors                | Init_Vars, Install_Deps |
| Build_App    | Builds the application for specific environment   | Lint_Code               |
| Build_DS     | Builds the Storybook for specific environment     | Lint_Code               |
| Create_Pages | Creates the final build for GitHub Pages          | Build_App, Build_DS     |
| Deploy_Pages | Deploys GitHub Pages                              | Create_Pages            |
