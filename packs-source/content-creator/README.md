# Content Creator Pack

Your AI-powered content creation team for YouTube, TikTok, and beyond.

## 📦 What's Included

- **Pixel** 🎯 - Content Planner & Strategist
- **Script** ✍️ - Script Writer & Wordsmith  
- **Buzz** 📢 - Social Manager & Amplifier

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
      "id": "pixel",
      "name": "Pixel",
      "workspace": "./agents/pixel",
      "channels": ["content-planning"]
    },
    {
      "id": "script", 
      "name": "Script",
      "workspace": "./agents/script",
      "channels": ["scripts"]
    },
    {
      "id": "buzz",
      "name": "Buzz", 
      "workspace": "./agents/buzz",
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
> @Pixel I make coding tutorials. Give me 5 video ideas for beginners learning React.

### Writing Scripts
> @Script Write a script for a 10-minute tutorial on React hooks. Target audience is beginners.

### Social Promotion
> @Buzz I just published a video about React hooks. Create a Twitter thread to promote it.

## 🔄 Workflow

1. **Plan** → Ask Pixel for content ideas
2. **Write** → Have Script draft your video script
3. **Promote** → Let Buzz create social content

## 📝 Customization

Feel free to modify the SOUL.md files to match your brand voice and specific needs!

---

*Part of AgentPacks - [agentpacks.ai](https://agentpacks.ai)*
