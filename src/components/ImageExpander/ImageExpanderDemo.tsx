import { ImageExpander } from './ImageExpander';

export function ImageExpanderDemo() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=1176&auto=format&fit=crop",
      caption: "Serene Forest",
      alt: "Forest landscape"
    },
    {
      url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=687&auto=format&fit=crop",
      caption: "Sunlight through Trees",
      alt: "Sunlight"
    },
    {
      url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=687&auto=format&fit=crop",
      caption: "Nature's Waterfall",
      alt: "Waterfall"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {images.map((img, index) => (
        <div key={index} className="flex flex-col gap-3">
          <ImageExpander 
            caption={img.caption}
            className="aspect-[3/4]"
            full={
              <img 
                src={img.url} 
                alt={img.alt}
                className="w-auto h-auto" 
              />
            }
          >
            <img 
              src={img.url} 
              alt={img.alt}
              className="w-full h-full object-cover"
            />
          </ImageExpander>
          <span className="text-xs font-medium text-ds-400 dark:text-ds-500 text-center uppercase tracking-widest">{img.caption}</span>
        </div>
      ))}
    </div>
  );
}


