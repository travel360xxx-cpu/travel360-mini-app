import { NextRequest, NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8'
const bot = new TelegramBot(token, { polling: false })

export async function GET() {
  return NextResponse.json({ 
    status: 'Telegram webhook is ready',
    timestamp: new Date().toISOString(),
    bot: '360Travel',
    version: '1.0.1'
  })
}

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
  // Обработка команды ответа пользователю
  if (command.startsWith('/reply ')) {
    const parts = command.split(' ')
    if (parts.length >= 3) {
      const userId = parts[1]
      const message = parts.slice(2).join(' ')
      await sendReplyToUser(chatId, userId, message)
      return
    }
  }

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

async function handleMessage(chatId: number, _text: string) {
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
  // Обработка заявок
  if (data.startsWith('accept_') || data.startsWith('reject_') || data.startsWith('reply_')) {
    await handleRequestCallback(chatId, data)
    return
  }

  // Обычные callback'ы
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

Я помогу вам найти лучшие предложения для путешествий со скидками до -30%!

🏨 Отели по всему миру
✈️ Авиабилеты от ведущих авиакомпаний  
🚗 Аренда автомобилей
💬 Персональная поддержка

🚀 Откройте наше Mini App для удобного поиска и отправки заявок!`

  const keyboard = {
    inline_keyboard: [
      [
        { 
          text: '🚀 Открыть Mini App', 
          web_app: { url: 'https://travel360-mini-app-e5uw.vercel.app?v=1.0.1' }
        }
      ],
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

🚀 Откройте Mini App для отправки заявок на скидки!

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

async function handleRequestCallback(chatId: number, data: string) {
  const [action, userId] = data.split('_')
  
  switch (action) {
    case 'accept':
      await bot.sendMessage(chatId, `✅ Заявка от пользователя ${userId} принята!`)
      // Уведомляем пользователя
      try {
        await bot.sendMessage(userId, `✅ Ваша заявка принята! Мы свяжемся с вами в ближайшее время.`)
      } catch (error) {
        console.error('Error notifying user:', error)
      }
      break
    case 'reject':
      await bot.sendMessage(chatId, `❌ Заявка от пользователя ${userId} отклонена.`)
      // Уведомляем пользователя
      try {
        await bot.sendMessage(userId, `❌ К сожалению, ваша заявка не может быть обработана. Обратитесь к нам для уточнения деталей.`)
      } catch (error) {
        console.error('Error notifying user:', error)
      }
      break
    case 'reply':
      await bot.sendMessage(chatId, `💬 Для ответа пользователю ${userId} используйте команду /reply ${userId} <ваше сообщение>`)
      break
  }
}

async function sendReplyToUser(adminChatId: number, userId: string, message: string) {
  try {
    // Отправляем сообщение пользователю
    await bot.sendMessage(userId, `💬 Ответ от поддержки:\n\n${message}`)
    
    // Подтверждаем администратору
    await bot.sendMessage(adminChatId, `✅ Сообщение отправлено пользователю ${userId}`)
  } catch (error) {
    console.error('Error sending reply to user:', error)
    await bot.sendMessage(adminChatId, `❌ Ошибка при отправке сообщения пользователю ${userId}`)
  }
} 