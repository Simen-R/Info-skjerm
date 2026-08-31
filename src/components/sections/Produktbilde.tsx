import Image from "next/image";
import { Container } from "@/components/ui/Container";

type Props = {
  src: string;
  alt: string;
  bildetekst: string;
  prioritet?: boolean;
};

/** Mockup-bilde i full bredde med bildetekst under. */
export function Produktbilde({ src, alt, bildetekst, prioritet = false }: Props) {
  return (
    <Container>
      <figure>
        <div className="overflow-hidden rounded-[var(--radius-kort)] border border-[var(--color-kant)] bg-[var(--color-flate)]">
          <Image
            src={src}
            alt={alt}
            width={1535}
            height={1024}
            priority={prioritet}
            sizes="(max-width: 768px) 100vw, 1024px"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-sm text-[var(--color-dempet)]">{bildetekst}</figcaption>
      </figure>
    </Container>
  );
}
