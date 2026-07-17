import { Link } from 'react-router-dom';

import CinemaSponsorSection from '../../components/home/CinemaSponsorSection';
import SponsorShelfSection from '../../components/home/SponsorShelfSection';
import Navbar from '../../components/ui/Navbar';
import { getSponsorShelfById } from '../../data/sponsors/sponsorShelves';

const homeShelfIds = ['oro', 'plata', 'bronce'];

export default function Home() {
  return (
    <main className="snef-page min-h-screen">
      <Navbar />

      <CinemaSponsorSection />

      {homeShelfIds.map((shelfId) => (
        <SponsorShelfSection
          key={shelfId}
          shelf={getSponsorShelfById(shelfId)}
        />
      ))}

      <section className="home-catalog-cta" aria-label="Cat\u00e1logo completo">
        <Link to="/catalogo" className="home-catalog-cta__button">
          Ver cat&aacute;logo completo
        </Link>
      </section>
    </main>
  );
}
