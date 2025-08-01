import { NextRequest, NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8'
const bot = new TelegramBot(token, { polling: false })

// ID чата для получения заявок (замените на ваш ID)
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '123456789'

export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'Submit Request API is working',
    admin_chat_id: ADMIN_CHAT_ID,
    bot_token: token ? 'Set' : 'Not set'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, details, user } = body

    console.log('📥 Received request:', { service, details, user })

    // Проверяем обязательные поля
    if (!service || !details) {
      console.error('❌ Missing required fields:', { service, details })
      return NextResponse.json(
        { error: 'Отсутствуют обязательные поля' }, 
        { status: 400 }
      )
    }

    // Формируем сообщение для администратора
    const message = `🎯 Новая заявка от пользователя!

👤 Пользователь: ${user?.first_name || 'Неизвестно'} ${user?.last_name || ''}
🆔 ID: ${user?.id || 'Неизвестно'}
👤 Username: @${user?.username || 'Не указан'}

📋 Услуга: ${service}
📝 Детали: ${details}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`

    console.log('📤 Sending message to admin:', ADMIN_CHAT_ID)

    // Проверяем, что ADMIN_CHAT_ID не является placeholder
    if (ADMIN_CHAT_ID === '123456789') {
      console.warn('⚠️ ADMIN_CHAT_ID is placeholder, sending to bot owner instead')
      
      // Отправляем сообщение без inline keyboard для тестирования
      await bot.sendMessage(ADMIN_CHAT_ID, message)
    } else {
      // Отправляем заявку администратору с inline keyboard
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
    }

    console.log('✅ Message sent successfully')
    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error) {
    console.error('❌ Error submitting request:', error)
    
    // Более детальная обработка ошибок
    if (error.response) {
      console.error('📋 Telegram API error:', error.response.body)
      return NextResponse.json(
        { error: `Ошибка Telegram API: ${error.response.body.description || 'Unknown error'}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки' }, 
      { status: 500 }
    )
  }
} 