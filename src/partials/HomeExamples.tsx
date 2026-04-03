import { ColumnOne } from './home-examples/ColumnOne';
import { ColumnTwo } from './home-examples/ColumnTwo';
import { ColumnThree } from './home-examples/ColumnThree';
import { ColumnFour } from './home-examples/ColumnFour';

export function HomeExamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-[1600px] mx-auto px-4 py-20 items-start">
      <ColumnOne />
      <ColumnTwo />
      <ColumnThree />
      <ColumnFour />
    </div>
  );
}
