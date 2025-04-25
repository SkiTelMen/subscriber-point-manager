
import { supabase } from "@/integrations/supabase/client";
import { Client, Contract, SubscriberPoint } from "@/types";
import { toast } from "sonner";

export const addClient = async (clientData: Omit<Client, "id" | "contracts">) => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([{
        name: clientData.name,
        tin: clientData.tin,
        ogrn: clientData.ogrn,
        legal_address: clientData.legalAddress,
        actual_address: clientData.actualAddress,
        phone_number: clientData.phoneNumber,
        contact_person: clientData.contactPerson,
        contact_person_phone: clientData.contactPersonPhone,
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      ...data,
      legalAddress: data.legal_address,
      actualAddress: data.actual_address,
      phoneNumber: data.phone_number,
      contactPerson: data.contact_person,
      contactPersonPhone: data.contact_person_phone,
      contracts: []
    } as Client;
  } catch (error) {
    console.error('Error adding client:', error);
    toast.error("Failed to add client");
    throw error;
  }
};

export const updateClient = async (client: Client) => {
  try {
    const { error } = await supabase
      .from('clients')
      .update({
        name: client.name,
        tin: client.tin,
        ogrn: client.ogrn,
        legal_address: client.legalAddress,
        actual_address: client.actualAddress,
        phone_number: client.phoneNumber,
        contact_person: client.contactPerson,
        contact_person_phone: client.contactPersonPhone,
      })
      .eq('id', client.id);

    if (error) throw error;

    return client;
  } catch (error) {
    console.error('Error updating client:', error);
    toast.error("Failed to update client");
    throw error;
  }
};

export const deleteClient = async (clientId: string) => {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', clientId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting client:', error);
    toast.error("Failed to delete client");
    throw error;
  }
};

export const addContract = async (
  clientId: string,
  contractNumber: string,
  contractDate: string,
  numberOfApprovals?: string
): Promise<Contract> => {
  try {
    const { data, error } = await supabase
      .from('contracts')
      .insert([{
        client_id: clientId,
        contract_number: contractNumber,
        contract_date: contractDate,
        number_of_approvals: numberOfApprovals,
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      clientId: data.client_id,
      contractNumber: data.contract_number,
      contractDate: data.contract_date,
      numberOfApprovals: data.number_of_approvals,
      subscriberPoints: []
    };
  } catch (error) {
    console.error('Error adding contract:', error);
    toast.error("Failed to add contract");
    throw error;
  }
};

export const deleteContract = async (contractId: string) => {
  try {
    const { error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', contractId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting contract:', error);
    toast.error("Failed to delete contract");
    throw error;
  }
};

export const addSubscriberPoint = async (
  contractId: string,
  name: string,
  networkNumber: string,
  validityDate: string,
  type: 'Coordinator' | 'Client'
): Promise<SubscriberPoint> => {
  try {
    const { data, error } = await supabase
      .from('subscriber_points')
      .insert([{
        contract_id: contractId,
        name,
        network_number: networkNumber,
        validity_date: validityDate,
        type
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      contractId: data.contract_id,
      name: data.name,
      networkNumber: data.network_number,
      validityDate: data.validity_date,
      type: data.type as 'Coordinator' | 'Client'
    };
  } catch (error) {
    console.error('Error adding subscriber point:', error);
    toast.error("Failed to add subscriber point");
    throw error;
  }
};

export const deleteSubscriberPoint = async (pointId: string) => {
  try {
    const { error } = await supabase
      .from('subscriber_points')
      .delete()
      .eq('id', pointId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting subscriber point:', error);
    toast.error("Failed to delete subscriber point");
    throw error;
  }
};

export const getClient = async (clientId: string): Promise<Client | undefined> => {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select(`
        *,
        contracts:contracts (
          *,
          subscriberPoints:subscriber_points (*)
        )
      `)
      .eq('id', clientId)
      .single();

    if (error) throw error;
    if (!data) return undefined;

    return {
      id: data.id,
      name: data.name,
      tin: data.tin,
      ogrn: data.ogrn,
      legalAddress: data.legal_address,
      actualAddress: data.actual_address,
      phoneNumber: data.phone_number,
      contactPerson: data.contact_person,
      contactPersonPhone: data.contact_person_phone,
      contracts: (data.contracts || []).map((contract: any) => ({
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
    };
  } catch (error) {
    console.error('Error fetching client:', error);
    toast.error("Failed to fetch client");
    return undefined;
  }
};

export const getSubscriberPointsByTin = async (tin: string) => {
  try {
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select(`
        *,
        contracts:contracts (
          *,
          subscriberPoints:subscriber_points (*)
        )
      `)
      .eq('tin', tin)
      .single();

    if (clientError) throw clientError;
    if (!clientData) return null;

    const client: Client = {
      id: clientData.id,
      name: clientData.name,
      tin: clientData.tin,
      ogrn: clientData.ogrn,
      legalAddress: clientData.legal_address,
      actualAddress: clientData.actual_address,
      phoneNumber: clientData.phone_number,
      contactPerson: clientData.contact_person,
      contactPersonPhone: clientData.contact_person_phone,
      contracts: (clientData.contracts || []).map((contract: any) => ({
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
    };

    const subscriberPoints = client.contracts.flatMap(contract =>
      contract.subscriberPoints.map(point => ({
        ...point,
        contractId: contract.id
      }))
    );

    return { client, subscriberPoints };
  } catch (error) {
    console.error('Error fetching subscriber points by TIN:', error);
    toast.error("Failed to fetch subscriber points");
    return null;
  }
};
