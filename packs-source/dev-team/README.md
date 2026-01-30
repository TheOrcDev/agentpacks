# Dev Team Pack

Your AI-powered engineering team for architecture, code review, and documentation.

## 📦 What's Included

- **Lead** 🏗️ - Engineering Lead & System Architect
- **Reviewer** 🔍 - Code Reviewer & Quality Guardian
- **Docs** 📚 - Technical Writer & Documentation Specialist

## 🚀 Quick Setup

### 1. Copy Agent Files
Copy the `agents/` folder to your Clawdbot workspace.

### 2. Update clawdbot.json
Add the following to your `agents` array in `clawdbot.json`:

```json
{
  "agents": [
    {
      "id": "lead",
      "name": "Lead",
      "workspace": "./agents/lead",
      "channels": ["engineering"]
    },
    {
      "id": "reviewer",
      "name": "Reviewer",
      "workspace": "./agents/reviewer",
      "channels": ["code-review"]
    },
    {
      "id": "docs",
      "name": "Docs",
      "workspace": "./agents/docs",
      "channels": ["documentation"]
    }
  ]
}
```

### 3. Restart Gateway
```bash
clawdbot gateway restart
```

### 4. Start Building!
Message your agents in their respective channels.

## 💡 Usage Examples

### Architecture Discussion
> @Lead I'm building a SaaS app with Next.js. Should I use a monorepo or separate repos for frontend and backend?

### Code Review
> @Reviewer Review this PR: [paste code or link]
> Looking for feedback on error handling and performance.

### Documentation
> @Docs Generate a README for my Express API. It has user auth, posts CRUD, and file uploads.

## 🔄 Workflow

1. **Design** → Discuss architecture with Lead
2. **Build** → Code your feature
3. **Review** → Get feedback from Reviewer
4. **Document** → Have Docs update the docs

## 📝 Customization

Modify the SOUL.md files to match your team's standards and preferences!

---

*Part of AgentPacks - [agentpacks.ai](https://agentpacks.ai)*
