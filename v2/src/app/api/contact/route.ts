import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL as string
  const discordId = process.env.DISCORD_ID as string
  // Parse form data
  const formData = await req.formData()
  const name = formData.get('name')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const message = formData.get('message')?.toString() || ''

  // Prepare message for Discord
  const discordMessage = {
    content: `<@${discordId}>\nFROM PROTFOLIO\n**New Contact Form Submission**\n\n**Name:** ${name}\n**Email:** ${email}\n**Message:** ${message}`,
  }

  try {
    // Send message to Discord
    await axios.post(webhookUrl, discordMessage)

    // Handle attachments if they exist
    const attachments = formData.getAll('attachments') as File[]

    for (const attachment of attachments) {
      const fileData = new FormData()
      fileData.append('file', attachment, attachment.name)

      // Send each attachment as a separate message to Discord
      await axios.post(webhookUrl, fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    }

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending message to Discord:', error)
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 })
  }
}
