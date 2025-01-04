'use client'

import { useEffect, useRef, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { da, es } from 'date-fns/locale'
import { useForm } from 'react-hook-form';
import { z } from "zod"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Debe tener al menos 2 caracteres.",
  }),
  house: z.string({
    required_error: "Seleccione una cabaña.",
  }),
  countPerson: z.string({
    required_error: "Seleccione cantidad de personas.",
  }),
});

export default function ReservationSystem() {
  const [formFindCalendar, setFormFindCalendar] = useState({
    username: "",
    house: "",
    countPerson: "",
    dateFrom: "",
    dateTo: "",
  });
  const [message, setMessage] = useState<string>('');
  const formRef = useRef<HTMLFormElement | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: ""
    },
  });

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Create the handler that connects to EmailJS.  
  const onFindCalendar = (data: z.infer<typeof FormSchema>) => {
    if (formRef.current) {
      setFormFindCalendar({
        ...formFindCalendar,
        username: data.username,
        house: data.house,
        countPerson: data.countPerson
      });
    }
  };

  const onSubmit = () => {
    setFormFindCalendar({
      ...formFindCalendar,
      dateFrom: dateRange.from?.toLocaleDateString('es-ES', options) ?? "",
      dateTo: dateRange.to?.toLocaleDateString('es-ES', options) ?? "",
    });
    console.log(formFindCalendar);
    document.getElementById('btnwsp')?.click();
  }

  const changeMessage = () => {
    const daFrom = dateRange.from?.toLocaleDateString('es-ES', options);
    const daTo = dateRange.to?.toLocaleDateString('es-ES', options);
    const mess = `Hola soy ${formFindCalendar.username}, me interesa la cabaña ${formFindCalendar.house}, somos ${formFindCalendar.countPerson} personas, para las fechas del ${daFrom} hasta el ${daTo}.`.replaceAll(' ', '%20');
    setMessage(`https://wa.me/56958766555?text=${mess}`);
    // console.log(message)
  }

  const reservados = [
    '2025-01-15',
    '2025-01-20',
    '2025-01-25',
  ]; // Fechas reservadas en formato YYYY-MM-DD
  
  // Función para verificar si una fecha está reservada
  const estaReservado = (fecha: string) => {
    return reservados.includes(fecha);
  };

  useEffect(() => { 
    changeMessage();
  }, [formFindCalendar, dateRange.from, dateRange.to]);

  return (
    <section id="reserva" className="py-12 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Busca tu estadía</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(onFindCalendar)}
              className="w-2/3 space-y-6 md:w-1/3">
              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tu nombre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Cabaña</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una cabaña" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Cabaña 1</SelectItem>
                        <SelectItem value="2">Cabaña 2</SelectItem>
                        <SelectItem value="3">Cabaña 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="countPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Cantidad de personas</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona la cantidad de personas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="7">7</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-xs text-red-600" />
                  </FormItem>
                )} />
              <Button
                type="submit"
                className="w-full text-md text-white">
                Buscar disponibilidad
              </Button>
            </form>
          </Form>

          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
            className="rounded-md border"
            locale={es}
            onDayClick={() => changeMessage()}
            // disabled
            // style={{ backgroundColor: 'red' }}
            numberOfMonths={2}
            fromDate={new Date()}
            
            // render={(date) => {
            //   const fechaFormateada = date.toISOString().split('T')[0]; // Convertimos la fecha a YYYY-MM-DD
            //   return (
            //     <div style={{ position: 'relative' }}>
            //       {estaReservado(fechaFormateada) && (
            //         <div
            //           style={{
            //             position: 'absolute',
            //             top: '5px',
            //             left: '5px',
            //             width: '8px',
            //             height: '8px',
            //             borderRadius: '50%',
            //             backgroundColor: 'red',
            //           }}
            //         ></div>
            //       )}
            //       {date.getDate()}
            //     </div>
            //   );
            // }}
          />
          <div className="space-y-2">
            <p className="text-lg">Fecha de entrada</p>
            <p className='text-gray-500'>{dateRange.from?.toLocaleDateString('es-ES', options)}</p>
            <p className="text-lg">Fecha de salida</p>
            <p className='text-gray-500'> {dateRange.to?.toLocaleDateString('es-ES', options)}</p>
            <Button className="w-full" onClick={onSubmit}>Reservar ahora</Button>
            <a id='btnwsp' href={message} target="_blank" rel="noopener noreferrer" hidden>WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

