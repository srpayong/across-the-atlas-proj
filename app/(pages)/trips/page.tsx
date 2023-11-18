import { getTrips } from '../../../database/trips';
import FilteredTripsPage from './FilterTrips';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Across the Atlas | Trips' },
  description: 'Lorem Ipsum',
};

export default async function TripsPage() {
  const trips = await getTrips();

  return <FilteredTripsPage trips={trips} />;
}
