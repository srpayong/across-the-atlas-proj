import { getTours } from '../../../database/tours';
import FilteredToursPage from './FilterTours';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Hello' },
  description: 'Lorem Ipsum',
};

export default async function ToursPage() {
  const tours = await getTours();

  return <FilteredToursPage tours={tours} />;
}
