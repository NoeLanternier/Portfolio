import { useEffect, useRef } from 'react'
import './DotGrid.css'

const GRID_SPACING = 25
const GRID_OFFSET = GRID_SPACING / 2
const INTERACTION_RADIUS = 160
const MINIMUM_EDGE_OPACITY = 0.12
const HOLD_DURATION = 50
const FADE_DURATION = 360
const MAX_DISPLACEMENT = 6
const BASE_OPACITY = 0.25
const PURPLE = '#a855f7'

function getPointEffect(distance) {
  const normalizedDistance = distance / INTERACTION_RADIUS
  const easedDistance = normalizedDistance ** 2 * (3 - 2 * normalizedDistance)

  return {
    opacity: MINIMUM_EDGE_OPACITY + (1 - MINIMUM_EDGE_OPACITY) * (1 - easedDistance),
    displacement: MAX_DISPLACEMENT * (1 - easedDistance),
  }
}

function drawPoint(context, x, y, intensity) {
  const radius = 1 + intensity * 1.6

  context.globalAlpha = BASE_OPACITY
  context.beginPath()
  context.arc(x, y, 1, 0, Math.PI * 2)
  context.fillStyle = PURPLE
  context.fill()

  context.globalAlpha = intensity
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)

  if (intensity > 0.1) {
    const highlight = context.createRadialGradient(
      x - radius * 0.4,
      y - radius * 0.45,
      radius * 0.05,
      x,
      y,
      radius,
    )
    highlight.addColorStop(0, '#d8b4fe')
    highlight.addColorStop(0.35, '#c084fc')
    highlight.addColorStop(0.75, PURPLE)
    highlight.addColorStop(1, '#7e22ce')
    context.fillStyle = highlight
  } else {
    context.fillStyle = PURPLE
  }

  context.fill()
}

export default function DotGrid() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const eventTarget = container.parentElement
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let lastHit = new Float64Array()
    let hitOpacity = new Float32Array()
    let displacementX = new Float32Array()
    let displacementY = new Float32Array()
    let activeIndexes = new Set()
    let animationFrame = null
    let previousPointer = null

    function resizeCanvas() {
      const bounds = container.getBoundingClientRect()
      const pixelRatio = window.devicePixelRatio || 1
      width = bounds.width
      height = bounds.height

      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(
        width ? canvas.width / width : pixelRatio,
        0,
        0,
        height ? canvas.height / height : pixelRatio,
        0,
        0,
      )

      columns = Math.ceil(width / GRID_SPACING)
      rows = Math.ceil(height / GRID_SPACING)
      lastHit = new Float64Array(columns * rows)
      hitOpacity = new Float32Array(columns * rows)
      displacementX = new Float32Array(columns * rows)
      displacementY = new Float32Array(columns * rows)
      activeIndexes = new Set()
      previousPointer = null
      drawHighlights()
    }

    function drawHighlights() {
      if (!canvas.width || !canvas.height) return

      const now = performance.now()
      context.clearRect(0, 0, width, height)

      for (const index of activeIndexes) {
        const elapsed = now - lastHit[index]
        if (elapsed >= HOLD_DURATION + FADE_DURATION) {
          activeIndexes.delete(index)
          continue
        }

        const fadeProgress = Math.max(0, (elapsed - HOLD_DURATION) / FADE_DURATION)
        const temporalOpacity = elapsed <= HOLD_DURATION
          ? 1
          : (1 - fadeProgress) ** 0.9
        const intensity = hitOpacity[index] * temporalOpacity
        const column = index % columns
        const row = Math.floor(index / columns)
        const x = column * GRID_SPACING + GRID_OFFSET
          + displacementX[index] * temporalOpacity
        const y = row * GRID_SPACING + GRID_OFFSET
          + displacementY[index] * temporalOpacity

        drawPoint(context, x, y, intensity)
      }

      context.globalAlpha = 1
      animationFrame = activeIndexes.size > 0
        ? window.requestAnimationFrame(drawHighlights)
        : null
    }

    function scheduleDraw() {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(drawHighlights)
      }
    }

    function illuminateAt(pointerX, pointerY, now) {
      const minColumn = Math.max(
        0,
        Math.floor((pointerX - INTERACTION_RADIUS - GRID_OFFSET) / GRID_SPACING),
      )
      const maxColumn = Math.min(
        columns - 1,
        Math.ceil((pointerX + INTERACTION_RADIUS - GRID_OFFSET) / GRID_SPACING),
      )
      const minRow = Math.max(
        0,
        Math.floor((pointerY - INTERACTION_RADIUS - GRID_OFFSET) / GRID_SPACING),
      )
      const maxRow = Math.min(
        rows - 1,
        Math.ceil((pointerY + INTERACTION_RADIUS - GRID_OFFSET) / GRID_SPACING),
      )

      for (let row = minRow; row <= maxRow; row += 1) {
        for (let column = minColumn; column <= maxColumn; column += 1) {
          const distanceX = column * GRID_SPACING + GRID_OFFSET - pointerX
          const distanceY = row * GRID_SPACING + GRID_OFFSET - pointerY
          const distance = Math.hypot(distanceX, distanceY)
          if (distance > INTERACTION_RADIUS) continue

          const { opacity, displacement } = getPointEffect(distance)
          const index = row * columns + column
          lastHit[index] = now
          hitOpacity[index] = opacity
          activeIndexes.add(index)
          displacementX[index] = distance === 0
            ? 0
            : (distanceX / distance) * displacement
          displacementY[index] = distance === 0
            ? 0
            : (distanceY / distance) * displacement
        }
      }
    }

    function handlePointerMove(event) {
      const bounds = container.getBoundingClientRect()
      const pointer = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      }
      const now = performance.now()

      if (previousPointer) {
        const deltaX = pointer.x - previousPointer.x
        const deltaY = pointer.y - previousPointer.y
        const distance = Math.hypot(deltaX, deltaY)
        const steps = Math.max(1, Math.ceil(distance / (GRID_SPACING / 2)))

        for (let step = 1; step <= steps; step += 1) {
          const progress = step / steps
          illuminateAt(
            previousPointer.x + deltaX * progress,
            previousPointer.y + deltaY * progress,
            now,
          )
        }
      } else {
        illuminateAt(pointer.x, pointer.y, now)
      }

      previousPointer = pointer
      scheduleDraw()
    }

    function handlePointerLeave() {
      previousPointer = null
    }

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(container)
    eventTarget.addEventListener('pointermove', handlePointerMove)
    eventTarget.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      resizeObserver.disconnect()
      eventTarget.removeEventListener('pointermove', handlePointerMove)
      eventTarget.removeEventListener('pointerleave', handlePointerLeave)
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="dot-grid" aria-hidden="true">
      <div className="dot-grid__base" />
      <canvas ref={canvasRef} className="dot-grid__highlight" />
    </div>
  )
}
