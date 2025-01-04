import Header from "@/components/Header"
import Welcome from "@/components/Welcome"
import ReservationSystem from "@/components/ReservationSystem"
import Promotions from "@/components/Promotions"
import Gallery from "@/components/Gallery"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Welcome />
        <ReservationSystem />
        <Promotions />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
