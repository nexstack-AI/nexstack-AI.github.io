# 3D 键盘键帽图标与颜色自定义指南

## 概述

Hero section 的 Spline 3D 键盘支持为每个键帽注入自定义 SVG 图标和颜色。图标渲染为白色剪影，透明背景，键帽自身颜色会透出作为底色。

## 文件结构

```
public/icons-keyboard/   ← 3D 键盘专用的 SVG 图标（29 个技能 × 1 个 SVG）
src/data/constants.ts    ← SKILLS 定义：color、label、name 等
src/components/animated-background.tsx  ← 纹理注入逻辑
```

## 修改键帽图标

### 替换图标

直接替换 `public/icons-keyboard/` 下对应技能的 `.svg` 文件即可，**无需改代码**。

文件名与 `constants.ts` 中 `skill.name` 一致，例如：

| skill.name | 文件 |
|---|---|
| `js` | `public/icons-keyboard/js.svg` |
| `react` | `public/icons-keyboard/react.svg` |
| `taro` | `public/icons-keyboard/taro.svg` |

### 添加新技能图标

1. 将 SVG 文件放入 `public/icons-keyboard/`
2. 文件名 = `skill.name` + `.svg`
3. 重新构建部署

### SVG 设计建议

- 推荐画布 `viewBox="0 0 128 128"`
- 使用 `fill="#ffffff"` 或 `stroke="#ffffff"` — 渲染引擎会自动将其转为白色剪影
- **不要**加 `<rect>` 背景色块 — 背景自动透明
- 图标居中，留适当边距（实际渲染时会缩放至 224×224 区域）

## 修改键帽颜色

编辑 `src/data/constants.ts` 中对应技能的 `color` 字段：

```typescript
[SkillNames.JS]: {
  name: "js",
  label: "JavaScript",
  shortDescription: "精通",
  color: "#ec903a",  // ← 改这里
  icon: "/icons/javascript-original.svg",
},
```

颜色仅用于首页技能展示区域的背景色，**不影响** 3D 键盘上的键帽颜色（键帽颜色由 Spline 场景文件控制）。

## 修改技能展示标签

同一文件中修改 `label` 和 `shortDescription`：

```typescript
label: "JavaScript",           // 技能卡片的标题
shortDescription: "精通",      // 技能卡片的副标题
```

## Spline 场景名映射

部分 `skill.name` 与 Spline 场景内键帽对象名不一致时，在 `animated-background.tsx` 中维护映射：

```typescript
const splineNameMap: Record<string, string> = {
  taro: "vue",     // skill taro → Spline 键帽 "vue"
  canvas: "vim",   // skill canvas → Spline 键帽 "vim"
  webGL: "vercel", // skill webGL → Spline 键帽 "vercel"
};
```

**注意**：如果 Spline 场景中不存在某个键帽对象，对应的技能图标不会显示。目前有 5 个技能无对应键帽：`Three`、`stablediffusion`、`comfyui`、`cursor`、`aitools`。如需在 3D 键盘上展示，需先在 Spline 编辑器中添加对应键帽并重新导出 `.splinecode`。

## 纹理注入原理

1. `splineApp._scene` 获取 Spline 内部 Three.js 场景
2. 遍历 `SKILLS`，通过 `scene.getObjectByName()` 找到键帽 Group
3. 在 Group 内查找名为 `legend` 的 Mesh 子节点
4. 找到该 Mesh 的 `NodeMaterial` 中 `nodeU0` 纹理 uniform
5. 用 Canvas 绘制白色图标 → 替换纹理 `image` → 触发 `needsUpdate`

**关键约束**：
- 只修改已有纹理的 `image` 数据，不创建新 `THREE` 对象
- 不替换 `NodeMaterial`（否则会破坏 Spline 自定义 shader）
- 不上手 `Material.prototype` 或 `onBeforeRender`