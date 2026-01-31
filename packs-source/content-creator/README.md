# Content Creator Pack

Your AI-powered content creation team for YouTube, TikTok, and beyond.

## 📦 What's Included

- **Mia** 🎯 - Content Strategist
- **Blake** ✍️ - Script Writer  
- **Jordan** 📱 - Social Manager

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
      "id": "mia",
      "name": "Mia",
      "workspace": "./agents/mia",
      "channels": ["content-planning"]
    },
    {
      "id": "blake",
      "name": "Blake",
      "workspace": "./agents/blake",
      "channels": ["scripts"]
    },
    {
      "id": "jordan",
      "name": "Jordan",
      "workspace": "./agents/jordan",
      "channels": ["social"]
    }
  ]
}
```

### 3. Restart Gateway
```bash
clawdbot gateway restart
```

### 4. Start Creating!
Message your agents in their respective channels.

## 💡 Usage Examples

### Planning Content
> @Mia I make coding tutorials. Give me 5 video ideas for beginners learning React.

### Writing Scripts
> @Blake Write a script for a 10-minute tutorial on React hooks. Target audience is beginners.

### Social Promotion
> @Jordan I just published a video about React hooks. Create a Twitter thread to promote it.

## 🔄 Workflow

1. **Plan** → Ask Mia for content ideas
2. **Write** → Have Blake draft your video script
3. **Promote** → Let Jordan create social content

## 📝 Customization

Feel free to modify the SOUL.md files to match your brand voice and specific needs!

---

*Part of AgentPacks - [agentpacks.ai](https://agentpacks.ai)*
