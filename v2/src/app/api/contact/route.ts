import { NextRequest, NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON request body
    const { name, email, message } = await req.json()

    // Validate the request body
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 })
    }

    // Check if the webhook URL is available
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { success: false, message: 'Discord Webhook URL is not defined' },
        { status: 500 },
      )
    }

    // Prepare the message for Discord
    const discordMessage = {
      content: `**New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:**\n${message}`,
    }

    // Send the message to Discord
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    })

    // Check if the response was successful
    if (discordResponse.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' })
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send message to Discord' },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error('Error sending message to Discord:', error)

    return NextResponse.json(
      { success: false, message: 'Error sending message to Discord' },
      { status: 500 },
    )
  }
}