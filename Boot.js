const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const fs = require('fs');

// Задаем токен нашего бота
const token = '6008668981:AAE-GMnCqmITBohOVJ2o3AN8hzYjvPqnjTA';

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Ответ на сообщение старта
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Привет! Выберите, какой пол вам интересен: /boy или /girl.');
});

// Обработчик команды /boy
bot.onText(/\/boy/, (msg) => {
  // Получаем случайное изображение мужчины с помощью API Unsplash
  request.get('https://api.unsplash.com/photos/random?query=man&client_id=YOUR_ACCESS_KEY', (err, res, body) => {
    if (err) {
      bot.sendMessage(msg.chat.id, 'Произошла ошибка. Попробуйте еще раз.');
    } else {
      const imageUrl = JSON.parse(body).urls.regular;
      // Скачиваем изображение по URL
      request.get(imageUrl).pipe(fs.createWriteStream('image.jpg')).on('close', () => {
        bot.sendPhoto(msg.chat.id, fs.readFileSync('image.jpg'));
      });
    }
  });
});

// Обработчик команды /girl
bot.onText(/\/girl/, (msg) => {
  // Получаем случайное изображение женщины с помощью API Unsplash
  request.get('https://api.unsplash.com/photos/random?query=woman&client_id=YOUR_ACCESS_KEY', (err, res, body) => {
    if (err) {
      bot.sendMessage(msg.chat.id, 'Произошла ошибка. Попробуйте еще раз.');
    } else {
      const imageUrl = JSON.parse(body).urls.regular;
      // Скачиваем изображение по URL
      request.get(imageUrl).pipe(fs.createWriteStream('image.jpg')).on('close', () => {
        bot.sendPhoto(msg.chat.id, fs.readFileSync('image.jpg'));
      });
    }
  });
});
