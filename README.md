# AI Rating

AI模型终极对战评测系统，基于React和Zustand开发，使用友好的Bento风格UI。

## 主要功能

### 1. 关卡题目/AI管理
 添加/修改/删除/拖拽排序测试题目及AI模型

### 2. 评分系统
- 对多个AI模型进行评分，例如：Gemini 2.5 Pro、Claude 4 Opus、ChatGPT o3、Grok 3
- 每个测试可以给每个模型打1-5分
- 状态保存在本地存储中，刷新页面不会丢失

### 3. 数据可视化
- 显示当前测试进度
- 显示总体评测进度
- 结果页面显示模型排名

### 4. UI特性
- 现代化、友好的Bento风格卡片设计
- 动画效果增强用户体验
- 响应式布局，适配各种设备尺寸

## 技术栈
- React 19
- TypeScript
- Zustand（状态管理）
- @dnd-kit（拖拽排序）
- TailwindCSS（样式）
- FontAwesome（图标）

## 项目结构

```
src/
  components/
    Header/
    CurrentTest/
    AIModels/
    TestGrid/
    ResultsModal/
  store/
    useStore.ts
  routes/
    App.tsx
  main.tsx
  styles.css
  ...
```

## 开发

### 安装依赖
```bash
npm install
```

### 启动开发服务
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 自定义
可添加自己的测试题目，系统将自动计算和跟踪对比各AI模型的表现。

---

 