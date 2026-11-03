import { Tabs, TabsList, TabsTrigger, TabsContent } from '../dashkit/Tabs/Tabs';
import { ColumnOne } from './home-examples/ColumnOne';
import { ColumnTwo } from './home-examples/ColumnTwo';
import { ColumnThree } from './home-examples/ColumnThree';
import { ColumnFour } from './home-examples/ColumnFour';

export function HomeExamples() {
  return (
    <>
      {/* Mobile Tabbed View (< 768px) */}
      <div className="block md:hidden w-full max-w-md mx-auto px-4 py-8">
        <Tabs defaultValue="forms">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="settings">Config</TabsTrigger>
            <TabsTrigger value="activity">Feeds</TabsTrigger>
          </TabsList>
          <TabsContent value="forms">
            <ColumnOne />
          </TabsContent>
          <TabsContent value="charts">
            <ColumnTwo />
          </TabsContent>
          <TabsContent value="settings">
            <ColumnThree />
          </TabsContent>
          <TabsContent value="activity">
            <ColumnFour />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Multi-column Grid (>= 768px) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1600px] mx-auto px-4 py-12 items-start">
        <ColumnOne />
        <ColumnTwo />
        <ColumnThree />
        <ColumnFour />
      </div>
    </>
  );
}
