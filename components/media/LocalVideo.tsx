interface LocalVideoProps {
  src: string;
  caption?: string;
  poster?: string;
  autoplay?: boolean;
}

export default function LocalVideo({ src, caption, poster, autoplay = true }: LocalVideoProps) {
  return (
    <figure className="w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
      <video
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted
        loop
        playsInline
        controls={!autoplay}
        className="w-full block"
        onError={(e) => {
          const target = e.currentTarget as HTMLVideoElement;
          target.style.display = "none";
          const placeholder = target.nextElementSibling as HTMLElement;
          if (placeholder) placeholder.style.display = "flex";
        }}
      />
      <div
        className="hidden items-center justify-center h-48 bg-slate-100 text-slate-400 text-sm"
        aria-hidden="true"
      >
        <div className="text-center">
          <div className="text-2xl mb-2">▶</div>
          <p>Walkthrough video — drop MP4 at <code className="text-xs bg-slate-200 px-1.5 py-0.5 rounded">{src}</code></p>
        </div>
      </div>
      {caption && (
        <figcaption className="px-4 py-2.5 text-xs text-slate-500 border-t border-slate-200 bg-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
