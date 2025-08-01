import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TravelServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  buttonText: string
  href: string
  className?: string
  delay?: number
}

export function TravelServiceCard({
  icon: Icon,
  title,
  description,
  buttonText,
  href,
  className,
  delay = 0
}: TravelServiceCardProps) {
  return (
    <Card 
      className={`glass-card hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-in-up ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse-glow"></div>
            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-full">
              <Icon className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-8 text-sm leading-relaxed">{description}</p>
        <Button 
          variant="outline" 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          asChild
        >
          <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <span>{buttonText}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </Button>
      </CardContent>
    </Card>
  )
} 