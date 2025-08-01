import { Bot, QrCode, MessageCircle, CheckCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function BotStatus() {
  const botUsername = '@travel360net_bot'
  const botLink = 'https://t.me/travel360net_bot'
  
  return (
    <Card className="glass-card hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse-glow"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
              <Bot className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Telegram Bot
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">Бот активен и готов к работе</span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-2">Username бота:</p>
            <p className="font-mono text-lg font-bold text-gray-700">{botUsername}</p>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            <p>🚀 <strong>Команды бота:</strong></p>
            <div className="grid grid-cols-1 gap-1 text-xs">
              <span>• /start - Главное меню</span>
              <span>• /hotels - Поиск отелей</span>
              <span>• /flights - Поиск авиабилетов</span>
              <span>• /cars - Аренда авто</span>
              <span>• /contact - Связаться с нами</span>
              <span>• /rules - Правила и FAQ</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            asChild
          >
            <a href={botLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span>Открыть бота в Telegram</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 transition-all duration-300"
            asChild
          >
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(botLink)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5" />
              <span>Показать QR-код</span>
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 