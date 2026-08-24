import TopStrip from "@/components/TopStrip";
import Header from "@/components/Header";
import Nav from "@/components/Nav";


export default function Page() {
  return (
    <>  
      <TopStrip />
      <Header />
      <Nav />

      {/* HERO */}
      <section className="bg-neutral-50 border-b">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Trusted Agrochemicals from Sri Lanka’s Government Sector
          </h1>
          <p className="mt-4 text-lg text-neutral-700 max-w-3xl">
            CPC established the Agrochemicals Function in 1969. For over 50 years, Ceypetco
            Agrochemicals has served farmers with quality, safety and fair pricing.
          </p>
        </div>
      </section>

      {/* ABOUT (your full text, lightly cleaned for web readability) */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-12 space-y-6">
        <h2 className="text-2xl font-semibold">About Ceypetco Agrochemicals</h2>
        <div className="prose max-w-none">
          <p>
            Ceylon Petroleum Corporation (CPC) established an Agrochemicals Function in 1969.
            CPC has rendered unblemished service in the Agrochemicals Market over 50 years as a
            strategic Business Unit in the Ceypetco Marketing Function.
          </p>
          <p>
            Ceypetco Agrochemicals is the only government sector organization engaged in the
            agrochemicals business among other marketing companies. We are certified to ISO
            9001:2015 (Quality Management System) and ISO 14001:2015 (Environment Management
            System), and we have qualified for ISO 18001:2007 (Employee Health &amp; Safety,
            OSHAS) under guidance from the Sri Lanka Standards Institution. Our qualified and
            experienced staff is dedicated to maintaining high quality across our product range.
          </p>
          <p>
            We provide effective solutions from land preparation to harvest—controlling or
            eradicating pests, fungi and weeds. Our range includes Insecticides, Fungicides and
            Weedicides. Aligned with the national Green Agriculture concept, Ceypetco Agro is
            introducing world No.1 bio-pesticide <strong>Flipper</strong>. Our strategy focuses
            on fair prices with consistently higher quality than competitors.
          </p>
          <p>
            As a government institution and price moderator, we import and distribute
            “Ceypetco Glyphosate” under restricted conditions to recommended planters at
            reasonable prices to reduce production costs in tea and rubber plantations.
          </p>
          <p>
            We import quality agrochemicals, formulate, repack, store and market them while
            ensuring safe use in close collaboration with the Registrar of Pesticides, Department
            of Agriculture, and other institutions. We continually provide guidance to sellers,
            farmer organizations, Agrarian Service Centers and intermediaries.
          </p>
          <p>
            With new automated production machinery, we deliver defect-free products and a
            competitive advantage. Management prioritizes staff health, HSE practices and a high-
            quality working environment to uplift efficiency.
          </p>
          <p>
            Ceypetco Agrochemicals continues to fulfill organizational objectives as a strategic
            business unit of CPC, maintaining goodwill among farming communities.
          </p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Product Portfolio</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold mb-2">Insecticides</h3>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Profenophos 50% EC</li>
              <li>B.P.M.C. 50% EC</li>
              <li>Fipronil 0.3% G</li>
              <li>Fipronil 50 g/l SC</li>
              <li>Imidacloprid 200 g/l SC</li>
            </ul>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold mb-2">Weedicides</h3>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Diuron 80% WP</li>
              <li>Pretilachlor 30% EC</li>
              <li>Glyphosate 36% SL <span className="text-xs text-neutral-500">(Restricted)</span></li>
            </ul>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold mb-2">Fungicides</h3>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Tebuconazole 25% EW</li>
              <li>Mancozeb 80% WP</li>
              <li>Captan 50% WP</li>
              <li>Sulphur 80% WG</li>
            </ul>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="font-semibold mb-2">Bio-Insecticides</h3>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              <li>Flipper</li>
            </ul>
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section id="strategy" className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold mb-3">Business Strategy</h2>
        <p className="text-neutral-700 max-w-4xl">
          Provide high-quality agrochemicals at reasonable prices, deliver on time to where they
          are needed, and support farmers through a professional field-officer network across the
          island.
        </p>
      </section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold">Phone</div>
            <a className="block mt-1 hover:underline" href="tel:+94117296100">+94 117296100</a>
          </div>
          <div>
            <div className="font-semibold">Email</div>
            <a className="block mt-1 hover:underline" href="mailto:secratariat@ceypetco.gov.lk">
              secratariat@ceypetco.gov.lk
            </a>
          </div>
          <div>
            <div className="font-semibold">Address</div>
            <div className="mt-1">
              No.609, Dr. Danister de Silva Mawatha, Colombo 09.
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-neutral-500 pb-6">
          © {new Date().getFullYear()} Ceypetco Agrochemicals – CPC
        </div>
      </footer>
    </>
  );
}
