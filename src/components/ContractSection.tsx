
import React, { useState } from "react";
import { useClients } from "@/context/ClientContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Contract, Client } from "@/types";
import SubscriberPointForm from "./SubscriberPointForm";
import { PlusCircle } from "lucide-react";

interface ContractSectionProps {
  client: Client;
}

const ContractSection = ({ client }: ContractSectionProps) => {
  const { addContract } = useClients();
  const [expandedContract, setExpandedContract] = useState<string | null>(null);

  const handleAddContract = () => {
    addContract(client.id);
  };

  const toggleExpand = (contractId: string) => {
    setExpandedContract(expandedContract === contractId ? null : contractId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Contracts</h2>
        <Button onClick={handleAddContract} size="sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Contract
        </Button>
      </div>

      {client.contracts.length === 0 ? (
        <p className="text-muted-foreground">No contracts yet. Create one to add subscriber points.</p>
      ) : (
        <div className="space-y-4">
          {client.contracts.map((contract: Contract) => (
            <Card key={contract.id} className="overflow-hidden">
              <CardHeader className="bg-muted cursor-pointer" onClick={() => toggleExpand(contract.id)}>
                <CardTitle className="text-md flex justify-between">
                  <span>Contract #{contract.id.substring(0, 8)}</span>
                  <span>{contract.subscriberPoints.length} Subscriber Points</span>
                </CardTitle>
              </CardHeader>
              
              {expandedContract === contract.id && (
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Subscriber Points</h3>
                    </div>
                    
                    {contract.subscriberPoints.length === 0 ? (
                      <p className="text-muted-foreground">No subscriber points yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {contract.subscriberPoints.map((point) => (
                          <div key={point.id} className="p-3 bg-accent rounded-md">
                            <div className="flex justify-between">
                              <div className="font-medium">{point.name}</div>
                              <div className="text-sm">
                                Valid until: {new Date(point.validityDate).toLocaleDateString()}
                              </div>
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
