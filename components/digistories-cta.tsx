/* Digistories funnel — shown right after a score lands (peak motivation).
   Links to /go so the redirect + attribution live in one place. */
export function DigistoriesCta() {
  return (
    <section className="v-lightsout border-t border-hairline">
      <div className="mx-auto max-w-[820px] px-6 py-16 text-center sm:px-10 sm:py-20">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-tw-blue">
          Next step
        </p>
        <p
          className="mt-4 font-serif text-[clamp(1.5rem,3vw,2rem)] leading-[1.3] tracking-tight text-ink"
          style={{ fontVariationSettings: '"opsz" 144' }}
        >
          You cracked the algorithm.{" "}
          <span className="italic text-tw-blue">Now package the play.</span>
        </p>
        <p className="mx-auto mt-6 max-w-[52ch] text-[13.5px] leading-[1.6] text-ink-soft">
          Turn your best-scoring posts into a digital product that sells while
          you sleep. Digistories gives your ideas a home beyond the timeline.
        </p>
        <a
          href="/go"
          className="mt-8 inline-flex h-11 items-center rounded-full bg-tw-blue px-6 text-[14px] font-semibold text-white hover:bg-tw-blue-hover"
        >
          Build with Digistories ↗
        </a>
      </div>
    </section>
  );
}
