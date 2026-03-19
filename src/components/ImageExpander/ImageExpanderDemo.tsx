import { ImageExpander } from './ImageExpander';

export function ImageExpanderDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      {/* Light Mode Mockup */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 ml-1">Analytics View</h4>
        <ImageExpander 
          caption="Our premium analytics interface with data visualization"
          className="aspect-video"
        >
          <img 
            src="https://images.unsplash.com/photo-1551288049-bbda38a5f452?q=80&w=1000&auto=format&fit=crop" 
            alt="Analytics Dashboard"
            className="w-full h-full object-cover"
          />
        </ImageExpander>
      </div>

      {/* Dark Mode Mockup */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 ml-1">Strategy Planning</h4>
        <ImageExpander 
          caption="Conceptual overview of the strategic planning module"
          className="aspect-video"
        >
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
            alt="Strategy Interface"
            className="w-full h-full object-cover"
          />
        </ImageExpander>
      </div>
    </div>
  );
}
