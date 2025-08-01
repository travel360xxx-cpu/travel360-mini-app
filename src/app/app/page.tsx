'use client'

import { useState, useEffect } from 'react'
import { Building2, Plane, Car, MessageCircle, Star, ExternalLink, Send, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Telegram WebApp SDK
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
          }
        }
        expand: () => void
        close: () => void
        ready: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          setText: (text: string) => void
          onClick: (callback: () => void) => void
        }
      }
    }
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'reviews' | 'submit'>('home')
  const [user, setUser] = useState<{
    id: number
    first_name: string
    last_name?: string
    username?: string
  } | null>(null)

  useEffect(() => {
    // Загружаем Telegram WebApp SDK
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-web-app.js'
    script.async = true
    script.onload = () => {
      // Инициализация Telegram WebApp
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
        
        const telegramUser = window.Telegram.WebApp.initDataUnsafe.user
        if (telegramUser) {
          setUser(telegramUser)
        }
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const services = [
    {
      icon: Building2,
      title: "Find Hotel",
      description: "Search and book hotels worldwide with the best prices and deals.",
      button: "Explore",
      action: () => setActiveTab('submit')
    },
    {
      icon: Plane,
      title: "Find Flight", 
      description: "Compare and book flights from hundreds of airlines worldwide.",
      button: "Search",
      action: () => setActiveTab('submit')
    },
    {
      icon: Car,
      title: "Car Rental",
      description: "Rent cars from trusted providers with flexible pickup locations.",
      button: "Rent",
      action: () => setActiveTab('submit')
    },
    {
      icon: MessageCircle,
      title: "Contact Us",
      description: "Get in touch with our travel experts for personalized assistance.",
      button: "Chat",
      action: () => setActiveTab('submit')
    }
  ]

  if (activeTab === 'reviews') {
    return <ReviewsTab onBack={() => setActiveTab('home')} />
  }

  if (activeTab === 'submit') {
    return <SubmitTab onBack={() => setActiveTab('home')} user={user} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white">
      {/* Header */}
      <div className="text-center pt-8 pb-6 px-4">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">360°</span>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">360° Travel</h1>
        <p className="text-lg text-purple-200 mb-1">Your Gateway to Global Adventures</p>
        <div className="flex items-center justify-center gap-1 mb-4">
          <Star className="w-4 h-4 text-yellow-300" />
          <span className="text-sm text-purple-200">Discover hotels, flights, cars and more worldwide</span>
          <Star className="w-4 h-4 text-yellow-300" />
        </div>
        <p className="text-sm text-purple-200">Plan your trip now - quickly and easily.</p>
      </div>

      {/* Discount Banner */}
      <div className="mx-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-yellow-900 text-xs font-bold">💡</span>
          </div>
                      <div>
              <p className="text-sm leading-relaxed text-center">
                <strong>We offer discounts up to -30%</strong> off the official prices by checking with our trusted agent network. Choose your desired option, send us a link, and we&apos;ll do the rest!
              </p>
            </div>
        </div>
      </div>

      {/* Customer Reviews Section - Moved to top */}
      <div className="px-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Customer Reviews</h3>
                  <p className="text-purple-200 text-sm">See what our clients say</p>
                </div>
              </div>
              <Button variant="ghost" className="text-white hover:bg-white/20" onClick={() => setActiveTab('reviews')}>
                View All
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Reviews Gallery - 30 reviews */}
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="text-white text-xs font-bold">⭐</div>
                    <div className="text-white text-xs">Review {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group" onClick={service.action}>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-1.5 pb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold tracking-tight text-white text-lg">{service.title}</h3>
                </div>
                <div className="pt-0">
                  <p className="text-purple-200 text-sm mb-4">{service.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 group-hover:scale-105 transition-all">
                    {service.button}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="px-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">ℹ️</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">О нас</h3>
                <p className="text-purple-200 text-sm">Узнайте больше о нашей компании</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-purple-200">
              <p>🚀 <strong>360° Travel</strong> - ваш надежный партнер в путешествиях с 2020 года</p>
              <p>🌟 Мы работаем с проверенными партнерами по всему миру</p>
              <p>💎 Предоставляем эксклюзивные скидки до -30% от официальных цен</p>
              <p>📞 Круглосуточная поддержка клиентов</p>
              <p>✅ Более 10,000 довольных клиентов</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Rules Section */}
      <div className="px-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">📋</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Правила заказа</h3>
                <p className="text-purple-200 text-sm">Как заказать услугу</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-purple-200">
              <p>1️⃣ Выберите нужную услугу (отель, авиабилет, аренда авто)</p>
              <p>2️⃣ Нажмите на кнопку и перейдите на сайт партнера</p>
              <p>3️⃣ Найдите подходящий вариант и скопируйте ссылку</p>
              <p>4️⃣ Отправьте ссылку нам через кнопку &quot;Contact Us&quot;</p>
              <p>5️⃣ Мы найдем лучшую цену и свяжемся с вами в Telegram</p>
              <p>6️⃣ После подтверждения бронируем и отправляем подтверждение</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 px-4">
        <p className="text-purple-200 text-sm">
          Powered by modern travel technology • Made with <Heart className="inline w-4 h-4 text-red-400" /> for travelers worldwide
        </p>
      </div>
    </div>
  )
}

function ReviewsTab({ onBack }: { onBack: () => void }) {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing service! Got a 25% discount on my hotel booking in Paris. Highly recommended!",
      avatar: "👩‍💼"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Best travel deals I've ever found. The team is very responsive and helpful.",
      avatar: "👨‍💻"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      comment: "Saved over $300 on my flight tickets. Will definitely use again!",
      avatar: "👩‍🎓"
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 5,
      comment: "Excellent customer service and great prices. Made my vacation planning so much easier.",
      avatar: "👨‍💼"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <Button variant="ghost" onClick={onBack} className="text-white">
          ← Back
        </Button>
        <h1 className="text-xl font-bold">Customer Reviews</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{review.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-purple-200 text-sm">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SubmitTab({ onBack, user }: { 
  onBack: () => void, 
  user: {
    id: number
    first_name: string
    last_name?: string
    username?: string
  } | null 
}) {
  const [service, setService] = useState('')
  const [link, setLink] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!service || !link) {
      console.log('❌ Service or link is missing:', { service, link })
      return
    }

    console.log('🚀 Submitting request:', { service, link, comment, user })

    try {
      // Отправляем заявку через наш API (временно используем тестовый endpoint)
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service,
          details: `Ссылка: ${link}\nКомментарий: ${comment || 'Не указан'}`,
          user
        })
      })

      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', response.headers)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Request submitted successfully:', result)
        setIsSubmitted(true)
      } else {
        const errorText = await response.text()
        console.error('❌ Error submitting request:', response.status, errorText)
        alert(`Ошибка при отправке заявки: ${response.status}`)
      }
    } catch (error) {
      console.error('❌ Error sending request:', error)
      alert('Ошибка сети при отправке заявки')
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Thank You!</h1>
          <p className="text-purple-200 mb-6">
            Your request has been submitted successfully. We&apos;ll contact you in Telegram soon!
          </p>
          <Button 
            onClick={onBack}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <Button variant="ghost" onClick={onBack} className="text-white">
          ← Back
        </Button>
        <h1 className="text-xl font-bold">Submit Request</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Get Your Discount</h2>
                      <p className="text-purple-200">Send us a link and we&apos;ll find you the best price!</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6 space-y-4">
            {/* Service Selection */}
            <div>
              <label className="block text-white font-medium mb-2">Select Service *</label>
              <div className="grid grid-cols-3 gap-2">
                {['Hotel', 'Flight', 'Car'].map((s) => (
                  <Button
                    key={s}
                    variant={service === s ? "default" : "outline"}
                    className={`w-full ${service === s ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
                    onClick={() => setService(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {/* Link Input */}
            <div>
              <label className="block text-white font-medium mb-2">Link to Offer *</label>
              <input
                type="url"
                placeholder="https://booking.com/hotel/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-white font-medium mb-2">Additional Comments</label>
              <textarea
                placeholder="Any special requirements or preferences..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!service || !link}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 