import { images, type ImageName } from "~/content/images";

const srcset = (name: ImageName, fmt: "avif" | "webp") =>
  images[name].widths.map((w) => `/img/${name}-${w}.${fmt} ${w}w`).join(", ");

type Props = {
  name: ImageName;
  alt?: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  flipId?: string;
};

/** Responsive AVIF/WebP picture with intrinsic size (no layout shift). */
export function Picture({ name, alt = "", sizes, className, imgClassName, priority = false, flipId }: Props) {
  const img = images[name];
  const ws = img.widths;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcset(name, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, "webp")} sizes={sizes} />
      <img
        className={imgClassName}
        src={`/img/${name}-${ws[ws.length - 1]}.webp`}
        alt={alt}
        width={img.width}
        height={img.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        data-flip-id={flipId}
      />
    </picture>
  );
}

/** Hero photo with a separate portrait crop for phones. */
export function HeroPicture({ className }: { className?: string }) {
  const d = images.hero;
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" type="image/avif" srcSet={srcset("hero-m", "avif")} sizes="100vw" />
      <source media="(max-width: 767px)" type="image/webp" srcSet={srcset("hero-m", "webp")} sizes="100vw" />
      <source type="image/avif" srcSet={srcset("hero", "avif")} sizes="100vw" />
      <source type="image/webp" srcSet={srcset("hero", "webp")} sizes="100vw" />
      <img
        src="/img/hero-1920.webp"
        alt=""
        width={d.width}
        height={d.height}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  );
}
