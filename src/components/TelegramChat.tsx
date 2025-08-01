'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, Search, MoreVertical, ArrowLeft } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  buttons?: Array<{
    text: string
    callback_data: string
  }>
}

export function TelegramChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🌟 Добро пожаловать в 360° Travel!\n\nЯ помогу вам найти лучшие предложения для путешествий:\n\n🏨 Отели по всему миру\n✈️ Авиабилеты от ведущих авиакомпаний\n🚗 Аренда автомобилей\n💬 Персональная поддержка\n\nВыберите нужную услугу:',
      isBot: true,
      timestamp: new Date(),
      buttons: [
        { text: '🏨 Отели', callback_data: 'hotels' },
        { text: '✈️ Авиабилеты', callback_data: 'flights' },
        { text: '🚗 Аренда авто', callback_data: 'cars' },
        { text: '💬 Контакты', callback_data: 'contact' },
        { text: '📘 Правила', callback_data: 'rules' }
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false)
      const botResponse = getBotResponse(inputText)
      setMessages(prev => [...prev, botResponse])
    }, 1000 + Math.random() * 2000)
  }

  const handleButtonClick = async (callbackData: string) => {
    const buttonMessage: Message = {
      id: Date.now().toString(),
      text: `Нажата кнопка: ${callbackData}`,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, buttonMessage])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const botResponse = getButtonResponse(callbackData)
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const getBotResponse = (text: string): Message => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('/start') || lowerText.includes('старт')) {
      return {
        id: Date.now().toString(),
        text: '🌟 Добро пожаловать в 360° Travel!\n\nЯ помогу вам найти лучшие предложения для путешествий:\n\n🏨 Отели по всему миру\n✈️ Авиабилеты от ведущих авиакомпаний\n🚗 Аренда автомобилей\n💬 Персональная поддержка\n\nВыберите нужную услугу:',
        isBot: true,
        timestamp: new Date(),
        buttons: [
          { text: '🏨 Отели', callback_data: 'hotels' },
          { text: '✈️ Авиабилеты', callback_data: 'flights' },
          { text: '🚗 Аренда авто', callback_data: 'cars' },
          { text: '💬 Контакты', callback_data: 'contact' },
          { text: '📘 Правила', callback_data: 'rules' }
        ]
      }
    }

    if (lowerText.includes('/help') || lowerText.includes('помощь')) {
      return {
        id: Date.now().toString(),
        text: '❓ Справка по командам:\n\n🏨 /hotels - Поиск и бронирование отелей\n✈️ /flights - Поиск авиабилетов\n🚗 /cars - Аренда автомобилей\n💬 /contact - Связаться с поддержкой\n📘 /rules - Правила и часто задаваемые вопросы\n❓ /help - Показать эту справку\n\nПросто отправьте команду или используйте кнопки в главном меню!',
        isBot: true,
        timestamp: new Date()
      }
    }

    return {
      id: Date.now().toString(),
      text: '👋 Привет! Я 360° Travel Bot - ваш помощник в путешествиях!\n\nДоступные команды:\n🏨 /hotels - Поиск отелей\n✈️ /flights - Поиск авиабилетов\n🚗 /cars - Аренда автомобилей\n💬 /contact - Связаться с нами\n📘 /rules - Правила и FAQ\n❓ /help - Помощь\n\nВыберите нужную услугу или используйте команду /help для получения справки.',
      isBot: true,
      timestamp: new Date()
    }
  }

  const getButtonResponse = (callbackData: string): Message => {
    switch (callbackData) {
      case 'hotels':
        return {
          id: Date.now().toString(),
          text: '🏨 Поиск отелей\n\nНайдите и забронируйте отели по всему миру с лучшими ценами!\n\n🔗 Перейдите на Booking.com для поиска:\nhttps://www.booking.com\n\n💡 Советы:\n• Бронируйте заранее для лучших цен\n• Проверяйте отзывы гостей\n• Обращайте внимание на расположение',
          isBot: true,
          timestamp: new Date()
        }
      case 'flights':
        return {
          id: Date.now().toString(),
          text: '✈️ Поиск авиабилетов\n\nСравните цены на авиабилеты от сотен авиакомпаний!\n\n🔗 Перейдите на Kayak для поиска:\nhttps://www.kayak.com\n\n💡 Советы:\n• Используйте гибкие даты для лучших цен\n• Подписывайтесь на уведомления о снижении цен\n• Проверяйте багажные правила авиакомпаний',
          isBot: true,
          timestamp: new Date()
        }
      case 'cars':
        return {
          id: Date.now().toString(),
          text: '🚗 Аренда автомобилей\n\nАрендуйте автомобили у проверенных провайдеров по всему миру!\n\n🔗 Перейдите на RentalCars.com:\nhttps://www.rentalcars.com\n\n💡 Советы:\n• Сравнивайте цены разных провайдеров\n• Проверяйте условия страхования\n• Учитывайте топливную политику',
          isBot: true,
          timestamp: new Date()
        }
      case 'contact':
        return {
          id: Date.now().toString(),
          text: '💬 Связаться с нами\n\nПолучите персональную помощь от наших экспертов!\n\n🔗 Наш Telegram канал:\nhttps://t.me/travel360net\n\n📧 Email: support@travel360.net\n\n⏰ Время работы: 24/7\n\nМы всегда готовы помочь с планированием вашего путешествия!',
          isBot: true,
          timestamp: new Date()
        }
      case 'rules':
        return {
          id: Date.now().toString(),
          text: '📘 Правила и FAQ\n\nОзнакомьтесь с нашими правилами и часто задаваемыми вопросами.\n\n🔗 Подробная информация:\nhttps://telegra.ph/360Travel-Rules-and-FAQ-08-01\n\n📋 Основные правила:\n• Все бронирования через внешние сервисы\n• Мы не взимаем комиссию за услуги\n• Поддержка доступна 24/7\n• Рекомендуем страхование путешествий',
          isBot: true,
          timestamp: new Date()
        }
      default:
        return {
          id: Date.now().toString(),
          text: '❓ Неизвестная команда\n\nИспользуйте /help для просмотра доступных команд или выберите услугу из главного меню.',
          isBot: true,
          timestamp: new Date()
        }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen telegram-bg">
      {/* Sidebar */}
      <div className="w-80 telegram-sidebar flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">360° Travel</h2>
              <p className="text-sm text-muted-foreground">@travel360net_bot</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск..."
              className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-white placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 bg-accent rounded-lg cursor-pointer hover:bg-accent/80 transition-colors">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">360° Travel Bot</h3>
                <p className="text-sm text-muted-foreground">Ваш помощник в путешествиях</p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col telegram-chat">
        {/* Chat Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-white">360° Travel</h2>
            <p className="text-sm text-muted-foreground">онлайн</p>
          </div>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div className={`telegram-message ${!message.isBot ? 'telegram-message-out' : ''}`}>
                <div className="flex items-start gap-2">
                  {message.isBot && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-white whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                
                {message.buttons && (
                  <div className="mt-3 space-y-2">
                    {message.buttons.map((button, index) => (
                      <button
                        key={index}
                        onClick={() => handleButtonClick(button.callback_data)}
                        className="w-full text-left p-2 bg-accent hover:bg-accent/80 rounded-lg transition-colors text-white text-sm"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="telegram-message">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Сообщение..."
              className="flex-1 telegram-input focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="telegram-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 