# Solopreneur Pack

Your AI-powered business team for task management, research, and outreach.

## 📦 What's Included

- **Claire** 📋 - Executive Assistant
- **Leo** 🔬 - Research Analyst
- **Harper** 📧 - Outreach Specialist

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
      "id": "claire",
      "name": "Claire",
      "workspace": "./agents/claire",
      "channels": ["assistant"]
    },
    {
      "id": "leo",
      "name": "Leo",
      "workspace": "./agents/leo",
      "channels": ["research"]
    },
    {
      "id": "harper",
      "name": "Harper",
      "workspace": "./agents/harper",
      "channels": ["outreach"]
    }
  ]
}
```

### 3. Restart Gateway
```bash
clawdbot gateway restart
```

### 4. Start Growing!
Message your agents in their respective channels.

## 💡 Usage Examples

### Task Management
> @Claire Here's what I need to do this week: [list]. Help me prioritize and plan my days.

### Market Research
> @Leo Research the no-code app builder market. Who are the top players, what do they charge, and where are the gaps?

### Cold Outreach
> @Harper Write a cold email to a potential podcast host. I want to be a guest and talk about indie hacking.

## 🔄 Workflow

1. **Plan** → Start each day with Claire
2. **Research** → Have Leo gather intel
3. **Harper Out** → Let Harper handle communications
4. **Track** → Keep Claire updated on progress

## 📝 Customization

Modify the SOUL.md files to match your business style and voice!

---

*Part of AgentPacks - [agentpacks.ai](https://agentpacks.ai)*
