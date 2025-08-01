# 🚀 Деплой Telegram Mini App для 360° Travel

## 📋 Пошаговая инструкция:

### 1. Создайте GitHub репозиторий

1. Зайдите на https://github.com
2. Нажмите "New repository"
3. Название: `travel360-mini-app`
4. Выберите "Public"
5. НЕ ставьте галочки (README, .gitignore, license)
6. Нажмите "Create repository"

### 2. Загрузите код в GitHub

```bash
# В терминале выполните:
git remote add origin https://github.com/YOUR_USERNAME/travel360-mini-app.git
git branch -M main
git push -u origin main
```

### 3. Деплой на Vercel

1. Зайдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите "New Project"
4. Выберите репозиторий `travel360-mini-app`
5. Нажмите "Deploy"

### 4. Получите домен

После деплоя получите URL вида:
`https://travel360-mini-app.vercel.app`

### 5. Настройте бота в BotFather

Отправьте в @BotFather:

```
/setmenubutton
```

Выберите вашего бота `@travel360net_bot`

```
360° Travel Mini App
```

```
https://travel360-mini-app.vercel.app
```

### 6. Альтернативный способ - через команды

```
/setcommands
```

Выберите бота и отправьте:

```
start - 🚀 Открыть 360° Travel Mini App
help - 📖 Помощь по использованию
```

## 🎯 Результат

После настройки:
- Пользователи нажмут кнопку в боте
- Откроется красивое Mini App прямо в Telegram
- Смогут выбирать услуги и отправлять заявки
- Получат скидки до -30%

## 🔧 Локальное тестирование

Для тестирования без деплоя:

1. Установите ngrok:
```bash
brew install ngrok
```

2. Запустите приложение:
```bash
npm run dev
```

3. В другом терминале:
```bash
ngrok http 3000
```

4. Используйте ngrok URL в BotFather

## 📱 Тестирование Mini App

1. Откройте бота в Telegram
2. Нажмите кнопку меню или отправьте /start
3. Mini App откроется внутри Telegram

## 🎉 Готово!

Ваш Telegram Mini App готов к использованию! 