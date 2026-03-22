import { Divider } from './Divider';

export const DividerDemo = () => {
  return (
    <div className="flex flex-col gap-12 w-full py-6">
      {/* Horizontal Solid */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Solid Horizontal</h4>
        <Divider />
      </div>

      {/* Dashed Horizontal */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Dashed Horizontal</h4>
        <Divider variant="dashed" />
      </div>

      {/* Horizontal with Content */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Horizontal with Content</h4>
        <Divider>Yesterday</Divider>
        <Divider variant="dashed">Dashed with Content</Divider>
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-4">
        <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Vertical Divider</h4>
        <div className="flex items-center h-10 gap-6">
          <span className="text-sm font-medium">Dashboard</span>
          <Divider orientation="vertical" />
          <span className="text-sm font-medium">Settings</span>
          <Divider orientation="vertical" variant="dashed"/>
          <span className="text-sm font-medium">Profile</span>
        </div>
      </div>
    </div>
  );
};


