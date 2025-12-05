'use client'

import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import AnimationContainer from '@/components/global/animation-container'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const handleImageUpload = async (file: File): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) throw new Error('File size exceeds 5MB')
  return URL.createObjectURL(file)
}

interface MenuBarProps {
  editor: ReturnType<typeof useEditor> | null
}

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null

  const HeadingDropdown = () => {
    const levels = [1, 2, 3, 4]
    const currentLevel = editor.isActive('paragraph')
      ? 0
      : levels.find(level => editor.isActive('heading', { level })) || 0
    const currentLabel = currentLevel === 0 ? 'Paragraph' : `H${currentLevel}`

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-secondary text-muted-foreground hover:bg-primary hover:text-primary border-border h-8 rounded-lg border px-2 text-xs"
          >
            {currentLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 boredr text-muted-foreground w-[120px] rounded-lg border p-1 text-xs shadow-xl backdrop-blur-sm">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cn(
              'hover:bg-primary hover:text-primary rounded-md px-2 py-1',
              currentLevel === 0 && 'bg-primary text-background',
            )}
          >
            Paragraph
          </DropdownMenuItem>
          {levels.map(level => (
            <DropdownMenuItem
              key={level}
              onClick={() => editor.chain().focus().setNode('heading', { level }).run()}
              className={cn(
                'hover:bg-primary hover:text-background rounded-md px-2 py-1',
                currentLevel === level && 'bg-primary text-background',
              )}
            >
              Heading {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const HighlightDropdown = () => {
    const colors = [
      { value: '#FFFF00', label: 'Yellow' },
      { value: '#FF0000', label: 'Red' },
      { value: '#00FF00', label: 'Green' },
      { value: '#0000FF', label: 'Blue' },
    ]
    const currentColor = editor.getAttributes('highlight').color || 'No Highlight'

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-secondary text-muted-foreground hover:text-primary hover:bg-primary border-border h-8 rounded-lg border px-2 text-xs"
          >
            {currentColor === 'No Highlight' ? 'Highlight' : currentColor}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-primary/10 bg-primary/10 dark:border-primary/10 dark:bg-background/10 w-[140px] rounded-lg p-1 text-xs shadow-xl backdrop-blur-sm">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            className={cn(
              'hover:bg-primary hover:text-primary-foreground rounded-md px-2 py-1',
              currentColor === 'No Highlight' && 'bg-primary text-primary-foreground',
            )}
          >
            No Highlight
          </DropdownMenuItem>
          {colors.map(({ value, label }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => editor.chain().focus().setHighlight({ color: value }).run()}
              className={cn(
                'hover:text-primary hover:bg-primary rounded-md px-2 py-1',
                currentColor === value && 'bg-primary text-primary-foreground',
              )}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const ImageUploadButton = () => (
    <Button
      size="sm"
      variant="outline"
      onClick={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = async e => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (file) {
            try {
              const url = await handleImageUpload(file)
              editor.chain().focus().setImage({ src: url, alt: file.name }).run()
            } catch (error) {
              console.error('Upload failed:', error)
            }
          }
        }
        input.click()
      }}
      className="bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground border-border h-8 rounded-lg border px-2 text-xs"
    >
      Image
    </Button>
  )

  const buttons = [
    { label: 'Bold', mark: 'bold' },
    { label: 'Italic', mark: 'italic' },
    { label: 'Underline', mark: 'underline' },
    { label: 'Strike', mark: 'strike' },
    { label: 'Bullet', command: 'toggleBulletList' },
    { label: 'Numbered', command: 'toggleOrderedList' },
    { label: 'Quote', command: 'toggleBlockquote' },
    { label: 'Code', command: 'toggleCodeBlock' },
    {
      label: 'Link',
      command: () => {
        const url = window.prompt('Enter URL')
        if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
      },
    },
    {
      label: 'Unlink',
      command: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
    },
  ]

  return (
    <AnimationContainer animation="fadeUp" delay={0.2}>
      <div className="bg-background/60 border-border flex flex-wrap gap-1 rounded-xl border p-2 backdrop-blur-sm">
        <HeadingDropdown />
        {buttons.map(({ label, mark, command, disabled }, i) => {
          const isActive = mark ? editor.isActive(mark) : false
          const canRun = command || (mark && editor.can().chain().focus().toggleMark?.(mark).run())
          return (
            <Button
              key={i}
              onClick={() =>
                command
                  ? typeof command === 'function'
                    ? command()
                    : command === 'toggleBulletList'
                      ? editor.chain().focus().toggleBulletList().run()
                      : command === 'toggleOrderedList'
                        ? editor.chain().focus().toggleOrderedList().run()
                        : command === 'toggleBlockquote'
                          ? editor.chain().focus().toggleBlockquote().run()
                          : command === 'toggleCodeBlock'
                            ? editor.chain().focus().toggleCodeBlock().run()
                            : undefined
                  : editor.chain().focus().toggleMark(mark!).run()
              }
              disabled={disabled || !canRun}
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              className={cn(
                'h-8 rounded-lg px-2 text-xs',
                isActive
                  ? 'bg-primary text-primary-foreground hover:bg-primary/80'
                  : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary border-border border',
              )}
            >
              {label}
            </Button>
          )
        })}
        <ImageUploadButton />
        <HighlightDropdown />
      </div>
    </AnimationContainer>
  )
}

interface EditorProps {
  content: string
  setContent: (content: string) => void
}

export default function TiptapEditor({ content, setContent }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Highlight.configure({ multicolor: true }),
    ],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  })

  return (
    <AnimationContainer animation="fadeUp" delay={0.3}>
      <div className="border-border bg-background rounded-2xl border p-4">
        <EditorContent
          editor={editor}
          className="prose prose-sm text-foreground dark:prose-invert min-h-[300px] max-w-full"
        />
        <MenuBar editor={editor} />
      </div>
    </AnimationContainer>
  )
}
