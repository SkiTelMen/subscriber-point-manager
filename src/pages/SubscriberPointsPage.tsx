
import React from 'react';
import { useLocale } from '@/context/LocaleContext';
import SubscriberPointsTable from '@/components/SubscriberPointsTable';

const SubscriberPointsPage = () => {
  const { t } = useLocale();
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">{t('subscriberPointsList')}</h1>
      <div className="text-sm text-muted-foreground mb-6">
        {t('allSubscriberPoints')}
      </div>
      
      <SubscriberPointsTable />
    </div>
  );
};

export default SubscriberPointsPage;
