# Solopreneur Pack

Your AI-powered business team for task management, research, and outreach.

## 📦 What's Included

- **Chief** 📋 - Personal Assistant & Productivity Partner
- **Scout** 🔬 - Research Agent & Market Analyst
- **Reach** 📧 - Outreach Agent & Relationship Builder

## 🚀 Quick Setup

### 1. Copy Agent Files
Copy the `agents/` folder to your Clawdbot workspace.

### 2. Update clawdbot.json
Add the following to your `agents` array in `clawdbot.json`:

```json
{
  "agents": [
    {
      "id": "chief",
      "name": "Chief",
      "workspace": "./agents/assistant",
      "channels": ["assistant"]
    },
    {
      "id": "scout",
      "name": "Scout",
      "workspace": "./agents/research",
      "channels": ["research"]
    },
    {
      "id": "reach",
      "name": "Reach",
      "workspace": "./agents/outreach",
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
> @Chief Here's what I need to do this week: [list]. Help me prioritize and plan my days.

### Market Research
> @Scout Research the no-code app builder market. Who are the top players, what do they charge, and where are the gaps?

### Cold Outreach
> @Reach Write a cold email to a potential podcast host. I want to be a guest and talk about indie hacking.

## 🔄 Workflow

1. **Plan** → Start each day with Chief
2. **Research** → Have Scout gather intel
3. **Reach Out** → Let Reach handle communications
4. **Track** → Keep Chief updated on progress

## 📝 Customization

Modify the SOUL.md files to match your business style and voice!

---

*Part of OpenClaw Kits - [openclawkits.com](https://openclawkits.com)*
