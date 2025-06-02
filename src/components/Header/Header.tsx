import React, { useEffect } from 'react'
import { useStore } from '../../store/useStore'

// 定义流光和渐变动画的CSS
const progressBarStyles = `
  @keyframes gradientFlow {
    0% { background-position: 300% 50%; }
    100% { background-position: 0% 50%; }
  }


  .progress-track {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background: linear-gradient(145deg, #e0ebff, #ffffff);
    box-shadow: inset 4px 4px 10px rgba(255, 255, 255, 0.6),
                inset -4px -4px 10px rgba(0, 0, 0, 0.05),
                0 4px 8px rgba(200, 200, 255, 0.3);
    overflow: hidden;
    position: relative;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #ff9ec4, #bfaeff, #92f6ff, #ffc87a);
    background-size: 300% 100%;
    animation: gradientFlow 5s linear infinite;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(255, 175, 238, 0.3),
                inset 0 0 5px rgba(255, 255, 255, 0.6);
    position: relative;
    transition: width 0.3s ease-out;
  }


  .progress-text {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    z-index: 5;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    font-weight: 600;
    pointer-events: none;
  }
`

const Header: React.FC = () => {
  const { tests, scores } = useStore()

  // 动态添加CSS到页面
  useEffect(() => {
    const styleSheet = document.createElement('style')
    styleSheet.id = 'progress-bar-style'

    if (!document.getElementById('progress-bar-style')) {
      styleSheet.innerHTML = progressBarStyles
      document.head.appendChild(styleSheet)
    }

    return () => {
      const existingStyle = document.getElementById('progress-bar-style')
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [])

  // 计算总进度
  const calculateTotalProgress = () => {
    const totalRatings = tests.length * 4 // 4个模型
    let completedRatings = 0

    if (scores) {
      Object.values(scores).forEach((modelScores: Array<number | null>) => {
        completedRatings += modelScores.filter(
          (score: number | null) => score !== null,
        ).length
      })
    }

    return {
      percent: tests.length === 0 ? 0 : (completedRatings / totalRatings) * 100,
      completed: completedRatings,
      total: totalRatings,
    }
  }

  const progress = calculateTotalProgress()

  return (
    <div className="text-center mb-5 animate-float">
      <div className="flex items-center justify-center ">
        <img src="/robot.png" alt="" className="w-20 h-20" />
        <img src="/vs.png" alt="" className="w-20 h-20" />
        <img src="/robot.png" alt="" className="w-20 h-20" />
      </div>

      {/* 进度指示器 */}
      <div className="bg-white rounded-2xl p-6 mx-auto shadow-xs">
        <div className="progress-track">
          <div
            className="progress-bar"
            style={{
              width: `${progress.percent}%`,
            }}
          >
          </div>
          <div className="progress-text">
            <span className="text-sm">测试进度</span>
            <span className="text-sm font-bold">
              {progress.completed}/{progress.total} 完成
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
