# FastImage AI 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

**一个基于开源项目重构的现代化AI图像生成平台。** 本项目对原架构进行了大量简化与重写，专注于提供稳定、快速且功能完整的文本生图与图生图体验，并通过内网穿透实现便捷的公网访问。

> **📢 项目来源声明**
> 本项目是基于开源项目 **[Dreamify](https://github.com/LastLighter/Dreamifly)** 的功能与界面进行的**二次开发与重构版本**。核心前端界面与用户流程灵感来源于此，但**后端架构、API实现与部署方案已完全重写**。

---

## ✨ 项目特色与主要变更

与原项目相比，本版本的核心变更与特色如下：

*   **🛠️ 简化的后端架构**：完全移除了原项目的 **Docker** 与 **PostgreSQL** 依赖。数据采用轻量级方案处理，部署和运行更为简单。
*   **🎨 自主的AI生成引擎**：弃用原项目的 **ComfyUI**，后端接入自主部署的 **Stable Diffusion WebUI API**，实现了对图像生成过程的完全控制。
*   **🌐 创新的部署方式**：服务器运行于个人电脑，通过 **Cloudflare Tunnel** 实现安全、稳定的内网穿透与公网访问，无需公网IP或复杂配置。
*   **🔧 完整的核心功能**：完整实现了 **文生图、图生图、提示词优化、社区作品展示** 等核心功能，确保用户体验不受架构简化的影响。

---

## 🧩 核心功能

-   **🤖 AI图像生成**：基于 Stable Diffusion 模型，支持通过文本描述生成高质量图像。
-   **🖼️ 风格转换**：上传图片并输入提示词，实现智能的风格转换与增强。
-   **💡 提示词优化**：内置提示词优化工具，帮助你生成更精准、效果更好的描述。
-   **🏛️ 社区画廊**：浏览其他用户生成的精彩作品，激发创作灵感。
-   **🌍 国际化**：支持多语言界面，方便不同地区的用户使用。

---

## 🏗️ 项目结构(与原项目保持一致)
```bash
Dreamify/
├── src/
│   ├── app/
│   │   ├── [locale]/              # 国际化路由
│   │   │   ├── layout.tsx         # 本地化布局
│   │   │   ├── page.tsx           # 主页
│   │   │   ├── HomeClient.tsx     # 主页客户端组件
│   │   │   └── communityWorks.ts  # 社区作品数据
│   │   ├── api/                   # API 路由
│   │   │   ├── generate/route.ts  # 图像生成 API
│   │   │   ├── models/route.ts    # 模型列表 API
│   │   │   ├── upload/route.ts    # 文件上传 API
│   │   │   ├── optimize-prompt/route.ts # 提示词优化 API
│   │   │   └── stats/route.ts     # 统计数据 API
│   │   ├── layout.tsx             # 根布局
│   │   ├── page.tsx               # 根页面
│   │   └── globals.css            # 全局样式
│   ├── components/                 # 可复用组件
│   │   ├── GenerateForm.tsx       # 生成表单
│   │   ├── GeneratePreview.tsx    # 预览组件
│   │   ├── GenerateSection.tsx    # 生成区域
│   │   ├── PromptInput.tsx        # 提示词输入
│   │   ├── StyleTransferForm.tsx  # 风格转换表单
│   │   ├── TabNavigation.tsx      # 标签导航
│   │   ├── SiteStats.tsx          # 站点统计
│   │   └── ...
│   ├── db/                        # 数据库相关
│   │   ├── index.ts               # 数据库连接
│   │   └── schema.ts              # 数据模型
│   ├── hooks/                     # 自定义 Hooks
│   │   └── useNavWidth.ts         # 导航宽度 Hook
│   ├── utils/                     # 工具函数
│   │   ├── comfyApi.ts            # ComfyUI API 客户端
│   │   ├── modelConfig.ts         # 模型配置
│   │   ├── promptOptimizer.ts     # 提示词优化
│   │   ├── t2iworkflow.ts         # 文生图工作流
│   │   ├── i2iworkflow.ts         # 图生图工作流
│   │   └── locale.ts              # 本地化工具
│   ├── messages/                  # 国际化语言包
│   │   ├── en.json               # 英文
│   │   ├── zh.json               # 中文
│   │   └── zh-TW.json            # 繁体中文
│   ├── config.ts                  # 配置文件
│   └── i18n.ts                   # 国际化配置
├── drizzle/                       # 数据库迁移文件
├── public/                        # 静态资源
├── scripts/                       # 脚本文件
├── .env.example                   # 环境变量示例
├── drizzle.config.json            # Drizzle 配置
├── next.config.js                 # Next.js 配置
├── package.json                   # 项目依赖
└── README.md                      # 项目文档
```


## 🚀 如何快速开始

### 前置条件
1.  **Node.js** (推荐 18.x 或更高版本)
2.  一个已启动并可远程访问的 **Stable Diffusion WebUI API** 服务。
3.  (可选) 一个 **Cloudflare** 账户，用于配置 Tunnel 公网访问。

### 安装与运行
1.  **克隆项目**
    ```bash
    git clone https://github.com/blackbox233/FastImage-AI.git
    cd FastImage-AI
    ```

2.  **安装依赖**
    ```bash
    npm install
    # 或使用 yarn / pnpm
    ```

3.  **配置环境**
    复制 `.env.example` 文件为 `.env.local`，并填入你的 WebUI API 地址等信息：
    ```bash
    cp .env.example .env.local
    ```
    ```env
    # 你的 Stable Diffusion WebUI API 基础地址
    NEXT_PUBLIC_WEBUI_API_URL=http://your-webui-server-address:7860

    # 其他配置...
    ```

4.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    访问 [http://localhost:3000](http://localhost:3000) 即可。

### 🌍 公网部署（通过 Cloudflare Tunnel）
1.  在 Cloudflare Zero Trust 面板中创建 Tunnel。
2.  在本地服务器上运行 Tunnel 连接器（Cloudflared）。
3.  配置 Tunnel，将流量指向本地的 `http://localhost:3000`。
4.  通过 Cloudflare 提供的公共域名即可从任何地方访问你的应用。

---

## 📄 开源协议与致谢

*   本项目根据 **MIT 协议** 开源。
*   特别感谢原开源项目 **[Dreamify](https://github.com/LastLighter/Dreamifly)** 的作者，其优秀的前端设计为本项目提供了坚实的基础。
*   AI 生成能力由 **Stable Diffusion** 系列模型驱动。

---

## 🤝 如何贡献

欢迎提交 Issue 和 Pull Request！对于新功能或重大变更，建议先开 Issue 讨论。

1.  Fork 本项目。
2.  创建你的功能分支 (`git checkout -b feature/AmazingFeature`)。
3.  提交更改 (`git commit -m 'Add some AmazingFeature'`)。
4.  推送到分支 (`git push origin feature/AmazingFeature`)。
5.  开启一个 Pull Request。
