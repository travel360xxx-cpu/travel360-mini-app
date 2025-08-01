'use client'

import { useState, useEffect } from 'react'
import { Building2, Plane, Car, MessageCircle, Star, ExternalLink, Send, Users, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<'home' | 'reviews' | 'submit'>('home')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Инициализация Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
      
      const telegramUser = window.Telegram.WebApp.initDataUnsafe.user
      if (telegramUser) {
        setUser(telegramUser)
      }
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

      {/* Discount Info */}
      <div className="mx-4 mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-yellow-900 text-xs font-bold">💡</span>
          </div>
          <div>
            <p className="text-sm leading-relaxed">
              <strong>We offer discounts up to -30%</strong> off the official prices by checking with our trusted agent network. 
              Choose your desired option, send us a link, and we'll do the rest!
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              onClick={service.action}
            >
              <CardHeader className="pb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-purple-200 text-sm mb-4">
                  {service.description}
                </CardDescription>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 group-hover:scale-105 transition-all"
                >
                  {service.button}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Reviews Button */}
      <div className="px-4 mb-6">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Customer Reviews</h3>
                  <p className="text-purple-200 text-sm">See what our clients say</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={() => setActiveTab('reviews')}
              >
                View All
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
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

// Reviews Component
function ReviewsTab({ onBack }: { onBack: () => void }) {
  const reviews = [
    {
      id: 1,
      name: "Anna K.",
      comment: "Amazing service! Got my hotel 25% cheaper than on Booking.com",
      photos: ["/review1.jpg"],
      rating: 5
    },
    {
      id: 2, 
      name: "Mikhail S.",
      comment: "Fast response, great prices. Booked flight to Bali with 30% discount!",
      photos: ["/review2.jpg", "/review3.jpg"],
      rating: 5
    },
    {
      id: 3,
      name: "Elena V.",
      comment: "Professional team, helped me find perfect car rental in Italy",
      photos: ["/review4.jpg"],
      rating: 5
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

      <div className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">What Our Clients Say</h2>
          <p className="text-purple-200">All reviews are real from confirmed bookings</p>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-purple-200 mb-3">{review.comment}</p>
                
                {review.photos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">Photo {index + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Submit Request Component
function SubmitTab({ onBack, user }: { onBack: () => void, user: any }) {
  const [service, setService] = useState('')
  const [link, setLink] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!service || !link) return

    // Отправляем заявку в Telegram бот
    try {
      const message = `
🎯 Новая заявка от ${user?.first_name || 'Пользователя'}!

📋 Услуга: ${service}
🔗 Ссылка: ${link}
💬 Комментарий: ${comment || 'Не указан'}

👤 Пользователь: ${user?.first_name} ${user?.last_name || ''} (@${user?.username || 'без username'})
🆔 ID: ${user?.id || 'неизвестно'}
      `.trim()

      // Отправляем сообщение в бот
      await fetch(`https://api.telegram.org/bot8381245817:AAEXDwxX2Ygtvw1Idohmppw5Fg_K4g1bET8/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: user?.id || 'YOUR_CHAT_ID', // Замените на ваш chat_id
          text: message,
          parse_mode: 'HTML'
        })
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error sending request:', error)
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
            Your request has been submitted successfully. We'll contact you in Telegram soon!
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
          <p className="text-purple-200">Send us a link and we'll find you the best price!</p>
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
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Comment Input */}
            <div>
              <label className="block text-white font-medium mb-2">Comment (Optional)</label>
              <textarea
                placeholder="Any special requirements or preferences..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!service || !link}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
