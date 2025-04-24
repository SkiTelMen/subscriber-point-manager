
import React, { useState } from "react";
import { useClients } from "@/context/ClientContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contract, Client } from "@/types";
import SubscriberPointForm from "./SubscriberPointForm";
import { PlusCircle, Trash2 } from "lucide-react";

interface ContractSectionProps {
  client: Client;
}

const ContractSection = ({ client }: ContractSectionProps) => {
  const { addContract, deleteContract, deleteSubscriberPoint } = useClients();
  const { t } = useLocale();
  const [expandedContract, setExpandedContract] = useState<string | null>(null);
  const [showNewContractForm, setShowNewContractForm] = useState(false);
  const [contractNumber, setContractNumber] = useState("");
  const [contractDate, setContractDate] = useState("");
  const [numberOfApprovals, setNumberOfApprovals] = useState<string>("");

  const handleAddContract = () => {
    if (contractNumber && contractDate) {
      addContract(client.id, contractNumber, contractDate, numberOfApprovals ? parseInt(numberOfApprovals) : undefined);
      setContractNumber("");
      setContractDate("");
      setNumberOfApprovals("");
      setShowNewContractForm(false);
    }
  };

  const handleDeleteContract = (contractId: string) => {
    deleteContract(client.id, contractId);
  };

  const handleDeletePoint = (contractId: string, pointId: string) => {
    deleteSubscriberPoint(client.id, contractId, pointId);
  };

  const toggleExpand = (contractId: string) => {
    setExpandedContract(expandedContract === contractId ? null : contractId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("contracts")}</h2>
        <Button onClick={() => setShowNewContractForm(true)} size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          {t("addContract")}
        </Button>
      </div>

      {showNewContractForm && (
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t("contractNumber")}</label>
              <input
                type="text"
                value={contractNumber}
                onChange={(e) => setContractNumber(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("contractDate")}</label>
              <input
                type="date"
                value={contractDate}
                onChange={(e) => setContractDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("numberOfApprovals")}</label>
              <input
                type="number"
                value={numberOfApprovals}
                onChange={(e) => setNumberOfApprovals(e.target.value)}
                className="w-full p-2 border rounded"
                min="0"
                step="1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewContractForm(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleAddContract}>
                {t("add")}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {client.contracts.length === 0 ? (
        <p className="text-muted-foreground">{t("noContracts")}</p>
      ) : (
        <div className="space-y-4">
          {client.contracts.map((contract: Contract) => (
            <Card key={contract.id} className="overflow-hidden">
              <CardHeader className="bg-muted cursor-pointer" onClick={() => toggleExpand(contract.id)}>
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
                        handleDeleteContract(contract.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {expandedContract === contract.id && (
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
                                onClick={() => handleDeletePoint(contract.id, point.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <SubscriberPointForm clientId={client.id} contractId={contract.id} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractSection;
