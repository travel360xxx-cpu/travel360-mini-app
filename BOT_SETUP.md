# 🤖 Настройка Telegram Bot

## 📋 Требования

- Node.js 18+
- Публичный URL для webhook (можно использовать ngrok для локальной разработки)
- Telegram Bot Token

## 🚀 Быстрая настройка

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта:
```env
TELEGRAM_BOT_TOKEN=8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8
NEXT_PUBLIC_BOT_USERNAME=@travel360net_bot
NEXT_PUBLIC_BOT_LINK=https://t.me/travel360net_bot
```

### 3. Запуск приложения
```bash
npm run dev
```

### 4. Настройка Webhook (для продакшена)

#### Локальная разработка с ngrok:
```bash
# Установите ngrok
npm install -g ngrok

# Запустите туннель
ngrok http 3000

# Скопируйте HTTPS URL (например: https://abc123.ngrok.io)
```

#### Установка webhook:
```bash
curl -X POST "https://api.telegram.org/bot8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-domain.com/api/telegram",
    "allowed_updates": ["message", "callback_query"]
  }'
```

### 5. Проверка webhook
```bash
curl "https://api.telegram.org/bot8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8/getWebhookInfo"
```

## 📱 Команды бота

- `/start` - Главное меню с кнопками
- `/help` - Справка по командам
- `/hotels` - Поиск отелей
- `/flights` - Поиск авиабилетов
- `/cars` - Аренда автомобилей
- `/contact` - Связаться с поддержкой
- `/rules` - Правила и FAQ

## 🔧 Структура проекта

```
src/
├── app/
│   ├── api/
│   │   └── telegram/
│   │       └── route.ts          # Webhook handler
│   ├── page.tsx                  # Главная страница
│   └── layout.tsx                # Layout
├── components/
│   ├── BotStatus.tsx             # Компонент статуса бота
│   ├── TravelServiceCard.tsx     # Карточки услуг
│   └── ui/                       # UI компоненты
└── lib/
    └── utils.ts                  # Утилиты
```

## 🌐 Деплой

### Vercel
1. Подключите репозиторий к Vercel
2. Добавьте переменные окружения в настройках проекта
3. Установите webhook после деплоя

### Другие платформы
Аналогично настройте переменные окружения и webhook URL.

## 🔍 Отладка

### Проверка логов
```bash
# В консоли разработки
npm run dev

# В продакшене
# Проверьте логи вашей платформы хостинга
```

### Тестирование webhook
```bash
curl -X POST "https://your-domain.com/api/telegram" \
  -H "Content-Type: application/json" \
  -d '{
    "update_id": 123456789,
    "message": {
      "message_id": 1,
      "from": {"id": 123456, "first_name": "Test"},
      "chat": {"id": 123456, "type": "private"},
      "date": 1234567890,
      "text": "/start"
    }
  }'
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли
2. Убедитесь, что webhook установлен правильно
3. Проверьте доступность API endpoint
4. Убедитесь, что токен бота корректный

## 🔐 Безопасность

- Никогда не публикуйте токен бота в публичных репозиториях
- Используйте переменные окружения
- Регулярно обновляйте токен при необходимости
- Ограничьте доступ к API endpoint при необходимости 