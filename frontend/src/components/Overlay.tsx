interface OverlayProps {
    onClick: () => void
}

export default function Overlay({ onClick }: OverlayProps) {
  return (
    <div className='fixed top-0 left-0 w-[100%] h-full bg-black opacity-80 z-4' onClick={onClick}>

    </div>
  )
}
