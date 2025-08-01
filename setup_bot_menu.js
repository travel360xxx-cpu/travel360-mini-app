// Скрипт для настройки меню бота с Mini App
const TelegramBot = require('node-telegram-bot-api');

const token = '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8';
const bot = new TelegramBot(token, { polling: false });

async function setupBotMenu() {
  try {
    console.log('🔧 Настройка меню бота...');

    // Установка команд бота
    await bot.setMyCommands([
      { command: 'start', description: '🚀 Открыть 360° Travel Mini App' },
      { command: 'help', description: '📖 Помощь по использованию' },
      { command: 'hotels', description: '🏨 Поиск отелей' },
      { command: 'flights', description: '✈️ Поиск авиабилетов' },
      { command: 'cars', description: '🚗 Аренда автомобилей' },
      { command: 'contact', description: '💬 Связаться с нами' },
      { command: 'rules', description: '📘 Правила и FAQ' }
    ]);

    console.log('✅ Команды бота установлены');

    // Установка кнопки меню (Mini App)
    await bot.setChatMenuButton({
      menu_button: {
        type: 'web_app',
        text: '360° Travel',
        web_app: {
          url: 'https://travel360-mini-app.vercel.app'
        }
      }
    });

    console.log('✅ Кнопка меню с Mini App установлена');

    // Получение информации о боте
    const botInfo = await bot.getMe();
    console.log('🤖 Информация о боте:');
    console.log(`   Имя: ${botInfo.first_name}`);
    console.log(`   Username: @${botInfo.username}`);
    console.log(`   ID: ${botInfo.id}`);

    console.log('\n🎉 Настройка завершена!');
    console.log('📱 Теперь пользователи могут:');
    console.log('   1. Нажать кнопку меню для открытия Mini App');
    console.log('   2. Использовать команду /start для доступа к Mini App');
    console.log('   3. Отправлять заявки через удобный интерфейс');

  } catch (error) {
    console.error('❌ Ошибка при настройке:', error.message);
  }
}

// Запуск настройки
setupBotMenu(); 