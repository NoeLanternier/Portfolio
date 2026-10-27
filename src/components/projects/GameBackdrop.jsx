// Dark "Summoner's Rift" style backdrop shared by the overlay demo and the screenshot slides.
export default function GameBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(16,80,60,0.45),transparent_60%),radial-gradient(ellipse_at_30%_90%,rgba(120,60,20,0.3),transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:32px_32px]" />
    </>
  )
}
