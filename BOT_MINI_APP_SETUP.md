# 🚀 Telegram Mini App Setup для 360° Travel

## 📋 Что нужно сделать:

### 1. Настройка бота для Mini App

Отправьте эти команды в @BotFather:

```
/setmenubutton
```

Выберите вашего бота `@travel360net_bot`

```
360° Travel Mini App
```

```
https://your-domain.com
```

### 2. Альтернативный способ - через команду

```
/setcommands
```

Выберите бота и отправьте:

```
start - 🚀 Открыть 360° Travel Mini App
help - 📖 Помощь по использованию
```

### 3. Настройка кнопки меню

```
/setmenubutton
```

Выберите бота и отправьте:

```
360° Travel
https://your-domain.com
```

## 🌐 Деплой на Vercel

1. **Создайте аккаунт на Vercel:**
   - Зайдите на https://vercel.com
   - Войдите через GitHub

2. **Подключите репозиторий:**
   - Нажмите "New Project"
   - Выберите ваш GitHub репозиторий
   - Нажмите "Deploy"

3. **Получите домен:**
   - После деплоя получите URL вида: `https://your-app.vercel.app`

4. **Обновите бота:**
   - Замените `your-domain.com` на ваш Vercel URL

## 🔧 Локальная разработка

Для тестирования Mini App локально:

1. **Установите ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Запустите приложение:**
   ```bash
   npm run dev
   ```

3. **Запустите ngrok:**
   ```bash
   ngrok http 3000
   ```

4. **Используйте ngrok URL в боте**

## 📱 Тестирование Mini App

1. **Откройте бота в Telegram**
2. **Нажмите кнопку меню или отправьте /start**
3. **Mini App откроется внутри Telegram**

## 🎯 Функции Mini App

✅ **Главный экран** с логотипом и слоганом
✅ **4 карточки услуг** (Отели, Авиабилеты, Аренда авто, Контакты)
✅ **Блок скидок** (-30% от официальных цен)
✅ **Форма отправки заявки** с валидацией
✅ **Раздел отзывов** с фото
✅ **Интеграция с Telegram API**
✅ **Адаптивный дизайн** под мобильные устройства

## 🔗 Полезные ссылки

- [Telegram WebApp Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Mini App Guidelines](https://core.telegram.org/bots/webapps#what-are-mini-apps)
- [Vercel Deployment](https://vercel.com/docs)

## 🚨 Важные моменты

1. **HTTPS обязателен** для Mini App
2. **Домен должен быть публичным**
3. **Telegram WebApp SDK** автоматически загружается
4. **Пользовательские данные** доступны через `window.Telegram.WebApp.initDataUnsafe.user`

## 🎉 Готово!

После настройки пользователи смогут:
- Открывать Mini App прямо в Telegram
- Выбирать услуги
- Отправлять заявки
- Просматривать отзывы
- Получать скидки до -30% 