
import React, { useState } from "react";
import { useClients } from "@/context/ClientContext";
import { useLocale } from "@/context/LocaleContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Client } from "@/types";
import { PlusCircle } from "lucide-react";
import AddContractForm from "./contract/AddContractForm";
import ContractCard from "./contract/ContractCard";

interface ContractSectionProps {
  client: Client;
}

const ContractSection = ({ client }: ContractSectionProps) => {
  const { addContract, deleteContract, deleteSubscriberPoint } = useClients();
  const { t } = useLocale();
  const [expandedContract, setExpandedContract] = useState<string | null>(null);
  const [showNewContractForm, setShowNewContractForm] = useState(false);

  const handleAddContract = (contractNumber: string, contractDate: string, numberOfApprovals?: number) => {
    addContract(client.id, contractNumber, contractDate);
    setShowNewContractForm(false);
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
        <AddContractForm
          onSubmit={handleAddContract}
          onCancel={() => setShowNewContractForm(false)}
        />
      )}

      {client.contracts.length === 0 ? (
        <p className="text-muted-foreground">{t("noContracts")}</p>
      ) : (
        <div className="space-y-4">
          {client.contracts.map((contract) => (
            <Card key={contract.id}>
              <ContractCard
                contract={contract}
                isExpanded={expandedContract === contract.id}
                onToggle={() => toggleExpand(contract.id)}
                onDelete={() => handleDeleteContract(contract.id)}
                onDeletePoint={(pointId) => handleDeletePoint(contract.id, pointId)}
                clientId={client.id}
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractSection;
