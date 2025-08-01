import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'OK', 
    message: 'Test API is working',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    return NextResponse.json({ 
      status: 'OK', 
      message: 'Test POST is working',
      received_data: body,
      timestamp: new Date().toISOString()
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      status: 'ERROR', 
      message: 'Test POST failed',
      error: errorMessage
    }, { status: 500 })
  }
} 