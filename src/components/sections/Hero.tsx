import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Knapp } from "@/components/ui/Knapp";

type Props = {
  merkelapp: string;
  overskrift: string;
  ingress: string;
  primaer?: { label: string; href: string };
  sekundaer?: { label: string; href: string };
};

export function Hero({ merkelapp, overskrift, ingress, primaer, sekundaer }: Props) {
  return (
    <section className="border-b border-[var(--color-kant)] py-20 sm:py-28">
      <Container>
        <Badge>{merkelapp}</Badge>
        <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {overskrift}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-[var(--color-dempet)]">{ingress}</p>
        {(primaer || sekundaer) && (
          <div className="mt-9 flex flex-wrap gap-3">
            {primaer && <Knapp href={primaer.href}>{primaer.label}</Knapp>}
            {sekundaer && (
              <Knapp href={sekundaer.href} variant="sekundær">
                {sekundaer.label}
              </Knapp>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
