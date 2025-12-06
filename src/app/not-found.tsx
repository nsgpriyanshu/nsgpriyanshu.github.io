'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Wrapper from '@/components/global/wrapper'
import AnimationContainer from '@/components/global/animation-container'
import { Ghost } from 'lucide-react'

type Ripple = { id: number; x: number; y: number; size: number; visible: boolean }

function InteractiveButton({ children, onClick, className, ...rest }: any) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const createRipple = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.2
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now() + Math.floor(Math.random() * 999)
    const r: Ripple = { id, x, y, size, visible: false }
    setRipples(prev => [...prev, r])
    // start animation next frame
    requestAnimationFrame(() => {
      setRipples(prev => prev.map(p => (p.id === id ? { ...p, visible: true } : p)))
    })
    // remove after animation
    setTimeout(() => setRipples(prev => prev.filter(p => p.id !== id)), 650)
  }

  return (
    <button
      ref={ref}
      {...rest}
      onClick={(e: any) => {
        createRipple(e)
        try {
          window.dispatchEvent(
            new CustomEvent('app:click', { detail: { x: e.clientX, y: e.clientY } }),
          )
        } catch {}
        onClick?.(e)
      }}
      className={`relative overflow-hidden rounded-md transition-transform duration-150 hover:scale-105 ${className ?? ''}`}
    >
      {children}
      {ripples.map(r => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            borderRadius: '50%',
            pointerEvents: 'none',
            background:
              typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(0,0,0,0.06)',
            transform: r.visible ? 'scale(1)' : 'scale(0)',
            opacity: r.visible ? 0 : 0.35,
            transition: 'transform 550ms cubic-bezier(.22,.9,.36,1), opacity 550ms linear',
          }}
        />
      ))}
    </button>
  )
}

export default function NotFound() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // load suggestions from localStorage
    try {
      const raw = localStorage.getItem('notfound:suggestions')
      if (raw) setSuggestions(JSON.parse(raw))
    } catch {}
    // autofocus
    const t = setTimeout(() => inputRef.current?.focus(), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    // keyboard shortcut: R for random
    const handler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') {
        e.preventDefault()
        goRandom()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const routes = ['/', '/blog', '/gallery', '/(home)']

  const saveSuggestion = (q: string) => {
    if (!q) return
    try {
      const next = [q, ...suggestions.filter(s => s !== q)].slice(0, 6)
      setSuggestions(next)
      localStorage.setItem('notfound:suggestions', JSON.stringify(next))
    } catch {}
  }

  const goRandom = () => {
    const r = routes[Math.floor(Math.random() * routes.length)]
    try {
      window.dispatchEvent(new CustomEvent('app:click', { detail: { x: null, y: null } }))
    } catch {}
    router.push(r)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    saveSuggestion(q)
    try {
      window.dispatchEvent(new CustomEvent('app:click', { detail: { x: null, y: null } }))
    } catch {}
    router.push(`/blog?search=${encodeURIComponent(q)}`)
  }

  return (
    <Wrapper className="flex min-h-screen items-center justify-center px-4">
      <AnimationContainer animation="fadeUp" delay={0.2}>
        <div className="bg-primary/5 dark:bg-background/10 w-full max-w-md rounded-3xl px-8 py-8 text-center shadow-xl backdrop-blur-sm">
          <div className="text-muted-foreground/90 mx-auto mb-3 inline-block h-16 w-16 transition-transform hover:scale-110">
            <Ghost className="h-16 w-16" />
          </div>
          <h1 className="text-foreground mb-2 text-3xl font-bold">Where did it go?</h1>
          <p className="text-muted-foreground mb-4 text-sm">
            Looks like the page dissolved into the void. Try searching or jump to a random page.
          </p>

          <form onSubmit={handleSearch} className="mb-3 flex gap-2">
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search blog posts"
              aria-label="Search blog posts"
              className="border-border bg-background/10 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
            />
            <InteractiveButton
              className="bg-foreground text-background px-3 py-2"
              onClick={handleSearch}
            >
              <span className="text-sm font-medium">Search</span>
            </InteractiveButton>
          </form>

          {suggestions.length > 0 && (
            <div className="mb-3 flex flex-wrap justify-center gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => {
                    setQuery(s)
                    saveSuggestion(s)
                    try {
                      window.dispatchEvent(
                        new CustomEvent('app:click', { detail: { x: null, y: null } }),
                      )
                    } catch {}
                    router.push(`/blog?search=${encodeURIComponent(s)}`)
                  }}
                  className="bg-background/10 border-border text-muted-foreground hover:bg-foreground/5 rounded-full border px-2 py-1 text-xs transition"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center justify-center gap-3">
            <InteractiveButton
              className="bg-foreground text-background px-3 py-2"
              onClick={() => router.push('/')}
            >
              <span className="text-sm font-medium">Go Home</span>
            </InteractiveButton>
            <InteractiveButton
              className="border-border text-foreground border px-3 py-2"
              onClick={goRandom}
            >
              <span className="text-sm">Surprise Me (R)</span>
            </InteractiveButton>
          </div>

          <p className="text-muted-foreground/70 mt-6 text-xs">Error code: 404 — interactive</p>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}
