import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" className="py-12 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Contacto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <a href="https://wa.me/56958766555?text=I'm%20interested%20in%20your%20car%20for%20sale" target="_blank" rel="noopener noreferrer">WhatsApp: +1 234 567 890</a>
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:info@hotelparadise.com">info@hotelparadise.com</a>
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                123 Playa Bonita, Ciudad Paraíso
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Ubicación</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835253576489!2d144.95372995060657!3d-37.81725397975177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sHotel!5e0!3m2!1sen!2sus!4v1623159342112!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title='Mapa'
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

