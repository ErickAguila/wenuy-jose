'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Bath, BedDouble, House } from 'lucide-react'
import Image from 'next/image'
import houseImages from '@/data'
import photo1 from '@/assets/imgs/img1.jpg'
import photo2 from '@/assets/imgs/img2.jpg'
import photo3 from '@/assets/imgs/img3.webp'
import photo4 from '@/assets/imgs/img4.webp'
import photo5 from '@/assets/imgs/img5.jpeg'

export default function Gallery() {
  const images = [
    photo1,
    photo2,
    photo3,
    photo4,
    photo5,
  ]

  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section id="galeria" className="py-12 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Los alrededores</h2>
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-0 relative">
            <div className="relative aspect-video">
              <Image
                src={images[currentImage]}
                alt={`Habitación ${currentImage + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button variant="outline" size="icon" onClick={prevImage}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextImage}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <br />
        <h2 className="text-3xl font-bold mb-6 text-center">Nuestras cabañas</h2>
        <div className='flex justify-between bg-muted mb-3 rounded-sm p-4 font-bold'>
          <p className='text-xl'>Cabaña 1</p>
          <span className="flex"><BedDouble className="h-6 w-6 text-gray-500 mr-2" /> 3D</span>
          <span className="flex"><Bath className="h-6 w-6 text-gray-500 mr-2" /> 1B</span>
          <span className="flex"><House className="h-6 w-6 text-gray-500 mr-2" /> 60 m2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {
            houseImages.houseImages1.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Cabaña 1"
                objectFit="cover"
                width={500}
                height={300}
                className="w-full h-96 object-cover rounded-md"
              />
            ))
          }
        </div>
        <br />
        <div className='flex justify-between bg-muted mb-3 rounded-sm p-4 font-bold'>
          <p className='text-xl'>Cabaña 2</p>
          <span className="flex"><BedDouble className="h-6 w-6 text-gray-500 mr-2" /> 3D</span>
          <span className="flex"><Bath className="h-6 w-6 text-gray-500 mr-2" /> 1B</span>
          <span className="flex"><House className="h-6 w-6 text-gray-500 mr-2" /> 60 m2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {
            houseImages.houseImages2.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Cabaña 2"
                objectFit="cover"
                width={500}
                height={300}
                className="w-full h-96 object-cover rounded-md"
              />
            ))
          }
        </div>
        <br />
        <div className='flex justify-between bg-muted mb-3 rounded-sm p-4 font-bold'>
          <p className='text-xl'>Cabaña 3</p>
          <span className="flex"><BedDouble className="h-6 w-6 text-gray-500 mr-2" /> 3D</span>
          <span className="flex"><Bath className="h-6 w-6 text-gray-500 mr-2" /> 1B</span>
          <span className="flex"><House className="h-6 w-6 text-gray-500 mr-2" /> 60 m2</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {
            houseImages.houseImages3.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt="Cabaña 3"
                objectFit="cover"
                width={500}
                height={300}
                className="w-full h-96 object-cover rounded-md"
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

