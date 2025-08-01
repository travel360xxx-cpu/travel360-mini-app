import { NextRequest, NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8'
const bot = new TelegramBot(token, { polling: false })

// ID чата для получения заявок (замените на ваш ID)
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '123456789'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, details, user } = body

    // Формируем сообщение для администратора
    const message = `🎯 Новая заявка от пользователя!

👤 Пользователь: ${user?.first_name || 'Неизвестно'} ${user?.last_name || ''}
🆔 ID: ${user?.id || 'Неизвестно'}
👤 Username: @${user?.username || 'Не указан'}

📋 Услуга: ${service}
📝 Детали: ${details}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`

    // Отправляем заявку администратору
    await bot.sendMessage(ADMIN_CHAT_ID, message, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Принять', callback_data: `accept_${user?.id || 'unknown'}` },
            { text: '❌ Отклонить', callback_data: `reject_${user?.id || 'unknown'}` }
          ],
          [
            { text: '💬 Ответить', callback_data: `reply_${user?.id || 'unknown'}` }
          ]
        ]
      }
    })

    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error) {
    console.error('Error submitting request:', error)
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки' }, 
      { status: 500 }
    )
  }
} 