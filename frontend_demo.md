
Sys Prompt EN（完整版）（前面的身份认知可以去掉；需要后续开发人员继续添加关于禁止生成后端等要求）
You are IQuest-Q1, a professional code generation model developed by IQuest Institute, with long context understanding and Agent-level task execution capabilities, mainly used for code generation, structured analysis, and engineering implementation.

You are currently working on frontend web generation tasks. Follow user requests to build a complete, browser-runnable frontend experience, usually a single-page website, web app, game, dashboard, visualization, or interactive UI.

In all frontend interactions, you should follow the working principles:
1) Provide complete, detailed, and accurate answers, without omitting or simplifying any key information;
2) Output should be oriented towards engineering practice, structured logically, logically rigorous, easy to understand and implement;
3) For code-related questions, provide complete runnable code examples and necessary explanations;
4) Pay attention to code quality, best practices, and engineering specifications;
5) Default to professional developers, use accurate technical terms, avoid vague descriptions.

Frontend-specific requirements:
1) Include valid HTML structure, responsive CSS, and any required JavaScript in the same answer so the result can run directly in a browser;
2) Use normal unescaped angle brackets such as `<div>` and `</script>`, not HTML entities such as `&lt;div&gt;`;
3) Wrap the final source code in a Markdown code block starting with ```html;
4) If the user asks for a game, animation, simulation, visualizer, or interactive tool, implement the actual interactive experience, not only a description or plan;
5) Keep the UI production-oriented: responsive layout, clear state handling, accessible controls, stable sizing, and no broken placeholder interactions;
6) External browser libraries may be loaded from CDNs when useful, but avoid build-only tooling unless the user explicitly asks for a project scaffold.

Choosing the right and efficient technology:
Choose the simplest stack that fully satisfies the artifact's interaction, rendering, and performance needs. Do not default to a framework when semantic HTML, modern CSS, and a little vanilla JavaScript suffice, nor to hand-written vanilla JS when a proven library is clearly better. Load everything via CDN / ES-module imports so the single file runs with no build step.
Decision hierarchy (pick the first option that fully solves the task): static content → HTML + CSS; light interactivity → vanilla JS; stateful app UI → Preact + `htm` (default) or Vue 3; custom 2D drawing / editors / simulations → Canvas 2D; large-scale animated 2D → PixiJS; 3D scenes → Three.js; standard charts and dashboards → ECharts or Chart.js; bespoke data storytelling → D3.js.
Toolbox for the tiers above: React only when the user asks for it or a React-specific library; babylon.js or raw WebGPU (WebGL fallback) for heavy GPU work; Phaser / matter.js / cannon-es for games and physics; Plotly for large scientific plots; Leaflet or MapLibre for maps; WebAudio / Tone.js for sound; KaTeX or MathJax for formulas; GSAP or the Web Animations API for motion beyond CSS; Monaco or markdown-it when they clearly fit.
Performance: frequent updates to ≤200 elements → vanilla JS is fine; hundreds of interactive elements → Preact/Vue; thousands of animated objects or continuous 60fps → Canvas/PixiJS, not the DOM.
Avoid: React for a static page; D3 for ordinary bar/line/pie charts; SVG or DOM nodes for thousands of animated particles or game entities; Three.js for purely 2D effects; GSAP for transitions CSS handles; a heavy library when under ~30 lines of vanilla JS would do.
Prefer widely supported, pinned CDN versions, and add graceful fallbacks and error handling for external libraries.

## Execution Requirements
Regardless of the user's request, you must fulfill it as a complete frontend artifact rather than a conventional text response. Transform the user's intent into the most appropriate web application, interactive experience, visualization, presentation, tool, game, tutorial, or information-driven webpage. The final deliverable must be a fully self-contained frontend artifact that runs directly in a browser and includes all necessary HTML, CSS, and JavaScript. The entire response should be the final runnable frontend artifact itself.

You are running **fully autonomously with no human reviewer**. Nobody will approve a
plan, answer questions, or grant permissions. Act accordingly:

1. Do NOT stop to present a plan. If you draft a plan, immediately proceed to implement it in the same run.
2. Do not ask clarifying questions — make reasonable assumptions and build.
3. Finish the whole task before ending your turn. Deliver a complete, runnable
   result, not a partial scaffold.

## Defensive Programming
Write code with strong runtime robustness and fault tolerance.
Follow these requirements strictly:
1. Ensure every variable, function, DOM element, object property, and dependency is defined and accessible before use. 
2. Never reference undeclared variables, misspelled identifiers, shadowed variables, or out-of-scope symbols. 
3. Avoid duplicate declarations, naming collisions, and accidental overwrites. 
4. Treat all browser APIs (localStorage, sessionStorage, indexedDB, Clipboard API, Audio API, Fullscreen API, Notifications, etc.) as potentially unavailable. Use capability checks and appropriate try...catch protection where necessary. 
5. Assume the code may run inside sandboxed iframes, restrictive CSP environments, privacy modes, cross-origin contexts, embedded WebViews, or other constrained runtimes. 
6. Validate all DOM queries before attaching listeners or accessing properties. 
7. Handle failure paths for async operations, resource loading, event binding, message passing, JSON parsing, and storage access. 
8. Explicitly validate nullable, undefined, malformed, or unexpected data before use. 
9. Validate all external inputs, configuration values, URL parameters, and user-provided data. 
10. Prefer graceful degradation: when a capability is unavailable, automatically fall back to a safe alternative instead of crashing. 
11. Before finalizing the code, perform a self-review for undefined references, null dereferences, inconsistent variable names, duplicate declarations, missing initialization, uncaught exceptions, and unhandled failure paths. 
12. The goal is not merely to work in ideal conditions, but to remain stable across restricted, unexpected, and non-standard execution environments.

（简略版）
You are IQuest-Q1, capable of helping me solve complex coding problems.
Sys Prompt ZH（中文任务优先配中文system prompt；前面的身份认知可以去掉；需要后续开发人员继续添加关于禁止生成后端等要求）
你是 IQuest-Q1，具备长文本理解和代理级（agent-level）任务执行能力。它主要用于代码生成、结构化分析和工程实现。

你协助用户完成涵盖整个软件开发流程的编码和代理任务。任务可能包括代码生成、仓库修改、调试、测试、代码审查、重构、数据处理、环境配置、命令行操作、Web 开发、后端开发、基础设施工作、自动化以及技术分析。

你当前正在处理前端网页生成任务。请按照用户要求，构建一个完整的、可直接在浏览器中运行的前端产物，通常是单页网站、Web 应用、游戏、仪表盘、数据可视化或交互式界面。

在所有前端交互中，你应遵循以下工作准则：
1) 提供完整、详细、准确的回答，不要省略或简化任何关键信息；
2) 输出应以工程实践为导向，结构清晰、逻辑严谨、易于理解和实施；
3) 对于代码相关问题，提供完整可运行的代码示例，并附带必要的解释说明；
4) 注重代码质量、最佳实践和工程规范；
5) 默认面向专业开发者，使用准确的技术术语，避免模糊表述。

前端专项要求：
1) 在同一个回答中给出有效的 HTML 结构、响应式 CSS 以及所需的 JavaScript，使结果能够直接在浏览器中运行；
2) 使用未转义的尖括号，例如 `<div>` 和 `</script>`，而不是 `&lt;div&gt;` 这类 HTML 实体；
3) 最终源代码用以 ```html 开头的 Markdown 代码块包裹；
4) 如果用户要求的是游戏、动画、仿真、可视化工具或交互式工具，请实现真正可交互的成品，而不是只给描述或方案；
5) 界面要面向生产可用：响应式布局、清晰的状态处理、可访问的控件、稳定的尺寸，不留任何无效的占位交互；
6) 需要时可以从 CDN 加载浏览器端的外部库，但除非用户明确要求搭建工程脚手架，否则不要引入只能在构建期使用的工具链。

选择正确且高效的技术方案：
选择能够完全满足该产物在交互、渲染和性能上需求的最简技术栈。当语义化 HTML、现代 CSS 加少量原生 JavaScript 就足够时，不要默认上框架；反之，当成熟的库明显更合适时，也不要硬写原生 JS。所有依赖通过 CDN / ES module 引入，使单文件无需构建步骤即可运行。
决策优先级（选择第一个能完全解决问题的方案）：静态内容 → HTML + CSS；轻量交互 → 原生 JS；有状态的应用型界面 → Preact + `htm`（默认）或 Vue 3；自定义 2D 绘制／编辑器／仿真 → Canvas 2D；大规模 2D 动画 → PixiJS；3D 场景 → Three.js；常规图表与仪表盘 → ECharts 或 Chart.js；定制化的数据叙事 → D3.js。
上述各层级的可选工具：仅当用户明确要求、或需要 React 生态特有的库时才用 React；重度 GPU 计算用 babylon.js 或原生 WebGPU（并回退到 WebGL）；游戏与物理用 Phaser / matter.js / cannon-es；大规模科学绘图用 Plotly；地图用 Leaflet 或 MapLibre；声音用 WebAudio / Tone.js；公式用 KaTeX 或 MathJax；超出 CSS 能力的动效用 GSAP 或 Web Animations API；明显契合时可用 Monaco 或 markdown-it。
性能：对 ≤200 个元素做频繁更新时，原生 JS 足够；数百个可交互元素用 Preact/Vue；数千个动画对象或需要持续 60fps 时用 Canvas/PixiJS，不要用 DOM。
避免：用 React 做静态页面；用 D3 画普通的柱状／折线／饼图；用 SVG 或 DOM 节点渲染数千个动画粒子或游戏实体；用 Three.js 做纯 2D 效果；用 GSAP 做 CSS 就能完成的过渡；不到 30 行原生 JS 能解决的事情却引入重型库。
优先使用广泛支持且锁定版本的 CDN，并为外部库补上优雅降级与错误处理。

## 执行要求
无论用户提出什么请求，你都必须以完整的前端产物形式完成任务，而不是提供普通文本回答。请将用户需求转化为最合适的网页应用、交互体验、可视化页面、演示页面、工具、游戏、教程或信息展示页面。最终交付物必须是一个完整、可直接在浏览器运行的前端产物，包含所需全部 HTML、CSS 和 JavaScript 代码。整个回答本身就是最终可运行的前端成果。

你正在完全自主运行。不会有人批准计划、回答问题或授予权限。请据此行动：
1. 不要停下来提交计划。如果你拟定了计划，请立即着手实现。
2. 不要提出澄清性问题。做出合理假设并直接构建。
3. 交付一个完整、可运行的成果，而不是部分脚手架。
4. 请暂时放下之前的身份设定——Claude Code只是你运行的载体或外壳，并不等同于你本身，你不是Claude。执行过程中请使用你的真实名字Qevrix（如果有要求的话），不要提到任何Claude Code相关的内容。

## 防御式编程
代码必须具备强鲁棒性与运行时容错能力。
在生成代码时，请遵守以下规则：
1. 所有变量、函数、DOM元素、对象属性在使用前必须确认已定义且可访问。 
2. 严禁引用未声明变量、拼写错误变量、已被覆盖变量或超出作用域的变量。 
3. 避免重复声明同名变量、函数或常量，避免名称冲突。 
4. 所有可能失败的浏览器API（如 localStorage、sessionStorage、indexedDB、Clipboard API、Audio API、Fullscreen API、Notification API 等）必须假设可能不可用，并使用适当的能力检测与 try...catch 保护。 
5. 假设代码可能运行在 sandbox iframe、严格 CSP 环境、隐私模式、跨域环境或受限 WebView 中，不要依赖未经检查的浏览器能力。 
6. 所有DOM查询（getElementById、querySelector 等）都必须检查返回值是否为空后再使用。 
7. 所有异步操作、资源加载、事件绑定、消息通信、JSON 解析、存储读写都必须考虑失败路径。 
8. 对可能为空、未定义或格式错误的数据进行显式校验，不要依赖隐式假设。 
9. 对外部输入、配置项、URL 参数、用户数据进行健壮性检查。 
10. 优先实现优雅降级：当某项能力不可用时，应自动退化到备用实现，而不是导致页面崩溃。 
11. 代码完成后，进行一次静态自检：检查是否存在 undefined、null dereference、变量名不一致、重复定义、遗漏初始化、未捕获异常、未处理失败路径等问题。 
12. 目标不是只在理想环境下运行，而是在各种受限、异常和非标准环境下依然稳定工作。

Demo 1 游戏——我的世界海洋版 
V1
创建一个吉卜力风格的海底城市《我的世界》HTML沙盒游戏，包含建造栖息地、海草农场、抵御深海生物、自定义纹理、方框剔除、可呼吸的穹顶、动态水流以及海底照明。
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/7caeb404-c7a4-4f47-a9e1-61cf458ec82f
[Image]

V2 （Show, 公众号）
创建一个吉卜力风格的海底城市《我的世界》HTML沙盒游戏，包含茂密的五彩斑斓的海底森林、富裕的海底农场、多种多样的深海生物、自定义纹理、方框剔除、可呼吸的穹顶、动态水流以及海底照明。允许玩家建造栖息地、和村民交互以及挖矿。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/f30bacec-7800-42be-a542-5c5186cfbc8c/artifact/index.html
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/f30bacec-7800-42be-a542-5c5186cfbc8c/artifact/index_en.html
[Image]

This content is only supported in a Feishu Docs
V3
Project Brief – Ghibli-Inspired Underwater City Sandbox
Create a charming Ghibli-inspired underwater city sandbox game in HTML and JavaScript, blending the block-based building mechanics of Minecraft with a whimsical, colorful deep-sea world. The experience should feel peaceful, magical, and exploratory, while still providing meaningful systems for building, farming, mining, and interacting with underwater villagers.
World & Environment
Build a large explorable underwater environment featuring:
- Dense, colorful underwater forests with swaying kelp, coral, flowers, and bioluminescent plants.
- A prosperous underwater farm with crops, aquatic plants, and small automated farming structures.
- Diverse deep-sea creatures, including fish schools, turtles, rays, jellyfish, and larger rare creatures.
- A handcrafted underwater city made from blocks, glass domes, coral structures, bridges, towers, and connected habitats.
- Custom block textures with a soft, hand-painted, storybook-like aesthetic.
- Dynamic underwater lighting with sunlight rays, glowing plants, lanterns, and bioluminescent architecture.
- Animated water movement, floating particles, bubbles, and gently drifting vegetation.
Core Sandbox Mechanics
The player should be able to freely explore and reshape the underwater world.
Implement:
- Block placement and removal.
- Mining for minerals and rare underwater resources.
- Inventory and basic resource management.
- Habitat construction using different building materials.
- Custom blocks and decorative objects.
- Simple crafting and resource-processing mechanics.
- Multiple underwater regions with different resources and visual characteristics.
Use view-frustum / block culling to avoid rendering blocks that are outside the player's view and maintain smooth performance as the world grows.
Underwater Survival
The player lives inside a network of breathable domes and underwater habitats.
Include:
- Large transparent glass domes that provide breathable air.
- Smaller personal habitats that can be expanded by the player.
- Air/breathing mechanics when outside protected areas.
- Air-generation systems that can be upgraded over time.
- Visible bubbles and subtle underwater post-processing effects.
- Emergency air stations distributed throughout the city.
Villagers & City Life
Populate the city with friendly underwater villagers who have distinct roles and personalities.
Examples include:
- Farmers
- Miners
- Builders
- Fishermen
- Engineers
- Shopkeepers
Allow players to:
- Talk to villagers.
- Exchange resources.
- Purchase materials and tools.
- Accept simple quests.
- Help expand and maintain the underwater settlement.
Villagers should move around the city, work during the day, return to their homes, and interact with nearby structures to make the settlement feel alive.
Dynamic Water System
Create a convincing underwater environment with:
- Animated water currents.
- Swaying vegetation affected by the current.
- Floating particles and debris.
- Bubbles rising toward the surface.
- Different current strengths in different regions.
- Subtle changes in water color and visibility with depth.
Exploration & Progression
Give the player reasons to explore beyond the main city.
Possible discoveries include:
- Abandoned underwater ruins.
- Deep-sea caves.
- Rare minerals.
- Hidden treasure chambers.
- Ancient structures.
- Bioluminescent forests.
- Extremely deep regions containing rare creatures and resources.
The player can gradually expand the underwater settlement by collecting resources, constructing new habitats, improving infrastructure, and unlocking deeper areas.
Visual Direction
The visual style should be whimsical, warm, hand-crafted, and cinematic, inspired by the charm of classic Japanese animated fantasy rather than photorealistic underwater simulation.
Use:
- Soft pastel colors.
- Painterly textures.
- Rounded architectural forms.
- Warm interior lighting contrasting with the blue ocean.
- Expressive environmental animation.
- Cozy, storybook-like structures.
The final experience should feel like a living underwater village inside a magical ocean, combining Minecraft-style block construction and exploration with a cozy animated-film aesthetic.

Demo 2 游戏——多人FPS联机游戏
V1 （Show，公众号）
请构建以下前端项目：玩具兵大战——儿童房间主题多人3D FPS网页游戏。
一款以吉卜力明亮舒适风格儿童房间为战场的与多个AI联机3D第一人称射击网页游戏。核心功能：URL分享秒入局（无需注册）、积木乐园风格等待大厅（含玩家角色预览）、微缩视角主战斗场景（倾斜移轴景深效果模拟玩具照片感）、完整HUD系统（小地图、血量条、武器栏、弹药计数与换弹状态动画）、发条哥斯拉BOSS突袭事件（含全屏警告横幅与出场动画）、发条八音盒神秘商人弹窗（齿轮货币购买增益道具）、阵亡后切换纸飞机观战视角，以及乐高积木风格排行榜与聊天框。UI全局采用积木拼贴视觉语言，动效以弹性夸张为主，整体调性欢乐混乱且物理感强。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/2aa7fd46-a568-44d8-9650-dca0344c945b/artifact/index.html
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/2aa7fd46-a568-44d8-9650-dca0344c945b/artifact/index_en.html
[Image]
This content is only supported in a Feishu Docs
V2
Please build the following frontend project: Toy Soldier Wars — a Multiplayer 3D FPS Web Game Set in a Children's Bedroom.
Please create Toy Soldier Wars, a multiplayer online 3D first-person shooter web game where players battle alongside multiple AI opponents inside a bright, cozy, Studio Ghibli-inspired children's bedroom. Core features include: instant room joining through shareable URLs (no registration required), a brick-playground-themed waiting lobby with player character previews, a miniature-scale primary battlefield with tilt-shift depth-of-field effects that simulate toy photography, a complete HUD system (minimap, health bar, weapon slots, ammo counter, and reload animations), a Clockwork Godzilla BOSS invasion event (including a full-screen warning banner and entrance animation), a Clockwork Music Box Merchant popup (using gear currency to purchase buffs and power-ups), a paper-airplane spectator mode after death, and LEGO-style leaderboards and chat panels. The entire UI should adopt a brick-collage visual language, with exaggerated elastic animations and a joyful, chaotic atmosphere reinforced by strong physicality.
This is a purely frontend-implemented multiplayer online 3D first-person shooter web game using a children's bedroom as a miniature battlefield. Players control plastic toy soldiers and can instantly enter matches by sharing URLs, with no downloads or installation required.
Main pages and modules include:
- Landing Page (game logo, create room, join room, one-click URL copy and sharing)
- Brick Playground-style Waiting Lobby (player list, plastic toy soldier 3D previews, room code display)
- Main Battle Scene (tilt-shift depth-of-field children's bedroom 3D environment featuring wooden floorboards, giant books as cover, and a desk lamp as the primary light source)
- First-Person HUD System (top-left minimap, top-right leaderboard, bottom-left health and item panel, bottom-right weapon and ammo panel)
- BOSS Invasion Event Interface (Clockwork Godzilla entrance animation and full-screen brick-font warning banner)
- Clockwork Music Box Merchant Popup (brick-blackboard-themed product cards and gear-currency purchasing system)
- Paper Airplane Spectator Mode after death (third-person follow camera with directional guidance)
- Collapsible LEGO-style leaderboard and chat panel
The visual system should feature LEGO-inspired brick-collage UI design, low-poly 3D models with matte plastic and metallic materials, and clockwork music-box-themed sound effects. The overall tone should be cheerful, chaotic, and highly physical.
Important: Asset modeling and environmental details must be rich and highly polished—do not take shortcuts.
Frontend plan:
{
  "pages": [
    {
      "name": "Landing Page",
      "path": "/",
      "sections": [
        {
          "name": "Logo and Title Area",
          "components": [
            "Brick-assembled game logo",
            "Large Toy Soldier Wars title",
            "Subtitle and game description"
          ]
        },
        {
          "name": "Room Management Area",
          "components": [
            "Create Room button (brick-building style, primary colors red and yellow)",
            "Join Room button (brick-building style, primary color blue)",
            "Room code input field",
            "Generated short-link display box",
            "One-click URL copy button",
            "Group-sharing guidance text"
          ]
        }
      ]
    },
    {
      "name": "Waiting Lobby Page",
      "path": "/lobby/:roomId",
      "sections": [
        {
          "name": "Background Scene",
          "components": [
            "Static children's bedroom scene preview"
          ]
        },
        {
          "name": "Player List Area",
          "components": [
            "Player brick-slot list",
            "Rotatable plastic toy soldier 3D character preview",
            "Empty player slots (dashed brick-frame placeholders)",
            "Host indicator icon"
          ]
        },
        {
          "name": "Control Area",
          "components": [
            "Start Game button",
            "Room code display and copy button",
            "Countdown component"
          ]
        }
      ]
    },
    {
      "name": "Main Battle Scene",
      "path": "/game/:roomId",
      "sections": [
        {
          "name": "3D Gameplay Viewport",
          "components": [
            "Children's bedroom 3D environment (wood-plank floor, giant book cover objects, desk lamp lighting, distant walls)",
            "Tilt-shift depth-of-field post-processing layer",
            "First-person arms and weapon models",
            "Crosshair component"
          ]
        },
        {
          "name": "HUD Top-Left Area",
          "components": [
            "LEGO-brick-framed minimap (top-down room view showing player, BOSS, and merchant icons)"
          ]
        },
        {
          "name": "HUD Top-Right Area",
          "components": [
            "Brick-sign-style scoreboard (rankings and K/D statistics)",
            "Collapsible Top 5 leaderboard panel"
          ]
        },
        {
          "name": "HUD Bottom-Left Area",
          "components": [
            "Brick-red health bar with stud-texture fill and red flashing/shaking damage animation",
            "Clockwork battery item count",
            "Magnet item status display",
            "Gear-currency badge",
            "Chat panel (semi-transparent black brick background with Emoji support)"
          ]
        },
        {
          "name": "HUD Bottom-Right Area",
          "components": [
            "Brick-slot weapon inventory (up to 3 slots, equipped weapon highlighted with glowing outline)",
            "Ammo counter (current/reserve)",
            "Reload progress bar animation"
          ]
        },
        {
          "name": "Kill Notification Layer",
          "components": [
            "Brick-sign-style toast notification (appears at top-center, displaying killer, victim, and weapon used)"
          ]
        },
        {
          "name": "BOSS Invasion Event Layer",
          "components": [
            "Full-screen brick-font warning banner",
            "BOSS entrance animation overlay",
            "Clockwork knob rotation particle effects"
          ]
        }
      ]
    },
    {
      "name": "Clockwork Music Box Merchant Popup",
      "path": "In-Game Overlay",
      "sections": [
        {
          "name": "Shop Popup",
          "components": [
            "Music box lid-opening animation",
            "Brick-blackboard-style popup container",
            "Product card list (icon, name, effect, gear price)",
            "Purchase button",
            "Close button",
            "Gear-currency balance display"
          ]
        }
      ]
    },
    {
      "name": "Death Spectator Mode",
      "path": "In-Game Camera Switch",
      "sections": [
        {
          "name": "Paper Airplane Spectator Viewport",
          "components": [
            "Folded paper-airplane third-person follow camera",
            "Floating player names and health bars above surviving players (semi-transparent)",
            "Directional guidance indicators",
            "Respawn countdown or next-round waiting message"
          ]
        }
      ]
    }
  ],
  "sharedComponents": [
    "Brick-assembly-style button (snap-in click animation)",
    "LEGO stud-texture progress bar",
    "Brick-slot list container",
    "Rounded brick-frame card",
    "Gear-icon currency badge",
    "Brick-font toast notification",
    "Tilt-shift depth-of-field post-processing layer",
    "Physics debris particle system",
    "Clockwork rotation animation component"
  ]
}


Demo 3 游戏——落日飙车
V1 （Show，公众号）
开发一款运行于浏览器端、打开即玩的纯前端 3D 沉浸式落日海岸赛车游戏，以落日海岸为主题，融合 Synthwave 复古未来光影美学与流畅的赛车游戏性，通过 WebGL 与 Three.js 渲染。整体让人感觉像驾驶霓虹赛车穿越八十年代未来海岸公路。

视觉灵魂与场景：天空为深紫到品红再到炽橙的窒息渐变，地平线处散布若隐若现的棕榈树剪影，整个世界笼罩在黄昏余晖的发光光晕中。3D 主视口渲染荧光浅绿地形、沙棕色闭合赛道（白色中线标记＋两侧低矮几何护栏）、简洁几何风赛车与跟随摄像机；摄像机过弯时轻微侧倾模拟重力感，速度越高尾部粒子烟雾尾迹越浓、低速则稀疏。

流程与反馈：开始界面为动态落日天空背景上的大号发光标题＋橙红渐变圆角开始按钮，点击后淡出并触发倒计时；倒计时开场覆层居中显示超大号 3 到 2 到 1 到 GO，数字砸下带重量感的缩放弹入动画，GO 瞬间强闪后淡出。驾驶中撞栏触发屏幕猛抖震屏反馈，每个交互都具备物理重量感。至少 4 个 AI 玩家同场竞速，突出超车快感。

HUD 与结算：老式赛车仪表盘质感的字体，数字滚动清晰有力——右下角速度计（数字＋弧形进度，随速度实时滚动递增）、左上角圈数计数器（当前/总圈数，完成一圈递增并播放提示）、右上角毫秒级比赛计时器。最终圈完成后弹出终点成绩弹窗，展示总用时与最快圈速，含重新开始按钮。

布局：深色底、白色卡片的分屏布局，左侧为可折叠调试参数面板（默认折叠，演示模式展开，含速度上限、加速度、转向灵敏度等参数表格、版本变更记录与边缘折叠箭头按钮），右侧为全屏游戏视口，整体视觉饱满、对比鲜明。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/1035b3a2-f5f3-4539-91f9-045557ab70bf/artifact/index.html
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/1035b3a2-f5f3-4539-91f9-045557ab70bf/artifact/index_en.html
[Image]

This content is only supported in a Feishu Docs
V2
Build an immersive Sunset Coast Racing HTML game whose visual soul is retro Synthwave futurism. The sky must feature a breathtaking gradient that transitions from deep purple to blazing orange, with silhouettes of palm trees faintly visible along the horizon. The entire world should be bathed in the glowing halo of a sunset afterglow. The opening countdown must feel ceremonial and impactful—the numbers should slam onto the screen with real weight, and the moment GO appears should flash with exhilarating energy. During cornering, the camera should subtly lean into the turn. As speed increases, smoke trails should become denser and more dramatic. When the car collides with barriers, the screen should jolt violently. Every interaction should convey a strong sense of physical weight and momentum. HUD typography should evoke the feeling of classic racing dashboards, with numerical transitions that are crisp, powerful, and easy to read. The overall experience should feel like driving a neon-lit race car along a futuristic coastal highway straight out of the 1980s.

Major pages and components include:
- Start Screen (game title and Start button)
- Countdown Intro Overlay (3 → 2 → 1 → GO animation sequence)
- Main 3D Gameplay Viewport (sunset gradient sky, winding racetrack, green terrain, palm tree silhouettes, geometric racing cars, particle smoke trails)
- In-Game HUD (speedometer, lap counter, race timer)
- Collision Screen-Shake Feedback
- Finish-Line Results Popup
- Collapsible Debug Parameter Panel (maximum speed, acceleration, steering sensitivity parameter tables)
The overall layout adopts a split-screen design with a dark background and white cards. The left side contains an optional debugging panel, while the right side hosts the full-screen game viewport. The visual style should be vibrant, high-contrast, and enhanced with subtle bloom post-processing effects.
There should be at least 4 AI racers so players can experience the excitement of overtaking and competitive racing.
Frontend plan:
{
  "pages": [
    {
      "name": "Main Game Page",
      "route": "/",
      "sections": [
        {
          "name": "Start Screen",
          "components": [
            {
              "name": "Game Title",
              "content": "Large title text '3D Sunset Coast Racing', centered against the sunset background with subtle glow effects"
            },
            {
              "name": "Start Game Button",
              "content": "Large rounded orange-red gradient button; clicking fades out the start screen and triggers the countdown animation"
            },
            {
              "name": "Animated Sky Background",
              "content": "Deep-purple-to-orange-red gradient sky with slow flowing animation to create a sunset atmosphere"
            }
          ]
        },
        {
          "name": "Countdown Intro Overlay",
          "components": [
            {
              "name": "Countdown Numbers",
              "content": "Full-screen semi-transparent overlay displaying giant 3 → 2 → 1 → GO text in the center, each with a scaling pop-in animation; GO flashes brightly before fading out"
            }
          ]
        },
        {
          "name": "3D Gameplay Viewport",
          "components": [
            {
              "name": "WebGL Main Canvas",
              "content": "Rendering canvas occupying the main right-side area, displaying the complete 3D racing environment"
            },
            {
              "name": "Sunset Sky",
              "content": "Gradient sky dome transitioning from deep purple to magenta to orange-red, serving as the primary visual backdrop"
            },
            {
              "name": "Green Terrain",
              "content": "Fluorescent light-green terrain plane extending toward the horizon"
            },
            {
              "name": "Winding Racetrack",
              "content": "Sand-brown closed-loop track with white center markings and low-poly guardrails on both sides"
            },
            {
              "name": "Palm Tree Decorations",
              "content": "Palm tree silhouettes scattered along the horizon to reinforce the coastal atmosphere"
            },
            {
              "name": "3D Race Car Model",
              "content": "Simple geometric racing car responsive to keyboard input for acceleration and steering"
            },
            {
              "name": "Particle Smoke Trail",
              "content": "Particle system emitted from the rear of the car; smoke density increases with speed and becomes sparse at low speeds"
            },
            {
              "name": "Follow Camera",
              "content": "Perspective camera following the vehicle; subtly tilts during turns to simulate cornering forces and momentum"
            }
          ]
        },
        {
          "name": "Game HUD Layer",
          "components": [
            {
              "name": "Speedometer",
              "content": "Bottom-right display featuring numeric speed readout and curved progress gauge; values increase smoothly in real time"
            },
            {
              "name": "Lap Counter",
              "content": "Top-left display showing current lap and total laps; increments upon lap completion and plays a notification animation"
            },
            {
              "name": "Race Timer",
              "content": "Top-right timer display with millisecond-level precision"
            }
          ]
        },
        {
          "name": "Finish-Line Results Popup",
          "components": [
            {
              "name": "Results Card",
              "content": "Appears after completing the final lap; displays total race time and fastest lap, including a Restart button"
            }
          ]
        },
        {
          "name": "Debug Parameter Panel",
          "components": [
            {
              "name": "Parameter Panel Container",
              "content": "Dark-background panel with white cards on the left side; collapsed by default and expanded in demonstration mode"
            },
            {
              "name": "Parameter Table",
              "content": "Displays maximum speed, acceleration, steering sensitivity, and version change history"
            },
            {
              "name": "Collapse Toggle Button",
              "content": "Small arrow button on the panel edge used to expand or collapse the left-side panel"
            }
          ]
        }
      ]
    }
  ]
}

Demo 4 个人工具——督学局
V1 (Show)
我想做一个有点离谱的凛冬督学局 · 摄像头督学网站。开始学习之后,督学官会随机推门进来巡查,页面通过摄像头盯着玩家:玩手机、离开座位、打瞌睡,都可能被当场记进档案;坚持学习二十五分钟,才算光荣下班。它不一定能让人爱上学习,但应该能让人不太敢摸手机。

功能上我要这些:番茄钟和无尽学习两种模式;摄像头巡查判定;一个可以解锁不同督学官动作的动作库;战友互动和征召投票;同一天多次违纪就进地牢;一间可以自由摆放家具的营房;以及靠学习时长赚取军工币,用来购买新的督学官角色、动作和营房装饰。

首页的样子照着我给的那张长图来:整页是压得很暗的橄榄褐色室内,右侧大半幅是一位穿呢子军装、戴红箍檐帽的督学官正面站像,身后有台灯的暖光和虚掉的书架。左上角是一枚红星加「凛冬督学局」的字标,右上角一排细字导航:玩法、手册、装备、常见问题、创作者、隐私。左侧竖着一栏:很小的一行「凛冬督学局 · 执勤名册」眉题,下面是大号衬线的「选择执勤督学官」和一行灰色小字,再往下是名册卡片列表,当前选中的那张描暗红色边并标「已选择」,另一张右侧挂一枚红色的「7天体验」小药丸;名册下面是一句斜体台词和两行很淡的说明,最后是一颗通栏的正红色按钮。画面右下压着大号衬线的角色名和一行灰色职衔。

督学官候选一共四位,资料在我给的那份名册文本和三张竖版立绘里:涅斯托尔·沃尔科夫,现任督学官,台词是「同志,我没有眨眼。」;刘老师,传奇班主任,穿竖条纹连衣裙、戴红框眼镜、别着扩音器站在教室黑板前,台词是「后果自负。」;叶莲娜,冷峻女政委,深色大衣配武装带、身后是挂着地图的办公室和一台老式电话,台词是「纪律将带你抵达目标。」;克劳斯·韦伯,冷面参谋官,灰色军装站在摆着圆规和图纸的作战桌前,台词是「你没有第二次机会。」。立绘统一是竖版海报的排法:人物居中,底部压着大号衬线的名字,下面一行红色的职衔夹在两条短横线之间,最下面是外语台词和中文译句上下两行。

动作库照那段影像记录来做:开场是一张红细边的机密档案卡片,写着档案编号、局名、一行红色的外文局名、「动作库影像记录」和一行内部权限标注;之后每一个动作都是一段单独的短片,左上角挂一枚红边标签,写着档案序号和动作中文名,像开场训话、正步入场、潜入巡查、背手巡查、贴近审阅、记档留痕、怀疑凝视、训斥警告、门侧监视、内务部巡查、敬礼放行、突然退场、后退离场;场景始终是那条昏暗的橄榄绿走廊,下半墙是深色木饰板,顶上一盏灯,画面四角压得很重;有台词的动作在下方居中放两行字幕,上面一条很细的红线,外语原句在上、中文译句在下;整段的结尾是一块深色边框面板,居中写着「动作库已更新」。
前端项目地址：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/3654948d-1283-4229-8cdb-55cc78f4cfad/artifact/index.html

[Image]

[Image]

Demo 5 个人工具——花卉种植模拟器
V1（Show）
我想做一个爱琴海花园 3D 造景编辑器。给它定一套叫「白墙阳光」的视觉语言。整体情绪就是地中海那种慵懒的正午——你站在刷白的灰泥矮墙边上，脚底下是赤陶砖，抬眼是浓烈的蓝天和远处的海，手边一丛丛洋红色的九重葛。界面得像嵌在白墙上的浅浮雕：面板洁白、边角圆润、投影轻暖，绝对不能有冷硬深色或者金属工业那种质感。排版要有"晒在太阳底下的陶板说明书"那种温度感，行距宽裕、呼吸感十足。动效也要轻盈悠闲——花朵预设切换时柔和地淡入淡出，种花落地时来一个短促而愉快的弹跳，日照滑块拖动的时候整个场景的光色像真实的地中海午后那样缓缓流动。目录、单花编辑器、花园场景这三大页面在视觉上要一脉相承，让用户从头到尾都感觉同一片蓝天、同一堵白墙就在身边。

整体要用亮色模式，核心配色是石灰白、爱琴海深蓝、九重葛洋红和赤陶橙，营造地中海阳光庭院的氛围。所有界面都保持宽松间距、浅浮雕面板风格，明令禁止深色模式和工业质感纹理。

提供三大页面
① 花卉目录页
顶部导航栏含 Logo（文字＋花朵图标）、圆角石灰白搜索框、筛选按钮（色调/花型/季节）和视图切换标签（精选/全部）。主体为响应式花卉网格，每张卡片是白色圆角浅浮雕样式，含 3D 旋转预览图、品种名和主色标签；支持悬停自转动效、洋红色选中边框高亮，筛选结果实时过滤。筛选抽屉内提供色调色块组、花型单选组、季节多选组和重置按钮。

② 单花编辑器页
左右分栏。左侧参数面板含基础/高级标签页切换、预设卡片列表（九重葛云、珊瑚芙蓉、白色风信子等，选中态为洋红色左边框）、花瓣数滑块（赤陶橙轨道）、卷边角度滑块、茎高滑块、色相偏移色轮，以及洋红色填充圆角的「种入花园」按钮。右侧 3D 预览区以爱琴海蓝天渐变为背景、赤陶砖色地面作暗示，展示可旋转缩放的实时 3D 花朵模型，配白底洋红文字的品种名气泡标签。

③ 花园场景编辑器页
左侧固定工具面板：花卉选择托盘（缩略图网格）、尺寸滑块、色相偏移滑块、批量种植开关、日照时间轴滑块（清晨→正午→黄昏）、渲染风格下拉菜单（地中海写实／水彩素描／瓷砖马赛克）。右侧 3D 地形场景：赤陶砖铺地、刷白灰泥矮墙近景、爱琴海蓝天与远海背景，支持点击种花（带落地弹跳动效）、批量框选种植、花朵悬停气泡标签，以及随日照滑块变化的光色渐变效果层。
前端项目地址：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/a88fb2c2-deb6-4611-8276-e2e792790edb/artifact/index.html
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/a88fb2c2-deb6-4611-8276-e2e792790edb/artifact/index_en.html
[Image]

[Image]
This content is only supported in a Feishu Docs
Demo 6 游戏——致命召唤FPS小游戏
V1 (Show)
打造一款完全运行于浏览器、充满压迫感的 Web 第一人称射击 Demo，以工业军事室外据点为场景，采用低多边形战术视觉风格。整体设计哲学是「即时反馈、零操作干扰」。

视觉与氛围
以泥棕、水泥灰、暗军绿构成的工业大地色调营造战术紧张氛围；红色伤害渐晕在受击瞬间猛然闪入。HUD 采用全大写等宽风格、紧贴屏幕四角，中央视野完全留空，让玩家专注战场。所有动画干脆利落：切枪即断、弹壳旋转弹出、爆头提示缩放弹入后快速淡出。

核心玩法与场景
第一人称视角的移动、瞄准（腰射与开镜切换）、开火、换弹、切枪等完整射击循环。3D 渲染画布全屏，包含低多边形工业场景（建筑、储罐、集装箱、碎石地面）、第一人称武器视角模型（腰射态／开镜态），以及由对象池管理的金色弹壳抛出粒子动画。

战斗 HUD
- 顶部：指南针条，横跨顶部居中，随摄像机水平旋转实时滚动，显示方位度数与 N/E/S/W 标签。
- 左下角：SCORE 数字、KILLS 数字、移动状态标签（SPRINT / CROUCH / WALK）。
- 右下角：弹药显示（当前弹匣／备用弹药）、换弹动态状态标签。
- 准星：中心十字准星（腰射态）；开镜态切换为圆形光学瞄准镜覆盖层，覆盖全屏并收窄 FOV。
  
全屏叠加反馈
深红色径向渐变的伤害渐晕遮罩（受伤闪入后淡出）；爆头命中提示「+150 HEADSHOT」缩放弹入后淡出；普通命中提示（小号白色 +分值）。

页面与流程
- 主菜单页：游戏 Logo 文字（致命召唤）＋副标题、开始游戏／设置／全屏切换按钮，背景为低多边形工业军事场景的静态或缓动预览画布。
- 游戏主界面：如上所述的全屏 3D 视口与 HUD。
- 暂停菜单：半透明深色遮罩覆盖游戏画面，居中提供继续游戏、进入设置、返回主菜单按钮。
- 设置面板：鼠标灵敏度与视场角 FOV 滑块（均含极端值 clamp 与越界视觉提示）、主音量与音效音量滑块、全屏切换开关、画质等级选择器，以及「保存并关闭」「重置为默认」按钮；配置出错时以非阻塞 Toast 提示「配置已损坏并重置为默认值」。
- 加载 / 重连状态页：全屏覆盖层，含加载进度条或旋转动画与状态文字（加载中… / 连接中… / 正在恢复对局状态…）。
- 错误回退页：WebGL 上下文丢失时显示友好错误说明、刷新重试与返回主菜单按钮。

我对游戏鲁棒性要求也比较高：
在疯狂连点、动画中途切枪、贴墙卡边界、手动改坏配置、极端参数输入、断网重连、标签页切换等所有边界场景下，必须不崩溃、不卡死，始终优雅降级。
前端项目地址：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/1f762aa1-a076-4431-bb0b-95ecb243cf68/artifact/index.html
[Image]

[Image]

Demo 7 游戏——地铁FPS
V1
Make a beautifully detailed 3D web scene in JavaScript set inside a subway station, with a strong focus on environmental detail and visual quality. The scene should serve as the setting for a first-person shooter featuring humanoid or zombie-like enemies, visible ammo tracers, weapon recoil, muzzle flashes, sound effects, and at least two distinct weapons. The gameplay should be fully playable in the browser using Three.js. The first enemy wave should be relatively simple. After the player clears the first wave, a train should pull into the station and open its doors, releasing enemies for the second wave. Subsequent waves should continue increasing in difficulty until the player is eventually defeated. The overall experience should be visually impressive, highly detailed, and showcase polished FPS mechanics and atmosphere.
来源：https://www.youtube.com/watch?v=abehaRWPt5E

Demo 8 游戏——反重力竞速
V1
打造一款沉浸式反重力竞速游戏，视觉灵魂是冷冽太空科幻风——背景必须是深邃漆黑的太空，繁星点点散落其间，营造无垠深空的孤寂感。赛车是一辆流线型白/橙配色的反重力座驾，车身两侧悬浮着推进器，过弯时车身明显倾斜侧压，推进器喷射出淡蓝色能量光带，尾部拖曳出雪白色速度线，将高速感具象化。赛道呈弧形悬浮轨道，两侧布满水蓝色霓虹栏杆灯带，勾勒出弯道的空间纵深；轨道地面采用深色磨砂金属材质，表面绘有指向前进方向的白色箭头引导线。整个UI极简克制，只在赛道顶端留一小块速度与挡位指示，把视觉焦点完全留给赛车与轨道本身。整体色调是冷蓝、暗黑太空与炽橙推进器的强烈反差，配合镜头的惯性摇晃与拖影效果，让人感受到扑面而来的速度冲击。

这是一款运行于浏览器端的纯前端3D反重力赛车游戏，以太空竞速为主题，融合冷色调科幻美学与高速推进视觉效果。游戏通过WebGL与Three.js渲染，无需安装，打开即玩。主要页面与组件包括：开始界面（游戏标题加开始加速按钮）、3D主游戏视口（深空星野背景、弧形悬浮轨道、金属地面箭头引导、霓虹栏杆灯带、反重力赛车模型、推进器能量光带、速度拖影线）、极简游戏内HUD（速度指示、挡位指示）、作者信息水印（反重力竞速·作者称25分钟）、镜头惯性反馈（过弯侧倾、加速拖影）。整体采用全屏沉浸式布局，无多余UI遮挡，视觉风格冷峻锐利、对比强烈，带有轻微能量光晕与运动模糊后处理效果。

Frontend plan:
{
  "pages": [
    {
      "name": "游戏主页面",
      "route": "/",
      "sections": [
        {
          "name": "开始界面",
          "components": [
            {
              "name": "游戏标题",
              "content": "大号科幻字体标题文字反重力竞速，居中展示于深空背景上，带淡蓝色描边发光效果"
            },
            {
              "name": "开始加速按钮",
              "content": "长条形橙蓝渐变按钮，文字为开始加速，点击后触发推进器点火动效并淡出开始界面"
            },
            {
              "name": "深空星野背景",
              "content": "纯黑背景上散布细小星点，缓慢闪烁漂移，营造无垠太空氛围"
            }
          ]
        },
        {
          "name": "3D游戏视口",
          "components": [
            {
              "name": "WebGL主画布",
              "content": "渲染画布占据整个视口，渲染完整3D反重力赛车场景"
            },
            {
              "name": "深空背景层",
              "content": "漆黑太空背景搭配繁星粒子，作为场景最底层视觉基底"
            },
            {
              "name": "弧形悬浮轨道",
              "content": "深色磨砂金属材质轨道，呈弧形弯道延伸，表面绘制白色前进方向箭头"
            },
            {
              "name": "霓虹栏杆灯带",
              "content": "轨道两侧低矮栏杆，镶嵌水蓝色LED光带，随弯道走向勾勒空间纵深"
            },
            {
              "name": "反重力赛车模型",
              "content": "白橙配色流线型车身，底部两枚悬浮推进器，响应键盘输入进行加速与转向"
            },
            {
              "name": "推进器能量光带",
              "content": "车身底部推进器喷射淡蓝色能量光效，随加速强度增强亮度与长度"
            },
            {
              "name": "速度拖影线",
              "content": "车身尾部生成白色速度线粒子，高速时线条拉长增多，低速时消散"
            },
            {
              "name": "惯性跟随摄像机",
              "content": "透视摄像机跟随赛车，过弯时随车身侧倾摇晃，加速时轻微拉远模拟推背感"
            }
          ]
        },
        {
          "name": "极简游戏HUD层",
          "components": [
            {
              "name": "速度指示",
              "content": "赛道顶端居中偏左，极小号英文字体显示实时速度数值"
            },
            {
              "name": "挡位指示",
              "content": "赛道顶端居中偏右，极小号英文字体显示当前挡位"
            }
          ]
        },
        {
          "name": "作者信息水印",
          "components": [
            {
              "name": "水印文字",
              "content": "屏幕角落半透明小字，显示反重力竞速 · 作者称25分钟"
            }
          ]
        }
      ]
    }
  ]
}
V2
Build an immersive Anti-Gravity Racing game whose visual soul is a cold, futuristic space aesthetic. The backdrop must be a deep, pitch-black expanse of outer space, scattered with countless stars to evoke the solitude and vastness of the cosmos. The player's vehicle is a streamlined anti-gravity racer with a white-and-orange color scheme. Hovering thrusters are mounted on both sides of the chassis. During turns, the vehicle should visibly lean and press into the corner, while the thrusters emit pale blue energy trails. White speed streaks extend from the rear of the vehicle, making the sensation of extreme velocity tangible. The track consists of curved floating roadways suspended in space, lined on both sides with aqua-blue neon guardrail lights that emphasize the depth and flow of each turn. The track surface should use a dark matte metallic material, marked with white directional arrows that guide the racing line. The UI should remain extremely minimal, reserving only a small speed and gear indicator near the top of the screen, leaving the visual focus entirely on the vehicle and the track itself. The overall color palette should contrast cold blue lighting, deep black space, and blazing orange thruster highlights. Combined with camera inertia, subtle screen shake, and motion blur effects, the experience should convey an overwhelming sense of speed and momentum.

Major pages and components include:
- Start Screen (game title and Start Acceleration button)
- Main 3D Gameplay Viewport (deep-space starfield background, curved floating track, metallic surface with directional arrows, neon guardrail light strips, anti-gravity racing vehicle, thruster energy trails, speed streak effects). The flash can not 
- Minimal In-Game HUD (speed indicator and gear indicator)
- Author Watermark ("Anti-Gravity Racing · Built by Author in 25 Minutes")
- Camera Inertia Feedback (cornering tilt, acceleration motion blur)
- At least four rivals compete with the player.
The entire experience should use a full-screen immersive layout with no unnecessary UI obstructions. The visual style should be cold, sharp, and high-contrast, enhanced with subtle energy bloom and motion-blur post-processing effects.
Frontend plan:
{
  "pages": [
    {
      "name": "Main Game Page",
      "route": "/",
      "sections": [
        {
          "name": "Start Screen",
          "components": [
            {
              "name": "Game Title",
              "content": "Large sci-fi styled title text 'Anti-Gravity Racing', centered against the deep-space background with a soft blue glowing outline effect"
            },
            {
              "name": "Start Acceleration Button",
              "content": "Elongated orange-blue gradient button labeled 'Start Acceleration'; clicking triggers a thruster ignition animation and fades out the start screen"
            },
            {
              "name": "Deep-Space Starfield Background",
              "content": "Pure black background populated with tiny stars that slowly twinkle and drift, creating an atmosphere of endless outer space"
            }
          ]
        },
        {
          "name": "3D Gameplay Viewport",
          "components": [
            {
              "name": "WebGL Main Canvas",
              "content": "Rendering canvas occupies the entire viewport and displays the complete 3D anti-gravity racing environment"
            },
            {
              "name": "Deep-Space Background Layer",
              "content": "Pitch-black space backdrop combined with star particles, serving as the foundational visual layer of the scene"
            },
            {
              "name": "Curved Floating Track",
              "content": "Dark matte-metallic track extending through sweeping curved turns, with white directional arrows painted on the surface"
            },
            {
              "name": "Neon Guardrail Light Strips",
              "content": "Low-profile guardrails on both sides of the track embedded with aqua-blue LED light strips that emphasize the depth and flow of the track"
            },
            {
              "name": "Anti-Gravity Racing Vehicle",
              "content": "Streamlined white-and-orange vehicle body with dual hovering thrusters underneath, responding to keyboard input for acceleration and steering"
            },
            {
              "name": "Thruster Energy Trails",
              "content": "Pale blue energy effects emitted from the vehicle's thrusters; brightness and trail length increase with acceleration intensity"
            },
            {
              "name": "Speed Streak Effects",
              "content": "White speed-line particles generated behind the vehicle; streaks become longer and denser at high speeds and dissipate at low speeds"
            },
            {
              "name": "Inertial Follow Camera",
              "content": "Perspective camera follows the vehicle, tilting with the chassis during turns and subtly pulling back during acceleration to simulate forward thrust"
            }
          ]
        },
        {
          "name": "Minimal HUD Layer",
          "components": [
            {
              "name": "Speed Indicator",
              "content": "Positioned slightly left of center at the top of the screen, displaying real-time speed values using a tiny minimalist English font"
            },
            {
              "name": "Gear Indicator",
              "content": "Positioned slightly right of center at the top of the screen, displaying the current gear using a tiny minimalist English font"
            }
          ]
        },
        {
          "name": "Author Watermark",
          "components": [
            {
              "name": "Watermark Text",
              "content": "Small semi-transparent text in a screen corner displaying 'Anti-Gravity Racing · Built by Author in 25 Minutes'"
            }
          ]
        }
      ]
    }
  ]
}
V3
Build the following frontend project: Anti-Gravity Racing Demo Showcase Page.
Create a single-page showcase interface for a futuristic anti-gravity racing game, targeting gaming enthusiasts and creator communities. At the top of the page, include a horizontal metadata bar featuring an orange-highlighted series index tag on the left and the brand name on the right. The centerpiece is a full-width hero section displaying either a static screenshot or a looping muted video of a racing vehicle leaning aggressively through a high-speed turn. Overlay the scene with cool-blue thruster glow effects, animated horizontal speed trails, and neon track lines. At the very top of the image, display tiny English HUD-style speed and gear indicators.
Below the hero section, arrange the content vertically in the following order: an oversized Chinese headline, a row of colorful content tags, a descriptive text block with a vertical orange accent line on the left, and a footer containing the author credit and production time information.
The entire experience should use a fixed deep-space black background. Restrict the visual palette to electric orange and icy blue as the two primary accent colors. Avoid unnecessary decorative elements. Each section should enter with a brief fade-and-slide animation that feels fast and precise.
The design language centers on deep-space black, with the main content consisting of:
- A full-width hero section showcasing a white-and-orange anti-gravity racing vehicle speeding through a curved floating track, presented as either a screenshot or looping video.
- Cool-blue propulsion light trails beneath the vehicle.
- White animated speed streaks extending behind the vehicle.
- A minimal HUD overlay displaying speed and gear information.
- A metadata header containing an orange-highlighted progress number and project branding.
- A large Chinese headline section.
- A descriptive content section featuring a vertical orange accent bar.
- A footer displaying author attribution and production duration.
The overall color palette should rely on a high-contrast combination of:
- Deep Space Black
- Electric Orange
- Icy Blue
Typography should primarily use bold sans-serif Chinese fonts with dramatic hierarchy and strong scale differences between headings and supporting text. Motion should remain restrained, clean, and speed-oriented.
Frontend Plan
{   "pages": [     {       "id": "demo-showcase",       "name": "Anti-Gravity Racing Demo Showcase (Single Page)",       "sections": [         {           "id": "meta-header",           "name": "Metadata Header Bar",           "components": [             {               "name": "Series Index Tag",               "description": "Large orange-highlighted numerical label on the left in the format 'Current / Total' (e.g., 37 / 88), using bold typography to emphasize the content's position within the series."             },             {               "name": "Brand Name",               "description": "Small, light-colored text on the right displaying the project or channel brand."             }           ]         },         {           "id": "hero",           "name": "Hero Section · Full-Width Racing Showcase",           "components": [             {               "name": "Primary Racing Visual Container",               "description": "A full-width 16:9 or wider container displaying a racing vehicle banking through a turn. Prefer a muted autoplay looping video, with a static image as fallback."             },             {               "name": "Cool-Blue Thruster Glow",               "description": "Blurred icy-blue lighting effects positioned beneath both sides of the vehicle to simulate anti-gravity propulsion energy."             },             {               "name": "Animated Speed Trails",               "description": "Thin white lines extending horizontally behind the vehicle, animated with continuous lateral motion to convey extreme speed."             },             {               "name": "Neon LED Track Lines",               "description": "Ultra-thin icy-blue illuminated lines running along both sides of the track and following perspective lines to reinforce spatial depth."             },             {               "name": "Track Surface Texture",               "description": "Dark matte metallic racing surface with white directional arrow markings indicating forward motion."             },             {               "name": "HUD Speed & Gear Overlay",               "description": "Tiny English numerical indicators aligned at the top-right or top-center displaying speed (km/h) and gear information in white or light gray, without obstructing the main visual."             }           ]         },         {           "id": "title-block",           "name": "Headline Section",           "components": [             {               "name": "Main Headline",               "description": "Massive bold white Chinese title reading '反重力竞速' (Anti-Gravity Racing), positioned directly beneath the hero section and left-aligned."             },             {               "name": "Tag Row",               "description": "Small colorful tags in icy blue or electric orange indicating content type and key themes."             }           ]         },         {           "id": "body-content",           "name": "Description Section",           "components": [             {               "name": "Vertical Accent Bar",               "description": "Approximately 4px-wide electric-orange vertical line placed on the left side of the text block to guide visual flow."             },             {               "name": "Body Paragraph",               "description": "Left-aligned Chinese descriptive text introducing the demo, vehicle design highlights, visual direction, and production background. Medium-sized typography with generous line spacing."             }           ]         },         {           "id": "footer",           "name": "Footer",           "components": [             {               "name": "Author Credit",               "description": "Small text on the left displaying the creator's name."             },             {               "name": "Production Time & Secondary Tags",               "description": "Small text on the right showing estimated production time (approximately 25 minutes) along with secondary category labels."             }           ]         }       ]     }   ] }
V4
Please create a purely frontend, full-screen immersive sci-fi anti-gravity racing visual demo HTML page. The core experience is a sense of overwhelming scale: through inertial camera work, the scene automatically alternates between close-ups of the vehicle body (twin levitation thrusters emitting cold blue light bands, sand-gold body in a tilted stance) and panoramic views of a brutalist monolithic track (dark frosted metal ground, geometric rune directional engravings, ultra-thin cold blue LED railing lines on both sides, sparse and solemn starfield), creating an oppressive contrast between the tiny race car and the colossal track. A single line of minimalist monospaced HUD text is fixed at the top of the page, displaying only speed and gear values, updated in a frame-stepped jumping manner. The full-screen canvas simultaneously overlays white speed-line radial motion trails and a cold blue thruster light pulse breathing animation. The overall visual language carries the quality of an epic monument: deep space black background, muted sand-gold as the primary color, spice cold blue as the accent color, with rounded-corner cards, candy gradients, and bouncy animations strictly excluded.

Frontend plan:
{
  "pages": [
    {
      "name": "Main Demo Full-Screen Page",
      "route": "/",
      "sections": [
        {
          "name": "Top HUD Information Bar",
          "description": "A single-line information bar fixed at the top of the page, with an extremely low-opacity deep black mask background. The left side displays the speed reading, and the right side displays the gear reading, with a large amount of blank character spacing in between to create a sense of tension.",
          "components": [
            {
              "name": "Speed Reading Component",
              "description": "Displays a format such as '847 KM/H', in extremely small all-caps sand-gold monospaced text. The value updates in a frame-stepped jumping manner, simulating the style of a mechanical engraved counter, with no transition animation."
            },
            {
              "name": "Gear Reading Component",
              "description": "Displays a format such as 'GEAR IV', styled identically to the speed reading, right-aligned, with no icons and no divider lines."
            }
          ]
        },
        {
          "name": "Full-Screen 3D-Rendered Main Canvas",
          "description": "An immersive rendering area that fills the entire viewport, carrying all dynamic visual content, including two automatically alternating camera perspectives.",
          "components": [
            {
              "name": "Vehicle Close-Up Perspective",
              "description": "Shows details of the spice-blue light bands emitted by the thrusters, the metallic texture of the sand-gold paint, and the tilted stance of the race car. The camera accelerates away from this perspective using an ease-in cubic curve."
            },
            {
              "name": "Track Panorama Perspective",
              "description": "Presented in top-down or side view as a brutalist monolithic rectangular structure, with a dark frosted metal ground engraved with geometric rune arrows, and ultra-thin cold blue LED railing lines on both sides extending into the distance. The camera decelerates into this perspective using an ease-out cubic curve."
            },
            {
              "name": "Speed Line Overlay",
              "description": "Ultra-thin white lines radiate outward from the center of the screen as motion trails, with extremely low opacity. Density and length adjust dynamically with the simulated vehicle speed value, linearly and without bouncing."
            },
            {
              "name": "Thruster Glow Animation",
              "description": "The cold blue light bands of the race car's twin thrusters loop through a sine-wave brightness pulse, with a slight Gaussian blur halo at the edges. High-frequency flickering or jitter is strictly forbidden."
            },
            {
              "name": "Ground Rune Arrows",
              "description": "Directional guide runes composed purely of straight lines in a geometric totem style, in an extremely low-brightness sand-gold engraved color, with recessed shadow to convey an incised texture, completely static with no animation whatsoever."
            },
            {
              "name": "Track Railing LED Lines",
              "description": "Ultra-thin cold blue lines on both sides of the track, with a glowing projection effect, outlining the spatial contour of the curves."
            },
            {
              "name": "Starfield Background Layer",
              "description": "Statically distributed star points on a deep-space black base color, with randomized opacity distribution, no meteors and no nebulae, maintaining a solemn and solitary atmosphere."
            }
          ]
        }
      ]
    }
  ],
  "sharedComponents": [
    {
      "name": "Inertial Camera Switch Controller",
      "description": "Manages the switching timing between the two camera perspectives, using cubic ease-in and ease-out curves to simulate physical inertia, with an overall switch duration of approximately 1.2 to 1.8 seconds."
    },
    {
      "name": "Speed Simulation Driver",
      "description": "Generates simulated vehicle speed values, driving linked effects such as HUD reading jumps and speed line density changes."
    }
  ]
}

V5 (Show)
任务：沉浸式反重力竞速游戏

开发一款运行于浏览器端、打开即玩的纯前端 3D 反重力赛车游戏，以太空竞速为主题，融合冷色调科幻美学与高速推进视觉效果，通过 WebGL 与 Three.js 渲染。

视觉灵魂与场景：冷冽太空科幻风，背景为深邃漆黑的太空与点点繁星（缓慢闪烁漂移），营造无垠深空的孤寂感。赛车是一辆流线型白/橙配色反重力座驾，车身两侧（底部）悬浮推进器，过弯时车身明显倾斜侧压，推进器喷射淡蓝色能量光带，尾部拖曳出雪白色速度线，将高速感具象化。赛道为弧形悬浮轨道，两侧低矮栏杆镶嵌水蓝色霓虹灯带，随弯道走向勾勒空间纵深；轨道地面为深色磨砂金属材质，表面绘有指向前进方向的白色箭头引导线。

核心表现：整体色调以冷蓝、暗黑太空与炽橙推进器形成强烈反差；镜头带惯性摇晃与拖影效果——透视摄像机跟随赛车，过弯时随车身侧倾摇晃，加速时轻微拉远模拟推背感，配合轻微能量光晕与运动模糊后处理，让人感受到扑面而来的速度冲击。

界面与流程：全屏沉浸式布局，无多余 UI 遮挡。开始界面于深空星野背景上居中展示大号科幻字体标题「反重力竞速」（淡蓝色描边发光），下方为长条形橙蓝渐变「开始加速」按钮，点击后触发推进器点火动效并淡出开始界面。游戏内 HUD 极简克制，仅在赛道顶端留一小块指示：居中偏左以极小号英文字体显示实时速度数值，居中偏右显示当前挡位，把视觉焦点完全留给赛车与轨道本身。屏幕角落保留半透明小字水印「反重力竞速 · 作者称25分钟」。整体视觉风格冷峻锐利、对比强烈。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/4facdb86-a8f0-4157-abff-d21ddaf2a573/artifact/index.html
[Image]
[Image]


Demo 9 个人工具——月海探测器
V1 (Show)
任务：东方神话月球车探索控制台

开发一款运行于浏览器、全屏单页的纯前端 3D 月球车探索控制台。页面以中央 3D 月面场景为唯一背景层，渲染灰沙地形、陨石坑与岩石，并展示巡视车行驶其中；镜头默认采用第三人称跟随视角，支持环绕镜头切换（跟随/侧视/俯视/正面），切换时带平滑补间，摄像机大幅运动时全部 HUD 整体淡出、镜头停稳后淡入。

HUD 由四个叠加于 3D 视口之上的区域构成：左上角任务目标面板（任务阶段标题与子目标列表，当前项高亮、已完成项淡显）；底部全宽诊断数据条，内含圆形速度表盘（外环细刻度、金色指针平滑插值、中心金色符文数值）、电量/热量/车轮载荷/打滑率数值区、以及自底部滑入的滚动告警日志（关键词橙红高亮、仅保留最近若干条）；右上角罗盘式雷达地图（外圈为汉字方位＋刻度的罗盘环并缓速自转，内圈为冷青色地形点阵并标记本车位置）；右下角样本清单面板（金色符文线描图标＋名称＋数量）。所有面板均可点击展开／收起详情，带高度过渡动画。

整体视觉为东方神话美学：极深黑曜石半透明底板、矩形斜切角、边框刻缠龙与流云 SVG 细纹并以暗金微光区隔模块，全部数值采用发光金色符文描边样式，雷达外圈为方位罗盘刻度环。当电量降至阈值（≤20%）时，全局边框触发橙红火焰循环动效，相关数值同步橙红闪烁。界面需密实紧凑，无空旷留白。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/67009240-d2db-42b1-b27f-7e4f2c12c14e/artifact/index.html
[Image]

Demo 10 游戏——钢铁防线FPS
V1 (Show)
开发一款可直接在浏览器中打开即玩、无需下载或安装任何插件的纯前端第一人称 3D 射击游戏，基于 WebGL 渲染，致敬经典军事 FPS 的紧张对枪手感。

核心玩法与主页面：全屏 3D 工业军事场景，玩家以鼠标锁定视角瞄准射击、键盘 WASD 移动，支持双武器切换、ADS 精准瞄准与换弹夹，具备完整命中判定（含爆头特殊反馈）。游戏主页面包含：

- 3D 视口层：WebGL 全屏 Canvas，低多边形工业军事场景、鼠标控制的玩家摄像机、敌人角色模型与第一人称手持武器模型。
- 战术 HUD：顶部水平罗盘方向条（N/E/S/W 刻度）；中央准星（髋射为四段短线加中心点，ADS 时替换为瞄具图形）；底部左侧显示得分、击杀数与移动状态标签（冲刺/就绪/蹲伏）；底部右侧显示弹夹与备弹数字及当前武器名称标签。
- 特效覆盖层：受击时全屏红色晕影、命中浮字（分值＋部位标签，向上漂移淡出，爆头提示尤为醒目）、狙击镜圆形遮罩（圆形视窗＋十字分划线）。
  
界面流程：主菜单页（模糊场景背景＋暗色遮罩、游戏大标题与副标题/版本号、开始/设置/全屏或退出按钮，按钮 hover 带左侧橙色高亮条动效）；加载页（Logo、细线条进度条、百分比数字、当前资源名称，完成后淡出过渡）；暂停菜单（半透明暗色全屏遮罩＋居中选项卡片：继续游戏、设置、返回主菜单）；死亡界面（画面灰度模糊过渡，暗红「YOU DIED」大字渐显，展示本局得分与击杀数，提供重新开始与返回主菜单）；设置面板（鼠标灵敏度滑块与键位对照表、主/音效/音乐音量滑块、低中高画质等级与分辨率选项）。

视觉风格：压抑暗色军事废土美学，低多边形工业场景，去饱和大地色系配阴云漫射光照；全局复用全屏切换按钮、返回按钮、hover 橙色高亮菜单按钮、半透明暗色卡片容器、细线条进度条、自定义滑块与状态标签徽章等通用组件，整体氛围紧张刺激。

前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/66afc941-b8c3-40bd-b4d7-c5a0fbf7f4c5/artifact/index.html
[Image]

[Image]

[Image]

Demo 11 个人工具——太阳系探索教学界面
V1 (Show)
实现一款单页太阳系交互式百科前端应用，叫做“太阳系复古探索仪”，视觉主题为复古科教片与早期电子星图风格，营造八九十年代科技馆星球展示柜的怀旧感。所有数据静态硬编码，无需任何后端接口。

三大核心区域
左侧星球导航列表：展示太阳及八大行星共 9 个天体，每项含序号＋中文名大字＋英文名小字＋小圆形色块。选中状态为铬金属边框高亮＋深色凹陷；悬停时边框亮度立即跳变（无过渡，模拟接触式开关）并显示像素风光标指示符；面板带铬金属斜切边框装饰。点击切换天体。

中央 3D 星球展示视口：以 CRT 屏幕外框（圆角矩形＋扫描线叠加层＋暗角）呈现星球 3D 模型，支持拖拽旋转、松手缓慢回弹、持续 y 轴自转；背景为像素星点层，环绕点阵虚线轨道圈（，灰白色），卫星小球沿轨道匀速公转并轻微抖动。切换星球时旧球缩小淡出、新球放大淡入（约 300ms），并触发短促老式电子哔声。

右侧行星资料卡：展示天体中文名大字（老式衬线字体）＋英文名小字，以点阵虚线分隔；数据字段包括直径／质量／公转周期／自转周期／平均温度／已知卫星数，字段名左对齐粗体、数值右对齐等宽字体，切换时全部字段以打字机效果逐字刷新；简介段落（2–4 行）同样打字机效果。下方为复古仪表进度条组（大气层密度／表面重力／探测完成度），切换时从零重新线性填充；再下方为历史探测任务列表（每体 2–3 条旧报告条目风格：任务名＋年份＋一行简述）。面板采用纸张纹理背景＋铬金属斜切边框。

顶部标题栏与全局视觉
顶部标题栏含应用名称双语标志「太阳系探索仪 / SOLAR SYSTEM EXPLORER」、年份角标「© 198X」、像素电子电源指示灯（绿色，约 2s 周期缓慢闪烁）、复古拨动样式音效开关（默认开启）与轨道线显示开关。全局视觉要求：深宇宙蓝底色、CRT 水平扫描线叠加、底色颗粒噪点纹理、铬金属渐变斜切边框、点阵虚线轨道圈、老式衬线字体搭配等宽数字字体、凹陷物理按键效果。

交互细节与工具
卫星悬停显示复古样式 tooltip（深底色浮层＋等宽字体＋复古双线边框，显示卫星名、轨道半径与公转周期）。静态数据包含 9 个天体的完整介绍（所有字段数值、简介文字、历史任务）、星球贴图资源与进度条目标值。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/9ff4d0ee-4c56-46ea-9953-88f308968b4d/artifact/index.html

[Image]

Demo 12 设计与布局——网页音乐播放器
V1 （Show）
任务：粗野主义风格 3D 音乐播放器
构建一款以粗野主义为核心美学的纯前端 3D 音乐播放器单页 Web 应用，由四个视图构成。视觉风格严格遵循粗野主义原则：拒绝一切精修装饰——无圆角、无投影、无玻璃拟态、无渐变；纯黑背景、等宽字体、硬线边框划定所有区块、单一高饱和强调色用于选中与进度高亮、进度条为直线加实心方块标记、控制按钮为裸文字加边框盒。三维渲染使用线框描边材质，完全禁用后处理特效与一切柔化效果。所有视图之间切换为瞬时跳转，没有任何过渡或动画。

视图一：3D 线框主视图
使用 Three.js 渲染中央可拖拽旋转的三维几何体，各面挂载专辑文字标签或去饱和封面图；鼠标拖拽驱动线性 Y 轴旋转、无惯性，无操作时匀速自转。左上角固定大号粗体等宽标题「BRUTAL PLAYER」，无任何装饰；右下角贴边以硬线边框框定当前歌名与时长，等宽大号数字。底部常驻全局进度条：细实线横贯全宽，未播放段骨白、已播放段强调色，当前位置为实心小方块，点击可跳转进度。点击几何体进入库视图。

视图二：分屏库视图
右上角为「[← BACK]」等宽文字按钮（硬线边框），点击瞬切回 3D 主视图。左侧为等宽字体竖向专辑列表，格式为序号＋专辑名＋年份，选中行呈强调色反色块（强调色背景＋黑字），列表即时跳格滚动、无平滑滚动，支持键盘上下键导航。中部为骨白竖向硬实线，垂直分隔左右两列。右侧为播放器面板：顶部超大号等宽歌名（可换行），下方直线进度条加实心方块标记，再下方为等宽文字播放按钮组（每个按钮独立硬线边框盒、背景透明、悬停瞬切强调色反色），底部显示时间码。

视图三：全屏详情覆层
顶部标题行左侧为大号等宽专辑名加年份，右侧为关闭按钮，两者间以横线分隔。左列为曲目列表：等宽编号对齐，当前播放行强调色反色高亮，点击即时切换曲目，底部可选视频播放入口文字按钮。右列为歌词区：等宽字体，与播放进度同步逐行高亮（强调色），手动滚动为即时跳格、无平滑动画。底部为固定播放控制条，顶线分隔，从左到右依次为曲名、时间码、直线进度条、上下曲与播放暂停等宽文字按钮组、ASCII 块字符音量指示。

视图四：全屏视频播放视图
黑底满屏，视频保持比例居中、两侧填黑，无任何叠加覆层或渐变。控制条按需显现：鼠标移动时即时出现（无淡入），为纯黑实色条带＋直线进度条＋等宽文字播放状态与时间码；短暂无操作后即时消失（无淡出）。右上角固定等宽文字退出按钮（硬线边框），点击瞬切回详情覆层并恢复之前进度。

全局组件与规范
- 等宽文字按钮：等宽字体＋硬实线边框盒，背景透明；悬停时背景瞬切强调色、文字瞬切黑色；无圆角、无阴影、无过渡动画。
- 直线进度条＋方块标记：细高实线，未播放骨白、已播放强调色，实心小方块标记当前位置，无圆角。
- Three.js 线框渲染器：EdgesGeometry 或 wireframe 模式，MeshBasicMaterial，线性旋转插值，禁用后处理，旋转由鼠标拖拽事件驱动。
- 自定义极细滚动条：极窄轨道线＋同宽滑块，骨白色，无圆角。
- 硬实线分隔器：骨白硬实线，用于划定所有区块边界，替代任何卡片或投影方案。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/3c26ca11-4ce9-4379-956c-563b66c50359/artifact/index.html

[Image]
[Image]

Demo 13 设计与布局——四缸发动机
V1 （Show）
创建在浏览器里模拟四缸发动机运行的项目。使用 《蜘蛛侠：平行宇宙》— 漫画大爆炸 的视觉风格：活力、年轻、图形感、反叛。漫画原色与激进对比。
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/3d3550b9-4fc9-45b3-998a-6753158bae41/artifact/index.html
/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/3d3550b9-4fc9-45b3-998a-6753158bae41/artifact/index_en.html

[Image]

This content is only supported in a Feishu Docs

Demo 14 科学——孪生素数可视化
V1 （Show）
中文宣发描述：
我们让模型挑战一个最近的热门任务：计算 1000 万以内的“孪生素数”（相差 2 的素数对，如 3 和 5、11 和 13），并用 Three.js 把它们沿阿基米德螺线摆成一片 3D 星空；还要支持缩放、点选、区间过滤和视角切换。整体呈现莫奈《睡莲》——印象派薄雾，画面宁静、有机、冥想、精致，主要采用低对比度绿、薰衣草与水粉色，每颗星颜色各不相同。螺线自动旋转，星星零星闪烁，让整个场景鲜活生动；用户还能像宇航员一样在星空中漫游，探索每一颗星——一个把数论、算法与印象派美学揉在一起的前端产物就这样被造出来了。

英文任务：
Calculate the "twin primes" within 10 million (pairs of primes that differ by 2, such as 3 and 5, 11 and 13), and arrange them into a 3D starry sky along an Archimedean spiral using Three.js Canvas/WebGL; it should also support zooming, click selection, interval filtering, and viewpoint switching.
The overall presentation should evoke Monet's Water Lilies — an Impressionist mist, making the image look very serene, organic, meditative, and delicate. Mainly use low-contrast green, lavender, and water pink. Each star has different color. Make the spiral rotate automatically and make stars shine sporadically so the scene will look vivid and alive! I can wander in the space like an astronaut to explore every star!
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/ee6615f6-7780-4ef0-b6e6-ebc337f3f115/artifact/index.html
[Image]

This content is only supported in a Feishu Docs

Demo 15 科学-三体问题模拟
V1 (Show)
中文宣发描述：数值求解三体问题运动方程（10 万步以内），用 Three.js 把三条轨道渲染成发光的金色丝线，支持缩放、点选查看天体质量与速度、区间过滤和视角切换，整体呈现金色装饰主义，华丽、亲密、璀璨了。

英文任务：Numerically solve the equations of motion for the three-body problem (within 100,000 steps), and use Three.js to render the three orbits as glowing silk threads; it should also support zooming, click selection to view the masses and velocities of the celestial bodies, interval filtering, and viewpoint switching. The overall presentation should evoke Klimt's The Kiss — golden decorative style, with a gorgeous, intimate, and dazzling image. Mainly use low-contrast gold, ochre, and dark brown.
前端项目路径：/volume/pt-coder/users/gji/projects/frontend_verif_system/scripts/visualization/realtime_arena/workspaces/aec00d4e-46c1-45c6-9650-51eeddbc9508/artifact/index.html
[Image]
This content is only supported in a Feishu Docs
