
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ClientFormData } from "./types";

interface BasicInfoFieldsProps {
  form: UseFormReturn<ClientFormData>;
}

const BasicInfoFields = ({ form }: BasicInfoFieldsProps) => {
  return (
    <>
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
    </>
  );
};

export default BasicInfoFields;
