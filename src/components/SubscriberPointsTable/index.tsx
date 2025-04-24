
import React, { useState, useMemo } from 'react';
import { useClients } from '@/context/ClientContext';
import { useLocale } from '@/context/LocaleContext';
import { Table } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter } from 'lucide-react';
import FilterMenu from './FilterMenu';
import SubscriberPointsHeader from './SubscriberPointsHeader';
import SubscriberPointsRows from './SubscriberPointsRows';
import { 
  filterSubscriberPoints, 
  getEnrichedSubscriberPoints, 
  sortSubscriberPoints,
  SubscriberPointWithDetails 
} from '@/utils/subscriberPointUtils';

// Define types for SortConfig and FilterConfig
type SortConfig = {
  key: keyof SubscriberPointWithDetails | null;
  direction: 'asc' | 'desc';
};

type FilterConfig = {
  [key: string]: string;
};

const SubscriberPointsTable = () => {
  const { clients } = useClients();
  const { t } = useLocale();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [tempFilters, setTempFilters] = useState<FilterConfig>({});
  
  // Get all subscriber points with details
  const subscriberPointsWithDetails = useMemo(() => {
    return getEnrichedSubscriberPoints(clients);
  }, [clients]);
  
  // Filter the points based on search term and filters
  const filteredPoints = useMemo(() => {
    return filterSubscriberPoints(subscriberPointsWithDetails, searchTerm, filterConfig);
  }, [subscriberPointsWithDetails, searchTerm, filterConfig]);
  
  // Sort the filtered points
  const sortedPoints = useMemo(() => {
    return sortSubscriberPoints(filteredPoints, sortConfig.key, sortConfig.direction);
  }, [filteredPoints, sortConfig]);
  
  const handleSort = (key: keyof SubscriberPointWithDetails) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };
  
  const resetFilters = () => {
    setFilterConfig({});
    setTempFilters({});
    setSearchTerm('');
  };
  
  const applyFilters = () => {
    setFilterConfig(tempFilters);
    setShowFilterMenu(false);
  };
  
  React.useEffect(() => {
    if (showFilterMenu) {
      setTempFilters({...filterConfig});
    }
  }, [showFilterMenu, filterConfig]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`${t('search')}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="ml-2 flex items-center space-x-2">
          <DropdownMenu open={showFilterMenu} onOpenChange={setShowFilterMenu}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                {t('filter')}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <FilterMenu 
              filters={tempFilters}
              onChange={setTempFilters}
              onApply={applyFilters}
            />
          </DropdownMenu>
          {(searchTerm || Object.values(filterConfig).some(val => val)) && (
            <Button variant="ghost" onClick={resetFilters}>
              {t('reset')}
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <SubscriberPointsHeader onSort={handleSort} />
          <SubscriberPointsRows points={sortedPoints} />
        </Table>
      </div>
    </div>
  );
};

export default SubscriberPointsTable;
