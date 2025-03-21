declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        close(): void;
        expand(): void;
        MainButton: {
          text: string;
          color: string;
          textColor: string;
          isVisible: boolean;
          isActive: boolean;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        sendData(data: string): void;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        platform: string;
        colorScheme: 'light' | 'dark';
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
        };
        viewportHeight: number;
        viewportStableHeight: number;
        isExpanded: boolean;
      };
    };
  }
}

export const initTelegramApp = () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  
  // 设置主按钮
  tg.MainButton.text = "提交客户信息";
  tg.MainButton.show();
  
  return tg;
};

export const sendDataToTelegram = (data: any) => {
  const tg = window.Telegram.WebApp;
  tg.sendData(JSON.stringify(data));
};

export const getCurrentUser = () => {
  const tg = window.Telegram.WebApp;
  return tg.initDataUnsafe.user;
};