import { getTrips } from '../../../database/trips';
import FilteredTripsPage from './FilterTrips';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Hello' },
  description: 'Lorem Ipsum',
};

export default async function TripsPage() {
  const trips = await getTrips();

  return <FilteredTripsPage trips={trips} />;
}
