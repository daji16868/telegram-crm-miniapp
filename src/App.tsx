import { useEffect } from 'react'
import Header from './components/Header'
import CustomerForm from './components/CustomerForm'
import { testTelegramWebApp, testSendData } from './utils/telegramTest'

function App() {
  useEffect(() => {
    // 页面加载时测试 Telegram WebApp
    testTelegramWebApp();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <CustomerForm />
          
          {/* 测试按钮区域 */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium text-gray-900 mb-4">测试功能区</h2>
            <div className="space-y-4">
              <button
                onClick={() => testTelegramWebApp()}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                测试 WebApp 信息
              </button>
              <button
                onClick={() => testSendData()}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                测试发送数据
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App