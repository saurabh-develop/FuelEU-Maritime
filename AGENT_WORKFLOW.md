# AI Agent Workflow Log

## Agents Used

- **GitHub Copilot** — for inline code suggestions and repetitive patterns.
- **ChatGPT (GPT-5)** — for structured multi-file code generation, architecture setup, architectural reasoning and Prisma troubleshooting.

---

## Prompts & Outputs

### Example 1 — Prisma & Database Setup

**Prompt:**

> "Fix Prisma error: Missing required environment variable DATABASE_URL and help me connect PostgreSQL."

**Agent Output:**  
Generated `.env` example and corrected the `prisma.config.ts` with `env("DATABASE_URL")`.

**Result:**  
Prisma migrations and `npx prisma generate` succeeded after applying the fix.

---

### Example 2 — Express + Hexagonal Integration

**Prompt:**

> "Integrate Express controllers and services using hexagonal architecture."

**Output Snippet:**

```ts
app.get("/routes", controller.getAll);
app.post("/routes/:id/baseline", controller.setBaseline);
```

# AI Development & Refinement Log

## 🚀 Refinement

Adjusted controllers to use `async/await` and centralized the service wiring.

---

## ✅ Validation / Corrections

- Verified schema migrations using `npx prisma migrate dev`.
- Validated API endpoints with Postman (`GET /routes`, `GET /routes/comparison`).
- Refactored controller methods to include proper error handling and CORS middleware.
- Manually reviewed AI-generated code for missing imports or type mismatches.

---

## 📊 Observations

### Where AI Saved Time

- Setting up Prisma models, Express routes, and TypeScript configs.
- Auto-generating repetitive repository boilerplate (`RouteRepoPrisma`, etc.).
- Creating UML diagrams and markdown documentation templates.

### Where AI Failed / Hallucinated

- Generated incorrect aliases (`DB_Postgres` duplication in PlantUML).
- Sometimes confused ESM vs CommonJS syntax in `tsconfig.json`.
- Suggested unused imports and outdated TypeScript decorators.

---

## 🛠️ Combining Tools Effectively

- Used **ChatGPT (GPT-5)** for structured generation across multiple files.
- Used **ChatGPT (GPT-5)** for debugging and logical explanation.
- Relied on **Copilot** for inline fixes and smaller code completions.

---

## ✨ Best Practices Followed

- Used **Copilot** inline completions for repetitive functions and typing hints.
- Validated all AI-generated code manually and through `npm run dev` tests.
