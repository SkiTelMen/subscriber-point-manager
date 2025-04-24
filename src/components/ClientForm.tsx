
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Client } from "@/types";
import { useClients } from "@/context/ClientContext";
import { useNavigate } from "react-router-dom";
import { clientSchema } from "./client-form/types";
import type { ClientFormData } from "./client-form/types";
import BasicInfoFields from "./client-form/BasicInfoFields";
import AddressFields from "./client-form/AddressFields";
import ContactFields from "./client-form/ContactFields";
import FormActions from "./client-form/FormActions";

interface ClientFormProps {
  client?: Client;
  onSuccess?: () => void;
}

const ClientForm = ({ client, onSuccess }: ClientFormProps) => {
  const { addClient, updateClient } = useClients();
  const navigate = useNavigate();
  const isEditing = !!client;
  
  const [sameAddress, setSameAddress] = useState(false);
  const [samePhone, setSamePhone] = useState(false);

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: client ? {
      name: client.name,
      tin: client.tin,
      ogrn: client.ogrn,
      legalAddress: client.legalAddress,
      actualAddress: client.actualAddress,
      phoneNumber: client.phoneNumber,
      contactPerson: client.contactPerson,
      contactPersonPhone: client.contactPersonPhone,
    } : {
      name: "",
      tin: "",
      ogrn: "",
      legalAddress: "",
      actualAddress: "",
      phoneNumber: "",
      contactPerson: "",
      contactPersonPhone: "",
    },
  });

  const handleSameAddressChange = (checked: boolean) => {
    setSameAddress(checked);
    if (checked) {
      const legalAddress = form.getValues("legalAddress");
      form.setValue("actualAddress", legalAddress);
    }
  };

  const handleSamePhoneChange = (checked: boolean) => {
    setSamePhone(checked);
    if (checked) {
      const phoneNumber = form.getValues("phoneNumber");
      form.setValue("contactPersonPhone", phoneNumber);
    }
  };

  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (sameAddress && name === "legalAddress") {
        form.setValue("actualAddress", value.legalAddress || "");
      }
      if (samePhone && name === "phoneNumber") {
        form.setValue("contactPersonPhone", value.phoneNumber || "");
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch, sameAddress, samePhone, form]);

  const onSubmit = (data: ClientFormData) => {
    if (isEditing && client) {
      updateClient({
        ...client,
        ...data,
      });
    } else {
      addClient(data);
    }
    
    if (onSuccess) {
      onSuccess();
    } else {
      navigate("/clients");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BasicInfoFields form={form} />
          <AddressFields 
            form={form} 
            sameAddress={sameAddress} 
            onSameAddressChange={handleSameAddressChange} 
          />
          <ContactFields 
            form={form} 
            samePhone={samePhone} 
            onSamePhoneChange={handleSamePhoneChange} 
          />
        </div>
        <FormActions 
          isEditing={isEditing} 
          onCancel={() => navigate("/clients")} 
        />
      </form>
    </Form>
  );
};

export default ClientForm;
