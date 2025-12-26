import { useEffect, useState, useRef } from "react"

export default function SpicesHeroSection() {
  const [position, setPosition] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cardBounds, setCardBounds] = useState(null)
  const [linePos, setLinePos] = useState({ perimeter: 0, animated: 0 })
  const lineRef = useRef({ targetPerimeter: 0 })
  const animationFrameRef = useRef(null)
  const lastTimeRef = useRef(Date.now())

  // Smooth animation loop with lerp for border movement - FIXED VERSION
  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const deltaTime = now - lastTimeRef.current
      
      // Only update if enough time has passed (throttle to ~60fps)
      if (deltaTime > 16) {
        lastTimeRef.current = now
        
        setPosition((prev) => (prev + 0.3) % 100)

        setLinePos((prev) => {
          const target = lineRef.current.targetPerimeter
          const lerp = (a, b, t) => a + (b - a) * t
          const newAnimated = lerp(prev.animated, target, 0.08)
          return {
            perimeter: target,
            animated: newAnimated,
          }
        })
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardBounds) {
        const x = Math.max(0, Math.min(e.clientX - cardBounds.left, cardBounds.width))
        const y = Math.max(0, Math.min(e.clientY - cardBounds.top, cardBounds.height))
        setCursorPosition({ x, y })
      }
    }

    const updateBounds = () => {
      const card = document.getElementById("spices-card")
      if (card) {
        const bounds = card.getBoundingClientRect()
        setCardBounds(bounds)
      }
    }

    // Initial bounds update
    const timeoutId = setTimeout(updateBounds, 100)
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("resize", updateBounds, { passive: true })
    window.addEventListener("scroll", updateBounds, { passive: true })
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", updateBounds)
      window.removeEventListener("scroll", updateBounds)
    }
  }, [cardBounds])

  useEffect(() => {
    if (!cardBounds) return
    const { x, y } = cursorPosition
    const { width, height } = cardBounds

    const distances = {
      top: y,
      right: width - x,
      bottom: height - y,
      left: x,
    }

    const closestSide = Object.keys(distances).reduce((a, b) => (distances[a] < distances[b] ? a : b))

    let perimeter = 0

    if (closestSide === "top") {
      perimeter = (x / width) * 25
    } else if (closestSide === "right") {
      perimeter = 25 + (y / height) * 25
    } else if (closestSide === "bottom") {
      perimeter = 50 + ((width - x) / width) * 25
    } else if (closestSide === "left") {
      perimeter = 75 + ((height - y) / height) * 25
    }

    lineRef.current.targetPerimeter = perimeter
  }, [cursorPosition, cardBounds])

  const getLineStyle = (perimeter, cardBounds) => {
    if (!cardBounds) return {}

    const { width, height } = cardBounds
    const lineLength = 100
    let style = {
      position: "absolute",
      pointerEvents: "none",
      transition: "all 0.2s ease-linear",
    }

    const p = perimeter % 100

    if (p < 25) {
      const pos = (p / 25) * 100
      style = {
        ...style,
        top: 0,
        left: `calc(${pos}% - ${lineLength / 2}px)`,
        width: `${lineLength}px`,
        height: "4px",
        background: "linear-gradient(90deg, transparent, blue, transparent)",
      }
    } else if (p < 50) {
      const pos = ((p - 25) / 25) * 100
      style = {
        ...style,
        right: 0,
        top: `calc(${pos}% - ${lineLength / 2}px)`,
        width: "4px",
        height: `${lineLength}px`,
        background: "linear-gradient(180deg, transparent, blue, transparent)",
      }
    } else if (p < 75) {
      const pos = ((p - 50) / 25) * 100
      style = {
        ...style,
        bottom: 0,
        right: `calc(${pos}% - ${lineLength / 2}px)`,
        width: `${lineLength}px`,
        height: "4px",
        background: "linear-gradient(90deg, transparent, blue, transparent)",
      }
    } else {
      const pos = ((p - 75) / 25) * 100
      style = {
        ...style,
        left: 0,
        top: `calc(100% - ${pos}% - ${lineLength / 2}px)`,
        width: "4px",
        height: `${lineLength}px`,
        background: "linear-gradient(180deg, transparent, blue, transparent)",
      }
    }

    return style
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative pt-24 sm:pt-32 md:pt-40 lg:pt-52 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pb-12 sm:pb-16 md:pb-20">
        <div className="hidden md:block absolute bottom-16 md:bottom-24 lg:bottom-32 left-8 md:left-12 lg:left-20 w-[300px] md:w-[400px] lg:w-[550px] h-[300px] md:h-[400px] lg:h-[550px] bg-white/10 rounded-full"></div>

        <div
          id="spices-card"
          className="relative bg-[#ececec] rounded-3xl sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden min-h-[500px] sm:min-h-[550px] md:min-h-[600px]"
        >
          <div className="absolute pointer-events-none" style={getLineStyle(linePos.animated, cardBounds)}></div>

          <div
            className="absolute top-8 sm:top-12 md:top-16 lg:top-20 right-8 sm:right-16 md:right-24 lg:right-32 w-32 sm:w-48 md:w-64 lg:w-80 h-32 sm:h-48 md:h-64 lg:h-80 bg-white rounded-full shadow-lg will-change-transform"
            style={{
              transform: `
                translateY(${Math.sin(position * 0.08) * 25}px)
                translateX(${Math.cos(position * 0.06) * 15}px)
                scale(${1 + Math.sin(position * 0.04) * 0.05})
                rotate(${Math.sin(position * 0.05) * 2}deg)
              `,
            }}
          ></div>

          <div
            className="absolute -bottom-12 sm:-bottom-16 md:-bottom-20 lg:-bottom-24 left-1/4 sm:left-1/3 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-white/60 rounded-full shadow-lg will-change-transform"
            style={{
              transform: `
                translateY(${Math.sin(position * 0.05) * 35}px)
                translateX(${Math.cos(position * 0.04) * 20}px)
                scale(${1 + Math.cos(position * 0.03) * 0.05})
                rotate(${Math.cos(position * 0.06) * 3}deg)
              `,
            }}
          ></div>

          <div
            className="hidden sm:block absolute top-20 sm:top-32 md:top-40 left-1/2 w-32 sm:w-40 md:w-48 lg:w-60 h-32 sm:h-40 md:h-48 lg:h-60 bg-white/80 rounded-full shadow-lg will-change-transform"
            style={{
              transform: `
                translateY(${Math.sin(position * 0.07) * 30}px)
                translateX(${Math.cos(position * 0.05) * 25}px)
                scale(${1 + Math.sin(position * 0.05) * 0.04})
                rotate(${Math.sin(position * 0.07) * 4}deg)
              `,
            }}
          ></div>

          <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-28">
            <h1
              className="text-gray-600 font-bold leading-[0.88] text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
              style={{ letterSpacing: "-0.025em" }}
            >
              At the Forefront of <br />
              Communication <br />
              Innovation
            </h1>

            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 max-w-3xl"></div>
          </div>

          <div
            className="absolute bottom-0 -left-24 sm:-left-32 md:-left-40 lg:-left-48 w-[250px] sm:w-[350px] md:w-[450px] lg:w-[600px] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[600px]"
            style={{ transform: "translateY(30%)" }}
          >
            <img src="/Globe-5.png" alt="Wireframe globe" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  )
}