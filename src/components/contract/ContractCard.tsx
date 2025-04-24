
import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contract } from "@/types";
import { useLocale } from "@/context/LocaleContext";
import { Trash2 } from "lucide-react";
import SubscriberPointForm from "../SubscriberPointForm";

interface ContractCardProps {
  contract: Contract;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onDeletePoint: (pointId: string) => void;
  clientId: string;
}

const ContractCard = ({
  contract,
  isExpanded,
  onToggle,
  onDelete,
  onDeletePoint,
  clientId,
}: ContractCardProps) => {
  const { t } = useLocale();

  return (
    <>
      <CardHeader className="bg-muted cursor-pointer" onClick={onToggle}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-md flex items-center space-x-4">
            <span>{t("contractNumber")}: {contract.contractNumber}</span>
            <span>{t("date")}: {new Date(contract.contractDate).toLocaleDateString()}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span>{contract.subscriberPoints.length} {t("subscriberPoints")}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{t("subscriberPoints")}</h3>
            </div>
            
            {contract.subscriberPoints.length === 0 ? (
              <p className="text-muted-foreground">{t("noSubscriberPoints")}</p>
            ) : (
              <div className="space-y-2">
                {contract.subscriberPoints.map((point) => (
                  <div key={point.id} className="p-3 bg-accent rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium">{point.name}</div>
                        <div className="text-sm">
                          {t("networkNumber")}: {point.networkNumber} | {t("type")}: {point.type} | 
                          {t("validUntil")}: {new Date(point.validityDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeletePoint(point.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <SubscriberPointForm clientId={clientId} contractId={contract.id} />
          </div>
        </CardContent>
      )}
    </>
  );
};

export default ContractCard;
