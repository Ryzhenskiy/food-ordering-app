import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';
export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-8" id="about">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia
            qui culpa consequuntur libero placeat repellat quas sed, nobis ut
            enim doloremque aliquam, quasi inventore earum obcaecati
            voluptatibus nam corrupti sapiente!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            adipisci mollitia nostrum rerum deserunt earum neque libero atque
            delectus fugiat! Quod repudiandae corporis natus iusto eaque beatae
            minus perferendis nostrum!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero,
            facilis rem illo nulla doloribus qui ipsa animi. Tempore nulla
            maxime aliquam
          </p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a
            ahref="tel:+46738123123"
            className="text-4xl underline text-gray-500"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
