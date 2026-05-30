# Oasis Web

Oasis Web 是一个面向酒店/民宿管理场景的前端后台项目，提供仪表盘、预订管理、房型管理、入住办理、用户与个人资料等功能页面。

## 技术栈

- React 19 + TypeScript
- Vite 7
- React Router
- TanStack Query
- Zustand
- Tailwind CSS 4
- Axios

## 主要功能

- 登录与鉴权（`ProtectedRoute` + Zustand）
- 仪表盘（统计卡片、图表、时间过滤）
- 预订管理（列表、详情、办理入住）
- 房型管理（列表与操作）
- 用户与个人资料页面
- 全局错误边界与提示反馈（`react-error-boundary`、`react-toastify`）

## 项目结构

```text
.
├── README.md
├── TODO.md
└── src
    ├── app
    │   ├── api          # API 请求封装
    │   ├── components   # 通用组件与 UI 组件
    │   ├── features     # 业务模块（dashboard/bookings/cabins/authentication 等）
    │   ├── hooks        # 自定义 hooks
    │   ├── pages        # 路由页面
    │   ├── store        # 全局状态（zustand）
    │   ├── App.tsx      # 路由入口
    │   └── main.tsx     # 应用启动入口
    ├── package.json
    └── vite.config.ts
```

## 本地开发

> 前端项目位于 `src` 目录，请在该目录下执行命令。

### 1) 安装依赖

```bash
cd src
npm ci
```

### 2) 配置环境变量

`src/.env` 示例：

```env
VITE_API_BASE_URL=https://localhost:5149
```

> 本项目开发服务器启用了 HTTPS（见 `vite-plugin-mkcert`）。如本地后端未配置证书，可改用 `http://localhost:5149`。

### 3) 启动开发环境

```bash
npm run dev
```

### 4) 代码检查与构建

```bash
npm run lint
npm run build
```

## 关键路由

- `/login`：登录页
- `/dashboard`：仪表盘
- `/bookings`：预订列表
- `/bookings/:id`：预订详情
- `/bookings/:id/checkin`：办理入住
- `/cabins`：房型管理
- `/users`：用户页
- `/profile`：个人资料

## 后端联调说明

- 项目通过 `VITE_API_BASE_URL` 指向后端 API。
- Axios 默认开启 `withCredentials`，请确保后端跨域与 Cookie 策略配置正确。
