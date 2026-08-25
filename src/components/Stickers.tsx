type StickerItem = {
  emoji: string;
  className: string;
  rotate?: number;
  delay?: number;
};

export function Stickers({ items }: { items: StickerItem[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((item, i) => (
        <span
          key={i}
          className={`sticker absolute select-none text-4xl ${item.className}`}
          style={{
            ["--sticker-rotate" as string]: `${item.rotate ?? 0}deg`,
            transform: `rotate(${item.rotate ?? 0}deg)`,
            animationDelay: `${item.delay ?? 0}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
