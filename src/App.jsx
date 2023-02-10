import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // effect pointer move
  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }
    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }
    // cleanup
    // --> se ejecuta cuando el componente App se desmonta
    // --> se ejecuta cuando las dependencias del useEffect cambian (enabled o !enabled), antes de ejecutar el efecto nuevamente
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // effect body Classname from no cursor
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    // cleanup effect for change class
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (

    <>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px,${position.y}px)`
      }}
      />
      <button
        onClick={() => setEnabled(!enabled)}
      >
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
