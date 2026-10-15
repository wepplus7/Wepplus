import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Services } from './Services';
import { Portfolio } from './Portfolio';
import { About } from './About';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { useAppData } from '@/store/useAppData';

export function PublicSite() {
  const { data } = useAppData();

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Navbar settings={data.settings} />
      <Hero settings={data.settings} />
      <Services services={data.services} />
      <Portfolio projects={data.projects} />
      <About settings={data.settings} />
      <Contact settings={data.settings} />
      <Footer settings={data.settings} />
    </div>
  );
}
