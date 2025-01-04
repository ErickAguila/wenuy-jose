import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Promotions() {
  const promotions = [
    { title: 'Oferta de verano', description: '20% de descuento en estancias de 7 noches o más' },
    { title: 'Paquete romántico', description: 'Cena para dos y spa incluidos' },
    { title: 'Reserva anticipada', description: '15% de descuento al reservar con 3 meses de antelación' },
  ]

  return (
    <section id="promociones" className="py-12 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Promociones especiales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{promo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{promo.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

