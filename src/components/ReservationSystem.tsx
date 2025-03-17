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
import { es } from 'date-fns/locale'
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { MessageCircle } from 'lucide-react'

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
  const [reservedDays, setReservedDays] = useState<Date[]>([]);
  const [calendarDisabled, setCalendarDisabled] = useState<boolean>(true);
  const [btnReserved, setBtnReserved] = useState<boolean>(true);
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

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
  });

  const onFindCalendar = (data: z.infer<typeof FormSchema>) => {
    if (formRef.current) {
      if (data.house === '1') {
        setReservedDays(reservedHouse1);
      } else if (data.house === '2') {
        setReservedDays(reservedHouse2);
      } else {
        setReservedDays(reservedHouse3);
      }
      setFormFindCalendar({
        ...formFindCalendar,
        username: data.username,
        house: data.house,
        countPerson: data.countPerson
      });
      setCalendarDisabled(false);
    }
  };

  const onSubmit = () => {
    setFormFindCalendar({
      ...formFindCalendar,
      dateFrom: dateFrom,
      dateTo: dateTo,
    });
    document.getElementById('btnwsp')?.click();
  }

  const changeMessage = () => {
    const ref = `Hola soy ${formFindCalendar.username}, me interesa la cabaña ${formFindCalendar.house}, somos ${formFindCalendar.countPerson} personas, para las fechas del ${dateFrom} hasta el ${dateTo}.`.replaceAll(' ', '%20');
    setMessage(`https://wa.me/56958766555?text=${ref}`);
  }

  const monthCurrent = new Date().getMonth();
  const monthNext = new Date().getMonth() + 1;

  const reservedHouse1 = [
    new Date(2025, monthCurrent, 10),
    new Date(2025, monthCurrent, 11),
    new Date(2025, monthCurrent, 12),
    new Date(2025, monthCurrent, 20),
    new Date(2025, monthCurrent, 21),
    new Date(2025, monthCurrent, 22),
    new Date(2025, monthCurrent, 23),
    new Date(2025, monthCurrent, 24),
    new Date(2025, monthCurrent, 25),
    new Date(2025, monthCurrent, 26),
    new Date(2025, monthNext, 5),
    new Date(2025, monthNext, 6),
  ]

  const reservedHouse2 = [
    new Date(2025, monthNext, 10),
    new Date(2025, monthNext, 11),
    new Date(2025, monthNext, 12),
    new Date(2025, monthNext, 13),
    new Date(2025, monthNext, 14),
    new Date(2025, monthNext, 15)
  ]

  const reservedHouse3 = [
    new Date(2025, monthCurrent, 27),
    new Date(2025, monthCurrent, 28),
    new Date(2025, monthCurrent, 29),
    new Date(2025, monthCurrent, 30)
  ]

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (dateRange.from) setDateFrom(dateRange.from?.toLocaleDateString('es-ES', options) ?? "");
    if (dateRange.to) setDateTo(dateRange.to?.toLocaleDateString('es-ES', options) ?? "");
    changeMessage();
    setBtnReserved(dateRange.to ? false : true);
  }, [formFindCalendar, dateRange.from, dateRange.to, changeMessage]);

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
            disabled={calendarDisabled}
            numberOfMonths={2}
            fromDate={new Date()}
            components={{
              DayContent: ({ date, ...props }) => (
                <div {...props} className="relative">
                  {date.getDate()}
                  {reservedDays.some(reservedDate =>
                    reservedDate.getDate() === date.getDate() &&
                    reservedDate.getMonth() === date.getMonth() &&
                    reservedDate.getFullYear() === date.getFullYear()
                  ) && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
                    )}
                </div>
              ),
            }}
          />
          <div className="space-y-2">
            <p className="text-lg">Fecha de entrada</p>
            <p className='text-gray-500'>{dateFrom}</p>
            <p className="text-lg">Fecha de salida</p>
            <p className='text-gray-500'> {dateTo}</p>
            <Button className="w-full bg-[#075e54]" onClick={onSubmit} disabled={btnReserved}>Reservar ahora <MessageCircle /></Button>
            <a id='btnwsp' href={message} target="_blank" rel="noopener noreferrer" hidden>WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}

