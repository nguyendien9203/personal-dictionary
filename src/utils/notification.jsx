import { message } from 'antd';

const openMessage = (type, content) => {
  message[type](content, 3);
};

export const notifySuccess = (content) => {
  openMessage('success', content);
};

export const notifyError = (content) => {
  openMessage('error', content);
};

export const notifyWarning = (content) => {
  openMessage('warning', content);
};

export const notifyInfo = (content) => {
  openMessage('info', content);
};
