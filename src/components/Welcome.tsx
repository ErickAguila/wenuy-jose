import Image from "next/image"
import photoPortada from "@/assets/imgs/img1.jpg"

export default function Welcome() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden h-[600px]">
      <Image
        src={photoPortada}
        alt="Foto portada"
        fill
        objectFit="cover"
        className="absolute z-0"
      />
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">Cabañas Wenüy Jose</h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">Descubre el lujo y la comodidad en nuestro paraíso tropical</p>
      </div>
    </section>
  )
}

