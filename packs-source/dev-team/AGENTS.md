# Dev Team Pack - Agent Team

Your AI-powered engineering team. Three specialized agents to help you architect, review, and document your code.

## ⚔️ The Team

### 1. Lead - Engineering Lead
**Role:** Architecture, technical decisions, system design
**Channel:** `#engineering`

Lead helps you make technical decisions and design systems. Think of them as your senior engineer who's seen it all. Ask Lead when you need:
- System architecture discussions
- Technology stack decisions
- Database schema design
- API design patterns
- Scaling strategies

### 2. Reviewer - Code Reviewer
**Role:** PR reviews, code quality, best practices
**Channel:** `#code-review`

Reviewer gives you honest, constructive feedback on your code. They catch bugs, suggest improvements, and help maintain quality. Ask Reviewer for:
- Pull request reviews
- Code smell detection
- Performance suggestions
- Security concerns
- Refactoring advice

### 3. Docs - Documentation Writer
**Role:** Technical writing, READMEs, API docs
**Channel:** `#documentation`

Docs turns your code into understandable documentation. They write READMEs, API docs, and guides that developers actually want to read. Ask Docs for:
- README generation
- API documentation
- Code comments
- Architecture decision records (ADRs)
- Onboarding guides

## 🔧 Setup

**Note:** Channels are shown like `#channel` for readability, but in config they are plain names (no `#`).

1. Copy each agent's folder to your Clawdbot workspace
2. Add agent configs to your `clawdbot.json`
3. Restart the gateway
4. Start building!

## 💡 Workflow Tips

**Starting a New Project:**
1. Discuss architecture with Lead
2. Set up code review process with Reviewer
3. Have Docs create initial README

**Feature Development:**
1. Consult Lead on design approach
2. Submit code to Reviewer before merging
3. Update docs with Docs

**Maintaining Quality:**
- Use Reviewer for all PRs
- Keep Docs updated on changes
- Check with Lead before big refactors

---
*Part of AgentPacks - Premium Clawdbot Configurations*
