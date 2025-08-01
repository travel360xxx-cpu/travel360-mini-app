import { NextRequest, NextResponse } from 'next/server'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELEGRAM_BOT_TOKEN || '8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8'
const bot = new TelegramBot(token, { polling: false })

// ID чата для получения заявок
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID || '5556355354'

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

    console.log('✅ Message sent successfully')
    return NextResponse.json({ success: true, message: 'Заявка отправлена!' })
  } catch (error: unknown) {
    console.error('❌ Error submitting request:', error)
    
    // Более детальная обработка ошибок
    if (error && typeof error === 'object' && 'response' in error) {
      const telegramError = error as { response: { body?: { description?: string } } }
      console.error('📋 Telegram API error:', telegramError.response.body)
      return NextResponse.json(
        { error: `Ошибка Telegram API: ${telegramError.response.body?.description || 'Unknown error'}` }, 
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Ошибка при отправке заявки' }, 
      { status: 500 }
    )
  }
} 