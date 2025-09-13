import { effectScope, onScopeDispose } from 'vue'
import { useMouse, useWindowSize, useRafFn } from '@vueuse/core'

export default defineNuxtPlugin(() => {
    if (import.meta.server) return

    const scope = effectScope()
    scope.run(() => {
        const root = document.documentElement
        const body = document.body

        const GAP = 25
        const OFFSET = 9
        const BASE_RADIUS = GAP * 0.12

        const { x: mx, y: my } = useMouse({ type: 'client' })
        const { width, height } = useWindowSize()

        const canvas = document.createElement('canvas')
        canvas.className = 'dots-canvas-overlay'
        const ctx = canvas.getContext('2d', { alpha: true })
        if (!ctx) return

        Object.assign(canvas.style, {
            position: 'fixed',
            inset: '0',
            pointerEvents: 'none',
            zIndex: '0',
        } as CSSStyleDeclaration)
        body.appendChild(canvas)
        body.classList.add('dots-with-canvas')

        // Vorberechnete Spalten/Zeilen
        let colXs: number[] = []
        let rowYs: number[] = []
        function rebuildGrid() {
            colXs = []
            rowYs = []
            for (let x = OFFSET; x <= width.value + GAP; x += GAP) colXs.push(x)
            for (let y = OFFSET; y <= height.value + GAP; y += GAP) rowYs.push(y)
        }

        // DPR capped
        let dpr = 1
        function resizeCanvas() {
            dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
            canvas.width = Math.ceil(width.value * dpr)
            canvas.height = Math.ceil(height.value * dpr)
            canvas.style.width = `${width.value}px`
            canvas.style.height = `${height.value}px`
            ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
            rebuildGrid()
        }

        const smoothstep = (t: number) => t * t * (3 - 2 * t)

        let lastW = 0, lastH = 0, lastMx = -1, lastMy = -1
        let lastColor = '', lastZoom = -1, lastRadius = -1

        useRafFn(() => {
            const resized = width.value !== lastW || height.value !== lastH
            if (resized) {
                lastW = width.value
                lastH = height.value
                resizeCanvas()
            }

            const mxx = mx.value
            const myy = my.value

            const styles = getComputedStyle(root)
            const dotColor = (styles.getPropertyValue('--dot-color').trim() || 'rgba(208, 182, 161, 0.15)')
            const zoom = parseFloat(styles.getPropertyValue('--dot-zoom')) || 2
            const radius = parseFloat(styles.getPropertyValue('--mag-radius')) || 160

            const changed =
                resized ||
                mxx !== lastMx || myy !== lastMy ||
                dotColor !== lastColor || zoom !== lastZoom || radius !== lastRadius

            if (!changed) return

            lastMx = mxx; lastMy = myy
            lastColor = dotColor; lastZoom = zoom; lastRadius = radius

            ctx.clearRect(0, 0, width.value, height.value)
            ctx.fillStyle = dotColor

            for (const y of rowYs) {
                for (const x of colXs) {
                    const dx = x - mxx
                    const dy = y - myy
                    const dist = Math.hypot(dx, dy)
                    const t = Math.min(Math.max(dist / radius, 0), 1)
                    const r = BASE_RADIUS * (1 + (zoom - 1) * (1 - smoothstep(t)))
                    ctx.beginPath()
                    ctx.arc(x, y, r, 0, Math.PI * 2)
                    ctx.fill()
                }
            }
        })

        const cleanup = () => {
            body.classList.remove('dots-with-canvas')
            canvas.remove()
        }
        window.addEventListener('beforeunload', cleanup)
        onScopeDispose(() => {
            window.removeEventListener('beforeunload', cleanup)
            cleanup()
        })
    })
})