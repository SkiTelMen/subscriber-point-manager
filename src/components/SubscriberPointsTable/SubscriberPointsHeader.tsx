
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';

interface SubscriberPointWithDetails {
  id: string;
  name: string;
  networkNumber: string;
  validityDate: string;
  type: 'Coordinator' | 'Client';
  contractNumber: string;
  contractDate: string;
  clientName: string;
  clientTin: string;
  clientId: string;
}

interface SubscriberPointsHeaderProps {
  onSort: (key: keyof SubscriberPointWithDetails) => void;
}

const SubscriberPointsHeader = ({ onSort }: SubscriberPointsHeaderProps) => {
  const { t } = useLocale();
  
  return (
    <TableHeader>
      <TableRow>
        <TableHead onClick={() => onSort('clientName')} className="cursor-pointer">
          <div className="flex items-center">
            {t('customerName')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('clientTin')} className="cursor-pointer">
          <div className="flex items-center">
            {t('tin')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('name')} className="cursor-pointer">
          <div className="flex items-center">
            {t('pointName')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('networkNumber')} className="cursor-pointer">
          <div className="flex items-center">
            {t('networkNumber')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('type')} className="cursor-pointer">
          <div className="flex items-center">
            {t('type')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('validityDate')} className="cursor-pointer">
          <div className="flex items-center">
            {t('validityDate')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('contractNumber')} className="cursor-pointer">
          <div className="flex items-center">
            {t('contractNumber')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
        <TableHead onClick={() => onSort('contractDate')} className="cursor-pointer">
          <div className="flex items-center">
            {t('contractDate')}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default SubscriberPointsHeader;
