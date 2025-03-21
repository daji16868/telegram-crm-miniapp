import React, { useState, useEffect } from 'react';
import { initTelegramApp, sendDataToTelegram, getCurrentUser } from '../utils/telegram';

interface CustomerFormData {
  name: string;
  phone: string;
  company: string;
  position: string;
  source: string;
  notes: string;
  submittedBy?: {
    id: number;
    name: string;
    username?: string;
  };
}

const CustomerForm: React.FC = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: '',
    phone: '',
    company: '',
    position: '',
    source: '',
    notes: '',
  });

  useEffect(() => {
    const tg = initTelegramApp();
    const user = getCurrentUser();
    
    if (user) {
      setFormData(prev => ({
        ...prev,
        submittedBy: {
          id: user.id,
          name: `${user.first_name} ${user.last_name || ''}`.trim(),
          username: user.username,
        },
      }));
    }

    tg.MainButton.onClick(() => {
      handleSubmit();
    });

    return () => {
      // 清理事件监听
      tg.MainButton.offClick(handleSubmit);
    };
  }, []);

  const handleSubmit = () => {
    // 表单验证
    if (!formData.name || !formData.phone) {
      alert('请填写必要信息！');
      return;
    }

    // 发送数据到 Telegram Bot
    sendDataToTelegram(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          客户姓名
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          联系电话
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
          公司名称
        </label>
        <input
          type="text"
          name="company"
          id="company"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          职位
        </label>
        <input
          type="text"
          name="position"
          id="position"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.position}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">
          客户来源
        </label>
        <select
          name="source"
          id="source"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.source}
          onChange={handleChange}
        >
          <option value="">请选择来源</option>
          <option value="referral">内部推荐</option>
          <option value="cold-call">陌生拜访</option>
          <option value="event">活动获取</option>
          <option value="other">其他渠道</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          备注信息
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default CustomerForm;