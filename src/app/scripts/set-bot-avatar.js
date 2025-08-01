const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8';
const bot = new TelegramBot(token, { polling: false });

async function setBotAvatar() {
  try {
    // Путь к файлу аватара (замените на реальный путь)
    const avatarPath = path.join(__dirname, '../assets/bot-avatar.png');
    
    // Проверяем, существует ли файл
    if (!fs.existsSync(avatarPath)) {
      console.error('❌ Файл аватара не найден:', avatarPath);
      console.log('📝 Пожалуйста, поместите файл аватара в папку assets/ с именем bot-avatar.png');
      console.log('📏 Размер должен быть 512x512 пикселей');
      return;
    }

    // Читаем файл
    const avatarBuffer = fs.readFileSync(avatarPath);
    
    // Отправляем аватар через Bot API
    const result = await bot.setProfilePhoto(avatarBuffer);
    
    if (result) {
      console.log('✅ Аватар бота успешно установлен!');
    } else {
      console.log('❌ Не удалось установить аватар');
    }
    
  } catch (error) {
    console.error('❌ Ошибка при установке аватара:', error.message);
    
    if (error.response) {
      console.error('📋 Детали ошибки:', error.response.body);
    }
  }
}

// Запускаем функцию
setBotAvatar(); 