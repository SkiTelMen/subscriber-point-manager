
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  tin: z.string().min(10, { message: "TIN must be at least 10 characters" }),
  ogrn: z.string().min(13, { message: "OGRN must be at least 13 characters" }),
  legalAddress: z.string().min(5, { message: "Legal address is required" }),
  actualAddress: z.string().min(5, { message: "Actual address is required" }),
  phoneNumber: z.string().min(5, { message: "Phone number is required" }),
  contactPerson: z.string().min(2, { message: "Contact person is required" }),
  contactPersonPhone: z.string().min(5, { message: "Contact person phone is required" }),
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
                <FormLabel>Client Name</FormLabel>
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
                <FormLabel>TIN (Tax ID Number)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter TIN" {...field} />
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
                <FormLabel>OGRN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter OGRN" {...field} />
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
                <FormLabel>Legal Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter legal address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actualAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Actual Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter actual address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
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

          <FormField
            control={form.control}
            name="contactPersonPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter contact person phone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
