import { NextRequest, NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8'
const bot = new TelegramBot(token, { polling: false })

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle different types of updates
    if (body.message) {
      const { message } = body
      const chatId = message.chat.id
      const text = message.text || ''
      
      // Handle commands
      if (text.startsWith('/')) {
        await handleCommand(chatId, text)
      } else {
        // Handle regular messages
        await handleMessage(chatId, text)
      }
    } else if (body.callback_query) {
      // Handle inline keyboard callbacks
      const { callback_query } = body
      const chatId = callback_query.message.chat.id
      const data = callback_query.data
      
      await handleCallback(chatId, data)
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Telegram webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handleCommand(chatId: number, command: string) {
  switch (command) {
    case '/start':
      await sendWelcomeMessage(chatId)
      break
    case '/help':
      await sendHelpMessage(chatId)
      break
    case '/hotels':
      await sendHotelsMessage(chatId)
      break
    case '/flights':
      await sendFlightsMessage(chatId)
      break
    case '/cars':
      await sendCarsMessage(chatId)
      break
    case '/contact':
      await sendContactMessage(chatId)
      break
    case '/rules':
      await sendRulesMessage(chatId)
      break
    default:
      await sendUnknownCommandMessage(chatId)
  }
}

async function handleMessage(chatId: number, text: string) {
  const welcomeMessage = `👋 Привет! Я 360° Travel Bot - ваш помощник в путешествиях!

Доступные команды:
🏨 /hotels - Поиск отелей
✈️ /flights - Поиск авиабилетов
🚗 /cars - Аренда автомобилей
💬 /contact - Связаться с нами
📘 /rules - Правила и FAQ
❓ /help - Помощь

Выберите нужную услугу или используйте команду /help для получения справки.`

  await bot.sendMessage(chatId, welcomeMessage)
}

async function handleCallback(chatId: number, data: string) {
  switch (data) {
    case 'hotels':
      await sendHotelsMessage(chatId)
      break
    case 'flights':
      await sendFlightsMessage(chatId)
      break
    case 'cars':
      await sendCarsMessage(chatId)
      break
    case 'contact':
      await sendContactMessage(chatId)
      break
    case 'rules':
      await sendRulesMessage(chatId)
      break
  }
}

async function sendWelcomeMessage(chatId: number) {
  const message = `🌟 Добро пожаловать в 360° Travel!

Я помогу вам найти лучшие предложения для путешествий:

🏨 Отели по всему миру
✈️ Авиабилеты от ведущих авиакомпаний  
🚗 Аренда автомобилей
💬 Персональная поддержка

Выберите нужную услугу:`

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
  }

  await bot.sendMessage(chatId, message, { reply_markup: keyboard })
}

async function sendHelpMessage(chatId: number) {
  const message = `❓ Справка по командам:

🏨 /hotels - Поиск и бронирование отелей
✈️ /flights - Поиск авиабилетов
🚗 /cars - Аренда автомобилей
💬 /contact - Связаться с поддержкой
📘 /rules - Правила и часто задаваемые вопросы
❓ /help - Показать эту справку

Просто отправьте команду или используйте кнопки в главном меню!`

  await bot.sendMessage(chatId, message)
}

async function sendHotelsMessage(chatId: number) {
  const message = `🏨 Поиск отелей

Найдите и забронируйте отели по всему миру с лучшими ценами!

🔗 Перейдите на Booking.com для поиска:
https://www.booking.com

💡 Советы:
• Бронируйте заранее для лучших цен
• Проверяйте отзывы гостей
• Обращайте внимание на расположение`

  await bot.sendMessage(chatId, message)
}

async function sendFlightsMessage(chatId: number) {
  const message = `✈️ Поиск авиабилетов

Сравните цены на авиабилеты от сотен авиакомпаний!

🔗 Перейдите на Kayak для поиска:
https://www.kayak.com

💡 Советы:
• Используйте гибкие даты для лучших цен
• Подписывайтесь на уведомления о снижении цен
• Проверяйте багажные правила авиакомпаний`

  await bot.sendMessage(chatId, message)
}

async function sendCarsMessage(chatId: number) {
  const message = `🚗 Аренда автомобилей

Арендуйте автомобили у проверенных провайдеров по всему миру!

🔗 Перейдите на RentalCars.com:
https://www.rentalcars.com

💡 Советы:
• Сравнивайте цены разных провайдеров
• Проверяйте условия страхования
• Учитывайте топливную политику`

  await bot.sendMessage(chatId, message)
}

async function sendContactMessage(chatId: number) {
  const message = `💬 Связаться с нами

Получите персональную помощь от наших экспертов!

🔗 Наш Telegram канал:
https://t.me/travel360net

📧 Email: support@travel360.net

⏰ Время работы: 24/7

Мы всегда готовы помочь с планированием вашего путешествия!`

  await bot.sendMessage(chatId, message)
}

async function sendRulesMessage(chatId: number) {
  const message = `📘 Правила и FAQ

Ознакомьтесь с нашими правилами и часто задаваемыми вопросами.

🔗 Подробная информация:
https://telegra.ph/360Travel-Rules-and-FAQ-08-01

📋 Основные правила:
• Все бронирования через внешние сервисы
• Мы не взимаем комиссию за услуги
• Поддержка доступна 24/7
• Рекомендуем страхование путешествий`

  await bot.sendMessage(chatId, message)
}

async function sendUnknownCommandMessage(chatId: number) {
  const message = `❓ Неизвестная команда

Используйте /help для просмотра доступных команд или выберите услугу из главного меню.`

  await bot.sendMessage(chatId, message)
} 