# Free Sample Pack

A basic assistant agent to try out AgentPacks.

## 📦 What's Included

- **Helper** 🤖 - A general-purpose assistant agent

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
      "id": "helper",
      "name": "Helper",
      "workspace": "./agents/helper",
      "channels": ["general"]
    }
  ]
}
```

### 3. Restart Gateway
```bash
clawdbot gateway restart
```

### 4. Start Chatting!
Message Helper in the general channel.

## 💡 Usage Examples

> @Helper Help me brainstorm ideas for my new project.

> @Helper Write a professional email to my client about the project delay.

> @Helper Summarize this article for me: [link]

## 🚀 Want More?

This is just a taste! Get the full packs with specialized agents:

- **Content Creator Pack** - Mia, Blake, and Jordan for content creation
- **Dev Team Pack** - Marcus, Elena, and Sam for development
- **Solopreneur Pack** - Claire, Leo, and Harper for business

Subscribe at [agentpacks.ai](https://agentpacks.ai) for $19/month!

---

*Free Sample from AgentPacks*
