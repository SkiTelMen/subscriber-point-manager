
import { useState, useEffect } from "react";
import { Client } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useClientData = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    try {
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select(`
          *,
          contracts:contracts (
            *,
            subscriberPoints:subscriber_points (*)
          )
        `);

      if (clientsError) throw clientsError;

      const formattedClients: Client[] = clientsData.map((client: any) => ({
        id: client.id,
        name: client.name,
        tin: client.tin,
        ogrn: client.ogrn,
        legalAddress: client.legal_address,
        actualAddress: client.actual_address,
        phoneNumber: client.phone_number,
        contactPerson: client.contact_person,
        contactPersonPhone: client.contact_person_phone,
        contracts: (client.contracts || []).map((contract: any) => ({
          id: contract.id,
          clientId: contract.client_id,
          contractNumber: contract.contract_number,
          contractDate: contract.contract_date,
          numberOfApprovals: contract.number_of_approvals,
          subscriberPoints: (contract.subscriberPoints || []).map((point: any) => ({
            id: point.id,
            contractId: point.contract_id,
            name: point.name,
            networkNumber: point.network_number,
            validityDate: point.validity_date,
            type: point.type as 'Coordinator' | 'Client'
          }))
        }))
      }));

      setClients(formattedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error("Failed to load clients");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return { clients, setClients, fetchClients };
};
