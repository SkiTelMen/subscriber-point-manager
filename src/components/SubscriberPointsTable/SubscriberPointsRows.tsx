
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useLocale } from '@/context/LocaleContext';

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

interface SubscriberPointsRowsProps {
  points: SubscriberPointWithDetails[];
}

const SubscriberPointsRows = ({ points }: SubscriberPointsRowsProps) => {
  const navigate = useNavigate();
  const { t } = useLocale();
  
  const handleClientClick = (clientId: string) => {
    navigate(`/clients/${clientId}`);
  };
  
  if (points.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={8} className="h-24 text-center">
            {t('noSubscriberPoints')}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }
  
  return (
    <TableBody>
      {points.map((point) => (
        <TableRow key={point.id}>
          <TableCell 
            className="cursor-pointer hover:text-blue-600"
            onClick={() => handleClientClick(point.clientId)}
          >
            {point.clientName}
          </TableCell>
          <TableCell>{point.clientTin}</TableCell>
          <TableCell>{point.name}</TableCell>
          <TableCell>{point.networkNumber}</TableCell>
          <TableCell>{point.type}</TableCell>
          <TableCell>{point.validityDate}</TableCell>
          <TableCell 
            className="cursor-pointer hover:text-blue-600"
            onClick={() => handleClientClick(point.clientId)}
          >
            {point.contractNumber}
          </TableCell>
          <TableCell>{point.contractDate}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SubscriberPointsRows;
