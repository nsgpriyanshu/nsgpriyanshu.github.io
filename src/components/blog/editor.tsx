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

// Utility function for image upload
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const handleImageUpload = async (file: File): Promise<string> => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB')
  }
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
            className={cn(
              'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground border-primary/10 h-8 rounded-lg px-2 text-xs',
            )}
            aria-label="Select heading level"
          >
            {currentLabel}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-secondary text-muted-foreground w-[120px] p-1 text-xs">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cn(
              'hover:bg-primary hover:text-primary-foreground',
              currentLevel === 0 && 'bg-primary text-primary-foreground',
            )}
          >
            Paragraph
          </DropdownMenuItem>
          {levels.map(level => (
            <DropdownMenuItem
              key={level}
              onClick={() => editor.chain().focus().setNode('heading', { level }).run()}
              className={cn(
                'hover:bg-primary hover:text-primary-foreground',
                currentLevel === level && 'bg-primary text-primary-foreground',
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
            className={cn(
              'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground border-primary/10 h-8 rounded-lg px-2 text-xs',
            )}
            aria-label="Select highlight color"
          >
            {currentColor === 'No Highlight' ? 'Highlight' : currentColor}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-secondary text-muted-foreground w-[140px] p-1 text-xs">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().unsetHighlight().run()}
            className={cn(
              'hover:bg-primary hover:text-primary-foreground',
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
                'hover:bg-primary hover:text-primary-foreground',
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
      className={cn(
        'bg-secondary text-muted-foreground hover:bg-primary hover:text-primary-foreground border-primary/10 h-8 rounded-lg px-2 text-xs',
      )}
      aria-label="Upload image"
    >
      Image
    </Button>
  )

  const buttons = [
    {
      label: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      ariaLabel: 'Toggle bold',
    },
    {
      label: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      ariaLabel: 'Toggle italic',
    },
    {
      label: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      disabled: !editor.can().chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
      ariaLabel: 'Toggle underline',
    },
    {
      label: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      ariaLabel: 'Toggle strikethrough',
    },
    {
      label: 'Bullet',
      action: () => editor.chain().focus().toggleBulletList().run(),
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
      ariaLabel: 'Toggle bullet list',
    },
    {
      label: 'Numbered',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
      ariaLabel: 'Toggle numbered list',
    },
    {
      label: 'Quote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: !editor.can().chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
      ariaLabel: 'Toggle blockquote',
    },
    {
      label: 'Code',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
      ariaLabel: 'Toggle code block',
    },
    {
      label: 'Link',
      action: () => {
        const url = window.prompt('Enter URL')
        if (url) {
          editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
        }
      },
      disabled: false,
      isActive: editor.isActive('link'),
      ariaLabel: 'Add link',
    },
    {
      label: 'Unlink',
      action: () => editor.chain().focus().unsetLink().run(),
      disabled: !editor.isActive('link'),
      isActive: false,
      ariaLabel: 'Remove link',
    },
  ]

  return (
    <AnimationContainer animation="fadeUp" delay={0.2}>
      <div className="border-primary/10 bg-background/50 sticky bottom-0 z-10 mt-3 flex flex-wrap gap-1 rounded-lg border p-2">
        <HeadingDropdown />
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={button.action}
            disabled={button.disabled}
            size="sm"
            variant={button.isActive ? 'default' : 'outline'}
            className={cn(
              'h-8 rounded-lg px-2 text-xs',
              button.isActive
                ? 'bg-primary text-primary-foreground hover:bg-primary/50'
                : 'bg-secondary text-muted-foreground hover:bg-primary hover:text-muted-background border-primary/10',
            )}
            aria-label={button.ariaLabel}
          >
            {button.label}
          </Button>
        ))}
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
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: { class: 'list-disc pl-6' },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: { class: 'list-decimal pl-6' },
        },
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
      <div className="border-primary/10 bg-background rounded-2xl border p-4">
        <EditorContent
          editor={editor}
          className={cn('prose prose-sm text-primary min-h-[300px] max-w-full')}
        />
        <MenuBar editor={editor} />
      </div>
    </AnimationContainer>
  )
}
