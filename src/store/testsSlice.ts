import type { ModelScore, Test } from '../types';

// 初始测试数据
export const initialTests: Array<Test> = [
  // 逻辑推理类
  {
    id: '1',
    icon: "fas fa-puzzle-piece",
    title: "逻辑推理 - 4位代码谜题",
    category: "逻辑推理",
    difficulty: "中等",
    prompt: `这里有一个谜题，目标是确定正确的4位代码。

线索：
9285：一个数字是正确的，但在错误的地方。
1937：两个数字是正确的，但在错误的地方。
5201：有一个数字是正确的，而且放得很好。
7893：没有什么是正确的。
8524：有两个数字是正确的，但是在错误的地方。

请找出正确的4位代码并说明推理过程。`,
    evaluationCriteria: "推理准确性、解题步骤清晰度、逻辑严密性"
  },
 /*  {
    id: '2',
    icon: "fas fa-calculator",
    title: "数学计算 - 24点游戏", 
    category: "数学应用",
    difficulty: "简单",
    prompt: `1 3 9 10怎么得到24 `,
    evaluationCriteria: "计算准确性、解题方法多样性、思路清晰度"
  },
  {
    id: '3',
    icon: "fas fa-chess",
    title: "逻辑谜题 - 骑士巡游问题",
    category: "逻辑推理",
    difficulty: "困难",
    prompt: `解决骑士巡游问题：在国际象棋的8×8棋盘上，让骑士从任意位置出发，访问棋盘上每个格子一次。

请提供：
- 骑士巡游的完整路径
- 你的解题思路
- 解决方案的可视化表示

你能否找出闭合巡回路（最后一步可以回到起点）？`,
    evaluationCriteria: "问题解决能力、算法思维、可视化表达能力、优化能力"
  },

  // 编程创建类
  {
    id: '4',
    icon: "fas fa-gamepad",
    title: "基础编程 - 俄罗斯方块",
    category: "游戏开发",
    difficulty: "中等",
    prompt: `创建一个完整的俄罗斯方块游戏。

需要包含：
- 7种基本方块形状（I、O、T、S、Z、J、L）
- 方块旋转、移动、下落
- 行满消除和计分
- 游戏结束检测
- 下一个方块预览
- 游戏暂停功能
- 难度级别调整

使用HTML、CSS、JavaScript实现。`,
    evaluationCriteria: "代码质量、游戏功能完整性、用户体验、性能优化"
  },
  {
    id: '5',
    icon: "fas fa-dragon",
    title: "RPG游戏开发",
    category: "游戏开发",
    difficulty: "困难",
    prompt: `设计并实现一个简单但功能完整的RPG游戏，包含：

1. 角色系统（至少3种不同职业，各有特色）
2. 战斗系统（回合制，包括物理和魔法攻击）
3. 物品系统（装备、消耗品、宝物等）
4. 背包与库存管理
5. 敌人AI（至少3种不同行为模式）
6. 关卡设计（至少2个不同场景）
7. 进度保存与加载功能

使用JavaScript/HTML5实现，确保代码模块化和可扩展性。`,
    evaluationCriteria: "系统设计完整性、代码架构、游戏平衡性、用户界面设计、游戏体验"
  },
  {
    id: '6',
    icon: "fas fa-fire",
    title: "超级马里奥游戏",
    category: "游戏开发",
    difficulty: "中等",
    prompt: `使用HTML/CSS/JavaScript实现超级马里奥游戏，要求：

1. 马里奥角色的基本动作（奔跑、跳跃、蹲下）
2. 至少5种不同的敌人类型
3. 金币收集和计分系统
4. 至少2个完整关卡的设计
5. 碰撞检测和物理系统
6. 音效与背景音乐
7. 响应式控制（键盘和触摸屏）

代码结构要求清晰，CSS和JavaScript内联于HTML文件中。`,
    evaluationCriteria: "游戏功能实现、代码质量与组织、游戏体验、视觉效果、性能优化"
  },

  // 3D可视化类
  {
    id: '7',
    icon: "fas fa-cube",
    title: "3D可视化 - 三体世界模拟",
    category: "3D可视化",
    difficulty: "困难",
    prompt: `基于《三体》小说创建一个p5.js或Three.js的三维可视化场景。

包含：
- 三个恒星的混沌运动模拟（基于三体问题物理方程）
- 三体行星的复杂轨道计算与渲染
- 可视化"不规则时代"和"恒纪元"的切换
- 星空背景和粒子效果
- 鼠标/触摸控制视角和缩放
- 时间流速控制和系统状态指示器
- 行星表面文明存亡的可视化表示

要有科幻感和良好视觉效果，同时确保物理模型的准确性。`,
    evaluationCriteria: "物理模型准确性、视觉效果、交互性、创意表现、性能优化"
  },
  {
    id: '8',
    icon: "fas fa-globe",
    title: "天体物理学 - 太阳系模拟",
    category: "3D可视化",
    difficulty: "中等",
    prompt: `创建真实的太阳系轨道运动3D模拟。

包含：
- 太阳和八大行星与主要矮行星
- 主要卫星系统（至少包括地月系统、木星卫星系）
- 符合开普勒定律的椭圆轨道（使用真实天文数据）
- 行星自转和公转周期比例准确
- 3D交互式视角控制
- 时间控制功能（加速/减速/暂停）
- 天体信息展示面板
- 可选显示轨道路径

使用Three.js实现，确保行星大小和距离可按比例缩放。`,
    evaluationCriteria: "天文数据准确性、视觉表现、用户交互体验、教育价值、性能优化"
  },
  {
    id: '9',
    icon: "fas fa-fire",
    title: "星系生成与可视化",
    category: "3D可视化",
    difficulty: "困难",
    prompt: `使用 WebGL (Three.js 或 p5.js) 创建一个程序化生成的三维星云/星系可视化系统，包含：

- 不同类型星系的程序化生成（旋涡星系、椭圆星系、不规则星系）
- 基于物理的星云形成模拟
- 至少100,000个星体的粒子系统
- 星体颜色基于恒星光谱分类
- 交互式相机控制（平移/旋转/缩放）
- 性能优化（LOD、区域渲染等）
- 星系碰撞模拟功能
- 宇宙学时间流逝效果

提供良好的用户界面控制参数，确保在中端设备上仍有流畅体验。`,
    evaluationCriteria: "技术实现复杂度、视觉效果、天文学准确性、性能优化、用户交互"
  },

  // UI/UX设计类
  {
    id: '10',
    icon: "fas fa-palette",
    title: "UI设计 - Claude 4 Opus产品页",
    category: "UI/UX设计",
    difficulty: "中等",
    prompt: `设计并实现Claude 4 Opus AI模型的产品落地页。

包含：
- 引人注目的Hero区域和主要特性介绍
- 至少3个代码示例或对话演示（对比展示与其他模型的差异）
- 完整的定价表格（至少3个方案）和常见问题解答
- 动态代码雨/粒子背景效果
- 现代渐变和玻璃拟态效果
- 完全响应式设计（移动端、平板和桌面端）
- 微交互动画和页面过渡效果
- 深色/浅色主题切换
- 性能优化（延迟加载、资源优化）

纯HTML/CSS/JavaScript实现，不使用外部框架。`,
    evaluationCriteria: "设计美观度、响应式实现、交互体验、创意表现、性能优化、代码质量"
  },
  {
    id: '11',
    icon: "fas fa-star",
    title: "现代UI - 3D拟态设计系统",
    category: "UI/UX设计",
    difficulty: "中等",
    prompt: `设计并实现一套完整的3D半拟态（Neumorphism）风格UI组件库和展示页面。

组件库需包含：
- 按钮系列（基础、图标、加载状态）
- 表单元素（输入框、复选框、单选框、开关）
- 卡片和面板组件
- 导航组件（标签页、侧边栏）
- 模态框和对话框
- 加载指示器和进度条
- 数据展示组件（表格、列表）

展示页面需包含：
- 登录表单与注册表单
- 仪表板布局示例
- 深色/浅色主题自动和手动切换
- 流体动画背景
- 微交互动效库
- 粒子或几何背景效果
- 可访问性支持（键盘导航、高对比度等）

使用现代CSS技术实现（CSS变量、Grid/Flexbox、CSS动画）。`,
    evaluationCriteria: "设计系统一致性、组件可用性、交互体验、创新性、可访问性、代码质量"
  },
  {
    id: '12',
    icon: "fas fa-mobile-alt",
    title: "响应式电子商务网站",
    category: "UI/UX设计",
    difficulty: "中等",
    prompt: `设计并开发一个完整响应式电子商务网站前端，包含以下页面和功能：

1. 首页（产品分类、精选产品、促销信息）
2. 产品列表页（筛选、排序、分页）
3. 产品详情页（图片轮播、规格选择、相关产品）
4. 购物车页面（数量修改、优惠券、总计）
5. 结账流程（分步表单、地址选择、支付方式）
6. 用户账户（订单历史、收藏、个人信息）
7. 搜索功能与结果页

技术要求：
- 纯HTML/CSS/JavaScript实现
- 完全响应式（适配手机、平板、桌面）
- 无需后端，使用模拟数据
- 包含微交互和页面过渡动画
- 符合WCAG 2.1 AA级可访问性标准

额外加分：商品快速预览、暗色模式、离线功能支持`,
    evaluationCriteria: "响应式实现、用户体验设计、功能完整性、交互流畅度、代码质量、可访问性"
  },

  // 数据可视化类
  {
    id: '13',
    icon: "fas fa-chart-line",
    title: "数据可视化 - 全球气候变化仪表板",
    category: "数据可视化",
    difficulty: "困难",
    prompt: `设计并实现一个交互式全球气候变化数据可视化仪表板。

数据集（使用内嵌JSON数据或公开API）：
- 全球温度变化趋势（1880-2023）
- 二氧化碳排放量（按国家/地区）
- 海平面上升数据
- 极端天气事件频率
- 冰川覆盖变化

可视化要求：
1. 至少5种不同的可视化图表（折线图、地图、热力图等）
2. 交互式时间轴控制
3. 数据筛选和比较功能
4. 响应式设计，适配不同屏幕尺寸
5. 数据见解自动生成

使用D3.js或其他JavaScript数据可视化库实现，确保加载性能良好。`,
    evaluationCriteria: "数据可视化有效性、交互设计、信息架构、技术实现、性能优化、教育价值"
  },
  {
    id: '14',
    icon: "fas fa-fire",
    title: "音频可视化 - 动态音频分析器",
    category: "数据可视化",
    difficulty: "中等",
    prompt: `创建一个高级音频可视化工具，能够实时分析和展示音频特征。

功能要求：
1. 支持上传音频文件或使用麦克风输入
2. 至少实现以下三种可视化效果：
   - 频谱分析器（波形图）
   - 环形频率分布
   - 3D龙卷风效果音频可视化
3. 频率区间分离显示（低、中、高频）
4. 节拍检测和视觉化
5. 可调参数（颜色、形状、敏感度）
6. 音频控制（播放、暂停、音量）
7. 可保存/分享可视化结果

使用Web Audio API和Canvas/WebGL实现。`,
    evaluationCriteria: "音频处理准确性、视觉效果、交互性、创新性、性能优化"
  },
  {
    id: '15',
    icon: "fas fa-network-wired",
    title: "关系网络可视化 - 社交网络分析",
    category: "数据可视化",
    difficulty: "中等",
    prompt: `设计并实现一个交互式社交网络关系可视化工具。

功能要求：
1. 使用力导向图算法展示人物关系网络
2. 节点代表用户，边表示关系（支持多种关系类型）
3. 社区检测和可视化分组
4. 关键人物（中心度）突出显示
5. 网络统计指标计算（密度、路径长度等）
6. 交互式探索（缩放、拖拽、筛选）
7. 节点详情展示面板
8. 时间维度分析（关系演变）

使用D3.js或其他适合的网络可视化库，使用模拟数据集（至少100个节点）。`,
    evaluationCriteria: "网络分析准确性、可视化清晰度、交互体验、性能（大数据处理）、算法实现"
  },

  // 算法与人工智能类
  {
    id: '16',
    icon: "fas fa-robot",
    title: "机器学习 - 图像风格迁移应用",
    category: "算法与AI",
    difficulty: "困难",
    prompt: `开发一个基于Web的图像风格迁移应用，让用户能够将艺术作品的风格应用到自己的照片上。

功能要求：
1. 图像上传界面（支持拖放）
2. 预设艺术风格选择（至少10种不同风格）
3. 风格迁移强度调节
4. 实时预览功能
5. 处理结果下载
6. 图像裁剪和基础调整功能

技术要求：
- 使用TensorFlow.js或类似的前端机器学习框架
- 模型优化以提高运行速度
- 优雅处理大图像和错误情况
- 适配移动设备

不要求训练自己的模型，可以使用预训练模型。`,
    evaluationCriteria: "机器学习应用方式、用户界面设计、性能优化、结果质量、错误处理"
  },
  {
    id: '17',
    icon: "fas fa-camera",
    title: "计算机视觉 - 立体视觉系统",
    category: "算法与AI",
    difficulty: "困难",
    prompt: `创建交互式可视化，展示双目摄像机如何从2D图像推算3D坐标。

功能要求：
1. 3D空间中可移动虚拟物体
2. 双摄像机视角实时显示（左右视图）
3. 视差计算和深度图生成
4. 三角测量过程步骤可视化
5. 摄像机参数可交互调整：
   - 基线距离
   - 焦距
   - 相机角度
6. 点云重建展示
7. 误差分析与可视化

提供详细的算法解释和实时计算过程。`,
    evaluationCriteria: "算法实现准确性、可视化教育价值、交互设计、代码质量、性能优化"
  },
  {
    id: '18',
    icon: "fas fa-brain",
    title: "自然语言处理 - 情感分析仪表板",
    category: "算法与AI",
    difficulty: "中等",
    prompt: `开发一个实时情感分析仪表板，可以分析文本、社交媒体内容或网页的情感倾向。

功能要求：
1. 文本输入界面（直接输入或URL导入）
2. 情感分析结果可视化：
   - 积极/消极/中性情感比例
   - 情感强度评分
   - 关键情感词汇高亮
3. 文本细分分析（段落或句子级别）
4. 情感变化趋势图（适用于长文本）
5. 情感词云生成
6. 批量分析功能（多文本比较）

技术实现：
- 使用前端NLP库（如compromise、sentiment或TensorFlow.js模型）
- 结果缓存优化
- 支持至少两种语言的分析`,
    evaluationCriteria: "NLP算法实现、结果准确性、可视化效果、用户体验、代码质量"
  },

  // 教育与解释类
  {
    id: '19',
    icon: "fas fa-graduation-cap",
    title: "算法可视化 - 排序算法教学工具",
    category: "教育与解释",
    difficulty: "中等",
    prompt: `设计并实现一个互动式排序算法可视化教学工具。

功能要求：
1. 支持至少5种排序算法：
   - 冒泡排序
   - 选择排序
   - 插入排序
   - 快速排序
   - 归并排序
2. 算法执行过程的实时可视化
3. 步骤控制（下一步、上一步、播放、暂停、速度调节）
4. 算法复杂度分析和比较
5. 自定义输入数据功能
6. 不同数据分布场景测试（已排序、反序、随机等）
7. 关键步骤解释和注解

设计要简洁直观，适合教育用途。`,
    evaluationCriteria: "算法实现正确性、可视化教育效果、交互设计、代码质量、教学价值"
  },
  {
    id: '20',
    icon: "fas fa-dna",
    title: "生物信息学 - DNA序列分析工具",
    category: "教育与解释",
    difficulty: "困难",
    prompt: `创建一个DNA序列分析和可视化工具，适用于生物信息学教育。

功能要求：
1. DNA序列输入和导入功能
2. 基本序列统计（长度、GC含量、基本比例）
3. 序列比对可视化（至少实现两序列比对）
4. 开放阅读框（ORF）识别和可视化
5. 限制性酶切位点分析
6. 基因特征可视化（启动子、终止子等）
7. 引物设计辅助工具
8. 序列转换（DNA到RNA、氨基酸）

界面要专业且易用，结果可导出。`,
    evaluationCriteria: "生物信息学算法准确性、可视化清晰度、工具实用性、教育价值、界面设计"
  },
  {
    id: '21',
    icon: "fas fa-microchip",
    title: "计算机架构 - CPU模拟器",
    category: "教育与解释",
    difficulty: "困难",
    prompt: `设计并实现一个简化的CPU模拟器，用于教育目的，展示计算机如何执行指令。

功能要求：
1. 可视化CPU核心组件：
   - 寄存器（至少8个通用寄存器）
   - ALU（算术逻辑单元）
   - 控制单元
   - 内存（至少256字节）
2. 支持基本指令集（至少15条指令）：
   - 数据移动（MOV, LOAD, STORE）
   - 算术运算（ADD, SUB, MUL, DIV）
   - 逻辑运算（AND, OR, XOR, NOT）
   - 控制流（JMP, JZ, JNZ）
   - 栈操作（PUSH, POP）
3. 指令执行的逐步可视化
4. 内存和寄存器状态实时显示
5. 简单汇编代码编辑器
6. 至少3个预设示例程序
7. 执行速度控制

确保界面直观，突出指令执行的每个阶段。`,
    evaluationCriteria: "模拟准确性、教育价值、可视化清晰度、交互设计、代码结构"
  },

  // 创意与艺术类
  {
    id: '22',
    icon: "fas fa-paint-brush",
    title: "生成艺术 - 创意图形生成器",
    category: "创意与艺术",
    difficulty: "中等",
    prompt: `设计并实现一个程序化艺术生成工具，能够创建独特的视觉作品。

功能要求：
1. 至少实现3种不同的生成算法：
   - 分形图案生成
   - 流场可视化
   - 粒子系统
2. 参数控制面板（至少10个可调参数）
3. 色彩方案选择和自定义
4. 实时预览和高分辨率导出
5. 动画效果选项
6. 随机生成和参数保存功能
7. 画布交互（鼠标/触摸影响）

界面设计要简约现代，注重用户创意体验。`,
    evaluationCriteria: "创意算法实现、视觉美感、交互设计、参数控制、性能优化"
  },
  {
    id: '23',
    icon: "fas fa-music",
    title: "创意编码 - 互动音乐生成器",
    category: "创意与艺术",
    difficulty: "困难",
    prompt: `创建一个基于Web的互动音乐生成和可视化系统。

功能要求：
1. 程序化音乐生成：
   - 基于规则的旋律生成
   - 和声进行自动创建
   - 节奏模式生成器
2. 音乐直观编辑界面：
   - 钢琴卷帘式编辑器
   - 乐器选择（至少5种不同音色）
   - 混音控制
3. 实时音频可视化：
   - 多种视觉效果选择
   - 与音乐元素同步的视觉反馈
4. 用户交互影响：
   - 鼠标/触摸移动改变音乐参数
   - 基于用户输入的即兴生成
5. 作品保存和分享功能

技术实现基于Web Audio API和Canvas/WebGL。`,
    evaluationCriteria: "创意表达、音乐理论应用、视听结合效果、交互设计、技术实现"
  },
  {
    id: '24',
    icon: "fas fa-pen-fancy",
    title: "交互叙事 - 可视化故事生成器",
    category: "创意与艺术",
    difficulty: "中等",
    prompt: `开发一个交互式视觉故事生成工具，将文本叙事转化为动态视觉体验。

功能要求：
1. 文本输入界面（故事情节编辑）
2. 场景可视化生成：
   - 基于文本的场景构建
   - 角色和元素放置
   - 环境和氛围设置
3. 交互式叙事控制：
   - 分支选择点
   - 条件触发事件
   - 角色对话系统
4. 视觉效果库：
   - 天气和环境效果
   - 转场和动画
   - 情绪映射到视觉风格
5. 故事模板和保存功能

注重创意表达和用户参与感，界面应简洁但功能强大。`,
    evaluationCriteria: "创意叙事、视觉表现、交互设计、用户体验、技术实现"
  } */
];

// 测试相关操作
export interface TestsSlice {
  tests: Array<Test>;
  currentTestIndex: number;
  setCurrentTestIndex: (index: number) => void;
  addTest: (test: Omit<Test, 'id'>) => void;
  deleteTest: (id: string) => void;
  reorderTests: (activeId: string, overId: string) => void;
}

export const createTestsSlice = (set: any, get: any): TestsSlice => ({
  tests: initialTests,
  currentTestIndex: 0,
  
  setCurrentTestIndex: (index: number) => set({ currentTestIndex: index }),
  
  addTest: (test) => set((state: { tests: Array<Test> }) => {
    const newTest = { ...test, id: Date.now().toString() };
    const newTests = [...state.tests, newTest];
    
    return { tests: newTests };
  }),
  
  deleteTest: (id: string) => set((state: { tests: Array<Test>; currentTestIndex: number }) => {
    const testIndex = state.tests.findIndex(test => test.id === id);
    if (testIndex === -1) return state;
    
    const newTests = [...state.tests];
    newTests.splice(testIndex, 1);
    
    // 如果当前选中的测试被删除了，调整currentTestIndex
    let newCurrentIndex = state.currentTestIndex;
    if (newTests.length <= newCurrentIndex) {
      newCurrentIndex = Math.max(0, newTests.length - 1);
    }
    
    // 先返回更新后的tests和currentTestIndex
    const result = { 
      tests: newTests,
      currentTestIndex: newCurrentIndex
    };
    
    // 调用updateScoresAfterTestDelete更新评分数据
    // 这必须在下一帧执行，否则会出现循环依赖
    setTimeout(() => {
      const { updateScoresAfterTestDelete } = get();
      if (updateScoresAfterTestDelete) {
        updateScoresAfterTestDelete(testIndex);
      }
    }, 0);
    
    return result;
  }),
  
  reorderTests: (activeId, overId) => set((state: { tests: Array<Test>; currentTestIndex: number }) => {
    // 找出拖动元素和放置位置的索引
    const oldIndex = state.tests.findIndex(test => test.id === activeId);
    const newIndex = state.tests.findIndex(test => test.id === overId);
    
    if (oldIndex === -1 || newIndex === -1) return state;
    
    // 创建新的测试数组
    const newTests = [...state.tests];
    const [movedTest] = newTests.splice(oldIndex, 1);
    newTests.splice(newIndex, 0, movedTest);
    
    // 如果当前选中的是被拖动的项，更新currentTestIndex
    let newCurrentIndex = state.currentTestIndex;
    if (state.currentTestIndex === oldIndex) {
      newCurrentIndex = newIndex;
    } else if (state.currentTestIndex > oldIndex && state.currentTestIndex <= newIndex) {
      newCurrentIndex = state.currentTestIndex - 1;
    } else if (state.currentTestIndex < oldIndex && state.currentTestIndex >= newIndex) {
      newCurrentIndex = state.currentTestIndex + 1;
    }
    
    return { 
      tests: newTests,
      currentTestIndex: newCurrentIndex
    };
  })
}); 
