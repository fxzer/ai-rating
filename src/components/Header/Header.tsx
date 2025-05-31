import React from 'react'
import { useStore } from '../../store/useStore'

const Header: React.FC = () => {
  const { tests, scores } = useStore()

  // 计算总进度
  const calculateTotalProgress = () => {
    const totalRatings = tests.length * 4 // 4个模型
    let completedRatings = 0

    Object.values(scores).forEach((modelScores) => {
      completedRatings += modelScores.filter(
        (score: number | null) => score !== null,
      ).length
    })

    return {
      percent: (completedRatings / totalRatings) * 100,
      completed: completedRatings,
      total: totalRatings,
    }
  }

  const progress = calculateTotalProgress()

  return (
    <div className="text-center mb-5 animate-float">
      <div className="flex items-center justify-center gap-4">
        <div className="inline-flex items-center justify-center w-18 h-18 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 animate-glow">
          <i className="fas fa-robot text-3xl text-white"></i>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-black text-slate-800 mb-2">AI Battle</h1>
          <p className="text-sm text-slate-600 mb-4">终极对战评分系统</p>
        </div>
      </div>

      {/* 进度指示器 */}
      <div className="bg-white rounded-2xl p-6  mx-auto ">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-600">测试进度</span>
          <span className="text-sm font-bold text-purple-600">
            {progress.completed}/{progress.total} 完成
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Header
