export const testTelegramWebApp = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return null;
  }

  const webApp = window.Telegram.WebApp;
  
  // 初始化 WebApp
  webApp.ready();

  // 收集基本信息
  const info = {
    platform: webApp.platform,
    colorScheme: webApp.colorScheme,
    themeParams: webApp.themeParams,
    viewportHeight: webApp.viewportHeight,
    viewportStableHeight: webApp.viewportStableHeight,
    isExpanded: webApp.isExpanded,
    user: webApp.initDataUnsafe?.user,
  };

  console.log('Telegram WebApp 信息：', info);
  return info;
};

export const testSendData = () => {
  if (!window.Telegram?.WebApp) {
    console.error('Telegram WebApp SDK 未加载！');
    return;
  }

  const testData = {
    type: 'test',
    timestamp: new Date().toISOString(),
    message: '测试数据发送功能'
  };

  window.Telegram.WebApp.sendData(JSON.stringify(testData));
  console.log('已发送测试数据：', testData);
};