
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Client } from "@/types";
import { useClients } from "@/context/ClientContext";
import { useNavigate } from "react-router-dom";

const clientSchema = z.object({
  name: z.string().min(2, { message: "Имя организации должно содержать не менее 2 символов" }),
  tin: z.string().min(10, { message: "ИНН должен быть равен 10" }),
  ogrn: z.string().min(13, { message: "ОГРН должен быть равен 13" }),
  legalAddress: z.string().min(5, { message: "Требуется указать юридический адрес" }),
  actualAddress: z.string().min(5, { message: "Требуется указать фактический адрес" }),
  phoneNumber: z.string().min(5, { message: "Требуется указать номер телефона" }),
  contactPerson: z.string().min(2, { message: "Требуется указать контактное лицо" }),
  contactPersonPhone: z.string().min(5, { message: "Требуется указать телефон контактного лица" }),
});

type ClientFormData = z.infer<typeof clientSchema>;

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

  // Handle checkbox changes
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

  // Watch for legal address changes
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
      // Explicitly cast data as the required type to ensure all fields are present
      addClient({
        name: data.name,
        tin: data.tin,
        ogrn: data.ogrn,
        legalAddress: data.legalAddress,
        actualAddress: data.actualAddress,
        phoneNumber: data.phoneNumber,
        contactPerson: data.contactPerson,
        contactPersonPhone: data.contactPersonPhone,
      });
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя организации</FormLabel>
                <FormControl>
                  <Input placeholder="Enter client name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ИНН</FormLabel>
                <FormControl>
                  <Input placeholder="Введите ИНН" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ogrn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ОГРН</FormLabel>
                <FormControl>
                  <Input placeholder="ОГРН" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Юридический адрес</FormLabel>
                <FormControl>
                  <Input placeholder="Введите юридический адрес" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="actualAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фактический адрес</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <Input 
                        placeholder="Введите фактический адрес" 
                        {...field} 
                        disabled={sameAddress} 
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="same-address" 
                        checked={sameAddress} 
                        onCheckedChange={handleSameAddressChange} 
                      />
                      <label 
                        htmlFor="same-address"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as legal address
                      </label>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Номер телефона</FormLabel>
                <FormControl>
                  <Input placeholder="Введите номер телефона" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact person" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="contactPersonPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person Phone</FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <Input 
                        placeholder="Enter contact person phone" 
                        {...field} 
                        disabled={samePhone} 
                      />
                    </FormControl>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="same-phone" 
                        checked={samePhone} 
                        onCheckedChange={handleSamePhoneChange} 
                      />
                      <label 
                        htmlFor="same-phone"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Same as main phone number
                      </label>
                    </div>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/clients")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Client" : "Create Client"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ClientForm;
