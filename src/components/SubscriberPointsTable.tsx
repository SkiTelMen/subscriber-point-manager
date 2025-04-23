
import React, { useState, useEffect, useMemo } from 'react';
import { useClients } from '@/context/ClientContext';
import { useLocale } from '@/context/LocaleContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Client, Contract, SubscriberPoint } from '@/types';

interface SubscriberPointWithDetails {
  id: string;
  name: string;
  networkNumber: string;
  validityDate: string;
  type: 'client' | 'hardware';
  contractNumber: string;
  contractDate: string;
  clientName: string;
  clientTin: string;
}

type SortConfig = {
  key: keyof SubscriberPointWithDetails | null;
  direction: 'asc' | 'desc';
};

type FilterConfig = {
  [key in keyof SubscriberPointWithDetails]?: string;
};

const SubscriberPointsTable = () => {
  const { clients } = useClients();
  const { t } = useLocale();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({});
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [tempFilters, setTempFilters] = useState<FilterConfig>({});
  
  // Prepare subscriber points data with all the details
  const subscriberPointsWithDetails = useMemo(() => {
    const points: SubscriberPointWithDetails[] = [];
    
    clients.forEach((client: Client) => {
      client.contracts.forEach((contract: Contract) => {
        contract.subscriberPoints.forEach((point: SubscriberPoint) => {
          points.push({
            id: point.id,
            name: point.name,
            networkNumber: point.networkNumber,
            validityDate: point.validityDate,
            type: point.type,
            contractNumber: contract.contractNumber,
            contractDate: contract.contractDate,
            clientName: client.name,
            clientTin: client.tin
          });
        });
      });
    });
    
    return points;
  }, [clients]);
  
  // Filter logic
  const filteredPoints = useMemo(() => {
    return subscriberPointsWithDetails.filter(point => {
      // Global search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          point.name.toLowerCase().includes(searchLower) ||
          point.networkNumber.toLowerCase().includes(searchLower) ||
          point.clientName.toLowerCase().includes(searchLower) ||
          point.clientTin.toLowerCase().includes(searchLower) ||
          point.contractNumber.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }
      
      // Column-specific filters
      for (const key in filterConfig) {
        if (filterConfig[key as keyof SubscriberPointWithDetails]) {
          const filterValue = filterConfig[key as keyof SubscriberPointWithDetails]?.toLowerCase();
          const pointValue = String(point[key as keyof SubscriberPointWithDetails]).toLowerCase();
          
          if (filterValue && !pointValue.includes(filterValue)) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [subscriberPointsWithDetails, searchTerm, filterConfig]);
  
  // Sort logic
  const sortedPoints = useMemo(() => {
    const sorted = [...filteredPoints];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredPoints, sortConfig]);
  
  // Sort handler
  const handleSort = (key: keyof SubscriberPointWithDetails) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilterConfig({});
    setTempFilters({});
    setSearchTerm('');
  };
  
  // Apply filters from the filter menu
  const applyFilters = () => {
    setFilterConfig(tempFilters);
    setShowFilterMenu(false);
  };
  
  // Initialize temp filters when filter menu opens
  useEffect(() => {
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
            <DropdownMenuContent align="end" className="w-[300px] p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">{t('customerName')}</h4>
                  <Input
                    placeholder={t('customerName')}
                    value={tempFilters.clientName || ''}
                    onChange={(e) => setTempFilters({...tempFilters, clientName: e.target.value})}
                  />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">{t('tin')}</h4>
                  <Input
                    placeholder={t('tin')}
                    value={tempFilters.clientTin || ''}
                    onChange={(e) => setTempFilters({...tempFilters, clientTin: e.target.value})}
                  />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">{t('pointName')}</h4>
                  <Input
                    placeholder={t('pointName')}
                    value={tempFilters.name || ''}
                    onChange={(e) => setTempFilters({...tempFilters, name: e.target.value})}
                  />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">{t('networkNumber')}</h4>
                  <Input
                    placeholder={t('networkNumber')}
                    value={tempFilters.networkNumber || ''}
                    onChange={(e) => setTempFilters({...tempFilters, networkNumber: e.target.value})}
                  />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">{t('contractNumber')}</h4>
                  <Input
                    placeholder={t('contractNumber')}
                    value={tempFilters.contractNumber || ''}
                    onChange={(e) => setTempFilters({...tempFilters, contractNumber: e.target.value})}
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setTempFilters({})}>{t('clearFilter')}</Button>
                  <Button onClick={applyFilters}>{t('applyFilter')}</Button>
                </div>
              </div>
            </DropdownMenuContent>
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
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleSort('clientName')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('customerName')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('clientTin')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('tin')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('name')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('pointName')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('networkNumber')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('networkNumber')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('validityDate')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('validityDate')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('contractNumber')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('contractNumber')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead onClick={() => handleSort('contractDate')} className="cursor-pointer">
                <div className="flex items-center">
                  {t('contractDate')}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPoints.length > 0 ? (
              sortedPoints.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.clientName}</TableCell>
                  <TableCell>{point.clientTin}</TableCell>
                  <TableCell>{point.name}</TableCell>
                  <TableCell>{point.networkNumber}</TableCell>
                  <TableCell>{point.validityDate}</TableCell>
                  <TableCell>{point.contractNumber}</TableCell>
                  <TableCell>{point.contractDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {t('noSubscriberPoints')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SubscriberPointsTable;
