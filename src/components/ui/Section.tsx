import { Container } from "./Container";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  overskrift?: string;
  ingress?: string;
  children: React.ReactNode;
  className?: string;
};

/** Standard seksjon med luft, overskrift og ingress. Brukes på alle sider
 *  så rytmen i layouten blir lik overalt. */
export function Section({ id, overskrift, ingress, children, className }: Props) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>
        {overskrift && (
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{overskrift}</h2>
            {ingress && <p className="mt-3 text-[var(--color-dempet)]">{ingress}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
