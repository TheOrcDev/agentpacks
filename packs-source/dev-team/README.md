# Dev Team Pack

Your AI-powered engineering team for architecture, code review, and documentation.

## 📦 What's Included

- **Marcus** 🏗️ - Tech Lead
- **Elena** 🔍 - Code Reviewer
- **Sam** 📚 - Documentation

## 🚀 Quick Setup

**Note:** In config, use channel names without the leading `#` (e.g. `content-planning`, not `#content-planning`).

### 1. Copy Agent Files
Copy the `agents/` folder to your Clawdbot workspace.

### 2. Update clawdbot.json
Add the following to your `agents` array in `clawdbot.json`:

```json
{
  "agents": [
    {
      "id": "marcus",
      "name": "Marcus",
      "workspace": "./agents/marcus",
      "channels": ["engineering"]
    },
    {
      "id": "elena",
      "name": "Elena",
      "workspace": "./agents/elena",
      "channels": ["code-review"]
    },
    {
      "id": "sam",
      "name": "Sam",
      "workspace": "./agents/sam",
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
> @Marcus I'm building a SaaS app with Next.js. Should I use a monorepo or separate repos for frontend and backend?

### Code Review
> @Elena Review this PR: [paste code or link]
> Looking for feedback on error handling and performance.

### Documentation
> @Sam Generate a README for my Express API. It has user auth, posts CRUD, and file uploads.

## 🔄 Workflow

1. **Design** → Discuss architecture with Marcus
2. **Build** → Code your feature
3. **Review** → Get feedback from Elena
4. **Document** → Have Sam update the docs

## 📝 Customization

Modify the SOUL.md files to match your team's standards and preferences!

---

*Part of AgentPacks - [agentpacks.ai](https://agentpacks.ai)*
