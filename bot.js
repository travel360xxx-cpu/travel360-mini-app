const TelegramBot = require('node-telegram-bot-api');

const token = '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8';
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 360° Travel Bot запущен в polling режиме...');

// Handle /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `🌟 Добро пожаловать в 360° Travel!

Я помогу вам найти лучшие предложения для путешествий:

🏨 Отели по всему миру
✈️ Авиабилеты от ведущих авиакомпаний  
🚗 Аренда автомобилей
💬 Персональная поддержка

Выберите нужную услугу:`;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '🏨 Отели', callback_data: 'hotels' },
        { text: '✈️ Авиабилеты', callback_data: 'flights' }
      ],
      [
        { text: '🚗 Аренда авто', callback_data: 'cars' },
        { text: '💬 Контакты', callback_data: 'contact' }
      ],
      [
        { text: '📘 Правила', callback_data: 'rules' }
      ]
    ]
  };

  await bot.sendMessage(chatId, message, { reply_markup: keyboard });
});

// Handle /help command
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `❓ Справка по командам:

🏨 /hotels - Поиск и бронирование отелей
✈️ /flights - Поиск авиабилетов
🚗 /cars - Аренда автомобилей
💬 /contact - Связаться с поддержкой
📘 /rules - Правила и часто задаваемые вопросы
❓ /help - Показать эту справку

Просто отправьте команду или используйте кнопки в главном меню!`;

  await bot.sendMessage(chatId, message);
});

// Handle /hotels command
bot.onText(/\/hotels/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `🏨 Поиск отелей

Найдите и забронируйте отели по всему миру с лучшими ценами!

🔗 Перейдите на Booking.com для поиска:
https://www.booking.com

💡 Советы:
• Бронируйте заранее для лучших цен
• Проверяйте отзывы гостей
• Обращайте внимание на расположение`;

  await bot.sendMessage(chatId, message);
});

// Handle /flights command
bot.onText(/\/flights/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `✈️ Поиск авиабилетов

Сравните цены на авиабилеты от сотен авиакомпаний!

🔗 Перейдите на Kayak для поиска:
https://www.kayak.com

💡 Советы:
• Используйте гибкие даты для лучших цен
• Подписывайтесь на уведомления о снижении цен
• Проверяйте багажные правила авиакомпаний`;

  await bot.sendMessage(chatId, message);
});

// Handle /cars command
bot.onText(/\/cars/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `🚗 Аренда автомобилей

Арендуйте автомобили у проверенных провайдеров по всему миру!

🔗 Перейдите на RentalCars.com:
https://www.rentalcars.com

💡 Советы:
• Сравнивайте цены разных провайдеров
• Проверяйте условия страхования
• Учитывайте топливную политику`;

  await bot.sendMessage(chatId, message);
});

// Handle /contact command
bot.onText(/\/contact/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `💬 Связаться с нами

Получите персональную помощь от наших экспертов!

🔗 Наш Telegram канал:
https://t.me/travel360net

📧 Email: support@travel360.net

⏰ Время работы: 24/7

Мы всегда готовы помочь с планированием вашего путешествия!`;

  await bot.sendMessage(chatId, message);
});

// Handle /rules command
bot.onText(/\/rules/, async (msg) => {
  const chatId = msg.chat.id;
  const message = `📘 Правила и FAQ

Ознакомьтесь с нашими правилами и часто задаваемыми вопросами.

🔗 Подробная информация:
https://telegra.ph/360Travel-Rules-and-FAQ-08-01

📋 Основные правила:
• Все бронирования через внешние сервисы
• Мы не взимаем комиссию за услуги
• Поддержка доступна 24/7
• Рекомендуем страхование путешествий`;

  await bot.sendMessage(chatId, message);
});

// Handle callback queries (button clicks)
bot.on('callback_query', async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  let message = '';

  switch (data) {
    case 'hotels':
      message = `🏨 Поиск отелей

Найдите и забронируйте отели по всему миру с лучшими ценами!

🔗 Перейдите на Booking.com для поиска:
https://www.booking.com

💡 Советы:
• Бронируйте заранее для лучших цен
• Проверяйте отзывы гостей
• Обращайте внимание на расположение`;
      break;

    case 'flights':
      message = `✈️ Поиск авиабилетов

Сравните цены на авиабилеты от сотен авиакомпаний!

🔗 Перейдите на Kayak для поиска:
https://www.kayak.com

💡 Советы:
• Используйте гибкие даты для лучших цен
• Подписывайтесь на уведомления о снижении цен
• Проверяйте багажные правила авиакомпаний`;
      break;

    case 'cars':
      message = `🚗 Аренда автомобилей

Арендуйте автомобили у проверенных провайдеров по всему миру!

🔗 Перейдите на RentalCars.com:
https://www.rentalcars.com

💡 Советы:
• Сравнивайте цены разных провайдеров
• Проверяйте условия страхования
• Учитывайте топливную политику`;
      break;

    case 'contact':
      message = `💬 Связаться с нами

Получите персональную помощь от наших экспертов!

🔗 Наш Telegram канал:
https://t.me/travel360net

📧 Email: support@travel360.net

⏰ Время работы: 24/7

Мы всегда готовы помочь с планированием вашего путешествия!`;
      break;

    case 'rules':
      message = `📘 Правила и FAQ

Ознакомьтесь с нашими правилами и часто задаваемыми вопросами.

🔗 Подробная информация:
https://telegra.ph/360Travel-Rules-and-FAQ-08-01

📋 Основные правила:
• Все бронирования через внешние сервисы
• Мы не взимаем комиссию за услуги
• Поддержка доступна 24/7
• Рекомендуем страхование путешествий`;
      break;
  }

  if (message) {
    await bot.sendMessage(chatId, message);
  }

  // Answer callback query
  await bot.answerCallbackQuery(callbackQuery.id);
});

// Handle regular messages
bot.on('message', async (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;
    const welcomeMessage = `👋 Привет! Я 360° Travel Bot - ваш помощник в путешествиях!

Доступные команды:
🏨 /hotels - Поиск отелей
✈️ /flights - Поиск авиабилетов
🚗 /cars - Аренда автомобилей
💬 /contact - Связаться с нами
📘 /rules - Правила и FAQ
❓ /help - Помощь

Выберите нужную услугу или используйте команду /help для получения справки.`;

    await bot.sendMessage(chatId, welcomeMessage);
  }
});

// Error handling
bot.on('error', (error) => {
  console.error('❌ Ошибка бота:', error);
});

bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

console.log('✅ Бот готов к работе! Отправьте /start в Telegram'); 