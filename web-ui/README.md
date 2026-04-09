# Smart CS Web UI

面向 `smart-cs-multi-agent` 的可交付前端工作台（React + TypeScript + Vite）。

## 1. 快速启动

```bash
cd /home/runner/work/smart-cs-multi-agent/smart-cs-multi-agent/web-ui
npm install
npm run dev
```

默认地址：`http://localhost:5173`

## 2. 后端地址配置

通过环境变量配置 API 地址：

```bash
# web-ui/.env.local
VITE_API_BASE_URL=http://localhost:8080
```

- Java 版本默认：`http://localhost:8080`
- Python 版本默认：`http://localhost:8000`
- Go 版本默认：`http://localhost:8080`

前端统一请求：
- `POST /api/chat`
- `GET /api/history/{sessionId}`
- `GET /api/tools`
- `GET /api/metrics`
- 健康检查：优先 `/api/health`，失败回退 `/health`

## 3. 工程结构

```text
src/
  api/                    # API 封装层
  hooks/                  # 业务 hooks（useChat/useToast）
  types/                  # 类型定义
  components/
    pages/                # 页面组件
    business/             # 业务组件
    common/               # 通用组件（Button/Modal/Table 等）
```

## 4. 体验增强

- 合理默认值（默认 user_id、快速问题模板）
- Toast 提示（成功/失败/信息）
- Tooltip 提示（关键操作说明）
- 空状态与 Loading Skeleton
- Error Boundary 兜底
- 浅色 + 可选暗色主题切换

## 5. 可用脚本

```bash
npm run dev
npm run lint
npm run build
npm run preview
```
