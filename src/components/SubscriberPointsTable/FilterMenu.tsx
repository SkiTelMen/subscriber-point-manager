
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenuContent
} from '@/components/ui/dropdown-menu';

interface FilterConfig {
  [key: string]: string;
}

interface FilterMenuProps {
  filters: FilterConfig;
  onChange: (filters: FilterConfig) => void;
  onApply: () => void;
}

const FilterMenu = ({ filters, onChange, onApply }: FilterMenuProps) => {
  const { t } = useLocale();
  
  return (
    <DropdownMenuContent align="end" className="w-[300px] p-4">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">{t('customerName')}</h4>
          <Input
            placeholder={t('customerName')}
            value={filters.clientName || ''}
            onChange={(e) => onChange({...filters, clientName: e.target.value})}
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">{t('tin')}</h4>
          <Input
            placeholder={t('tin')}
            value={filters.clientTin || ''}
            onChange={(e) => onChange({...filters, clientTin: e.target.value})}
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">{t('pointName')}</h4>
          <Input
            placeholder={t('pointName')}
            value={filters.name || ''}
            onChange={(e) => onChange({...filters, name: e.target.value})}
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">{t('networkNumber')}</h4>
          <Input
            placeholder={t('networkNumber')}
            value={filters.networkNumber || ''}
            onChange={(e) => onChange({...filters, networkNumber: e.target.value})}
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">{t('contractNumber')}</h4>
          <Input
            placeholder={t('contractNumber')}
            value={filters.contractNumber || ''}
            onChange={(e) => onChange({...filters, contractNumber: e.target.value})}
          />
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => onChange({})}>{t('clearFilter')}</Button>
          <Button onClick={onApply}>{t('applyFilter')}</Button>
        </div>
      </div>
    </DropdownMenuContent>
  );
};

export default FilterMenu;
