
import React, { useState } from 'react';
import { useClients } from '@/context/ClientContext';
import { useLocale } from '@/context/LocaleContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client, SubscriberPoint } from '@/types';
import { cn } from '@/lib/utils';

interface GroupedPoint extends SubscriberPoint {
  clientName: string;
  daysUntil: number;
}

const ExpiringPointsView = () => {
  const { clients } = useClients();
  const { t } = useLocale();
  const [selectedExpiredGroup, setSelectedExpiredGroup] = useState<string | null>(null);
  const [selectedExpiringGroup, setSelectedExpiringGroup] = useState<string | null>(null);

  const now = new Date();
  const sixtyDaysFromNow = new Date();
  sixtyDaysFromNow.setDate(now.getDate() + 60);

  const getGroupedPoints = () => {
    const expiringPoints: GroupedPoint[] = [];
    const expiredPoints: GroupedPoint[] = [];

    clients.forEach((client: Client) => {
      client.contracts.forEach((contract) => {
        contract.subscriberPoints.forEach((point) => {
          const validityDate = new Date(point.validityDate);
          const diffDays = Math.ceil((validityDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          const groupedPoint = {
            ...point,
            clientName: client.name,
            daysUntil: diffDays
          };

          if (validityDate < now) {
            expiredPoints.push(groupedPoint);
          } else if (validityDate <= sixtyDaysFromNow) {
            expiringPoints.push(groupedPoint);
          }
        });
      });
    });

    return { expiringPoints, expiredPoints };
  };

  const { expiringPoints, expiredPoints } = getGroupedPoints();

  const groupPointsByClient = (points: GroupedPoint[]) => {
    return points.reduce((groups, point) => {
      if (!groups[point.clientName]) {
        groups[point.clientName] = [];
      }
      groups[point.clientName].push(point);
      return groups;
    }, {} as Record<string, GroupedPoint[]>);
  };

  const renderPointsGroup = (
    points: GroupedPoint[], 
    isExpired: boolean, 
    selectedGroup: string | null,
    setSelectedGroup: (clientName: string | null) => void
  ) => {
    const grouped = groupPointsByClient(points);
    
    return Object.entries(grouped).map(([clientName, clientPoints]) => (
      <div key={clientName} className="mb-4">
        <button
          onClick={() => setSelectedGroup(selectedGroup === clientName ? null : clientName)}
          className={cn(
            "w-full text-left p-3 bg-accent hover:bg-accent/80 rounded-md transition-colors",
            selectedGroup === clientName && "ring-2 ring-primary"
          )}
        >
          <div className="font-medium text-lg">{clientName}</div>
          <div className="text-sm text-muted-foreground">
            {clientPoints.length} {t("subscriberPoints")}
          </div>
        </button>
        
        {selectedGroup === clientName && (
          <div className="mt-2 space-y-2 pl-4">
            {clientPoints.map((point) => (
              <div key={point.id} className="p-3 bg-background border rounded-md">
                <div className="font-medium">{point.name}</div>
                <div className="text-sm text-muted-foreground">
                  {t("networkNumber")}: {point.networkNumber} | {t("type")}: {point.type}
                </div>
                <div className="text-sm">
                  {isExpired ? (
                    <span className="text-destructive">
                      {Math.abs(point.daysUntil)} {t("daysExpired")}
                    </span>
                  ) : (
                    <span className="text-warning">
                      {point.daysUntil} {t("daysUntilExpiry")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("expiringSubscriberPoints")}</CardTitle>
        </CardHeader>
        <CardContent>
          {expiringPoints.length > 0 ? (
            renderPointsGroup(expiringPoints, false, selectedExpiringGroup, setSelectedExpiringGroup)
          ) : (
            <p className="text-muted-foreground">{t("noExpiringPoints")}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("expiredSubscriberPoints")}</CardTitle>
        </CardHeader>
        <CardContent>
          {expiredPoints.length > 0 ? (
            renderPointsGroup(expiredPoints, true, selectedExpiredGroup, setSelectedExpiredGroup)
          ) : (
            <p className="text-muted-foreground">{t("noExpiredPoints")}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpiringPointsView;
